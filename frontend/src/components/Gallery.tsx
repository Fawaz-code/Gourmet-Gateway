import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85', alt: 'Elegant dining interior' },
  { src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=85', alt: 'Signature steak dish' },
  { src: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=900&q=85', alt: 'Restaurant atmosphere' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85', alt: 'Premium wagyu steak' },
  { src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=85', alt: 'Plated fine dining' },
  { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=85', alt: 'Chef at work' },
  { src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=900&q=85', alt: 'Bar area' },
  { src: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=900&q=85', alt: 'Wine selection' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=85', alt: 'Candlelit ambiance' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85', alt: 'Craft cocktails' },
  { src: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=900&q=85', alt: 'Dessert plating' },
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900&q=85', alt: 'Table setting' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="py-20 md:py-36 relative overflow-hidden"
      style={{ background: 'hsl(20 10% 9%)' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(20 10% 7%), transparent)' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(20 10% 7%), transparent)' }} />

      <div className="container mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-[10px] md:text-xs uppercase tracking-[0.45em] font-medium mb-3 md:mb-4">
            Visual Story
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5 md:mb-6">
            Inside Golden Fork
          </h2>
          <div className="ornament-divider w-40 mx-auto">
            <span />
          </div>
        </motion.div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              onClick={() => openLightbox(i)}
              data-testid={`gallery-image-${i}`}
              className={`group relative overflow-hidden cursor-pointer ${
                i === 0 || i === 5 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
              style={{ border: '1px solid hsl(43 80% 52% / 0.1)' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-active:bg-black/25 transition-all duration-200" />
              <div className="absolute inset-0 flex items-end justify-start p-2 opacity-0 group-active:opacity-100 transition-opacity">
                <span className="text-[9px] uppercase tracking-widest text-white/80">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: masonry */}
        <div className="hidden md:columns-2 md:block lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onClick={() => openLightbox(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-testid={`gallery-image-desktop-${i}`}
              className="group relative overflow-hidden cursor-pointer break-inside-avoid mb-4 transition-all duration-400"
              style={{
                border: hoveredIndex === i ? '1px solid hsl(43 80% 52% / 0.5)' : '1px solid hsl(43 80% 52% / 0.1)',
                boxShadow: hoveredIndex === i ? '0 8px 32px hsl(43 80% 52% / 0.15)' : 'none',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-400"
                style={{
                  background: hoveredIndex === i
                    ? 'linear-gradient(to bottom, hsl(43 80% 52% / 0.08), hsl(20 10% 7% / 0.65))'
                    : 'transparent',
                }}
              >
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <ZoomIn className="w-6 h-6 text-primary" />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/80">{img.alt}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Corner accents on hover */}
              <div className={`absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/0 transition-all duration-300 ${hoveredIndex === i ? 'border-primary/70' : ''}`} />
              <div className={`absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/0 transition-all duration-300 ${hoveredIndex === i ? 'border-primary/70' : ''}`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'hsl(20 10% 4% / 0.97)', backdropFilter: 'blur(8px)' }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              data-testid="lightbox-close"
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors"
              style={{ border: '1px solid hsl(43 80% 52% / 0.3)', background: 'hsl(20 10% 10%)' }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              data-testid="lightbox-prev"
              className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors"
              style={{ border: '1px solid hsl(43 80% 52% / 0.25)', background: 'hsl(20 10% 10%)' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="px-14 md:px-24 max-h-screen flex flex-col items-center justify-center"
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-w-full max-h-[80dvh] object-contain"
                style={{ border: '1px solid hsl(43 80% 52% / 0.2)' }}
              />
              <p className="text-center text-white/35 text-[10px] mt-4 uppercase tracking-[0.35em]">
                {lightboxIndex + 1} / {images.length} · {images[lightboxIndex].alt}
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              data-testid="lightbox-next"
              className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors"
              style={{ border: '1px solid hsl(43 80% 52% / 0.25)', background: 'hsl(20 10% 10%)' }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
