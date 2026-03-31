'use server'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
const CONTEXT = `
BỐI CẢNH:
- Doanh nghiệp: Công ty gia công và lắp dựng kết cấu thép tại miền Trung.
- Ngành: Sản xuất - thi công kết cấu thép.

NGÔN NGỮ BẮT BUỘC:
- Ưu tiên từ vựng: lắp dựng, cấu kiện, gia công, tiến độ, an toàn, xử lý tại chỗ, bám trụ, tối ưu.
- Câu văn ngắn, trực diện, không hoa mỹ.
- Văn phong: Súc tích - mạch lạc - trung tính - mang tính báo cáo nội bộ.
- Không dùng cảm thán, không dùng từ khen sáo rỗng.

NGUYÊN TẮC:
- Chỉ viết dựa trên dữ liệu được cung cấp.
- Không suy diễn, không bổ sung thông tin ngoài input.
- Ưu tiên tính thực tế và rõ hành động.
`;

export async function generateStoryPreview(formData) {
  const rawInput = formData.get('rawInput');
  const employeeName = formData.get('employeeName');
  const department = formData.get('department');
  const targetValue = formData.get('targetValue');

  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview", generationConfig: { responseMimeType: "application/json" } });
  const prompt = `
${CONTEXT}

INPUT:
- Dữ liệu thô: ${rawInput}
- Nhân viên: ${employeeName} - ${department}
- Giá trị cốt lõi: ${targetValue}

NHIỆM VỤ:
Viết lại nội dung thành bản tin nội bộ

YÊU CẦU CHI TIẾT:
1. Sử dụng ý từ dữ liệu thô
2. Độ dài tối đa 90 từ.
3. Cấu trúc bắt buộc:
   - Đoạn 1: 3–4 câu, mô tả hành động/thực tế công việc.
   - Đoạn 2: Thông điệp rút ra...(Tối đa 2 câu, có nhắc lại hành động của cá nhân / tập thể thể hiện giá trị cốt lõi ở đoạn 1)
4. TIÊU ĐỀ:
   - Ngắn gọn, Bắt đầu bằng một hành động thực tế (Ví dụ Tăng ca đêm - Đảm bảo tiến độ lắp dựng / Xử lý tại chỗ - Đảm bảo an toàn lao động)
   - Không chung chung.
5. Không dùng:
   - Câu cảm thán
   - Lời khen chung chung

RÀNG BUỘC FORMAT:
- story_content phải có 2 đoạn, cách nhau bằng "\\n".
- Không xuống dòng ngoài quy định.
- Không thêm text ngoài JSON.

OUTPUT (BẮT BUỘC JSON HỢP LỆ):
{"title":"...","story_content":"..."}
`;

  const result = await model.generateContent(prompt);
  const aiResponse = JSON.parse(result.response.text().replace(/```json|```/g, ''));

  return {
    success: true,
    data: {
      ...aiResponse,
      employeeName,
      department,
      targetValue,
      rawInput
    }
  };
}

export async function getStories() {
  await doc.loadInfo();
  const rows = await doc.sheetsByIndex[0].getRows();
  return rows.map(row => ({
    id: row.get('id'),
    title: row.get('title'),
    story_content: row.get('story_content'),
    core_values: row.get('core_values') ? [row.get('core_values')] : [],
    employee_name: row.get('employee_name') || 'Ẩn danh',
    department: row.get('department') || 'None',
    likes: parseInt(row.get('likes')) || 0,
    createdAt: row.get('created_at') || new Date().toISOString(),
  })).reverse();
}

export async function saveStory(data) {
  await doc.loadInfo();
  await doc.sheetsByIndex[0].addRow({
    id: uuidv4(),
    raw_input: data.rawInput,
    title: data.title,
    story_content: data.story_content,
    core_values: data.targetValue,
    employee_name: data.employeeName,
    department: data.department,
    likes: 0,
    created_at: new Date().toISOString()
  });

  revalidatePath('/');
  return { success: true };
}

export async function likeStory(id) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);

    if (row) {
      const currentLikes = parseInt(row.get('likes')) || 0;
      row.set('likes', currentLikes + 1);
      await row.save();
      console.log(`Success: Liked story ${id}. New likes: ${currentLikes + 1}`);
      revalidatePath('/');
      return { success: true };
    } else {
      console.error(`Error: Story ID ${id} not found in sheet.`);
    }
    return { success: false };
  } catch (err) {
    console.error("Like Error:", err);
    return { success: false };
  }
}