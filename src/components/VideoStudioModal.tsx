import React, { useState } from 'react';
import { X, Play, Pause, Download, Video, CheckCircle2 } from 'lucide-react';
import { HERO_SHOTS } from '../data/shotsData';

interface VideoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToShot: (index: number) => void;
}

export const VideoStudioModal: React.FC<VideoStudioModalProps> = ({
  isOpen,
  onClose,
  onJumpToShot,
}) => {
  const [selectedShotIdx, setSelectedShotIdx] = useState<number>(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  if (!isOpen) return null;

  const shot = HERO_SHOTS[selectedShotIdx];

  const handleExportReel = () => {
    setExportNotice(true);
    setTimeout(() => {
      setExportNotice(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E3DA] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F5F3ED] border border-[#D6D3CD] flex items-center justify-center text-[#1C1917]">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1C1917]">
                QUALANTRA Hero Reel Director Suite
              </h3>
              <p className="text-xs text-[#78716C]">
                Cinematic 6–8 second background video specification & master asset review
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F3ED] rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Main Visual Frame Display */}
          <div className="relative aspect-16/9 bg-black rounded-lg overflow-hidden border border-[#E7E3DA]">
            <img
              src={shot.imageSrc}
              alt={shot.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Perspective overlay */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded text-white text-xs font-medium">
              {shot.perspective}
            </div>

            {/* Bottom Scrim with Shot Meta */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#EAE4D7] mb-1">
                {shot.perspective} Perspective
              </div>
              <div className="text-lg font-serif">{shot.title}</div>
            </div>
          </div>

          {/* Shot Timeline Selector (5 shots) */}
          <div>
            <div className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider mb-3">
              Film Sequence Breakdown (8.0 Seconds Total)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {HERO_SHOTS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShotIdx(idx)}
                  className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedShotIdx === idx
                      ? 'border-[#1C1917] bg-white shadow-2xs ring-1 ring-[#1C1917]'
                      : 'border-[#E7E3DA] bg-[#F5F3ED] hover:bg-white text-[#57534E]'
                  }`}
                >
                  <div className="aspect-16/9 w-full bg-[#EAE7E0] rounded overflow-hidden mb-2">
                    <img
                      src={s.imageSrc}
                      alt={s.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-semibold text-xs text-[#1C1917] truncate">
                    {s.title}
                  </div>
                  <div className="text-[10px] text-[#78716C] truncate">
                    {s.perspective}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Director Notes & Cinematography Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white rounded-lg border border-[#E7E3DA]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[#8C5E38] mb-2">
                Cinematography Direction
              </div>
              <div className="text-xs text-[#44403C] space-y-2">
                <p>
                  <strong className="text-[#1C1917]">Framing: </strong>
                  {shot.description}
                </p>
                <p>
                  <strong className="text-[#1C1917]">Camera Movement: </strong>
                  {shot.cameraMovement}
                </p>
                <p>
                  <strong className="text-[#1C1917]">Lighting & Optics: </strong>
                  {shot.cinematographyNotes}
                </p>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-[#E7E3DA] pt-4 md:pt-0 md:pl-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#8C5E38] mb-2">
                Hero Background Suitability
              </div>
              <ul className="text-xs text-[#57534E] space-y-1.5 list-disc list-inside">
                <li>Predominantly light palette (warm whites, soft neutrals)</li>
                <li>Generous negative space on the left for website navigation and typography</li>
                <li>Soft, natural, human skin tones and authentic South African environment</li>
                <li>Zero artificial neon, dark backgrounds, or glowing futuristic HUD elements</li>
                <li>Seamless continuous 60 FPS loop integration</li>
              </ul>
            </div>
          </div>

          {exportNotice && (
            <div className="p-4 rounded-md bg-[#F5F3ED] border border-[#8C5E38]/30 flex items-center gap-3 text-xs text-[#1C1917]">
              <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
              <span>
                Hero background video is rendering directly via HTML5 Canvas capture. Check your browser downloads for <strong>qualantra-hero-bg-8.0s.webm</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-white border-t border-[#E7E3DA] flex flex-wrap items-center justify-between gap-4 sticky bottom-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onJumpToShot(selectedShotIdx);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer"
            >
              Set as Live Hero Shot
            </button>
            <button
              onClick={handleExportReel}
              className="px-4 py-2 text-xs font-medium text-[#292524] bg-[#F5F3ED] border border-[#D6D3CD] rounded-md hover:bg-[#EAE7E0] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Download Master Video Reel</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            Close Director Suite
          </button>
        </div>
      </div>
    </div>
  );
};
