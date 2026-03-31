import { useState } from 'react';
import { ShieldCheck, Clock, X, Heart, User, Building, Quote, Smile } from 'lucide-react';
import LikeButton from './LikeButton';
import StoryDetailModal from './StoryDetailModal';

export default function StoryCard({ story, relativeTime }) {
  const [isOpen, setIsOpen] = useState(false);

  const getTagColor = (val) => {
    switch (val) {
      case 'Nói sao làm vậy': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Giải pháp tối ưu': return 'bg-red-50 text-brand-red border-red-100';
      case 'Trách nhiệm đến cùng': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const tagValue = story.core_values?.[0] || 'Văn hóa HGPT';

  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full items-start text-left">
      <div className="p-7 md:p-8 flex flex-col flex-1 w-full relative">
        <div className="flex items-center justify-between mb-5">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${getTagColor(tagValue)}`}>
            {tagValue.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Clock size={12} /> {relativeTime}
          </div>
        </div>

        <div 
          className="cursor-pointer group/content flex-1 flex flex-col"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-[19px] font-bold text-slate-900 mb-3 tracking-tight leading-snug group-hover/content:text-brand-red transition-colors">
            {story.title}
          </h3>

          <div className="relative flex-1">
            <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-4 mb-2">
              {story.story_content}
            </p>
            <button 
              className="text-brand-red text-[11px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 mb-6"
            >
              Xem chi tiết...
            </button>
          </div>
        </div>

        <div className="pt-5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100">
              <Smile size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {story.employee_name}
              </p>
              <p className="text-xs font-medium text-slate-500">
                {story.department}
              </p>
            </div>
          </div>
          <LikeButton storyId={story.id} initialLikes={story.likes} isDark={false} />
        </div>
      </div>

      <StoryDetailModal 
        story={story} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
}
