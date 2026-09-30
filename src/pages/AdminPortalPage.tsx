import React from 'react';
import { AppRoute } from '../types';
import { ArrowLeft, ShieldCheck, School, Clock, Check, Users } from 'lucide-react';

interface AdminPortalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigate }) => {
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
            Prototype Preview Mode · Institutional Oversight
          </div>
        </div>

        {/* Admin Header */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-0.5">
              Institutional Administration
            </div>
            <h1 className="text-2xl font-serif text-[#1C1917]">
              St. Stithians Academic Pod Hub · Sciences Division
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
              <span>Johannesburg Region</span>
              <span aria-hidden="true">·</span>
              <span>4 Synchronous 1 Teacher, 10 Learners Pods (40 Learners Total)</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#8C5E38] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> All 4 Educators SACE Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-2xs">
              Audit Classroom Log
            </button>
          </div>
        </div>

        {/* Pod Audit Table */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1C1917]">
              Active Synchronous Pod Allocations
            </span>
            <span className="text-[#78716C]">Syllabus Standard: CAPS and IEB 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E7E3DA] bg-[#FAF9F5]/60 text-[#78716C] uppercase font-semibold">
                  <th className="py-3 px-6">Class Pod</th>
                  <th className="py-3 px-6">Assigned Educator</th>
                  <th className="py-3 px-6">Syllabus Topic</th>
                  <th className="py-3 px-6">Roster Attendance</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E3DA] text-[#44403C]">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">Sci-11A Pod Alpha</td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#1C1917]">Ms. Thandeka Dlamini</div>
                    <div className="text-[11px] text-[#78716C]">SACE #49102 · Wits BSc</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Newtonian Mechanics & Impulse</div>
                    <div className="text-[11px] text-[#78716C]">CAPS Physical Sciences</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums font-medium">10 / 10 Active</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1C1917] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#8C5E38]" /> Live Now
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">Math-12B Pod Beta</td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#1C1917]">Mr. Andrew Botha</div>
                    <div className="text-[11px] text-[#78716C]">SACE #38190 · Stellenbosch MSc</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Calculus: Optimization</div>
                    <div className="text-[11px] text-[#78716C]">IEB AP Mathematics</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums font-medium">10 / 10 Active</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1C1917] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#8C5E38]" /> Live Now
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">Eng-10A Pod Gamma</td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#1C1917]">Dr. Zoleka Mtshali</div>
                    <div className="text-[11px] text-[#78716C]">SACE #51203 · Rhodes PhD</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Contemporary Poetry Seminar</div>
                    <div className="text-[11px] text-[#78716C]">Home Language Literature</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums font-medium">10 / 10 Active</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs text-[#57534E]">
                      <Check className="w-3.5 h-3.5 text-[#78716C]" /> Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
