import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppRoute } from '../../types';

interface FinalCtaSectionProps {
  onNavigate: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-[#F5F3ED] border border-[#E7E3DA] rounded-lg p-10 sm:p-16 text-center max-w-4xl mx-auto space-y-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
            Learn. Teach. Connect.
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#1C1917] tracking-tight leading-[1.18] max-w-2xl mx-auto">
            A serious foundation for South African digital education.
          </h2>

          <p className="text-base sm:text-lg text-[#57534E] max-w-xl mx-auto leading-relaxed">
            Whether you are an ambitious learner preparing for national examinations, a dedicated
            educator seeking teaching opportunity, or a school director expanding subject capacity,
            QUALANTRA provides the human infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/signup')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer shadow-xs"
            >
              Get started with QUALANTRA
            </button>

            <button
              onClick={onOpenConsultation || (() => onNavigate('/about'))}
              className="px-6 py-3 text-xs sm:text-sm font-medium text-[#292524] bg-white border border-[#D6D3CD] rounded-md hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            >
              Learn more about our governance
            </button>
          </div>

          <div className="pt-6 border-t border-[#E7E3DA] text-xs text-[#78716C] flex flex-wrap items-center justify-center gap-3">
            <span>SACE Accredited Educator Framework</span>
            <span aria-hidden="true">·</span>
            <span>CAPS and IEB Aligned</span>
            <span aria-hidden="true">·</span>
            <span>Twelve Official South African Languages</span>
          </div>
        </div>
      </div>
    </section>
  );
};
