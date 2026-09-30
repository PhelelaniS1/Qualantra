import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
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
  const auth = useAuth();

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(
    window.location.pathname as AppRoute
  );

  const [isConsultationOpen, setIsConsultationOpen] =
    useState<boolean>(false);

  // Sync the authenticated Cognito user with the QUALANTRA backend.
  useEffect(() => {
    if (auth.isLoading || !auth.isAuthenticated || !auth.user?.id_token) {
      return;
    }

    const authenticatedUser = auth.user;

    if (!authenticatedUser?.id_token) {
      return;
    }

    const syncUserProfile = async () => {
      try {
        const savedRole = localStorage.getItem('qualantra_role');

        if (!savedRole) {
          console.log(
            'QUALANTRA: No saved role found. Skipping profile sync.'
          );
          return;
        }

        const response = await fetch(
          'https://p58dcvfap5.execute-api.us-west-2.amazonaws.com/prod/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authenticatedUser.id_token}`,
            },
            body: JSON.stringify({
              role: savedRole,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            'QUALANTRA: Profile sync failed:',
            response.status,
            data
          );
          return;
        }

        console.log('QUALANTRA: Profile synced successfully.', data);
      } catch (error) {
        console.error(
          'QUALANTRA: Could not sync user profile:',
          error
        );
      }
    };

    syncUserProfile();
  }, [
    auth.isLoading,
    auth.isAuthenticated,
    auth.user?.id_token,
  ]);

  // Redirect authenticated users to their selected QUALANTRA portal.
  useEffect(() => {
    if (auth.isLoading || !auth.isAuthenticated) {
      return;
    }

    const savedRole = localStorage.getItem('qualantra_role');

    if (!savedRole) {
      return;
    }

    let portalRoute: AppRoute | null = null;

    if (savedRole === 'learner') {
      portalRoute = '/learner';
    } else if (savedRole === 'teacher') {
      portalRoute = '/teacher';
    } else if (savedRole === 'parent') {
      portalRoute = '/parent';
    } else if (savedRole === 'school' || savedRole === 'admin') {
      portalRoute = '/admin';
    }

    if (
      portalRoute &&
      (currentRoute === '/' ||
        currentRoute === '/login' ||
        currentRoute === '/signup')
    ) {
      setCurrentRoute(portalRoute);
      window.history.replaceState({}, '', portalRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [auth.isLoading, auth.isAuthenticated, currentRoute]);

  // Return signed-out users to the QUALANTRA home page.
  useEffect(() => {
    if (auth.isLoading || auth.isAuthenticated) {
      return;
    }

    const protectedRoutes: AppRoute[] = [
      '/learner',
      '/teacher',
      '/parent',
      '/admin',
    ];

    if (protectedRoutes.includes(currentRoute)) {
      localStorage.removeItem('qualantra_role');
      setCurrentRoute('/');
      window.history.replaceState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [auth.isLoading, auth.isAuthenticated, currentRoute]);

  // Handle browser back/forward.
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;

      if (
        [
          '/',
          '/login',
          '/signup',
          '/learner',
          '/teacher',
          '/parent',
          '/admin',
          '/pricing',
          '/about',
        ].includes(path)
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
      // In sandbox environments, pushState may be restricted.
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

        {currentRoute === '/login' && (
          <LoginPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/signup' && (
          <SignupPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/learner' && (
          <LearnerPortalPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/teacher' && (
          <TeacherPortalPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/parent' && (
          <ParentPortalPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/admin' && (
          <AdminPortalPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/pricing' && (
          <PricingPage onNavigate={handleNavigate} />
        )}

        {currentRoute === '/about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
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