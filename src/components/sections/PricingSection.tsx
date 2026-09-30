import React from 'react';
import { Check, ArrowRight, HeartHandshake, Users, Sparkles } from 'lucide-react';
import { AppRoute } from '../../types';

interface PricingSectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Access Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            QUALANTRA Free and Premium
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            QUALANTRA Free gives you a genuine place to start learning.
            QUALANTRA Premium gives you more of the school.
            We provide a substantive educational entry point for every South African learner,
            with expanded depth, teacher engagement, and curriculum resources on Premium.
          </p>
        </div>

        {/* Plan Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
          {/* Free Tier Card */}
          <div className="bg-white border border-[#E7E3DA] rounded-xl p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                Universal Entry Point
              </div>
              <h3 className="text-2xl font-serif text-[#1C1917] mb-1">QUALANTRA Free</h3>
              <div className="text-sm font-serif italic text-[#8C5E38] mb-3">
                For learners getting started
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                A genuine educational tier ensuring that any motivated learner in South Africa can
                participate in accredited learning.
              </p>

              <div className="border-t border-[#E7E3DA] pt-6 space-y-3.5 text-xs text-[#332F2B]">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Limited Ali AI Assistant</strong>
                    <span className="text-[#57534E]">Explanations, examples, questions, and basic study support.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">1 Tutor</strong>
                    <span className="text-[#57534E]">One assigned tutor available to support your ongoing learning journey.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">1 Teacher Engagement Per Week</strong>
                    <span className="text-[#57534E]">Direct weekly engagement with a qualified teacher for help and guidance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Limited Learning Resources</strong>
                    <span className="text-[#57534E]">Curated selection of core exercises, worksheets, and reference material.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Study Material</strong>
                    <span className="text-[#57534E]">Core CAPS syllabus guides and essential chapter overviews.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#F5F3ED]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">SignFusion SASL Accessibility</strong>
                    <span className="text-[#57534E]">Included for every learner. Accessibility is part of QUALANTRA.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E7E3DA]">
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-3.5 px-4 text-xs font-semibold text-[#1C1917] bg-[#FAF9F5] border border-[#D6D3CD] rounded-md hover:bg-[#EAE7E0] transition-colors cursor-pointer text-center"
              >
                Register for QUALANTRA Free
              </button>
            </div>
          </div>

          {/* Premium Tier Card */}
          <div className="bg-white border-2 border-[#1C1917] rounded-xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-2">
                Complete Experience
              </div>
              <h3 className="text-2xl font-serif text-[#1C1917] mb-1">QUALANTRA Premium</h3>
              <div className="text-sm font-serif italic text-[#8C5E38] mb-3">
                For the complete QUALANTRA experience
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                Expanded teacher access, deeper personalized AI assistance, and comprehensive educational resources.
              </p>

              <div className="border-t border-[#E7E3DA] pt-6 space-y-3.5 text-xs text-[#332F2B]">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Everything in Free</strong>
                    <span className="text-[#57534E]">Full access to all foundational features and study material.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Ali AI Assistant</strong>
                    <span className="text-[#57534E]">Deeper assistance with practice, remediation, and exam preparation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Teacher Engagement</strong>
                    <span className="text-[#57534E]">Substantially greater access to qualified subject educators.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Expanded Learning Resources & Additional Study Material</strong>
                    <span className="text-[#57534E]">Comprehensive worksheets, exemplar derivations, and curriculum modules.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">Advanced Learning Support</strong>
                    <span className="text-[#57534E]">Continuous support through the learning loop with educator oversight.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#8C5E38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">More Practice & Assessment Resources</strong>
                    <span className="text-[#57534E]">Full National Senior Certificate exam archives and marking rubrics.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#F5F3ED]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block font-medium">SignFusion SASL Accessibility</strong>
                    <span className="text-[#57534E]">Inclusive visual-language technology included for all learners.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E7E3DA]">
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer text-center"
              >
                Enroll in QUALANTRA Premium
              </button>
            </div>
          </div>
        </div>

        {/* Institutional Sponsorship Note */}
        <div className="p-6 bg-white border border-[#E7E3DA] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            <strong className="text-[#1C1917]">Sponsored Enrolment: </strong>
            Schools, alumni foundations, and corporate social investment trusts can sponsor learner cohorts
            to provide full Premium access without direct family billing.
          </div>
          <button
            onClick={() => onNavigate('/pricing')}
            className="text-xs font-semibold text-[#1C1917] hover:text-[#8C5E38] transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1"
          >
            <span>Compare Full Plan Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
