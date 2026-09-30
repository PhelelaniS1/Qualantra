import React from 'react';
import { ASSET_IMAGES } from '../../data/shotsData';
import { Eye, Volume2, ShieldCheck } from 'lucide-react';

export const SignFusionSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text and Philosophy (6 cols) */}
          <div className="lg:col-span-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
              Accessibility Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
              SignFusion: One classroom. One lesson. Multiple ways to understand.
            </h2>
            <div className="text-base sm:text-lg text-[#44403C] leading-relaxed space-y-4 mb-8">
              <p>
                South African Sign Language (SASL) is the country’s twelfth official language.
                QUALANTRA’s SignFusion architecture treats accessibility as foundational rather than
                an afterthought.
              </p>
              <p>
                Qualified Deaf educators lead classes directly through natural SASL. Deaf learners
                engage with subject concepts natively, while hearing peers and educators receive
                synchronous linguistic and spatial support without artificial synthetic intermediaries.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#E7E3DA] pt-6 text-xs text-[#57534E]">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F5F3ED] border border-[#D6D3CD] flex items-center justify-center shrink-0 mt-0.5 text-[#8C5E38]">
                  <Eye className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#1C1917]">Deaf Led Pedagogy: </strong>
                  Accredited Deaf teachers instruct with natural spatial grammar, expressive clarity,
                  and deep subject mastery.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F5F3ED] border border-[#D6D3CD] flex items-center justify-center shrink-0 mt-0.5 text-[#8C5E38]">
                  <Volume2 className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#1C1917]">Synchronous Multimodal Channels: </strong>
                  Whiteboard annotations, visual equations, and spatial signing align within a single
                  unified lesson interface.
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Visual Media (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg overflow-hidden shadow-2xs">
              <img
                src={ASSET_IMAGES.signfusion}
                alt="Qualified South African Deaf Educator Teaching in SASL"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-16/10"
              />
              <div className="p-6 bg-white border-t border-[#E7E3DA]">
                <div className="flex items-center justify-between text-xs text-[#78716C] mb-2">
                  <span className="font-semibold text-[#1C1917]">
                    SignFusion Native Instruction
                  </span>
                  <span>12th Official South African Language</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Real human interaction replaces synthetic 3D avatars. Deaf and hearing participants
                  collaborate across academic sciences without barriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
