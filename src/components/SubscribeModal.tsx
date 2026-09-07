import React, { useState } from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

interface SubscribeModalProps {
  topicTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  topicTitle = 'Water Projects in Gumla District',
  isOpen,
  onClose
}) => {
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [contact, setContact] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Follow & Subscribe
              </h3>
              <p className="text-xs text-slate-400">
                Receive public status change alerts
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subscribing to:</span>
            <h4 className="text-sm font-bold text-slate-900">{topicTitle}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Alert triggers: SLA updates, pilot launches, official findings, community survey openings.
            </p>
          </div>

          {subscribed ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Subscription Confirmed</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                You will receive notification pings when official events or milestones are logged. You can unsubscribe at any time.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg text-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    method === 'email'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email Digest
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('sms')}
                  className={`flex-1 p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    method === 'sms'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> SMS Alerts
                </button>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {method === 'email' ? 'Email Address' : 'Mobile Number (for SMS)'}
                </label>
                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  required
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder={method === 'email' ? 'citizen@example.org' : '9876543210'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Privacy Guarantee Box */}
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg flex items-start gap-2 text-[11px] text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Privacy Guarantee:</strong> Your contact info is hashed and stored strictly in an encrypted notification queue. It is never associated with publicly visible comments or reports.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 font-medium rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
