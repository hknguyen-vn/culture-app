'use client'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Clock, Quote, Smile } from 'lucide-react';
import LikeButton from './LikeButton';

export default function StoryDetailModal({ story, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !story || !mounted) return null;

  const getTagColor = (val) => {
    switch (val) {
      case 'Nói sao làm vậy': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Giải pháp tối ưu': return 'bg-red-50 text-brand-red border-red-100';
      case 'Trách nhiệm đến cùng': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const tagValue = story.core_values?.[0] || 'Văn hóa HGPT';

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/20 relative animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="absolute top-8 right-8 z-10">
          <button 
            onClick={onClose}
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all active:scale-90"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="p-10 md:p-14 text-left">
          <div className="flex items-center gap-4 mb-8">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border ${getTagColor(tagValue)}`}>
               {tagValue}
             </span>
             <div className="h-px flex-1 bg-slate-100" />
             <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
               <Clock size={12} /> HGPT STEEL
             </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
            {story.title}
          </h2>

          <div className="relative mb-12">
            <Quote className="absolute -left-6 -top-4 text-slate-100 w-12 h-12 -z-10" />
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {story.story_content}
            </p>
          </div>

          <div className="pt-10 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm shadow-slate-100">
                <Smile size={24} />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Người cung cấp</p>
                <p className="text-base font-bold text-slate-900">{story.employee_name || 'Ẩn danh'}</p>
                <p className="text-xs font-semibold text-brand-red/70">{story.department || 'Văn hóa Thép HGPT'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <LikeButton storyId={story.id} initialLikes={story.likes} isDark={false} />
               <span className="text-[10px] font-black text-slate-400 uppercase pr-2">Tương tác</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
