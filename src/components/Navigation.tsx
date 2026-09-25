import React from 'react';
import { Film } from 'lucide-react';

interface NavigationProps {
  onOpenStudio: () => void;
  onOpenConsultation: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenStudio,
  onOpenConsultation,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E3DA] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1C1917] hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="font-serif tracking-normal text-2xl sm:text-3xl text-[#1C1917]">QUALANTRA</span>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]">
          <a
            href="#classroom"
            className="hover:text-[#1C1917] transition-colors"
          >
            The Classroom
          </a>
          <a
            href="#perspectives"
            className="hover:text-[#1C1917] transition-colors"
          >
            Four Perspectives
          </a>
          <a
            href="#pedagogy"
            className="hover:text-[#1C1917] transition-colors"
          >
            1 Teacher, 10 Learners
          </a>
          <a
            href="#admin"
            className="hover:text-[#1C1917] transition-colors"
          >
            Administration
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenStudio}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#44403C] bg-white border border-[#D6D3CD] rounded-md hover:bg-[#F5F3ED] hover:border-[#A8A29E] transition-all whitespace-nowrap shadow-2xs cursor-pointer"
            title="Inspect cinematic shots and export video"
          >
            <Film className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Video Studio</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#292524] rounded-md hover:bg-[#1C1917] active:scale-[0.99] transition-all whitespace-nowrap shadow-xs cursor-pointer"
          >
            School Partnerships
          </button>
        </div>
      </div>
    </header>
  );
};
