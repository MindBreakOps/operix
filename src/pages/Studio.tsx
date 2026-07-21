import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const BackgroundPulse = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(197,160,89,0.15)_0%,transparent_70%)]"
    />
  </div>
);

const TechnicalNode = ({ className, label, coordinates }: { className?: string, label?: string, coordinates?: string }) => (
  <div className={`absolute flex flex-col font-mono text-[10px] tracking-widest opacity-30 ${className}`}>
    {label && <span className="text-gold">[ {label} ]</span>}
    {coordinates && <span className="mt-1 text-secondary">{coordinates}</span>}
    <div className="w-12 h-px bg-gold mt-2 opacity-30" />
  </div>
);

const ProductSection = ({ id, name, pillar, description, modules, index }: {
  id: string;
  name: string;
  pillar: string;
  description: string;
  modules: string[];
  index: number;
}) => {
  const containerRef = useRef(null);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-screen flex flex-col justify-center py-32 border-b border-gold/10 last:border-0"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center px-6">

        {/* Visual / ID Column */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="text-[12rem] md:text-[22rem] font-black leading-none opacity-[0.02] select-none text-gold">
              {id}
            </span>
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
               <h3 className="text-sm font-black tracking-[0.6em] uppercase text-gold mb-4">{pillar}</h3>
               <h2 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none text-secondary">{id}</h2>
               <p className="text-2xl font-bold text-secondary/40 mt-6 uppercase tracking-widest">{name}</p>
            </div>

            <TechnicalNode
              className="top-0 -left-12"
              label={`NODE_CORE // 0${index + 1}`}
              coordinates="SECURE_GATEWAY_ACTIVE"
            />
          </motion.div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="h-1 w-32 bg-gold mb-12 shadow-[0_0_20px_rgba(197,160,89,0.5)]" />
            <p className="text-3xl md:text-5xl font-medium leading-[1.1] mb-16 text-secondary tracking-tight">
              {description}
            </p>

            {/* Immersive Module Nodes Layout */}
            <div className="relative mt-12 p-8 border border-gold/10 bg-secondary/5">
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold" />
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold" />
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold" />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                 {modules.map((module, i) => (
                   <motion.div
                     key={module}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 + (i * 0.08) }}
                     className="flex items-center space-x-6 group"
                   >
                     <div className="relative">
                        <div className="w-10 h-10 border border-secondary/10 rotate-45 flex items-center justify-center group-hover:border-gold transition-colors">
                           <span className="text-[8px] font-mono -rotate-45 text-secondary/40 group-hover:text-gold">0{i+1}</span>
                        </div>
                        {i < modules.length - 2 && (
                          <div className="absolute top-10 left-1/2 w-[1px] h-8 bg-secondary/10 -translate-x-1/2" />
                        )}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary/70 group-hover:text-secondary transition-colors">
                          {module}
                        </span>
                        <span className="text-[7px] font-mono text-secondary/20 uppercase tracking-widest mt-1">Status: Active // P-Node_{i}</span>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="mt-20 flex items-center space-x-8 opacity-40">
               <div className="flex flex-col text-[9px] font-mono tracking-[0.2em] text-secondary">
                  <span>SYSTEM_UPTIME: 99.99%</span>
                  <span>ENCRYPTION: SHARDED_VAULT</span>
                  <span className="mt-1 text-gold">ACTIVE_NODES: {Math.floor(Math.random() * 50) + 10}</span>
               </div>
               <div className="h-px flex-1 bg-secondary/20" />
               <div className="w-12 h-12 border border-gold rotate-45 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border border-gold/30 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-gold animate-pulse" />
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const SystemArchitecture = () => {
  const { t } = useTranslation();
  return (
  <section className="max-w-7xl mx-auto px-6 py-48 border-t border-gold/10 relative overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
      <div className="lg:col-span-5 relative z-10">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-8 h-[2px] bg-gold" />
           <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-gold">{t('studioStructuralIntegrity')}</h3>
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-tight text-secondary">
          {t('studioSysArch')}
        </h2>
        <p className="text-xl text-secondary/40 font-medium leading-relaxed mb-12 uppercase tracking-tight">
          {t('studioSysArchDesc')}
        </p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { label: 'Latency', value: '< 15ms' },
            { label: 'Uptime', value: '99.999%' },
            { label: 'Security', value: 'AES-256' },
            { label: 'Integrations', value: 'API_DRIVEN' },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-gold pl-6 py-2">
              <span className="text-[9px] font-mono text-gold uppercase tracking-widest block mb-1">{stat.label}</span>
              <span className="text-xl font-black text-secondary uppercase tracking-tighter">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7 relative">
        <div className="w-full aspect-square md:aspect-video border border-gold/10 relative overflow-hidden bg-secondary/5 backdrop-blur-sm group">
           <div className="absolute inset-0 flex items-center justify-center scale-150 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
              <div className="w-96 h-96 border-2 border-gold rotate-45 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                 <div className="w-64 h-64 border border-gold/50 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                    <div className="w-32 h-32 border-2 border-gold/20 flex items-center justify-center animate-[pulse_4s_easeInOut_infinite]" />
                 </div>
              </div>
           </div>

           {/* Decorative scanning line */}
           <motion.div
             animate={{ top: ['-10%', '110%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-px bg-gold/40 shadow-[0_0_15px_rgba(197,160,89,0.8)] z-20"
           />

           <div className="absolute top-8 left-8 flex flex-col gap-1">
             <span className="text-[8px] font-mono text-gold uppercase">Kernel_Status: OPTIMAL</span>
             <span className="text-[8px] font-mono text-secondary/40 uppercase">Load_Balancing: ACTIVE</span>
           </div>

           <div className="absolute bottom-8 right-8 text-right">
             <span className="text-[8px] font-mono text-gold uppercase">© OPERIX_CORE_V2</span>
           </div>
        </div>

        <TechnicalNode
          className="-top-12 right-0"
          label="ARCH_PLAN"
          coordinates="001.002.X"
        />
      </div>
    </div>
  </section>
);
};

const Studio = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const tickerX = useTransform(scrollYProgress, [0, 1], [0, -1500]);

  const products = [
    {
      id: 'OPS',
      name: t('launchOps'),
      pillar: 'Logistics Core',
      description: t('studioOPSDesc'),
      modules: ['Fleet Orchestration', 'Tasking Nodes', 'Asset Logic', 'ANPR Gateways', 'Route Optimization', 'Real-time Telemetry']
    },
    {
      id: 'HRIS',
      name: t('launchHRIS'),
      pillar: 'Human Capital',
      description: t('studioHRISDesc'),
      modules: ['Personnel Registry', 'Biometric Sync', 'Attendance Engine', 'Qiwa/Muqeem API', 'Compliance Matrix', 'Payroll Orchestration']
    },
    {
      id: 'FMIS',
      name: t('launchFMIS'),
      pillar: 'Fiscal Layer',
      description: t('studioFMISDesc'),
      modules: ['Electronic Invoicing', 'Real-time Ledger', 'Inventory Sync', 'E-Invoicing Node', 'Multi-entity Control', 'Tax Automation']
    },
    {
      id: 'Care',
      name: t('launchCare'),
      pillar: 'Clinical Hub',
      description: t('studioCareDesc'),
      modules: ['CCHI-compliant EMR', 'Voice-to-Text Notes', 'Pharmacy Logic', 'Insurance Gateway', 'Physician Command', 'Clinic Automation']
    },
    {
      id: 'Edu',
      name: 'Education',
      pillar: 'Academic OS',
      description: t('studioEduDesc'),
      modules: ['Student Lifecycle', 'Dox Studio Node', 'Academic Matrix', 'Certification Engine', 'Enrollment Flow', 'Grade Automation']
    },
    {
      id: 'Hasad',
      name: 'Hasad',
      pillar: 'Community Hub',
      description: t('studioHasadDesc'),
      modules: ['Engagement Engine', 'Community Vault', 'Shared Value Node', 'Social Matrix', 'Impact Tracking', 'Unified Login']
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      ref={containerRef}
      className="bg-primary text-secondary min-h-screen pt-40 pb-24 overflow-hidden relative"
    >
      <BackgroundPulse />

      {/* Hero Header */}
      <header className="max-w-7xl mx-auto mb-48 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-gold" />
            <h1 className="text-sm font-black tracking-[0.8em] uppercase text-gold">
              {t('studioTitle')}
            </h1>
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] max-w-5xl mb-16">
            {t('studioHeroTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl">
             <div className="space-y-4">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest">01 / ARCHITECTURE</span>
                <p className="text-sm text-secondary/40 leading-relaxed font-bold uppercase tracking-wide">{t('studioArchDesc')}</p>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest">02 / INTEGRATION</span>
                <p className="text-sm text-secondary/40 leading-relaxed font-bold uppercase tracking-wide">{t('studioIntDesc')}</p>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest">03 / VELOCITY</span>
                <p className="text-sm text-secondary/40 leading-relaxed font-bold uppercase tracking-wide">{t('studioVelDesc')}</p>
             </div>
          </div>
        </motion.div>

        <TechnicalNode
          className="top-0 right-6"
          label="CORE_INIT"
          coordinates="STABLE // V2.0"
        />
      </header>

      {/* Main Product Grid */}
      <div className="space-y-0">
          {products.map((product, idx) => (
            <ProductSection key={product.id} {...product} index={idx} />
          ))}
      </div>

      <SystemArchitecture />

      {/* Cinematic Horizontal Ticker */}
      <section className="mt-48 border-y border-gold/10 py-16 overflow-hidden bg-secondary/5 backdrop-blur-3xl">
        <motion.div
          style={{ x: tickerX }}
          className="whitespace-nowrap flex items-center"
        >
           {[...Array(8)].map((_, i) => (
             <div key={i} className="flex items-center gap-12 mx-12">
               <span className="text-[10rem] font-black opacity-[0.05] uppercase tracking-tighter text-secondary">
                 OPERIX STUDIO
               </span>
               <div className="w-8 h-8 border-2 border-gold rotate-45 opacity-20" />
               <span className="text-[10rem] font-black opacity-[0.05] uppercase tracking-tighter text-gold">
                 THE ECOSYSTEM
               </span>
               <div className="w-8 h-8 border-2 border-secondary rotate-45 opacity-10" />
             </div>
           ))}
        </motion.div>
      </section>

      {/* Final System Stats CTA */}
      <section className="max-w-7xl mx-auto px-6 py-48 text-center relative">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
         >
            <h4 className="text-gold font-black tracking-[0.5em] uppercase mb-8 text-sm">Deployment Ready</h4>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 leading-tight">
               {t('studioTransformation')}
            </h2>
            <Link to="/contact" className="inline-block bg-gold text-navy px-12 py-6 text-sm font-black uppercase tracking-[0.4em] hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
               {t('studioInitConsult')}
            </Link>
         </motion.div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] -z-10" />
      </section>
    </motion.div>
  );
};

export default Studio;
