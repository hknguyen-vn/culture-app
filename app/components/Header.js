'use client'
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, X, Smile, Menu } from 'lucide-react';
import StoryForm from './StoryForm';

export default function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle ESC key to close modal/menu
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeMenu();
      }
    };
    if (isFormOpen || isMenuOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; 
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen, isMenuOpen, closeModal, closeMenu]);

  // Mobile Menu Content
  const mobileMenuContent = isMenuOpen && mounted && createPortal(
    <div className="fixed inset-0 z-[10000] bg-slate-900 animate-in fade-in duration-300 md:hidden flex flex-col p-10">
      <div className="flex justify-between items-center mb-16">
        <img src="/hgptsteel.png" alt="HGPT STEEL" className="h-8 w-auto brightness-0 invert" />
        <button onClick={closeMenu} className="p-3 bg-white/10 rounded-full text-white">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex flex-col gap-8">
        {[
          { name: 'HOME', href: '/' },
          { name: 'HƯỚNG DẪN', href: '/docs' },
          { name: 'CORE VALUES', href: '/values' }
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className={`text-3xl font-black uppercase tracking-tight ${pathname === item.href ? 'text-white' : 'text-slate-500'}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-10 border-t border-white/10">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">HGPT STEEL • INTERNAL CULTURE • 2026</p>
      </div>
    </div>,
    document.body
  );

  const modalContent = isFormOpen && mounted && createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-300 py-10 px-4"
      onClick={closeModal} 
    >
      <div
        className="bg-white w-full max-w-3xl mx-auto rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="absolute top-9 right-8 z-[125]">
          <button
            onClick={closeModal}
            className="p-3 hover:bg-slate-50 rounded-full transition-all active:scale-90 border border-transparent hover:border-slate-100 flex items-center justify-center"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="px-10 pt-12 pb-12 md:px-12 md:pt-16 md:pb-16 text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none uppercase">Tóm lượt câu chuyện thực tế</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-3">HGPT Steel • AI Assisted</p>
            </div>
          </div>
          <StoryForm onSuccess={closeModal} />
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* MOBILE MENU TRIGGER */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2.5 bg-slate-100 rounded-xl text-slate-500 active:scale-90 transition-transform"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="flex items-center gap-2 group cursor-pointer ml-1 md:ml-0">
              <img src="/hgptsteel.png" alt="HGPT STEEL" className="h-[28px] md:h-8 w-auto object-contain" />
            </Link>
            <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest ml-4">
              <Link
                href="/"
                className={`transition-all pb-1 border-b-2 ${pathname === '/' ? 'text-slate-900 border-brand-red' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                HOME
              </Link>
              <Link
                href="/docs"
                className={`transition-all pb-1 border-b-2 ${pathname === '/docs' ? 'text-slate-900 border-brand-red' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                HƯỚNG DẪN
              </Link>
              <Link
                href="/values"
                className={`transition-all pb-1 border-b-2 ${pathname === '/values' ? 'text-slate-900 border-brand-red' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                CORE VALUES
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsFormOpen(true)}
              className="relative flex items-center justify-center md:justify-start gap-2.5 px-3 md:px-5 h-11 bg-slate-900 border border-slate-800 text-white rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-95 group overflow-hidden"
              aria-label="Tạo câu chuyện mới"
            >
              <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-brand-red/40 animate-ping opacity-20 group-hover:hidden" />

              <Plus size={18} className="relative z-10" />
              <span className="relative z-10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] pt-0.5 whitespace-nowrap hidden sm:inline">
                Gửi câu chuyện
              </span>
            </button>
            <div className="hidden xs:flex w-10 h-10 md:w-9 md:h-9 bg-slate-100 rounded-full border border-slate-200 items-center justify-center text-slate-400">
              <Smile size={20} />
            </div>
          </div>
        </div>
      </header>

      {mobileMenuContent}
      {modalContent}
    </>
  );
}
