import React, { useState } from 'react';
import { Clock, BookOpen, User, CheckCircle2, ArrowRight, Sparkles, Check, HeartHandshake } from 'lucide-react';
import { MOCK_LEARNER_SCHEDULE, MOCK_LEARNER_PROFILE } from '../../data/mockPortalData';
import { AppRoute } from '../../types';

interface LearnerSectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const LearnerSection: React.FC<LearnerSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'subjects' | 'gaps'>('schedule');

  return (
    <section id="learner" className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
            The Learner Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight">
            Structured, accountable, and deeply focused.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            In QUALANTRA, learners do not passively consume pre-recorded video catalogues.
            They join synchronous, ten-person classrooms led by dedicated teachers, follow an organized
            daily timetable, and receive targeted practice when conceptual gaps arise.
          </p>
        </div>

        {/* Free and Premium Access Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-lg bg-white border border-[#E7E3DA] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#1C1917]">QUALANTRA Free</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F5F3ED] text-[#78716C] border border-[#E7E3DA]">
                Universal Entry
              </span>
            </div>
            <p className="text-[#57534E] leading-relaxed">
              For learners getting started: Includes limited Ali AI assistant support, 1 assigned tutor, 1 teacher engagement per week, core study materials, and SignFusion accessibility.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border-2 border-[#1C1917] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#1C1917] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
                <span>QUALANTRA Premium</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1C1917] text-white">
                Complete Experience
              </span>
            </div>
            <p className="text-[#57534E] leading-relaxed">
              For the complete experience: Everything in Free plus expanded Ali AI assistance, expanded teacher engagement, full resource ecosystem, and advanced learning support.
            </p>
          </div>
        </div>

        {/* Product Preview Container */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          {/* Header of Preview */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EAE7E0] border border-[#D6D3CD] flex items-center justify-center text-xs font-serif font-bold text-[#1C1917]">
                LM
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1C1917]">
                  {MOCK_LEARNER_PROFILE.name}
                </div>
                <div className="text-xs text-[#78716C]">
                  {MOCK_LEARNER_PROFILE.grade} · Western Cape Region · CAPS Enrolled
                </div>
              </div>
            </div>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1 p-1 bg-[#F5F3ED] rounded-lg border border-[#E7E3DA]">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Today’s Schedule
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                  activeTab === 'subjects'
                    ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Enrolled Subjects
              </button>
              <button
                onClick={() => setActiveTab('gaps')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                  activeTab === 'gaps'
                    ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Learning Support
              </button>
            </div>
          </div>

          {/* Body of Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'schedule' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-2">
                  Synchronous Pod Timetable
                </div>
                {MOCK_LEARNER_SCHEDULE.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      item.status === 'Live Now'
                        ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                        : 'border-[#E7E3DA] bg-white'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="font-mono text-xs text-[#78716C] tabular-nums whitespace-nowrap pt-1 sm:pt-0">
                        {item.time}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[#1C1917]">{item.subject}</div>
                        <div className="text-xs text-[#57534E]">{item.topic}</div>
                        <div className="text-xs text-[#78716C] mt-0.5 flex items-center gap-1.5">
                          <User className="w-3 h-3" /> {item.educator}
                        </div>
                      </div>
                    </div>

                    <div className="self-start sm:self-center">
                      {item.status === 'Live Now' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C1917] text-white rounded text-xs font-medium">
                          <Clock className="w-3 h-3 text-[#EAE4D7]" />
                          <span>Class in Session (10 / 10 Present)</span>
                        </span>
                      ) : item.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#57534E]">
                          <CheckCircle2 className="w-3 h-3 text-[#78716C]" />
                          <span>Session Archived</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-xs text-[#78716C] border border-[#E7E3DA] rounded">
                          Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_LEARNER_PROFILE.subjects.map((subj, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-[#E7E3DA] bg-[#FAF9F5]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-1">
                      Subject
                    </div>
                    <div className="font-serif text-base text-[#1C1917] mb-2">{subj.name}</div>
                    <div className="text-xs text-[#57534E] mb-3">Educator: {subj.educator}</div>
                    <div className="text-xs font-mono text-[#78716C] border-t border-[#E7E3DA] pt-2">
                      Status: {subj.status}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gaps' && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1">
                  Individual Diagnostic Feedback
                </div>
                {MOCK_LEARNER_PROFILE.supportGaps.map((gap, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-[#E7E3DA] bg-[#FAF9F5]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-sm text-[#1C1917]">{gap.topic}</div>
                      <span className="text-xs font-medium text-[#8C5E38]">{gap.status}</span>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">{gap.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with action */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-t border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
            <span>Verified against National Curriculum Statements (CAPS)</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('/pricing')}
                className="text-xs text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Compare Free and Premium Plans
              </button>
              <button
                onClick={() => onNavigate('/learner')}
                className="font-semibold text-[#1C1917] hover:text-[#8C5E38] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Interactive Learner Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
