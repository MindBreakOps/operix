import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BackgroundPulse from '../components/BackgroundPulse';

const Node = ({ city, desc, id }: { city: string; desc: string; id: string }) => (
  <motion.div
    whileHover={{ scale: 0.98 }}
    className="border border-secondary/10 p-10 flex flex-col justify-between aspect-square group transition-colors duration-500 hover:bg-navy hover:text-white"
  >
    <div className="flex justify-between items-start">
      <span className="text-sm font-black tracking-widest uppercase opacity-40 group-hover:opacity-100">{id}</span>
      <div className="w-6 h-6 border border-secondary group-hover:border-gold rotate-45 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-secondary group-hover:bg-gold" />
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-secondary">{city}</h3>
      <p className="text-lg font-medium opacity-70 group-hover:opacity-100 leading-snug text-secondary/60">{desc}</p>
    </div>
  </motion.div>
);

const Philosophy = ({ title, sub, body }: { title: string; sub: string; body: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-32"
  >
    <span className="text-sm font-black tracking-[0.3em] uppercase mb-4 block text-gold">{sub}</span>
    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none text-secondary">{title}</h2>
    <p className="text-2xl md:text-3xl font-medium tracking-tight opacity-70 max-w-4xl leading-relaxed text-secondary/80">
      {body}
    </p>
  </motion.div>
);

const Vision = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary text-secondary min-h-screen pt-48 pb-24 px-6 relative overflow-hidden"
    >
      <CoreBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-64">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.8] uppercase max-w-6xl text-secondary"
          >
            {t('visionTitleBold')}
          </motion.h1>
          <div className="h-px w-32 bg-gold my-20 shadow-[0_0_20px_#c5a059]" />
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tight opacity-40 max-w-4xl text-secondary leading-none">
            {t('visionSub')}
          </p>
        </header>

        {/* Vision Narrative Block */}
        <section className="py-64 border-y border-gold/10 mb-64 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
              <div>
                 <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
                   {t('visionNarrativeTitle')}
                 </h2>
              </div>
              <div>
                 <p className="text-3xl text-secondary/60 leading-tight uppercase tracking-tighter">
                   {t('visionNarrativeBody')}
                 </p>
              </div>
           </div>

           <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-gold/10 rotate-45 pointer-events-none" />
        </section>

        {/* Transition Image Section */}
        <div className="mb-64 h-[70vh] w-full relative group overflow-hidden border border-gold/10">
           <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
            alt="MENA Vision"
            className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-all duration-[2s] scale-110 group-hover:scale-100"
           />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,7,10,0.8)_100%)]" />
           <div className="absolute bottom-12 left-12 flex items-center gap-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-gold font-black tracking-[0.5em] uppercase text-xs">Regional Connectivity</span>
           </div>
        </div>

        <Philosophy
          title={t('philIntegrated')}
          sub={t('philIntegratedSub')}
          body={t('philIntegratedBody')}
        />

        <Philosophy
          title={t('philResilience')}
          sub={t('philResilienceSub')}
          body={t('philResilienceBody')}
        />

        <section className="mb-64">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gold">{t('creedTitle')}</h2>
            <div className="h-px flex-grow bg-gold/10 mx-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gold/10 shadow-2xl">
            <div className="border-r border-gold/10">
              <Node
                id="HQ-01"
                city={t('nodeRiyadh')}
                desc={t('nodeRiyadhDesc')}
              />
            </div>
            <div className="">
              <Node
                id="RD-01"
                city={t('nodeKhartoum')}
                desc={t('nodeKhartoumDesc')}
              />
            </div>
          </div>
        </section>

        {/* Industrial Spinning Element */}
        <section className="py-48 flex justify-center overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="relative w-[1000px] h-[1000px] opacity-[0.05] pointer-events-none"
          >
            <div className="absolute inset-0 border-[1px] border-gold rotate-45" />
            <div className="absolute inset-0 border-[1px] border-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-16 h-16 border border-gold animate-pulse" />
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Vision;
