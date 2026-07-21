import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabaseClient as supabase } from '../config/supabase';
import { Loader2 } from 'lucide-react';
import BackgroundPulse from '../components/BackgroundPulse';

const ProductNode = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 border border-gold/20 rotate-45" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-gold" />
    </div>
  </div>
);

const MarqueeRow = ({ clients, direction = 'left', isAr }: { clients: any[], direction?: 'left' | 'right', isAr: boolean }) => {
  return (
    <div className="flex overflow-hidden py-12 border-y border-navy/10 bg-primary/50 backdrop-blur-sm relative">
      <motion.div
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-12 items-center whitespace-nowrap"
      >
        {[...clients, ...clients, ...clients].map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 group relative px-8"
          >
            <img
              src={client.media_url}
              alt={client.title_en}
              className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all transform group-hover:scale-110"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-[8px] font-black uppercase tracking-widest bg-navy text-gold px-2 py-1">
                {isAr ? client.title_ar : client.title_en}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Clients() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('operix_cms_content')
        .select('*')
        .eq('page', 'clients')
        .order('updated_at', { ascending: true });

      if (!error && data) {
        setClients(data);
      }
      setLoading(false);
    }
    fetchClients();
  }, []);

  const midPoint = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, midPoint);
  const row2 = clients.slice(midPoint);

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
        <header>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <ProductNode />
            <span className="text-sm font-black uppercase tracking-widest opacity-40 text-gold">{t('navClients')}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-secondary">
            {t('clientsMainTitle')}
          </motion.h1>
        </header>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin opacity-20 text-navy" size={48} />
        </div>
      ) : (
        <div className="space-y-4">
          <MarqueeRow clients={row1} direction="left" isAr={isAr} />
          <MarqueeRow clients={row2.length > 0 ? row2 : row1} direction="right" isAr={isAr} />
        </div>
      )}
    </div>
  );
}

