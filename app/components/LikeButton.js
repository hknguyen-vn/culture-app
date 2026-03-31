'use client'
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likeStory } from '../actions/storyActions';

export default function LikeButton({ storyId, initialLikes, isDark = false }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleLike = async () => {
    if (isLiked) return;
    
    setIsAnimate(true);
    setIsLiked(true);
    setLikes(prev => prev + 1);
    
    const result = await likeStory(storyId);
    if (!result.success) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
    
    setTimeout(() => setIsAnimate(false), 500);
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2.5 md:px-3 md:py-1.5 rounded-lg border transition-all duration-300 group ${
        isLiked 
          ? 'bg-rose-50 text-rose-500 border-rose-100' 
          : 'bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-500 border-slate-200 hover:border-rose-100 shadow-sm'
      }`}
    >
      <Heart 
        size={14} 
        className={`${isLiked ? 'fill-rose-500' : ''} ${isAnimate ? 'scale-150' : 'scale-100'} transition-transform duration-300`} 
      />
      <span className="font-black text-[10px] tracking-tight">{likes}</span>
    </button>
  );
}
