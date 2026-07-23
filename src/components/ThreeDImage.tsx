import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ThreeDImage: React.FC<ThreeDImageProps> = ({ src, alt, className, containerClassName }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${containerClassName}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className={`w-full h-full ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />

        {/* Shine Overlay */}
        <motion.div
          style={{
            transform: "translateZ(51px)",
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]) => `radial-gradient(circle at ${50 + (x as number) * 100}% ${50 + (y as number) * 100}%, rgba(255,255,255,0.1) 0%, transparent 70%)`
            ),
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default ThreeDImage;
