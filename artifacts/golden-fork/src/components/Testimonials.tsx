import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    review:
      'The Wagyu A5 was unlike anything I have experienced in the United States. The service was impeccable, the atmosphere breathtaking. Golden Fork has permanently raised my standards for fine dining.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    review:
      'We celebrated our 10th anniversary here and it was absolutely perfect. The Filet Mignon melted in our mouths, and our sommelier made the evening feel like a private experience. Worth every penny.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    location: 'Houston, TX',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    review:
      'As a frequent visitor to Dallas, Golden Fork is my first call every trip. The consistency is remarkable — every visit feels like the first time, yet somehow even better.',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    review:
      'The chocolate lava cake alone is worth the drive from Austin. But truly, every course of our tasting menu was a revelation. The kitchen is operating at a Michelin-star level.',
    rating: 5,
  },
  {
    name: 'Robert Kimura',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    review:
      "I have dined at three-star restaurants in Tokyo, Paris, and New York. Golden Fork belongs in that conversation. Chef Harrington's techniques are world-class.",
    rating: 5,
  },
  {
    name: 'Amanda Foster',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80',
    review:
      'From the moment we walked in, the staff made us feel like royalty. The Ribeye was perfectly charred outside, pink inside — exactly as requested. The best steak I have ever had.',
    rating: 5,
  },
];

const TestimonialCard = ({ t, i, mobile = false }: { t: typeof testimonials[0]; i: number; mobile?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: mobile ? 0 : 32, x: mobile ? 20 : 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: mobile ? i * 0.07 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    data-testid={`testimonial-card-${mobile ? '' : 'desktop-'}${i}`}
    className="group relative flex flex-col gap-4 transition-all duration-400"
    style={{
      background: 'hsl(20 10% 10%)',
      border: '1px solid hsl(30 15% 16%)',
      padding: mobile ? '20px' : '28px',
      flexShrink: mobile ? 0 : undefined,
      width: mobile ? '80vw' : undefined,
      maxWidth: mobile ? '300px' : undefined,
      scrollSnapAlign: mobile ? 'start' : undefined,
    }}
  >
    {/* Hover glow border */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 0 1px hsl(43 80% 52% / 0.35), 0 8px 32px hsl(43 80% 52% / 0.08)' }}
    />

    {/* Decorative quote mark */}
    <div
      className="absolute top-4 right-5 font-serif text-6xl md:text-7xl leading-none select-none pointer-events-none"
      style={{ color: 'hsl(43 80% 52% / 0.12)', lineHeight: 1 }}
    >
      "
    </div>

    {/* Stars */}
    <div className="flex gap-0.5">
      {[...Array(t.rating)].map((_, s) => (
        <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>

    {/* Review */}
    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-1 italic relative z-10">
      "{t.review}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid hsl(30 15% 16%)' }}>
      <div className="relative">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover"
          style={{ border: '1px solid hsl(43 80% 52% / 0.4)' }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: '0 0 10px hsl(43 80% 52% / 0.4)' }}
        />
      </div>
      <div>
        <p className="text-foreground font-medium text-xs md:text-sm">{t.name}</p>
        <p className="text-muted-foreground text-[10px]">{t.location}</p>
      </div>
    </div>
  </motion.div>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-36 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 50% at 50% 0%, hsl(43 80% 52% / 0.04) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-[10px] md:text-xs uppercase tracking-[0.45em] font-medium mb-3 md:mb-4">
            Guest Reviews
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5 md:mb-6">
            What Our Guests Say
          </h2>
          <div className="ornament-divider w-40 mx-auto mb-7 md:mb-10">
            <span />
          </div>

          {/* Rating badge */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 px-5 md:px-7 py-3"
            style={{
              border: '1px solid hsl(43 80% 52% / 0.3)',
              background: 'hsl(43 80% 52% / 0.06)',
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-primary font-semibold text-xs md:text-sm">4.9/5 Average Rating</span>
            <span className="text-muted-foreground text-xs hidden sm:inline">·</span>
            <span className="text-muted-foreground text-xs md:text-sm">50,000+ Reviews</span>
          </div>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden mt-8 -mx-5">
          <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide snap-x snap-mandatory">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} mobile />
            ))}
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full" style={{ background: i === 0 ? 'hsl(43 80% 52%)' : 'hsl(30 15% 25%)' }} />
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
