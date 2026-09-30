import { MockTimetableItem } from '../types';

/*
 * QUALANTRA portal data
 *
 * This file intentionally contains no fictional user records.
 *
 * Real learner, educator, parent, timetable, attendance, assessment,
 * and learning-progress data must come from the authenticated backend.
 *
 * These exports are retained temporarily because existing portal pages
 * still import them. They will remain empty until those pages are
 * connected to the real backend services.
 */

export const MOCK_LEARNER_SCHEDULE: MockTimetableItem[] = [];

export const MOCK_LEARNER_PROFILE = {
  name: '',
  grade: '',
  schoolRegion: '',
  subjects: [],
  supportGaps: [],
};

export const MOCK_TEACHER_PROFILE = {
  name: '',
  title: '',
  registration: '',
  activePods: 0,
  totalLearners: 0,
  upcomingClasses: [],
  aliDraft: null,
};

export const MOCK_PARENT_VIEW = {
  parentName: '',
  learnerName: '',
  grade: '',
  attendanceSummary: '',
  recentNotes: [],
};