import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundPulse from '../components/BackgroundPulse';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ word, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-4 mb-4 text-secondary">
      {word}
    </motion.span>
  );
};

const ManifestoSection = ({ title, body, index }: { title: string; body: string; index: number }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const words = body.split(' ');

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center py-32 px-6 relative overflow-hidden border-t border-navy/20">
      {/* Background Index Number */}
      <motion.span
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.05]),
          y: useTransform(scrollYProgress, [0, 1], [100, -100])
        }}
        className="absolute top-0 right-0 text-[40vw] font-black leading-none pointer-events-none text-navy select-none -z-10"
      >
        {index + 1}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-[15vw] md:text-[12vw] font-black tracking-tighter uppercase leading-[0.75] mb-20 text-secondary"
      >
        {title}
      </motion.h2>

      <div className="max-w-[90vw] z-10">
        <div className="flex flex-wrap text-3xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start * 0.6 + 0.2, end * 0.6 + 0.2]}
              />
            );
          })}
        </div>
      </div>

      {/* Navy Accent Line */}
      <div className="absolute bottom-0 left-0 w-32 h-1 bg-navy/50" />
    </section>
  );
};

const Manifesto = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary text-secondary min-h-screen overflow-x-hidden selection:bg-gold selection:text-primary"
    >
      <CoreBackground />

      {/* Cinematic Hero */}
      <header className="h-screen flex items-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-20 scale-105">
           <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Manifesto Hero"
            className="w-full h-full object-cover"
           />
        </div>

        <div className="z-10 w-full mt-24 max-w-7xl mx-auto">
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[22vw] font-black tracking-tighter leading-[0.7] uppercase text-center md:text-left text-secondary drop-shadow-2xl"
          >
            {t('manifestoTitle')}
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-16 gap-12">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40vw" }}
              transition={{ delay: 1, duration: 2, ease: "circOut" }}
              className="h-px bg-gold"
            />

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-2xl md:text-4xl font-black uppercase tracking-[0.4em] text-gold"
            >
              {t('manifestoSubtitle')}
            </motion.p>
          </div>
        </div>
      </header>

      {/* Narrative Break */}
      <section className="py-64 px-6 border-y border-gold/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-px h-24 bg-gold mx-auto mb-12" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-12">
            "Software is the new industrial bedrock. Operix is the architect."
          </h2>
          <div className="w-12 h-px bg-gold mx-auto" />
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative">
        <ManifestoSection
          index={0}
          title={t('philTitle')}
          body={t('philBody')}
        />

        {/* Transition Image Section */}
        <div className="h-[60vh] w-full overflow-hidden relative grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000">
           <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Technical Infrastructure"
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        </div>

        <ManifestoSection
          index={1}
          title={t('effTitle')}
          body={t('effBody')}
        />

        {/* Vision & Mission - Immersive Grid */}
        <section className="min-h-screen py-64 px-6 flex flex-col justify-center space-y-96 relative">
            {/* Animated Grid Dots */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative max-w-7xl mx-auto"
            >
              <h3 className="text-[18vw] font-black uppercase mb-8 leading-none opacity-5 absolute -top-32 -left-12 pointer-events-none text-gold">
                {t('visionTitle')}
              </h3>
              <p className="text-5xl md:text-[10rem] font-black leading-[0.85] max-w-7xl relative z-10 tracking-tighter uppercase">
                {t('visionBody')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative self-end text-right max-w-7xl mx-auto"
            >
              <h3 className="text-[18vw] font-black uppercase mb-8 leading-none opacity-5 absolute -top-32 -right-12 pointer-events-none text-gold">
                {t('missionTitle')}
              </h3>
              <p className="text-5xl md:text-[10rem] font-black leading-[0.85] max-w-7xl relative z-10 tracking-tighter uppercase">
                {t('missionBody')}
              </p>
            </motion.div>
        </section>
      </main>

      {/* Outro */}
      <footer className="h-screen flex flex-col items-center justify-center relative overflow-hidden border-t border-gold/10">
         <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "backOut" }}
            className="w-40 h-40 border-[1px] border-gold rotate-45 flex items-center justify-center mb-16 relative"
         >
            <div className="absolute inset-2 border border-gold/20" />
            <div className="w-10 h-10 bg-gold shadow-[0_0_30px_#c5a059]" />
         </motion.div>
         <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-xs tracking-[1.5em] uppercase font-black text-gold"
         >
            {t('footer.copyright')}
         </motion.p>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full -z-10" />
      </footer>
    </motion.div>
  );
};

export default Manifesto;
