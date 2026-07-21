import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DemoCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#0a0f16] relative overflow-hidden border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="text-center md:text-left max-w-3xl">
          <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold font-black tracking-[0.5em] uppercase text-[10px]">Initialize</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-secondary tracking-tighter mb-8 uppercase leading-[0.85]">
            {t('demo_cta_title')}
          </h2>
          <p className="text-xl md:text-2xl font-medium text-secondary/40 uppercase tracking-tight leading-snug max-w-xl">
            {t('demo_cta_sub')}
          </p>
        </div>

        <div className="shrink-0">
          <Link
            to="/booking"
            className="group relative inline-flex items-center justify-center px-16 py-8 bg-gold text-[#05070a] font-black uppercase tracking-[0.5em] text-xs transition-all duration-700 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(197,160,89,0.2)]"
          >
            <span className="relative z-10">{t('demoBtn')}</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Industrial Design Elements */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #c5a059 1px, transparent 1px), linear-gradient(to bottom, #c5a059 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gold/5 blur-[120px] rounded-full" />
    </section>
  );
};

export default DemoCTA;
