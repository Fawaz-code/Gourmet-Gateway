import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

type Message = {
  role: 'ai' | 'user';
  text: string;
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (/menu|food|eat|dish|order|offer/.test(lower)) return 'We offer a premium selection of USDA Prime Steaks, fresh Seafood, handmade Pasta, gourmet Burgers, indulgent Desserts, and crafted Drinks. Would you like details on any specific category?';
  if (/steak|ribeye|wagyu|filet|strip/.test(lower)) return 'Our steaks are the crown jewels of our menu! Signature Ribeye ($68), Wagyu A5 ($145), Filet Mignon ($78), and New York Strip ($55). The Wagyu A5 is our most prized offering.';
  if (/burger/.test(lower)) return 'Our burgers feature USDA Prime beef: Golden Classic Burger ($24), BBQ Smoke Burger ($26), and Double Cheese Burger ($22). All on premium brioche buns.';
  if (/seafood|salmon|shrimp|lobster/.test(lower)) return 'Our seafood: Grilled Salmon ($38), Garlic Butter Shrimp ($32), and the legendary Lobster Special ($95) — a true luxury experience.';
  if (/pasta|alfredo|mushroom/.test(lower)) return 'Our handmade pasta dishes: Alfredo Pasta ($28), Creamy Mushroom Pasta ($26), and Chicken Parmesan Pasta ($30).';
  if (/dessert|cake|cheesecake|tiramisu/.test(lower)) return 'Desserts: Chocolate Lava Cake ($16), New York Cheesecake ($14), and Tiramisu ($15). Our lava cake is legendary.';
  if (/drink|juice|coffee|mocktail/.test(lower)) return 'We offer Fresh Juices ($8), Signature Mocktails ($12), Soft Drinks ($5), and Coffee Selection ($7) with single-origin pour-overs.';
  if (/hour|open|close|time|schedule/.test(lower)) return 'Open Monday–Thursday 11AM–10PM, Friday–Saturday 11AM–12AM, and Sunday 12PM–9PM.';
  if (/location|address|where|direction|map/.test(lower)) return 'We are at 1250 Riverside Avenue, Dallas, Texas 75201 — in the heart of Dallas, worth the journey.';
  if (/phone|contact|call|email/.test(lower)) return 'Call us at +92 310 310 9222 or email contact@goldenforksteakhouse.com.';
  if (/reservation|book|reserve|table/.test(lower)) return 'We accept reservations by phone at +92 310 310 9222 or via WhatsApp. We recommend booking 48 hours ahead for weekend dining.';
  if (/price|cost|expensive/.test(lower)) return 'Our menu ranges from $5 for drinks to $145 for our A5 Wagyu. Most entrees fall between $22–$78.';
  if (/chef|cook|kitchen/.test(lower)) return 'Executive Chef James Harrington trained in Paris and New York. Our team brings decades of Michelin-starred experience to every plate.';
  if (/parking|valet/.test(lower)) return 'Complimentary valet parking on weekends. Street parking and nearby garages available on weekdays.';
  if (/hello|hi|hey/.test(lower)) return 'Welcome! Great to have you here. Ask me anything about our menu, hours, location, or reservations.';
  if (/thank/.test(lower)) return 'Our pleasure! We look forward to welcoming you at Golden Fork Steakhouse. Anything else I can help with?';
  return "I'm here to assist with Golden Fork Steakhouse services and menu information. Feel free to ask about our menu, hours, location, or reservations!";
}

export default function TastyAI() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-tasty-ai', handler);
    return () => window.removeEventListener('open-tasty-ai', handler);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am Tasty AI, your Golden Fork Steakhouse assistant. Ask me about our menu, hours, location, or reservations.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'ai', text: getAIResponse(text) }]);
    }, 700);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        data-testid="tastyai-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Tasty AI"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
        transition={{
          scale: { delay: 1.5, type: 'spring', stiffness: 260, damping: 20 },
          opacity: { delay: 1.5, duration: 0.3 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              data-testid="tastyai-panel"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="
                fixed z-50 border border-border shadow-2xl overflow-hidden flex flex-col
                bottom-0 left-0 right-0 rounded-t-2xl
                md:bottom-24 md:right-6 md:left-auto md:rounded-none md:w-96
              "
              style={{
                background: 'hsl(20 10% 10% / 0.98)',
                backdropFilter: 'blur(20px)',
                maxHeight: '85dvh',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-card/40 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-primary/15 border border-primary/40 flex items-center justify-center rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold leading-tight">Tasty AI</p>
                    <p className="text-muted-foreground text-[9px] uppercase tracking-widest">Golden Fork Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  data-testid="tastyai-close-btn"
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick prompts — shown only when minimal messages */}
              {messages.length <= 1 && (
                <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2 shrink-0">
                  {['View Menu', 'Opening Hours', 'Make Reservation'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          const synth = { trim: () => q };
                          setMessages((prev) => [...prev, { role: 'user', text: q }]);
                          setIsTyping(true);
                          setTimeout(() => {
                            setIsTyping(false);
                            setMessages((prev) => [...prev, { role: 'ai', text: getAIResponse(q) }]);
                          }, 700);
                        }, 0);
                      }}
                      className="text-[10px] px-3 py-1.5 border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1 min-h-0" style={{ minHeight: 200 }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-foreground'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mr-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-card border border-border px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.22 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-card/20 shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  data-testid="tastyai-input"
                  placeholder="Ask about our menu, hours..."
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none py-1"
                />
                <button
                  onClick={sendMessage}
                  data-testid="tastyai-send-btn"
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 hover:bg-primary/90 active:scale-90 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
