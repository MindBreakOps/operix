import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import type { Session, User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  authError: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const BootLoader = () => (
  <div className="fixed inset-0 bg-[#05070a] flex flex-col items-center justify-center z-[1000]">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center"
    >
      <Logo className="w-20 h-24 text-gold mb-12 animate-pulse shadow-[0_0_50px_rgba(197,160,89,0.2)]" />
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-gold"
          />
        </div>
        <span className="text-[10px] font-black text-gold uppercase tracking-[0.6em] ml-2">Initializing Core</span>
      </div>
    </motion.div>

    <div className="absolute bottom-12 font-mono text-[8px] text-secondary/20 uppercase tracking-[0.4em]">
      OPERIX_BOOT_SEQUENCE // V2.0.4
    </div>
  </div>
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const verifyAndSetSession = async (currentSession: Session | null) => {
      if (!currentSession) {
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const { error: adminError } = await supabase
          .from('operix_website_admins')
          .select('*')
          .eq('email', currentSession.user.email)
          .maybeSingle();

        if (adminError) {
           console.warn("Auth bypass or database lag detected.");
        }

        if (mounted) {
          setSession(currentSession);
          setUser(currentSession.user);
          setAuthError('');
          setLoading(false);

          if (window.location.pathname === '/login') {
            navigate('/admin', { replace: true });
          }
        }
      } catch (err: any) {
        console.error("Auth Exception:", err.message);
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      verifyAndSetSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        navigate('/login', { replace: true });
      } else if (event === 'SIGNED_IN') {
        setLoading(true);
        verifyAndSetSession(newSession);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      setAuthError(err.message);
      return { error: err };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      logout,
      isAuthenticating,
      authError
    }}>
      <AnimatePresence>
        {loading ? <BootLoader key="loader" /> : <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{children}</motion.div>}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
