import React, { useEffect, useRef } from 'react';
import { ASSET_IMAGES } from '../../data/shotsData';
import { AppRoute } from '../../types';
import { QualantraLogo } from '../common/QualantraLogo';

interface HeroMediaProps {
  onNavigate: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure video starts playing immediately on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy handled silently
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F5] min-h-[92vh] lg:min-h-[900px] flex items-center">
      {/* 
        AUTHENTIC 6 TO 8 SECONDS WEBSITE HERO BACKGROUND VIDEO:
        Plays smoothly and seamlessly in the background with zero blur obstruction.
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={ASSET_IMAGES.shot1}
        className="absolute inset-0 w-full h-full object-cover block pointer-events-none transition-opacity duration-700"
        style={{ filter: 'contrast(1.02) saturate(1.02)' }}
      >
        <source src="/qualantra-hero-brand-film.webm" type="video/webm" />
        <source src="/qualantra-hero-brand-film.mp4" type="video/mp4" />
      </video>

      {/* 
        Light transparent directional gradient to keep entire background video vivid
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(250, 249, 245, 0.15) 0%, rgba(250, 249, 245, 0.05) 50%, rgba(250, 249, 245, 0) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(250, 249, 245, 0.65) 0%, rgba(250, 249, 245, 0) 100%)',
        }}
      />

      {/* Hero Foreground Content Layer */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 py-24 sm:py-32 flex flex-col justify-center items-start">
        {/* 
          Foreground Hero Presentation Square:
          Positioned towards the left on desktop to keep the center/right background video clearly visible!
        */}
        <div className="rounded-xl w-full max-w-xl lg:max-w-2xl bg-black/55 sm:bg-[#121110]/60 border border-white/20 p-7 sm:p-9 lg:p-11 shadow-2xl text-white">
          {/* Unique Qualantra Logo Showcase */}
          <div className="mb-6 pb-4 border-b border-white/20">
            <QualantraLogo
              size="md"
              variant="full"
              theme="light"
            />
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12] mb-5 font-serif text-white"
            style={{ textWrap: 'balance' }}
          >
            A digital school built around people.
          </h1>

          {/* Tagline & Institutional Copy */}
          <div className="mb-6">
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 text-[#E7A868]">
              Learn · Teach · Connect
            </div>
            <p className="text-base sm:text-lg font-normal leading-relaxed max-w-2xl text-stone-100">
              QUALANTRA connects learners with quality education and qualified educators with
              meaningful teaching opportunity in focused 1 teacher, 10 learners online classrooms.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => onNavigate('/signup')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#1C1917] bg-white rounded-md hover:bg-[#FAF9F5] active:scale-[0.99] transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Get started with QUALANTRA
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('classroom');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs sm:text-sm font-medium rounded-md transition-all shadow-2xs cursor-pointer whitespace-nowrap bg-white/15 text-white border border-white/30 hover:bg-white/25"
            >
              1 Teacher, 10 learners classroom.
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium underline underline-offset-4 transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                Request School Consultation
              </button>
            )}
          </div>

          {/* Verifiable metadata indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-3 border-t border-white/20 text-stone-300">
            <span className="font-semibold text-white">
              1 Teacher, 10 Learners
            </span>
            <span aria-hidden="true">·</span>
            <span>1 Professional Educator</span>
            <span aria-hidden="true">·</span>
            <span>Exactly 10 Remote Learners</span>
            <span aria-hidden="true">·</span>
            <span>All 9 South African Provinces</span>
          </div>
        </div>
      </div>
    </section>
  );
};
