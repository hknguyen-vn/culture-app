import { Award, TrendingUp, Trophy, Star } from 'lucide-react';
import LikeButton from './LikeButton';

export default function RankingBoard({ stories }) {
  // Logic to calculate top stories
  const rankedStories = [...(stories || [])]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'text-amber-500 bg-amber-50 border-amber-200'; // Gold
      case 1: return 'text-slate-400 bg-slate-50 border-slate-200'; // Silver
      case 2: return 'text-orange-600 bg-orange-50 border-orange-200'; // Bronze
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy size={18} className="drop-shadow-sm" />;
      case 1: return <Award size={18} />;
      case 2: return <Award size={18} />;
      default: return <span className="font-black text-sm">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-200/60 shadow-sm sticky top-[160px]">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
          <TrendingUp size={24} />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Top Tương tác</h3>
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mt-1">Tuần này</p>
        </div>
      </div>

      <div className="space-y-6">
        {rankedStories.length > 0 ? (
          rankedStories.map((story, index) => (
            <div key={story.id || index} className="group relative">
              <div className="flex gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border shadow-sm ${getRankColor(index)}`}>
                  {getRankIcon(index)}
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-bold text-slate-900 leading-tight mb-2 line-clamp-2 pr-4">
                    {story.title}
                  </p>
                  
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
                       {story.employee_name || 'Ẩn danh'}
                     </p>
                     
                     <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                       <HeartIcon filled />
                       <span className="text-[10px] font-bold text-rose-600">{story.likes || 0}</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
            <Star size={24} className="text-slate-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chưa có dữ liệu</p>
          </div>
        )}
      </div>

      <button className="w-full mt-8 py-3.5 bg-slate-50 hover:bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] rounded-xl transition-colors border border-slate-200/60">
        Xem tất cả
      </button>
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`w-3 h-3 ${filled ? 'text-rose-500' : 'text-slate-400'}`}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
