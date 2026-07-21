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
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase max-w-5xl text-secondary"
          >
            {t('visionTitleBold')}
          </motion.h1>
          <div className="h-2 w-24 bg-gold my-12" />
          <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight opacity-40 max-w-3xl text-secondary">
            {t('visionSub')}
          </p>
        </header>

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

        <section className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-gold">{t('creedTitle')}</h2>
            <div className="h-px flex-grow bg-secondary/10 mx-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-secondary/10">
            <div className="border-r border-b border-navy/20">
              <Node
                id="HQ-01"
                city={t('nodeRiyadh')}
                desc={t('nodeRiyadhDesc')}
              />
            </div>
            <div className="border-r border-b border-navy/20">
              <Node
                id="RD-01"
                city={t('nodeKhartoum')}
                desc={t('nodeKhartoumDesc')}
              />
            </div>
          </div>
        </section>

        {/* Decorative Grid Section */}
        <section className="py-24 border-t border-navy/10 flex justify-center overflow-hidden">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="relative w-[800px] h-[800px] opacity-[0.03] pointer-events-none"
          >
            <div className="absolute inset-0 border-[1px] border-navy rotate-45" />
            <div className="absolute inset-0 border-[1px] border-navy" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-10 h-10 border border-navy" />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Vision;
