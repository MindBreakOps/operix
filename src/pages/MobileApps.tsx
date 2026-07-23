import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, CheckCircle, Users, X, Settings, BookOpen, Zap, Home } from 'lucide-react';

const ProductNode = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 border border-secondary/20 rotate-45" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-secondary" />
    </div>
  </div>
);

const BackgroundPulse = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.03, 0.08, 0.03],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(30,45,64,0.3)_0%,transparent_70%)]"
    />
  </div>
);

const PhoneFrame = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative w-[300px] h-[600px] border-[8px] border-navy rounded-[3rem] p-1 flex flex-col bg-navy shadow-[0_50px_100px_-20px_rgba(30,45,64,0.4)] overflow-hidden group"
    >
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-navy rounded-b-3xl z-20" />
       <div
        style={{ transform: "translateZ(20px)" }}
        className="flex-grow bg-primary rounded-[2.2rem] flex items-center justify-center overflow-hidden relative"
       >
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/5 to-transparent z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
             <ProductNode />
             <div className="w-12 h-1 bg-navy/10 rounded-full animate-pulse" />
          </div>
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20 pointer-events-none" />
       </div>
       <div className="h-1 w-20 bg-secondary/20 mx-auto mt-4 mb-2 rounded-full" />
    </motion.div>
  );
};

const AppCard = ({ app, index, onLaunch }: { app: any, index: number, onLaunch: () => void }) => {
  const { t } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center p-16 rounded-[4rem] border border-secondary/5 hover:bg-white/5 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-2xl`}
    >
      {/* Lighting Effect Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(30,45,64,0.03), transparent 80%)`
        }}
      />

      <div className="flex-1 flex justify-center relative z-10 perspective-1000">
        <PhoneFrame />
      </div>

      <div className="flex-1 space-y-10 relative z-10">
        <div className="flex items-center gap-6">
          <motion.span
            whileHover={{ scale: 1.1, backgroundColor: '#d4af37', color: '#030612' }}
            className="px-4 py-2 border border-gold/20 text-xs font-black uppercase tracking-[0.2em] text-gold transition-colors cursor-default"
          >
            {app.badge}
          </motion.span>
          <div className="text-gold group-hover:scale-125 transition-transform duration-500">{app.icon}</div>
        </div>

        <div className="space-y-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-secondary">
            {app.title}
          </h2>
          <p className="text-sm opacity-60 uppercase font-black tracking-[0.3em]">{app.subtitle}</p>
        </div>

        <p className="text-2xl font-medium leading-tight opacity-70 max-w-xl">{app.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {app.capabilities.map((cap: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group/item"
            >
              <CheckCircle size={20} className="text-gold opacity-30 group-hover/item:opacity-100 transition-opacity" />
              <span className="text-xs font-black uppercase tracking-widest text-secondary/70"> {cap}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={onLaunch}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(30,45,64,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="group/btn flex items-center gap-6 px-12 py-6 bg-navy text-white font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <Play size={20} fill="currentColor" className="relative z-10" />
          <span className="relative z-10 text-sm">{t('launchExperience')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};


export default function MobileApps() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('ios');
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const apps: Record<string, any[]> = {
    ios: [
      { id: 'hasad-ios', title: t('mobileHasadTitle'), subtitle: t('mobileHasadSubtitle'), badge: t('mobileHasadBadge'), icon: <Home size={20} />, desc: t('mobileHasadDesc'), capabilities: [t('mobileHasadCap1'), t('mobileHasadCap2')], videoUrl: '/videos/hasad.MP4' },
      { id: 'ops-hr-ios', title: t('mobileHubTitle'), subtitle: t('mobileHubSubtitle'), badge: t('mobileHubBadge'), icon: <Settings size={20} />, desc: t('mobileHubDesc'), capabilities: [t('mobileHubCap1'), t('mobileHubCap2')], videoUrl: '/videos/ops-hr-mobile.MP4' },
    ],
    android: [
      { id: 'teacher-android', title: t('mobileTeacherTitle'), subtitle: t('mobileTeacherSubtitle'), badge: t('mobileTeacherBadge'), icon: <BookOpen size={20} />, desc: t('mobileTeacherDesc'), capabilities: [t('mobileTeacherCap1'), t('mobileTeacherCap2')], videoUrl: '/videos/opx-teacher-android.mov' },
      { id: 'hr-android', title: t('mobileHRTitle'), subtitle: t('mobileHRSubtitle'), badge: t('mobileHRBadge'), icon: <Users size={20} />, desc: t('mobileHRDesc'), capabilities: [t('mobileHRCap1'), t('mobileHRCap2')], videoUrl: '/videos/ops-hr-mobile.MP4' },
    ],
    pwa: [
      { id: 'ops-pwa', title: t('mobileOPSTitle'), subtitle: t('mobileOPSSubtitle'), badge: t('mobileOPSBadge'), icon: <Zap size={20} />, desc: t('mobileOPSDesc'), capabilities: [t('mobileOPSCap1'), t('mobileOPSCap2')], videoUrl: '/videos/ops-hr-mobile.MP4' },
    ]
  };

  const currentApps = apps[activeTab] || [];

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <ProductNode />
            <span className="text-sm font-black uppercase tracking-widest opacity-40">{t('navMobileApps')}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            {t('mobileMainTitle')}
          </motion.h1>
        </header>

        <div className="flex gap-12 mb-20 border-b border-primary/10">
          {['ios', 'android', 'pwa'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-2 border-gold text-gold' : 'text-secondary/40 hover:text-secondary'}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-32">
          {currentApps.map((app, index) => (
            <AppCard
              key={app.id}
              app={app}
              index={index}
              onLaunch={() => setSelectedApp(app)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-xl"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-secondary border border-primary/20 w-full max-w-4xl flex flex-col md:flex-row shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="w-full md:w-1/2 aspect-[9/16] bg-navy/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black uppercase tracking-tighter text-4xl">{t('mobilePreviewVideo')}</div>
                  <button onClick={() => setSelectedApp(null)} aria-label={t('close')} className="absolute top-4 right-4 bg-navy text-white p-2 rounded-full"><X size={20}/></button>
               </div>
               <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{selectedApp.title}</h2>
                  <p className="text-sm opacity-60 uppercase font-black mb-8 tracking-widest">{selectedApp.subtitle}</p>
                  <div className="space-y-4">
                    {selectedApp.capabilities.map((cap: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle size={24} className="text-gold opacity-40" />
                        <span className="text-xl font-medium">{cap}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
