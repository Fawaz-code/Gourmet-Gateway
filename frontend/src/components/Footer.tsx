import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const hours = [
  { days: 'Mon – Thu', time: '11AM – 10PM' },
  { days: 'Fri – Sat', time: '11AM – 12AM' },
  { days: 'Sunday', time: '12PM – 9PM' },
];

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-5 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Mobile: logo + social centered, then 2-col grid */}
          <div className="flex flex-col items-center text-center mb-8 md:hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M7 2v10m5-10v10m5-10v10M8 12c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5V2" />
                <path d="M12 15.5V22" />
              </svg>
              <div className="text-left">
                <span className="font-serif text-base tracking-wide text-primary block leading-tight">Golden Fork</span>
                <span className="text-[0.5rem] font-sans tracking-[0.3em] text-primary/70 uppercase">Steakhouse</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mb-4">
              Golden Fork Steakhouse redefines luxury dining in the heart of Dallas, Texas.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile: 2-col info grid */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-primary mb-3">Quick Links</h4>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-muted-foreground text-xs hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-primary mb-3">Contact</h4>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-xs">1250 Riverside Ave, Dallas, TX</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-primary shrink-0" />
                  <a href="tel:+923103109222" className="text-muted-foreground text-xs hover:text-primary transition-colors">+92 310 310 9222</a>
                </li>
                <li className="flex items-start gap-1.5">
                  <Mail className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <a href="mailto:contact@goldenforksteakhouse.com" className="text-muted-foreground text-xs hover:text-primary transition-colors break-all">contact@goldenfork<br/>steakhouse.com</a>
                </li>
              </ul>

              <h4 className="text-[9px] uppercase tracking-widest text-primary mb-2 mt-5">Hours</h4>
              <ul className="flex flex-col gap-1">
                {hours.map((h, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="text-muted-foreground text-[10px]">{h.days}</span>
                    <span className="text-primary text-[10px] font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: original 4-col */}
          <div className="hidden md:grid grid-cols-4 gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M7 2v10m5-10v10m5-10v10M8 12c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5V2" />
                  <path d="M12 15.5V22" />
                </svg>
                <div>
                  <span className="font-serif text-lg tracking-wide text-primary block">Golden Fork</span>
                  <span className="text-[0.55rem] font-sans tracking-[0.3em] text-primary/70 uppercase">Steakhouse</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Golden Fork Steakhouse redefines luxury dining in the heart of Dallas, Texas. Experience the finest steaks and unparalleled hospitality.
              </p>
              <div className="flex gap-3 mt-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary mb-5">Quick Links</h4>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary mb-5">Contact</h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>1250 Riverside Avenue,<br />Dallas, TX 75201</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+923103109222" className="text-muted-foreground hover:text-primary transition-colors">+92 310 310 9222</a>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:contact@goldenforksteakhouse.com" className="text-muted-foreground hover:text-primary transition-colors break-all">contact@goldenforksteakhouse.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary mb-5">Opening Hours</h4>
              <ul className="flex flex-col gap-2">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.days}</span>
                    <span className="text-foreground font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-[10px] md:text-xs text-center sm:text-left">
            © 2026 Golden Fork Steakhouse. All Rights Reserved.
          </p>
          <p className="text-muted-foreground/40 text-[10px] md:text-xs hidden sm:block">
            Premium Steaks · Fine Dining · Exceptional Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
