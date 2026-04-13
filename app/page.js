import { BookOpen, Heart } from 'lucide-react';
import StoryFeed from './components/StoryFeed';
import RankingBoard from './components/RankingBoard';
import { getStories } from './actions/storyActions';

export default async function CultureBoard() {
  const stories = await getStories();
  const totalLikes = (stories || []).reduce((acc, s) => acc + (s.likes || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-50 selection:text-brand-red font-sans">

      <main className="max-w-[1400px] mx-auto px-6 py-12 space-y-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-brand-red pl-6 pb-2">
            <div>
              <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-1">Bảng tin Văn hóa</p>
              <h2 className="text-2xl font-black text-slate-700 tracking-tight uppercase leading-none">TIMELINE</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <BookOpen size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Bài viết</p>
                  <p className="text-base font-black text-slate-900 leading-none">{stories.length.toString().padStart(2, '0')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                  <Heart size={16} className="fill-rose-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Tương tác</p>
                  <p className="text-base font-black text-rose-600 leading-none">{totalLikes.toString().padStart(2, '0')}</p>
                </div>
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