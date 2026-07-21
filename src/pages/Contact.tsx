import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, ChevronDown, Shield } from 'lucide-react';
import { XIcon, LinkedinIcon } from '../components/SocialIcons';

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
  // const { t } = useTranslation();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    const body = `NEW CONTACT LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\nTarget Architecture: ${finalArch}\nMessage: ${formData.message || 'No message provided.'}`;

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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
        >
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-20 text-secondary">
            Get in<br />Touch.
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column: Contact Info & Offices */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] opacity-40 mb-10 text-secondary">Contact Info</h2>
              <div className="space-y-12">
                <div>
                  <p className="text-sm uppercase tracking-widest opacity-40 mb-3">Email</p>
                  <a href={`mailto:${TARGET_EMAIL}`} className="text-3xl md:text-5xl font-bold tracking-tighter hover:text-accent transition-colors duration-300">
                    {TARGET_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest opacity-40 mb-3">Phone</p>
                  <a href="tel:+966500823643" className="text-3xl md:text-5xl font-bold tracking-tighter hover:text-accent transition-colors duration-300">
                    +966 500 823 643
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] opacity-40 mb-10 text-secondary">Our Presence</h2>
              <div className="grid sm:grid-cols-2 gap-12">
                {offices.map((office, i) => (
                  <div key={i} className="group">
                    <h3 className="text-2xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors duration-300">{office.city}</h3>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-widest mb-2">{office.country}</p>
                    <p className="text-lg opacity-60 font-medium">{office.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-10">
              <a href="https://x.com/operixsolutions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors duration-300">
                <XIcon className="w-4 h-4" />
                <span>X</span>
              </a>
              <a href="https://linkedin.com/company/operix" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors duration-300">
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-secondary/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-secondary/10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-accent w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight uppercase mb-4">Dispatched!</h3>
                    <p className="text-lg opacity-60 mb-8 max-w-xs">Our architects will reach out to you shortly.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors placeholder:opacity-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Work Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors placeholder:opacity-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Organization Name"
                        className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors placeholder:opacity-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Target Architecture</label>
                      <div className="relative">
                        <select
                          value={formData.architecture}
                          onChange={handleServiceChange}
                          className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
                        >
                          {servicesList.map(s => <option key={s} value={s} className="bg-primary text-secondary">{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {showCustomInput && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Specify Requirement</label>
                          <input
                            required
                            type="text"
                            value={formData.customArchitecture}
                            onChange={(e) => setFormData({ ...formData, customArchitecture: e.target.value })}
                            placeholder="How can we help?"
                            className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors placeholder:opacity-20"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-4">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-4 text-secondary focus:outline-none focus:border-accent/50 transition-colors placeholder:opacity-20 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-primary text-secondary font-black uppercase tracking-[0.3em] py-6 rounded-2xl overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-50"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full"
                          />
                        ) : (
                          <>
                            <span>Dispatch Parameters</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-accent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </button>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mt-4"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Dispatch Failed. Please try again.</span>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-20 pt-4">
                      <Shield className="w-3 h-3" />
                      <span>SSL Encrypted Secure Submission</span>
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

