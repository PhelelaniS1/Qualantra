import React, { useState } from 'react';
import { HERO_SHOTS } from '../data/shotsData';
import { Camera, Eye, ArrowRight } from 'lucide-react';

interface PerspectivesSectionProps {
  onSelectShot: (index: number) => void;
}

export const PerspectivesSection: React.FC<PerspectivesSectionProps> = ({
  onSelectShot,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const shot = HERO_SHOTS[activeTab];

  return (
    <section id="perspectives" className="py-24 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            02. Cinematic Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            Four perspectives. One unified learning ecosystem.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            The QUALANTRA hero sequence is composed as an authentic documentary brand film.
            Rather than decorative tech commercials or synthetic AI graphics, each shot captures
            the genuine rhythm of South African education.
          </p>
        </div>

        {/* Perspective Tabs (Functional buttons with clean segmented style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {HERO_SHOTS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-[#1C1917] text-white shadow-2xs font-semibold'
                  : 'bg-white text-[#57534E] border border-[#E7E3DA] hover:text-[#1C1917] hover:border-[#A8A29E]'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Shot Showcase Card */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Shot Media Preview (7 cols) */}
            <div className="lg:col-span-7 relative bg-[#FAF9F5] border-b lg:border-b-0 lg:border-r border-[#E7E3DA] group overflow-hidden">
              <img
                src={shot.imageSrc}
                alt={shot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[380px] lg:min-h-[480px] max-h-[540px] transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Perspective overlay badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded border border-[#E7E3DA] text-xs font-medium text-[#1C1917]">
                {shot.title} · {shot.perspective}
              </div>

              {/* Jump to Shot in Hero Background Button */}
              <button
                onClick={() => {
                  onSelectShot(activeTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="absolute bottom-4 right-4 px-3.5 py-2 rounded-md bg-[#1C1917]/90 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[#1C1917] transition-all cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Jump in Hero Reel</span>
              </button>
            </div>

            {/* Shot Details & Cinematography (5 cols) */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5E38] uppercase tracking-wider mb-2">
                  <span>Perspective</span>
                  <span aria-hidden="true">·</span>
                  <span>{shot.perspective}</span>
                </div>

                <h3 className="text-2xl font-serif text-[#1C1917] mb-4">
                  {shot.title}
                </h3>

                <p className="text-sm text-[#44403C] leading-relaxed mb-6">
                  {shot.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-[#E7E3DA] text-xs">
                  <div>
                    <div className="font-semibold text-[#1C1917] mb-1 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#8C5E38]" /> Camera Movement
                    </div>
                    <div className="text-[#57534E] leading-normal">{shot.cameraMovement}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-[#1C1917] mb-1">
                      Cinematography & Palette
                    </div>
                    <div className="text-[#57534E] leading-normal">{shot.cinematographyNotes}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-[#1C1917] mb-1">
                      Emotional Tone
                    </div>
                    <div className="text-[#8C5E38] font-medium">{shot.emotionalTone}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E3DA] flex items-center justify-between">
                <div className="text-xs text-[#78716C]">
                  Educational Perspective: {shot.perspective}
                </div>

                <button
                  onClick={() => setActiveTab((prev) => (prev + 1) % HERO_SHOTS.length)}
                  className="text-xs font-semibold text-[#1C1917] hover:text-[#8C5E38] transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Perspective</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
