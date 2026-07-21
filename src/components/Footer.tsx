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
    <div className={`bg-[#05070a] text-secondary border-t border-gold/10 ${isAr ? 'font-arabic' : 'font-sans'}`}>
      <DemoCTA />

      <footer className="relative pt-20 pb-12 overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />

        {/* Cloud Portals Marquee */}
        <div className="w-full border-y border-gold/10 bg-gold/5 overflow-hidden mb-20">
          <div className="flex items-center">
            <div className="z-10 bg-[#05070a] px-8 py-5 border-r border-gold/10 flex items-center shrink-0 shadow-2xl relative">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">
                {t('footer.portals_label')}
              </span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-gold" />
            </div>
            <div className="flex-1 overflow-hidden relative" dir="ltr">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 py-5 px-6 whitespace-nowrap w-max"
              >
                {marqueePortals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-8 py-4 bg-gold/5 border border-gold/10 hover:border-gold/50 hover:bg-gold/10 transition-all duration-700 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                    <portal.Icon size={18} className="text-gold/70 group-hover:text-gold transition-colors" />
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-secondary group-hover:text-gold tracking-[0.1em]">{t(portal.labelKey)}</span>
                      <span className="text-[9px] text-secondary/40 group-hover:text-secondary/60 uppercase tracking-widest mt-0.5">{t('portalSubtitle')}</span>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20">
            {/* Brand & Socials */}
            <div className="lg:col-span-4 space-y-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <Logo className="w-12 h-14 text-gold" />
                  <div className="flex flex-col">
                    <h3 className="text-4xl font-black tracking-tighter uppercase leading-none text-secondary">OPERIX</h3>
                    <span className="text-[0.8rem] tracking-[0.5em] font-black text-gold uppercase mt-1">Solutions</span>
                  </div>
                </div>
                <p className="text-sm text-secondary/40 leading-relaxed border-l-2 border-gold/30 pl-6 max-w-sm italic uppercase tracking-tight">
                  {t('footer.brand_sub')}
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/60 block">System Communication</span>
                <a href="mailto:info@operix-solutions.com" className="text-xs font-black tracking-[0.2em] text-secondary hover:text-gold transition-colors uppercase block">info@operix-solutions.com</a>
              </div>

              <div className="flex flex-wrap gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-gold/5 hover:bg-gold/20 border border-gold/10 transition-all duration-500 group ${social.color}`}
                  >
                    <social.Icon className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all text-secondary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Directory */}
            <div className="lg:col-span-2 space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">{t('footer.corp_dir')}</h4>
              <ul className="space-y-5">
                {corpNav.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="group flex items-center gap-3 text-[11px] font-black text-secondary/40 hover:text-gold transition-all uppercase tracking-[0.2em]">
                      <div className="w-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Presence */}
            <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">{t('footer.global_presence')}</h4>
              <div className="space-y-10">
                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-gold/5 border border-gold/10">
                      <MapPin size={14} className="text-gold" />
                    </div>
                    <span className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('footer.hq_label')}</span>
                  </div>
                  <div className="pl-12 space-y-3">
                    <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest">{t('footer.location_riyadh')}</p>
                    <a href="tel:+966500823643" className="text-[10px] font-mono text-gold/60 hover:text-gold block transition-colors tracking-widest">+966 500 823 643</a>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-gold/5 border border-gold/10">
                      <MapPin size={14} className="text-gold" />
                    </div>
                    <span className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('footer.regional_label')}</span>
                  </div>
                  <div className="pl-12 space-y-3">
                    <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest">{t('footer.location_khartoum')}</p>
                    <a href="mailto:sudan.office@operix-solutions.com" className="text-[10px] font-mono text-gold/60 hover:text-gold block transition-colors tracking-widest">sudan.office@operix-solutions.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Status */}
            <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">{t('footer.legal_framework')}</h4>
              <ul className="space-y-5 mb-12">
                {legalNav.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="group flex items-center gap-3 text-[11px] font-black text-secondary/40 hover:text-gold transition-all uppercase tracking-[0.2em]">
                      <div className="w-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                      {link.labelKey ? t(link.labelKey) : (link as any).label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-gold/5 border border-gold/10 relative group">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                      {t('footer.status_label')}
                    </span>
                    <span className="text-[8px] font-mono text-secondary/30 uppercase tracking-widest mt-1">Uptime: 99.999%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gold/10 bg-gold/5 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-secondary/20 uppercase tracking-[0.5em]">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gold/30">
                {t('footer.secure_infra')}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
              <div className="flex gap-2">
                <div className="w-1 h-1 bg-gold/30 rounded-full" />
                <div className="w-1 h-1 bg-gold/30 rounded-full" />
                <div className="w-1 h-1 bg-gold/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
