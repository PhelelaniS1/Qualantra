import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { AppRoute } from '../types';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { QualantraLogo } from '../components/common/QualantraLogo';

interface LoginPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const auth = useAuth();
  const [role, setRole] = useState<'learner' | 'teacher' | 'parent' | 'admin'>('learner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remember which portal the user selected before Cognito redirects.
    localStorage.setItem('qualantra_role', role);

    auth.signinRedirect();
  };

  const roleLabel = {
    learner: 'Learner',
    teacher: 'Educator',
    parent: 'Parent',
    admin: 'School Admin',
  }[role];

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-28 pb-16 px-6 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-[#E7E3DA] rounded-lg p-8 sm:p-10 shadow-2xs space-y-6">
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to QUALANTRA</span>
          </button>

          <div className="mb-4">
            <QualantraLogo size="sm" variant="full" />
          </div>

          <div className="font-serif text-2xl text-[#1C1917] mb-1">
            Sign in to QUALANTRA
          </div>

          <p className="text-xs text-[#57534E]">
            Secure access to your QUALANTRA learning environment.
          </p>
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-2">
            Select Role
          </label>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setRole('learner')}
              className={`p-2 rounded border text-center transition-all cursor-pointer ${
                role === 'learner'
                  ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917]'
                  : 'border-[#E7E3DA] text-[#57534E]'
              }`}
            >
              Learner
            </button>

            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`p-2 rounded border text-center transition-all cursor-pointer ${
                role === 'teacher'
                  ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917]'
                  : 'border-[#E7E3DA] text-[#57534E]'
              }`}
            >
              Educator
            </button>

            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`p-2 rounded border text-center transition-all cursor-pointer ${
                role === 'parent'
                  ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917]'
                  : 'border-[#E7E3DA] text-[#57534E]'
              }`}
            >
              Parent
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-2 rounded border text-center transition-all cursor-pointer ${
                role === 'admin'
                  ? 'border-[#1C1917] bg-[#FAF9F5] font-semibold text-[#1C1917]'
                  : 'border-[#E7E3DA] text-[#57534E]'
              }`}
            >
              School Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="rounded-lg border border-[#E7E3DA] bg-[#FAF9F5] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#57534E] mt-0.5 shrink-0" />

              <div>
                <div className="font-semibold text-[#1C1917] mb-1">
                  Secure authentication
                </div>

                <p className="text-[11px] leading-relaxed text-[#57534E]">
                  You'll continue to AWS Cognito to enter your QUALANTRA
                  account credentials securely.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#78716C]">
            Signing in as{' '}
            <span className="font-semibold text-[#1C1917]">
              {roleLabel}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#1C1917] text-white font-semibold rounded hover:bg-black transition-colors cursor-pointer text-center shadow-2xs"
          >
            Continue to secure sign-in
          </button>
        </form>

        <div className="pt-4 border-t border-[#E7E3DA] text-center text-xs text-[#57534E]">
          Don't have an account yet?{' '}

          <button
            onClick={() => onNavigate('/signup')}
            className="font-semibold text-[#1C1917] underline hover:text-[#8C5E38] cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};