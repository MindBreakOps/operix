import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronRight, ChevronDown, Zap, Layers, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const navCategories = [
    {
      id: 'system',
      labelKey: 'navSystem',
      defaultLabel: 'SYSTEM',
      icon: Zap,
      links: [
        { labelKey: 'navHome', path: '/' },
        { labelKey: 'navStudio', path: '/studio' },
        { labelKey: 'navMobileApps', path: '/mobile-apps' },
        { labelKey: 'navServices', path: '/services' },
        { labelKey: 'navSubscription', path: '/subscription' },
      ]
    },
    {
      id: 'strategy',
      labelKey: 'navStrategy',
      defaultLabel: 'STRATEGY',
      icon: Layers,
      links: [
        { labelKey: 'navAbout', path: '/manifesto' },
        { labelKey: 'navVision', path: '/vision' },
        { labelKey: 'navLegal', path: '/legal' },
        { labelKey: 'navQA', path: '/qa' },
      ]
    },
    {
      id: 'network',
      labelKey: 'navNetwork',
      defaultLabel: 'NETWORK',
      icon: Share2,
      links: [
        { labelKey: 'navClients', path: '/clients' },
        { labelKey: 'navNews', path: '/news' },
        { labelKey: 'navContact', path: '/contact' },
        { labelKey: 'demoBtn', path: '/booking' },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-primary/90 backdrop-blur-2xl border-b border-gold/10 py-2 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`transition-all duration-700 ${isScrolled ? 'scale-75' : 'scale-100'}`}>
              <Logo className="w-12 h-14 text-secondary group-hover:text-gold transition-all duration-500 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tighter uppercase transition-all duration-700 ${isScrolled ? 'text-lg' : 'text-3xl'} text-secondary`}>OPERIX</span>
              <span className="text-[0.7rem] tracking-[0.5em] font-black text-gold uppercase opacity-100 mt-1">Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav Categories */}
          <div className="hidden lg:flex items-center gap-12">
            {navCategories.map((cat) => (
              <div
                key={cat.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`text-[0.75rem] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-3 py-6 ${
                  cat.links.some(link => isActive(link.path)) ? 'text-gold' : 'text-secondary/60 hover:text-gold'
                }`}>
                  <cat.icon size={14} className={cat.links.some(link => isActive(link.path)) ? 'text-gold' : 'text-gold/40'} />
                  {t(cat.labelKey, cat.defaultLabel)}
                  <ChevronDown size={10} className={`transition-transform duration-500 ${activeDropdown === cat.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-[-20px] w-64 bg-primary/95 backdrop-blur-3xl border border-gold/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-2 z-[100] mt-[-5px]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gold/20" />
                      {cat.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center justify-between px-6 py-4 text-[0.7rem] font-black uppercase tracking-[0.15em] transition-all duration-300 relative group/link ${
                            isActive(link.path) ? 'text-gold bg-gold/10' : 'text-secondary/60 hover:text-secondary hover:bg-white/5'
                          }`}
                        >
                          {t(link.labelKey)}
                          <ChevronRight size={12} className={`transition-all duration-500 ${isActive(link.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-gold'}`} />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#c5a059]" />
                  <span className="text-[9px] font-black text-gold uppercase tracking-[0.2em]">System: Active</span>
                </div>
                <span className="text-[7px] font-mono text-secondary/40 uppercase tracking-widest mt-1">v2.0.4 // KSA_RYD</span>
              </div>
              <div className="w-px h-8 bg-gold/10" />
              <Link
                to="/login"
                className="text-[0.65rem] font-black text-secondary hover:text-gold transition-colors uppercase tracking-[0.2em]"
              >
                {t('login')}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-[0.65rem] font-black text-gold border border-gold/30 px-5 py-2.5 hover:bg-gold hover:text-[#05070a] transition-all tracking-[0.2em] uppercase backdrop-blur-sm"
              >
                <Globe size={12} />
                {i18n.language === 'en' ? 'AR' : 'EN'}
              </button>
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-secondary hover:text-gold transition-colors p-3 bg-gold/5 border border-gold/10 rounded-none shadow-[0_0_20px_rgba(197,160,89,0.1)]"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#05070a]/95 backdrop-blur-xl z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-[#05070a] border-l border-gold/10 z-[70] lg:hidden p-8 md:p-16 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex flex-col leading-none">
                  <Logo className="w-14 h-16 text-gold mb-4" />
                  <span className="text-4xl font-black tracking-tighter uppercase text-secondary leading-none">OPERIX</span>
                  <span className="text-[0.8rem] tracking-[0.5em] font-black text-gold uppercase mt-2 opacity-100">Solutions</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-secondary hover:text-gold transition-all p-4 bg-gold/5 hover:bg-gold/10 rounded-full group border border-gold/20"
                  aria-label="Close menu"
                >
                  <X size={32} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>

              <div className="flex flex-col gap-12 py-8">
                {navCategories.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                       <cat.icon size={16} className="text-gold" />
                       <span className="text-xs font-black text-gold uppercase tracking-[0.5em]">{t(cat.labelKey, cat.defaultLabel)}</span>
                       <div className="h-px flex-1 bg-gold/10" />
                    </div>

                    <div className="flex flex-col gap-4 pl-8">
                      {cat.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center justify-between group transition-all duration-500 ${
                            isActive(link.path) ? 'text-gold' : 'text-secondary hover:text-gold hover:translate-x-4'
                          }`}
                        >
                          {t(link.labelKey)}
                          <ChevronRight size={32} className={`transition-all duration-500 ${isActive(link.path) ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 text-gold'}`} />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-16 space-y-8 border-t border-gold/10">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 bg-gold/5 border border-gold/20 text-xs font-black text-secondary py-5 uppercase tracking-[0.3em] hover:bg-gold/10 transition-all"
                  >
                    {t('login')}
                  </Link>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center justify-center gap-3 bg-gold text-[#05070a] border border-gold text-xs font-black py-5 uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)]"
                  >
                    <Globe size={16} />
                    {i18n.language === 'en' ? 'AR' : 'EN'}
                  </button>
                </div>

                <div className="flex items-center justify-between opacity-30 px-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary">
                    OPERIX CORE // V2.0.4
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
