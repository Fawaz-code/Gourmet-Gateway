import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({
  value,
  suffix = '',
  prefix = '',
  label,
  index,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  index: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.ceil(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-8 md:py-12 px-4 relative group"
    >
      {/* Separator lines */}
      {index < 3 && (
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
      )}

      {/* Glowing number */}
      <div
        className="text-4xl md:text-6xl font-serif font-bold mb-2 tabular-nums transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, hsl(43 80% 68%) 0%, hsl(43 80% 52%) 50%, hsl(43 80% 40%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 12px hsl(43 80% 52% / 0.4))',
        }}
      >
        {prefix}{value % 1 !== 0 ? count.toFixed(1) : count}{suffix}
      </div>

      <div className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium text-center leading-relaxed">
        {label}
      </div>

      {/* Hover glow dot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary/0 group-hover:bg-primary/60 rounded-full transition-all duration-500" />
    </motion.div>
  );
};

export default function Stats() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(20 10% 7%) 0%, hsl(20 12% 9%) 50%, hsl(20 10% 7%) 100%)',
        borderTop: '1px solid hsl(43 80% 52% / 0.15)',
        borderBottom: '1px solid hsl(43 80% 52% / 0.15)',
      }}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 50%, hsl(43 80% 52% / 0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <StatCounter value={15} suffix="+" label="Years of Excellence" index={0} />
          <StatCounter value={50} suffix="K+" label="Happy Guests" index={1} />
          <StatCounter value={4.9} label="Average Rating" index={2} />
          <StatCounter value={100} suffix="+" label="Signature Dishes" index={3} />
        </div>
      </div>
    </section>
  );
}
