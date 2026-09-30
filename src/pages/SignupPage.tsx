import React, { useState } from 'react';
import { registerUser } from '../cognitoSignup';
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
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Common fields
  const [province, setProvince] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Learner-only fields
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PREMIUM'>('FREE');
  const [learnerName, setLearnerName] = useState<string>('');
  const [learnerEmail, setLearnerEmail] = useState<string>('');
  const [learnerPhone, setLearnerPhone] = useState<string>('');
  const [learnerGrade, setLearnerGrade] = useState<string>('');
  const [learnerSubject, setLearnerSubject] = useState<string>('');
  const [learnerLanguage, setLearnerLanguage] = useState<string>('');

  // Parent-only fields
  const [parentName, setParentName] = useState<string>('');
  const [parentEmail, setParentEmail] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  const [childGrade, setChildGrade] = useState<string>('');
  const [parentGoal, setParentGoal] = useState<string>('');

  // Teacher-only fields
  const [teacherName, setTeacherName] = useState<string>('');
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [teacherPhone, setTeacherPhone] = useState<string>('');
  const [saceNumber, setSaceNumber] = useState<string>('');
  const [teacherSubject, setTeacherSubject] = useState<string>('');

  // School-only fields
  const [schoolName, setSchoolName] = useState<string>('');
  const [adminName, setAdminName] = useState<string>('');
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [adminPhone, setAdminPhone] = useState<string>('');
  const [cohortSize, setCohortSize] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    setIsCreatingAccount(true);

    let email = '';
    let name = '';
    let phoneNumber = '';

    if (role === 'learner') {
      email = learnerEmail;
      name = learnerName;
      phoneNumber = learnerPhone;
    }

    if (role === 'parent') {
      email = parentEmail;
      name = parentName;
      phoneNumber = parentPhone;
    }

    if (role === 'teacher') {
      email = teacherEmail;
      name = teacherName;
      phoneNumber = teacherPhone;
    }

    if (role === 'school') {
      email = adminEmail;
      name = adminName;
      phoneNumber = adminPhone;
    }

    try {
      localStorage.setItem('qualantra_role', role);

      await registerUser(email, password, name, phoneNumber);
      setSubmitted(true);
    } catch (error: unknown) {
      console.error('QUALANTRA account creation failed:', error);

      if (error && typeof error === 'object' && 'name' in error) {
        const cognitoError = error as { name?: string };

        if (cognitoError.name === 'UsernameExistsException') {
          setErrorMessage(
            'An account with this email address already exists. Please sign in instead.'
          );
        } else if (cognitoError.name === 'InvalidPasswordException') {
          setErrorMessage(
            'The password does not meet the required security requirements. Please choose a stronger password.'
          );
        } else if (cognitoError.name === 'InvalidParameterException') {
          setErrorMessage(
            'Some of the information provided is not valid. Please check your details and try again.'
          );
        } else {
          setErrorMessage(
            'We could not create your QUALANTRA account. Please check your details and try again.'
          );
        }
      } else {
        setErrorMessage(
          'We could not create your QUALANTRA account. Please check your details and try again.'
        );
      }
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-28 pb-16 px-6 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-[#E7E3DA] rounded-xl p-8 sm:p-10 shadow-sm space-y-6">
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
              'Register as a learner to access QUALANTRA learning services and subject-based classes.'}
            {role === 'parent' &&
              'Register as a parent or guardian to support your learner and access parent services.'}
            {role === 'teacher' &&
              'Apply as an educator to teach learners through QUALANTRA.'}
            {role === 'school' &&
              'Register an institution to explore QUALANTRA learning and sponsorship services.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA]">
            <div className="w-12 h-12 rounded-full bg-white border border-[#D6D3CD] flex items-center justify-center text-[#8C5E38] mx-auto shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            {role === 'learner' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">
                  Learner Account Created
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{learnerName || 'Learner'}</strong>. Your
                  QUALANTRA account has been created. Please check your email
                  for verification instructions before signing in.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/login')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Continue to Sign In
                  </button>
                </div>
              </>
            )}

            {role === 'parent' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">
                  Parent Account Created
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{parentName || 'Parent / Guardian'}</strong>.
                  Your account has been created. Please check your email for
                  verification instructions.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/login')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Continue to Sign In
                  </button>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">
                  Educator Account Created
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{teacherName || 'Educator'}</strong>. Your
                  QUALANTRA educator account has been created. Any required
                  educator verification will be handled through the
                  appropriate process.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/login')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Continue to Sign In
                  </button>
                </div>
              </>
            )}

            {role === 'school' && (
              <>
                <h2 className="font-serif text-xl text-[#1C1917]">
                  Institutional Account Created
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{adminName || 'Administrator'}</strong>.
                  Your institutional account has been created. Please check
                  the administrator email for verification instructions.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/login')}
                    className="px-6 py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Continue to Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                I am applying / registering as:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRole('learner');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'learner'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <GraduationCap
                    className={`w-4 h-4 ${
                      role === 'learner'
                        ? 'text-[#8C5E38]'
                        : 'text-[#78716C]'
                    }`}
                  />
                  <span className="text-xs">Learner</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('parent');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'parent'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <HeartHandshake
                    className={`w-4 h-4 ${
                      role === 'parent'
                        ? 'text-[#8C5E38]'
                        : 'text-[#78716C]'
                    }`}
                  />
                  <span className="text-xs">Parent / Guardian</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('teacher');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'teacher'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <BookOpen
                    className={`w-4 h-4 ${
                      role === 'teacher'
                        ? 'text-[#8C5E38]'
                        : 'text-[#78716C]'
                    }`}
                  />
                  <span className="text-xs">Educator</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('school');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    role === 'school'
                      ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917] ring-1 ring-[#1C1917] shadow-xs'
                      : 'border-[#E7E3DA] text-[#57534E] hover:border-[#A8A29E] bg-white'
                  }`}
                >
                  <Building2
                    className={`w-4 h-4 ${
                      role === 'school'
                        ? 'text-[#8C5E38]'
                        : 'text-[#78716C]'
                    }`}
                  />
                  <span className="text-xs">School / Institution</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#FAF9F5] border border-[#E7E3DA] rounded-md text-[11px] text-[#57534E] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />

              <span>
                {role === 'learner' &&
                  'Register your learner profile and select the subjects and access plan that apply to you.'}
                {role === 'parent' &&
                  'Register as a parent or guardian and provide the learner information required for enrolment.'}
                {role === 'teacher' &&
                  'Apply as an educator and provide your professional registration and teaching information.'}
                {role === 'school' &&
                  'Register an institution and provide the information required to explore institutional participation.'}
              </span>
            </div>

            {/* Learner registration */}
            {role === 'learner' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1.5">
                    Selected Access Plan *
                  </label>

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
                      <div className="font-semibold text-xs text-[#1C1917]">
                        QUALANTRA Free
                      </div>

                      <div className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                        Limited Ali access, selected learning resources, and
                        limited educator engagement.
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
                        Expanded access to QUALANTRA learning and teaching
                        resources.
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Learner Full Legal Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter your full legal name"
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Learner Email Address *
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={learnerEmail}
                    onChange={(e) => setLearnerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Learner WhatsApp / Cell *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="Enter your South African mobile number"
                    value={learnerPhone}
                    onChange={(e) => setLearnerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />

                  <p className="text-[10px] text-[#78716C] mt-1">
                    Use international format, for example +27 followed by
                    your mobile number.
                  </p>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Create Password *
                  </label>

                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />

                  <p className="text-[10px] text-[#78716C] mt-1">
                    Your password must meet QUALANTRA's account security
                    requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Current Grade *
                    </label>

                    <select
                      required
                      value={learnerGrade}
                      onChange={(e) => setLearnerGrade(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option value="">Select your grade</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Province in South Africa *
                    </label>

                    <select
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option value="">Select your province</option>
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
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Primary Subject Interest *
                  </label>

                  <select
                    required
                    value={learnerSubject}
                    onChange={(e) => setLearnerSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option value="">Select a subject</option>
                    <option>Pure Mathematics</option>
                    <option>Physical Sciences</option>
                    <option>Life Sciences</option>
                    <option>Accounting</option>
                    <option>Economics</option>
                    <option>English Home Language</option>
                    <option>Information Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Preferred Language Support *
                  </label>

                  <select
                    required
                    value={learnerLanguage}
                    onChange={(e) => setLearnerLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option value="">Select language support</option>
                    <option>English</option>
                    <option>English & isiZulu</option>
                    <option>English & isiXhosa</option>
                    <option>English & Afrikaans</option>
                    <option>English & Sesotho</option>
                    <option>English & Sepedi</option>
                    <option>English with SASL support</option>
                  </select>
                </div>
              </div>
            )}

            {/* Parent registration */}
            {role === 'parent' && (
              <div className="space-y-4">
                <div className="p-3 bg-[#FAF9F5] border border-[#E7E3DA] rounded-md text-[11px] text-[#57534E]">
                  <strong>Parent / Guardian Registration:</strong> Provide
                  your details and the learner information required for
                  enrolment.
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Parent / Guardian Legal Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter your full legal name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Parent Email Address *
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Parent WhatsApp / Cell *
                    </label>

                    <input
                      type="tel"
                      required
                      placeholder="Enter your South African mobile number"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Create Password *
                  </label>

                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="pt-2 border-t border-[#E7E3DA]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C5E38] mb-3">
                    Child / Learner Details
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-medium text-[#1C1917] mb-1">
                        Child's Full Name *
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="Enter the learner's full name"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-[#1C1917] mb-1">
                          Child's Current Grade *
                        </label>

                        <select
                          required
                          value={childGrade}
                          onChange={(e) => setChildGrade(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                        >
                          <option value="">Select grade</option>
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-[#1C1917] mb-1">
                          Province in South Africa *
                        </label>

                        <select
                          required
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                        >
                          <option value="">Select province</option>
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
                      <label className="block font-medium text-[#1C1917] mb-1">
                        Primary Academic Goal
                      </label>

                      <select
                        value={parentGoal}
                        onChange={(e) => setParentGoal(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                      >
                        <option value="">Select an academic goal</option>
                        <option>Matric examination preparation</option>
                        <option>Subject mastery</option>
                        <option>Homework and revision support</option>
                        <option>Learning gap support</option>
                        <option>General academic support</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Educator application */}
            {role === 'teacher' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Educator Full Legal Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter your full legal name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Educator Email Address *
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Educator WhatsApp / Cell *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="Enter your South African mobile number"
                    value={teacherPhone}
                    onChange={(e) => setTeacherPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Create Password *
                  </label>

                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      SACE Registration Number *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Enter your SACE registration number"
                      value={saceNumber}
                      onChange={(e) => setSaceNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Province in South Africa *
                    </label>

                    <select
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option value="">Select your province</option>
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
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Primary Subject Specialization *
                  </label>

                  <select
                    required
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  >
                    <option value="">Select a subject</option>
                    <option>Physical Sciences</option>
                    <option>Pure Mathematics</option>
                    <option>Life Sciences</option>
                    <option>Accounting</option>
                    <option>Economics</option>
                    <option>English Home Language</option>
                    <option>Information Technology</option>
                  </select>
                </div>
              </div>
            )}

            {/* School / institution registration */}
            {role === 'school' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Institution or School Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter your institution or school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Administrator Full Name *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Enter administrator's full name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Institutional Email *
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="Enter your institutional email address"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Administrator WhatsApp / Cell *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="Enter your South African mobile number"
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1C1917] mb-1">
                    Create Password *
                  </label>

                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Intended Learner Capacity *
                    </label>

                    <select
                      required
                      value={cohortSize}
                      onChange={(e) => setCohortSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option value="">Select capacity</option>
                      <option>Up to 20 learners</option>
                      <option>21–40 learners</option>
                      <option>41–100 learners</option>
                      <option>101–250 learners</option>
                      <option>More than 250 learners</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#1C1917] mb-1">
                      Province in South Africa *
                    </label>

                    <select
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                    >
                      <option value="">Select your province</option>
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
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-[11px] text-red-800">
                {errorMessage}
              </div>
            )}

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#78716C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />

              <span>
                QUALANTRA is designed to handle user information with
                appropriate privacy, security, and professional verification
                processes.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isCreatingAccount}
                className="w-full py-3 bg-[#1C1917] text-white font-semibold rounded-md hover:bg-black transition-colors cursor-pointer text-center shadow-xs text-xs sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCreatingAccount
                  ? 'Creating Your QUALANTRA Account...'
                  : role === 'learner'
                    ? 'Create Learner Account'
                    : role === 'parent'
                      ? 'Register as Parent & Enrol Learner'
                      : role === 'teacher'
                        ? 'Create Educator Account'
                        : 'Create Institutional Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};