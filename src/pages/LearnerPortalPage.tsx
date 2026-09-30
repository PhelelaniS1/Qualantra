import React, { useState } from 'react';
import { AppRoute, LearnerPlan, LearningResourceItem } from '../types';
import { SA_LANGUAGES } from '../data/languagesData';
import {
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
  BookOpen,
  User,
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
  // Account / plan state
  // ---------------------------------------------------------

  const [currentPlan] = useState<LearnerPlan>('FREE');

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
  //
  // IMPORTANT:
  // Ali remains connected to the real AWS backend.
  // No fictional conversation is preloaded.
  // ---------------------------------------------------------

  const [aliQueryInput, setAliQueryInput] =
    useState<string>('');

  const [aliLoading, setAliLoading] =
    useState<boolean>(false);

  const [aliConversation, setAliConversation] =
    useState<AliMessage[]>([]);

  // ---------------------------------------------------------
  // Plan configuration
  // ---------------------------------------------------------

  const entitlements = PLAN_ENTITLEMENTS[currentPlan];

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
      const token = getCognitoToken();

      if (!token) {
        throw new Error(
          'Your sign-in session could not be found. Please sign in again.'
        );
      }

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Ali was unable to process the request.'
        );
      }

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
        {/* NAVIGATION                                            */}
        {/* ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DA] pb-4">

          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA Home</span>
          </button>

          <div className="text-xs text-[#78716C] font-mono">
            Learner Workspace
          </div>

        </div>

        {/* ===================================================== */}
        {/* LEARNER PROFILE                                      */}
        {/* ===================================================== */}

        <div className="bg-white border border-[#E7E3DA] rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">

          <div className="flex items-start sm:items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#D6D3CD] flex items-center justify-center font-serif text-xl font-bold text-[#1C1917] shrink-0">
              L
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2 mb-1">

                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E38]">
                  Learner Workspace
                </span>

                <span className="text-[#D6D3CD]">·</span>

                <span className="text-xs font-semibold px-2 py-0.5 rounded border bg-[#F5F3ED] text-[#1C1917] border-[#D6D3CD]">
                  {entitlements.name}
                </span>

              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                Welcome, Learner
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-1">
                <span>
                  Your learner profile and academic information will appear
                  here after your account is connected.
                </span>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 text-xs bg-[#FAF9F5] border border-[#E7E3DA] px-3 py-1.5 rounded-lg">

              <Globe className="w-4 h-4 text-[#8C5E38]" />

              <span className="text-[#57534E]">
                Language:
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

            <button
              onClick={() => {
                setUpgradeTriggerReason(
                  'QUALANTRA Premium'
                );
                setShowUpgradeModal(true);
              }}
              className="px-3.5 py-1.5 bg-[#FAF9F5] hover:bg-[#F5F3ED] border border-[#D6D3CD] text-[#1C1917] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Explore Premium</span>
            </button>

          </div>
        </div>

        {/* ===================================================== */}
        {/* PLAN INFORMATION                                     */}
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
              {entitlements.ali.usageNote}
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
              Teacher assignment available through the learner account.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Teacher Engagement</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {entitlements.teacherEngagement.label}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              Available through your learner account.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Resources</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              {entitlements.resources.label}
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              Curriculum learning materials.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>Study Material</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              Available
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              Curriculum-aligned study support.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E7E3DA] space-y-1.5 shadow-2xs">
            <div className="text-[#78716C] font-medium flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#8C5E38]" />
              <span>SignFusion</span>
            </div>

            <div className="font-semibold text-sm text-[#1C1917]">
              In development
            </div>

            <div className="text-[11px] text-[#57534E] leading-tight">
              SASL accessibility initiative.
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
            Learning Overview
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-white text-[#1C1917] shadow-2xs font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Learning Resources
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
            Teacher Engagement
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
                    Learning Schedule
                  </div>

                </div>

                <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">

                  <div className="text-sm font-semibold text-[#1C1917] mb-2">
                    No learning schedule is currently connected.
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                    Once your learner profile is connected to QUALANTRA,
                    your classes, subjects, educators, timetable, and live
                    classroom sessions will appear here.
                  </p>

                </div>

              </div>

              <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">

                <div className="font-semibold text-sm text-[#1C1917] border-b border-[#E7E3DA] pb-3">
                  Subject Registrations
                </div>

                <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">

                  <div className="text-sm font-semibold text-[#1C1917] mb-2">
                    No subjects are currently linked to this account.
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                    Your registered subjects and educator assignments will
                    appear here after your learner profile is completed.
                  </p>

                </div>

              </div>

            </div>

            <div className="lg:col-span-5 space-y-6">

              <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 shadow-2xs space-y-4">

                <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                  <div className="font-semibold text-sm text-[#1C1917]">
                    Learning Support
                  </div>

                </div>

                <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">

                  <div className="text-sm font-semibold text-[#1C1917] mb-2">
                    No learning gaps have been recorded.
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                    Assessment results and educator recommendations will
                    appear here when they are recorded through QUALANTRA.
                  </p>

                </div>

              </div>

              <div className="p-5 rounded-lg bg-[#F5F3ED] border border-[#E7E3DA] space-y-2 text-xs">

                <div className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8C5E38]" />
                  <span>Learning Support Loop</span>
                </div>

                <p className="text-[#57534E] leading-relaxed">
                  QUALANTRA can connect assessment, learning support,
                  educator guidance, AI assistance, and reassessment.
                  Your actual learning information will be shown once it is
                  recorded in the platform.
                </p>

              </div>

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
                    Learning materials available through QUALANTRA.
                  </p>

                </div>

                <div className="flex items-center gap-2 text-xs">

                  <span className="text-[#78716C]">
                    Current Plan:
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
                                Core
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
                              : 'Premium Access Required'}

                            <ChevronRight className="w-3 h-3" />
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {SAMPLE_LEARNING_RESOURCES.length === 0 && (
                <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">

                  <p className="text-xs text-[#57534E]">
                    Curriculum resources will appear here when they are
                    connected to the QUALANTRA knowledge library.
                  </p>

                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] text-xs text-[#57534E]">
                Resources displayed in this workspace should be sourced from
                QUALANTRA's curriculum and knowledge systems. Access depends
                on the learner's account and plan.
              </div>

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
                  Ali supports learning and teaching. Ali does not replace
                  the teacher.
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs">

                <span className="text-[#78716C]">
                  Ali Access:
                </span>

                <span className="font-semibold px-2.5 py-1 rounded border bg-[#F5F3ED] text-[#1C1917] border-[#D6D3CD]">
                  {entitlements.ali.label}
                </span>

              </div>

            </div>

            <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] text-xs text-[#57534E] flex items-center justify-between gap-4">

              <div>
                <strong className="text-[#1C1917]">
                  Usage Status:{' '}
                </strong>
                {entitlements.ali.usageNote}
              </div>

              <span className="text-[11px] font-mono text-[#8C5E38] whitespace-nowrap">
                AWS Connected
              </span>

            </div>

            {/* Conversation Window */}

            <div className="border border-[#E7E3DA] rounded-lg bg-[#FAF9F5] p-4 space-y-4 min-h-[260px] max-h-[360px] overflow-y-auto text-xs">

              {aliConversation.length === 0 && !aliLoading && (
                <div className="min-h-[220px] flex items-center justify-center text-center">

                  <div className="max-w-md">

                    <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center mx-auto mb-3 font-serif font-bold">
                      A
                    </div>

                    <div className="font-semibold text-[#1C1917] mb-2">
                      Ask Ali a learning question
                    </div>

                    <p className="text-[#57534E] leading-relaxed">
                      Ask a question about a QUALANTRA learning topic.
                      Ali will use the authenticated AWS-backed learning
                      service to respond.
                    </p>

                  </div>

                </div>
              )}

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

            <div className="pt-2 text-xs text-[#57534E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-[#E7E3DA]">

              <div>
                <strong className="text-[#1C1917]">
                  Need expanded support?{' '}
                </strong>
                QUALANTRA Premium is designed to provide additional learning
                resources and support.
              </div>

              <button
                onClick={() => {
                  setUpgradeTriggerReason(
                    'Expanded Ali Study Support'
                  );
                  setShowUpgradeModal(true);
                }}
                className="font-semibold text-[#8C5E38] hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap"
              >
                View Premium
              </button>

            </div>

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
                    Direct engagement with a qualified subject educator.
                  </p>

                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-[#1C1917]">
                  {entitlements.teacherEngagement.label}
                </span>

              </div>

              <div className="space-y-3 text-xs text-[#44403C] leading-relaxed">

                <p>
                  Teacher engagement is intended for focused interaction
                  with a qualified educator. Learners can use this space to
                  request guidance, discuss challenging work, or receive
                  subject support.
                </p>

                <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E7E3DA] space-y-2">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#1C1917]">
                      Engagement availability:
                    </span>

                    <span className="font-bold text-[#8C5E38]">
                      {entitlements.teacherEngagement.label}
                    </span>

                  </div>

                  <div className="text-[11px] text-[#78716C]">
                    Your educator assignment will appear here when one is
                    connected to your learner account.
                  </div>

                </div>

                <button
                  onClick={() =>
                    setUpgradeTriggerReason(
                      'Teacher Engagement'
                    ) || setShowUpgradeModal(true)
                  }
                  className="w-full py-2.5 bg-[#1C1917] text-white rounded-md text-xs font-semibold hover:bg-black transition-colors cursor-pointer text-center"
                >
                  View Teacher Support Options
                </button>

              </div>

            </div>

            <div className="bg-white border border-[#E7E3DA] rounded-lg p-6 sm:p-8 space-y-5 shadow-2xs">

              <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-3">

                <div>

                  <h3 className="font-serif text-lg text-[#1C1917]">
                    Tutor
                  </h3>

                  <p className="text-xs text-[#57534E]">
                    Learning guidance and study support.
                  </p>

                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F3ED] border border-[#E7E3DA] text-[#1C1917]">
                  {entitlements.tutor.label}
                </span>

              </div>

              <div className="p-6 rounded-lg border border-dashed border-[#D6D3CD] bg-[#FAF9F5] text-center">

                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  No tutor is currently assigned.
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed max-w-md mx-auto">
                  A tutor assignment and related check-ins will appear here
                  when they are connected to your learner account.
                </p>

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
                  Learning Support
                </div>

                <p className="text-[#57534E]">
                  This material is presented as curriculum learning support.
                  Additional curriculum content can be connected through
                  the QUALANTRA knowledge system.
                </p>

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
                  {upgradeTriggerReason || 'Premium Access'}
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
                QUALANTRA Premium is designed to provide expanded access to
                learning resources, AI assistance, teacher engagement, and
                educational support.
              </p>

              <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[#E7E3DA] space-y-2.5 text-xs">

                <div className="font-semibold text-[#1C1917]">
                  Premium capabilities
                </div>

                <div className="space-y-1.5 text-[#57534E]">

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Expanded Ali learning assistance
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Expanded teacher engagement
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Additional curriculum learning resources
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C5E38] shrink-0" />
                    <span>
                      Additional learning support capabilities
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <div className="pt-4 border-t border-[#E7E3DA] flex flex-col sm:flex-row items-center justify-end gap-3">

              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  onNavigate('/pricing');
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                View Premium Plans
              </button>

              <button
                onClick={() =>
                  setShowUpgradeModal(false)
                }
                className="w-full sm:w-auto px-4 py-2.5 bg-[#FAF9F5] border border-[#D6D3CD] text-[#1C1917] text-xs font-semibold rounded-md hover:bg-[#EAE7E0] transition-colors cursor-pointer"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};