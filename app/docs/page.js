'use client'
import { User, Cpu, ClipboardCheck, LayoutGrid, CheckCircle2, MessageSquare, Zap, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const interactions = [
    {
      from: 'THÀNH VIÊN',
      to: 'AI ASSIST',
      label: 'Nhập 5-7 ý chính',
      desc: 'Nội dung thực tế thô',
      icon: <MessageSquare size={16} />
    },
    {
      from: 'AI ASSIST',
      to: 'NGƯỜI CUNG CẤP',
      label: 'Bản thảo & Phân loại',
      desc: 'AI gán Giá trị cốt lõi',
      icon: <Zap size={16} />,
      dashed: true
    },
    {
      from: 'NGƯỜI CUNG CẤP',
      to: 'BẢNG TIN',
      label: 'Kiểm tra & Đăng bài',
      desc: 'Xác thực & Lan tỏa',
      icon: <ShieldCheck size={16} />
    }
  ];

  const actors = [
    { name: 'THÀNH VIÊN', icon: <User size={20} /> },
    { name: 'AI ASSIST', icon: <Cpu size={20} /> },
    { name: 'NGƯỜI CUNG CẤP', icon: <ClipboardCheck size={20} /> },
    { name: 'BẢNG TIN', icon: <LayoutGrid size={20} /> }
  ];

  return (
    <main className="h-[calc(100vh-80px)] bg-white overflow-hidden flex flex-col">
      {/* COMPACT HEADER SECTION */}
      <section className="pt-10 pb-8 px-6 text-center flex-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <Globe size={10} className="text-brand-red" />
          HGPT Steel Culture System
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-4 uppercase">
          Quy trình vận hành
        </h1>
        
        {/* FAST CTA AT TOP */}
        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-red hover:border-brand-red transition-all shadow-xl shadow-slate-200 active:scale-95 group"
          >
            <CheckCircle2 size={18} className="group-hover:rotate-12 transition-transform" />
            Bắt đầu chia sẻ câu chuyện
          </Link>
        </div>
      </section>

      {/* SEQUENCE DIAGRAM CONTAINER (Fit to remaining space) */}
      <section className="flex-1 max-w-6xl w-full mx-auto px-6 pb-6">
        <div className="h-full bg-slate-50/50 border border-slate-100 rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col">
          
          <div className="text-center mb-10 flex-none">
             <h2 className="text-[9px] font-black tracking-[0.3em] text-slate-300 uppercase">Interactive Flow Diagram</h2>
          </div>

          {/* ACTORS HEADER */}
          <div className="flex justify-between items-start relative z-20 mb-12 flex-none">
            {actors.map((actor, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 w-1/4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-slate-50 shadow-sm flex items-center justify-center text-slate-600 transition-all group">
                  <div className="group-hover:text-brand-red transition-colors md:scale-110">
                    {actor.icon}
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-slate-400 text-center uppercase whitespace-nowrap">
                  {actor.name}
                </span>
              </div>
            ))}
          </div>

          {/* DIAGRAM FLOW AREA (Flexible) */}
          <div className="relative flex-1">
            {/* VERTICAL LIFE-LINES */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-[12.5%]">
              {actors.map((_, i) => (
                <div key={i} className="w-px h-full flex flex-col items-center">
                  <div className="w-px h-full border-l-2 border-dashed border-slate-200" />
                </div>
              ))}
            </div>

            {/* INTERACTION MESSAGES (Arrows) */}
            <div className="relative z-10 pt-10 flex flex-col h-full justify-around px-[12.5%]">
              {interactions.map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center"
                  style={{
                    marginLeft: `${idx * 25}%`,
                    width: '25%'
                  }}
                >
                  {/* Arrow Line */}
                  <div className={`flex-1 h-0 border-t-2 ${step.dashed ? 'border-dashed border-slate-300' : 'border-brand-red'} relative`}>
                    <div className={`absolute -right-1 -top-[7px] border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent ${step.dashed ? 'border-l-slate-300' : 'border-l-brand-red'}`} />

                    {/* Label Above based on position to avoid clashing with arrows */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-max text-center -top-20`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className={`p-1.5 rounded-lg ${step.dashed ? 'bg-slate-100 text-slate-400' : 'bg-brand-red/5 text-brand-red shadow-sm'}`}>
                          {step.icon}
                        </span>
                        <span className="text-[13px] font-black text-slate-900 tracking-tight uppercase">{step.label}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2 py-0.5 rounded-full inline-block border border-slate-200 bg-white shadow-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <div className="absolute bottom-0 right-0 p-8 text-slate-100 pointer-events-none opacity-30">
            <LayoutGrid size={180} strokeWidth={0.5} />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-none">
            <p className="text-[9px] font-black text-slate-200 uppercase tracking-[0.5em] whitespace-nowrap">
              HGPT STEEL • INTERNAL CULTURE • 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
