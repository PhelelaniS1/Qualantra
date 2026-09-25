import { LearnerPlan, PlanEntitlements, LearningResourceItem } from '../types';

export const PLAN_ENTITLEMENTS: Record<LearnerPlan, PlanEntitlements> = {
  FREE: {
    plan: 'FREE',
    name: 'QUALANTRA Free',
    badge: 'Universal Entry Point',
    tagline: 'For learners getting started',
    ali: {
      level: 'LIMITED',
      label: 'Limited AI assistance',
      description: 'Free learners can interact with Ali for explanations, examples, questions, and basic study support. Token and interaction usage is capped to maintain educational focus.',
      usageNote: 'Useful study support with daily interaction limits',
      capabilities: [
        'Concept explanations and real-world analogies',
        'Syllabus examples aligned to CAPS',
        'Basic study assistance and question clarification',
        'Bilingual vocabulary reference',
      ],
    },
    tutor: {
      count: 1,
      label: '1 Assigned Tutor',
      description: 'Available to support your learning journey with weekly check-ins and academic guidance.',
      assignedTutorName: 'Mr. David Sithole',
      assignedTutorSubject: 'Physical Sciences & Mathematics',
    },
    teacherEngagement: {
      frequency: '1_PER_WEEK',
      label: '1 teacher engagement per week',
      description: 'Direct engagement with a qualified subject teacher for concept discussions, homework clarification, and academic guidance.',
      remainingThisWeek: 1,
      allowanceNote: '1 engagement remaining this week',
    },
    resources: {
      access: 'LIMITED',
      label: 'Curated Core Library',
      description: 'Access to essential curriculum materials, selected exercises, and foundational study sheets.',
      availableItemsCount: 18,
      totalLibraryCount: 140,
    },
    studyMaterial: {
      coverage: 'CORE',
      label: 'Essential Study Material',
      description: 'Core CAPS syllabus summaries, formula sheets, and essential chapter overviews necessary to support everyday learning.',
    },
    advancedLearningSupport: {
      enabled: false,
      label: 'Standard Learning Support',
      description: 'Foundational feedback on completed pod homework.',
    },
    signFusion: {
      included: true,
      label: 'Full SignFusion Access',
      description: 'Accessibility is part of QUALANTRA, not an afterthought. SASL visual-language tools and bidirectional captioning are included for all learners.',
    },
  },

  PREMIUM: {
    plan: 'PREMIUM',
    name: 'QUALANTRA Premium',
    badge: 'Complete Learning Experience',
    tagline: 'For the complete QUALANTRA experience',
    ali: {
      level: 'EXPANDED',
      label: 'Expanded AI assistance',
      description: 'Significantly greater AI usage for deeper study support, tiered practice problem generation, assessment preparation, and step-by-step remediation.',
      usageNote: 'Expanded interaction capacity and comprehensive problem solving',
      capabilities: [
        'Explanations, analogies and alternative concept frameworks',
        'Curriculum-aligned examples and interactive walkthroughs',
        'Tiered practice problem generation',
        'Deep study support and guided revision activities',
        'Assessment and examination preparation drills',
        'Personalized remediation for identified learning gaps',
        'Continuous learning assistance across all enrolled subjects',
      ],
    },
    tutor: {
      count: 2,
      label: 'Expanded Tutor Support',
      description: 'Assigned tutors available across your primary subjects for regular academic reviews and personalized study plans.',
      assignedTutorName: 'Mr. David Sithole & Specialist Pod Tutors',
      assignedTutorSubject: 'Physical Sciences, Mathematics & Life Sciences',
    },
    teacherEngagement: {
      frequency: 'EXPANDED',
      label: 'Expanded teacher engagement',
      description: 'Substantially greater access to qualified subject educators for personalized diagnostic sessions, exam readiness reviews, and targeted learning interventions.',
      remainingThisWeek: 4,
      allowanceNote: 'Expanded weekly allowance',
    },
    resources: {
      access: 'FULL',
      label: 'Complete Resource Ecosystem',
      description: 'Full access to the broader QUALANTRA resource library, including enriched worksheets, diagnostic quizzes, and complete past examination archives.',
      availableItemsCount: 140,
      totalLibraryCount: 140,
    },
    studyMaterial: {
      coverage: 'EXPANDED',
      label: 'Expanded Study Material',
      description: 'Comprehensive study guides, worked exemplar solutions, advanced IEB extension modules, and detailed subject notes across all terms.',
    },
    advancedLearningSupport: {
      enabled: true,
      label: 'Advanced Learning Support',
      description: 'Deeper support around the continuous learning loop: Learn, Practice, Assess, Identify, Support, Reassess. The teacher remains responsible for educational decisions.',
    },
    signFusion: {
      included: true,
      label: 'Full SignFusion Access',
      description: 'Accessibility is part of QUALANTRA, not an afterthought. Complete South African Sign Language (SASL) support with live visual-language communication across every lesson.',
    },
  },
};

