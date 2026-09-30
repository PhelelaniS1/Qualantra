import React from 'react';
import { HeroMedia } from '../components/hero/HeroMedia';
import { IntroSection } from '../components/sections/IntroSection';
import { LearnerSection } from '../components/sections/LearnerSection';
import { TeacherSection } from '../components/sections/TeacherSection';
import { ClassroomSection } from '../components/sections/ClassroomSection';
import { PerspectivesSection } from '../components/PerspectivesSection';
import { AliSection } from '../components/sections/AliSection';
import { SignFusionSection } from '../components/sections/SignFusionSection';
import { LanguagesSection } from '../components/sections/LanguagesSection';
import { AssessmentSection } from '../components/sections/AssessmentSection';
import { TeacherOpportunitySection } from '../components/sections/TeacherOpportunitySection';
import { EducationIntelligenceSection } from '../components/sections/EducationIntelligenceSection';
import { PricingSection } from '../components/sections/PricingSection';
import { ParentSection } from '../components/sections/ParentSection';
import { SponsorsSection } from '../components/sections/SponsorsSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';
import { AppRoute } from '../types';

interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div>
      {/* 1. Cinematic Hero Background Video and Brand Proposition */}
      <HeroMedia onNavigate={onNavigate} onOpenConsultation={onOpenConsultation} />

      {/* 2. What QUALANTRA Is: The Central Idea */}
      <IntroSection />

      {/* 3. The Learner Experience Preview */}
      <LearnerSection onNavigate={onNavigate} />

      {/* 4. The Teacher Experience & Authority */}
      <TeacherSection onNavigate={onNavigate} />

      {/* 5. The Classroom: 1 Teacher, Exactly 10 Remote Learners */}
      <ClassroomSection />

      {/* 5b. Four Perspectives Documentary Reel Breakdown */}
      <PerspectivesSection
        onSelectShot={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. Ali: AI Teaching Assistant Embedded into Teacher Workflow */}
      <AliSection />

      {/* 7. SignFusion: South African Sign Language Accessibility Architecture */}
      <SignFusionSection />

      {/* 8. Multilingual Learning Across 12 Official Languages */}
      <LanguagesSection />

      {/* 9. Assessment and Learning Support Without Fake Graphs */}
      <AssessmentSection />

      {/* 10. Teacher Opportunities: Full-time, Part-time, Specialist */}
      <TeacherOpportunitySection onNavigate={onNavigate} />

      {/* 11. Education Intelligence Fabric Knowledge Architecture */}
      <EducationIntelligenceSection />

      {/* 12. Free and Premium Editorial Comparison */}
      <PricingSection onNavigate={onNavigate} />

      {/* 13. Parent Experience & Transparent Oversight */}
      <ParentSection onNavigate={onNavigate} />

      {/* 14. Schools and Sponsors: Turning Support Into Access */}
      <SponsorsSection onNavigate={onNavigate} onOpenConsultation={onOpenConsultation} />

      {/* 15. Final Institutional Call to Action */}
      <FinalCtaSection onNavigate={onNavigate} onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
