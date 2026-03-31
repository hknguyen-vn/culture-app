import { TrendingUp, Zap } from 'lucide-react';
import Header from './components/Header';
import StoryFeed from './components/StoryFeed';
import RankingBoard from './components/RankingBoard';
import { getStories } from './actions/storyActions';

export default async function CultureBoard() {
  const stories = await getStories();
  const totalLikes = (stories || []).reduce((acc, s) => acc + (s.likes || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-50 selection:text-brand-red font-sans">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-12 space-y-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-brand-red pl-6 pb-2">
            <div>
              <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-1">Bảng tin Văn hóa</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">TIMELINE</h2>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bài viết</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-black border border-slate-200 text-xs">{stories.length.toString().padStart(2, '0')}</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tương tác</span>
                <span className="bg-rose-50 text-rose-500 px-2 py-0.5 rounded font-black border border-rose-100 text-xs">{totalLikes.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1 w-full">
              <StoryFeed initialStories={stories} />
            </div>
            <aside className="w-full lg:w-[320px] shrink-0">
              <RankingBoard stories={stories} />
            </aside>
          </div>
        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto px-10 py-16 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">© 2026 HGPT Steel Core Value • Powered by AI</p>
      </footer>
    </div>
  );
}