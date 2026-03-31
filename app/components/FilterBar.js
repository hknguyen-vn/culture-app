'use client'
import { Calendar, Tag, ChevronDown } from 'lucide-react';

export default function FilterBar({ activeTime, onTimeChange, activeTag, onTagChange }) {
  const timeOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'today', label: 'Hôm nay' },
    { id: 'week', label: 'Tuần này' },
    { id: 'month', label: 'Tháng này' },
  ];

  const tagOptions = [
    { id: 'all', label: 'Tất cả giá trị' },
    { id: 'Nói sao làm vậy', label: 'Nói sao làm vậy' },
    { id: 'Giải pháp tối ưu', label: 'Giải pháp tối ưu' },
    { id: 'Trách nhiệm đến cùng', label: 'Trách nhiệm đến cùng' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-[80px] z-40 bg-white/95 py-4 md:py-6 transition-all border-b border-slate-200">
      {/* Time Filter */}
      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-x-auto no-scrollbar relative z-30">
        {timeOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onTimeChange(opt.id)}
            className={`px-5 py-3 md:px-4 md:py-2 rounded-md text-[10px] md:text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer relative z-40 ${
              activeTime === opt.id 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                : 'text-slate-400 hover:text-slate-900 active:bg-slate-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-x-auto no-scrollbar scroll-smooth relative z-30">
        {tagOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onTagChange(opt.id)}
            className={`px-5 py-3 md:px-4 md:py-2 rounded-md text-[10px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer relative z-40 ${
              activeTag === opt.id 
                ? 'bg-brand-red text-white shadow-lg shadow-red-100' 
                : 'text-slate-400 hover:text-brand-red active:bg-slate-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
