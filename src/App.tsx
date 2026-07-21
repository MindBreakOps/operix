import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.dir = dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;

    // Optional: add a class to body for CSS targeting
    document.body.className = i18n.language === 'ar' ? 'font-arabic' : 'font-sans';
  }, [i18n.language]);

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-primary text-white">
          <Navbar />
          <div className="flex-grow">
            <Routes>
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
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
