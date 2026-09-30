import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Maximize2, Minimize2, Volume2, VolumeX, Download, RefreshCw } from 'lucide-react';
import { HERO_SHOTS } from '../data/shotsData';
import { Shot } from '../types';

interface HeroVideoEngineProps {
  onOpenStudio?: () => void;
  onExploreClassroom?: () => void;
  onOpenConsultation?: () => void;
}

export const HeroVideoEngine: React.FC<HeroVideoEngineProps> = ({
  onOpenStudio,
  onExploreClassroom,
  onOpenConsultation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Video playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(8.0); // 8 seconds or 6 seconds
  const [currentShotIndex, setCurrentShotIndex] = useState<number>(0);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);

  // Audio Context ref for gentle ambient room tone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Preloaded images
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesReady, setImagesReady] = useState<boolean>(false);

  // Load all shot images
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    HERO_SHOTS.forEach((shot, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = shot.imageSrc;
      img.onload = () => {
        if (!mounted) return;
        loadedCount += 1;
        if (loadedCount === HERO_SHOTS.length) {
          setImagesReady(true);
        }
      };
      images[index] = img;
    });

    loadedImagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Web Audio room tone initialization
  const toggleAudio = () => {
    if (isMuted) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Warm subtle ambient harmonic hum (resembling natural quiet room tone)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(110, ctx.currentTime); // Low A

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          gain.gain.setValueAtTime(0.015, ctx.currentTime); // Very quiet, unobtrusive

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();

          gainNodeRef.current = gain;
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0.02, audioCtxRef.current.currentTime, 0.2);
        }
        setIsMuted(false);
      } catch {
        setIsMuted(true);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.1);
      }
      setIsMuted(true);
    }
  };

  // Main rendering loop for canvas with cinematic movement
  const lastTimestampRef = useRef<number | null>(null);

  const renderFrame = useCallback((now: number) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = now;
    const delta = (now - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = now;

    if (isPlaying) {
      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= totalDuration) {
          return 0; // Loop seamlessly
        }
        return next;
      });
    }

    const canvas = canvasRef.current;
    if (!canvas || !imagesReady) {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const width = canvas.width;
    const height = canvas.height;

    // Time scaling according to totalDuration
    // Default shots scale proportionally if duration is 6s vs 8s
    const scaleFactor = totalDuration / 8.0;
    const shotsScaled = HERO_SHOTS.map((shot) => ({
      ...shot,
      startTime: shot.startTime * scaleFactor,
      endTime: shot.endTime * scaleFactor,
    }));

    // Find current active shot
    let activeIdx = 0;
    for (let i = 0; i < shotsScaled.length; i++) {
      if (currentTime >= shotsScaled[i].startTime && currentTime < shotsScaled[i].endTime) {
        activeIdx = i;
        break;
      }
    }
    setCurrentShotIndex(activeIdx);

    const activeShot = shotsScaled[activeIdx];
    const shotDuration = activeShot.endTime - activeShot.startTime;
    const shotProgress = Math.max(0, Math.min(1, (currentTime - activeShot.startTime) / shotDuration));

    // Calculate crossfade with next shot
    const dissolveDuration = 0.45; // 450ms smooth dissolve
    const timeRemainingInShot = activeShot.endTime - currentTime;
    const isTransitioning = timeRemainingInShot < dissolveDuration;
    const nextIdx = (activeIdx + 1) % shotsScaled.length;

    // Clear canvas with warm white base
    ctx.fillStyle = '#FAF9F5';
    ctx.fillRect(0, 0, width, height);

    // Function to draw an image with camera movement
    const drawShotImage = (img: HTMLImageElement, progress: number, shotNum: number, alpha: number) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Realistic cinematography camera motion curves
      let scale = 1.0;
      let offsetX = 0;
      let offsetY = 0;

      if (shotNum === 1) {
        // Shot 1: Slow dolly push-in (1.00 to 1.04) with micro horizontal drift
        scale = 1.0 + progress * 0.038;
        offsetX = Math.sin(progress * Math.PI) * 12;
      } else if (shotNum === 2) {
        // Shot 2: Subtle lateral pan (learner perspective)
        scale = 1.02 + progress * 0.015;
        offsetX = -progress * 28;
      } else if (shotNum === 3) {
        // Shot 3: Wide elevation breathe
        scale = 1.03 - progress * 0.022;
        offsetY = -progress * 14;
      } else if (shotNum === 4) {
        // Shot 4: Over the shoulder slight diagonal drift
        scale = 1.01 + progress * 0.025;
        offsetX = progress * 16;
        offsetY = progress * 8;
      } else {
        // Final Moment: Airy subtle breathing
        scale = 1.0 + Math.sin(progress * Math.PI) * 0.015;
      }

      // Calculate aspect ratio covering
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width * scale;
      let drawHeight = height * scale;

      if (canvasRatio > imgRatio) {
        drawHeight = drawWidth / imgRatio;
      } else {
        drawWidth = drawHeight * imgRatio;
      }

      const dx = (width - drawWidth) / 2 + offsetX;
      const dy = (height - drawHeight) / 2 + offsetY;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      ctx.restore();
    };

    const currentImg = loadedImagesRef.current[activeIdx];
    drawShotImage(currentImg, shotProgress, activeIdx + 1, 1.0);

    // If in dissolve window, blend next image
    if (isTransitioning) {
      const transitionProgress = 1 - timeRemainingInShot / dissolveDuration;
      const nextImg = loadedImagesRef.current[nextIdx];
      drawShotImage(nextImg, 0, nextIdx + 1, transitionProgress);
    }

    // Apply natural photographic grade & negative space scrim
    // Warm, light aesthetic: Soft gradient scrim on left & top for website text legibility
    const scrim = ctx.createLinearGradient(0, 0, width * 0.75, height);
    scrim.addColorStop(0, 'rgba(250, 249, 245, 0.92)'); // Soft warm white solid for clear headline
    scrim.addColorStop(0.35, 'rgba(250, 249, 245, 0.78)');
    scrim.addColorStop(0.65, 'rgba(250, 249, 245, 0.35)');
    scrim.addColorStop(1, 'rgba(250, 249, 245, 0.08)');

    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, width, height);

    // Subtle soft bottom vignette
    const bottomScrim = ctx.createLinearGradient(0, height * 0.8, 0, height);
    bottomScrim.addColorStop(0, 'rgba(250, 249, 245, 0)');
    bottomScrim.addColorStop(1, 'rgba(250, 249, 245, 0.95)');
    ctx.fillStyle = bottomScrim;
    ctx.fillRect(0, height * 0.8, width, height * 0.2);

    animationFrameRef.current = requestAnimationFrame(renderFrame);
  }, [currentTime, totalDuration, imagesReady, isPlaying]);

  // Canvas size sync
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Use devicePixelRatio for razor-sharp rendering on Retina displays
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = Math.floor(rect.width * dpr);
      canvasRef.current.height = Math.floor(rect.height * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderFrame]);

  // Jump to specific shot
  const jumpToShot = (index: number) => {
    const scaleFactor = totalDuration / 8.0;
    const targetShot = HERO_SHOTS[index];
    if (targetShot) {
      setCurrentTime(targetShot.startTime * scaleFactor);
      setCurrentShotIndex(index);
    }
  };

  // Video Exporter: Records 1 full loop directly from the canvas into a high-quality WebM video!
  const exportVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setIsRecording(true);
      setRecordProgress(0);

      // Rewind to 0
      setCurrentTime(0);
      setIsPlaying(true);

      const stream = canvas.captureStream(60); // 60 FPS
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
        videoBitsPerSecond: 8000000, // 8 Mbps high quality
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qualantra-hero-bg-${totalDuration}s.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordProgress(0);
      };

      recorder.start();

      const startTime = Date.now();
      const durationMs = totalDuration * 1000;

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
        setRecordProgress(pct);

        if (elapsed >= durationMs) {
          clearInterval(progressInterval);
          recorder.stop();
        }
      }, 100);
    } catch (err) {
      console.error('Failed to export video:', err);
      setIsRecording(false);
    }
  };

  const currentShot = HERO_SHOTS[currentShotIndex] || HERO_SHOTS[0];

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#FAF9F5] transition-all duration-500 ${
        isCinemaMode ? 'fixed inset-0 z-50 h-screen' : 'min-h-[90vh] lg:min-h-[850px]'
      }`}
    >
      {/* HTML5 Canvas Background Renderer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        style={{
          filter: 'contrast(1.02) saturate(0.98)',
        }}
      />

      {/* Subtle organic film grain texture overlay */}
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      {/* Hero Content Layer (Only visible when not in Cinema Mode) */}
      {!isCinemaMode && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-28 lg:pb-36 flex flex-col justify-between min-h-[90vh] lg:min-h-[850px]">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E38] mb-6">
              <span>Learn</span>
              <span aria-hidden="true">·</span>
              <span>Teach</span>
              <span aria-hidden="true">·</span>
              <span>Connect</span>
            </div>

            {/* Dominant Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C1917] leading-[1.12] mb-6 font-serif"
              style={{ textWrap: 'balance' }}
            >
              A focused classroom where every learner is genuinely seen.
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-[#44403C] font-normal leading-relaxed mb-8 max-w-2xl">
              South Africa’s dedicated digital education platform. One accredited educator,
              exactly ten remote learners, and an authentic, distraction-free environment
              engineered for genuine human understanding.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClassroom}
                className="px-6 py-3.5 text-sm font-medium text-white bg-[#292524] rounded-md hover:bg-[#1C1917] active:scale-[0.99] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                1 Teacher, 10 learners classroom.
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 text-sm font-medium text-[#292524] bg-white/90 border border-[#D6D3CD] rounded-md hover:bg-white hover:border-[#A8A29E] active:scale-[0.99] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              >
                School Partnerships
              </button>
            </div>

            {/* Live Context Indicators (Zero-Pill, Unboxed Metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#57534E] pt-2 border-t border-[#E7E3DA]/80">
              <span className="font-medium text-[#1C1917]">Live Demonstration</span>
              <span aria-hidden="true">·</span>
              <span>1 Professional Educator</span>
              <span aria-hidden="true">·</span>
              <span>Exactly 10 Remote Learners</span>
              <span aria-hidden="true">·</span>
              <span>CAPS & IEB Aligned</span>
            </div>
          </div>

          {/* Active Shot Status Marker */}
          <div className="mt-12 lg:mt-0 flex items-center justify-between text-xs text-[#78716C]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#1C1917]">{currentShot.title}</span>
              <span aria-hidden="true">·</span>
              <span className="hidden sm:inline">{currentShot.perspective} Perspective</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden md:inline text-[#78716C]">{currentShot.cameraMovement}</span>
            </div>

            <div className="font-mono tabular-nums text-xs">
              00:{currentTime.toFixed(1).padStart(4, '0')} / 00:{totalDuration.toFixed(1)}s
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Director Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E7E3DA] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: Playback & Timeline Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-[#292524] hover:bg-[#EAE7E0] rounded-md transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <span className="font-mono text-xs tabular-nums text-[#57534E] min-w-[70px]">
              {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s
            </span>

            {/* Shot Selector Bar */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[#F5F3ED] rounded-lg border border-[#E7E3DA]">
              {HERO_SHOTS.map((shot, idx) => (
                <button
                  key={shot.id}
                  onClick={() => jumpToShot(idx)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                    currentShotIndex === idx
                      ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                  title={shot.description}
                >
                  {idx === 4 ? 'Finale' : `Shot ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical & Director Actions */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            {/* Duration Selector (6s vs 8s) */}
            <div className="flex items-center gap-1 text-xs text-[#78716C]">
              <span>Duration:</span>
              <button
                onClick={() => setTotalDuration(6.0)}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  totalDuration === 6.0 ? 'bg-[#292524] text-white font-medium' : 'hover:bg-[#EAE7E0]'
                }`}
              >
                6s
              </button>
              <button
                onClick={() => setTotalDuration(8.0)}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  totalDuration === 8.0 ? 'bg-[#292524] text-white font-medium' : 'hover:bg-[#EAE7E0]'
                }`}
              >
                8s
              </button>
            </div>

            {/* Soundscape room tone */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-md border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                !isMuted
                  ? 'bg-[#EAE7E0] border-[#D6D3CD] text-[#1C1917]'
                  : 'bg-white border-[#E7E3DA] text-[#78716C] hover:text-[#1C1917]'
              }`}
              title={isMuted ? 'Listen to subtle classroom room tone' : 'Mute room tone'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8C5E38]" />}
              <span className="hidden xl:inline">{isMuted ? 'Ambient' : 'Ambient On'}</span>
            </button>

            {/* Export video file button */}
            <button
              onClick={exportVideo}
              disabled={isRecording}
              className="px-3 py-1.5 text-xs font-medium text-[#292524] bg-white border border-[#D6D3CD] rounded-md hover:bg-[#F5F3ED] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-2xs"
              title="Download background video file (.webm) for your website"
            >
              {isRecording ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8C5E38]" />
                  <span>Recording {recordProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>Download Video</span>
                </>
              )}
            </button>

            {/* Cinema Fullscreen toggle */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE7E0] rounded-md transition-colors cursor-pointer"
              title={isCinemaMode ? 'Exit Cinema View' : 'Fullscreen Cinema View'}
            >
              {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Shot progress bar */}
        <div className="w-full bg-[#E7E3DA] h-1 mt-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#8C5E38] h-full transition-all duration-75"
            style={{ width: `${(currentTime / totalDuration) * 100}%` }}
          />
        </div>
      </div>

      {/* Cinema Mode Header Overlay when active */}
      {isCinemaMode && (
        <div className="absolute top-6 left-8 right-8 z-30 flex items-center justify-between text-[#1C1917]">
          <div>
            <h2 className="text-xl font-serif font-medium text-[#1C1917]">QUALANTRA Brand Reel</h2>
            <p className="text-xs text-[#78716C]">
              {currentShot.title} · {currentShot.perspective} · 60 FPS Master
            </p>
          </div>

          <button
            onClick={() => setIsCinemaMode(false)}
            className="px-3.5 py-1.5 text-xs font-medium bg-white/90 border border-[#D6D3CD] rounded-md text-[#1C1917] hover:bg-white cursor-pointer shadow-xs"
          >
            Return to Website
          </button>
        </div>
      )}
    </section>
  );
};
