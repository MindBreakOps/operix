import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BackgroundPulse from '../components/BackgroundPulse';

const LegalSection = ({ title, content }: { title: string; content: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-b border-navy/10 py-12 last:border-0"
  >
    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-gold">{title}</h3>
    <p className="text-lg opacity-70 leading-relaxed max-w-3xl">{content}</p>
  </motion.div>
);

const Legal = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t('legalGovComp'), content: t('legalGovCompDesc') },
    { title: t('legalDataSov'), content: t('legalDataSovDesc') },
    { title: t('legalPrivacy'), content: t('legalPrivacyDesc') },
  ];

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase mb-4"
          >
            {t('legalTitle')}
          </motion.h1>
          <div className="h-2 w-24 bg-gold mb-8" />
          <p className="text-2xl font-bold uppercase tracking-widest opacity-40">
            {t('legalSubtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-secondary/10 pt-12">
          <div className="space-y-4">
            <p className="text-xl font-medium opacity-60 uppercase tracking-tight">
              {t('legalEffective')}
            </p>
            <p className="text-xl font-medium opacity-60 uppercase tracking-tight">
              {t('legalVersion')}
            </p>
          </div>
          <div>
            {sections.map((section, i) => (
              <LegalSection key={i} title={section.title} content={section.content} />
            ))}
          </div>
        </div>

        {/* Decorative Node */}
        <div className="mt-32 flex justify-center">
          <div className="w-12 h-12 border-2 border-gold rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
