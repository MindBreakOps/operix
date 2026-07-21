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
    <div className="bg-primary text-secondary min-h-screen overflow-x-hidden selection:bg-navy selection:text-white">
      <BackgroundPulse />

      {/* Cinematic Hero */}
      <header className="h-[120vh] flex items-center px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,45,64,0.15)_0%,transparent_100%)] pointer-events-none"
        />

        <div className="z-10 w-full mt-24">
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[20vw] font-black tracking-tighter leading-[0.7] uppercase text-center md:text-left text-secondary"
          >
            {t('manifestoTitle')}
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-12 gap-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "30vw" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
              className="h-2 bg-navy"
            />

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-xl md:text-3xl font-bold uppercase tracking-[0.3em]"
            >
              {t('manifestoSubtitle')}
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative">
        <ManifestoSection
          index={0}
          title={t('philTitle')}
          body={t('philBody')}
        />

        <ManifestoSection
          index={1}
          title={t('effTitle')}
          body={t('effBody')}
        />

        {/* Vision & Mission - Immersive Grid */}
        <section className="min-h-screen py-48 px-6 flex flex-col justify-center space-y-64">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <h3 className="text-[12vw] font-black uppercase mb-8 leading-none opacity-10 absolute -top-12 -left-4 pointer-events-none text-navy">
                {t('visionTitle')}
              </h3>
              <p className="text-4xl md:text-8xl font-black leading-tight max-w-7xl relative z-10">
                {t('visionBody')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative self-end text-right"
            >
              <h3 className="text-[12vw] font-black uppercase mb-8 leading-none opacity-10 absolute -top-12 -right-4 pointer-events-none text-navy">
                {t('missionTitle')}
              </h3>
              <p className="text-4xl md:text-8xl font-black leading-tight max-w-7xl relative z-10">
                {t('missionBody')}
              </p>
            </motion.div>
        </section>
      </main>

      {/* Outro */}
      <footer className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
         <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "backOut" }}
            className="w-32 h-32 border-8 border-navy rotate-45 flex items-center justify-center mb-12"
         >
            <div className="w-8 h-8 bg-navy" />
         </motion.div>
         <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="text-sm tracking-[1em] uppercase font-bold text-navy"
         >
            {t('footer.copyright')}
         </motion.p>
      </footer>
    </div>
  );
};

export default Manifesto;
