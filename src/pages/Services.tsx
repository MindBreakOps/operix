import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabaseClient as supabase } from '../config/supabase';
import { Loader2, ArrowUpRight, X } from 'lucide-react';

const ProductNode = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 border border-secondary/20 rotate-45" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-secondary" />
    </div>
  </div>
);

const BackgroundPulse = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.03, 0.08, 0.03],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(30,45,64,0.3)_0%,transparent_70%)]"
    />
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const ServiceCard = ({ service, index, isAr, onClick }: { service: any, index: number, isAr: boolean, onClick: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={itemVariants}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className="border-r border-b border-secondary/20 p-8 group relative aspect-square flex flex-col justify-between hover:bg-navy hover:text-white transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Lighting Effect Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`
        }}
      />

      <div className="relative z-10 flex justify-between items-start">
        <span className="text-xs font-black opacity-40">0{index + 1}</span>
        <motion.div
           initial={{ rotate: -45, opacity: 0 }}
           whileInView={{ rotate: 0, opacity: 0.2 }}
           whileHover={{ scale: 1.2, opacity: 1, color: '#f8f4f0' }}
        >
          <ArrowUpRight size={32} />
        </motion.div>
      </div>
      <div className="relative z-10">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none group-hover:translate-x-2 transition-transform duration-500">
          {isAr ? service.title_ar : service.title_en}
        </h3>
        <p className="text-sm opacity-60 uppercase font-medium line-clamp-3 group-hover:opacity-100 transition-opacity">
          {isAr ? service.body_ar : service.body_en}
        </p>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('operix_cms_content')
        .select('*')
        .eq('page', 'services')
        .order('updated_at', { ascending: false });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('/preview') || url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <ProductNode />
            <span className="text-sm font-black uppercase tracking-widest opacity-40">
               {t('navServices', 'Our Services')}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]"
          >
            {t('servicesTitle')}
          </motion.h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin opacity-20" size={48} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-secondary/20"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isAr={isAr}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/95 backdrop-blur-2xl"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0, rotateX: 20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 100, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-primary border border-secondary w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(30,45,64,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-3/5 bg-navy/10 flex items-center justify-center relative aspect-video md:aspect-auto group/media">
                {isVideoUrl(selectedService.media_url) ? (
                  <iframe
                    src={selectedService.media_url}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title={isAr ? selectedService.title_ar : selectedService.title_en}
                  />
                ) : (
                  <motion.img
                    initial={{ scale: 1.1, filter: 'grayscale(100%)' }}
                    animate={{ scale: 1, filter: 'grayscale(0%)' }}
                    transition={{ duration: 1 }}
                    src={selectedService.media_url}
                    alt={isAr ? selectedService.title_ar : selectedService.title_en}
                    className="w-full h-full object-cover p-0"
                  />
                )}
                <button
                  onClick={() => setSelectedService(null)}
                  aria-label={t('close')}
                  className="absolute top-8 right-8 bg-navy text-secondary p-4 rounded-full hover:scale-110 transition-transform z-50 shadow-2xl"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="w-full md:w-2/5 p-16 overflow-y-auto bg-primary">
                 <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl font-black uppercase tracking-tighter mb-10 leading-none"
                 >
                   {isAr ? selectedService.title_ar : selectedService.title_en}
                 </motion.h2>
                 <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl opacity-80 leading-relaxed font-medium"
                 >
                   {isAr ? selectedService.body_ar : selectedService.body_en}
                 </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

