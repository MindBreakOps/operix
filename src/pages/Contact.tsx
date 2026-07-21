import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, AlertCircle, ChevronDown, Shield, Globe, Phone } from 'lucide-react';
import { XIcon, LinkedinIcon } from '../components/SocialIcons';
import CoreBackground from '../components/CoreBackground';

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

const servicesList = [
  "OPERIX HRIS",
  "OPERIX Operations",
  "OPERIX FMIS",
  "OPERIX Care HIS",
  "Facility & Parking Management",
  "VIP Valet & Event Operations",
  "Custom White-Label Engineering",
  "Other / Unlisted Requirement"
];

const Contact = () => {
  const { t } = useTranslation();
  // const { i18n } = useTranslation();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Saudi Arabia',
    company: '',
    architecture: 'OPERIX HRIS',
    customArchitecture: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const offices = [
    { city: 'Riyadh (HQ)', country: 'KSA', address: 'Digital City, HQ-01' },
    { city: 'Khartoum', country: 'Sudan', address: 'Regional Office' },
  ];

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, architecture: val });
    setShowCustomInput(val === "Other / Unlisted Requirement");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const finalArch = showCustomInput ? formData.customArchitecture : formData.architecture;
    const body = `NEW CONTACT LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nCompany: ${formData.company || 'Not provided'}\nTarget Architecture: ${finalArch}\nMessage: ${formData.message || 'No message provided.'}`;

    try {
      await fetch(OPS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'sendEmail',
          to: TARGET_EMAIL,
          subject: `New Lead: ${formData.company || formData.name}`,
          body
        })
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'Saudi Arabia',
        company: '',
        architecture: 'OPERIX HRIS',
        customArchitecture: '',
        message: ''
      });
      setShowCustomInput(false);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-48 pb-24 px-6 overflow-hidden relative">
      <CoreBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.8] uppercase mb-32 text-secondary"
              dangerouslySetInnerHTML={{ __html: t('contactTitleLarge') }} />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-24 items-start">
          {/* Left Column: Contact Info & Offices */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-24"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-12">Contact Infrastructure</h2>
              <div className="space-y-16">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold/40 mb-4">Central Gateway</p>
                  <a href={`mailto:${TARGET_EMAIL}`} className="text-3xl md:text-5xl font-black tracking-tighter hover:text-gold transition-colors duration-500 uppercase">
                    {TARGET_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold/40 mb-4">Secure Line</p>
                  <a href="tel:+966500823643" className="text-3xl md:text-5xl font-black tracking-tighter hover:text-gold transition-colors duration-500">
                    +966 500 823 643
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-12">Ecosystem Nodes</h2>
              <div className="grid sm:grid-cols-2 gap-16">
                {offices.map((office, i) => (
                  <div key={i} className="group">
                    <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-gold transition-colors duration-500 mb-2">{office.city}</h3>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-6 h-[1px] bg-gold/30" />
                       <p className="text-[10px] font-black text-gold/60 uppercase tracking-widest">{office.country}</p>
                    </div>
                    <p className="text-lg text-secondary/40 font-medium leading-snug uppercase tracking-tight">{office.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-12 border-t border-gold/10 pt-12">
              <a href="https://x.com/operixsolutions" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] hover:text-gold transition-all duration-500">
                <XIcon className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <span>X_FEED</span>
              </a>
              <a href="https://linkedin.com/company/operix" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] hover:text-gold transition-all duration-500">
                <LinkedinIcon className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <span>LI_LINK</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="bg-[#0a0f16] border border-gold/10 p-10 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Form HUD Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold" />

              <div className="absolute top-6 left-10 font-mono text-[8px] text-gold/20 tracking-[0.4em] uppercase">LEAD_GATEWAY // SECURE</div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <div className="w-24 h-24 bg-gold/10 border border-gold rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(197,160,89,0.2)]">
                      <CheckCircle className="text-gold w-10 h-10" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Parameters Received.</h3>
                    <p className="text-xl text-gold/60 font-black uppercase tracking-widest mb-12">Our implementation architects will contact you shortly.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary hover:text-gold transition-colors"
                    >
                      Establish New Command Link
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="OPERATIVE NAME"
                          className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Work Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="MAIL@DOMAIN.COM"
                          className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">{t('subPhone')}</label>
                        <div className="relative">
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+966 --- --- ---"
                            className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 pl-14 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                          />
                          <Phone size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">{t('subCountry')}</label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 pl-14 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest appearance-none cursor-pointer"
                          >
                             <option value="Saudi Arabia" className="bg-[#0a0f16]">Saudi Arabia</option>
                             <option value="United Arab Emirates" className="bg-[#0a0f16]">United Arab Emirates</option>
                             <option value="Sudan" className="bg-[#0a0f16]">Sudan</option>
                             <option value="Egypt" className="bg-[#0a0f16]">Egypt</option>
                             <option value="Other" className="bg-[#0a0f16]">Other Region</option>
                          </select>
                          <Globe size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gold/40" />
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Registered Entity</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="ORGANIZATION NAME"
                        className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Target Architecture</label>
                      <div className="relative">
                        <select
                          value={formData.architecture}
                          onChange={handleServiceChange}
                          className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 appearance-none cursor-pointer font-bold uppercase text-xs tracking-widest"
                        >
                          {servicesList.map(s => <option key={s} value={s} className="bg-[#0a0f16]">{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {showCustomInput && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Specify Requirement</label>
                          <input
                            required
                            type="text"
                            value={formData.customArchitecture}
                            onChange={(e) => setFormData({ ...formData, customArchitecture: e.target.value })}
                            placeholder="DIRECTIVE DETAILS"
                            className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-2">Tactical Message</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="MISSION SPECIFICATIONS..."
                        className="w-full bg-secondary/5 border border-gold/10 px-8 py-5 text-secondary focus:outline-none focus:border-gold transition-all duration-500 font-bold uppercase text-xs tracking-widest placeholder:opacity-10 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-gold text-[#05070a] font-black uppercase tracking-[0.6em] py-8 shadow-[0_0_50px_rgba(197,160,89,0.3)] transition-all duration-700 hover:bg-white active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-4 text-xs">
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-[#05070a]/30 border-t-[#05070a] rounded-full"
                          />
                        ) : (
                          <>
                            <span>Dispatch Parameters</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </button>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mt-6"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Dispatch Failed. Integrity Breach or Latency Detected.</span>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gold/20 pt-8">
                      <Shield className="w-4 h-4 text-gold/40" />
                      <span>SSL_ENCRYPTED // TRANSMISSION_SECURE</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
