# HGPT Steel Culture Board - Tài liệu Dự án hoàn chỉnh (2026)

Tài liệu này tổng hợp toàn bộ các công nghệ, kiến trúc và tính năng cao cấp của dự án **Bảng tin Văn hóa HGPT Steel**. Ứng dụng được thiết kế theo phong cách "Smart Industrial Minimalist", tối ưu cho cả vận hành nội bộ và trải nghiệm di động.

---

## 1. Công nghệ & Kiến trúc Lõi (Technical Stack)

*   **Next.js 16 (App Router) & React 19:** Sử dụng những phiên bản mới nhất nhằm tối ưu hóa hiệu năng Server Components và cơ chế Streaming UI.
*   **Google Sheets Cloud Database:** Sử dụng Google Sheets làm cơ sở dữ liệu thời gian thực thông qua thư viện `google-spreadsheet`. Giải pháp này giúp đội ngũ quản lý có thể trực tiếp theo dõi và chỉnh sửa dữ liệu mà không cần thông qua hệ thống quản trị (CMS) phức tạp.
*   **Gemini AI Engine (Model 1.5 Flash-Lite):** Được tích hợp sâu vào hệ thống để tự động hóa việc tóm lược ý tưởng thô của nhân viên thành các bản tin ngắn gọn, súc tích và bám sát các giá trị cốt lõi.
*   **React Portals Architecture:** Toàn bộ hệ thống Modal (Form nhập liệu, Chi tiết câu chuyện) được triển khai qua cơ chế Portal (`createPortal`) để đảm bảo quản lý lớp hiển thị (Z-index) tuyệt đối, không bị xung đột với các thành phần sticky (Header/Filter).
*   **Responsive Hybrid Design:** Kết hợp giữa Tailwind CSS và các cấu trúc linh hoạt để đảm bảo ứng dụng đẹp mắt trên màn hình Desktop siêu rộng và mượt mà trên smartphone màn hình nhỏ.

---

## 2. Các Tính năng & Cải tiến nổi bật (Key Features)

### A. Hệ thống Thống kê & Vinh danh (High-Prestige Dashboard)
*   **Thẻ Thống kê cao cấp:** Sử dụng cặp icon **BookOpen** và **Heart** (đổ màu rực rỡ) để hiển thị Tổng số bài viết và Tổng lượt tương tác toàn hệ thống.
*   **Bảng Xếp hạng Tương tác (Top Trending):** Tự động tổng hợp và hiển thị 5 câu chuyện nhận được nhiều sự quan tâm nhất. Đặc biệt, người dùng có thể click trực tiếp vào từng bài trong bảng xếp hạng để mở xem chi tiết ngay lập tức.

### B. AI Story Forge (Bộ máy Sáng tạo nội bộ)
*   **AI Rewrite System:** Chuyển đổi dữ liệu thô (ý chính) thành bản tin 2 đoạn chuyên nghiệp (Đoạn 1: Hành động thực tế; Đoạn 2: Thông điệp văn hóa).
*   **Kiểm soát chất lượng (Tech Polish):**
    *   Bộ đếm từ thời gian thực với giới hạn 500 từ để đảm bảo API hoạt động ổn định.
    *   Cấu trúc Prompt AI chặt chẽ: Độ dài kết quả tối đa 90 từ, ngôn từ báo cáo, không dùng từ khen sáo rỗng.
    *   Trạng thái loading tinh tế tích hợp ngay trong nút bấm ("Hệ thống đang suy nghĩ...").

### C. Trải nghiệm Người dùng (UX/UI Excellence)
*   **Global Navigation Header:** Thanh menu được đưa vào cấu trúc gốc (`layout.tsx`), tích hợp logo HGPT và avatar Smiley thân thiện trên mọi trang.
*   **Mobile Hamburger Menu:** Hệ thống menu di động dạng ngăn kéo (drawer) mượt mà, giúp chuyển đổi nhanh chóng giữa Home, Hướng dẫn và Core Values trên điện thoại.
*   **Vertical Industrial Timeline (Docs):** Sơ đồ quy trình được thiết kế lại hoàn toàn theo dạng Timeline dọc với các thẻ (cards) đánh số hiện đại, giúp hiển thị hoàn hảo trên smartphone mà không bị dồn chữ.
*   **Avatar Smile System:** Thay thế các chữ cái viết tắt khô khan bằng biểu tượng mặt cười thân thiện (`Smile` icon) xuyên suốt từ Header, Timeline đến Modal.

### D. Hệ thống Lọc & Tìm kiếm
*   **Dynamic Multi-Filter:** Bộ lọc kép linh hoạt giúp nhân viên dễ dàng tìm kiếm câu chuyện theo thời gian (Hôm nay, Tuần này, Tháng này) hoặc lọc theo từng Giá trị cốt lõi cụ thể của HGPT.

---

## 3. Vận hành & Triển khai (Deployment)

*   **LAN Support:** Cấu hình `allowedDevOrigins` trong `next.config.ts` cho phép truy cập ứng dụng qua IP mạng nội bộ (192.168.x.x) từ điện thoại cá nhân.
*   **Bảo mật:** File `.env.local` được quản lý chặt chẽ để bảo vệ Google Private Key và Gemini API Key.
*   **Build Optimization:** Dự án đã vượt qua bài kiểm tra `npm run build` với hiệu suất tĩnh (Static Prerender) cao nhất cho các trang tài liệu.

---
**Dự án được xây dựng bởi đội ngũ HGPT Steel - Kiến tạo Văn hóa dựa trên Năng lực và Sự chính trực.**
