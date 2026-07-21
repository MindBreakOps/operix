import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      setError(loginError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="bg-primary text-secondary min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-4 border-secondary p-12 bg-primary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
        >
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {t('loginTitle', 'SYSTEM LOGIN')}
            </h1>
            <div className="h-1 w-12 bg-secondary mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              {t('loginSub', 'Cloud Governance Core')}
            </p>
          </header>

          {error && (
            <div className="bg-primary text-secondary p-4 text-[10px] font-black uppercase tracking-widest mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-2 border-secondary p-4 text-sm font-bold focus:outline-none focus:bg-secondary/5 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-2 border-secondary p-4 text-sm font-bold focus:outline-none focus:bg-secondary/5 transition-colors"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-primary text-secondary py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Authorizing...' : t('loginAuth', 'Verify Authority Signature')}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-secondary/10 text-center">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-20">
              Secure Access Protocol v3.0
            </span>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default CmsLogin;
