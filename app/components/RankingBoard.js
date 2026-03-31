'use client'
import { useState } from 'react';
import { Trophy, TrendingUp, Heart } from 'lucide-react';
import StoryDetailModal from './StoryDetailModal';

export default function RankingBoard({ stories = [] }) {
  const [selectedStory, setSelectedStory] = useState(null);

  const topStories = [...stories]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden sticky top-24">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
            <Trophy size={18} className="text-brand-red fill-current opacity-20" />
            <Trophy size={18} className="text-brand-red absolute" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Bảng Xếp Hạng</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Top Tương Tác</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        {topStories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${index === 0 ? 'bg-amber-100 text-amber-600' :
                index === 1 ? 'bg-slate-100 text-slate-500' :
                  index === 2 ? 'bg-orange-50 text-orange-600/70' :
                    'bg-slate-50 text-slate-400'
              }`}>
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-slate-800 truncate group-hover:text-brand-red transition-colors">
                {story.title}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[10px] font-medium text-slate-400 truncate">
                  {story.employee_name || 'Ẩn danh'}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50">
                  <Heart size={8} className="fill-current" />
                  {story.likes || 0}
                </div>
              </div>
            </div>
          </div>
        ))}

        {topStories.length === 0 && (
          <div className="py-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            Chưa có dữ liệu xếp hạng
          </div>
        )}
      </div>

      <div className="p-5 bg-slate-50/30 border-t border-slate-50 text-center">
        <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <TrendingUp size={12} /> Cập nhật
        </div>
      </div>

      {/* Detail Modal */}
      <StoryDetailModal 
        story={selectedStory} 
        isOpen={!!selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </div>
  );
}
