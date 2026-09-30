import { MockTimetableItem } from '../types';

export const MOCK_LEARNER_SCHEDULE: MockTimetableItem[] = [
  {
    time: '08:30 - 09:15',
    subject: 'Mathematics',
    topic: 'Differential Calculus: Rates of Change',
    educator: 'Mr. Andrew Botha',
    status: 'Completed',
  },
  {
    time: '10:00 - 10:45',
    subject: 'Physical Sciences',
    topic: 'Newtonian Mechanics: Momentum and Impulse',
    educator: 'Ms. Thandeka Dlamini',
    status: 'Live Now',
  },
  {
    time: '11:45 - 12:30',
    subject: 'Information Technology',
    topic: 'Relational Data Architecture and SQL Queries',
    educator: 'Mrs. Devani Naidoo',
    status: 'Upcoming',
  },
  {
    time: '14:00 - 14:45',
    subject: 'English Home Language',
    topic: 'Contemporary South African Poetry Analysis',
    educator: 'Dr. Zoleka Mtshali',
    status: 'Upcoming',
  },
];

export const MOCK_LEARNER_PROFILE = {
  name: 'Liam van der Merwe',
  grade: 'Grade 11',
  schoolRegion: 'Western Cape',
  subjects: [
    { name: 'Physical Sciences', educator: 'Ms. T. Dlamini', status: 'On Track' },
    { name: 'Mathematics', educator: 'Mr. A. Botha', status: 'Reviewing Calculus' },
    { name: 'Information Technology', educator: 'Mrs. D. Naidoo', status: 'On Track' },
    { name: 'English Home Language', educator: 'Dr. Z. Mtshali', status: 'On Track' },
    { name: 'Life Sciences', educator: 'Mr. K. Sithole', status: 'On Track' },
  ],
  supportGaps: [
    {
      topic: 'Vector Resolution in Two Dimensions',
      status: 'Targeted Remediation',
      note: 'Educator recommended 3 practice problems on inclined plane normal forces.',
    },
    {
      topic: 'Kinetic Energy Dissipation in Inelastic Collisions',
      status: 'Practicing with Ali',
      note: 'Ali practice worksheet approved by Ms. Dlamini.',
    },
  ],
};

export const MOCK_TEACHER_PROFILE = {
  name: 'Ms. Thandeka Dlamini',
  title: 'Lead Educator · Physical Sciences',
  registration: 'SACE #49102 · Verified',
  activePods: 2,
  totalLearners: 20,
  upcomingClasses: [
    { time: '10:00 - 10:45', pod: 'Sci-11A Pod Alpha', topic: 'Momentum and Impulse', enrolled: 10 },
    { time: '13:00 - 13:45', pod: 'Sci-11B Pod Beta', topic: 'Newton’s Laws Revision', enrolled: 10 },
  ],
  aliDraft: {
    title: 'Visual Representation: Conservation of Linear Momentum',
    suggestion: 'Step-by-step vector diagram illustrating two colliding trolleys with velocity vectors before and after impact, highlighting mass ratios.',
    approved: false,
  },
};

export const MOCK_PARENT_VIEW = {
  parentName: 'Dr. Pieter van der Merwe',
  learnerName: 'Liam van der Merwe',
  grade: 'Grade 11',
  attendanceSummary: 'Present for all scheduled sessions today',
  recentNotes: [
    {
      date: 'Today, 10:15',
      educator: 'Ms. Thandeka Dlamini (Physical Sciences)',
      comment: 'Liam contributed an accurate worked solution on the digital whiteboard for impulse calculation.',
    },
    {
      date: 'Yesterday, 14:30',
      educator: 'Mr. Andrew Botha (Mathematics)',
      comment: 'Calculus derivatives quiz completed. Extra practice assigned for stationary points.',
    },
  ],
};
