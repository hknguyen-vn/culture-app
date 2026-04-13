import Link from 'next/link';
import { PenTool, Wand2, Sparkles, AlertCircle, ArrowRight, CheckCircle2, ChevronRight, FileEdit, MessageSquareText, Layers } from 'lucide-react';

export default function DocsPage() {
  const modes = [
    {
      id: 'manual',
      icon: <PenTool className="text-slate-700 w-6 h-6" />,
      title: 'Tự Viết',
      tag: 'CƠ BẢN',
      tagColor: 'bg-slate-100 text-slate-600',
      description: 'Chế độ soạn thảo thuần túy. Dành cho những câu chuyện đã được chau chuốt kỹ lưỡng, văn phong sắc bén không cần AI can thiệp.',
      specs: [
        'Giới hạn: Tối đa 500 từ',
        'Tốc độ: Đăng ngay lập tức',
        'Can thiệp: 0% tự động hóa'
      ],
      color: 'bg-white',
      borderColor: 'border-slate-200'
    },
    {
      id: 'rewrite',
      icon: <Wand2 className="text-indigo-600 w-6 h-6" />,
      title: 'Viết Lại Chuyên Nghiệp',
      tag: 'AI PHỤ TRỢ',
      tagColor: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      description: 'Cung cấp ý tưởng thô (gạch đầu dòng, nội dung rời rạc). Trí tuệ nhân tạo sẽ tự động tổng hợp, trau chuốt lại câu từ mượt mà nhưng vẫn giữ nguyên vẹn ý nghĩa cốt lõi.',
      specs: [
        'Giới hạn: Dưới 250 từ (Bản thô)',
        'Tốc độ: ~3s xử lý AI',
        'Can thiệp: Tối ưu hành văn, sửa lỗi chính tả'
      ],
      color: 'bg-white',
      borderColor: 'border-slate-200 hover:border-indigo-200 hover:shadow-indigo-50'
    },
    {
      id: 'summarize',
      icon: <Sparkles className="text-brand-red w-6 h-6" />,
      title: 'Tóm Tắt SIÊU GỌN',
      tag: 'NÂNG CAO',
      tagColor: 'bg-red-50 text-brand-red border border-red-100',
      description: 'Dành cho các bài báo cáo, nội dung quá dài dòng. AI sẽ lọc ra những ý chính quan trọng nhất và căn chỉnh lại luồng thông tin ngắn gọn, súc tích (100-150 từ).',
      specs: [
        'Giới hạn: Lên đến 400 từ',
        'Tốc độ: ~5s xử lý AI',
        'Can thiệp: Cắt gọt, chắt lọc tinh hoa'
      ],
      color: 'bg-white',
      borderColor: 'border-slate-200 hover:border-red-200 hover:shadow-red-50'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900 selection:bg-brand-red/10 selection:text-brand-red">
      {/* HEADER SECTION - COMPACT */}
      <section className="bg-white border-b border-slate-200 pt-16 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            <Layers size={14} className="text-slate-500" />
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Cẩm nang tương tác</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
            HƯỚNG DẪN <span className="text-brand-red">ĐĂNG BÀI</span>
          </h1>
          
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            HGPT Steel Culture Board cung cấp 3 chế độ soạn thảo tối ưu hóa, đảm bảo mọi câu chuyện văn hóa đều được truyền tải rõ ràng, mạnh mẽ và chuyên nghiệp nhất.
          </p>
        </div>
      </section>

      {/* MODES GRID - ALL IN ONE SCREEN */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <div key={mode.id} className={`rounded-3xl p-8 border shadow-sm transition-all duration-300 group ${mode.color} ${mode.borderColor} hover:-translate-y-1 hover:shadow-xl`}>
              
              <div className="flex justify-between items-start mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                  {mode.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${mode.tagColor}`}>
                  {mode.tag}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {mode.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed font-medium h-24">
                  {mode.description}
                </p>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  {mode.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-xs font-semibold text-slate-500">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW BOTTOM BAR */}
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-4">
        
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <SimpleStep num="1" text="Soạn thảo" />
          <ArrowRight size={14} className="text-slate-200 shrink-0" />
          <SimpleStep num="2" text="Kiểm tra" />
          <ArrowRight size={14} className="text-slate-200 shrink-0" />
          <SimpleStep num="3" text="Xuất bản" />
        </div>

        <Link
          href="/"
          className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-red transition-all shadow-xl active:scale-95 group"
        >
          <CheckCircle2 size={16} className="group-hover:rotate-12 transition-transform" />
          BẮT ĐẦU NGAY
        </Link>
      </div>
    </main>
  );
}

function SimpleStep({ num, text }) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className="text-brand-red text-lg font-black italic opacity-50">{num}</span>
      <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest">{text}</span>
    </div>
  );
}
