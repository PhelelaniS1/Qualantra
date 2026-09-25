import React from 'react';
import { CheckCircle2, AlertCircle, FileText, Check } from 'lucide-react';

export const AssessmentSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Pedagogical Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Continuous assessment and diagnostic support.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Rather than reducing a learner's growth to speculative percentage scores or arbitrary
            dashboards, QUALANTRA focuses on authentic formative diagnostics: detecting specific
            procedural errors, verifying working steps, and prescribing targeted remediation.
          </p>
        </div>

        {/* Diagnostic Sample: Authentic Working Step Review */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <FileText className="w-4 h-4 text-[#8C5E38]" />
              <span>Diagnostic Problem #14: Two-Body Elastic Collision</span>
            </div>
            <div className="text-[#78716C]">
              Learner: Liam van der Merwe · Verified by Ms. T. Dlamini
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step-by-Step Diagnostic Review */}
            <div className="space-y-4 text-xs">
              <div className="font-semibold text-[#1C1917] uppercase tracking-wider">
                Step-by-Step Evaluation
              </div>

              <div className="p-3.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">Step 1: Formula Stated</span>
                  <span className="text-[#8C5E38] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct
                  </span>
                </div>
                <div className="font-mono text-[#57534E]">Σp_initial = Σp_final</div>
              </div>

              <div className="p-3.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">Step 2: Sign Convention Assigned</span>
                  <span className="text-[#8C5E38] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct
                  </span>
                </div>
                <div className="font-mono text-[#57534E]">East chosen as positive (+) direction</div>
              </div>

              <div className="p-3.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">Step 3: Vector Substitution</span>
                  <span className="text-[#A35C31] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Diagnostic Gap
                  </span>
                </div>
                <div className="font-mono text-[#57534E]">(2)(4) + (1)(-2) = (3)(v_final)</div>
                <div className="text-[11px] text-[#A35C31] pt-1">
                  Note: Negative sign omitted on incoming rebound vector for Trolley 2.
                </div>
              </div>
            </div>

            {/* Targeted Remediation Prescribed */}
            <div className="p-6 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] flex flex-col justify-between">
              <div className="space-y-4 text-xs">
                <div className="font-semibold text-[#1C1917] uppercase tracking-wider">
                  Targeted Learning Support Prescribed
                </div>
                <p className="text-[#44403C] leading-relaxed">
                  Ms. Dlamini assigned 3 focused practice exercises with Ali specifically addressing
                  vector sign conventions in opposite-direction collisions before advancing to 2D collisions.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#E7E3DA]">
                  <div className="flex items-center gap-2 text-[#57534E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E38]" />
                    <span>Exercise A: 1D Rebound Momentum Signs</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#57534E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E38]" />
                    <span>Exercise B: Impulse Vector Direction Proof</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#57534E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E38]" />
                    <span>Exercise C: 2024 Past Paper 1 Exam Question</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E3DA] mt-6 text-[11px] text-[#78716C]">
                Learning support is human guided and diagnostic, avoiding superficial automated grading.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
