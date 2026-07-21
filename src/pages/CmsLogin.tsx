import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertTriangle } from 'lucide-react';
import CoreBackground from '../components/CoreBackground';
import Logo from '../components/Logo';

const CmsLogin = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: loginError } = await login(email, password);
    if (loginError) {
      setError(loginError.message || "UNAUTHORIZED_ACCESS_DENIED");
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <CoreBackground />

      <div className="max-w-lg w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0a0f16] border border-gold/10 p-12 md:p-20 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Terminal Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

          <header className="mb-16 text-center">
            <div className="flex justify-center mb-8">
               <Logo className="w-16 h-20 text-gold shadow-[0_0_30px_rgba(197,160,89,0.2)]" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
               <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
               <h1 className="text-2xl font-black uppercase tracking-[0.5em] text-secondary">
                 {t('loginTitle', 'SYSTEM LOGIN')}
               </h1>
            </div>
            <div className="h-px w-24 bg-gold/20 mx-auto mb-6" />
            <div className="flex items-center justify-center gap-2">
               <Shield size={12} className="text-gold/40" />
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/40">
                 {t('loginSub', 'Cloud Governance Core')} // SECURE_NODE
               </span>
            </div>
          </header>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-6 flex items-center gap-4 mb-10"
              >
                <AlertTriangle className="text-red-500 shrink-0" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                   Error: {error}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 ml-2">
                 <User size={12} className="text-gold/40" />
                 <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60">Operative Identity</label>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL_ADDRESS"
                className="w-full bg-secondary/5 border border-gold/10 p-6 text-xs font-black tracking-widest focus:outline-none focus:border-gold transition-all duration-500 text-secondary placeholder:opacity-10 uppercase"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 ml-2">
                 <Lock size={12} className="text-gold/40" />
                 <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60">Authority Key</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-secondary/5 border border-gold/10 p-6 text-xs font-black tracking-widest focus:outline-none focus:border-gold transition-all duration-500 text-secondary placeholder:opacity-10"
                required
              />
            </div>

            <button
              disabled={loading}
              className="group relative w-full bg-gold text-[#05070a] py-6 font-black uppercase tracking-[0.6em] text-[10px] shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all duration-700 hover:bg-white active:scale-[0.98] disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {loading ? 'AUTHORIZING...' : t('loginAuth', 'Verify Authority Signature')}
              </span>
            </button>
          </form>

          <footer className="mt-16 pt-8 border-t border-gold/10 text-center flex flex-col gap-3">
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-secondary/20">
              STRICT_ENCRYPTION_MODE // BYOK_ENABLED
            </span>
            <div className="flex justify-center gap-2 opacity-10">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-gold rounded-full" />
               ))}
            </div>
          </footer>
        </motion.div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
           <span className="text-[20rem] font-black uppercase tracking-tighter text-gold">SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default CmsLogin;
