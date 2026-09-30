import React, { useState } from 'react';
import { AppRoute } from '../types';
import { ArrowLeft, Check, Sparkles, User, Users, BookOpen, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { QualantraLogo } from '../components/common/QualantraLogo';

interface PricingPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [activePlanDetail, setActivePlanDetail] = useState<'FREE' | 'PREMIUM'>('FREE');

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 mb-6 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>

          <div className="mb-4">
            <QualantraLogo size="md" variant="full" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            <span>Access Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Educational Plans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            QUALANTRA Free and Premium
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] max-w-3xl leading-relaxed">
            QUALANTRA Free gives you a genuine place to start learning.
            QUALANTRA Premium gives you more of the school.
            Both access levels are designed around qualified educators, dedicated human support,
            curriculum alignment, and inclusive classroom technology.
          </p>
        </div>

        {/* Plan Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* QUALANTRA FREE */}
          <div className="bg-white border border-[#E7E3DA] rounded-xl p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
            <div className="space-y-6">
              <div>
                <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2 bg-[#FAF9F5] px-2.5 py-1 rounded border border-[#E7E3DA]">
                  Universal Entry Point
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mb-2">
                  QUALANTRA Free
                </h2>
                <div className="text-sm font-serif italic text-[#8C5E38] mb-3">
                  For learners getting started
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  QUALANTRA Free is not a trial or a broken demo. It provides genuine, substantive learning
                  value so any motivated South African learner can say with confidence: "I can learn here."
                </p>
              </div>

              {/* What is Included */}
              <div className="border-t border-[#E7E3DA] pt-6 space-y-4 text-xs text-[#332F2B]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Limited Ali AI Assistant</strong>
                    <span className="text-[#57534E]">
                      Free learners can interact with Ali for concept explanations, examples, questions, and basic study support. Token and interaction usage is capped to preserve educational focus.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">1 Tutor</strong>
                    <span className="text-[#57534E]">
                      Access to one assigned tutor available to support your ongoing learning journey and answer study questions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">1 Teacher Engagement Per Week</strong>
                    <span className="text-[#57534E]">
                      Direct weekly engagement with a qualified teacher to ask for help, discuss a difficult concept, or receive guidance and academic intervention.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Limited Learning Resources</strong>
                    <span className="text-[#57534E]">
                      A curated selection of core exercises, foundational worksheets, and essential reference materials.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Study Material</strong>
                    <span className="text-[#57534E]">
                      Essential study material covering core CAPS syllabus definitions and fundamental revision guides.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#F5F3ED]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">SignFusion Accessibility Included</strong>
                    <span className="text-[#57534E]">
                      South African Sign Language (SASL) support is part of QUALANTRA, not an afterthought. Included for every learner.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E7E3DA]">
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-3.5 bg-[#FAF9F5] border border-[#D6D3CD] text-[#1C1917] font-semibold rounded-md text-xs hover:bg-[#EAE7E0] transition-colors cursor-pointer text-center"
              >
                Register for QUALANTRA Free
              </button>
            </div>
          </div>

          {/* QUALANTRA PREMIUM */}
          <div className="bg-white border-2 border-[#1C1917] rounded-xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-6">
              <div>
                <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-2 bg-[#F5F3ED] px-2.5 py-1 rounded border border-[#E7E3DA]">
                  Complete Experience
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mb-2">
                  QUALANTRA Premium
                </h2>
                <div className="text-sm font-serif italic text-[#8C5E38] mb-3">
                  For the complete QUALANTRA experience
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Premium provides greater depth, expanded teacher interaction, personalized study support,
                  and access to the comprehensive QUALANTRA educational ecosystem.
                </p>
              </div>

              {/* What is Included */}
              <div className="border-t border-[#E7E3DA] pt-6 space-y-4 text-xs text-[#332F2B]">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Everything in Free</strong>
                    <span className="text-[#57534E]">
                      Includes all foundational features, study tools, and core pod access.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Ali AI Assistant</strong>
                    <span className="text-[#57534E]">
                      Significantly greater AI usage for deeper assistance with explanations, practice problem generation, assessment preparation, and personalized remediation.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Teacher Engagement</strong>
                    <span className="text-[#57534E]">
                      Substantially greater access to qualified teachers for one-to-one concept deep-dives, exam guidance, and regular learning interventions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Learning Resources</strong>
                    <span className="text-[#57534E]">
                      Access to the broader resource library, enriched worksheets, interactive simulations, and diagnostic drills.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Additional Study Material</strong>
                    <span className="text-[#57534E]">
                      In-depth chapter breakdowns, worked exemplar solutions, and specialized curriculum modules.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Advanced Learning Support</strong>
                    <span className="text-[#57534E]">
                      Continuous diagnostic support across the full learning loop: Learn, Practice, Assess, Identify, Support, Reassess. The teacher remains responsible for all educational decisions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">More Practice and Assessment Resources</strong>
                    <span className="text-[#57534E]">
                      Complete past examination archives from the National Senior Certificate, step-by-step marking rubrics, and diagnostic question banks.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Broader Curriculum-Aligned Resources</strong>
                    <span className="text-[#57534E]">
                      Full syllabus coverage across CAPS and relevant pathways including IEB extension materials.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#F5F3ED]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">SignFusion Accessibility Included</strong>
                    <span className="text-[#57534E]">
                      Inclusive visual-language classroom architecture available in every lesson.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E7E3DA]">
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-3.5 bg-[#1C1917] text-white font-semibold rounded-md text-xs hover:bg-black transition-colors cursor-pointer text-center"
              >
                Enroll in QUALANTRA Premium
              </button>
            </div>
          </div>
        </div>

        {/* Foundational Educational Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#57534E]">
          <div className="bg-white p-6 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#1C1917]">The Teacher Teaches</h3>
            <p className="leading-relaxed">
              Ali assists and supports the educator and learner. Ali does not replace the teacher.
              Human mentorship, professional judgment, and empathy remain at the center of every classroom.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#1C1917]">SignFusion for Every Learner</h3>
            <p className="leading-relaxed">
              Accessibility is part of QUALANTRA, not an afterthought or an add-on.
              Both Free and Premium plans incorporate our South African Sign Language (SASL) visual-language technology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#1C1917]">Institutional Sponsorship</h3>
            <p className="leading-relaxed">
              Through school partnerships and corporate social investments, learners from under-resourced
              communities can receive fully sponsored Premium enrolment without direct household billing.
            </p>
          </div>
        </div>

        {/* Prototype Navigation Prompt */}
        <div className="p-6 bg-[#F5F3ED] border border-[#E7E3DA] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            <strong className="text-[#1C1917] block sm:inline font-semibold">Test Both Plans in the Prototype: </strong>
            <span>Explore the Learner Workspace to toggle between the Free and Premium learner dashboards.</span>
          </div>
          <button
            onClick={() => onNavigate('/learner')}
            className="px-4 py-2 bg-white border border-[#D6D3CD] rounded text-xs font-semibold text-[#1C1917] hover:bg-[#FAF9F5] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 shadow-2xs"
          >
            <span>Open Learner Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
