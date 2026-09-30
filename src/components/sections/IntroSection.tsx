import React from 'react';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Editorial Statement (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-4">
              The Central Idea
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#1C1917] leading-[1.18] tracking-tight mb-8">
              Quality education should connect with teaching opportunity.
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-[#44403C] leading-relaxed">
              <p>
                Across South Africa, thousands of motivated learners lack consistent access to accredited
                subject specialists in critical STEM and language fields. Simultaneously, qualified educators
                seek flexible, respected teaching opportunities that reward their professional expertise.
              </p>
              <p>
                QUALANTRA bridges this divide through intentional digital infrastructure. We assemble small,
                synchronous learning pods led by dedicated teachers, supported by intelligent curriculum
                tools, and anchored in genuine human presence.
              </p>
            </div>
          </div>

          {/* Right Column: Three Institutional Principles (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F3ED] border border-[#E7E3DA] p-8 sm:p-10 rounded-lg space-y-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E7E3DA] pb-3">
              Institutional Foundations
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-1">
                  01. The Human Authority
                </div>
                <div className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Technology never leads the classroom. Qualified educators command the lesson,
                  guide inquiry, and assess genuine cognitive development.
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-1">
                  02. Small Pod Pedagogical Ratio
                </div>
                <div className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  By capping remote cohorts at exactly ten participants, passive disconnection is
                  prevented and every individual learner is heard.
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-1">
                  03. South African Inclusion
                </div>
                <div className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  From township study hubs to rural high schools, our platform operates with equal
                  clarity across all twelve official languages and low bandwidth environments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
