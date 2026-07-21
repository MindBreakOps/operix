import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, ShieldCheck, Users, Stethoscope, Settings, GraduationCap, MessageCircle } from 'lucide-react';
import BackgroundPulse from '../components/BackgroundPulse';

const ProductNode = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 border border-secondary/20 rotate-45" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-secondary" />
    </div>
  </div>
);

const FAQItem = ({ question, answer, index, isAr }: { question: string, answer: string, index: number, isAr: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className={`relative group border-b border-secondary/10 transition-all duration-500 ${isOpen ? 'bg-secondary/5' : 'hover:bg-secondary/[0.02]'}`}
    >
      {/* Navy Highlight Bar */}
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? '6px' : '0px',
          opacity: isOpen ? 1 : 0
        }}
        className={`absolute top-0 bottom-0 ${isAr ? 'right-0' : 'left-0'} bg-gold z-20`}
      />

      {/* Lighting Effect Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.03), transparent 80%)`
        }}
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-12 px-8 flex justify-between items-center text-left relative z-10 transition-all ${isAr ? 'text-right flex-row-reverse' : ''}`}
      >
        <span className={`text-2xl md:text-3xl font-black uppercase tracking-tight transition-all duration-500 ${isOpen ? 'text-gold translate-x-2' : 'text-secondary/40 group-hover:text-secondary group-hover:translate-x-1'}`}>
          {question}
        </span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.2 : 1,
            color: isOpen ? '#d4af37' : 'rgba(0,0,0,0.4)'
          }}
          className="transition-colors"
        >
          <ChevronDown size={32} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden relative z-10"
          >
            <div className={`px-8 pb-12 ${isAr ? 'text-right' : ''}`}>
               <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="max-w-4xl"
               >
                  <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-medium text-secondary/80">
                    {answer}
                  </p>
                  <div className="mt-8 flex gap-4">
                     <div className="w-12 h-1 bg-gold/20" />
                     <div className="w-4 h-1 bg-gold/40" />
                  </div>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function QA() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const categories = [
    { title: t('catGeneral'), icon: Globe, keys: ['G1', 'G2', 'G3'] },
    { title: t('catFinancial'), icon: ShieldCheck, keys: ['F2'] },
    { title: t('catHuman'), icon: Users, keys: ['H1'] },
    { title: t('catHealthcare'), icon: Stethoscope, keys: ['C1', 'C2'] },
    { title: t('catOperations'), icon: Settings, keys: ['O1', 'O2'] },
    { title: t('catEducation'), icon: GraduationCap, keys: ['E1'] },
  ];

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <ProductNode />
            <span className="text-sm font-black uppercase tracking-widest opacity-40 text-secondary">{t('navQA')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] mb-12 text-secondary"
          >
             {t('qaMainTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl font-medium tracking-tight opacity-60 max-w-4xl leading-tight text-secondary/60"
          >
            {t('qaSub')}
          </motion.p>
        </header>

        <div className="space-y-48">
          {categories.map((cat, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`flex items-center gap-8 mb-16 ${isAr ? 'flex-row-reverse' : ''}`}>
                 <motion.div
                   whileHover={{ rotate: 360, scale: 1.2 }}
                   transition={{ duration: 1 }}
                   className="p-6 bg-navy text-gold rounded-2xl shadow-xl"
                 >
                    <cat.icon size={40} strokeWidth={1.5} />
                 </motion.div>
                 <h2 className="text-4xl font-black uppercase tracking-[0.3em] text-secondary">{cat.title}</h2>
              </div>
              <div className="border-t border-secondary/10">
                {cat.keys.map((k, index) => (
                  <FAQItem
                    key={k}
                    index={index}
                    isAr={isAr}
                    question={t(`faq${k}_Q`)}
                    answer={t(`faq${k}_A`)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <section className="mt-64 pt-48 border-t border-secondary/10 text-center relative">
           {/* Decorative background element */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="flex justify-center mb-16"
           >
              <div className="p-12 border border-secondary/5 rounded-full animate-pulse">
                <MessageCircle size={100} strokeWidth={0.5} className="text-secondary opacity-30" />
              </div>
           </motion.div>

           <div className="space-y-12">
             <motion.h2
               initial={{ y: 30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-secondary"
             >
                {t('qaDeeperInquiry')}
             </motion.h2>

             <motion.button
               whileHover={{ scale: 1.05, backgroundColor: '#d4af37', color: '#030612' }}
               whileTap={{ scale: 0.95 }}
               className="group relative px-20 py-10 border-2 border-gold text-gold font-black uppercase tracking-[0.3em] overflow-hidden transition-colors"
             >
                <span className="relative z-10">{t('qaConsultEcosystem')}</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             </motion.button>
           </div>
        </section>
      </div>
    </div>
  );
}

