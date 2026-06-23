import React from 'react';
import { motion } from 'framer-motion';
import { Award, ChefHat, Glasses, Star } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Ingredients',
    text: 'Only USDA Prime and A5 Wagyu beef, sourced directly from the world\'s finest ranches.',
  },
  {
    icon: ChefHat,
    title: 'Expert Chefs',
    text: 'Our culinary team brings decades of Michelin-starred experience to every dish.',
  },
  {
    icon: Glasses,
    title: 'Fine Dining Atmosphere',
    text: 'Elegant interiors designed to create the perfect ambiance for any occasion.',
  },
  {
    icon: Star,
    title: 'Exceptional Service',
    text: 'Every guest is treated like royalty from arrival to farewell.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-36 bg-background relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 80% 20%, hsl(43 80% 52% / 0.12) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 80%, hsl(20 10% 4% / 0.8) 0%, transparent 65%)',
        }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Image Column */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Decorative offset frame — desktop */}
              <div
                className="hidden md:block absolute -inset-3 -z-10"
                style={{
                  border: '1px solid hsl(43 80% 52% / 0.2)',
                  transform: 'translate(16px, 16px)',
                }}
              />

              {/* Main image */}
              <div className="relative overflow-hidden" style={{ border: '1px solid hsl(43 80% 52% / 0.15)' }}>
                <img
                  src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=900&q=85"
                  alt="Golden Fork Steakhouse Interior"
                  className="w-full aspect-[4/3] md:aspect-[4/5] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-primary/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-primary/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-primary/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-primary/50" />
              </div>

              {/* Est. badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 flex flex-col items-center justify-center shadow-2xl p-4 md:p-6"
                style={{
                  background: 'hsl(20 10% 10%)',
                  border: '1px solid hsl(43 80% 52% / 0.5)',
                  boxShadow: '0 8px 32px hsl(43 80% 52% / 0.2)',
                }}
              >
                <span className="text-primary font-serif text-lg md:text-3xl italic leading-none">Est.</span>
                <span className="text-foreground font-serif text-2xl md:text-4xl font-bold leading-tight">2009</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="ornament-divider w-20">
                <span />
              </div>
              <span className="text-primary text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase whitespace-nowrap">
                Our Story
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
              A Legacy of Culinary{' '}
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, hsl(43 80% 70%) 0%, hsl(43 80% 52%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Excellence
              </em>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10 text-sm md:text-lg font-light">
              Golden Fork Steakhouse was founded in 2009 with a singular vision: to create a dining experience
              that transcends the ordinary. Nestled in the heart of Dallas, Texas, we have spent over fifteen
              years perfecting the art of fine dining. Our Executive Chef, James Harrington, trained at the
              finest culinary institutions in Paris and New York before bringing his expertise to our kitchen.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {features.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="group flex gap-3 md:gap-4 p-3 md:p-4 border border-border hover:border-primary/40 transition-all duration-300"
                  style={{ background: 'hsl(20 10% 10%)' }}
                >
                  <div
                    className="mt-0.5 p-2.5 md:p-3 shrink-0 self-start transition-all duration-300 group-hover:shadow-[0_0_16px_hsl(43_80%_52%/0.3)]"
                    style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(43 80% 52% / 0.2)' }}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium text-sm md:text-base mb-1 group-hover:text-primary transition-colors duration-300">{title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
