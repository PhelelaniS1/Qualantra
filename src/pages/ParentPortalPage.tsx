import React from 'react';
import { AppRoute } from '../types';
import { MOCK_PARENT_VIEW, MOCK_LEARNER_SCHEDULE } from '../data/mockPortalData';
import { ArrowLeft, CheckCircle2, Calendar, FileText, User } from 'lucide-react';

interface ParentPortalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const ParentPortalPage: React.FC<ParentPortalPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>
          <div className="text-xs text-[#78716C] font-mono">
            Prototype Preview Mode · Parent Observer View
          </div>
        </div>

        {/* Parent Banner */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-0.5">
              Parent Portal
            </div>
            <h1 className="text-2xl font-serif text-[#1C1917]">{MOCK_PARENT_VIEW.parentName}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
              <span>Observing: {MOCK_PARENT_VIEW.learnerName}</span>
              <span aria-hidden="true">·</span>
              <span>{MOCK_PARENT_VIEW.grade}</span>
              <span aria-hidden="true">·</span>
              <span>Western Cape Cohort</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF9F5] border border-[#E7E3DA] rounded text-xs font-medium text-[#1C1917]">
            <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
            <span>{MOCK_PARENT_VIEW.attendanceSummary}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Today's Verified Attendance (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Today’s Synchronous Class Attendance Record
              </div>

              <div className="space-y-3 text-xs">
                {MOCK_LEARNER_SCHEDULE.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-[#78716C]">{item.time}</div>
                      <div className="font-semibold text-[#1C1917]">{item.subject}</div>
                      <div className="text-[#57534E]">{item.topic}</div>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-[#D6D3CD] text-[#1C1917] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E38]" />
                        <span>Present (10/10 Pod)</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Educator Direct Feedback (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Direct Educator Comments and Progress Notes
              </div>

              <div className="space-y-3 text-xs">
                {MOCK_PARENT_VIEW.recentNotes.map((note, idx) => (
                  <div key={idx} className="p-4 rounded border border-[#E7E3DA] bg-[#FAF9F5] space-y-1">
                    <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                      <span>{note.educator}</span>
                      <span className="text-[10px] font-mono text-[#78716C]">{note.date}</span>
                    </div>
                    <p className="text-[#57534E] leading-relaxed pt-1">{note.comment}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded border border-[#E7E3DA] bg-white text-xs text-[#57534E]">
                <strong className="text-[#1C1917]">Transparent Communication: </strong>
                Parents receive concise factual updates on subject mastery without automated gamification or speculative percentages.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
