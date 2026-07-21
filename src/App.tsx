import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Manifesto from './pages/Manifesto';
import Studio from './pages/Studio';
import Services from './pages/Services';
import MobileApps from './pages/MobileApps';
import Clients from './pages/Clients';
import News from './pages/News';
import QA from './pages/QA';
import Legal from './pages/Legal';
import Vision from './pages/Vision';
import Subscription from './pages/Subscription';
import CmsLogin from './pages/CmsLogin';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import { AuthProvider } from './context/AuthContext';
import { Component, type ErrorInfo, type ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("KERNEL_PANIC:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 border border-red-500/50 rotate-45 flex items-center justify-center mb-12 animate-pulse">
             <div className="w-2 h-2 bg-red-500" />
          </div>
          <h1 className="text-2xl font-black text-red-500 uppercase tracking-[0.5em] mb-4">Kernel Panic</h1>
          <p className="text-secondary/40 font-mono text-xs uppercase tracking-widest max-w-md leading-relaxed">
            A critical system exception has occurred. The operational core has been halted to prevent data corruption.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-12 px-8 py-4 border border-gold/20 text-gold font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold hover:text-primary transition-all"
          >
            Re-Initialize System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/mobile-apps" element={<MobileApps />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/news" element={<News />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<CmsLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.dir = dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;

    // Optional: add a class to body for CSS targeting
    if (i18n.language === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [i18n.language]);

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-primary text-secondary selection:bg-gold selection:text-primary">
          <Navbar />
          <main className="flex-grow pt-20">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
