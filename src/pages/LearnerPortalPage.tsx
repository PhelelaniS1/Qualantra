import React, { useState } from 'react';
import { AppRoute, LearnerPlan, LearningResourceItem } from '../types';
import {
  MOCK_LEARNER_SCHEDULE,
  MOCK_LEARNER_PROFILE,
} from '../data/mockPortalData';
import { SA_LANGUAGES } from '../data/languagesData';
import {
  Clock,
  BookOpen,
  User,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Sparkles,
  Users,
  HeartHandshake,
  FileText,
  Check,
  X,
  Lock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import {
  PLAN_ENTITLEMENTS,
  SAMPLE_LEARNING_RESOURCES,
  canAccessResource,
} from '../data/planEntitlements';

interface LearnerPortalPageProps {
  onNavigate: (route: AppRoute) => void;
}

interface AliMessage {
  role: 'learner' | 'ali';
  text: string;
  time: string;
}

const API_BASE_URL =
  'https://p58dcvfap5.execute-api.us-west-2.amazonaws.com/prod';

export const LearnerPortalPage: React.FC<LearnerPortalPageProps> = ({
  onNavigate,
}) => {
  // ---------------------------------------------------------
  // Plan state
  // ---------------------------------------------------------
  const [currentPlan, setCurrentPlan] =
    useState<LearnerPlan>('FREE');

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>('en');

  const [activeTab, setActiveTab] = useState<
    'overview' | 'resources' | 'ali' | 'engagement'
  >('overview');

  // ---------------------------------------------------------
  // Resource viewer state
  // ---------------------------------------------------------
  const [selectedResource, setSelectedResource] =
    useState<LearningResourceItem | null>(null);

  const [showUpgradeModal, setShowUpgradeModal] =
    useState<boolean>(false);

  const [upgradeTriggerReason, setUpgradeTriggerReason] =
    useState<string>('');

  // ---------------------------------------------------------
  // Ali state
  // ---------------------------------------------------------
  const [aliQueryInput, setAliQueryInput] =
    useState<string>('');

  const [aliLoading, setAliLoading] =
    useState<boolean>(false);

  const [aliConversation, setAliConversation] =
    useState<AliMessage[]>([
      {
        role: 'learner',
        text:
          'Ali, what is the key difference between an elastic collision and an inelastic collision?',
        time: '10:14',
      },
      {
        role: 'ali',
        text:
          'In an elastic collision, total kinetic energy is conserved. In an inelastic collision, some kinetic energy is converted into other forms, such as internal heat or deformation, while linear momentum is conserved in both.',
        time: '10:14',
      },
    ]);

  // ---------------------------------------------------------
  // Practice completion state
  // ---------------------------------------------------------
  const [practiceCompleted, setPracticeCompleted] =
    useState<boolean>(false);

  // ---------------------------------------------------------
  // Teacher engagement state
  // ---------------------------------------------------------
  const [bookingSuccess, setBookingSuccess] =
    useState<boolean>(false);

  // ---------------------------------------------------------
  // Plan configuration
  // ---------------------------------------------------------
  const entitlements = PLAN_ENTITLEMENTS[currentPlan];
  const isPremium = currentPlan === 'PREMIUM';

  // ---------------------------------------------------------
  // Resource handler
  // ---------------------------------------------------------
  const handleResourceClick = (
    resource: LearningResourceItem
  ) => {
    if (canAccessResource(currentPlan, resource)) {
      setSelectedResource(resource);
    } else {
      setUpgradeTriggerReason(resource.title);
      setShowUpgradeModal(true);
    }
  };

  // ---------------------------------------------------------
  // Get Cognito access token
  //
  // The frontend stores the Cognito token after login.
  // We check the common Cognito storage locations.
  // ---------------------------------------------------------
  const getCognitoToken = (): string | null => {
    const keys = Object.keys(localStorage);

    const cognitoKey = keys.find(
      (key) =>
        key.includes('accessToken') ||
        key.includes('access_token')
    );

    if (cognitoKey) {
      const token = localStorage.getItem(cognitoKey);

      if (token) {
        return token;
      }
    }

    // Also check sessionStorage.
    const sessionKeys = Object.keys(sessionStorage);

    const sessionCognitoKey = sessionKeys.find(
      (key) =>
        key.includes('accessToken') ||
        key.includes('access_token')
    );

    if (sessionCognitoKey) {
      const token = sessionStorage.getItem(sessionCognitoKey);

      if (token) {
        return token;
      }
    }

    return null;
  };

  // ---------------------------------------------------------
  // Send question to real Ali backend
  // ---------------------------------------------------------
  const handleSendAliMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const userMsg = aliQueryInput.trim();

    if (!userMsg || aliLoading) {
      return;
    }

    setAliQueryInput('');

    const learnerMessage: AliMessage = {
      role: 'learner',
      text: userMsg,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setAliConversation((previous) => [
      ...previous,
      learnerMessage,
    ]);

    setAliLoading(true);

    try {
      // -------------------------------------------------------
      // Get authenticated Cognito access token
      // -------------------------------------------------------
      const token = getCognitoToken();

      if (!token) {
        throw new Error(
          'Your sign-in session could not be found. Please sign in again.'
        );
      }

      // -------------------------------------------------------
      // Call AWS API Gateway
      // -------------------------------------------------------
      const response = await fetch(
        `${API_BASE_URL}/ali`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: userMsg,
          }),
        }
      );

      // -------------------------------------------------------
      // Parse API response
      // -------------------------------------------------------
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Ali was unable to process the request.'
        );
      }

      // -------------------------------------------------------
      // Add real Ali response to conversation
      // -------------------------------------------------------
      const aliReply: AliMessage = {
        role: 'ali',
        text:
          data?.message ||
          'Ali did not return a response.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setAliConversation((previous) => [
        ...previous,
        aliReply,
      ]);
    } catch (error) {
      console.error('Ali request failed:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong while contacting Ali.';

      const aliErrorMessage: AliMessage = {
        role: 'ali',
        text: `I could not process that request right now.\n\n${errorMessage}`,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setAliConversation((previous) => [
        ...previous,
        aliErrorMessage,
      ]);
    } finally {
      setAliLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ===================================================== */}
        {/* NAVIGATION & PLAN SWITCHER                           */}
        {/* ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DA] pb-4">

          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>

          <div className="flex items-center gap-2 bg-[#F5F3ED] border border-[#E7E3DA] p-1 rounded-lg">

            <span className="text-[11px] font-medium text-[#78716C] px-2 hidden md:inline">
              Prototype Plan View:
            </span>

            <button
              onClick={() => setCurrentPlan('FREE')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                currentPlan === 'FREE'
                  ? 'bg-white text-[#1C1917] shadow-2xs border border-[#D6D3CD]'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              QUALANTRA Free
            </button>

            <button
              onClick={() => setCurrentPlan('PREMIUM')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPlan === 'PREMIUM'
                  ? 'bg-[#1C1917] text-white shadow-2xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#E7A868]" />
              <span>QUALANTRA Premium</span>
            </button>

          </div>
        </div>

        {/* ===================================================== */}
        {/* LEARNER PROFILE                                      */}
        {/* ===================================================== */}

        <div className="bg-white border border-[#E7E3DA] rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">

          <div className="flex items-start sm:items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center font-serif text-xl font-bold text-[#1C1917] shrink-0">
              LM
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2 mb-1">

                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
                  Learner Workspace
                </span>

                <span className="text-[#D6D3CD]">·</span>

                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                    isPremium
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-[#F5F3ED] text-[#1C1917] border-[#D6D3CD]'
                  }`}
                >
                  {entitlements.name}
                </span>

              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {MOCK_LEARNER_PROFILE.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
                <span>{MOCK_LEARNER_PROFILE.grade}</span>
                <span aria-hidden="true">·</span>
                <span>{MOCK_LEARNER_PROFILE.schoolRegion}</span>
                <span aria-hidden="true">·</span>
                <span>
                  CAPS Physical Sciences & Mathematics Cohort
                </span>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 text-xs bg-[#FAF9F5] border border-[#E7E3DA] px-3 py-1.5 rounded-lg">

              <Globe className="w-4 h-4 text-[#8C5E38]" />

              <span className="text-[#57534E]">
                Bilingual:
              </span>

              <select
                value={selectedLanguage}
                onChange={(e) =>
                  setSelectedLanguage(e.target.value)
                }
                className="bg-transparent text-[#1C1917] font-medium focus:outline-hidden cursor-pointer"
              >
                {SA_LANGUAGES.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                  >
                    {lang.name}
                  </option>
                ))}
              </select>

            </div>

            {!isPremium ? (
              <button
                onClick={() => {
                  setUpgradeTriggerReason(
                    'QUALANTRA Premium Experience'
                  );
                  setShowUpgradeModal(true);
                }}
                className="px-3.5 py-1.5 bg-[#FAF9F5] hover:bg-[#F5F3ED] border border-[#D6D3CD] text-[#1C1917] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
                <span>Explore Premium</span>
              </button>
            ) : (
              <div className="px-3 py-1.5 bg-[#F5F3ED] border border-[#E7E3DA] text-[#8C5E38] text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full Access Active</span>
              </div>
            )}

          </div>
        </div>

        {/* ===================================================== */}
        {/* PLAN STATUS                                          */}
        {/* ===================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Ali Assistant</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {entitlements.ali.label}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              {isPremium
                ? 'Expanded deep queries'
                : 'Daily study queries'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Tutor</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {entitlements.tutor.label}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              {entitlements.tutor.assignedTutorName.split('&')[0]}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Teacher Engagement</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {isPremium
                ? 'Expanded access'
                : '1 remaining this week'}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              Direct qualified educator
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Resources</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {isPremium
                ? 'Full access'
                : 'Curated core access'}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              {isPremium
                ? 'Full curriculum library'
                : 'Selected core library'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Study Material</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {isPremium
                ? 'Expanded access'
                : 'Available'}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              {isPremium
                ? 'Comprehensive notes'
                : 'Core CAPS definitions'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>SignFusion</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              Included
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              SASL visual language
            </div>
          </div>

        </div>

        {/* ===================================================== */}
        {/* TABS                                                  */}
        {/* ===================================================== */}

        <div className="flex items-center gap-1 p-1 bg-[#F5F3ED] rounded-lg border border-[#E7E3DA] overflow-x-auto">

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Today's Schedule & Pod
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Learning Resources & Material
          </button>

          <button
            onClick={() => setActiveTab('ali')}
            className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ali'
                ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
            <span>Ali Teaching Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('engagement')}
            className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'engagement'
                ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Teacher Engagement & Tutor
          </button>

        </div>

        {/* ===================================================== */}
        {/* TAB 1 — OVERVIEW                                      */}
        {/* ===================================================== */}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-7 space-y-6">

              <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">

                <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                  <div className="font-semibold text-sm text-[#1C1917]">
                    Today’s Synchronous Classes (Pod Alpha)
                  </div>

                  <div className="text-xs text-[#78716C]">
                    Term 3 · Week 6
                  </div>

                </div>

                <div className="space-y-3">

                  {MOCK_LEARNER_SCHEDULE.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          item.status === 'Live Now'
                            ? 'border-[#1C1917] bg-[#FAF9F5] ring-1 ring-[#1C1917]'
                            : 'border-[#E7E3DA] bg-white'
                        }`}
                      >

                        <div className="space-y-1">

                          <div className="font-mono text-xs text-[#78716C]">
                            {item.time}
                          </div>

                          <div className="font-semibold text-sm text-[#1C1917]">
                            {item.subject}
                          </div>

                          <div className="text-xs text-[#57534E]">
                            {item.topic}
                          </div>

                          <div className="text-xs text-[#78716C] flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.educator}
                          </div>

                        </div>

                        <div>

                          {item.status === 'Live Now' ? (
                            <button
                              onClick={() => {
                                const el =
                                  document.getElementById(
                                    'classroom'
                                  );

                                if (el) {
                                  el.scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                } else {
                                  onNavigate('/');
                                }
                              }}
                              className="px-3.5 py-1.5 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                            >
                              Join Live Classroom (10 / 10)
                            </button>
                          ) : item.status === 'Completed' ? (
                            <span className="text-xs text-[#57534E] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E38]" />
                              Notes Synced
                            </span>
                          ) : (
                            <span className="text-xs text-[#78716C] px-2.5 py-1 border border-[#E7E3DA] rounded">
                              Scheduled
                            </span>
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">

                <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                  Current Subject Registrations (Grade 11)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

                  {MOCK_LEARNER_PROFILE.subjects.map(
                    (s, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded border border-[#E7E3DA] bg-[#FAF9F5]"
                      >
                        <div className="font-semibold text-[#1C1917]">
                          {s.name}
                        </div>

                        <div className="text-[#57534E] mt-0.5">
                          {s.educator}
                        </div>

                        <div className="text-[11px] text-[#8C5E38] font-mono mt-1">
                          {s.status}
                        </div>
                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

            <div className="lg:col-span-5 space-y-6">

              <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">

                <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                  <div className="font-semibold text-sm text-[#1C1917]">
                    Teacher Diagnostic Gaps
                  </div>

                  <span className="text-xs text-[#8C5E38] font-medium">
                    Assigned by Educator
                  </span>

                </div>

                <div className="space-y-4 text-xs">

                  {MOCK_LEARNER_PROFILE.supportGaps.map(
                    (gap, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded border border-[#E7E3DA] bg-[#FAF9F5] space-y-2"
                      >

                        <div className="flex items-center justify-between">

                          <span className="font-semibold text-[#1C1917]">
                            {gap.topic}
                          </span>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#D6D3CD] text-[#8C5E38]">
                            {gap.status}
                          </span>

                        </div>

                        <p className="text-[#57534E] leading-relaxed">
                          {gap.note}
                        </p>

                      </div>
                    )
                  )}

                </div>

                <div className="mt-4 p-4 rounded-lg bg-[#FAF9F5] border border-[#1C1917] space-y-3 text-xs">

                  <div className="font-semibold text-[#1C1917] flex items-center justify-between">

                    <span>
                      Interactive Practice Drill #1
                    </span>

                    <span className="font-mono text-[#78716C]">
                      Time: 5 min
                    </span>

                  </div>

                  <p className="text-[#44403C]">
                    "Calculate the rebound velocity of a
                    0.5 kg ball moving at 6 m/s East after
                    impacting a rigid wall with an impulse
                    of 5 N·s West."
                  </p>

                  {practiceCompleted ? (
                    <div className="p-3 bg-white rounded border border-[#8C5E38]/40 text-xs text-[#1C1917] flex items-center gap-2">

                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />

                      <span>
                        Correct. Solution: v_final = -4 m/s
                        (4 m/s West). Verified by Ali.
                      </span>

                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setPracticeCompleted(true)
                      }
                      className="w-full py-2 bg-[#1C1917] text-white rounded font-medium hover:bg-black transition-colors cursor-pointer text-center"
                    >
                      Submit Worked Answer for Verification
                    </button>
                  )}

                </div>

              </div>

              {!isPremium && (
                <div className="p-5 rounded-lg bg-[#F5F3ED] border border-[#E7E3DA] space-y-2 text-xs">

                  <div className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#8C5E38]" />
                    <span>Need more teacher support?</span>
                  </div>

                  <p className="text-[#57534E] leading-relaxed">
                    QUALANTRA Premium provides expanded
                    teacher engagement, additional
                    diagnostic practice, and in-depth
                    exam preparation materials.
                  </p>

                  <button
                    onClick={() => {
                      setUpgradeTriggerReason(
                        'Expanded Teacher Support'
                      );
                      setShowUpgradeModal(true);
                    }}
                    className="text-xs font-semibold text-[#8C5E38] hover:text-[#1C1917] transition-colors cursor-pointer inline-flex items-center gap-1 pt-1"
                  >
                    <span>
                      Learn about expanded access
                    </span>

                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* TAB 2 — RESOURCES                                    */}
        {/* ===================================================== */}

        {activeTab === 'resources' && (
          <div className="space-y-6">

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-4 shadow-2xs">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DA] pb-4">

                <div>

                  <h3 className="font-serif text-xl text-[#1C1917]">
                    Curriculum Learning Resources
                  </h3>

                  <p className="text-xs text-[#57534E] mt-0.5">
                    {isPremium
                      ? 'Full Resource Ecosystem: 140 curriculum-aligned resources available'
                      : 'Curated Core Library: 18 essential study resources available on QUALANTRA Free'}
                  </p>

                </div>

                <div className="flex items-center gap-2 text-xs">

                  <span className="text-[#78716C]">
                    Current Plan Access:
                  </span>

                  <span className="font-semibold text-[#1C1917] px-2.5 py-1 rounded bg-[#F5F3ED] border border-[#E7E3DA]">
                    {entitlements.resources.label}
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

                {SAMPLE_LEARNING_RESOURCES.map(
                  (resource) => {
                    const hasAccess =
                      canAccessResource(
                        currentPlan,
                        resource
                      );

                    return (
                      <div
                        key={resource.id}
                        onClick={() =>
                          handleResourceClick(resource)
                        }
                        className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          hasAccess
                            ? 'border-[#E7E3DA] bg-white hover:border-[#1C1917] hover:shadow-2xs'
                            : 'border-[#E7E3DA] bg-[#FAF9F5] hover:border-[#A8A29E]'
                        }`}
                      >

                        <div className="space-y-2">

                          <div className="flex items-center justify-between">

                            <span className="text-[11px] font-semibold text-[#8C5E38] uppercase tracking-wide">
                              {resource.subject} ·{' '}
                              {resource.grade}
                            </span>

                            {resource.planRequired ===
                            'PREMIUM' ? (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1C1917] text-white flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5 text-[#E7A868]" />
                                <span>Premium</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EAE7E0] text-[#1C1917]">
                                Core Free
                              </span>
                            )}

                          </div>

                          <h4 className="font-serif text-base text-[#1C1917] leading-snug">
                            {resource.title}
                          </h4>

                          <p className="text-xs text-[#57534E] leading-relaxed">
                            {resource.description}
                          </p>

                        </div>

                        <div className="pt-3 border-t border-[#E7E3DA] flex items-center justify-between text-[11px] text-[#78716C]">

                          <span>
                            {resource.format} ·{' '}
                            {resource.readTime}
                          </span>

                          <span className="font-medium text-[#1C1917] inline-flex items-center gap-1">
                            {hasAccess
                              ? 'Open Material'
                              : 'Requires Premium'}

                            <ChevronRight className="w-3 h-3" />
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {!isPremium && (
                <div className="mt-6 p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#57534E]">

                  <div>
                    <strong className="text-[#1C1917]">
                      Explore more learning resources:{' '}
                    </strong>
                    QUALANTRA Premium opens the broader
                    resource library, step-by-step exam
                    archives, and interactive diagnostic
                    drills.
                  </div>

                  <button
                    onClick={() => {
                      setUpgradeTriggerReason(
                        'Broader Resource Library'
                      );
                      setShowUpgradeModal(true);
                    }}
                    className="px-3.5 py-1.5 bg-[#1C1917] text-white rounded text-xs font-semibold hover:bg-black transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    View Premium Access
                  </button>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* TAB 3 — REAL ALI                                     */}
        {/* ===================================================== */}

        {activeTab === 'ali' && (
          <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DA] pb-4">

              <div>

                <div className="flex items-center gap-2">

                  <div className="w-6 h-6 rounded bg-[#1C1917] flex items-center justify-center text-white text-xs font-bold font-serif">
                    A
                  </div>

                  <h3 className="font-serif text-xl text-[#1C1917]">
                    Ali: Teaching and Learning Assistant
                  </h3>

                </div>

                <p className="text-xs text-[#57534E] mt-1">
                  Ali supports the teacher and learner.
                  Ali does not replace the teacher.
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs">

                <span className="text-[#78716C]">
                  Ali Access Level:
                </span>

                <span
                  className={`font-semibold px-2.5 py-1 rounded border ${
                    isPremium
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-[#F5F3ED] text-[#1C1917] border-[#D6D3CD]'
                  }`}
                >
                  {entitlements.ali.label}
                </span>

              </div>

            </div>

            <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] text-xs text-[#57534E] flex items-center justify-between">

              <div>
                <strong className="text-[#1C1917]">
                  Usage Status:{' '}
                </strong>
                {entitlements.ali.usageNote}
              </div>

              <span className="text-[11px] font-mono text-[#8C5E38]">
                {isPremium
                  ? 'Expanded Capacity'
                  : 'Standard Daily Allowance'}
              </span>

            </div>

            {/* Conversation Window */}

            <div className="border border-[#E7E3DA] rounded-lg bg-[#FAF9F5] p-4 space-y-4 max-h-[360px] overflow-y-auto text-xs">

              {aliConversation.map((msg, idx) => (

                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === 'learner'
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >

                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#78716C]">

                    <span>
                      {msg.role === 'learner'
                        ? 'You (Learner)'
                        : 'Ali Assistant'}
                    </span>

                    <span>·</span>

                    <span>{msg.time}</span>

                  </div>

                  <div
                    className={`p-3.5 rounded-lg max-w-xl leading-relaxed whitespace-pre-line ${
                      msg.role === 'learner'
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white border border-[#E7E3DA] text-[#1C1917] shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              ))}

              {aliLoading && (
                <div className="flex flex-col items-start">

                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#78716C]">
                    <span>Ali Assistant</span>
                    <span>·</span>
                    <span>Now</span>
                  </div>

                  <div className="p-3.5 rounded-lg max-w-xl leading-relaxed bg-white border border-[#E7E3DA] text-[#57534E] shadow-2xs">
                    Ali is thinking…
                  </div>

                </div>
              )}

            </div>

            {/* Query Form */}

            <form
              onSubmit={handleSendAliMessage}
              className="flex gap-2"
            >

              <input
                type="text"
                value={aliQueryInput}
                onChange={(e) =>
                  setAliQueryInput(e.target.value)
                }
                disabled={aliLoading}
                placeholder="Ask Ali an educational question..."
                className="flex-1 bg-white border border-[#D6D3CD] rounded-lg px-4 py-2.5 text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] disabled:bg-[#F5F3ED] disabled:text-[#A8A29E]"
              />

              <button
                type="submit"
                disabled={
                  aliLoading ||
                  !aliQueryInput.trim()
                }
                className="px-5 py-2.5 bg-[#1C1917] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aliLoading
                  ? 'Asking Ali…'
                  : 'Send Question'}
              </button>

            </form>

            {!isPremium && (
              <div className="pt-2 text-xs text-[#57534E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-[#E7E3DA]">

                <div>
                  <strong className="text-[#1C1917]">
                    Unlock more from Ali:{' '}
                  </strong>
                  Get expanded AI assistance for deeper
                  study support, tiered practice problem
                  generation, and assessment preparation.
                </div>

                <button
                  onClick={() => {
                    setUpgradeTriggerReason(
                      'Deeper Ali Study Support'
                    );
                    setShowUpgradeModal(true);
                  }}
                  className="font-semibold text-[#8C5E38] hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap"
                >
                  View Premium Ali Capabilities
                </button>

              </div>
            )}

          </div>
        )}

        {/* ===================================================== */}
        {/* TAB 4 — TEACHER ENGAGEMENT                           */}
        {/* ===================================================== */}

        {activeTab === 'engagement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-5 shadow-2xs">

              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                <div>

                  <h3 className="font-serif text-lg text-[#1C1917]">
                    Teacher Engagement
                  </h3>

                  <p className="text-xs text-[#57534E]">
                    Direct engagement with an accredited
                    subject educator
                  </p>

                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-[#1C1917]">
                  {entitlements.teacherEngagement.label}
                </span>

              </div>

              <div className="space-y-3 text-xs text-[#44403C] leading-relaxed">

                <p>
                  Teacher engagement is direct, focused
                  interaction with a qualified subject
                  teacher. You can use your engagement
                  allowance to ask for help, discuss a
                  challenging problem, receive personal
                  guidance, or review a past assessment.
                </p>

                <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] space-y-2">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#1C1917]">
                      Weekly Engagement Allowance:
                    </span>

                    <span className="font-bold text-[#8C5E38]">
                      {
                        entitlements.teacherEngagement
                          .remainingThisWeek
                      }{' '}
                      available this week
                    </span>

                  </div>

                  <div className="text-[11px] text-[#78716C]">
                    Lead Educator: Ms. Thandeka Dlamini
                    (Physical Sciences)
                  </div>

                </div>

                {bookingSuccess ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">

                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />

                    <span>
                      Your engagement request has been
                      submitted to Ms. Dlamini.
                    </span>

                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setBookingSuccess(true)
                    }
                    className="w-full py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer text-center"
                  >
                    Request Guidance Session for this Week
                  </button>
                )}

              </div>

              {!isPremium && (
                <div className="pt-3 border-t border-[#E7E3DA] text-xs text-[#78716C]">
                  Need more educator time? QUALANTRA
                  Premium provides expanded teacher
                  engagement across all your subjects.
                </div>
              )}

            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-5 shadow-2xs">

              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                <div>

                  <h3 className="font-serif text-lg text-[#1C1917]">
                    Your Tutor
                  </h3>

                  <p className="text-xs text-[#57534E]">
                    Ongoing learning guidance and study
                    check-ins
                  </p>

                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-[#1C1917]">
                  {entitlements.tutor.label}
                </span>

              </div>

              <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] space-y-3 text-xs">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-white border border-[#D6D3CD] flex items-center justify-center font-serif text-sm font-semibold text-[#1C1917]">
                    DS
                  </div>

                  <div>

                    <div className="font-semibold text-[#1C1917]">
                      {entitlements.tutor.assignedTutorName}
                    </div>

                    <div className="text-[11px] text-[#78716C]">
                      {entitlements.tutor.assignedTutorSubject}
                    </div>

                  </div>

                </div>

                <p className="text-[#57534E] leading-relaxed pt-1">
                  {entitlements.tutor.description}
                </p>

              </div>

              <div className="space-y-2 text-xs text-[#44403C]">

                <div className="font-semibold text-[#1C1917]">
                  Next Tutor Check-in:
                </div>

                <div className="p-3 rounded border border-[#E7E3DA] bg-white flex items-center justify-between">

                  <span>
                    Friday, 15:30 · Weekly Homework Review
                  </span>

                  <span className="text-[10px] font-mono text-[#8C5E38]">
                    Confirmed
                  </span>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ===================================================== */}
      {/* RESOURCE MODAL                                        */}
      {/* ===================================================== */}

      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-2xl w-full border border-[#E7E3DA] p-6 sm:p-8 space-y-5 shadow-2xl relative">

            <div className="flex items-start justify-between border-b border-[#E7E3DA] pb-4">

              <div>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
                  {selectedResource.category} ·{' '}
                  {selectedResource.subject}
                </span>

                <h3 className="font-serif text-2xl text-[#1C1917] mt-1">
                  {selectedResource.title}
                </h3>

              </div>

              <button
                onClick={() =>
                  setSelectedResource(null)
                }
                className="p-1 rounded-md text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#44403C] leading-relaxed">

              <p>
                {selectedResource.description}
              </p>

              <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA] font-mono text-xs text-[#1C1917] space-y-2">

                <div className="font-semibold">
                  Core Curriculum Key Takeaways:
                </div>

                <ul className="list-disc pl-5 space-y-1 text-[#57534E]">

                  <li>
                    Linear momentum: p = m · v
                    (measured in kg·m·s⁻¹).
                  </li>

                  <li>
                    Impulse theorem: J = F_net · Δt = Δp.
                  </li>

                  <li>
                    Isolated system conservation:
                    Σp_initial = Σp_final.
                  </li>

                </ul>

              </div>

            </div>

            <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-end">

              <button
                onClick={() =>
                  setSelectedResource(null)
                }
                className="px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                Close Resource
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================== */}
      {/* UPGRADE MODAL                                         */}
      {/* ===================================================== */}

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-xl w-full border border-[#E7E3DA] p-6 sm:p-8 space-y-6 shadow-2xl relative">

            <div className="flex items-start justify-between border-b border-[#E7E3DA] pb-4">

              <div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F5F3ED] text-[#8C5E38] text-[11px] font-semibold uppercase tracking-wider mb-1">

                  <Sparkles className="w-3 h-3" />

                  <span>QUALANTRA Premium</span>

                </div>

                <h3 className="font-serif text-2xl text-[#1C1917]">
                  This resource is available with
                  QUALANTRA Premium.
                </h3>

              </div>

              <button
                onClick={() =>
                  setShowUpgradeModal(false)
                }
                className="p-1 rounded-md text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#44403C] leading-relaxed">

              <p>
                Upgrade to access expanded learning
                resources, deeper Ali support and
                additional educational assistance.
              </p>

              <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA] space-y-2.5 text-xs">

                <div className="font-semibold text-[#1C1917]">
                  What QUALANTRA Premium provides:
                </div>

                <div className="space-y-1.5 text-[#57534E]">

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Expanded Ali AI Assistant for
                      in-depth practice & remediation
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Expanded teacher engagement with
                      subject educators
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Full resource ecosystem and 5-year
                      past examination archives
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Advanced Learning Support across
                      the continuous learning loop
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <div className="pt-4 border-t border-[#E7E3DA] flex flex-col sm:flex-row items-center justify-end gap-3">

              <button
                onClick={() => {
                  setCurrentPlan('PREMIUM');
                  setShowUpgradeModal(false);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                Switch to Premium View (Prototype)
              </button>

              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  onNavigate('/pricing');
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#FAF9F5] border border-[#D6D3CD] text-[#1C1917] text-xs font-semibold rounded-md hover:bg-[#EAE7E0] transition-colors cursor-pointer"
              >
                Compare Free and Premium Plans
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
