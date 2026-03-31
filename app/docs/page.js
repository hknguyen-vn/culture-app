'use client'
import { User, Cpu, ClipboardCheck, LayoutGrid, CheckCircle2, MessageSquare, Zap, ShieldCheck, Globe, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const steps = [
    {
      role: 'THÀNH VIÊN',
      action: 'Nhập 5-7 ý chính',
      detail: 'Mô tả thực tế các sự kiện, công việc thô đã diễn ra tại hiện trường hoặc văn phòng.',
      icon: <MessageSquare size={20} />,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      to: 'AI ASSIST'
    },
    {
      role: 'AI ASSIST',
      action: 'Biên tập & Gợi ý',
      detail: 'AI tự động phân tích hành động để gán Giá trị cốt lõi phù hợp và viết lại súc tích.',
      icon: <Zap size={20} />,
      color: 'text-brand-red',
      bgColor: 'bg-red-50',
      to: 'NGƯỜI CUNG CẤP'
    },
    {
      role: 'NGƯỜI CUNG CẤP',
      action: 'Kiểm tra & Xuất bản',
      detail: 'Xem lại nội dung lần cuối để đảm bảo tính xác thực trước khi chia sẻ lên bảng tin chung.',
      icon: <ShieldCheck size={20} />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      to: 'BẢNG TIN'
    }
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      {/* HEADER */}
      <section className="pt-16 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
          <Globe size={12} className="text-brand-red" />
          HGPT Steel Culture Guidelines
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-6 uppercase">
          Quy trình chia sẻ câu chuyện
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium leading-relaxed">
          Ứng dụng sức mạnh của AI để ghi nhận và lan tỏa những giá trị cốt lõi từ thực tế sản xuất hàng ngày.
        </p>
      </section>

      {/* MOBILE-FIRST VERTICAL FLOW */}
      <section className="flex-1 max-w-2xl w-full mx-auto px-6 pb-20">
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx}>
              {/* STEP CARD */}
              <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                {/* DECORATIVE STEP NUMBER */}
                <span className="absolute -top-4 -right-4 text-8xl font-black text-slate-50/50 group-hover:text-slate-100/50 transition-colors">
                  0{idx + 1}
                </span>

                <div className="relative z-10 space-y-6">
                  {/* ACTOR & TARGET */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${step.bgColor} ${step.color} flex items-center justify-center shadow-sm`}>
                        {step.icon}
                      </div>
                      <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">{step.role}</span>
                    </div>
                    {idx < steps.length && (
                      <div className="flex items-center gap-2 pr-2">
                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">Chuyển đến</span>
                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{step.to}</span>
                      </div>
                    )}
                  </div>

                  {/* ACTION TITLE */}
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
                    {step.action}
                  </h3>

                  {/* DETAIL TEXT */}
                  <p className="text-slate-500 text-sm font-medium leading-relaxed pr-8">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* CONNECTING ARROW */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="h-12 w-px border-l-2 border-dashed border-slate-200 relative">
                    <div className="absolute -bottom-1 -left-[5px]">
                      <ArrowDown size={10} className="text-slate-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-4 bg-slate-900 border border-slate-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-red hover:border-brand-red transition-all shadow-xl shadow-slate-200 active:scale-95 group w-full sm:w-auto justify-center"
          >
            <CheckCircle2 size={18} className="group-hover:rotate-12 transition-transform" />
            BẮT ĐẦU NGAY BÂY GIỜ
          </Link>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            <LayoutGrid size={14} className="text-brand-red" />
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">HGPT STEEL • INTERNAL CULTURE • 2026</span>
          </div>
        </div>
      </section>
    </main>
  );
}
