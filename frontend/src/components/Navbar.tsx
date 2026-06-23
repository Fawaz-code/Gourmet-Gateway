import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const WA_URL =
  'https://wa.me/923103109222?text=Hello%20Golden%20Fork%20Steakhouse%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20menu%20and%20dining%20services.';

const openTastyAI = () => {
  window.dispatchEvent(new CustomEvent('open-tasty-ai'));
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border py-3 md:py-4'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-2.5 z-50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary md:w-6 md:h-6">
            <path d="M7 2v10m5-10v10m5-10v10M8 12c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5V2"/>
            <path d="M12 15.5V22"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base md:text-xl tracking-wide text-primary">Golden Fork</span>
            <span className="text-[0.5rem] md:text-[0.6rem] font-sans tracking-[0.3em] text-primary/70 uppercase">Steakhouse</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openTastyAI}
            data-testid="nav-tastyai-btn"
            className="flex items-center gap-2 border border-primary text-primary px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tasty AI</span>
          </button>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-whatsapp-btn"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#1db954] transition-colors"
          >
            <SiWhatsapp className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile: Right side — Tasty AI icon + Hamburger */}
        <div className="flex items-center gap-3 md:hidden z-50">
          <button
            onClick={openTastyAI}
            data-testid="nav-tastyai-mobile-btn"
            aria-label="Open Tasty AI"
            className="w-8 h-8 border border-primary/60 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="w-8 h-8 flex items-center justify-center text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full screen slide-down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 min-h-screen bg-background/97 backdrop-blur-xl border-b border-border flex flex-col"
          >
            {/* Top bar inside menu */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M7 2v10m5-10v10m5-10v10M8 12c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5V2"/>
                  <path d="M12 15.5V22"/>
                </svg>
                <span className="font-serif text-sm text-primary">Golden Fork Steakhouse</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-5 pt-8 pb-6">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="flex items-center justify-between py-4 border-b border-border/40 text-foreground hover:text-primary transition-colors group"
                    >
                      <span className="font-serif text-xl">{link.name}</span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest uppercase">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="px-5 pb-10 flex flex-col gap-3"
            >
              <button
                onClick={() => { setMobileMenuOpen(false); openTastyAI(); }}
                className="flex items-center justify-center gap-2 border border-primary text-primary py-3.5 text-xs font-medium uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Chat with Tasty AI</span>
              </button>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 text-xs font-medium uppercase tracking-widest hover:bg-[#1db954] transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
              <p className="text-center text-muted-foreground/50 text-[10px] mt-2 uppercase tracking-widest">
                © 2026 Golden Fork Steakhouse
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
