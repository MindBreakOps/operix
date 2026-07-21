import { motion } from 'framer-motion';

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

export default BackgroundPulse;