export const SAMPLE_LEARNING_RESOURCES: LearningResourceItem[] = [
  {
    id: 'res-core-1',
    title: 'Newtonian Mechanics: Momentum Fundamentals',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    category: 'Core Study Material',
    planRequired: 'FREE',
    description: 'Essential CAPS summary defining linear momentum, impulse, and fundamental conservation laws with introductory diagrams.',
    format: 'PDF Summary',
    readTime: '12 min',
  },
  {
    id: 'res-core-2',
    title: 'Differential Calculus: First Principles Reference',
    subject: 'Mathematics',
    grade: 'Grade 11',
    category: 'Core Study Material',
    planRequired: 'FREE',
    description: 'Core algebraic rules for derivative limits, notations, and polynomial gradient calculations with worked examples.',
    format: 'PDF Summary',
    readTime: '15 min',
  },
  {
    id: 'res-core-3',
    title: 'Work, Energy and Power: Core Practice Worksheet',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    category: 'Core Study Material',
    planRequired: 'FREE',
    description: 'A curated selection of 5 foundational problems testing work-energy theorem applications on horizontal surfaces.',
    format: 'Interactive Worksheet',
    readTime: '20 min',
  },
  {
    id: 'res-prem-1',
    title: 'Inelastic Collisions & Kinetic Energy Dissipation',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    category: 'Expanded Curriculum',
    planRequired: 'PREMIUM',
    description: 'Advanced mathematical derivations analyzing energy losses in 2-dimensional collisions, restitution coefficients, and lab exemplars.',
    format: 'Step-by-Step Exemplar',
    readTime: '25 min',
  },
  {
    id: 'res-prem-2',
    title: 'National Senior Certificate 5-Year Exam Archive with Model Solutions',
    subject: 'Physical Sciences & Mathematics',
    grade: 'Grade 11 & 12',
    category: 'Exam Preparation',
    planRequired: 'PREMIUM',
    description: 'Full official DBE and IEB past paper archive with step-by-step diagnostic breakdown, common misconception warnings, and examiner memos.',
    format: 'Step-by-Step Exemplar',
    readTime: '45 min',
  },
  {
    id: 'res-prem-3',
    title: 'Interactive Stoichiometry & Acid-Base Titration Simulator Drill',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    category: 'Practice & Assessment',
    planRequired: 'PREMIUM',
    description: 'Expanded Ali-guided diagnostic drill covering molar titration calculations, limiting reactants, and percentage purity problem sets.',
    format: 'Diagnostic Drill',
    readTime: '30 min',
  },
  {
    id: 'res-prem-4',
    title: 'Advanced Calculus Optimization & IEB Extension Modules',
    subject: 'Mathematics',
    grade: 'Grade 11',
    category: 'Expanded Curriculum',
    planRequired: 'PREMIUM',
    description: 'Rate-of-change word problems, maximum volume geometry constraints, and cubic polynomial curve sketching frameworks.',
    format: 'Step-by-Step Exemplar',
    readTime: '35 min',
  },
];

export function getPlanEntitlements(plan: LearnerPlan): PlanEntitlements {
  return PLAN_ENTITLEMENTS[plan] || PLAN_ENTITLEMENTS.FREE;
}

export function canAccessResource(userPlan: LearnerPlan, resource: LearningResourceItem): boolean {
  if (resource.planRequired === 'FREE') return true;
  return userPlan === 'PREMIUM';
}
