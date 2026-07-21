import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronRight, ChevronDown } from 'lucide-react';
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

  const navLinks = [
    { labelKey: 'navHome', path: '/' },
    { labelKey: 'navStudio', path: '/studio' },
    { labelKey: 'navMobileApps', path: '/mobile-apps' },
    { labelKey: 'navAbout', path: '/manifesto' },
    {
      labelKey: 'navNetwork',
      path: '#',
      children: [
        { labelKey: 'navServices', path: '/services' },
        { labelKey: 'navClients', path: '/clients' },
        { labelKey: 'navNews', path: '/news' },
      ]
    },
    { labelKey: 'navQA', path: '/qa' },
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
              <Logo className="w-10 h-12 text-gold group-hover:text-secondary transition-colors duration-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black tracking-tighter uppercase transition-all duration-700 ${isScrolled ? 'text-lg' : 'text-2xl'} text-secondary`}>OPERIX</span>
              <span className="text-[0.6rem] tracking-[0.4em] font-black text-gold uppercase opacity-80">Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.labelKey}
                className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.labelKey)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className={`text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1 py-4 ${
                    link.children.some(child => isActive(child.path)) ? 'text-gold' : 'text-secondary hover:text-gold'
                  }`}>
                    {t(link.labelKey)}
                    <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === link.labelKey ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group py-4 ${
                      isActive(link.path) ? 'text-gold' : 'text-secondary hover:text-gold'
                    }`}
                  >
                    {t(link.labelKey)}
                    <span className={`absolute bottom-3 left-0 w-full h-px bg-gold transition-transform duration-500 origin-left ${
                      isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                )}

                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.labelKey && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-48 bg-primary border border-gold/20 shadow-2xl py-2 z-[100]"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-6 py-3 text-[0.6rem] font-black uppercase tracking-[0.1em] transition-colors ${
                              isActive(child.path) ? 'text-gold bg-white/5' : 'text-secondary hover:text-gold hover:bg-white/5'
                            }`}
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
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
              className="lg:hidden text-secondary hover:text-gold transition-colors p-2 bg-white/5 rounded-none"
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
              className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-primary border-l border-gold/20 z-[70] lg:hidden p-8 md:p-12 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-black tracking-tighter uppercase text-secondary leading-none">OPERIX</span>
                  <span className="text-[0.7rem] tracking-[0.4em] font-black text-gold uppercase opacity-100 mt-1">Solutions</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-secondary hover:text-gold transition-all p-3 bg-white/5 hover:bg-white/10 rounded-full group"
                  aria-label="Close menu"
                >
                  <X size={28} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto py-8 scrollbar-hide">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.labelKey}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {link.children ? (
                      <div className="flex flex-col gap-4">
                        <span className="text-xs font-black text-gold/50 uppercase tracking-[0.3em] mb-2">{t(link.labelKey)}</span>
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-4xl md:text-5xl font-black uppercase tracking-tighter flex items-center justify-between group transition-all ${
                              isActive(child.path) ? 'text-gold' : 'text-secondary hover:text-gold hover:pl-4'
                            }`}
                          >
                            {t(child.labelKey)}
                            <ChevronRight size={32} className={`transition-all duration-500 ${isActive(child.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-4xl md:text-5xl font-black uppercase tracking-tighter flex items-center justify-between group transition-all ${
                          isActive(link.path) ? 'text-gold' : 'text-secondary hover:text-gold hover:pl-4'
                        }`}
                      >
                        {t(link.labelKey)}
                        <ChevronRight size={32} className={`transition-all duration-500 ${isActive(link.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-black text-secondary hover:text-gold transition-colors uppercase tracking-[0.3em] pl-2"
                >
                  {t('login')}
                </Link>
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-4 text-sm font-black text-gold border-2 border-gold/30 px-8 py-6 hover:bg-gold hover:text-navy transition-all tracking-[0.3em] uppercase shadow-lg active:scale-95"
                >
                  <Globe size={20} />
                  {i18n.language === 'en' ? t('arabic_version') : t('english_version')}
                </button>
                <div className="flex items-center justify-between opacity-20 pt-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary">
                    OPERIX CORE // V2.0.1
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
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
