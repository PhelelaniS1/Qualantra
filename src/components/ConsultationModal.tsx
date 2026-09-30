import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    role: 'School Principal',
    province: 'Gauteng',
    gradeRange: 'Grades 10–12 (FET Phase)',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] border border-[#E7E3DA] rounded-lg shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E3DA] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              School Partnership & Pod Enrolment
            </h3>
            <p className="text-xs text-[#78716C]">
              Request an active classroom observation or pilot pod for your school
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F3ED] rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F5F3ED] border border-[#D6D3CD] flex items-center justify-center text-[#8C5E38] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif text-[#1C1917]">
              Consultation Scheduled
            </h4>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.contactName}</strong>. Our academic team will connect with <strong>{formData.institutionName || 'your institution'}</strong> within 24 hours to schedule an observation session of an active 1 teacher, 10 learners QUALANTRA classroom.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                Return to Platform
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  School / Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., St. Alban's College"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  Primary Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Claire Nkosi"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  Professional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="c.nkosi@school.co.za"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  Phone Number (South Africa)
                </label>
                <input
                  type="tel"
                  placeholder="+27 (0)11 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  Role at Institution
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                >
                  <option>School Principal / Head of School</option>
                  <option>Deputy Principal (Academic)</option>
                  <option>Head of Department (Sciences / Math)</option>
                  <option>Education Trust Director</option>
                  <option>Parent / Guardian</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#1C1917] mb-1.5">
                  Province
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                >
                  <option>Gauteng</option>
                  <option>Western Cape</option>
                  <option>KwaZulu-Natal</option>
                  <option>Eastern Cape</option>
                  <option>Free State</option>
                  <option>Limpopo</option>
                  <option>Mpumalanga</option>
                  <option>North West</option>
                  <option>Northern Cape</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#1C1917] mb-1.5">
                Specific Learning Objectives or Subject Needs
              </label>
              <textarea
                rows={3}
                placeholder="Detail any specific subject areas (e.g. Grade 11/12 Physical Sciences, Mathematics) or cohort sizes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#D6D3CD] bg-white text-[#1C1917] focus:outline-hidden focus:border-[#1C1917] transition-colors"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E7E3DA]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-md hover:bg-black transition-colors cursor-pointer"
              >
                Submit Consultation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
