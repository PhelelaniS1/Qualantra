import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Layers,
} from 'lucide-react';
import { QUALANTRA_EDUCATOR, QUALANTRA_LEARNERS, ASSET_IMAGES } from '../../data/shotsData';

// Import authentic student face portraits
import kagisoImg from '@/src/assets/images/kagiso_molefe_1790328516965.jpg';
import nandiImg from '@/src/assets/images/nandi_sithole_1790328529621.jpg';
import liamImg from '@/src/assets/images/liam_vandermerwe_1790328538548.jpg';
import keishaImg from '@/src/assets/images/keisha_pillay_1790328550286.jpg';
import jabulaniImg from '@/src/assets/images/jabulani_ndlovu_1790328563049.jpg';
import anikaImg from '@/src/assets/images/anika_botha_1790328573502.jpg';
import siphoImg from '@/src/assets/images/sipho_maseko_1790328585007.jpg';
import fatimaImg from '@/src/assets/images/fatima_patel_1790328596437.jpg';
import shot2Img from '@/src/assets/images/shot2_learner_perspective_1790274430057.jpg';
import shot4Img from '@/src/assets/images/shot4_admin_perspective_1790274454325.jpg';

// Map each of the 10 learners to their authentic photographic face
const LEARNER_PHOTOS: Record<number, string> = {
  1: liamImg,
  2: nandiImg,
  3: kagisoImg, // Kagiso Molefe
  4: keishaImg,
  5: jabulaniImg,
  6: anikaImg,
  7: siphoImg,
  8: fatimaImg,
  9: shot4Img,
  10: shot2Img,
};

