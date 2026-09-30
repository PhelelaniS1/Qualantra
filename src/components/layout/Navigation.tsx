import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Menu, X } from 'lucide-react';
import { AppRoute } from '../../types';
import { QualantraLogo } from '../common/QualantraLogo';

interface NavigationProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  onOpenConsultation?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  onRouteChange,
  onOpenConsultation,
}) => {
  const auth = useAuth();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: AppRoute, anchorId?: string) => {
    setMobileMenuOpen(false);
    if (anchorId && currentRoute === '/') {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || currentRoute !== '/'
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E3DA] shadow-2xs'
          : 'bg-[#FAF9F5]/85 backdrop-blur-xs border-b border-[#E7E3DA]/60'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 h-20 flex items-center justify-between">
        {/* Brand Zone: Unique simple Qualantra Logo emblem + wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group cursor-pointer focus:outline-hidden"
          title="QUALANTRA Home"
        >
          <QualantraLogo size="sm" variant="compact" />
        </button>

        {/* Navigation Links: Clean text links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-medium text-[#57534E]">
          <button
            onClick={() => handleNavClick('/learner', 'learner')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/learner' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            Learn
          </button>

          <button
            onClick={() => handleNavClick('/teacher', 'teacher')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/teacher' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            Teach
          </button>

          <button
            onClick={() => handleNavClick('/admin', 'schools')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/admin' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            Schools
          </button>

          <button
            onClick={() => handleNavClick('/parent', 'parents')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/parent' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            For Parents
          </button>

          <button
            onClick={() => handleNavClick('/pricing')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/pricing' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            Free and Premium
          </button>

          <button
            onClick={() => handleNavClick('/about')}
            className={`hover:text-[#1C1917] transition-colors cursor-pointer ${
              currentRoute === '/about' ? 'text-[#1C1917] font-semibold' : ''
            }`}
          >
            About
          </button>
        </nav>

                {/* Right Side: Sign in & Get started */}
        <div className="hidden sm:flex items-center gap-4">
          {auth.isAuthenticated ? (
            <button
              onClick={() => auth.removeUser()}
              className="px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('/login')}
                className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  currentRoute === '/login'
                    ? 'text-[#1C1917] font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Sign in
              </button>

              <button
                onClick={() => handleNavClick('/signup')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black active:scale-[0.99] transition-all whitespace-nowrap shadow-2xs cursor-pointer"
              >
                Get started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          {!auth.isAuthenticated && (
            <button
              onClick={() => handleNavClick('/signup')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1C1917] rounded-md"
            >
              Get started
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E7E3DA] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#44403C]">
            <button
              onClick={() => handleNavClick('/learner', 'learner')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              Learn
            </button>

            <button
              onClick={() => handleNavClick('/teacher', 'teacher')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              Teach
            </button>

            <button
              onClick={() => handleNavClick('/admin', 'schools')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              Schools
            </button>

            <button
              onClick={() => handleNavClick('/parent', 'parents')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              For Parents
            </button>

            <button
              onClick={() => handleNavClick('/pricing')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              Free and Premium
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className="text-left py-2 hover:text-[#1C1917]"
            >
              About
            </button>
          </div>

          <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between">
            {auth.isAuthenticated ? (
              <button
                onClick={() => auth.removeUser()}
                className="text-xs font-medium text-[#57534E]"
              >
                Sign out
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/login')}
                  className="text-xs font-medium text-[#57534E]"
                >
                  Sign in
                </button>

                <button
                  onClick={() => handleNavClick('/signup')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};