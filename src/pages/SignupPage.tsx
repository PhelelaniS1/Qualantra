import React, { useState } from 'react';
import { AppRoute } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Building2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { QualantraLogo } from '../components/common/QualantraLogo';

interface SignupPageProps {
  onNavigate: (route: AppRoute) => void;
}

type RegistrationRole = 'learner' | 'parent' | 'teacher' | 'school';

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<RegistrationRole>('learner');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Common fields
  const [province, setProvince] = useState<string>('Gauteng');

  // Learner-only fields
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PREMIUM'>('FREE');
  const [learnerName, setLearnerName] = useState<string>('');
  const [learnerEmail, setLearnerEmail] = useState<string>('');
  const [learnerGrade, setLearnerGrade] = useState<string>('Grade 11');
  const [learnerSubject, setLearnerSubject] = useState<string>('Pure Mathematics & Physical Sciences');
  const [learnerLanguage, setLearnerLanguage] = useState<string>('English & isiZulu');

  // Parent-only fields
  const [parentName, setParentName] = useState<string>('');
  const [parentEmail, setParentEmail] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  const [childGrade, setChildGrade] = useState<string>('Grade 11');
  const [parentGoal, setParentGoal] = useState<string>('Matric Exam Preparation & Core Subject Mastery');

  // Teacher-only fields
  const [teacherName, setTeacherName] = useState<string>('');
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [saceNumber, setSaceNumber] = useState<string>('');
  const [teacherSubject, setTeacherSubject] = useState<string>('Physical Sciences');

  // School-only fields
  const [schoolName, setSchoolName] = useState<string>('');
  const [adminName, setAdminName] = useState<string>('');
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [cohortSize, setCohortSize] = useState<string>('40 Learners (4 Pods)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-28 pb-16 px-6 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-[#E7E3DA] rounded-xl p-8 sm:p-10 shadow-sm space-y-6">
        {/* Header navigation & title */}
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA</span>
          </button>
          <div className="mb-4">
            <QualantraLogo size="sm" variant="full" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mb-1.5">
            {role === 'learner' && 'Learner Application & Enrolment'}
            {role === 'parent' && 'Parent / Guardian Registration'}
            {role === 'teacher' && 'Educator Teaching Application'}
            {role === 'school' && 'School & Institutional Enrolment'}
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E]">
            {role === 'learner' &&
              'Register as an independent student to be placed into focused 1 teacher, 10 learners online subject pods.'}
            {role === 'parent' &&
              'Register as a parent or guardian to enrol your child, track live pod attendance, and view weekly educator diagnostics.'}
            {role === 'teacher' &&
              'Apply as a SACE-qualified educator to instruct small 1 teacher, 10 learners cohorts with fair compensation.'}
            {role === 'school' &&
              'Partner with QUALANTRA to bring focused 1 teacher, 10 learners pods to your school or bursary cohort.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA]">
            <div className="w-12 h-12 rounded-full bg-white border border-[#D6D3CD] flex items-center justify-center text-[#8C5E38] mx-auto shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            {role === 'learner' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">Learner Profile Registered</h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{learnerName || 'Learner'}</strong>. Your application has been registered for{' '}
                  <strong>{learnerGrade}</strong> in {province}. You will be paired with an accredited educator in your
                  1 teacher, 10 learners pod.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/learner')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Proceed to Learner Desk
                  </button>
                </div>
              </>
            )}

            {role === 'parent' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">Parent Account Created</h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{parentName || 'Parent'}</strong>. Your guardian account has been created. Your child,{' '}
                  <strong>{childName || 'your learner'}</strong> ({childGrade}), has been registered for pod placement. You
                  will receive attendance updates and educator reports via WhatsApp/Email.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/parent')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Proceed to Parent Portal
                  </button>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">Educator Application Received</h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{teacherName || 'Educator'}</strong>. Your SACE registration details have been received
                  for <strong>{teacherSubject}</strong> pods. Our academic vetting committee will review your credentials
                  within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/teacher')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Proceed to Educator Workspace
                  </button>
                </div>
              </>
            )}

            {role === 'school' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">Institutional Inquiry Submitted</h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{adminName || 'Administrator'}</strong> from <strong>{schoolName || 'Institution'}</strong>.
                  Our school partnerships director will contact you regarding pod scheduling for {cohortSize}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/admin')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Proceed to Administration Portal
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* 
              Clear Separation between Learner and Parent:
              Separate dedicated selection buttons
            */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                I am applying / registering as:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. LEARNER ONLY */}
                <button
                  type="button"
                  onClick={() => setRole('learner')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'learner'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${role === 'learner' ? 'text-[#8C5E38]' : 'text-[#78716C]'}`} />
                  <span className="text-xs">Learner Only</span>
                </button>

                {/* 2. PARENT ONLY */}
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'parent'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <HeartHandshake className={`w-4 h-4 ${role === 'parent' ? 'text-[#8C5E38]' : 'text-[#78716C]'}`} />
                  <span className="text-xs">Parent Only</span>
                </button>

                {/* 3. EDUCATOR */}
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'teacher'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${role === 'teacher' ? 'text-[#8C5E38]' : 'text-[#78716C]'}`} />
                  <span className="text-xs">Educator</span>
                </button>

                {/* 4. SCHOOL / SPONSOR */}
                <button
                  type="button"
                  onClick={() => setRole('school')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'school'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${role === 'school' ? 'text-[#8C5E38]' : 'text-[#78716C]'}`} />
                  <span className="text-xs">School / Sponsor</span>
                </button>
              </div>
            </div>

            {/* Role-Specific Context Banner */}
            <div className="p-3 bg-[#FAF9F5] border border-[#E7E3DA] rounded-md text-[11px] text-[#57534E] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
              <span>
                {role === 'learner' && 'You are registering directly as a student. All pod assignments and quizzes will belong to your personal learner account.'}
                {role === 'parent' && 'You are registering as a parent/guardian. You will be able to enroll your children, view educator diagnostics, and track attendance.'}
                {role === 'teacher' && 'You are applying as an educator. You will instruct capped 1 teacher, 10 learners pods and receive competitive compensation.'}
                {role === 'school' && 'You are registering as an institution. Manage multiple 1 teacher, 10 learners cohorts across grades and subjects.'}
              </span>
            </div>

            {/* ============================================================== */}
            {/* 1. LEARNER ONLY REGISTRATION FORM */}
            {/* ============================================================== */}
            {role === 'learner' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1.5">Selected Access Plan *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('FREE')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedPlan === 'FREE'
                          ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                          : 'border-[#E7E3DA] bg-white hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#1C1917]">QUALANTRA Free</div>
                      <div className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                        Limited Ali, 1 Tutor, 1 Teacher Engagement/week, Core Study Material
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('PREMIUM')}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedPlan === 'PREMIUM'
                          ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                          : 'border-[#E7E3DA] bg-white hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#1C1917] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#8C5E38]" />
                        <span>QUALANTRA Premium</span>
                      </div>
                      <div className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                        Expanded Ali, Expanded Teacher Engagement, Full Resource Ecosystem
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Learner Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam van der Merwe"
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Learner Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="liam.student@school.za"
                    value={learnerEmail}
                    onChange={(e) => setLearnerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Current Grade *</label>
                    <select
                      value={learnerGrade}
                      onChange={(e) => setLearnerGrade(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12 (Matric NSC/IEB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Province in South Africa *</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option>Gauteng</option>
                      <option>Western Cape</option>
                      <option>KwaZulu-Natal</option>
                      <option>Eastern Cape</option>
                      <option>Free State</option>
                      <option>Limpopo</option>
                      <option>Mpumalanga</option>
                      <option>North West</option>
                      <option>Northern Cape</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Primary Subject Pod Required *</label>
                  <select
                    value={learnerSubject}
                    onChange={(e) => setLearnerSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option>Pure Mathematics & Physical Sciences</option>
                    <option>Pure Mathematics Only (CAPS / IEB)</option>
                    <option>Physical Sciences Only</option>
                    <option>Life Sciences & English HL</option>
                    <option>Accounting & Economics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Preferred Language Support *</label>
                  <select
                    value={learnerLanguage}
                    onChange={(e) => setLearnerLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option>English & isiZulu</option>
                    <option>English & isiXhosa</option>
                    <option>English & Afrikaans</option>
                    <option>English & Sesotho</option>
                    <option>English & Sepedi</option>
                    <option>English with SASL (Sign Language)</option>
                  </select>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. PARENT ONLY REGISTRATION FORM */}
            {/* ============================================================== */}
            {role === 'parent' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-md text-[11px] text-amber-900">
                  <strong>Parent Enrolment:</strong> You will have a dedicated parent portal to monitor your child's 1 teacher, 10 learners pod attendance, teacher notes, and exam readiness.
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Parent / Guardian Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pieter van der Merwe"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Parent Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="pieter.vdm@domain.co.za"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Parent WhatsApp / Cell *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 (0)82 555 0192"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E7E3DA]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
                    Child / Learner Details to Enrol:
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-medium text-[#1C1917] mb-1">Child's Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Liam van der Merwe"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-[#1C1917] mb-1">Child's Current Grade *</label>
                        <select
                          value={childGrade}
                          onChange={(e) => setChildGrade(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                        >
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12 (Matric NSC/IEB)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-[#1C1917] mb-1">Province in South Africa *</label>
                        <select
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                        >
                          <option>Gauteng</option>
                          <option>Western Cape</option>
                          <option>KwaZulu-Natal</option>
                          <option>Eastern Cape</option>
                          <option>Free State</option>
                          <option>Limpopo</option>
                          <option>Mpumalanga</option>
                          <option>North West</option>
                          <option>Northern Cape</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-[#1C1917] mb-1">Primary Academic Goal for Child *</label>
                      <select
                        value={parentGoal}
                        onChange={(e) => setParentGoal(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                      >
                        <option>Matric Exam Preparation & Core Subject Mastery</option>
                        <option>Remedial Pure Mathematics & Science Confidence</option>
                        <option>Daily Structured Homework & Revision Pods</option>
                        <option>IEB Advanced Programme Mathematics Extension</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. EDUCATOR APPLICATION FORM */}
            {/* ============================================================== */}
            {role === 'teacher' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Educator Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ms. Thandeka Dlamini"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Educator Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="t.dlamini@domain.co.za"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">SACE Registration Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10948291"
                      value={saceNumber}
                      onChange={(e) => setSaceNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Province in South Africa *</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option>Gauteng</option>
                      <option>Western Cape</option>
                      <option>KwaZulu-Natal</option>
                      <option>Eastern Cape</option>
                      <option>Free State</option>
                      <option>Limpopo</option>
                      <option>Mpumalanga</option>
                      <option>North West</option>
                      <option>Northern Cape</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Primary Subject Specialization *</label>
                  <select
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option>Physical Sciences (Grades 10–12)</option>
                    <option>Pure Mathematics (Grades 10–12)</option>
                    <option>Life Sciences (Grades 10–12)</option>
                    <option>Accounting (Grades 10–12)</option>
                    <option>English Home Language</option>
                  </select>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. SCHOOL / SPONSOR REGISTRATION FORM */}
            {/* ============================================================== */}
            {role === 'school' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">Institution or School Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cape Academic High School"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Administrator Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. H. Khumalo"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Institutional Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@capeacademic.org.za"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Cohort Size *</label>
                    <select
                      value={cohortSize}
                      onChange={(e) => setCohortSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option>20 Learners (2 Pods)</option>
                      <option>40 Learners (4 Pods)</option>
                      <option>100 Learners (10 Pods)</option>
                      <option>250+ Learners (Full Grade Enrolment)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">Province in South Africa *</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option>Western Cape</option>
                      <option>Gauteng</option>
                      <option>KwaZulu-Natal</option>
                      <option>Eastern Cape</option>
                      <option>Free State</option>
                      <option>Limpopo</option>
                      <option>Mpumalanga</option>
                      <option>North West</option>
                      <option>Northern Cape</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SACE & POPIA compliance guarantee */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#78716C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
              <span>Complies with South African POPIA privacy regulations and SACE teaching guidelines.</span>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1C1917] text-white font-semibold rounded-md hover:bg-black transition-colors cursor-pointer text-center shadow-xs text-xs sm:text-sm"
              >
                {role === 'learner' && 'Complete Learner Application'}
                {role === 'parent' && 'Register as Parent & Enrol Child'}
                {role === 'teacher' && 'Submit Educator Application'}
                {role === 'school' && 'Submit Institutional Enrolment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
