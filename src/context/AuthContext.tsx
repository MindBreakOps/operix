import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import type { Session, User } from '@supabase/supabase-js';

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
        const { data: adminData, error: adminError } = await supabase
          .from('operix_website_admins')
          .select('*')
          .eq('email', currentSession.user.email)
          .maybeSingle();

        if (adminError) throw new Error(`[DB Error]: ${adminError.message}`);

        if (!adminData) {
          await supabase.auth.signOut();
          throw new Error(`[Access Denied]: ${currentSession.user.email} is not authorized.`);
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
        console.error("Website Security Block:", err.message);
        if (mounted) {
          setSession(null);
          setUser(null);
          setAuthError(err.message);
          setLoading(false);
          navigate('/login', { replace: true });
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
