import React from 'react';
import { MOCK_PARENT_VIEW } from '../../data/mockPortalData';
import { CheckCircle2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { AppRoute } from '../../types';

interface ParentSectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const ParentSection: React.FC<ParentSectionProps> = ({ onNavigate }) => {
  return (
    <section id="parents" className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            For Parents
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Quiet transparency. Respectful communication.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Parents stay grounded in their child's academic journey through clear, factual updates.
            We replace speculative gamified charts with concrete observations: attendance verification,
            educator comments, and clear visibility into areas where additional practice has been assigned.
          </p>
        </div>

        {/* Parent Portal Preview Card */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[#1C1917]">
                Parent Observer: {MOCK_PARENT_VIEW.parentName}
              </div>
              <div className="text-xs text-[#78716C]">
                Observing: {MOCK_PARENT_VIEW.learnerName} · {MOCK_PARENT_VIEW.grade}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#1C1917]">
              <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
              <span>{MOCK_PARENT_VIEW.attendanceSummary}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider">
              Recent Direct Educator Observations
            </div>

            <div className="space-y-3">
              {MOCK_PARENT_VIEW.recentNotes.map((note, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-[#E7E3DA] bg-[#FAF9F5] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1C1917]">{note.educator}</span>
                    <span className="text-[#78716C] font-mono">{note.date}</span>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed pt-1">{note.comment}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-lg border border-[#E7E3DA] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-semibold text-[#1C1917]">Active Learning Support Alert</div>
                <div className="text-[#57534E]">
                  Ms. Dlamini assigned 3 focused vector exercises. Estimated completion: 20 minutes before tomorrow’s lesson.
                </div>
              </div>

              <button
                onClick={() => onNavigate('/parent')}
                className="font-semibold text-[#1C1917] hover:text-[#8C5E38] transition-colors whitespace-nowrap inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Parent Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
