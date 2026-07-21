import { motion } from 'framer-motion';

const CoreBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#05070a]">
    {/* Animated Grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(to right, #c5a059 1px, transparent 1px), linear-gradient(to bottom, #c5a059 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
    />

    {/* Radial Glows */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)]"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(197,160,89,0.05)_0%,transparent_70%)]"
    />
  </div>
);

export default CoreBackground;
