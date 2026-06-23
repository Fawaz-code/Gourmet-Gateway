import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const hours = [
  { days: 'Monday – Thursday', time: '11:00 AM – 10:00 PM' },
  { days: 'Friday – Saturday', time: '11:00 AM – 12:00 AM' },
  { days: 'Sunday', time: '12:00 PM – 9:00 PM' },
];

const inputCls =
  'w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 resize-none';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const text =
      `🍽️ *New Message — Golden Fork Steakhouse*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n\n` +
      `💬 *Message:*\n${form.message}`;

    const waUrl = `https://wa.me/923103109222?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const fieldStyle = (name: string) => ({
    background: 'hsl(20 10% 7%)',
    border: '1px solid',
    borderColor: focused === name
      ? 'hsl(43 80% 52% / 0.6)'
      : errors[name]
        ? 'hsl(0 72% 51% / 0.5)'
        : 'hsl(30 15% 18%)',
    boxShadow: focused === name ? '0 0 0 3px hsl(43 80% 52% / 0.08)' : 'none',
  });

  return (
    <section
      id="contact"
      className="py-20 md:py-36 relative overflow-hidden"
      style={{ background: 'hsl(20 10% 9%)' }}
    >
      {/* Decorative bg texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 100%, hsl(43 80% 52% / 0.05) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 100% 0%, hsl(43 80% 52% / 0.04) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-[10px] md:text-xs uppercase tracking-[0.45em] font-medium mb-3 md:mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5 md:mb-6">
            Reserve Your Table
          </h2>
          <div className="ornament-divider w-40 mx-auto">
            <span />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8"
          >
            {/* Contact tiles */}
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-4">
              {[
                {
                  href: 'https://maps.google.com/?q=1250+Riverside+Ave+Dallas+TX+75201',
                  icon: MapPin, label: 'Address',
                  text: '1250 Riverside Ave, Dallas, TX 75201',
                  ext: true,
                },
                {
                  href: 'tel:+923103109222',
                  icon: Phone, label: 'Phone',
                  text: '+92 310 310 9222',
                  ext: false,
                },
                {
                  href: 'https://wa.me/923103109222?text=Hello%20Golden%20Fork%20Steakhouse%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20menu%20and%20dining%20services.',
                  icon: SiWhatsapp, label: 'WhatsApp',
                  text: '+92 310 310 9222',
                  ext: true, green: true,
                },
                {
                  href: 'mailto:contact@goldenforksteakhouse.com',
                  icon: Mail, label: 'Email',
                  text: 'contact@goldenforksteakhouse.com',
                  ext: false,
                },
              ].map(({ href, icon: Icon, label, text, ext, green }) => (
                <a
                  key={label}
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-start gap-3 p-3 md:p-4 transition-all duration-300"
                  style={{
                    background: 'hsl(20 10% 10%)',
                    border: '1px solid hsl(30 15% 16%)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = green ? '#25D366' : 'hsl(43 80% 52% / 0.5)';
                    (e.currentTarget as HTMLElement).style.boxShadow = green
                      ? '0 4px 20px rgba(37,211,102,0.08)'
                      : '0 4px 20px hsl(43 80% 52% / 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'hsl(30 15% 16%)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      border: `1px solid ${green ? '#25D366' : 'hsl(43 80% 52%)'}40`,
                      color: green ? '#25D366' : 'hsl(43 80% 52%)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] md:text-xs uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
                    <p className="text-foreground text-xs md:text-sm leading-relaxed break-all">{text}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Opening Hours</p>
              </div>
              <div style={{ border: '1px solid hsl(30 15% 16%)' }}>
                {hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-4 py-3 transition-colors duration-200 hover:bg-card"
                    style={{ borderBottom: i < hours.length - 1 ? '1px solid hsl(30 15% 16%)' : 'none' }}
                  >
                    <span className="text-xs md:text-sm text-muted-foreground">{h.days}</span>
                    <span className="text-xs md:text-sm font-medium text-primary">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div style={{ border: '1px solid hsl(43 80% 52% / 0.2)', overflow: 'hidden' }}>
              <iframe
                src="https://maps.google.com/maps?q=1250+Riverside+Ave+Dallas+TX+75201&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                title="Golden Fork Steakhouse Location"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 md:py-24 px-6"
                style={{ border: '1px solid hsl(43 80% 52% / 0.3)', background: 'hsl(43 80% 52% / 0.04)' }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6"
                  style={{ border: '1px solid hsl(43 80% 52% / 0.4)', background: 'hsl(43 80% 52% / 0.08)' }}
                >
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">Message Received</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. Our team will respond within 24 hours to confirm your reservation.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-8 px-7 py-2.5 text-primary text-xs uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground"
                  style={{ border: '1px solid hsl(43 80% 52% / 0.5)' }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6" data-testid="contact-form">
                {/* Label header */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="ornament-divider w-14">
                    <span />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">Make a Reservation</span>
                </div>

                {[
                  { key: 'name', label: 'Your Name', type: 'text', ph: 'John Smith' },
                  { key: 'email', label: 'Email Address', type: 'email', ph: 'you@example.com' },
                ].map(({ key, label, type, ph }) => (
                  <div key={key}>
                    <label className="block text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
                    <input
                      type={type}
                      data-testid={`input-${key}`}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      placeholder={ph}
                      className={inputCls}
                      style={fieldStyle(key)}
                    />
                    {errors[key] && <p className="text-destructive text-xs mt-1.5">{errors[key]}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-2">Message / Special Requests</label>
                  <textarea
                    data-testid="input-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your reservation, dietary preferences, or special occasion..."
                    rows={6}
                    className={inputCls}
                    style={fieldStyle('message')}
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  data-testid="button-submit"
                  className="w-full py-4 text-primary-foreground text-xs uppercase tracking-widest font-semibold transition-all active:scale-[0.98] hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, hsl(43 80% 55%) 0%, hsl(43 80% 45%) 100%)',
                    boxShadow: '0 4px 24px hsl(43 80% 52% / 0.3)',
                  }}
                >
                  Send Message
                </button>

                <p className="text-muted-foreground text-xs text-center">
                  Or call us directly at{' '}
                  <a href="tel:+923103109222" className="text-primary hover:underline font-medium">
                    +92 310 310 9222
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
