import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoreBackground from '../components/CoreBackground';

const Ticker = () => {
  const { t } = useTranslation();
  const items = [
    t('homeTicker1', 'Real-time Logistics'),
    t('homeTicker2', 'Enterprise Grade'),
    t('homeTicker3', 'Cloud Native'),
    t('homeTicker4', 'Global Infrastructure'),
    t('homeTicker5', 'Vision 2030 Ready')
  ];
  return (
    <div className="bg-primary py-8 overflow-hidden border-y border-gold/10 relative z-10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-gold font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-4">
            <div className="w-1 h-1 bg-gold rounded-full" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};


const MatrixText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text || "");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&";

  useEffect(() => {
    if (!text) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const NarrativeSection = ({ title, body, image, reverse = false }: { title: string, body: string, image: string, reverse?: boolean }) => {
  return (
    <section className="py-64 px-6 overflow-hidden relative">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-32 relative z-10`}>
        <div className="flex-1 space-y-16">
          <motion.div
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-px bg-gold" />
              <span className="text-gold font-black tracking-[0.6em] uppercase text-[12px]">Perspective</span>
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-secondary mb-16">
              <MatrixText text={title} />
            </h2>
            <p className="text-2xl md:text-3xl text-secondary/60 leading-relaxed font-medium tracking-tighter uppercase">
              {body}
            </p>
          </motion.div>
        </div>
        <div className="flex-1 relative group">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
          >
            <img src={image} alt={title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]" />
          </motion.div>
          {/* HUD Overlay */}
          <div className="absolute -top-8 -right-8 w-48 h-48 border-t-[1px] border-r-[1px] border-gold/30 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 border-b-[1px] border-l-[1px] border-gold/30 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute top-12 left-12 font-mono text-[10px] text-gold/60 tracking-[0.8em] uppercase pointer-events-none bg-[#05070a]/80 px-4 py-2 backdrop-blur-md border border-gold/10">
            STRATEGIC_VIEW // 0x00{title.length}
          </div>
        </div>
      </div>
    </section>
  );
};

const VisitorCounters = () => {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    KSA: 12402,
    UAE: 8210,
    USA: 4105,
    UK: 3200,
    SIN: 1850,
    SUD: 2400
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (Math.random() > 0.7) {
            next[key] += Math.floor(Math.random() * 5) + 1;
          }
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const data = [
    { key: 'KSA', label: t('nodeKSA'), meta: "PRIMARY_GATEWAY" },
    { key: 'UAE', label: t('nodeUAE'), meta: "REGIONAL_EDGE" },
    { key: 'USA', label: t('nodeUSA'), meta: "TRANSATLANTIC_SYNC" },
    { key: 'UK', label: t('nodeUK'), meta: "EUROPEAN_RELAY" },
    { key: 'SIN', label: t('nodeSingapore'), meta: "PACIFIC_NODE" },
    { key: 'SUD', label: t('nodeSudan'), meta: "DEVELOPMENT_CORE" },
  ];

  return (
    <section className="py-64 px-6 bg-primary text-secondary overflow-hidden relative border-y border-gold/10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold font-mono text-[10px] tracking-[0.6em] uppercase">{t('visitorTelemetryTitle')}</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-secondary">
              SYSTEM<br />LOAD.
            </h2>
          </div>
          <div className="text-right font-mono text-[12px] text-gold/40 tracking-[0.3em] leading-relaxed uppercase bg-gold/5 p-8 border-l-2 border-gold backdrop-blur-md">
            {t('visitorTelemetrySub')}<br />
            <span className="text-gold">{t('activeSessions')}: 1,402</span><br />
            {t('totalDataFlow')}: 4.2 TB/S
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-12 border border-gold/10 bg-gold/5 backdrop-blur-xl relative group hover:border-gold/40 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 p-6 font-mono text-[9px] text-gold/30 tracking-widest uppercase">
                {item.meta}
              </div>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-3 h-3 rounded-full bg-gold animate-pulse shadow-[0_0_20px_#c5a059]" />
                <span className="text-sm font-black uppercase tracking-[0.3em] text-secondary/80 group-hover:text-gold transition-colors">{item.label}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-7xl font-black tracking-tighter text-secondary group-hover:text-glow transition-all duration-700">
                  {counts[item.key].toLocaleString()}
                </span>
                <span className="text-[12px] font-mono text-gold/50 uppercase tracking-[0.4em] mb-4">REQ_SEC</span>
              </div>
              <div className="mt-12 h-[2px] w-full bg-secondary/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 3, delay: i * 0.2 }}
                  className="h-full bg-gold/40 shadow-[0_0_10px_#c5a059]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Micro-animations */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
         {[...Array(30)].map((_, i) => (
           <motion.div
             key={i}
             animate={{
               x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
               y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
               opacity: [0, 0.8, 0]
             }}
             transition={{
               duration: Math.random() * 15 + 10,
               repeat: Infinity,
               ease: "linear"
             }}
             className="absolute w-[1px] h-[1px] bg-gold shadow-[0_0_15px_#c5a059]"
           />
         ))}
      </div>
    </section>
  );
};

const NodeEcosystem = () => {
  const { t } = useTranslation();
  const nodes = [
    { id: 'OPS', name: t('logistics'), x: 0 },
    { id: 'HRIS', name: t('capital'), x: 25 },
    { id: 'FMIS', name: t('fiscal'), x: 50 },
    { id: 'Care', name: t('health'), x: 75 },
    { id: 'Edu', name: t('academic'), x: 100 },
  ];

  return (
    <section className="py-48 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center mb-24 text-center">
        <div className="w-px h-24 bg-gold/20 mb-8" />
        <h2 className="text-4xl font-black uppercase tracking-widest text-secondary mb-4">{t('homeNodeEcosystem')}</h2>
        <p className="text-gold/60 font-bold uppercase tracking-[0.3em] text-[10px]">{t('homeNodeEcosystemSub')}</p>
      </div>

      <div className="relative py-20 px-12 border-y border-gold/10">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold/10 -translate-y-1/2" />

        <div className="relative flex justify-between items-center max-w-5xl mx-auto">
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center group cursor-pointer"
            >
              {/* Vertical link */}
              <div className="w-px h-12 bg-gold/10 mb-4 group-hover:bg-gold transition-colors" />

              <div className="w-16 h-16 border border-gold/20 rotate-45 flex items-center justify-center bg-transparent group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                <span className="text-xs font-black -rotate-45 group-hover:text-gold text-secondary">{node.id}</span>
              </div>

              <div className="mt-12 text-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="block text-[10px] font-black uppercase tracking-widest mb-1 text-secondary">{node.name}</span>
                <span className="block text-[8px] font-mono text-gold/40">v2.0.4</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OperationalLayers = () => {
  const { t } = useTranslation();
  const layers = [
    { title: t('opLayer1Title'), body: t('opLayer1Body'), icon: "01" },
    { title: t('opLayer2Title'), body: t('opLayer2Body'), icon: "02" },
    { title: t('opLayer3Title'), body: t('opLayer3Body'), icon: "03" },
    { title: t('opLayer4Title'), body: t('opLayer4Body'), icon: "04" },
  ];

  return (
    <section className="py-64 px-6 relative overflow-hidden bg-[#0a0f16]">
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-16 h-px bg-gold" />
             <span className="text-gold font-black tracking-[1em] uppercase text-[10px]">{t('opLayerSub')}</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-24 text-secondary">
             {t('opLayerTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
             {layers.map((layer, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-12 bg-[#05070a] hover:bg-gold/5 transition-colors duration-500 group"
               >
                 <span className="text-6xl font-black text-gold/10 group-hover:text-gold/30 transition-colors duration-500 mb-8 block font-mono">
                    {layer.icon}
                 </span>
                 <h3 className="text-2xl font-black uppercase tracking-tight text-secondary mb-6">{layer.title}</h3>
                 <p className="text-secondary/40 text-lg leading-relaxed font-medium uppercase tracking-tight group-hover:text-secondary/60 transition-colors">
                    {layer.body}
                 </p>
                 <div className="mt-12 w-8 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
               </motion.div>
             ))}
          </div>
       </div>
       {/* Decorative Side Text */}
       <div className="absolute top-1/2 -right-32 -translate-y-1/2 rotate-90 opacity-5 pointer-events-none">
          <span className="text-[15rem] font-black text-gold uppercase tracking-tighter">LAYERS</span>
       </div>
    </section>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const words = [t('think'), t('orchestrate'), t('scale')];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="bg-primary text-secondary min-h-screen overflow-x-hidden relative"
    >
      {/* Custom Reactive Cursor */}
      <motion.div
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-gold/40 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      >
        <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_#c5a059]" />
      </motion.div>

      <CoreBackground />

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="px-6 py-32 md:py-64 max-w-7xl mx-auto relative min-h-screen flex flex-col justify-center"
      >
        <div className="flex flex-col gap-0">
          {words.map((word, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`text-[9rem] md:text-[18rem] font-black tracking-tighter leading-[0.7] uppercase
                ${i === 1 ? 'text-secondary ml-[0.1em]' : 'text-transparent bg-clip-text bg-gradient-to-b from-secondary to-secondary/10'}
              `}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          className="mt-24 max-w-3xl"
        >
          <div className="flex items-center gap-8 mb-12">
            <div className="w-24 h-px bg-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.8em] text-gold">{t('homeVision2030')}</span>
          </div>
          <p className="text-4xl md:text-6xl font-black tracking-tighter text-secondary leading-[0.9] uppercase">
            {t('heroSub')}
          </p>
        </motion.div>

        {/* Cinematic accent */}
        <div className="absolute top-0 right-12 h-full w-px bg-gold/10 hidden lg:block" />
        <div className="absolute top-1/2 right-32 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
           <span className="text-[30rem] font-black uppercase tracking-tighter text-gold/20 rotate-90 origin-center select-none">OPERIX</span>
        </div>
      </motion.section>

      {/* Horizontal Ticker */}
      <Ticker />

      {/* Narrative Section 1 */}
      <NarrativeSection
        title={t('homeNarrative1Title')}
        body={t('homeNarrative1Body')}
        image="/assets/images/hero-industrial.jpg"
      />

      <OperationalLayers />

      {/* Narrative Section 2 */}
      <NarrativeSection
        title={t('homeNarrative2Title')}
        body={t('homeNarrative2Body')}
        image="/assets/images/tech-infra.jpg"
        reverse
      />

      <NodeEcosystem />

      {/* Narrative Section 3 */}
      <NarrativeSection
        title={t('homeNarrative3Title')}
        body={t('homeNarrative3Body')}
        image="/assets/images/ai-logic.jpg"
      />

      <VisitorCounters />

      {/* Cinematic Section */}
      <section className="bg-[#05070a] text-secondary py-64 px-6 overflow-hidden relative border-y border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32 relative z-10">
          <div className="flex-1">
             <div className="flex items-center gap-6 mb-12">
               <div className="w-16 h-px bg-gold" />
               <h3 className="text-gold font-black tracking-[0.6em] uppercase text-sm">{t('homeStrategicGov')}</h3>
             </div>
             <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-16">
               {t('homeMenaGrowth')}
             </h2>
             <p className="text-3xl text-secondary/40 leading-relaxed font-medium mb-24 uppercase tracking-tighter">
               {t('homeMenaGrowthDesc')}
             </p>
             <Link to="/manifesto" className="inline-block border-2 border-gold text-gold px-16 py-8 font-black uppercase tracking-[0.5em] text-sm hover:bg-gold hover:text-primary transition-all duration-700 shadow-[0_0_80px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95">
               {t('homeOurManifesto')}
             </Link>
          </div>
          <div className="flex-1 relative">
             <div className="w-full aspect-square border border-gold/20 flex items-center justify-center rotate-45 group overflow-hidden bg-gold/5">
                <motion.div
                  animate={{ rotate: -45 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-3/4 h-3/4 border border-gold/20 flex items-center justify-center"
                >
                   <div className="w-1/2 h-1/2 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-1000">
                      <div className="w-1/4 h-1/4 bg-gold animate-pulse shadow-[0_0_40px_#c5a059]" />
                   </div>
                </motion.div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(197,160,89,0.15)_0%,transparent_70%)]" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-16 opacity-30 font-mono text-[12px] tracking-[1em] text-gold hidden md:block">
           {t('homeDeploymentCore')}
        </div>
      </section>

      {/* Bottom Spacer/Decorative */}
      <section className="py-64 flex justify-center overflow-hidden bg-primary relative">
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0.8, 1], [0, 720]),
            scale: useTransform(scrollYProgress, [0.8, 1], [0.8, 2]),
            opacity: useTransform(scrollYProgress, [0.8, 1], [0.03, 0.15])
          }}
          className="relative w-[1000px] h-[1000px] pointer-events-none"
        >
          <div className="absolute inset-0 border-[4px] border-gold rotate-45" />
          <div className="absolute inset-0 border-[2px] border-secondary" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-gold shadow-[0_0_60px_#c5a059]" />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
