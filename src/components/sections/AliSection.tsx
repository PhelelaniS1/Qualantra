import React, { useState } from 'react';
import { Sparkles, Check, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const AliSection: React.FC = () => {
  const [step, setStep] = useState<'prompt' | 'suggested' | 'approved'>('suggested');

  return (
    <section className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Ali: Teaching Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            AI supports the teacher. It does not replace the teacher.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Ali is engineered as an educator assistant, not an autonomous replacement. During live
            instruction, the teacher summons Ali for rapid visual analogies, scaffolding questions,
            or remedial examples. Nothing reaches the classroom without explicit educator review and approval.
          </p>
        </div>

        {/* Realistic Workflow Preview Card */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          {/* Top Bar */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E7E3DA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#1C1917] flex items-center justify-center text-white text-xs font-bold font-serif">
                A
              </div>
              <span className="text-xs font-semibold text-[#1C1917]">
                Teacher Workflow: Ms. Thandeka Dlamini · Live Session 14
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <span>Curriculum Filter: CAPS Physical Sciences Grade 11</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Step Breakdown (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                Three Step Approval Cycle
              </div>

              <div className="space-y-4 text-xs">
                <button
                  onClick={() => setStep('prompt')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    step === 'prompt'
                      ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                      : 'border-[#E7E3DA] bg-white'
                  }`}
                >
                  <div className="font-semibold text-[#1C1917] mb-1">
                    Step 1: Teacher Query
                  </div>
                  <div className="text-[#57534E]">
                    Teacher detects hesitation around momentum conservation and queries Ali for a 2-stage visual diagram.
                  </div>
                </button>

                <button
                  onClick={() => setStep('suggested')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    step === 'suggested'
                      ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                      : 'border-[#E7E3DA] bg-white'
                  }`}
                >
                  <div className="font-semibold text-[#1C1917] mb-1">
                    Step 2: Ali Formulation
                  </div>
                  <div className="text-[#57534E]">
                    Ali synthesizes approved CAPS textbook representations with mass ratios and velocity vectors.
                  </div>
                </button>

                <button
                  onClick={() => setStep('approved')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    step === 'approved'
                      ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                      : 'border-[#E7E3DA] bg-white'
                  }`}
                >
                  <div className="font-semibold text-[#1C1917] mb-1">
                    Step 3: Educator Approval and Display
                  </div>
                  <div className="text-[#57534E]">
                    Educator validates the physical accuracy and commits the graphic directly to all 10 learner screens.
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Live Interactive Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DA] mb-4 text-xs">
                  <span className="font-semibold text-[#1C1917]">
                    Teacher Console · Ali Co-Pilot
                  </span>
                  <span className="text-[#78716C]">Session Status: Live</span>
                </div>

                {/* Prompt State */}
                {step === 'prompt' && (
                  <div className="space-y-4">
                    <div className="text-xs text-[#57534E]">
                      Educator prompt entered into Ali terminal:
                    </div>
                    <div className="p-4 bg-white border border-[#D6D3CD] rounded text-xs text-[#1C1917] font-mono">
                      "Provide a clean visual breakdown of two trolleys with mass ratio 2:1 colliding in an isolated system, showing vectors before and after."
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => setStep('suggested')}
                        className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Generate Ali Proposal</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested State */}
                {step === 'suggested' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#8C5E38]">Ali Proposal Ready for Review</span>
                      <span className="text-[#78716C]">Awaiting Teacher Approval</span>
                    </div>

                    <div className="p-4 bg-white border border-[#D6D3CD] rounded space-y-3 text-xs">
                      <div className="font-semibold text-[#1C1917]">
                        Proposed Visual: Conservation of Linear Momentum
                      </div>
                      <div className="p-3 bg-[#FAF9F5] rounded border border-[#E7E3DA] font-mono text-[11px] text-[#44403C] space-y-1">
                        <div>Stage A (Before): Trolley 1 (2 kg, v = 4 m/s) → | Trolley 2 (1 kg, v = 0)</div>
                        <div>Total Momentum = (2 · 4) + (1 · 0) = 8 kg·m/s East</div>
                        <div className="pt-1 text-[#8C5E38]">Stage B (Coupled After): Combined Mass = 3 kg, v = 2.67 m/s East</div>
                      </div>
                      <p className="text-[#57534E]">
                        Socratic prompt for learners: "Which trolley experienced the greater change in momentum during the impact?"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setStep('approved')}
                        className="px-4 py-2 bg-[#1C1917] text-white rounded text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve and Project to Classroom</span>
                      </button>
                      <button
                        onClick={() => setStep('prompt')}
                        className="px-3 py-2 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                      >
                        Edit Query
                      </button>
                    </div>
                  </div>
                )}

                {/* Approved State */}
                {step === 'approved' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
                      <span>Approved by Ms. Thandeka Dlamini · Broadcasted to Pod Alpha</span>
                    </div>

                    <div className="p-5 bg-white border border-[#1C1917] rounded shadow-2xs text-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-2">
                        <span className="font-semibold text-[#1C1917]">
                          Whiteboard Object #14B: Linear Momentum Conservation
                        </span>
                        <span className="text-[10px] font-mono text-[#78716C]">
                          Synchronized to 10 Tablets
                        </span>
                      </div>
                      <div className="text-xs text-[#44403C] leading-relaxed">
                        The visual model is now active on Liam, Nandi, Kagiso, and all other learner
                        screens. The teacher retains direct microphone and annotation authority over
                        the live diagram.
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-[#78716C]">Educator remains in command.</span>
                      <button
                        onClick={() => setStep('prompt')}
                        className="text-xs text-[#1C1917] underline hover:text-[#8C5E38] cursor-pointer"
                      >
                        Reset Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#E7E3DA] mt-6 text-[11px] text-[#78716C] space-y-1">
                <div>
                  Ali assists with concept analogies, remediation exercises, and lesson notes without displacing the educator.
                </div>
                <div className="pt-2 text-xs flex flex-wrap items-center gap-4 text-[#57534E]">
                  <span>
                    <strong className="text-[#1C1917]">Free: </strong>
                    Limited AI assistance available for core questions and examples.
                  </span>
                  <span>
                    <strong className="text-[#1C1917]">Premium: </strong>
                    Expanded AI assistance for deep remediation and assessment preparation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
