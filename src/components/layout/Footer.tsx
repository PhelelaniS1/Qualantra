import React from 'react';
import { AppRoute } from '../../types';
import { QualantraLogo } from '../common/QualantraLogo';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E7E3DA] py-16 text-xs text-[#78716C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#E7E3DA]">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left hover:opacity-90 transition-opacity cursor-pointer focus:outline-hidden"
              title="QUALANTRA Home"
            >
              <QualantraLogo size="sm" variant="full" />
            </button>
            <p className="text-xs text-[#57534E] max-w-sm leading-relaxed">
              A South African digital school connecting motivated learners with qualified educators
              in focused ten-person live classrooms across all nine provinces.
            </p>
          </div>

          {/* Links Col 1: Learn & Teach */}
          <div className="space-y-3">
            <div className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
              Platform
            </div>
            <ul className="space-y-2 text-[#57534E]">
              <li>
                <button
                  onClick={() => onNavigate('/learner')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Learner Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/teacher')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Teaching Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Free and Premium Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  1 Teacher, 10 Learners
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Institutional */}
          <div className="space-y-3">
            <div className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
              Institutional
            </div>
            <ul className="space-y-2 text-[#57534E]">
              <li>
                <button
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Schools Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/parent')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Parent Oversight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  About QUALANTRA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  SignFusion Accessibility
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 3: Compliance & Legal */}
          <div className="space-y-3">
            <div className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
              Governance
            </div>
            <ul className="space-y-2 text-[#57534E]">
              <li>
                <span>SACE Educator Registry</span>
              </li>
              <li>
                <span>CAPS & IEB Standards</span>
              </li>
              <li>
                <span>POPIA Privacy Safeguards</span>
              </li>
              <li>
                <span>Academic Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#A8A29E]">
          <div>
            © {new Date().getFullYear()} QUALANTRA Education (Pty) Ltd. Republic of South Africa.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Johannesburg</span>
            <span aria-hidden="true">·</span>
            <span>Cape Town</span>
            <span aria-hidden="true">·</span>
            <span>Durban</span>
            <span aria-hidden="true">·</span>
            <span>All Nine Provinces</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
