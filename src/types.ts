export type AppRoute =
  | '/'
  | '/login'
  | '/signup'
  | '/learner'
  | '/teacher'
  | '/parent'
  | '/admin'
  | '/pricing'
  | '/about';

export interface Shot {
  id: number;
  slug: string;
  title: string;
  perspective: string;
  startTime: number;
  endTime: number;
  imageSrc: string;
  description: string;
  cameraMovement: string;
  cinematographyNotes: string;
  emotionalTone: string;
}

export interface Learner {
  id: number;
  name: string;
  location: string;
  grade: string;
  focusArea: string;
  currentActivity: string;
  connectionStatus: 'Synchronized';
}

export interface Educator {
  name: string;
  title: string;
  qualifications: string;
  location: string;
  subject: string;
  currentLesson: string;
}

export interface ActiveClassroomState {
  lessonTitle: string;
  subject: string;
  curriculum: string;
  educator: Educator;
  learners: Learner[];
  durationMinutes: number;
  elapsedMinutes: number;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  sampleTerm: string;
  sampleTranslation: string;
  explanation: string;
}

export interface TeachingOpportunity {
  id: string;
  title: string;
  engagementType: 'Full-time' | 'Part-time' | 'Specialist Pod' | 'One-to-One';
  subject: string;
  grades: string;
  curriculum: string;
  locationScope: string;
  allocation: string;
}

export interface MockTimetableItem {
  time: string;
  subject: string;
  topic: string;
  educator: string;
  status: 'Upcoming' | 'Live Now' | 'Completed';
}

export type LearnerPlan = 'FREE' | 'PREMIUM';

export interface PlanEntitlements {
  plan: LearnerPlan;
  name: string;
  badge: string;
  tagline: string;
  ali: {
    level: 'LIMITED' | 'EXPANDED';
    label: string;
    description: string;
    usageNote: string;
    capabilities: string[];
  };
  tutor: {
    count: number;
    label: string;
    description: string;
    assignedTutorName: string;
    assignedTutorSubject: string;
  };
  teacherEngagement: {
    frequency: '1_PER_WEEK' | 'EXPANDED';
    label: string;
    description: string;
    remainingThisWeek: number;
    allowanceNote: string;
  };
  resources: {
    access: 'LIMITED' | 'FULL';
    label: string;
    description: string;
    availableItemsCount: number;
    totalLibraryCount: number;
  };
  studyMaterial: {
    coverage: 'CORE' | 'EXPANDED';
    label: string;
    description: string;
  };
  advancedLearningSupport: {
    enabled: boolean;
    label: string;
    description: string;
  };
  signFusion: {
    included: boolean;
    label: string;
    description: string;
  };
}

export interface LearningResourceItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  category: 'Core Study Material' | 'Expanded Curriculum' | 'Practice & Assessment' | 'Exam Preparation';
  planRequired: LearnerPlan;
  description: string;
  format: 'PDF Summary' | 'Interactive Worksheet' | 'Step-by-Step Exemplar' | 'Diagnostic Drill';
  readTime: string;
}
