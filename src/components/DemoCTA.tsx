import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DemoCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gold relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="text-center md:text-left max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy tracking-tight mb-6 uppercase leading-tight">
            {t('demo_cta_title', 'Ready to transform?')}
          </h2>
          <p className="text-sm md:text-lg font-bold text-navy/70 uppercase tracking-[0.2em] leading-relaxed">
            {t('demo_cta_sub', 'Join the future of operational intelligence with Operix.')}
          </p>
        </div>

        <div className="shrink-0">
          <Link
            to="/booking"
            className="group relative inline-flex items-center justify-center px-12 py-6 bg-navy text-gold font-black uppercase tracking-[0.3em] text-sm transition-all duration-500 hover:bg-navy/90 hover:-translate-y-1 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-gold/20"
          >
            <span className="relative z-10">{t('demoBtn', 'BOOK A DEMO')}</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* High-Contrast Design Elements */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent skew-x-12 translate-x-32" />
      <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-navy/5 to-transparent -skew-x-12 -translate-x-16" />
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-black/10" />
    </section>
  );
};

export default DemoCTA;
