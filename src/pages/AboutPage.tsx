import React, { useState } from 'react';
import { AppRoute } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Layers,
  Check,
  Building2,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { QualantraLogo } from '../components/common/QualantraLogo';
import { ASSET_IMAGES } from '../data/shotsData';

interface AboutPageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  // Interactive Ali demonstration scenario state
  const [activeAliScenario, setActiveAliScenario] = useState<number>(0);

  const aliScenarios = [
    {
      id: 0,
      title: 'Alternative Explanation',
      category: 'Differentiated Learning',
      teacherPrompt: 'Ali, give me another way to explain electric current to a Grade 7 learner who is struggling with abstract charge concepts.',
      aliResponse: 'Think of electric current like water moving through household irrigation pipes. Voltage is the water pressure pushing from the tap, and current is the actual litres flowing past per minute. If there is a narrow valve, that is resistance.',
      teacherDecision: 'Teacher approves the water pressure analogy, presents it to the pod, and checks learner comprehension.',
    },
    {
      id: 1,
      title: 'Practice Generation',
      category: 'Formative Assessment',
      teacherPrompt: 'Create three tiered practice questions based on the stoichiometry problem we just worked through.',
      aliResponse: 'Question 1 verifies basic molar mass calculation. Question 2 tests balanced equation coefficients. Question 3 introduces a limiting reactant scenario with realistic laboratory numbers.',
      teacherDecision: 'Teacher assigns Question 1 and 2 to all ten learners, keeping Question 3 for cohort extension.',
    },
    {
      id: 2,
      title: 'Learning Gap Identification',
      category: 'Remediation Insight',
      teacherPrompt: 'Which learners in today\'s pod need additional support based on the quick quadratic factoring exercise?',
      aliResponse: 'Three learners made sign errors when the constant term was negative. Seven learners factored correctly on the first attempt.',
      teacherDecision: 'Teacher pauses the pod to demonstrate negative sign distribution before proceeding to the next syllabus module.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-20 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ============================================================== */}
        {/* 1. HERO SECTION */}
        {/* ============================================================== */}
        <section className="space-y-6 pt-4 border-b border-[#E7E3DA] pb-16">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>

          <div className="mb-2">
            <QualantraLogo size="md" variant="full" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
            <span>About QUALANTRA</span>
            <span aria-hidden="true">·</span>
            <span>Institutional Overview</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#1C1917] tracking-tight leading-[1.15] max-w-4xl">
            A digital school built to connect learners, qualified educators, and intelligent technology.
          </h1>

          <div className="space-y-4 max-w-3xl text-lg sm:text-xl text-[#44403C] leading-relaxed">
            <p className="font-serif italic text-2xl text-[#1C1917]">
              Quality education should connect with teaching opportunity.
            </p>
            <p>
              QUALANTRA is built around three connected ideas: <strong>Learn. Teach. Connect.</strong>
            </p>
            <p className="text-base text-[#57534E]">
              We go beyond standard video calls and pre-recorded video libraries.
              QUALANTRA is a structured digital school environment where the teacher teaches,
              artificial intelligence assists, inclusive technology connects, and every learner belongs.
            </p>
          </div>

          {/* Quick Pillars Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs text-[#1C1917]">
            <div className="p-4 rounded-lg bg-white border border-[#E7E3DA]">
              <div className="font-semibold text-sm mb-1 text-[#8C5E38]">The Teacher</div>
              <div className="text-[#57534E]">Leads, mentors, and commands the live classroom with professional judgement.</div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#E7E3DA]">
              <div className="font-semibold text-sm mb-1 text-[#8C5E38]">Ali Assists</div>
              <div className="text-[#57534E]">Empowers the educator with rapid materials, summaries, and diagnostic insights.</div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#E7E3DA]">
              <div className="font-semibold text-sm mb-1 text-[#8C5E38]">SignFusion</div>
              <div className="text-[#57534E]">Connects Deaf and hearing participants within the same synchronous classroom.</div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#E7E3DA]">
              <div className="font-semibold text-sm mb-1 text-[#8C5E38]">Ten Learners</div>
              <div className="text-[#57534E]">Focused pods ensuring every student is seen, heard, and intellectually accountable.</div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. THE SOUTH AFRICAN CHALLENGE & OPPORTUNITY */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#E7E3DA] pb-20">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              01. The Challenge and Opportunity
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917] leading-tight">
              Creating a reliable bridge across South Africa.
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Our educational landscape is defined by vast potential alongside deep geographic disparities.
              QUALANTRA was founded to bridge these realities with dignified technology.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#44403C] leading-relaxed">
            <p>
              South Africa has exceptional students eager to master science, mathematics, literature,
              and technology. Yet secondary schools across both rural provinces and urban township communities
              frequently encounter shortages of specialized subject educators. A learner in Limpopo or the Eastern Cape
              may have immense scientific curiosity, but lack access to a dedicated Physical Sciences specialist.
            </p>

            {/* Critical National Priority: Addressing Educator Unemployment */}
            <div className="bg-white border-2 border-[#1C1917] rounded-xl p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#8C5E38] text-white">
                  National Priority
                </span>
                <span className="text-xs font-semibold text-[#1C1917]">
                  Bridging the Educator Unemployment Gap
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] leading-snug">
                Over 22,000 qualified young teachers in South Africa are currently without employment.
              </h3>

              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                South Africa faces a painful structural mismatch. While thousands of classrooms urgently need
                specialist academic guidance, more than 22,000 professionally accredited young teachers with valid
                university degrees and SACE credentials remain excluded from active employment.
              </p>

              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                QUALANTRA is built directly to address this issue. We provide qualified young educators with
                dignified, flexible, and fairly compensated teaching opportunities, allowing them to lead focused
                ten-learner pods from anywhere in the country without relocating.
              </p>

              <div className="pt-2 border-t border-[#E7E3DA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#1C1917]">
                <div className="font-medium">
                  Two crises solved in one ecosystem:
                </div>
                <div className="text-[#8C5E38] font-semibold">
                  Youth Unemployment Relief + High-Quality Education
                </div>
              </div>
            </div>

            <p>
              By activating these 22,000 qualified educators, QUALANTRA ensures that no young teacher's hard-earned
              skills sit idle while high school learners struggle without support. High-quality education is not
              compromised; every educator is SACE verified and supported inside the classroom by Ali, creating an
              uncompromising standard of academic excellence across all nine provinces.
            </p>

            <p className="font-medium text-[#1C1917] bg-[#F5F3ED] p-4 rounded-lg border border-[#E7E3DA]">
              QUALANTRA exists to establish a direct, dependable bridge between these two realities.
              When qualified educators find meaningful work and committed learners receive rigorous personal instruction,
              South Africa moves forward.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. THE TEN-LEARNER DIGITAL POD MODEL */}
        {/* ============================================================== */}
        <section className="space-y-8 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              02. Classroom Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917]">
              One professional educator. Exactly ten learners.
            </h2>
            <p className="text-base text-[#57534E] leading-relaxed">
              We reject mass webinars and broadcast lectures. Large digital halls turn learners into passive
              spectators who turn off cameras and disappear. QUALANTRA is built around intentional,
              synchronous ten-learner pods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1C1917]">Unbroken Teacher Visibility</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                In a ten-person classroom, the educator sees every face on a single screen without scrolling.
                A subtle look of confusion or hesitation is caught in real time, before a learning gap hardens.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1C1917]">Intellectual Accountability</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Learners are not anonymous numbers. Every student speaks, presents solutions, answers Socratic
                questions, and participates in guided peer problem-solving during every single lesson.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1C1917]">Structured Community</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Pods form bonded cohorts across all nine provinces. A matriculant in Polokwane works alongside
                peers in Durban and Cape Town, building mutual aspiration and collaborative study discipline.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. MEET ALI: TEACHING WITH INTELLIGENCE */}
        {/* ============================================================== */}
        <section className="space-y-12 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teaching With Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917]">
              Meet Ali: QUALANTRA's AI Teaching Assistant
            </h2>
            <div className="text-xl font-serif italic text-[#1C1917] pt-1">
              Ali does not replace the teacher. Ali makes the teacher more capable.
            </div>
            <p className="text-base text-[#57534E] leading-relaxed">
              We do not believe in autonomous robot tutors or algorithmic schooling. Education is an inherently
              human craft requiring moral authority, empathy, and professional judgement. Ali exists inside
              the QUALANTRA classroom solely to support the educator, removing administrative and preparation
              friction so the teacher can focus completely on teaching.
            </p>
          </div>

          {/* Side by Side: Teacher + Ali Relationship */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual: Teacher Planning with Ali Interface */}
            <div className="lg:col-span-5 relative bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg overflow-hidden shadow-2xs flex flex-col">
              <img
                src={ASSET_IMAGES.teacherPlanning}
                alt="South African Educator collaborating with Ali teaching assistant interface"
                className="w-full h-64 object-cover border-b border-[#E7E3DA]"
              />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-1">
                    Human-Centered Architecture
                  </div>
                  <h3 className="font-serif text-lg text-[#1C1917]">
                    Teacher + Ali, not Teacher vs AI
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed mt-2">
                    The educator is always in command. Ali proposes, synthesizes, and drafts.
                    The teacher evaluates, decides, modifies, and presents. Nothing reaches a learner
                    without educator oversight.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E7E3DA] text-[11px] text-[#78716C] font-mono">
                  Integrated into QUALANTRA classroom workflow
                </div>
              </div>
            </div>

            {/* Contrast Table: What Teacher Brings vs What Ali Brings */}
            <div className="lg:col-span-7 bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="font-serif text-xl text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                A Balanced Educational Partnership
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3 bg-[#FAF9F5] p-4 rounded-md border border-[#E7E3DA]">
                  <div className="font-semibold text-sm text-[#1C1917] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8C5E38]" />
                    <span>The Teacher Provides:</span>
                  </div>
                  <ul className="space-y-2 text-[#44403C]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>SACE accredited subject mastery and curriculum depth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Pedagogical judgement and ethical responsibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Deep empathy, patience, and emotional resonance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>South African cultural context and lived experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Classroom leadership, encouragement, and mentorship</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 bg-[#F5F3ED] p-4 rounded-md border border-[#E7E3DA]">
                  <div className="font-semibold text-sm text-[#1C1917] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#8C5E38]" />
                    <span>Ali Provides:</span>
                  </div>
                  <ul className="space-y-2 text-[#44403C]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Instant alternative analogies for struggling learners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Rapid tiered question and quiz generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Real-time synthesis of student response patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Multilingual glossary and terminology support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C5E38] font-bold">·</span>
                      <span>Automated session summaries and parent notes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-xs text-[#57534E] leading-relaxed pt-2">
                Ali is not a generic internet chatbot. Ali is trained strictly on accredited South African curriculum
                documents, CAPS guidelines, and verified subject syllabi to provide safe, classroom-ready educational support.
              </div>
            </div>
          </div>

          {/* Interactive Ali Classroom Workflow Demonstration */}
          <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DA] pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
                  Live Classroom Scenario
                </div>
                <h3 className="font-serif text-xl text-[#1C1917]">
                  How a Teacher Interacts With Ali During Instruction
                </h3>
              </div>

              {/* Scenario Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {aliScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveAliScenario(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeAliScenario === idx
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'bg-[#FAF9F5] border border-[#E7E3DA] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Content Card */}
            <div className="space-y-4">
              <div className="bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <span className="w-2 h-2 rounded-full bg-[#1C1917]" />
                  <span>Teacher Request inside QUALANTRA Pod:</span>
                  <span className="text-[#78716C] font-normal">({aliScenarios[activeAliScenario].category})</span>
                </div>
                <div className="text-sm font-serif italic text-[#1C1917] pl-4 border-l-2 border-[#1C1917]">
                  "{aliScenarios[activeAliScenario].teacherPrompt}"
                </div>
              </div>

              <div className="bg-[#F5F3ED] border border-[#E7E3DA] rounded-lg p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E38]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ali Teaching Assistant Suggestion:</span>
                </div>
                <div className="text-sm text-[#44403C] leading-relaxed pl-4 border-l-2 border-[#8C5E38]">
                  {aliScenarios[activeAliScenario].aliResponse}
                </div>
              </div>

              <div className="bg-white border border-[#D6D3CD] rounded-lg p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Teacher Decision & Classroom Action:</span>
                </div>
                <div className="text-xs text-[#57534E] pl-4">
                  {aliScenarios[activeAliScenario].teacherDecision}
                </div>
              </div>
            </div>

            <div className="text-xs text-[#78716C] pt-2">
              Responsible AI Guarantee: Ali never speaks to students without educator authorization, does not assign final grades, and does not replace human interaction.
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. SIGNFUSION: ONE CLASSROOM. EVERY LEARNER */}
        {/* ============================================================== */}
        <section className="space-y-12 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3ED] border border-[#E7E3DA] text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Inclusive Visual-Language Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917]">
              One Classroom. Every Learner: SignFusion
            </h2>
            <div className="text-xl font-serif italic text-[#1C1917] pt-1">
              One teacher. One lesson. One classroom. Every learner.
            </div>
            <p className="text-base text-[#57534E] leading-relaxed">
              SignFusion is not a bolt-on accessibility checkbox. It is a foundational technological innovation
              designed around South African Sign Language (SASL), recognized as South Africa's 12th official language.
              We believe a Deaf educator should be able to teach naturally in SASL, while every learner receives the
              precise language access they need within the same synchronous classroom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Photography of Deaf Educator */}
            <div className="lg:col-span-6 relative bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg overflow-hidden shadow-2xs flex flex-col">
              <img
                src={ASSET_IMAGES.signfusion}
                alt="Qualified Deaf South African educator teaching live pod in South African Sign Language"
                className="w-full h-80 object-cover border-b border-[#E7E3DA]"
              />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38] mb-1">
                    Inclusion by Design
                  </div>
                  <h3 className="font-serif text-xl text-[#1C1917]">
                    Accessibility as Classroom Architecture
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed mt-2">
                    QUALANTRA does not segregate Deaf learners into isolated secondary channels. Nor do we
                    require a hearing student to exit when a master educator communicates via sign.
                    The classroom itself understands visual language and unites every participant in real time.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between text-xs text-[#78716C]">
                  <span>South African Sign Language (SASL) Native</span>
                  <span className="font-mono text-[#8C5E38] font-medium">Official 12th Language</span>
                </div>
              </div>
            </div>

            {/* Detailed Architecture Breakdown */}
            <div className="lg:col-span-6 bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="font-serif text-xl text-[#1C1917] mb-2">
                  Understanding Visual Language Beyond Simple Handshapes
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed mb-6">
                  Sign language is rich, grammatical, and multidimensional. It cannot be reduced to isolated flat
                  dictionary matches. SignFusion is designed around the full spatial morphology of SASL:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF9F5] rounded border border-[#E7E3DA]">
                    <div className="font-semibold text-[#1C1917] mb-1">Hand Shape & Placement</div>
                    <div className="text-[#57534E]">Precise spatial location relative to torso and head geometry.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded border border-[#E7E3DA]">
                    <div className="font-semibold text-[#1C1917] mb-1">Facial & Non-Manual Signals</div>
                    <div className="text-[#57534E]">Eyebrow posture, mouth patterns, and head tilts indicating grammar.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded border border-[#E7E3DA]">
                    <div className="font-semibold text-[#1C1917] mb-1">Movement Velocity & Path</div>
                    <div className="text-[#57534E]">Dynamic motion trajectory conveying emphasis, tense, and aspect.</div>
                  </div>
                  <div className="p-3 bg-[#FAF9F5] rounded border border-[#E7E3DA]">
                    <div className="font-semibold text-[#1C1917] mb-1">Curriculum Context</div>
                    <div className="text-[#57534E]">Grounded in CAPS subject domains: algebra, optics, and cell biology.</div>
                  </div>
                </div>
              </div>

              {/* Bidirectional Educational Connection */}
              <div className="pt-6 border-t border-[#E7E3DA] space-y-3">
                <div className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  Two-Way Educational Flow:
                </div>
                <div className="p-3 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-xs text-[#44403C] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#8C5E38]">SASL → Educational Meaning → Spoken / Written Text</span>
                  </div>
                  <div className="text-[#57534E]">
                    Enables hearing learners to follow a Deaf teacher with seamless real-time captions and glosses.
                  </div>
                </div>
                <div className="p-3 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-xs text-[#44403C] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#8C5E38]">Spoken / Written Text → Educational Meaning → SASL Support</span>
                  </div>
                  <div className="text-[#57534E]">
                    Enables Deaf learners to follow hearing educators with synchronous visual-spatial sign language reinforcement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. TECHNOLOGY WITH A HUMAN PURPOSE */}
        {/* ============================================================== */}
        <section className="bg-[#F5F3ED] border border-[#E7E3DA] rounded-xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              03. Design Philosophy
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917]">
              Technology With a Human Purpose
            </h2>
            <p className="text-base text-[#44403C] leading-relaxed">
              Ali and SignFusion are not isolated technology experiments. They reflect QUALANTRA's single,
              guiding philosophy: technology should strengthen teaching and expand access, never replace human relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#44403C] leading-relaxed">
            <div className="bg-white p-5 rounded-lg border border-[#E7E3DA] space-y-2">
              <div className="font-semibold text-sm text-[#1C1917]">We use technology deliberately</div>
              <p className="text-[#57534E]">
                Not technology for its own sake or Silicon Valley trends. We build features where they genuinely
                make education more accessible, responsive, and accountable.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E7E3DA] space-y-2">
              <div className="font-semibold text-sm text-[#1C1917]">The classroom remains human</div>
              <p className="text-[#57534E]">
                A child does not remember an algorithm; they remember a teacher who believed in their capacity.
                Technology removes bureaucratic friction so that relationship can flourish.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E7E3DA] space-y-2">
              <div className="font-semibold text-sm text-[#1C1917]">Barriers are removed, not shifted</div>
              <p className="text-[#57534E]">
                Whether the obstacle is geographical distance, specialist teacher shortages, or auditory access,
                QUALANTRA dissolves the barrier inside the primary learning environment.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. THE CONTINUOUS LEARNING INTELLIGENCE LOOP */}
        {/* ============================================================== */}
        <section className="space-y-8 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              04. Pedagogical Methodology
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917]">
              The Learning Intelligence Loop
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              QUALANTRA is not a passive one-way pipeline from teacher to learner.
              Our pods operate as a continuous educational cycle where instruction and diagnostic
              feedback continually inform one another.
            </p>
          </div>

          {/* Step by step visual process */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-[11px]">
                1
              </div>
              <div className="font-semibold text-sm text-[#1C1917]">Teach</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                Teacher introduces concept with live visual modeling and direct discussion.
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-[11px]">
                2
              </div>
              <div className="font-semibold text-sm text-[#1C1917]">Practice</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                All ten learners solve targeted problems on their individual work canvases.
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-[11px]">
                3
              </div>
              <div className="font-semibold text-sm text-[#1C1917]">Assess</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                Learner solutions are checked for foundational conceptual validity.
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#8C5E38] text-white flex items-center justify-center font-bold text-[11px]">
                4
              </div>
              <div className="font-semibold text-sm text-[#8C5E38]">Identify Gaps</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                Ali surfaces specific misconceptions without labeling students.
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-[11px]">
                5
              </div>
              <div className="font-semibold text-sm text-[#1C1917]">Intervene</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                Teacher adapts immediate lesson delivery with tailored remediation.
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-2 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-[11px]">
                6
              </div>
              <div className="font-semibold text-sm text-[#1C1917]">Reassess</div>
              <div className="text-[#57534E] text-[11px] leading-normal">
                Mastery is confirmed before advancing to subsequent curriculum modules.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#E7E3DA] rounded-lg text-xs text-[#57534E] leading-relaxed">
            The teacher remains responsible for all educational judgement throughout this loop.
            Ali acts as a co-pilot, alerting the educator to emerging patterns so no learner falls behind unnoticed.
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. GOVERNANCE, SACE VERIFICATION & CURRICULUM STANDARDS */}
        {/* ============================================================== */}
        <section className="space-y-8 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              05. Educational Rigour
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917]">
              Governance and Educational Standards
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              We hold ourselves to rigorous institutional governance. QUALANTRA does not invent arbitrary syllabi;
              our pods exist to reinforce and elevate accredited South African national academic pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base text-[#1C1917]">Mandatory SACE Educator Registration</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Every educator appointed to instruct a QUALANTRA classroom must hold active registration with
                the South African Council for Educators (SACE), complete identity vetting, and demonstrate verified
                subject mastery.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base text-[#1C1917]">Curriculum Alignment (CAPS & Pathways)</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                QUALANTRA is designed to support South African curriculum-aligned learning, including CAPS-aligned
                educational experiences, while supporting relevant examination pathways such as IEB where applicable.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 space-y-3 shadow-2xs">
              <div className="w-8 h-8 rounded-md bg-[#FAF9F5] border border-[#E7E3DA] flex items-center justify-center text-[#8C5E38]">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base text-[#1C1917]">Learner Safety & POPIA Compliance</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                All pod sessions, diagnostic logs, and student communications adhere strictly to the Protection of
                Personal Information Act (POPIA), with encrypted infrastructure, parent-visible logs, and zero public data indexing.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. SOUTH AFRICA'S MULTILINGUAL REALITY */}
        {/* ============================================================== */}
        <section className="space-y-6 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              06. Language Architecture
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917]">
              Designed for South Africa's Multilingual Reality
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              True comprehension happens when challenging scientific and mathematical definitions can be anchored
              in the languages learners speak at home. Our platform architecture is built to support South Africa's
              rich linguistic heritage:
            </p>
          </div>

          <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Supported Languages & Planned Terminological Frameworks:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">English</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">isiZulu</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">isiXhosa</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Afrikaans</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Sepedi</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Sesotho</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Setswana</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">siSwati</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Tshivenda</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">Xitsonga</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E7E3DA] font-medium text-[#1C1917]">isiNdebele</div>
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#8C5E38] font-semibold text-[#8C5E38]">
                South African Sign Language (SASL)
              </div>
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed pt-2">
              Our ongoing terminology work ensures that complex STEM terms are explained accurately without losing academic rigour, allowing students to grasp difficult principles with clarity and confidence.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. WHO QUALANTRA CONNECTS */}
        {/* ============================================================== */}
        <section className="space-y-8 border-b border-[#E7E3DA] pb-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
              07. The Broader Ecosystem
            </div>
            <h2 className="text-3xl font-serif text-[#1C1917]">
              Who QUALANTRA Connects
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              Education thrives when every stakeholder is actively engaged. QUALANTRA links five essential groups:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="bg-white border border-[#E7E3DA] rounded-lg p-5 space-y-2 shadow-2xs">
              <div className="font-semibold text-sm text-[#1C1917]">Learners</div>
              <p className="text-[#57534E] leading-relaxed">
                Access structured live learning, specialized educators, targeted practice, and continuous encouragement.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-5 space-y-2 shadow-2xs">
              <div className="font-semibold text-sm text-[#1C1917]">Teachers</div>
              <p className="text-[#57534E] leading-relaxed">
                Activate qualified young educators into meaningful work, mentor eager students, and earn dignified, flexible compensation without relocation.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-5 space-y-2 shadow-2xs">
              <div className="font-semibold text-sm text-[#1C1917]">Parents</div>
              <p className="text-[#57534E] leading-relaxed">
                Gain transparent visibility into attendance, educator feedback, lesson recordings, and verified progress.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-5 space-y-2 shadow-2xs">
              <div className="font-semibold text-sm text-[#1C1917]">Schools</div>
              <p className="text-[#57534E] leading-relaxed">
                Supplement existing staff rosters with specialized pods in subjects where local vacancies persist.
              </p>
            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-5 space-y-2 shadow-2xs">
              <div className="font-semibold text-sm text-[#1C1917]">Sponsors & Partners</div>
              <p className="text-[#57534E] leading-relaxed">
                Fund high-impact bursaries and pod cohorts with measurable attendance and academic outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 11. THE VISION & CALL TO ACTION */}
        {/* ============================================================== */}
        <section className="bg-white border border-[#E7E3DA] rounded-2xl p-8 sm:p-14 text-center space-y-8 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8C5E38]">
              The QUALANTRA Vision
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] leading-tight">
              We believe access to quality education should not depend on geography, language, hearing ability, or proximity to a specialist teacher.
            </h2>
            <p className="text-base text-[#57534E] leading-relaxed">
              QUALANTRA is building a school where qualified educators can teach, learners can learn,
              technology can assist, and every learner can belong.
            </p>
            <div className="text-xl font-serif font-semibold text-[#1C1917] tracking-wider pt-2">
              Learn. Teach. Connect.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/signup')}
              className="px-6 py-3 bg-[#1C1917] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-black transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Get Started with QUALANTRA
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-[#FAF9F5] text-[#1C1917] border border-[#D6D3CD] text-xs sm:text-sm font-medium rounded-md hover:bg-[#EAE7E0] transition-all cursor-pointer whitespace-nowrap"
              >
                Schedule Institutional Consultation
              </button>
            )}

            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-3 text-xs sm:text-sm font-medium text-[#57534E] hover:text-[#1C1917] underline transition-colors cursor-pointer"
            >
              Explore Live Prototype
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
