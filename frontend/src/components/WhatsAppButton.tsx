import React from 'react';
import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';

const WA_URL =
  'https://wa.me/923103109222?text=Hello%20Golden%20Fork%20Steakhouse%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20menu%20and%20dining%20services.';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-[5.5rem] right-5 md:bottom-24 md:right-6 z-50 group">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-floating-btn"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
      >
        <SiWhatsapp className="w-5 h-5 md:w-7 md:h-7 text-white" />
      </motion.a>

      {/* Tooltip — desktop only */}
      <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-card border border-border text-foreground text-xs uppercase tracking-widest px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </div>
    </div>
  );
}
