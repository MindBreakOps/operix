import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="bg-primary py-6 overflow-hidden border-y border-gold/10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-gold font-black uppercase tracking-[0.4em] text-xs">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const BackgroundPulse = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.03, 0.08, 0.03],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(197,160,89,0.2)_0%,transparent_70%)]"
    />
  </div>
);

const GlobalTelemetry = () => {
  const { t } = useTranslation();
  const nodes = [
    { x: '20%', y: '30%', label: 'LDN_01' },
    { x: '45%', y: '40%', label: 'RYD_01' },
    { x: '50%', y: '35%', label: 'DXB_01' },
    { x: '75%', y: '50%', label: 'SIN_01' },
    { x: '15%', y: '60%', label: 'NYC_01' },
  ];

  return (
    <section className="py-32 px-6 bg-primary text-secondary overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">{t('homeGlobalTelemetry')}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-secondary">
              {t('homeActiveMap')}
            </h2>
          </div>
          <div className="text-right font-mono text-[10px] text-secondary/40 tracking-widest leading-relaxed uppercase">
            {t('homeNodeStatus')}<br />
            {t('homeGlobalLatency')}<br />
            {t('homeActiveDeployments')}
          </div>
        </div>

        <div className="relative aspect-[21/9] border border-gold/10 bg-primary overflow-hidden group">
          {/* Simple SVG World Map Outline (Simplified) */}
          <svg viewBox="0 0 1000 420" className="w-full h-full opacity-10 stroke-secondary fill-none stroke-[0.5]">
             <path d="M150,100 Q200,80 250,120 T350,100 T450,130 T550,110 T650,140 T750,120 T850,150 T950,130" />
             <path d="M100,250 Q200,230 300,270 T500,240 T700,280 T900,250" />
             <path d="M200,350 Q400,380 600,340 T900,360" />
          </svg>

          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 opacity-5 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-secondary" />
            ))}
          </div>

          {/* Active Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="absolute group/node"
              style={{ left: node.x, top: node.y }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gold rounded-full"
                />
                <div className="w-2 h-2 bg-gold rounded-full relative z-10" />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] font-mono bg-primary px-2 py-1 border border-gold/30 text-gold uppercase tracking-widest">
                  {node.label} // {t('active')}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Scanning Line */}
          <motion.div
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-px bg-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.5)]"
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 p-12 opacity-5 font-mono text-[8px] tracking-[0.5em] uppercase text-secondary hidden md:block">
        CORE_GATEWAY_TELEMETRY // RYD_DXB_LDN_NYC_SIN
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
        <div className="w-px h-24 bg-secondary/10 mb-8" />
        <h2 className="text-4xl font-black uppercase tracking-widest text-secondary mb-4">{t('homeNodeEcosystem')}</h2>
        <p className="text-secondary/40 font-bold uppercase tracking-[0.3em] text-[10px]">{t('homeNodeEcosystemSub')}</p>
      </div>

      <div className="relative py-20 px-12 border-y border-gold/10">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-secondary/10 -translate-y-1/2" />

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
              <div className="w-px h-12 bg-secondary/10 mb-4 group-hover:bg-gold transition-colors" />

              <div className="w-16 h-16 border border-secondary/10 rotate-45 flex items-center justify-center bg-transparent group-hover:border-gold group-hover:bg-primary transition-all duration-500">
                <span className="text-xs font-black -rotate-45 group-hover:text-gold text-secondary">{node.id}</span>
              </div>

              <div className="mt-8 text-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="block text-[10px] font-black uppercase tracking-widest mb-1 text-secondary">{node.name}</span>
                <span className="block text-[8px] font-mono text-secondary/40">v2.0.4</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const words = [t('think'), t('orchestrate'), t('scale')];

  return (
    <div ref={containerRef} className="bg-primary text-secondary min-h-screen pt-20 overflow-x-hidden">
      <BackgroundPulse />

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="px-6 py-32 md:py-48 max-w-7xl mx-auto relative"
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
              className={`text-[8rem] md:text-[14rem] font-black tracking-tighter leading-[0.75] uppercase
                ${i === 1 ? 'text-secondary ml-[0.1em]' : 'text-transparent bg-clip-text bg-gradient-to-b from-secondary to-secondary/40'}
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
          className="mt-20 max-w-2xl"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-px bg-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">{t('homeVision2030')}</span>
          </div>
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-secondary leading-tight">
            {t('heroSub', 'Architecting the digital foundational layers for the next century of growth in the Middle East.')}
          </p>
        </motion.div>

        {/* Cinematic accent */}
        <div className="absolute top-0 right-6 h-full w-px bg-secondary/10 hidden lg:block" />
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
           <span className="text-[20rem] font-black uppercase tracking-tighter text-gold/20 rotate-90 origin-center">OPERIX</span>
        </div>
      </motion.section>

      {/* Horizontal Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Ticker />
      </motion.div>

      <NodeEcosystem />

      <GlobalTelemetry />

      {/* Cinematic Section */}
      <section className="bg-primary text-secondary py-48 px-6 overflow-hidden relative border-y border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10">
          <div className="flex-1">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[2px] bg-gold" />
               <h3 className="text-gold font-black tracking-[0.4em] uppercase text-sm">{t('homeStrategicGov')}</h3>
             </div>
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-tight mb-8">
               {t('homeMenaGrowth')}
             </h2>
             <p className="text-xl text-secondary/60 leading-relaxed font-medium mb-12 uppercase tracking-tight">
               {t('homeMenaGrowthDesc')}
             </p>
             <Link to="/manifesto" className="inline-block border-2 border-gold text-gold px-12 py-5 font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-primary transition-all shadow-[0_0_30px_rgba(197,160,89,0.2)]">
               {t('homeOurManifesto')}
             </Link>
          </div>
          <div className="flex-1 relative">
             <div className="w-full aspect-square border-2 border-gold/20 flex items-center justify-center rotate-45 group">
                <div className="w-3/4 h-3/4 border border-gold/20 flex items-center justify-center">
                   <div className="w-1/2 h-1/2 border-2 border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-1000">
                      <div className="w-1/4 h-1/4 bg-gold animate-pulse" />
                   </div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)]" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-12 opacity-10 font-mono text-[10px] tracking-widest text-gold hidden md:block">
           {t('homeDeploymentCore')}
        </div>
      </section>

      {/* Product Node Decorative Section */}
      <section className="py-24 border-t border-gold/10 flex justify-center overflow-hidden bg-primary">
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0.6, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0.6, 1], [0.8, 1.2])
          }}
          className="relative w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
        >
          <div className="absolute inset-0 border-[40px] border-secondary" />
          <div className="absolute inset-0 border-[1px] border-secondary scale-150" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-4 h-4 bg-secondary" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
