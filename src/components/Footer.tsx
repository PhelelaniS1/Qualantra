import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E7E3DA] py-16 text-xs text-[#78716C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#E7E3DA]">
          <div>
            <div className="font-serif text-2xl text-[#1C1917] tracking-tight mb-2">
              QUALANTRA
            </div>
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <span>Learn</span>
              <span aria-hidden="true">·</span>
              <span>Teach</span>
              <span aria-hidden="true">·</span>
              <span>Connect</span>
            </div>
            <p className="text-xs text-[#78716C] mt-2 max-w-sm">
              South Africa’s premier live classroom infrastructure, connecting dedicated subject specialists with focused 10-learner pods across all nine provinces.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-xs font-medium text-[#44403C]">
            <a href="#classroom" className="hover:text-[#1C1917] transition-colors">
              The Classroom
            </a>
            <a href="#perspectives" className="hover:text-[#1C1917] transition-colors">
              Four Perspectives
            </a>
            <a href="#pedagogy" className="hover:text-[#1C1917] transition-colors">
              Pedagogical Standard
            </a>
            <a href="#admin" className="hover:text-[#1C1917] transition-colors">
              Institutional Oversight
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#A8A29E]">
          <div>
            © {new Date().getFullYear()} QUALANTRA Education (Pty) Ltd. Registered in the Republic of South Africa.
          </div>
          <div className="flex items-center gap-4">
            <span>SACE Accredited Frameworks</span>
            <span aria-hidden="true">·</span>
            <span>CAPS & IEB Aligned</span>
            <span aria-hidden="true">·</span>
            <span>POPIA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
