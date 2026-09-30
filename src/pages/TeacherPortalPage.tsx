import React, { useState } from 'react';
import { AppRoute } from '../types';
import { TEACHING_OPPORTUNITIES } from '../data/shotsData';
import { ArrowLeft, ShieldCheck, Check } from 'lucide-react';

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
            Educator Workspace
          </div>
        </div>

        {/* Teacher Banner */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center font-serif text-xl font-bold text-[#1C1917]">
              TE
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-0.5">
                Educator Workspace
              </div>

              <h1 className="text-2xl font-serif text-[#1C1917]">
                Welcome, Educator
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
                <span>
                  Your educator profile, classes, opportunities, and teaching
                  resources will appear here.
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#8C5E38] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verification status available through your profile
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-2xs"
            >
              View QUALANTRA
            </button>
          </div>
        </div>

        {/* Main Grid: Classes & Ali */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Assigned Classes */}
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Your Teaching Schedule
              </div>

              <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">
                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  No teaching schedule is currently connected.
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Once your educator profile is authenticated and classes are
                  assigned, your timetable, learners, subjects, and classroom
                  sessions will appear here.
                </p>
              </div>
            </div>

            {/* Teaching Opportunity Board */}
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Available Teaching Opportunities
              </div>

              <div className="space-y-3">
                {TEACHING_OPPORTUNITIES.slice(0, 2).map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded border border-[#E7E3DA] bg-[#FAF9F5] text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                      <span>{opp.title}</span>
                      <span className="text-[#8C5E38]">
                        {opp.engagementType}
                      </span>
                    </div>

                    <p className="text-[#57534E]">
                      {opp.subject} · {opp.curriculum}
                    </p>

                    <div className="text-[11px] text-[#78716C] flex items-center justify-between pt-1 border-t border-[#E7E3DA]">
                      <span>Allocation: {opp.allocation}</span>

                      <button className="font-semibold text-[#1C1917] underline hover:text-[#8C5E38] cursor-pointer">
                        Express Teaching Interest
                      </button>
                    </div>
                  </div>
                ))}

                {TEACHING_OPPORTUNITIES.length === 0 && (
                  <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">
                    <p className="text-xs text-[#57534E]">
                      Teaching opportunities will appear here when available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Ali */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">
                <div className="font-semibold text-sm text-[#1C1917]">
                  Ali Teaching Assistant
                </div>

                <span className="text-xs text-[#8C5E38] font-medium">
                  Teacher Review Required
                </span>
              </div>

              <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">
                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  No AI-generated teaching material is awaiting review.
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                  When Ali prepares a teaching resource for one of your
                  authenticated classes, you will be able to review and
                  approve it before it is shared with learners.
                </p>

                {aliApproved && (
                  <div className="mt-4 p-3 bg-white rounded border border-[#8C5E38]/50 text-[#1C1917] flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-[#8C5E38]" />
                    <span>Teaching material approved.</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg border border-[#E7E3DA] text-xs text-[#57534E] space-y-2">
                <div className="font-semibold text-[#1C1917]">
                  Professional Governance
                </div>

                <p>
                  Ali supports educators by generating explanations,
                  questions, visuals, and other teaching resources. Educators
                  remain responsible for reviewing and deciding what is
                  presented to learners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};