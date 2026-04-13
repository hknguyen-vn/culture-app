import { MapPin, User, Quote, Clock, Award } from 'lucide-react';
import LikeButton from './LikeButton';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function StoryCard({ story, onClick }) {
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
    <article 
      onClick={() => onClick(story)}
      className="group bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
        <Quote size={120} className="text-brand-red rotate-12" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border ${getTagColor(tagValue)}`}>
          {tagValue}
        </span>
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Clock size={12} />
          {(() => {
            if (!story.created_at) return 'Vừa xong';
            const d = new Date(story.created_at);
            if (isNaN(d.getTime())) return story.created_at; 
            return formatDistanceToNow(d, { addSuffix: true, locale: vi });
          })()}
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-6 group-hover:text-brand-red transition-colors line-clamp-2">
        {story.title}
      </h3>

      <div className="pl-6 border-l-2 border-slate-100 mb-8">
        <p className="text-slate-500 text-lg leading-relaxed line-clamp-3 font-medium">
          {story.story_content}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
            <User size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{story.employee_name || 'Ẩn danh'}</p>
            <p className="text-[11px] font-bold text-brand-red/70 uppercase tracking-widest">{story.department || 'Phòng ban'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <LikeButton storyId={story.id} initialLikes={story.likes} isDark={false} />
          
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
            <Award size={14} className="text-amber-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase">Impact</span>
          </div>
        </div>
      </div>
    </article>
  );
}
