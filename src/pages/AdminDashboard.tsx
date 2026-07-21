import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabaseClient as supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ label, value, id }: { label: string; value: string; id: string }) => (
  <div className="border border-secondary p-8 flex flex-col justify-between aspect-square">
    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{label}</span>
    <h3 className="text-6xl font-black uppercase tracking-tighter">{value}</h3>
    <span className="text-[10px] font-black uppercase tracking-widest opacity-20">{id}</span>
  </div>
);

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();

  const [visitorCount, setVisitorCount] = useState(0);
  const [cmsItems, setCmsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { count } = await supabase
        .from('operix_visitor_logs')
        .select('*', { count: 'exact', head: true });
      if (count) setVisitorCount(count);

      const { data } = await supabase
        .from('operix_cms_content')
        .select('*')
        .order('updated_at', { ascending: false });
      if (data) setCmsItems(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-primary text-secondary min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase"
            >
              {t('adminTitle', 'ADMIN')}
            </motion.h1>
            <div className="h-2 w-24 bg-secondary mt-8 mb-4" />
            <p className="text-xl font-bold uppercase tracking-widest opacity-40">
              Logged in as: {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="border-2 border-primary px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all"
          >
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-secondary mb-24">
          <div className="border-r border-b border-secondary">
            <StatCard label="Total Traffic" value={visitorCount.toLocaleString()} id="TRF-01" />
          </div>
          <div className="border-r border-b border-secondary">
            <StatCard label="Content Records" value={cmsItems.length.toString()} id="CMS-01" />
          </div>
          <div className="border-r border-b border-secondary">
            <StatCard label="System Status" value="100%" id="SYS-01" />
          </div>
          <div className="border-r border-b border-secondary">
            <StatCard label="Region" value="KSA" id="LOC-01" />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Content Database</h2>
            <div className="h-px flex-grow bg-secondary/10 mx-8" />
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-sm font-black uppercase tracking-widest opacity-40">Loading Database...</p>
            ) : (
              cmsItems.map((item) => (
                <div key={item.id} className="border border-secondary/10 p-8 flex flex-col md:flex-row justify-between md:items-center gap-8 hover:border-secondary transition-colors">
                  <div className="max-w-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-2">{item.page} / {item.section_key}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{item.title_en}</h3>
                    <p className="text-sm font-medium opacity-60 line-clamp-2">{item.body_en}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="border border-primary px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-secondary transition-colors">
                      Edit
                    </button>
                    <button className="border border-primary px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-secondary transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
