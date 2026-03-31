'use client'
import { useState, useMemo, useEffect } from 'react';
import FilterBar from './FilterBar';
import StoryCard from './StoryCard';

export default function StoryFeed({ initialStories }) {
  const [timeFilter, setTimeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only calculating relative time on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredStories = useMemo(() => {
    let result = [...initialStories];

    if (tagFilter !== 'all') {
      result = result.filter(s => s.core_values?.includes(tagFilter));
    }

    const now = new Date();
    if (timeFilter === 'today') {
      result = result.filter(s => {
        const d = new Date(s.createdAt);
        return d.toDateString() === now.toDateString();
      });
    } else if (timeFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      result = result.filter(s => new Date(s.createdAt) > weekAgo);
    } else if (timeFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      result = result.filter(s => new Date(s.createdAt) > monthAgo);
    }

    return result;
  }, [initialStories, timeFilter, tagFilter]);

  const getRelativeTime = (dateStr) => {
    if (!mounted) return '';
    const d = new Date(dateStr);
    const diff = new Date() - d;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  return (
    <div className="space-y-4">
      <FilterBar 
        activeTime={timeFilter} 
        onTimeChange={setTimeFilter}
        activeTag={tagFilter}
        onTagChange={setTagFilter}
      />
      
      {filteredStories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-20 text-center shadow-sm">
          <div className="text-slate-400 italic mb-2 text-sm uppercase tracking-widest font-bold">Không tìm thấy dữ liệu trong khu vực này.</div>
          <button onClick={() => {setTimeFilter('all'); setTagFilter('all');}} className="text-indigo-600 text-[10px] font-black uppercase tracking-widest underline">Đặt lại bộ lọc</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredStories.map((story, index) => (
            <StoryCard 
              key={story.id || index} 
              story={story} 
              relativeTime={getRelativeTime(story.createdAt)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
