import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.16, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)' }}
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* Animated vignette glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, hsl(43 80% 52% / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full container mx-auto px-5 text-center max-w-4xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ornament */}
        <motion.div variants={itemVariants} className="mb-4 md:mb-6">
          <div className="ornament-divider w-36 md:w-56 mx-auto">
            <span />
          </div>
        </motion.div>

        {/* Tagline pill — animated shimmer border */}
        <motion.div variants={itemVariants} className="mb-4 md:mb-6">
          <span
            className="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-primary/90 inline-block px-4 py-2"
            style={{
              border: '1px solid',
              borderImage: 'linear-gradient(90deg, hsl(43 80% 52% / 0.2), hsl(43 80% 52% / 0.7), hsl(43 80% 52% / 0.2)) 1',
              background: 'hsl(43 80% 52% / 0.06)',
            }}
          >
            Premium Steaks · Fine Dining · Dallas, TX
          </span>
        </motion.div>

        {/* Headline — animated gold shimmer gradient */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.08] mb-4 md:mb-6 tracking-tight"
        >
          <span className="gold-gradient-text drop-shadow-[0_2px_24px_hsl(43_80%_52%/0.25)]">
            Experience Fine Dining
            <br />
            Like Never Before
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-xl text-gray-300/90 font-light mb-6 md:mb-10 max-w-sm md:max-w-xl mx-auto leading-relaxed"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
        >
          Award-winning steaks, handcrafted dishes, premium ingredients, and unforgettable dining experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-xs sm:max-w-none"
        >
          <button
            onClick={() => scrollTo('#menu')}
            data-testid="btn-explore-menu"
            className="group flex-1 sm:flex-none relative overflow-hidden px-6 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground font-medium uppercase tracking-widest text-[10px] md:text-xs transition-all active:scale-95"
            style={{ boxShadow: '0 4px 24px hsl(43 80% 52% / 0.35)' }}
          >
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            data-testid="btn-contact"
            className="group flex-1 sm:flex-none px-6 md:px-10 py-3 md:py-4 border border-white/40 text-white font-medium uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/10 hover:border-white/70 active:scale-95 transition-all backdrop-blur-sm"
          >
            Reserve a Table
          </button>
        </motion.div>

        {/* Quick stats strip — mobile */}
        <motion.div
          variants={itemVariants}
          className="mt-7 grid grid-cols-3 gap-2 w-full max-w-xs md:hidden"
        >
          {[
            { label: 'Open Today', value: '11AM–10PM' },
            { label: 'Rating', value: '4.9 ★' },
            { label: 'Since', value: '2009' },
          ].map((item) => (
            <div
              key={item.label}
              className="py-2"
              style={{
                background: 'hsl(43 80% 52% / 0.05)',
                border: '1px solid hsl(43 80% 52% / 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="text-[8px] uppercase tracking-wider text-white/35 mb-0.5">{item.label}</p>
              <p className="text-[11px] text-primary font-semibold">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
