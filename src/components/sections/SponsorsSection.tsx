import React from 'react';
import { School, Building, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppRoute } from '../../types';

interface SponsorsSectionProps {
  onNavigate: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <section id="schools" className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Schools and Philanthropy
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Turn educational support into measurable access.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            QUALANTRA partners with South African secondary schools, education trusts, and corporate
            social investment programmes. Sponsors can underwrite dedicated ten-learner pods, granting
            talented learners full Premium instruction with certified educators without commercial burden on families.
          </p>
        </div>

        {/* 3 Pillar Cards for Institutional Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-[#E7E3DA] rounded-lg p-8 space-y-4">
            <div className="w-9 h-9 rounded bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center text-[#1C1917]">
              <School className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1C1917]">School Pod Extension</h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Schools facing specialist educator shortages in Advanced Mathematics or Physical Sciences
              can seamlessly embed QUALANTRA pods into their daily academic timetables.
            </p>
          </div>

          <div className="bg-white border border-[#E7E3DA] rounded-lg p-8 space-y-4">
            <div className="w-9 h-9 rounded bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center text-[#1C1917]">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1C1917]">Corporate Social Investment</h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Sponsors fund designated subject cohorts across under-resourced public schools. Every cent
              translates into verifiable classroom hours with SACE registered teachers.
            </p>
          </div>

          <div className="bg-white border border-[#E7E3DA] rounded-lg p-8 space-y-4">
            <div className="w-9 h-9 rounded bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center text-[#1C1917]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1C1917]">Scholarship Pods</h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Endowment funds provide high-potential Grade 10 to 12 bursary recipients with rigorous
              exam preparation, past paper coaching, and academic mentoring.
            </p>
          </div>
        </div>

        {/* Call to action for institutions */}
        <div className="p-8 rounded-lg bg-white border border-[#E7E3DA] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-xl text-[#1C1917] mb-1">
              Initiate an Institutional Pilot Pod
            </div>
            <p className="text-xs text-[#57534E] max-w-xl">
              Discuss curriculum alignment, educator allocation, and reporting compliance with our
              academic partnerships team.
            </p>
          </div>

          <button
            onClick={onOpenConsultation || (() => onNavigate('/admin'))}
            className="px-5 py-2.5 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
          >
            Request Institutional Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
