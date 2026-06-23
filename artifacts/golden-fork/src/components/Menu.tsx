import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MenuItem = { name: string; description: string; price: string; image: string; badge?: string };
type MenuCategory = { id: string; label: string; emoji: string; items: MenuItem[] };

const menuData: MenuCategory[] = [
  {
    id: 'steaks',
    label: 'Steaks',
    emoji: '🥩',
    items: [
      { name: 'Signature Ribeye', description: '32-day dry-aged USDA Prime ribeye, wood-fired to perfection. Served with truffle butter, roasted garlic, and seasonal vegetables.', price: '$68', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80', badge: "Chef's Choice" },
      { name: 'Wagyu Steak A5', description: 'Authentic Japanese A5 Wagyu, the pinnacle of beef excellence. Rich marbling delivers an unparalleled melt-in-mouth experience.', price: '$145', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', badge: 'Premium' },
      { name: 'Filet Mignon', description: '6oz center-cut tenderloin, the most tender cut available. Pan-seared in clarified butter with fresh thyme and shallots.', price: '$78', image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80' },
      { name: 'New York Strip', description: 'Bold, beefy flavor in a thick 14oz cut. Seasoned with our signature dry rub and served with house-made steak sauce.', price: '$55', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80' },
    ],
  },
  {
    id: 'burgers',
    label: 'Burgers',
    emoji: '🍔',
    items: [
      { name: 'Golden Classic Burger', description: 'Half-lb USDA Prime patty, aged white cheddar, caramelized onions, lettuce, tomato, and our secret golden sauce on a brioche bun.', price: '$24', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', badge: 'Best Seller' },
      { name: 'BBQ Smoke Burger', description: 'Double smoked-beef patties, applewood bacon, crispy onion rings, smoky BBQ sauce, and jalapenos. A bold flavor statement.', price: '$26', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80' },
      { name: 'Double Cheese Burger', description: 'Two premium beef patties, double American cheese, house pickles, mustard, and ketchup. A timeless classic elevated.', price: '$22', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80' },
    ],
  },
  {
    id: 'seafood',
    label: 'Seafood',
    emoji: '🦞',
    items: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon fillet, herb-crusted and grilled. Served with lemon beurre blanc, asparagus, and wild rice pilaf.', price: '$38', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80' },
      { name: 'Garlic Butter Shrimp', description: 'Gulf shrimp sauteed in aged garlic butter, white wine, fresh herbs, and a touch of chili. Served over creamy polenta.', price: '$32', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80' },
      { name: 'Lobster Special', description: 'Whole Maine lobster, split and broiled with drawn butter, tarragon, and fine herbs. A true luxury experience.', price: '$95', image: 'https://images.unsplash.com/photo-1533682805518-37b4e1f2b77b?w=600&q=80', badge: 'Seasonal' },
    ],
  },
  {
    id: 'pasta',
    label: 'Pasta',
    emoji: '🍝',
    items: [
      { name: 'Alfredo Pasta', description: 'Handmade fettuccine in a classic Parmesan cream sauce, finished with black truffle shavings and fresh herbs.', price: '$28', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80' },
      { name: 'Creamy Mushroom Pasta', description: 'Wild mushroom medley, Marsala wine reduction, and a rich cream sauce over fresh pappardelle. Earthy and indulgent.', price: '$26', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&q=80' },
      { name: 'Chicken Parmesan Pasta', description: 'Pan-fried chicken breast, house tomato sauce, fresh mozzarella, and basil over rigatoni. A comforting classic.', price: '$30', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    emoji: '🍫',
    items: [
      { name: 'Chocolate Lava Cake', description: 'Warm dark chocolate cake with a molten center, served with Tahitian vanilla bean ice cream and raspberry coulis.', price: '$16', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80', badge: 'Must Try' },
      { name: 'New York Cheesecake', description: 'Classic New York-style cheesecake, dense and creamy, with a graham cracker crust and seasonal berry compote.', price: '$14', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80' },
      { name: 'Tiramisu', description: 'Authentic Italian tiramisu with mascarpone cream, espresso-soaked ladyfingers, and a dusting of premium cocoa.', price: '$15', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80' },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    emoji: '🍹',
    items: [
      { name: 'Fresh Juices', description: 'Seasonal fresh-pressed juices: orange, grapefruit, watermelon, green apple, and carrot-ginger.', price: '$8', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80' },
      { name: 'Signature Mocktails', description: 'Handcrafted non-alcoholic cocktails including Golden Sunrise, Berry Bliss, and our signature Steakhouse Cooler.', price: '$12', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80', badge: 'New' },
      { name: 'Soft Drinks', description: 'Premium bottled sodas, sparkling water, and house-made lemonades.', price: '$5', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&q=80' },
      { name: 'Coffee Selection', description: 'Single-origin pour-overs, French press, espresso, and our signature Golden Fork blend.', price: '$7', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80' },
    ],
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('steaks');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const currentCategory = menuData.find((c) => c.id === activeCategory)!;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
    }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
  };

  return (
    <section id="menu" className="py-20 md:py-36 bg-background relative overflow-hidden">
      {/* Subtle top/bottom gradient separators */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, hsl(43 80% 52% / 0.04) 0%, transparent 70%)' }} />

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
            Our Offerings
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5 md:mb-6">
            The Golden Fork Menu
          </h2>
          <div className="ornament-divider w-40 mx-auto">
            <span />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex overflow-x-auto gap-2 pb-1 md:flex-wrap md:justify-center scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            {menuData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`tab-${cat.id}`}
                className="whitespace-nowrap shrink-0 px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-1.5"
                style={{
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'hsl(43 80% 52%)' : 'hsl(30 15% 16%)',
                  background: activeCategory === cat.id ? 'hsl(43 80% 52%)' : 'transparent',
                  color: activeCategory === cat.id ? 'hsl(20 10% 7%)' : 'hsl(40 10% 58%)',
                  boxShadow: activeCategory === cat.id ? '0 4px 16px hsl(43 80% 52% / 0.3)' : 'none',
                }}
              >
                <span className="text-sm">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Mobile: horizontal card layout */}
            <div className="flex flex-col gap-3 md:hidden">
              {currentCategory.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  data-testid={`menu-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="group flex overflow-hidden active:scale-[0.98] transition-transform"
                  style={{
                    background: 'hsl(20 10% 10%)',
                    border: '1px solid hsl(30 15% 16%)',
                  }}
                >
                  {/* Image */}
                  <div className="relative w-28 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105" />
                    {item.badge && (
                      <div
                        className="absolute top-1.5 left-1.5 text-[7px] uppercase tracking-wider px-1.5 py-0.5 font-semibold"
                        style={{ background: 'hsl(43 80% 52%)', color: 'hsl(20 10% 7%)' }}
                      >
                        {item.badge}
                      </div>
                    )}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-sm text-foreground leading-snug group-active:text-primary transition-colors">{item.name}</h3>
                        <span className="text-primary font-bold text-sm shrink-0">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="w-3 h-[1px]" style={{ background: 'hsl(43 80% 52% / 0.5)' }} />
                      <span className="text-[8px] uppercase tracking-widest" style={{ color: 'hsl(43 80% 52% / 0.6)' }}>Golden Fork</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: image-top card grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentCategory.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => setHoveredCard(item.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  data-testid={`menu-card-desktop-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="group relative overflow-hidden shimmer-card transition-all duration-400"
                  style={{
                    background: 'hsl(20 10% 10%)',
                    border: '1px solid',
                    borderColor: hoveredCard === item.name ? 'hsl(43 80% 52% / 0.5)' : 'hsl(30 15% 16%)',
                    transform: hoveredCard === item.name ? 'translateY(-4px)' : 'none',
                    boxShadow: hoveredCard === item.name ? '0 12px 40px hsl(43 80% 52% / 0.12)' : 'none',
                  }}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(20 10% 10%) 0%, transparent 50%)' }} />

                    {/* Price badge */}
                    <div
                      className="absolute top-3 right-3 text-sm font-bold px-3 py-1"
                      style={{ background: 'hsl(43 80% 52%)', color: 'hsl(20 10% 7%)' }}
                    >
                      {item.price}
                    </div>

                    {/* Category badge */}
                    {item.badge && (
                      <div
                        className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2 py-1 font-semibold"
                        style={{ background: 'hsl(20 10% 7% / 0.85)', color: 'hsl(43 80% 62%)', border: '1px solid hsl(43 80% 52% / 0.4)' }}
                      >
                        {item.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to right, hsl(43 80% 52% / 0.4), transparent)' }} />
                      <span className="text-[8px] uppercase tracking-[0.25em]" style={{ color: 'hsl(43 80% 52% / 0.5)' }}>Golden Fork</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
