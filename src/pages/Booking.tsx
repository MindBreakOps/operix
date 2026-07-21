import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, Shield, Zap, ArrowRight, ArrowLeft, ChevronDown, Globe, Phone } from 'lucide-react';
import CoreBackground from '../components/CoreBackground';

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

const Booking = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Saudi Arabia',
    modules: [] as string[],
    scale: '50-100 Employees',
    requirements: ''
  });

  const modulesList = [
    { id: 'fmis', label: isAr ? 'نظام FMIS' : 'FMIS Financials' },
    { id: 'hris', label: isAr ? 'نظام HRIS' : 'HRIS Human Capital' },
    { id: 'ops', label: isAr ? 'نظام OPS' : 'OPS Operations' },
    { id: 'care', label: isAr ? 'نظام Care' : 'Care Healthcare' },
    { id: 'edu', label: isAr ? 'نظام Edu' : 'Edu Education' },
    { id: 'hasad', label: isAr ? 'نظام Hasad' : 'Hasad Property' },
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
    const body = `NEW BOOKING REQUEST\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nCompany: ${formData.company}\nModules: ${formData.modules.join(', ')}\nScale: ${formData.scale}\nRequirements: ${formData.requirements || 'None'}`;

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary text-secondary min-h-screen pt-48 pb-24 px-6 relative overflow-hidden"
    >
      <CoreBackground />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Zap size={24} className="text-gold" />
            <span className="text-gold font-black uppercase tracking-[0.6em] text-[10px]">Strategic Deployment</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.75] mb-12"
          >
            {isAr ? 'حجز موعد' : 'Book a Demo'}
          </motion.h1>
          <div className="h-px w-32 bg-gold shadow-[0_0_20px_#c5a059]" />
        </header>

        <div className="bg-[#0a0f16] border border-gold/10 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          {/* HUD Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gold/5">
            <motion.div
              className="h-full bg-gold shadow-[0_0_15px_#c5a059]"
              animate={{ width: `${(step/3) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="p-12 md:p-24">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center space-y-12 py-16"
                >
                  <div className="w-32 h-32 bg-gold/10 border border-gold text-gold rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(197,160,89,0.3)]">
                    <CheckCircle size={64} />
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-secondary leading-none">
                    {isAr ? 'تم الإرسال بنجاح' : 'Dispatched Successfully'}
                  </h3>
                  <p className="text-2xl text-gold/60 uppercase tracking-widest font-black leading-relaxed max-w-2xl mx-auto">
                    {isAr ? 'سيتواصل معك مهندسونا قريباً للتشاور الفني.' : 'Our implementation architects will contact you shortly for a technical consultation.'}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setStep(1); }}
                    className="inline-block mt-12 text-xs font-black uppercase tracking-[0.5em] text-gold hover:text-white transition-colors"
                  >
                    {isAr ? 'إرسال طلب آخر' : 'Initialize New Request'}
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
                      className="space-y-16"
                    >
                      <div className="space-y-4">
                        <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Step 01 / 03</span>
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-secondary leading-none">
                           {t('bookingStep1')}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Registered Entity</label>
                          <div className="relative">
                            <input
                              required
                              value={formData.company}
                              onChange={e => setFormData({...formData, company: e.target.value})}
                              type="text"
                              placeholder={isAr ? 'اسم المنشأة' : 'COMPANY_NAME'}
                              className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Operational Contact</label>
                          <input
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            type="text"
                            placeholder={isAr ? 'اسمك' : 'YOUR_NAME'}
                            className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Corporate Email</label>
                          <input
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            type="email"
                            placeholder={isAr ? 'البريد الإلكتروني' : 'OFFICIAL_MAIL@ENTITY.COM'}
                            className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">{t('subPhone')}</label>
                          <div className="relative">
                            <input
                              required
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              type="tel"
                              placeholder="+966 --- --- ---"
                              className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10 pl-14"
                            />
                            <Phone size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40" />
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">{t('subCountry')}</label>
                          <div className="relative">
                            <select
                              value={formData.country}
                              onChange={e => setFormData({...formData, country: e.target.value})}
                              className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest appearance-none cursor-pointer pl-14"
                            >
                               <option value="Saudi Arabia" className="bg-[#0a0f16]">Saudi Arabia</option>
                               <option value="United Arab Emirates" className="bg-[#0a0f16]">United Arab Emirates</option>
                               <option value="Sudan" className="bg-[#0a0f16]">Sudan</option>
                               <option value="Egypt" className="bg-[#0a0f16]">Egypt</option>
                               <option value="Qatar" className="bg-[#0a0f16]">Qatar</option>
                               <option value="Other" className="bg-[#0a0f16]">Other Region</option>
                            </select>
                            <Globe size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40" />
                            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-gold" />
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!formData.company || !formData.email || !formData.name || !formData.phone}
                        onClick={handleNext}
                        className="w-full py-8 bg-gold text-[#05070a] font-black text-xs uppercase tracking-[0.6em] hover:bg-white hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all duration-700 flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                      >
                        {isAr ? 'التالي' : 'Initialize Command'} {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-16"
                    >
                      <div className="space-y-4">
                        <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Step 02 / 03</span>
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-secondary leading-none">
                           {t('bookingStep2')}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {modulesList.map(m => (
                          <div
                            key={m.id}
                            onClick={() => toggleModule(m.label)}
                            className={`group p-8 border transition-all duration-700 flex items-center justify-between cursor-pointer ${
                              formData.modules.includes(m.label)
                                ? 'bg-gold/10 text-secondary border-gold shadow-[0_0_30px_rgba(197,160,89,0.2)]'
                                : 'bg-secondary/5 border-gold/10 hover:border-gold/40'
                            }`}
                          >
                            <span className="font-black uppercase tracking-widest text-xs">{m.label}</span>
                            <div className={`w-8 h-8 border ${formData.modules.includes(m.label) ? 'border-gold' : 'border-gold/20'} rotate-45 flex items-center justify-center transition-all duration-500`}>
                              {formData.modules.includes(m.label) && <div className="w-2 h-2 bg-gold shadow-[0_0_10px_#c5a059]" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row gap-6">
                        <button
                          onClick={handlePrev}
                          className="flex-1 py-8 bg-secondary/5 border border-gold/10 text-secondary/40 font-black text-xs uppercase tracking-[0.4em] hover:bg-secondary/10 transition-all duration-500"
                        >
                          {isAr ? 'السابق' : 'Recall Parameter'}
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={formData.modules.length === 0}
                          className="flex-[2] py-8 bg-gold text-[#05070a] font-black text-xs uppercase tracking-[0.6em] hover:bg-white hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all duration-700 flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                        >
                          {isAr ? 'التالي' : 'Confirm Architecture'} {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
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
                      <form onSubmit={handleSubmit} className="space-y-16">
                        <div className="space-y-4">
                          <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Step 03 / 03</span>
                          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-secondary leading-none">
                             {t('bookingStep3')}
                          </h3>
                        </div>

                        <div className="space-y-12">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Operational Footprint</label>
                            <div className="relative">
                              <select
                                value={formData.scale}
                                onChange={e => setFormData({...formData, scale: e.target.value})}
                                className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest appearance-none cursor-pointer"
                              >
                                <option className="bg-[#0a0f16]">1-50 OPERATIVES</option>
                                <option className="bg-[#0a0f16]">51-200 OPERATIVES</option>
                                <option className="bg-[#0a0f16]">201-500 OPERATIVES</option>
                                <option className="bg-[#0a0f16]">500+ OPERATIVES</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Special Requirements // Tactical Directives</label>
                            <textarea
                              value={formData.requirements}
                              onChange={e => setFormData({...formData, requirements: e.target.value})}
                              placeholder={isAr ? 'متطلبات إضافية' : 'SPECIFY TARGET PARAMETERS...'}
                              className="w-full px-8 py-6 bg-secondary/5 border border-gold/10 text-secondary h-48 focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest resize-none placeholder:opacity-10"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 py-8 bg-secondary/5 border border-gold/10 text-secondary/40 font-black text-xs uppercase tracking-[0.4em] hover:bg-secondary/10 transition-all duration-500"
                          >
                            {isAr ? 'السابق' : 'Review Logic'}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] py-8 bg-gold text-[#05070a] font-black text-xs uppercase tracking-[0.6em] hover:bg-white hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 transition-all duration-700 flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                          >
                            {isSubmitting ? (
                              <div className="w-6 h-6 border-2 border-[#05070a]/30 border-t-[#05070a] rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>{isAr ? 'إرسال المعايير' : 'Dispatch Parameters'}</span>
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

        {/* Security Meta */}
        <div className="mt-16 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-gold/20">
          <Shield size={16} className="text-gold/40" />
          <span>SSL_ENCRYPTED // COMMAND_UPLINK_SECURE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