export const ClassroomSection: React.FC = () => {
  const educator = QUALANTRA_EDUCATOR;
  const learners = QUALANTRA_LEARNERS;
  // Default selected learner is Kagiso Molefe (id: 3) so users immediately see Kagiso
  const [selectedLearner, setSelectedLearner] = useState(learners[2] || learners[0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <section id="classroom" className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#E7E3DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#1C1917] tracking-tight">
            1 Teacher, 10 learners classroom.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Every session is capped at exactly ten remote learners with one accredited educator.
            Below is a live conference view of an active Grade 11 Physics Class with learners
            connecting synchronously from all over South Africa, assisted by Ali.
          </p>
        </div>

        {/* 
          LAPTOP HARDWARE CHASSIS MOCKUP
          Looks like a modern MacBook / premium ultrabook frame
        */}
        <div className="relative mx-auto max-w-6xl">
          {/* Laptop Lid / Bezel */}
          <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-[#1C1917] p-2.5 sm:p-4 pb-2 border-t-2 border-x-2 border-stone-600 shadow-2xl">
            {/* Top Bezel Center Camera with Active Green LED */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-stone-950" />
              </div>
            </div>

            {/* 
              THE LAPTOP SCREEN DISPLAY:
              "It should look like a Zoom meeting, but better."
              Clean, dark obsidian conference UI with teacher, 10 learners (faces showing), and Ali assistant.
            */}
            <div className="relative aspect-16/10 bg-[#0C0B0A] rounded-lg sm:rounded-xl overflow-hidden border border-stone-800 flex flex-col justify-between select-none text-white shadow-inner">
              
              {/* Conference Call Top Header */}
              <div className="bg-black/75 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-2.5 border-b border-white/10 flex items-center justify-between text-xs shrink-0 z-20">
                {/* Left: Window Controls & Call Title */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/15 sm:pl-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-stone-100 truncate text-[11px] sm:text-xs">
                      QUALANTRA Pod · Grade 11 Physics Class
                    </span>
                  </div>
                </div>

                {/* Right: Live Status */}
                <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span className="font-semibold">LIVE</span>
                    <span className="text-stone-400 hidden sm:inline">· 24:18 / 45:00</span>
                  </div>
                </div>
              </div>

              {/* Main Stage Grid: Split between Teacher Stage & 10 Learners + Ali */}
              <div className="flex-1 p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 overflow-y-auto">
                
                {/* 
                  1. LEAD EDUCATOR SPOTLIGHT (5 Cols on LG)
                  Prominently displays the teacher leading the conference
                */}
                <div className="lg:col-span-5 relative rounded-lg overflow-hidden border-2 border-emerald-500/80 bg-stone-900 flex flex-col justify-between group shadow-lg min-h-[190px] sm:min-h-[230px]">
                  {/* Teacher Camera Stream */}
                  <img
                    src={ASSET_IMAGES.shot1}
                    alt="Ms. Thandeka Dlamini, Lead Physical Sciences Educator"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/40 pointer-events-none" />

                  {/* Top Overlay: Speaking Equalizer & Telemetry */}
                  <div className="relative z-10 p-2.5 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/20 text-emerald-300">
                      {/* Animated audio equalizer wave */}
                      <span className="flex items-center gap-0.5 h-3">
                        <span className="w-0.5 h-3 bg-emerald-400 animate-[bounce_0.8s_infinite]" />
                        <span className="w-0.5 h-2 bg-emerald-400 animate-[bounce_0.6s_infinite_0.1s]" />
                        <span className="w-0.5 h-3.5 bg-emerald-400 animate-[bounce_0.9s_infinite_0.2s]" />
                        <span className="w-0.5 h-1.5 bg-emerald-400 animate-[bounce_0.7s_infinite_0.15s]" />
                      </span>
                      <span className="font-medium text-[10px]">Speaking (Lead Teacher)</span>
                    </div>

                    <div className="bg-black/80 px-2 py-0.5 rounded text-[10px] text-stone-200 border border-white/15">
                      Sub-30ms Telemetry
                    </div>
                  </div>

                  {/* Bottom Overlay: Teacher Name, Credentials & Live Lesson Focus */}
                  <div className="relative z-10 p-2.5 sm:p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-sm sm:text-base font-semibold text-white">
                        {educator.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[9px] font-semibold uppercase">
                        SACE Registered
                      </span>
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-stone-200 font-mono">
                      Credentials: BSc (Hons) Chemistry & Physics (Wits), PGCE (UCT)
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-amber-200/90 leading-tight">
                      Live Focus: Newtonian Mechanics: Momentum and Impulse Applications
                    </div>
                  </div>
                </div>

                {/* 
                  2. GRADE 11 PHYSICS CLASS: 10 LEARNERS (7 Cols on LG)
                  Every learner shows their real photographic face in a video conference grid!
                */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-[11px] px-1">
                    <div className="font-semibold text-stone-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#E7A868]" />
                      <span>Grade 11 Physics Class (Learners from all over South Africa)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 hidden sm:inline">
                      10/10 Video & Audio Active
                    </span>
                  </div>

                  {/* 10-Learner Conference Tile Grid with REAL FACES */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 flex-1">
                    {learners.map((learner) => {
                      const isSelected = selectedLearner?.id === learner.id;
                      const learnerPhoto = LEARNER_PHOTOS[learner.id] || kagisoImg;

                      return (
                        <button
                          key={learner.id}
                          onClick={() => setSelectedLearner(learner)}
                          className={`relative rounded-lg overflow-hidden flex flex-col justify-between text-left transition-all cursor-pointer border aspect-4/3 group ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/80 shadow-lg'
                              : 'border-white/15 hover:border-white/40'
                          }`}
                          title={`Click to view ${learner.name}`}
                        >
                          {/* Real Learner Face Video Feed */}
                          <img
                            src={learnerPhoto}
                            alt={learner.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {/* Video Scrim Gradients */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                          {/* Top Tag: Active Mic icon */}
                          <div className="relative z-10 p-1.5 flex items-center justify-between w-full">
                            <span className="px-1 py-0.2 rounded bg-black/60 text-[8px] text-stone-300 font-mono">
                              0{learner.id}
                            </span>
                            <div className="w-4 h-4 rounded-full bg-black/60 flex items-center justify-center">
                              <Mic className="w-2.5 h-2.5 text-emerald-400" />
                            </div>
                          </div>

                          {/* Bottom Overlay: Learner Name & Province ONLY (No jargon) */}
                          <div className="relative z-10 p-1.5">
                            <div className="text-[10px] sm:text-[11px] font-semibold text-white truncate drop-shadow-sm leading-tight">
                              {learner.name}
                            </div>
                            <div className="text-[9px] text-stone-300 truncate flex items-center gap-0.5 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-[#E7A868] shrink-0" />
                              <span className="truncate">{learner.location.split(',')[1] || learner.location}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 
                    3. ALI THE ASSISTANT (Small Animation)
                    Integrated companion widget inside the conference call
                  */}
                  <div className="rounded-lg bg-linear-to-r from-stone-900/95 via-stone-900/90 to-amber-950/40 border border-amber-500/30 p-2 sm:p-2.5 flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-2.5">
                      {/* Animated Ali glowing orb */}
                      <div className="relative w-7 h-7 rounded-full bg-linear-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                        <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
                        <span className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-35" />
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-amber-200">
                            Ali Assistant
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                            Active
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-300 truncate max-w-xs sm:max-w-md">
                          Whiteboard Telemetry: <code className="text-amber-300">p = m·v | Δp = F_net·Δt</code> (Real-time concept questions ready)
                        </div>
                      </div>
                    </div>

                    <div className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-stone-300 font-mono shrink-0">
                      sub-30ms
                    </div>
                  </div>
                </div>
              </div>

              {/* Conference Call Bottom Toolbar (Zoom-style controls) */}
              <div className="bg-black/85 backdrop-blur-md px-3 sm:px-6 py-2 border-t border-white/10 flex items-center justify-between shrink-0 z-20">
                {/* Left: Audio/Video Toggles */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex flex-col items-center gap-0.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <MicOff className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-400" />
                    ) : (
                      <Mic className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" />
                    )}
                    <span className="text-[8px] sm:text-[9px]">{isMuted ? 'Unmuted' : 'Mute'}</span>
                  </button>

                  <button className="flex flex-col items-center gap-0.5 text-stone-300 hover:text-white transition-colors cursor-pointer">
                    <Video className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" />
                    <span className="text-[8px] sm:text-[9px]">Video</span>
                  </button>
                </div>

                {/* Center: Meeting Action Icons */}
                <div className="flex items-center gap-3 sm:gap-6 text-stone-300 text-[9px] sm:text-[10px]">
                  <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors">
                    <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-300" />
                    <span>Participants (11)</span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors">
                    <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    <span className="hidden sm:inline">Whiteboard</span>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 text-amber-300 font-semibold cursor-pointer">
                    <div className="relative">
                      <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-300" />
                      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span>Ali AI</span>
                  </div>
                </div>

                {/* Right: Leave / End Pod button */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 text-[10px] text-stone-400 font-mono pr-2 border-r border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    28ms latency
                  </div>
                  <button className="px-2.5 sm:px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer shadow-xs">
                    Leave Pod
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base Bottom Lip & Shadow */}
          <div className="relative mx-auto w-[102%] -left-[1%] h-3 sm:h-4 bg-linear-to-b from-stone-400 via-stone-500 to-stone-600 rounded-b-xl sm:rounded-b-2xl shadow-xl flex items-center justify-center">
            {/* Front laptop open thumb notch */}
            <div className="w-14 sm:w-20 h-1 sm:h-1.5 bg-stone-700 rounded-b" />
          </div>
          <div className="mx-auto w-[90%] h-3 bg-black/25 blur-md rounded-full mt-1" />
        </div>

        {/* 
          EDUCATOR & CLASSROOM VERIFIED INFORMATION CARD
          Exactly incorporating the requested information:
          - Credentials: BSc (Hons) Chemistry & Physics (Wits), PGCE (UCT), SACE Registered
          - Live Focus: Newtonian Mechanics: Momentum and Impulse Applications
          - Educator audio and whiteboard telemetry synchronous at sub-30ms latency across South Africa
          - Grade 11 Physics Class with learners from all over South Africa
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Educator In-Depth Card (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#E7E3DA] rounded-xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-4">
              <div>
                <span className="text-xs font-semibold text-[#8C5E38] uppercase tracking-wider">
                  Lead Educator Spotlight
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-0.5">
                  {educator.name}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>SACE Registered</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#44403C]">
              <div>
                <span className="font-semibold text-[#1C1917]">Credentials: </span>
                <span className="text-[#2D2A26] font-medium">
                  BSc (Hons) Chemistry & Physics (Wits), PGCE (UCT), SACE Registered
                </span>
              </div>

              <div>
                <span className="font-semibold text-[#1C1917]">Live Focus: </span>
                <span className="text-[#2D2A26] font-medium">
                  Newtonian Mechanics: Momentum and Impulse Applications
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA] text-xs text-[#57534E] leading-relaxed">
                <span className="font-semibold text-[#1C1917]">Telemetry Standard: </span>
                Educator audio and whiteboard telemetry synchronous at sub-30ms latency across South Africa.
              </div>
            </div>

            <div className="pt-2 text-xs text-[#78716C] flex items-center justify-between border-t border-[#E7E3DA]">
              <span>Grade 11 Physics Class</span>
              <span className="font-semibold text-[#1C1917]">CAPS & IEB Aligned</span>
            </div>
          </div>

          {/* Class & Geographic Reach Card (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#E7E3DA] rounded-xl p-6 sm:p-8 space-y-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#8C5E38] uppercase tracking-wider">
                    Class & Geographic Reach
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1917] mt-0.5">
                    Grade 11 Physics Class
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#FAF9F5] text-[#1C1917] border border-[#D6D3CD] text-xs font-semibold">
                  10 Learners Active
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed my-4">
                Learners from all over South Africa connect into this single synchronous classroom.
                Whether in the Western Cape, Gauteng, KwaZulu-Natal, the Eastern Cape, or Limpopo,
                every learner receives direct educator attention and sub-30ms interactive whiteboard engagement.
              </p>

              {/* Selected Learner Inspector Box */}
              {selectedLearner && (
                <div className="p-3.5 bg-[#F5F3ED] rounded-lg border border-[#E7E3DA] text-xs flex items-center gap-3.5">
                  <img
                    src={LEARNER_PHOTOS[selectedLearner.id] || kagisoImg}
                    alt={selectedLearner.name}
                    className="w-12 h-12 rounded-lg object-cover border border-white shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-semibold text-sm text-[#1C1917]">
                      {selectedLearner.name}
                    </div>
                    <div className="text-[#8C5E38] font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedLearner.location}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 text-[11px] text-[#78716C] border-t border-[#E7E3DA]">
              Click any learner in the laptop meeting grid to view their location and profile.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
