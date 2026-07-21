import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabaseClient as supabase } from '../config/supabase';
import { Loader2, Calendar, ArrowUpRight, X } from 'lucide-react';
import BackgroundPulse from '../components/BackgroundPulse';

const ProductNode = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 border border-secondary/20 rotate-45" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-secondary" />
    </div>
  </div>
);

const NewsCard = ({ article, index, isAr, formatDate, onClick }: { article: any, index: number, isAr: boolean, formatDate: (d: string) => string, onClick: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="border-r border-b border-secondary/10 p-12 group flex flex-col justify-between hover:bg-navy hover:text-white transition-all duration-700 cursor-pointer relative overflow-hidden min-h-[500px]"
      onClick={onClick}
    >
      {/* Image Reveal Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
         <motion.img
           src={article.media_url}
           className="w-full h-full object-cover grayscale opacity-20 scale-110 group-hover:scale-100 transition-transform duration-1000"
         />
         <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
      </div>

      {/* Lighting Effect Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 80%)`
        }}
      />

      <div className="space-y-12 relative z-20">
        <div className="flex items-center gap-4 opacity-40 text-xs font-black uppercase tracking-[0.3em] group-hover:opacity-100 transition-opacity">
          <Calendar size={16} className="text-secondary group-hover:text-white" />
          {formatDate(article.updated_at)}
        </div>

        <div className="space-y-6">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter line-clamp-3 leading-[0.9] group-hover:translate-x-2 transition-transform duration-700 text-secondary group-hover:text-white">
            {isAr ? article.title_ar : article.title_en}
          </h3>
          <div className="w-12 h-1 bg-secondary/20 group-hover:bg-gold group-hover:w-24 transition-all duration-700" />
        </div>

        <p className="text-lg opacity-60 uppercase font-medium line-clamp-3 leading-relaxed group-hover:opacity-80">
          {isAr ? article.body_ar : article.body_en}
        </p>
      </div>

      <div className="mt-12 flex justify-between items-end relative z-20">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{t('readIntelligence')}</span>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 45 }}
          className="p-4 border border-navy/20 group-hover:border-secondary/40 transition-colors"
        >
          <ArrowUpRight className="opacity-40 group-hover:opacity-100" size={32} />
        </motion.div>
      </div>
    </motion.div>
  );
};


export default function News() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('operix_cms_content')
        .select('*')
        .eq('page', 'news')
        .order('updated_at', { ascending: false });

      if (!error && data) {
        setNews(data);
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <BackgroundPulse />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <ProductNode />
            <span className="text-sm font-black uppercase tracking-widest opacity-40 text-secondary">{t('navNews')}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-secondary">
            {t('newsMainTitle')}
          </motion.h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin opacity-20 text-secondary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-secondary/10">
            {news.map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                index={index}
                isAr={isAr}
                formatDate={formatDate}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-xl"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-secondary border border-navy/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="w-full md:w-1/2 bg-navy/5 flex items-center justify-center relative aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-navy/10">
                  <div className="w-full h-full flex items-center justify-center opacity-10 font-black uppercase text-4xl">{t('newsMediaPlaceholder')}</div>
                  <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 bg-navy text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"><X size={20}/></button>
               </div>
               <div className="w-full md:w-1/2 p-12 overflow-y-auto">
                  <div className="flex items-center gap-3 opacity-40 text-xs font-black uppercase tracking-[0.2em] mb-6">
                    <Calendar size={14} className="text-gold" /> {formatDate(selectedArticle.updated_at)}
                  </div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-secondary">{isAr ? selectedArticle.title_ar : selectedArticle.title_en}</h2>
                  <p className="text-lg opacity-70 leading-relaxed whitespace-pre-line">
                    {isAr ? selectedArticle.body_ar : selectedArticle.body_en}
                  </p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
