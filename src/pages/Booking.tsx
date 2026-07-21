import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, Shield, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

const Booking = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    modules: [] as string[],
    scale: 'Standard',
    requirements: ''
  });

  const modules = [
    { id: 'fmis', label: isAr ? 'نظام FMIS' : 'FMIS Financials' },
    { id: 'hris', label: isAr ? 'نظام HRIS' : 'HRIS Human Capital' },
    { id: 'ops', label: isAr ? 'نظام OPS' : 'OPS Operations' },
    { id: 'care', label: isAr ? 'نظام Care' : 'Care Healthcare' },
    { id: 'edu', label: isAr ? 'نظام Edu' : 'Edu Education' },
  ];

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const toggleModule = (label: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(label)
        ? prev.modules.filter(m => m !== label)
        : [...prev.modules, label]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const body = `NEW BOOKING/LEAD REQUEST\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nModules: ${formData.modules.join(', ')}\nScale: ${formData.scale}\nRequirements: ${formData.requirements || 'None'}`;

    try {
      await fetch(OPS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `Booking Request: ${formData.company || formData.name}`, body })
      });
      setSubmitted(true);
    } catch {
      alert(isAr ? 'حدث خطأ. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <Zap size={20} className="text-secondary" />
            <span className="text-xs font-black uppercase tracking-[0.4em] opacity-40">System Deployment</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
          >
            {isAr ? 'حجز موعد' : 'Book a Demo'}
          </motion.h1>
        </header>

        <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] overflow-hidden relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-primary/10 w-full">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${(step/3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="p-12 md:p-20">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center space-y-8 py-10"
                >
                  <div className="w-24 h-24 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">{isAr ? 'تم الإرسال بنجاح' : 'Dispatched Successfully'}</h3>
                  <p className="text-xl opacity-60 uppercase font-medium max-w-md mx-auto">
                    {isAr ? 'سيتواصل معك مهندسونا قريباً للتشاور الفني.' : 'Our implementation architects will contact you shortly for a technical consultation.'}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setStep(1); }}
                    className="text-xs font-black uppercase tracking-widest hover:underline pt-8"
                  >
                    {isAr ? 'إرسال طلب آخر' : 'Send Another Request'}
                  </button>
                </motion.div>
              ) : (
                <div key={step}>
                  {step === 1 && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-12"
                    >
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Step 01 / 03</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter">{isAr ? 'من أنت؟' : 'Identification'}</h3>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Organization Name</label>
                          <input
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                            type="text"
                            placeholder={isAr ? 'اسم المنشأة' : 'Company Name'}
                            className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold uppercase text-lg"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Contact Person</label>
                            <input
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              type="text"
                              placeholder={isAr ? 'اسمك' : 'Your Name'}
                              className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold uppercase text-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Official Email</label>
                            <input
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              type="email"
                              placeholder={isAr ? 'البريد الإلكتروني' : 'Work Email'}
                              className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold uppercase text-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        disabled={!formData.company || !formData.email || !formData.name}
                        onClick={handleNext}
                        className="w-full py-8 bg-primary text-secondary rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-2xl"
                      >
                        {isAr ? 'التالي' : 'Continue'} {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-12"
                    >
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Step 02 / 03</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter">{isAr ? 'ماذا تحتاج؟' : 'Module Selection'}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {modules.map(m => (
                          <div
                            key={m.id}
                            onClick={() => toggleModule(m.label)}
                            className={`group p-6 rounded-2xl border cursor-pointer transition-all duration-500 flex items-center justify-between ${
                              formData.modules.includes(m.label)
                                ? 'bg-primary text-secondary border-primary shadow-xl'
                                : 'bg-primary/5 border-primary/10 hover:border-primary/40'
                            }`}
                          >
                            <span className="font-bold uppercase tracking-tight">{m.label}</span>
                            <div className={`w-6 h-6 border ${formData.modules.includes(m.label) ? 'border-secondary' : 'border-primary/20'} rotate-45 flex items-center justify-center`}>
                              {formData.modules.includes(m.label) && <div className="w-1.5 h-1.5 bg-secondary" />}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handlePrev}
                          className="flex-1 py-8 bg-secondary/5 text-secondary/40 rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-secondary/10 transition-all"
                        >
                          {isAr ? 'السابق' : 'Back'}
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={formData.modules.length === 0}
                          className="flex-[2] py-8 bg-primary text-secondary rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-2xl"
                        >
                          {isAr ? 'التالي' : 'Continue'} {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Step 03 / 03</span>
                          <h3 className="text-4xl font-black uppercase tracking-tighter">{isAr ? 'حجم النشر' : 'Project Scope'}</h3>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Enterprise Footprint</label>
                            <select
                              value={formData.scale}
                              onChange={e => setFormData({...formData, scale: e.target.value})}
                              className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold uppercase text-lg appearance-none cursor-pointer"
                            >
                              <option className="bg-primary text-secondary">50-100 Employees</option>
                              <option className="bg-primary text-secondary">100-500 Employees</option>
                              <option className="bg-primary text-secondary">500+ Employees</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Additional Requirements</label>
                            <textarea
                              value={formData.requirements}
                              onChange={e => setFormData({...formData, requirements: e.target.value})}
                              placeholder={isAr ? 'متطلبات إضافية' : 'Specific operational needs...'}
                              className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-2xl h-48 focus:outline-none focus:border-primary transition-all font-bold uppercase text-lg resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 py-8 bg-secondary/5 text-secondary/40 rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-secondary/10 transition-all"
                          >
                            {isAr ? 'السابق' : 'Back'}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] py-8 bg-primary text-secondary rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-2xl"
                          >
                            {isSubmitting ? (
                              <div className="w-6 h-6 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>{isAr ? 'إرسال الطلب' : 'Submit Request'}</span>
                                <Send size={20} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
          <Shield size={16} />
          <span>SSL Encrypted Secure Initialization</span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
