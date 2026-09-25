import React from 'react';

export const PedagogySection: React.FC = () => {
  return (
    <section id="pedagogy" className="py-24 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            04. The Human Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            The technology is understated. The people are the hero.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            QUALANTRA intentionally strips away the noise: no gamified coin animations, no flashing
            status rings, and no synthetic avatars. Digital education succeeds when the medium disappears,
            leaving only the educator's insight and the learner's awakening.
          </p>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-[#E7E3DA]">
            <div className="text-xs font-mono text-[#8C5E38] uppercase tracking-wider mb-3">
              Principle 01
            </div>
            <h3 className="text-xl font-serif text-[#1C1917] mb-3">
              Direct Gaze, Never a Broadcast
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              When an educator looks at a screen with 10 learners, every learner experiences direct
              focal engagement. Discussion is conversational, questioning is Socratic, and comprehension
              is continuously verified.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E7E3DA]">
            <div className="text-xs font-mono text-[#8C5E38] uppercase tracking-wider mb-3">
              Principle 02
            </div>
            <h3 className="text-xl font-serif text-[#1C1917] mb-3">
              Equitable South African Reach
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Whether connecting from an urban household in Cape Town, a rural town in Limpopo, or a
              township study center in Soweto, the stream adapts dynamically to bandwidth constraints
              without sacrificing high-fidelity vocal clarity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E7E3DA]">
            <div className="text-xs font-mono text-[#8C5E38] uppercase tracking-wider mb-3">
              Principle 03
            </div>
            <h3 className="text-xl font-serif text-[#1C1917] mb-3">
              Academic Accountability
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              In a ten-person pod, homework cannot remain unsubmitted, concepts cannot be glossed over,
              and questions cannot be neglected. Every learner produces real written work in every single
              lesson.
            </p>
          </div>
        </div>

        {/* Manifesto Block */}
        <div className="p-8 sm:p-12 rounded-lg bg-[#1C1917] text-[#FAF9F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D6D3CD] mb-3">
              Platform Manifesto
            </div>
            <div className="text-2xl sm:text-3xl font-serif leading-snug text-white mb-4">
              "We believe great teaching cannot be mass-manufactured into passive video libraries.
              Learning is an active, human relationship."
            </div>
            <div className="text-xs text-[#A8A29E]">
              Academic Board of QUALANTRA · South Africa
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
            <div className="text-xs text-[#A8A29E]">Accreditation Standard</div>
            <div className="text-sm font-medium text-white border-l-2 border-[#8C5E38] pl-3 py-1">
              Curriculum Assessment Policy Statements (CAPS)
              <br />
              Independent Examinations Board (IEB)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
