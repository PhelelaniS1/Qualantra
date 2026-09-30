import React from 'react';
import { TEACHING_OPPORTUNITIES } from '../../data/shotsData';
import { ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { AppRoute } from '../../types';

interface TeacherOpportunitySectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const TeacherOpportunitySection: React.FC<TeacherOpportunitySectionProps> = ({
  onNavigate,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Teaching Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Connecting qualified educators with meaningful teaching opportunity.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            South Africa possesses exceptional teaching talent. QUALANTRA creates flexible, dignified
            pathways for registered educators to instruct specialized pods, earn professional compensation,
            and reach learners across provincial borders without relocation.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TEACHING_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-white border border-[#E7E3DA] rounded-lg p-6 flex flex-col justify-between hover:border-[#A8A29E] transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#78716C] mb-2">
                  <span className="font-semibold text-[#8C5E38]">{opp.engagementType}</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8C5E38]" /> SACE Required
                  </span>
                </div>

                <h3 className="text-lg font-serif text-[#1C1917] mb-2">{opp.title}</h3>
                <div className="text-xs text-[#57534E] space-y-1 mb-4">
                  <div>
                    <strong className="text-[#1C1917]">Subject Focus: </strong>
                    {opp.subject}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Curriculum: </strong>
                    {opp.curriculum}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Scope: </strong>
                    {opp.locationScope}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between text-xs">
                <span className="font-mono text-[#78716C]">{opp.allocation}</span>
                <button
                  onClick={() => onNavigate('/signup')}
                  className="font-semibold text-[#1C1917] hover:text-[#8C5E38] transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply for Pod</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E7E3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-semibold text-[#1C1917] mb-0.5">
              Accredited Educator Registration
            </div>
            <div className="text-[#57534E]">
              All teaching appointments require verification through the South African Council for Educators (SACE).
            </div>
          </div>
          <button
            onClick={() => onNavigate('/teacher')}
            className="px-4 py-2 bg-[#1C1917] text-white rounded font-medium hover:bg-black transition-colors whitespace-nowrap cursor-pointer"
          >
            Review Teacher Requirements
          </button>
        </div>
      </div>
    </section>
  );
};
