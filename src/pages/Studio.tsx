import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CoreBackground from '../components/CoreBackground';


const TechnicalNode = ({ className, label, coordinates }: { className?: string, label?: string, coordinates?: string }) => (
  <div className={`absolute flex flex-col font-mono text-[10px] tracking-widest opacity-30 ${className}`}>
    {label && <span className="text-gold">[ {label} ]</span>}
    {coordinates && <span className="mt-1 text-secondary">{coordinates}</span>}
    <div className="w-12 h-px bg-gold mt-2 opacity-30" />
  </div>
);

const ProductSection = ({ id, name, pillar, description, modules, index, image, useCase, tactical }: {
  id: string;
  name: string;
  pillar: string;
  description: string;
  modules: string[];
  index: number;
  image: string;
  useCase: string;
  tactical: string;
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const { t } = useTranslation();

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-screen flex flex-col justify-center py-64 border-b border-gold/10 last:border-0"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-32 items-center px-6">

        {/* Visual / ID Column */}
        <div className="lg:col-span-5 relative">
          <motion.div style={{ y }} className="relative z-10">
            <span className="text-[14rem] md:text-[30rem] font-black leading-none opacity-[0.04] select-none text-gold">
              {id}
            </span>
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
               <h3 className="text-sm font-black tracking-[0.8em] uppercase text-gold mb-6">{pillar}</h3>
               <h2 className="text-9xl md:text-[15rem] font-black uppercase tracking-tighter leading-none text-secondary drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">{id}</h2>
               <p className="text-3xl font-black text-gold mt-12 uppercase tracking-[0.3em]">{name}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-0 right-0 w-80 aspect-[3/4] overflow-hidden grayscale -z-10 blur-[2px]"
          >
             <img src={image} alt={id} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 space-y-16">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px w-48 bg-gold mb-16 shadow-[0_0_30px_rgba(197,160,89,0.8)]" />
            <p className="text-4xl md:text-6xl font-black leading-[0.9] mb-12 text-secondary tracking-tighter uppercase">
              {description}
            </p>

            <p className="text-2xl text-secondary/40 font-bold uppercase tracking-tight mb-20 max-w-2xl">
              {useCase}
            </p>

            {/* Tactical Edge Box */}
            <div className="p-10 border-l-4 border-gold bg-gold/5 backdrop-blur-md mb-20 group hover:bg-gold/10 transition-colors duration-500">
               <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">{t('tacticalEdgeTitle')}</span>
                  <div className="h-px flex-1 bg-gold/20" />
               </div>
               <p className="text-xl md:text-2xl font-black text-secondary leading-tight uppercase tracking-tight group-hover:text-gold transition-colors duration-500">
                  {tactical}
               </p>
            </div>

            {/* Immersive Module Nodes Layout */}
            <div className="relative mt-12 p-12 border border-gold/10 bg-gold/5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                 {modules.map((module, i) => (
                   <motion.div
                     key={module}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 + (i * 0.08) }}
                     className="flex items-center space-x-8 group"
                   >
                     <div className="relative">
                        <div className="w-14 h-14 border border-gold/20 rotate-45 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-500 group-hover:scale-110">
                           <span className="text-[12px] font-mono -rotate-45 text-gold/40 group-hover:text-gold font-black">0{i+1}</span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-secondary/80 group-hover:text-secondary transition-colors">
                          {module}
                        </span>
                        <span className="text-[9px] font-mono text-gold/30 uppercase tracking-widest mt-2">Active_Link // STABLE</span>
                     </div>
                   </motion.div>
                 ))}
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
  <section className="max-w-7xl mx-auto px-6 py-64 border-t border-gold/10 relative overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
      <div className="lg:col-span-5 relative z-10">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-8 h-[2px] bg-gold" />
           <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-gold">{t('studioStructuralIntegrity')}</h3>
        </div>
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-16 leading-[0.85] text-secondary">
          {t('studioSysArch')}
        </h2>
        <p className="text-2xl text-secondary/40 font-medium leading-relaxed mb-16 uppercase tracking-tight">
          {t('studioSysArchDesc')}
        </p>
        <div className="grid grid-cols-2 gap-12">
          {[
            { label: 'Latency', value: '< 15ms' },
            { label: 'Uptime', value: '99.999%' },
            { label: 'Security', value: 'AES-256' },
            { label: 'Integrations', value: 'API_DRIVEN' },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-gold pl-8 py-4">
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest block mb-2">{stat.label}</span>
              <span className="text-3xl font-black text-secondary uppercase tracking-tighter">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7 relative">
        <div className="w-full aspect-square border border-gold/10 relative overflow-hidden bg-gold/5 backdrop-blur-3xl group shadow-[0_0_100px_rgba(197,160,89,0.1)]">
           <div className="absolute inset-0 flex items-center justify-center scale-150 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
              <div className="w-[500px] h-[500px] border-2 border-gold rotate-45 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                 <div className="w-[300px] h-[300px] border border-gold/50 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                    <div className="w-[150px] h-[150px] border-2 border-gold/20 flex items-center justify-center animate-[pulse_4s_easeInOut_infinite]" />
                 </div>
              </div>
           </div>

           {/* Decorative scanning line */}
           <motion.div
             animate={{ top: ['-10%', '110%'] }}
             transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[2px] bg-gold/30 shadow-[0_0_30px_rgba(197,160,89,0.5)] z-20"
           />

           <div className="absolute top-12 left-12 flex flex-col gap-2">
             <span className="text-[10px] font-mono text-gold uppercase tracking-widest">Kernel_Status: OPTIMAL</span>
             <span className="text-[10px] font-mono text-secondary/20 uppercase tracking-widest">Load_Balancing: ACTIVE</span>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
             <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em]">© OPERIX_CORE_V2</span>
           </div>
        </div>
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

  const tickerX = useTransform(scrollYProgress, [0, 1], [0, -2000]);

  const products = [
    {
      id: 'OPS',
      name: t('launchOps'),
      pillar: 'Logistics Core',
      description: t('studioOPSDesc'),
      useCase: t('studioOPSCase'),
      tactical: t('studioOPSTactical'),
      image: "/assets/images/logistics-core.jpg",
      modules: ['Fleet Orchestration', 'Tasking Nodes', 'Asset Logic', 'ANPR Gateways', 'Route Optimization', 'Real-time Telemetry']
    },
    {
      id: 'HRIS',
      name: t('launchHRIS'),
      pillar: 'Human Capital',
      description: t('studioHRISDesc'),
      useCase: t('studioHRISCase'),
      tactical: t('studioHRISTactical'),
      image: "/assets/images/human-capital.jpg",
      modules: ['Personnel Registry', 'Biometric Sync', 'Attendance Engine', 'Qiwa/Muqeem API', 'Compliance Matrix', 'Payroll Orchestration']
    },
    {
      id: 'FMIS',
      name: t('launchFMIS'),
      pillar: 'Fiscal Layer',
      description: t('studioFMISDesc'),
      useCase: t('studioFMISCase'),
      tactical: t('studioFMISTactical'),
      image: "/assets/images/fiscal-layer.jpg",
      modules: ['Electronic Invoicing', 'Real-time Ledger', 'Inventory Sync', 'E-Invoicing Node', 'Multi-entity Control', 'Tax Automation']
    },
    {
      id: 'Care',
      name: t('launchCare'),
      pillar: 'Clinical Hub',
      description: t('studioCareDesc'),
      useCase: t('studioCareCase'),
      tactical: t('studioCareTactical'),
      image: "/assets/images/clinical-hub.jpg",
      modules: ['CCHI-compliant EMR', 'Voice-to-Text Notes', 'Pharmacy Logic', 'Insurance Gateway', 'Physician Command', 'Clinic Automation']
    },
    {
      id: 'Edu',
      name: 'Education',
      pillar: 'Academic OS',
      description: t('studioEduDesc'),
      useCase: t('studioEduCase'),
      tactical: t('studioEduTactical'),
      image: "/assets/images/academic-os.jpg",
      modules: ['Student Lifecycle', 'Dox Studio Node', 'Academic Matrix', 'Certification Engine', 'Enrollment Flow', 'Grade Automation']
    },
    {
      id: 'Hasad',
      name: 'Hasad',
      pillar: 'Community Hub',
      description: t('studioHasadDesc'),
      useCase: t('studioHasadCase'),
      tactical: t('studioHasadTactical'),
      image: "/assets/images/community-hub.jpg",
      modules: ['Engagement Engine', 'Community Vault', 'Shared Value Node', 'Social Matrix', 'Impact Tracking', 'Unified Login']
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      ref={containerRef}
      className="bg-primary text-secondary min-h-screen pt-40 pb-24 overflow-hidden relative"
    >
      <CoreBackground />

      {/* Hero Header */}
      <header className="max-w-7xl mx-auto mb-64 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="w-24 h-px bg-gold" />
            <h1 className="text-sm font-black tracking-[1.2em] uppercase text-gold">
              {t('studioTitle')}
            </h1>
          </div>
          <h2 className="text-8xl md:text-[14rem] font-black uppercase tracking-tighter leading-[0.75] max-w-6xl mb-32">
            THE<br />ENGINEERING.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-6xl">
             <div className="space-y-8">
                <span className="text-[14px] font-mono text-gold uppercase tracking-[0.4em]">01 / ARCHITECTURE</span>
                <p className="text-xl text-secondary/40 leading-relaxed font-black uppercase tracking-tight">{t('studioArchDesc')}</p>
             </div>
             <div className="space-y-8">
                <span className="text-[14px] font-mono text-gold uppercase tracking-[0.4em]">02 / INTEGRATION</span>
                <p className="text-xl text-secondary/40 leading-relaxed font-black uppercase tracking-tight">{t('studioIntDesc')}</p>
             </div>
             <div className="space-y-8">
                <span className="text-[14px] font-mono text-gold uppercase tracking-[0.4em]">03 / VELOCITY</span>
                <p className="text-xl text-secondary/40 leading-relaxed font-black uppercase tracking-tight">{t('studioVelDesc')}</p>
             </div>
          </div>
        </motion.div>
      </header>

      {/* Narrative Section */}
      <section className="py-64 px-6 bg-gold/5 relative border-y border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32">
          <div className="flex-1">
            <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
               {t('studioNarrativeTitle')}
            </h2>
          </div>
          <div className="flex-1">
            <p className="text-3xl md:text-5xl font-black text-secondary/60 leading-[0.9] uppercase tracking-tighter">
               {t('studioNarrativeBody')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <div className="space-y-0">
          {products.map((product, idx) => (
            <ProductSection key={product.id} {...product} index={idx} />
          ))}
      </div>

      <SystemArchitecture />

      {/* Final System Stats CTA */}
      <section className="max-w-7xl mx-auto px-6 py-64 text-center relative">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
         >
            <h4 className="text-gold font-black tracking-[1em] uppercase mb-12 text-sm">Deployment Ready</h4>
            <h2 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter mb-24 leading-[0.8]">
               {t('studioTransformation')}
            </h2>
            <Link to="/contact" className="inline-block bg-gold text-[#05070a] px-20 py-10 text-sm font-black uppercase tracking-[0.8em] hover:bg-white hover:scale-105 transition-all duration-700 shadow-[0_0_120px_rgba(197,160,89,0.5)]">
               {t('studioInitConsult')}
            </Link>
         </motion.div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gold/5 rounded-full blur-[250px] -z-10" />
      </section>
    </motion.div>
  );
};

export default Studio;