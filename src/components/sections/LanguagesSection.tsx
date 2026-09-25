import React, { useState } from 'react';
import { SA_LANGUAGES } from '../../data/languagesData';
import { Globe, CheckCircle2 } from 'lucide-react';

export const LanguagesSection: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string>('zu');
  const activeLang = SA_LANGUAGES.find((l) => l.code === selectedCode) || SA_LANGUAGES[0];

  return (
    <section className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Linguistic Diversity
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            One classroom can support different learners.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            South Africa’s twelve official languages represent diverse ways of understanding the world.
            QUALANTRA allows learners to cross-reference scientific and mathematical concepts in their
            home languages while preparing thoroughly for standard national examinations.
          </p>
        </div>

        {/* Interactive Language Selector Experience */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          {/* Language Selector Bar */}
          <div className="p-4 sm:p-6 bg-[#FAF9F5] border-b border-[#E7E3DA]">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-3">
              Select Language to Preview Conceptual Bridging
            </div>
            <div className="flex flex-wrap gap-2">
              {SA_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedCode(lang.code)}
                  className={`px-3 py-1.5 text-xs rounded transition-all cursor-pointer ${
                    selectedCode === lang.code
                      ? 'bg-[#1C1917] text-white font-semibold shadow-2xs'
                      : 'bg-white text-[#57534E] border border-[#E7E3DA] hover:border-[#A8A29E]'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bilingual Demonstration Card */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5E38] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Home Language Bridging</span>
              </div>
              <h3 className="text-2xl font-serif text-[#1C1917]">
                {activeLang.sampleTerm}
              </h3>
              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed italic">
                "{activeLang.sampleTranslation}"
              </p>
              <div className="text-xs text-[#57534E] pt-2 border-t border-[#E7E3DA]">
                {activeLang.explanation}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] space-y-4 text-xs">
              <div className="font-semibold text-[#1C1917] border-b border-[#E7E3DA] pb-2">
                Curriculum Integration Principle
              </div>
              <p className="text-[#57534E] leading-relaxed">
                Subject terminology is presented concurrently in English alongside the learner’s
                mother tongue. Research demonstrates that conceptual anchoring in a first language
                accelerates retention without compromising national exam performance.
              </p>
              <div className="flex items-center gap-2 text-[#8C5E38] font-medium pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified by South African Language Practitioners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
