import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CoreBackground from '../components/CoreBackground';
import { Globe, ArrowUpRight } from 'lucide-react';

const Node = ({ city, desc, id, link, image }: { city: string; desc: string; id: string; link: string; image: string }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 0.99 }}
    className="relative border border-gold/10 p-12 flex flex-col justify-between aspect-square group transition-all duration-700 overflow-hidden"
  >
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
       <img
        src={image}
        alt={city}
        className="w-full h-full object-cover grayscale opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-[2s]"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent opacity-80" />
    </div>

    <div className="flex justify-between items-start relative z-10">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gold/40 group-hover:text-gold transition-colors">{id}</span>
        <div className="w-8 h-px bg-gold/20 group-hover:w-16 transition-all duration-700" />
      </div>
      <div className="w-10 h-10 border border-gold/20 group-hover:border-gold rotate-45 flex items-center justify-center transition-all duration-500 bg-[#05070a]/50 backdrop-blur-sm">
        <ArrowUpRight size={16} className="text-gold -rotate-45 group-hover:scale-125 transition-transform" />
      </div>
    </div>

    <div className="relative z-10">
      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-secondary group-hover:text-glow transition-all">
        {city}
      </h3>
      <p className="text-xl font-bold opacity-40 group-hover:opacity-100 leading-tight text-secondary group-hover:text-gold transition-all duration-500 uppercase tracking-tight">
        {desc}
      </p>

      <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
         <Globe size={12} className="text-gold" />
         <span className="text-[9px] font-mono text-gold uppercase tracking-[0.4em]">{t('establishConnection')} // {link.replace('https://', '')}</span>
      </div>
    </div>
  </motion.a>
);

