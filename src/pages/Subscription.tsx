import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, Shield, X, Zap } from 'lucide-react';

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'subscription@operix-solutions.com';

const ModuleCard = ({ id, name, desc, active, onClick }: {
  id: string;
  name: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 0.99 }}
    className={`p-8 border cursor-pointer transition-all duration-500 flex flex-col justify-between h-72 ${
      active ? 'bg-secondary text-primary border-secondary shadow-2xl' : 'bg-primary text-secondary border-secondary/10 hover:border-secondary'
    }`}
  >
    <div className="flex justify-between items-start">
      <span className="text-4xl font-black tracking-tighter">{id}</span>
      <div className={`w-6 h-6 border ${active ? 'border-secondary' : 'border-primary'} rotate-45 flex items-center justify-center`}>
        {active && <div className="w-1.5 h-1.5 bg-secondary" />}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{name}</h3>
      <p className={`text-sm font-medium leading-snug ${active ? 'opacity-80' : 'opacity-40'}`}>
        {desc}
      </p>
    </div>
  </motion.div>
);

const Subscription = () => {
  const { t } = useTranslation();
  // const isAr = i18n.language === 'ar';
  const [activeModules, setActiveModules] = useState<string[]>(['HRIS', 'OPS']);
  const [view, setView] = useState<'config' | 'ledger'>('config');

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '1-50',
    country: 'Saudi Arabia'
  });

  const modules = [
    { id: 'HRIS', name: 'Human Capital', desc: 'Core workforce orchestration and automated payroll systems.' },
    { id: 'OPS', name: 'Operations', desc: 'Field logistics, real-time tracking, and operational flows.' },
    { id: 'FMIS', name: 'Financials', desc: 'Electronic Invoicing and real-time fiscal architecture.' },
    { id: 'Care', name: 'Healthcare', desc: 'Clinical systems and medical record management.' },
    { id: 'Edu', name: 'Education', desc: 'Academic governance and student lifecycle management.' },
    { id: 'Hasad', name: 'Property', desc: 'Real estate and facility maintenance ecosystems.' },
  ];

  const toggleModule = (id: string) => {
    setActiveModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const selectedNames = activeModules.join(', ');

    const body = `NEW ENTERPRISE SUBSCRIPTION REQUEST\n\nContact: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nCompany: ${formData.company}\nSize: ${formData.employees}\n\nRequested Modules: ${selectedNames}`;

    try {
      await fetch(OPS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'sendEmail',
          to: TARGET_EMAIL,
          subject: `Subscription Request: ${formData.company}`,
          body
        })
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', employees: '1-50', country: 'Saudi Arabia' });
      }, 3000);
    } catch (error) {
      alert('Error processing request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase"
            >
              {view === 'config' ? t('configTitle', 'CONFIG') : t('ledgerTitle', 'LEDGER')}
            </motion.h1>
            <div className="h-2 w-24 bg-secondary mt-8 mb-4" />
          </div>

          <div className="flex gap-4 border-2 border-secondary p-2">
            <button
              onClick={() => setView('config')}
              className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-colors ${view === 'config' ? 'bg-secondary text-primary' : 'hover:bg-secondary/5'}`}
            >
              Configurator
            </button>
            <button
              onClick={() => setView('ledger')}
              className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-colors ${view === 'ledger' ? 'bg-secondary text-primary' : 'hover:bg-secondary/5'}`}
            >
              Ledger
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'config' ? (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-secondary"
            >
              {modules.map((mod) => (
                <div key={mod.id} className="border-r border-b border-secondary">
                  <ModuleCard
                    {...mod}
                    active={activeModules.includes(mod.id)}
                    onClick={() => toggleModule(mod.id)}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ledger"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-primary"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                      <th className="py-8 px-4">Invoice Ref</th>
                      <th className="py-8 px-4">Date</th>
                      <th className="py-8 px-4">Ecosystem</th>
                      <th className="py-8 px-4">Status</th>
                      <th className="py-8 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-xl font-bold uppercase tracking-tighter">
                    <tr className="border-b border-secondary/10 hover:bg-secondary/5 transition-colors">
                      <td className="py-8 px-4 font-mono">INV-2026-041</td>
                      <td className="py-8 px-4">01 JUN 2026</td>
                      <td className="py-8 px-4">OPERIX Suite V3</td>
                      <td className="py-8 px-4">
                        <span className="bg-primary text-secondary px-3 py-1 text-[10px] font-black tracking-widest">PAID</span>
                      </td>
                      <td className="py-8 px-4 text-right">SAR 35,316.96</td>
                    </tr>
                    <tr className="border-b border-secondary/10 hover:bg-secondary/5 transition-colors">
                      <td className="py-8 px-4 font-mono">INV-2026-028</td>
                      <td className="py-8 px-4">01 MAY 2026</td>
                      <td className="py-8 px-4">OPERIX Core</td>
                      <td className="py-8 px-4">
                        <span className="bg-primary text-secondary px-3 py-1 text-[10px] font-black tracking-widest">PAID</span>
                      </td>
                      <td className="py-8 px-4 text-right">SAR 3,105.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {view === 'config' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 border-t-2 border-secondary pt-12 flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 block mb-2">Total Modules</span>
              <span className="text-6xl font-black uppercase tracking-tighter">{activeModules.length}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={activeModules.length === 0}
              className="bg-secondary text-primary px-12 py-6 text-sm font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30"
            >
              {t('checkoutConfirm', 'Confirm Request & Setup')}
            </button>
          </motion.div>
        )}
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-secondary/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-secondary border border-primary w-full max-w-xl p-12 shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-secondary/40 hover:text-secondary transition-colors"
              >
                <X size={24} />
              </button>

              {submitted ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Request Sent</h3>
                  <p className="text-lg opacity-60 uppercase font-medium">Our architects will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                       <Zap size={20} className="text-secondary" />
                       <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">System Configuration</span>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Enterprise Details</h2>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-secondary/5 border border-secondary/10 px-6 py-4 text-secondary focus:outline-none focus:border-secondary transition-colors font-bold uppercase text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Corporate Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-secondary/5 border border-secondary/10 px-6 py-4 text-secondary focus:outline-none focus:border-secondary transition-colors font-bold uppercase text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Registered Entity</label>
                      <input
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-secondary/5 border border-secondary/10 px-6 py-4 text-secondary focus:outline-none focus:border-secondary transition-colors font-bold uppercase text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Phone Number</label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-secondary/5 border border-secondary/10 px-6 py-4 text-secondary focus:outline-none focus:border-secondary transition-colors font-bold uppercase text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Enterprise Size</label>
                        <select
                          value={formData.employees}
                          onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                          className="w-full bg-secondary/5 border border-secondary/10 px-6 py-4 text-secondary focus:outline-none focus:border-secondary transition-colors font-bold uppercase text-sm appearance-none cursor-pointer"
                        >
                          <option value="1-50" className="bg-secondary">1-50 Employees</option>
                          <option value="51-200" className="bg-secondary">51-200 Employees</option>
                          <option value="201-500" className="bg-secondary">201-500 Employees</option>
                          <option value="500+" className="bg-secondary">500+ Employees</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-secondary py-6 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-8"
                    >
                      {isSubmitting ? (
                         <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Subscription Request</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-20 pt-4">
                      <Shield size={12} />
                      <span>SSL Encrypted Secure Initialization</span>
                    </div>
                  </form>
                </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  export default Subscription;
