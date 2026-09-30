import React, { useState } from 'react';
import { ACTIVE_CLASSROOM_DATA } from '../data/shotsData';
import { Learner } from '../types';
import { User, Volume2, BookOpen, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const ClassroomExperience: React.FC = () => {
  const { educator, learners, lessonTitle, subject, durationMinutes, elapsedMinutes } = ACTIVE_CLASSROOM_DATA;
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(learners[0]);

  return (
    <section id="classroom" className="py-24 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            01. Classroom Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            One professional educator. Exactly ten learners.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            The QUALANTRA standard guarantees an uncompromised 1 teacher, 10 learners model. In large online lectures,
            learners disappear into passive spectator mode. In our focused pods, every learner is directly
            engaged, heard, and intellectually accountable in every single session.
          </p>
        </div>

        {/* Classroom Container */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg shadow-2xs overflow-hidden">
          {/* Top Session Bar */}
          <div className="px-6 py-4 border-b border-[#E7E3DA] bg-[#FAF9F5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-base font-semibold text-[#1C1917]">{lessonTitle}</h3>
                <div className="flex items-center gap-2 text-xs text-[#78716C] mt-0.5">
                  <span>{subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>CAPS Physical Sciences Syllabus</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#78716C]" />
                <span className="font-mono tabular-nums">
                  Minute {elapsedMinutes} of {durationMinutes}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
                <span>10 of 10 Learners Present</span>
              </div>
            </div>
          </div>

          {/* Classroom Main View: Split between Teacher Studio & 10-Learner Grid */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Educator Spotlight (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between border border-[#E7E3DA] rounded-lg p-5 bg-[#FAF9F5]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#8C5E38] uppercase tracking-wide">
                    Lead Educator
                  </span>
                  <span className="text-xs text-[#78716C] flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#8C5E38]" /> Active Speaker
                  </span>
                </div>

                <div className="w-full aspect-4/3 bg-[#EAE7E0] rounded-md overflow-hidden relative mb-4 border border-[#D6D3CD]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-linear-to-b from-[#FAF9F5] to-[#EAE7E0]">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#D6D3CD] flex items-center justify-center text-xl font-serif text-[#1C1917] mb-3 shadow-2xs">
                      TD
                    </div>
                    <div className="font-semibold text-sm text-[#1C1917]">{educator.name}</div>
                    <div className="text-xs text-[#57534E] mt-0.5">{educator.title}</div>
                    <div className="text-xs text-[#78716C] mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {educator.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[#57534E] pt-2 border-t border-[#E7E3DA]">
                  <div>
                    <span className="font-medium text-[#1C1917]">Credentials: </span>
                    {educator.qualifications}
                  </div>
                  <div>
                    <span className="font-medium text-[#1C1917]">Live Focus: </span>
                    {educator.currentLesson}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E3DA] text-xs text-[#78716C]">
                Educator audio & whiteboard telemetry synchronous at sub-30ms latency across South Africa.
              </div>
            </div>

            {/* Right: Exactly 10 Learners Grid (8 Cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide">
                  Learner Cohort (Exactly 10 Remote Participants)
                </div>
                <div className="text-xs text-[#78716C]">
                  Click any learner to inspect individual focus
                </div>
              </div>

              {/* 10-Slot Grid: 5 columns on desktop, 2 rows */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {learners.map((learner) => {
                  const isSelected = selectedLearner?.id === learner.id;
                  const initials = learner.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');

                  return (
                    <button
                      key={learner.id}
                      onClick={() => setSelectedLearner(learner)}
                      className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#FAF9F5] shadow-2xs ring-1 ring-[#1C1917]'
                          : 'border-[#E7E3DA] bg-white hover:border-[#A8A29E] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] flex items-center justify-center text-xs font-medium text-[#44403C]">
                          {initials}
                        </span>
                        <span className="text-[10px] font-mono text-[#78716C]">
                          0{learner.id}
                        </span>
                      </div>

                      <div className="font-medium text-xs text-[#1C1917] truncate">
                        {learner.name}
                      </div>

                      <div className="text-[11px] text-[#78716C] truncate mt-0.5">
                        {learner.location.split(',')[0]}
                      </div>

                      <div className="mt-2 text-[10px] text-[#8C5E38] line-clamp-1">
                        {learner.focusArea}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Inspector for Selected Learner */}
              {selectedLearner && (
                <div className="mt-6 p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1C1917]">
                        {selectedLearner.name}
                      </span>
                      <span aria-hidden="true" className="text-[#D6D3CD]">·</span>
                      <span className="text-xs text-[#57534E]">{selectedLearner.grade}</span>
                      <span aria-hidden="true" className="text-[#D6D3CD]">·</span>
                      <span className="text-xs text-[#78716C]">{selectedLearner.location}</span>
                    </div>

                    <div className="text-xs text-[#44403C] mt-1.5 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#8C5E38]" />
                      <span>Focus: {selectedLearner.focusArea}</span>
                    </div>

                    <div className="text-xs text-[#78716C] mt-1">
                      Current Activity: {selectedLearner.currentActivity}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#57534E] bg-white px-3 py-1.5 rounded border border-[#E7E3DA] whitespace-nowrap">
                    Active Participant · Audio Clear
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Pillars of the Classroom Experience */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-[#E7E3DA] rounded-lg">
            <div className="font-serif text-lg text-[#1C1917] mb-2">
              Authentic Cognitive Presence
            </div>
            <p className="text-sm text-[#57534E] leading-relaxed">
              With exactly ten learners, the educator maintains real spatial awareness of every face.
              Subtle hesitation, furrowed brows, and moments of breakthrough are caught in the moment,
              not lost in a chat box.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E3DA] rounded-lg">
            <div className="font-serif text-lg text-[#1C1917] mb-2">
              Pan-South African Inclusion
            </div>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Learners from Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, and Limpopo share the
              same digital seminar table, bridging geographic and institutional divides with equal access
              to top-tier subject specialists.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E3DA] rounded-lg">
            <div className="font-serif text-lg text-[#1C1917] mb-2">
              Syllabus Rigour (CAPS & IEB)
            </div>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Every lesson plan is anchored in South Africa's curriculum frameworks. Worksheets,
              impulse calculations, and essay drafts are reviewed synchronously with direct educator
              annotations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
