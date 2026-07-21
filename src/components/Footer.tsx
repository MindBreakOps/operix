import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import DemoCTA from './DemoCTA';
import {
  Users, Settings, Stethoscope, FileCheck, MapPin,
  Globe, Shield, ChevronRight, BookOpen, Heart,
  MessageCircle
} from 'lucide-react';
import { FBIcon, IGIcon, YTIcon, XIcon } from './SocialIcons';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const portals = [
    { href: 'https://hris.operix-solutions.online', Icon: Users, labelKey: 'launchHRIS', subKey: 'launchHRIS' },
    { href: 'https://operations.operix-solutions.online', Icon: Settings, labelKey: 'launchOps', subKey: 'launchOps' },
    { href: 'https://care.operix-solutions.online', Icon: Stethoscope, labelKey: 'launchCare', subKey: 'launchCare' },
    { href: 'https://fmis.operix-solutions.online', Icon: FileCheck, labelKey: 'launchFMIS', subKey: 'launchFMIS' },
    { href: 'https://edu.operix-solutions.online', Icon: BookOpen, labelKey: 'launchEdu', subKey: 'launchEdu' },
    { href: 'https://hasad.operix-solutions.online', Icon: Heart, labelKey: 'launchHasad', subKey: 'launchHasad' },
  ];

  const marqueePortals = [...portals, ...portals];

  const corpNav = [
    { to: '/', labelKey: 'navHome' },
    { to: '/studio', labelKey: 'navStudio' },
    { to: '/services', labelKey: 'navServices' },
    { to: '/vision', labelKey: 'navVision' },
    { to: '/mobile-apps', labelKey: 'navMobileApps' },
    { to: '/manifesto', labelKey: 'navAbout' },
    { to: '/clients', labelKey: 'navClients' },
    { to: '/news', labelKey: 'navNews' },
    { to: '/qa', labelKey: 'navQA' },
    { to: '/contact', labelKey: 'navContact' },
  ];

  const legalNav = [
    { to: '/legal', labelKey: 'footer.legal_framework' },
    { to: '/legal', labelKey: 'terms_of_service' },
    { to: '/legal', labelKey: 'privacy_policy' },
    { to: '/legal', labelKey: 'sla_agreement' },
  ];

  const socials = [
    { href: 'https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C', Icon: MessageCircle, color: 'hover:text-gold' },
    { href: 'https://x.com/operixsolutions?s=11', Icon: XIcon, color: 'hover:text-gold' },
    { href: 'https://www.facebook.com/share/1BoQkRsiJB/', Icon: FBIcon, color: 'hover:text-gold' },
    { href: 'https://www.instagram.com/operix.solutions/', Icon: IGIcon, color: 'hover:text-gold' },
    { href: 'https://www.youtube.com/@Operix.Solutions', Icon: YTIcon, color: 'hover:text-gold' },
    { href: 'https://www.threads.com/@operix.solutions', Icon: Users, color: 'hover:text-gold' },
  ];

  return (
    <div className={`bg-primary text-secondary border-t border-gold/10 ${isAr ? 'font-arabic' : 'font-sans'}`}>
      <DemoCTA />

      <footer className="relative pt-20 pb-12 overflow-hidden">
        {/* Cloud Portals Marquee */}
        <div className="w-full border-y border-gold/10 bg-secondary/5 overflow-hidden mb-20">
          <div className="flex items-center">
            <div className="z-10 bg-primary px-8 py-4 border-r border-gold/10 flex items-center shrink-0 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold animate-pulse">
                {t('footer.portals_label')}
              </span>
            </div>
            <div className="flex-1 overflow-hidden relative" dir="ltr">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 py-4 px-4 whitespace-nowrap w-max"
              >
                {marqueePortals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 bg-secondary/5 border border-gold/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-500 rounded-sm"
                  >
                    <portal.Icon size={16} className="text-gold/70 group-hover:text-gold transition-colors" />
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-secondary group-hover:text-gold tracking-widest">{t(portal.labelKey)}</span>
                      <span className="text-[9px] text-secondary/40 group-hover:text-secondary/60 uppercase tracking-tighter">{t('portalSubtitle')}</span>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
            {/* Brand & Socials */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex flex-col">
                <Logo className="w-10 h-12 mb-4 text-gold" />
                <h3 className="text-4xl font-black tracking-tighter uppercase leading-none text-secondary">OPERIX</h3>
                <span className="text-[0.7rem] tracking-[0.4em] font-black text-gold uppercase mt-1">Solutions</span>
              </div>

              <p className="text-sm text-secondary/60 leading-relaxed border-l-2 border-gold pl-4 max-w-sm italic">
                {t('footer.brand_sub')}
              </p>

              <div className="flex flex-col gap-2 pt-4">
                <a href="mailto:info@operix-solutions.com" className="text-xs font-black tracking-widest text-gold hover:text-secondary transition-colors uppercase">info@operix-solutions.com</a>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-secondary/5 hover:bg-gold/10 rounded-none transition-all duration-300 group ${social.color}`}
                  >
                    <social.Icon className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all text-secondary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Directory */}
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">{t('footer.corp_dir')}</h4>
              <ul className="space-y-4">
                {corpNav.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="group flex items-center gap-2 text-xs font-bold text-secondary/50 hover:text-secondary transition-all uppercase tracking-widest">
                      <ChevronRight size={12} className="text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Presence */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">{t('footer.global_presence')}</h4>
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-xs font-black text-secondary uppercase tracking-widest">{t('footer.hq_label')}</span>
                  </div>
                  <div className="pl-7 border-l border-gold/10 space-y-2">
                    <p className="text-xs text-secondary/40 font-bold uppercase tracking-tighter">{t('footer.location_riyadh')}</p>
                    <a href="tel:+966500823643" className="text-[10px] font-mono text-secondary/60 hover:text-gold block transition-colors">+966 500 823 643</a>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-xs font-black text-secondary uppercase tracking-widest">{t('footer.regional_label')}</span>
                  </div>
                  <div className="pl-7 border-l border-gold/10 space-y-2">
                    <p className="text-xs text-secondary/40 font-bold uppercase tracking-tighter">{t('footer.location_khartoum')}</p>
                    <a href="mailto:sudan.office@operix-solutions.com" className="text-[10px] font-mono text-secondary/60 hover:text-gold block transition-colors">sudan.office@operix-solutions.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Status */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">{t('footer.legal_framework')}</h4>
              <ul className="space-y-4 mb-8">
                {legalNav.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="group flex items-center gap-2 text-xs font-bold text-secondary/50 hover:text-secondary transition-all uppercase tracking-widest">
                      <Shield size={12} className="text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {link.labelKey ? t(link.labelKey) : (link as any).label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 px-4 py-3 bg-secondary/5 border border-emerald-500/20 w-max shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600">
                  {t('footer.status_label')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gold/10 bg-secondary/5 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.3em]">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/40">
                {t('footer.secure_infra')}
              </span>
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <Globe size={12} className="text-secondary/30" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
