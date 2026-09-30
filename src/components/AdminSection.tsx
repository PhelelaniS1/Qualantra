import React from 'react';
import { Calendar, ShieldCheck, Check, Clock, School } from 'lucide-react';

export const AdminSection: React.FC = () => {
  return (
    <section id="admin" className="py-24 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            03. Institutional Governance
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Understated administration. Complete institutional clarity.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            School principals, heads of department, and education directors require clear operational
            truth, not speculative graphs or decorative telemetry. QUALANTRA gives administrators
            verifiable transparency into every active classroom.
          </p>
        </div>

        {/* Minimal Realistic Admin Interface Card */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white border border-[#D6D3CD] flex items-center justify-center text-xs font-serif font-bold text-[#1C1917]">
                Q
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1C1917]">
                  St. Stithians Academic Pod Hub · Grade 11 Sciences
                </div>
                <div className="text-xs text-[#78716C]">
                  Institutional Portal · Verified Educator Rosters
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#57534E]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8C5E38]" />
                <span>SACE Accredited Educator</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#78716C]" />
                <span>Term 3 · Week 6</span>
              </div>
            </div>
          </div>

          {/* Table: Minimal, Clean, Realistic Roster Overview */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E7E3DA] bg-[#FAF9F5]/50 text-[#78716C] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-6">Class Pod</th>
                  <th className="py-3 px-6">Assigned Educator</th>
                  <th className="py-3 px-6">Syllabus Topic</th>
                  <th className="py-3 px-6">Active Roster</th>
                  <th className="py-3 px-6">Session Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E3DA] text-[#44403C]">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Sci-11A · Pod Alpha
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#1C1917]">Ms. Thandeka Dlamini</div>
                    <div className="text-[11px] text-[#78716C]">SACE #49102 · Wits BSc</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Newtonian Mechanics & Impulse</div>
                    <div className="text-[11px] text-[#78716C]">CAPS Physical Sciences Paper 1</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums">
                    10 / 10 Active
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1C1917] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#8C5E38]" />
                      <span>Live · 28 min in</span>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Math-12B · Pod Beta
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#1C1917]">Mr. Andrew Botha</div>
                    <div className="text-[11px] text-[#78716C]">SACE #38190 · Stellenbosch MSc</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Calculus: Differential Optimisation</div>
                    <div className="text-[11px] text-[#78716C]">IEB Advanced Programme Mathematics</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums">
                    10 / 10 Active
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1C1917] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#8C5E38]" />
                      <span>Live · 12 min in</span>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Eng-10A · Pod Gamma
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#1C1917]">Dr. Zoleka Mtshali</div>
                    <div className="text-[11px] text-[#78716C]">SACE #51203 · Rhodes PhD</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>Contemporary African Poetry Analysis</div>
                    <div className="text-[11px] text-[#78716C]">Home Language Literature Portfolio</div>
                  </td>
                  <td className="py-4 px-6 tabular-nums">
                    10 / 10 Active
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#57534E]">
                      <Check className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>Completed · Notes Archived</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-t border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#78716C]">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-[#8C5E38]" />
              <span>Full compliance logging compliant with POPIA (Protection of Personal Information Act)</span>
            </div>
            <div>
              All video transmissions end-to-end encrypted with zero third-party advertising.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
