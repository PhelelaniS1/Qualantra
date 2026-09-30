import React from 'react';
import { AppRoute } from '../types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

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
            Parent Portal
          </div>
        </div>

        {/* Parent Banner */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-0.5">
              Parent Portal
            </div>

            <h1 className="text-2xl font-serif text-[#1C1917]">
              Welcome, Parent
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
              <span>
                Your linked learner information will appear here.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF9F5] border border-[#E7E3DA] rounded text-xs font-medium text-[#57534E]">
            <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
            <span>Attendance information will appear here.</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Attendance */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Synchronous Class Attendance
              </div>

              <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">
                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  No attendance records are currently available.
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Once a learner is linked to your parent account and attends
                  a QUALANTRA class, verified attendance records will appear
                  here.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Educator Feedback */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">
              <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                Educator Comments and Progress Notes
              </div>

              <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">
                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  No educator notes are currently available.
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Educator feedback and learning-progress notes will appear
                  here when they are recorded for your linked learner.
                </p>
              </div>

              <div className="p-4 rounded border border-[#E7E3DA] bg-white text-xs text-[#57534E]">
                <strong className="text-[#1C1917]">
                  Transparent Communication:{' '}
                </strong>
                Parents will receive factual updates about their learner's
                participation, learning progress, assessments, and educator
                feedback.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};