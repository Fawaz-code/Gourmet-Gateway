import React, { useEffect, useRef } from 'react';
import { Flame } from 'lucide-react';

const specials = [
  { label: "Chef's Special", dish: 'Wagyu A5 Tenderloin', note: 'Limited tonight' },
  { label: 'Weekend Feature', dish: 'Whole Maine Lobster', note: 'Market price' },
  { label: 'New This Week', dish: 'Truffle Butter Ribeye', note: 'Must try' },
  { label: 'Dessert Special', dish: 'Molten Lava Soufflé', note: 'Made to order' },
  { label: "Sommelier's Pick", dish: 'Château Margaux 2016', note: 'Pairs with Wagyu' },
  { label: 'Happy Hour', dish: 'Golden Mocktail Duo', note: '5PM – 7PM daily' },
];

const TickerItem = ({ item }: { item: typeof specials[0] }) => (
  <span className="flex items-center gap-3 px-8 shrink-0 whitespace-nowrap">
    <Flame className="w-3 h-3 text-primary shrink-0" style={{ filter: 'drop-shadow(0 0 4px hsl(43 80% 52% / 0.8))' }} />
    <span className="text-[9px] uppercase tracking-[0.3em] text-primary/70">{item.label}</span>
    <span className="text-[10px] font-serif italic text-foreground/90">{item.dish}</span>
    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">— {item.note}</span>
  </span>
);

export default function SpecialsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let raf: number;
    const speed = 0.5;

    const loop = () => {
      pos -= speed;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(pos) >= halfWidth) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const allItems = [...specials, ...specials];

  return (
    <div
      className="fixed top-[52px] md:top-[73px] left-0 right-0 z-40 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, hsl(20 10% 7%) 0%, hsl(20 12% 8%) 50%, hsl(20 10% 7%) 100%)',
        borderBottom: '1px solid hsl(43 80% 52% / 0.2)',
        borderTop: '1px solid hsl(43 80% 52% / 0.1)',
        height: '32px',
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(20 10% 7%), transparent)' }}
      />

      {/* Label pill */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-3 gap-2"
        style={{
          background: 'hsl(43 80% 52%)',
          minWidth: 'max-content',
        }}
      >
        <Flame className="w-3 h-3 text-primary-foreground" />
        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-primary-foreground">
          Specials
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex items-center h-full ml-24">
        <div ref={trackRef} className="flex items-center h-full will-change-transform">
          {allItems.map((item, i) => (
            <React.Fragment key={i}>
              <TickerItem item={item} />
              {/* Dot separator */}
              <span
                className="w-1 h-1 shrink-0"
                style={{
                  background: 'hsl(43 80% 52% / 0.4)',
                  borderRadius: '50%',
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(20 10% 7%), transparent)' }}
      />
    </div>
  );
}
