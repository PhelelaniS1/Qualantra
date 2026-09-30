import React from 'react';
import { ASSET_IMAGES } from '../../data/shotsData';
import { TEACHING_OPPORTUNITIES } from '../../data/shotsData';
import { ArrowRight, ShieldCheck, BookOpen, Clock } from 'lucide-react';
import { AppRoute } from '../../types';

interface TeacherSectionProps {
  onNavigate: (route: AppRoute) => void;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({ onNavigate }) => {
  return (
    <section id="teacher" className="py-24 sm:py-32 bg-[#F5F3ED] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#E7E3DA] bg-white shadow-2xs">
              <img
                src={ASSET_IMAGES.teacherPlanning}
                alt="Professional South African Educator Planning Curriculum"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-4/3"
              />
              <div className="p-4 bg-white border-t border-[#E7E3DA]">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#1C1917] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#8C5E38]" />
                    <span>SACE Accredited Educator</span>
                  </div>
                  <span className="text-[#78716C]">Verified Professional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Experience Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
              The Teacher Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-6">
              The teacher is the human authority in every lesson.
            </h2>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed mb-8">
              QUALANTRA is built around qualified educators. Teachers command live classes, manage
              their professional timetable, diagnose learner gaps in real time, and deploy intelligent
              teaching tools on their own terms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E7E3DA] mb-8">
              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#8C5E38]" />
                  <span>Curriculum Autonomy</span>
                </div>
                <div className="text-xs text-[#57534E] leading-relaxed">
                  Deliver lessons strictly mapped to CAPS and IEB standards with integrated past paper
                  references and diagnostic questions.
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8C5E38]" />
                  <span>Flexible Teaching Engagements</span>
                </div>
                <div className="text-xs text-[#57534E] leading-relaxed">
                  Choose between full-time school allocations, afternoon specialist pods, substitute
                  coverage, and focused one-to-one remediation.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('/teacher')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                View Teacher Opportunities
              </button>
              <button
                onClick={() => onNavigate('/signup')}
                className="px-5 py-2.5 text-xs font-medium text-[#292524] bg-white border border-[#D6D3CD] rounded-md hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                Apply as Educator
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
