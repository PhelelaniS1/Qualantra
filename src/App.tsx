import React, { useState, useEffect } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { LearnerPortalPage } from './pages/LearnerPortalPage';
import { TeacherPortalPage } from './pages/TeacherPortalPage';
import { ParentPortalPage } from './pages/ParentPortalPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ConsultationModal } from './components/ConsultationModal';
import { AppRoute } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);

  // Handle browser back/forward or hash
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      if (
        ['/', '/login', '/signup', '/learner', '/teacher', '/parent', '/admin', '/pricing', '/about'].includes(
          path
        )
      ) {
        setCurrentRoute(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', route);
    } catch {
      // In sandbox environments, pushState may be restricted
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] selection:bg-[#EAE4D7] selection:text-[#1C1917] flex flex-col justify-between">
      {/* 1. Universal Top Navigation Contract */}
      <Navigation
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* 2. Route View Dispatcher */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}
        {currentRoute === '/login' && <LoginPage onNavigate={handleNavigate} />}
        {currentRoute === '/signup' && <SignupPage onNavigate={handleNavigate} />}
        {currentRoute === '/learner' && <LearnerPortalPage onNavigate={handleNavigate} />}
        {currentRoute === '/teacher' && <TeacherPortalPage onNavigate={handleNavigate} />}
        {currentRoute === '/parent' && <ParentPortalPage onNavigate={handleNavigate} />}
        {currentRoute === '/admin' && <AdminPortalPage onNavigate={handleNavigate} />}
        {currentRoute === '/pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentRoute === '/about' && <AboutPage onNavigate={handleNavigate} />}
      </main>

      {/* 3. Universal Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Consultation and Pilot Pod Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
