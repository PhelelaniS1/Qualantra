import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { AppRoute } from '../types';
import { ArrowLeft } from 'lucide-react';
import { QualantraLogo } from '../components/common/QualantraLogo';

interface LoginPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const auth = useAuth();
  const [role, setRole] = useState<'learner' | 'teacher' | 'parent' | 'admin'>('learner');
  const [email, setEmail] = useState<string>('liam.vandermerwe@school.za');
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remember which portal the user selected before Cognito redirects.
    localStorage.setItem('qualantra_role', role);

    auth.signinRedirect();
  };

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
            Access your synchronous pods, teaching tools, and academic records.
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
              onClick={() => {
                setRole('learner');
                setEmail('liam.vandermerwe@school.za');
              }}
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
              onClick={() => {
                setRole('teacher');
                setEmail('t.dlamini@qualantra.co.za');
              }}
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
              onClick={() => {
                setRole('parent');
                setEmail('pieter.vdm@domain.co.za');
              }}
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
              onClick={() => {
                setRole('admin');
                setEmail('admin@capeacademic.org.za');
              }}
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
          <div>
            <label className="block font-medium text-[#1C1917] mb-1">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1C1917] mb-1">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
            <span>Authentication layer ready for AWS Cognito</span>

            <a
              href="#forgot"
              className="underline hover:text-[#1C1917]"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#1C1917] text-white font-semibold rounded hover:bg-black transition-colors cursor-pointer text-center shadow-2xs"
          >
            Enter {role.charAt(0).toUpperCase() + role.slice(1)} Portal Preview
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