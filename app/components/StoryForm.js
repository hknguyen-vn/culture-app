'use client'
import { useState } from 'react';
import { generateStoryPreview, saveStory } from '../actions/storyActions';
import { Sparkles, Save, Edit3, RotateCcw, X, ShieldCheck, Zap, Cpu, Activity, Info, BookOpen, User, Building, Target } from 'lucide-react';

export default function StoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    targetValue: 'Nói sao làm vậy',
    rawInput: ''
  });

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // System Context shared with the AI
  const systemContext = {
    model: "GEMINI 3.1 FLASH-LITE",
    slogan: "Cùng nhau thành công",
    philosophy: "Khi mỗi quyết định đều lấy khách hàng làm trung tâm, công ty làm nền tảng và cá nhân làm động lực phát triển."
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleGenerate(e) {
    if (e) e.preventDefault();
    setIsLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));

    try {
      const result = await generateStoryPreview(submitData);
      if (result.success) {
        setPreview(result.data);
      }
    } catch (error) {
      alert("Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const result = await saveStory(preview);
      if (result.success) {
        setPreview(null);
        setFormData({
          employeeName: '',
          department: '',
          targetValue: 'Nói sao làm vậy',
          rawInput: ''
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      alert("Lỗi: " + error.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handlePreviewChange = (e) => {
    const { name, value } = e.target;
    setPreview(prev => ({ ...prev, [name]: value }));
  };

  if (preview) {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-md">
        <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">

          {/* TRÁI: LIVE PREVIEW */}
          <div className="hidden md:flex flex-1 bg-slate-50 p-10 items-center justify-center border-r border-slate-100 overflow-y-auto">
            <div className="w-full max-w-sm">
              <p className="text-[11px] font-bold text-brand-red uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles size={12} /> Bản xem trước nội dung
              </p>
              <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm border border-slate-200">
                      {preview.employeeName?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{preview.employeeName || 'Ẩn danh'}</h4>
                      <p className="text-xs text-slate-400 font-medium">{preview.department || 'Ghi chú khác'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 transition-colors ${preview.targetValue === 'Nói sao làm vậy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    preview.targetValue === 'Giải pháp tối ưu' ? 'bg-red-50 text-brand-red border-red-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    <ShieldCheck size={11} /> {preview.targetValue.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-4 text-slate-900 leading-tight break-words tracking-tight">
                  {preview.title}
                </h3>
                <div className="max-h-[240px] overflow-y-auto no-scrollbar">
                  <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                    {preview.story_content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PHẢI: EDITOR */}
          <div className="flex-[1.2] p-8 md:p-12 flex flex-col overflow-y-auto bg-white">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Biên tập nội dung</h2>
                <p className="text-slate-400 text-xs font-medium mt-1">Hoàn thiện câu chuyện AI trước khi xuất bản</p>
              </div>
              <button onClick={() => setPreview(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors md:hidden">
                <X size={22} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-2">
                  <Edit3 size={13} /> Tiêu đề câu chuyện
                </label>
                <input
                  name="title"
                  value={preview.title}
                  onChange={handlePreviewChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-2">
                  <Edit3 size={13} /> Nội dung chi tiết
                </label>
                <textarea
                  name="story_content"
                  value={preview.story_content}
                  onChange={handlePreviewChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm text-slate-600 leading-relaxed focus:bg-white focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none h-64 transition-all resize-none"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPreview(null)}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-5 rounded-2xl border border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-50 transition-all"
              >
                <RotateCcw size={14} /> Thử lại
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-[2] flex items-center justify-center gap-2 py-4 px-5 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={16} /> Lưu & Xuất bản
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const wordCount = getWordCount(formData.rawInput);

  return (
    <form id="culture-story-form" onSubmit={handleGenerate} className="space-y-6">
      {/* 1. LARGE INPUT AREA - CONTENT FIRST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between ml-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <Edit3 size={14} /> 1. Nội dung sự kiện / Công việc thực tế (Nhập khoảng 5-7 ý chính)
          </label>
          <span className={`text-[10px] font-black uppercase tracking-widest ${wordCount > 250 ? 'text-red-500' : 'text-slate-400'}`}>
            {wordCount} / 250 từ
          </span>
        </div>
        <div className="relative group">
          <textarea
            name="rawInput"
            value={formData.rawInput}
            onChange={handleInputChange}
            placeholder={`Nhập các ý chính của câu chuyện (nên từ 5-7 ý để AI viết chi tiết)...
Ví dụ:
- Tại nhà máy HGPT hôm nay
- Anh Tấn - tổ ráp phát hiện sai lệch trong bản vẽ
- Chủ động phối hợp với kỹ thuật để sửa đổi
- Thực hiện sửa ngay tại chỗ
- Giúp dự án kịp tiến độ xuất khẩu đi Mỹ vào cuối tháng`}
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] p-6 text-base text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none h-68 transition-all resize-none relative z-0 font-medium leading-relaxed italic whitespace-pre-wrap"
            required
          />
        </div>
      </div>

      {/* 2. CORE VALUES SELECTION */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-2">
          <Zap size={14} /> 2. Giá trị cốt lõi
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['Nói sao làm vậy', 'Giải pháp tối ưu', 'Trách nhiệm đến cùng'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, targetValue: val }))}
              className={`py-3 px-4 rounded-2xl text-[11px] font-bold border transition-all ${formData.targetValue === val
                ? val === 'Nói sao làm vậy' ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-50' :
                  val === 'Giải pháp tối ưu' ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-red-50' :
                    'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-50'
                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* 3. OPTIONAL METADATA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-2">
            <User size={14} /> 3. Người cung cấp (không bắt buộc)
          </label>
          <input
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:bg-white focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-2">
            <Building size={14} /> 4. Ghi chú (không bắt buộc)
          </label>
          <input
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="..."
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:bg-white focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all"
          />
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <button
        type="submit"
        disabled={isLoading || wordCount > 250}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-100 disabled:opacity-50 mt-6 overflow-hidden relative"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="uppercase tracking-[0.2em]">Hệ thống đang suy nghĩ...</span>
          </div>
        ) : (
          <>
            <Sparkles size={16} className="fill-white" />
            <span className="uppercase tracking-[0.2em]">{wordCount > 250 ? 'Vượt quá 250 từ' : 'NHỜ AI VIẾT LẠI'}</span>
          </>
        )}
      </button>
    </form>
  );
}