const Philosophy = ({ title, sub, body }: { title: string; sub: string; body: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-64"
  >
    <div className="flex items-center gap-6 mb-12">
       <div className="w-12 h-px bg-gold" />
       <span className="text-xs font-black tracking-[0.5em] uppercase text-gold">{sub}</span>
    </div>
    <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.8] text-secondary">{title}</h2>
    <p className="text-3xl md:text-5xl font-black tracking-tighter opacity-40 max-w-6xl leading-[0.9] text-secondary uppercase">
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
            className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase max-w-6xl text-secondary"
          >
            {t('visionTitleBold')}
          </motion.h1>
          <div className="h-px w-48 bg-gold my-24 shadow-[0_0_30px_#c5a059]" />
          <p className="text-4xl md:text-7xl font-black uppercase tracking-tight opacity-40 max-w-5xl text-secondary leading-[0.85]">
            {t('visionSub')}
          </p>
        </header>

        {/* Vision Narrative Block */}
        <section className="py-64 border-y border-gold/10 mb-64 relative overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-7">
                 <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                   {t('visionNarrativeTitle')}
                 </h2>
              </div>
              <div className="lg:col-span-5">
                 <p className="text-3xl text-secondary/40 leading-[0.9] uppercase tracking-tighter font-black">
                   {t('visionNarrativeBody')}
                 </p>
              </div>
           </div>

           <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-gold/10 rotate-45 pointer-events-none opacity-20" />
        </section>

        {/* Transition Image Section */}
        <div className="mb-64 h-[80vh] w-full relative group overflow-hidden border border-gold/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
           <img
            src="/assets/images/mena-vision.jpg"
            alt="MENA Vision"
            className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-all duration-[3s] scale-110 group-hover:scale-100"
           />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,7,10,0.9)_100%)]" />
           <div className="absolute bottom-16 left-16 flex items-center gap-8">
              <div className="w-24 h-px bg-gold" />
              <span className="text-gold font-black tracking-[0.8em] uppercase text-sm">Regional Connectivity</span>
           </div>

           {/* HUD corner accents */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold" />
        </div>

        {/* Structural Sovereignty Section */}
        <section className="py-64 px-6 relative overflow-hidden mb-64 bg-gold/5 border-y border-gold/10">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32">
              <div className="flex-1 space-y-16">
                 <div className="flex items-center gap-8">
                    <div className="w-20 h-px bg-gold" />
                    <span className="text-gold font-black tracking-[0.6em] uppercase text-[12px]">{t('strategicAsset')}</span>
                 </div>
                 <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] text-secondary">
                    {t('structuralSovereignty')}
                 </h2>
                 <p className="text-3xl text-secondary/40 leading-[0.9] font-black tracking-tighter uppercase">
                    We believe that true economic independence is built on the foundation of digital ownership. Operix provides the localized infrastructure that allows enterprises to maintain absolute control over their operational logic, data residency, and future evolution. This is our commitment to the region's long-term digital heritage.
                 </p>
              </div>
              <div className="flex-1 relative group">
                 <div className="aspect-square overflow-hidden border border-gold/10 relative shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                    <img
                      src="/assets/images/sovereignty.jpg"
                      alt="Industrial Sovereignty"
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-all duration-[2s] scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
                 </div>
                 <div className="absolute -top-12 -right-12 w-64 h-64 border border-gold/20 -z-10 group-hover:scale-110 transition-transform duration-1000 group-hover:border-gold/40" />
              </div>
           </div>
        </section>

        {/* 2030 Roadmap Section */}
        <section className="py-64 px-6 relative overflow-hidden mb-64">
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex items-center gap-8 mb-20">
                 <div className="w-24 h-px bg-gold" />
                 <span className="text-gold font-black tracking-[0.8em] uppercase text-[12px]">{t('roadmapSub')}</span>
              </div>
              <h2 className="text-8xl md:text-[15rem] font-black uppercase tracking-tighter leading-[0.7] mb-32 text-secondary">
                 {t('roadmapTitle')}
              </h2>

              <div className="relative space-y-0">
                 {/* Timeline Line */}
                 <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gold/10 hidden md:block" />

                 {[
                   { year: "2026", body: t('roadmap2026') },
                   { year: "2027", body: t('roadmap2027') },
                   { year: "2028", body: t('roadmap2028') },
                   { year: "2030", body: t('roadmap2030') },
                 ].map((item, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, x: -100 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                     className="relative flex flex-col md:flex-row gap-16 md:gap-48 py-24 border-b border-gold/10 last:border-0 group"
                   >
                      <div className="flex items-center gap-12 md:w-64 shrink-0">
                         <div className="w-14 h-14 border border-gold rotate-45 flex items-center justify-center bg-[#05070a] z-10 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_30px_#c5a059]">
                            <div className="w-3 h-3 bg-gold" />
                         </div>
                         <span className="text-7xl md:text-9xl font-black text-secondary group-hover:text-gold transition-colors duration-500">{item.year}</span>
                      </div>
                      <div className="max-w-4xl">
                         <p className="text-4xl md:text-6xl font-black text-secondary/40 leading-[0.9] uppercase tracking-tighter group-hover:text-secondary transition-colors duration-500">
                            {item.body}
                         </p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

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
          <div className="flex items-center justify-between mb-24">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-gold">{t('creedTitle')}</h2>
            <div className="h-px flex-grow bg-gold/10 mx-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gold/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="border-r border-gold/10">
              <Node
                id="HQ-01"
                city={t('nodeRiyadh')}
                desc={t('nodeRiyadhDesc')}
                link="https://operix-solutions.com"
                image="/assets/images/riyadh-hq.jpg"
              />
            </div>
            <div className="">
              <Node
                id="RD-01"
                city={t('nodeKhartoum')}
                desc={t('nodeKhartoumDesc')}
                link="https://249.operix-solutions.com"
                image="/assets/images/khartoum-rd.jpg"
              />
            </div>
          </div>
        </section>

        {/* Industrial Spinning Element */}
        <section className="py-64 flex justify-center overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="relative w-[1200px] h-[1200px] opacity-[0.08] pointer-events-none"
          >
            <div className="absolute inset-0 border-[6px] border-gold rotate-45" />
            <div className="absolute inset-0 border-[3px] border-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 border-2 border-gold animate-pulse shadow-[0_0_50px_#c5a059]" />
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Vision;
