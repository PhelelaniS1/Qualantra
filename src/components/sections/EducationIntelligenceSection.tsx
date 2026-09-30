import React from 'react';
import { ArrowDown, Database, BookMarked, FileCheck, Layers } from 'lucide-react';

export const EducationIntelligenceSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
            Knowledge Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif text-[#1C1917] tracking-tight mb-4">
            QUALANTRA is designed to stay informed.
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Our platform maintains an Education Intelligence Fabric: ingesting approved national
            curriculum frameworks, past Senior Certificate and IEB examination papers, and official
            subject guidelines so that educators and Ali reference verifiable South African standards.
          </p>
        </div>

        {/* Sophisticated Knowledge Architecture Concept Diagram */}
        <div className="bg-white border border-[#E7E3DA] rounded-lg p-8 sm:p-12 shadow-2xs space-y-10">
          {/* Level 1: Authoritative Sources */}
          <div>
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-4">
              Level 1: Authoritative Educational Inputs
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5]">
                <div className="font-semibold text-[#1C1917] mb-1">Curriculum Frameworks</div>
                <div className="text-[11px] text-[#57534E]">CAPS and IEB Subject Statements</div>
              </div>

              <div className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5]">
                <div className="font-semibold text-[#1C1917] mb-1">Past Exam Papers</div>
                <div className="text-[11px] text-[#57534E]">National Senior Certificate Papers 1 & 2</div>
              </div>

              <div className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5]">
                <div className="font-semibold text-[#1C1917] mb-1">Assessment Guidelines</div>
                <div className="text-[11px] text-[#57534E]">Official Marking Memoranda & Rubrics</div>
              </div>

              <div className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5]">
                <div className="font-semibold text-[#1C1917] mb-1">Teacher Pedagogical Guides</div>
                <div className="text-[11px] text-[#57534E]">Work schedules and lesson pacers</div>
              </div>

              <div className="p-3.5 rounded border border-[#E7E3DA] bg-[#FAF9F5]">
                <div className="font-semibold text-[#1C1917] mb-1">Educational Directives</div>
                <div className="text-[11px] text-[#57534E]">National school calendar & circulars</div>
              </div>
            </div>
          </div>

          {/* Downward Conduit */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs text-[#57534E]">
              <ArrowDown className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Structured Verification and Semantic Indexing</span>
            </div>
          </div>

          {/* Level 2: QUALANTRA Knowledge Core */}
          <div className="p-6 rounded-lg bg-[#FAF9F5] border border-[#1C1917] max-w-2xl mx-auto text-center space-y-2">
            <div className="w-10 h-10 rounded bg-[#1C1917] text-white flex items-center justify-center font-serif text-lg mx-auto shadow-2xs">
              Q
            </div>
            <div className="font-serif text-xl text-[#1C1917]">
              QUALANTRA Education Intelligence Core
            </div>
            <p className="text-xs text-[#57534E] max-w-md mx-auto leading-relaxed">
              Curriculum aligned knowledge fabric. Contains no unverified hallucinations; only
              curriculum approved theorems, problems, and bilingual terminology.
            </p>
          </div>

          {/* Downward Conduit */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs text-[#57534E]">
              <ArrowDown className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Real-Time Support Distribution</span>
            </div>
          </div>

          {/* Level 3: Empowered Stakeholders */}
          <div>
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-4 text-center">
              Level 3: Synchronous Ecosystem Beneficiaries
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-xs">
              <div className="p-5 rounded-lg border border-[#E7E3DA] bg-white text-center">
                <div className="font-serif text-base text-[#1C1917] mb-1">The Learner</div>
                <p className="text-[#57534E]">
                  Accurate diagnostic practice, past exam solutions, and home language concept bridging.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#E7E3DA] bg-white text-center">
                <div className="font-serif text-base text-[#1C1917] mb-1">The Teacher</div>
                <p className="text-[#57534E]">
                  Rapid lesson preparation, curriculum mapped problem sets, and verified teaching pacing.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#E7E3DA] bg-white text-center">
                <div className="font-serif text-base text-[#1C1917] mb-1">Ali Co-Pilot</div>
                <p className="text-[#57534E]">
                  Proposes diagrams and step explanations strictly bounded by official DBE syllabi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
