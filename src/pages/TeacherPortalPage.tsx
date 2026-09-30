import React, { useState } from 'react';
import { AppRoute } from '../types';
import { MOCK_TEACHER_PROFILE } from '../data/mockPortalData';
import { TEACHING_OPPORTUNITIES } from '../data/shotsData';
import { ArrowLeft, ShieldCheck, Check, Clock, User, Sparkles, BookOpen } from 'lucide-react';

interface TeacherPortalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const TeacherPortalPage: React.FC<TeacherPortalPageProps> = ({ onNavigate }) => {
  const [aliApproved, setAliApproved] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>
          <div className="text-xs text-[#78716C] font-mono">
            Prototype Preview Mode · Educator Workspace
          </div>
        </div>

        {/* Teacher Banner */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center font-serif text-xl font-bold text-[#1C1917]">
              TD
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-0.5">
                Lead Educator Workspace
              </div>
              <h1 className="text-2xl font-serif text-[#1C1917]">{MOCK_TEACHER_PROFILE.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
                <span>{MOCK_TEACHER_PROFILE.title}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#8C5E38] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> {MOCK_TEACHER_PROFILE.registration}
                </span>
                <span aria-hidden="true">·</span>
                <span>2 Synchronous Pods (20 Learners Total)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('classroom');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onNavigate('/');
              }}
              className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-2xs"
            >
              Conduct Live Pod Alpha (Session 14)
            </button>
          </div>
        </div>

        {/* Main Grid: Pods & Ali Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Assigned Pods & Classes (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Assigned 1 Teacher, 10 Learners Pods (Today’s Teaching Schedule)
              </div>

              <div className="space-y-3">
                {MOCK_TEACHER_PROFILE.upcomingClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-[#E7E3DA] bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-mono text-[#78716C] mb-1">{cls.time}</div>
                      <div className="font-semibold text-sm text-[#1C1917]">{cls.pod}</div>
                      <div className="text-[#57534E]">{cls.topic}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#8C5E38]">{cls.enrolled} / 10 Enrolled</span>
                      <span className="px-2.5 py-1 bg-white border border-[#D6D3CD] rounded text-[#1C1917] font-medium">
                        {idx === 0 ? 'Live Now' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Opportunity Board */}
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Available Teaching Pods & Specializations
              </div>

              <div className="space-y-3">
                {TEACHING_OPPORTUNITIES.slice(0, 2).map((opp) => (
                  <div key={opp.id} className="p-4 rounded border border-[#E7E3DA] bg-[#FAF9F5] text-xs space-y-2">
                    <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                      <span>{opp.title}</span>
                      <span className="text-[#8C5E38]">{opp.engagementType}</span>
                    </div>
                    <p className="text-[#57534E]">{opp.subject} · {opp.curriculum}</p>
                    <div className="text-[11px] text-[#78716C] flex items-center justify-between pt-1 border-t border-[#E7E3DA]">
                      <span>Allocation: {opp.allocation}</span>
                      <button className="font-semibold text-[#1C1917] underline hover:text-[#8C5E38] cursor-pointer">
                        Express Teaching Interest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ali Teaching Copilot Console (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">
                <div className="font-semibold text-sm text-[#1C1917]">
                  Ali Co-Pilot Review Queue
                </div>
                <span className="text-xs text-[#8C5E38] font-medium">Teacher Approval Required</span>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] space-y-3 text-xs">
                <div className="font-semibold text-[#1C1917]">
                  {MOCK_TEACHER_PROFILE.aliDraft.title}
                </div>
                <p className="text-[#44403C] leading-relaxed">
                  {MOCK_TEACHER_PROFILE.aliDraft.suggestion}
                </p>

                {aliApproved ? (
                  <div className="p-3 bg-white rounded border border-[#8C5E38]/50 text-[#1C1917] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8C5E38]" />
                    <span>Visual diagram approved and displayed on learner whiteboard.</span>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setAliApproved(true)}
                      className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                    >
                      Approve and Commit to Lesson
                    </button>
                    <button className="px-3 py-2 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer">
                      Modify Notes
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg border border-[#E7E3DA] text-xs text-[#57534E] space-y-2">
                <div className="font-semibold text-[#1C1917]">Professional Governance Note</div>
                <p>
                  Ali only generates materials based on Department of Basic Education statements and
                  accredited past exam memoranda. You maintain complete editorial and pedagogical control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
