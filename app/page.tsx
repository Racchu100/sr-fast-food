'use client';

import { useState, useEffect } from 'react';
import { menuCategories, type MenuCategory, type MenuItem } from './menuData';


// ── Price badge ───────────────────────────────────────────────────────────────
function PriceBadge({ label, price, highlight = false }: { label: string; price: number; highlight?: boolean }) {
  const badgeClass = highlight 
    ? 'bg-accent border border-accent text-white shadow-md shadow-accent-glow hover:scale-[1.04]' 
    : 'bg-transparent border border-border text-text-primary hover:border-accent/40 hover:scale-[1.04]';

  return (
    <div className={"price-badge-btn flex flex-col items-center justify-center rounded-full px-3 py-1.5 min-w-[56px] sm:min-w-[64px] transition-all duration-200 cursor-pointer active:scale-95 " + badgeClass}>
      <span className="text-[8px] font-medium uppercase tracking-wider text-text-muted group-hover:text-text-primary transition-colors duration-200">{label}</span>
      <span className="text-xs sm:text-sm font-mono font-bold tracking-tight mt-0.5">₹{price}</span>
    </div>
  );
}

// ── Menu item row ─────────────────────────────────────────────────────────────
function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  const itemStyle = { 
    animationDelay: (index * 50) + "ms", 
    animation: "fadeSlideUp 0.4s ease-out " + (index * 50) + "ms both" 
  };

  return (
    <div
      className="menu-item-card group flex gap-4 p-4 rounded-2xl border transition-all duration-300"
      style={itemStyle}
    >
      {item.image && (
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border border-border bg-bg-primary">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {item.type === 'veg' && <span className="veg-dot" title="Vegetarian" />}
            {item.type === 'nonveg' && <span className="nonveg-dot" title="Non-Vegetarian" />}
            {item.type === 'both' && (
              <span className="flex gap-1">
                <span className="veg-dot" title="Veg variant" />
                <span className="nonveg-dot" title="Non-veg variant" />
              </span>
            )}
            <h3 className="text-[15px] font-syne font-semibold text-white tracking-tight leading-tight">{item.name}</h3>
          </div>
        </div>
        <div className="flex gap-2 items-center mt-2 flex-wrap">
          {item.single !== undefined && (
            <PriceBadge label="Single" price={item.single} highlight />
          )}
          {item.half !== undefined && (
            <PriceBadge label="Half" price={item.half} />
          )}
          {item.full !== undefined && (
            <PriceBadge label="Full" price={item.full} highlight />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Category section ──────────────────────────────────────────────────────────
function CategorySection({ category }: { category: MenuCategory }) {
  const itemsCountText = category.items.length + " choice" + (category.items.length > 1 ? 's' : '');

  return (
    <section id={category.id} className="menu-section scroll-mt-[85px]">
      <div className="transition-all duration-700 opacity-100 translate-y-0">
        <div className="flex items-center gap-3 mb-6 pl-3 border-l-3 border-accent">
          <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center text-xl text-accent border border-accent/20">
            {category.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="text-xl font-syne font-bold text-text-primary tracking-tight leading-none">{category.label}</h2>
              <span className="px-2 py-0.5 text-[9px] font-sans font-bold bg-accent text-white rounded-full uppercase tracking-wider">
                {itemsCountText}
              </span>
            </div>
          </div>
        </div>
        
        {/* Responsive Grid of Individual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.items.map((item, i) => (
            <MenuItemRow key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState('soups');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -85;
      const scrollYVal = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
      const y = el.getBoundingClientRect().top + scrollYVal + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Auto-scroll active pill into view in the horizontal nav
  useEffect(() => {
    try {
      const activePill = document.getElementById("pill-" + activeTab);
      if (activePill) {
        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    } catch (e) {
      console.warn("Smooth scrollIntoView is not supported on this device/browser:", e);
    }
  }, [activeTab]);

  // Track active section on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    try {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveTab(e.target.id);
          }
        });
      }, { rootMargin: '-20% 0px -55% 0px' });
      
      menuCategories.forEach((c) => {
        const el = document.getElementById(c.id);
        if (el) obs.observe(el);
      });
      return () => obs.disconnect();
    } catch (e) {
      console.warn("IntersectionObserver failed to initialize:", e);
    }
  }, []);

  const phoneNumber = "+917760288291";
  const waText = encodeURIComponent("Hello SR Fast Food Bolar, I would like to view the menu and place an order.");
  
  const telUrl = "tel:" + phoneNumber;
  const waUrl = "https://wa.me/" + phoneNumber.replace('+', '') + "?text=" + waText;

  const brandTextClass = "font-syne font-bold text-sm tracking-tight text-white";

  return (
    <div className="min-h-screen pb-8">
      {/* ── Sticky Header Wrapper ── */}
      <header className={`sticky top-0 z-50 bg-[#0D0D0D]/85 backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-b border-accent/40 shadow-lg shadow-accent-glow/5' : 'border-b border-border'}`}>
        {/* Main Navbar */}
        <div className="menu-container header-navbar flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
            try {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (e) {
              window.scrollTo(0, 0);
            }
          }}>
            <div className="w-8 h-8 rounded-full border border-accent/40 p-[1px] shadow-sm shadow-accent-glow flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logo.jpg" alt="SR Fast Food Logo" className="w-full h-full rounded-full object-cover" />
            </div>
            <span className={brandTextClass}>SR Fast Food</span>
          </div>
        </div>

        {/* Category Pill Nav */}
        <div className="menu-container header-pills overflow-x-auto scrollbar-hide">
          <div className="category-pill-container w-max">
            {menuCategories.map((c) => {
              const isActive = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  id={"pill-" + c.id}
                  onClick={() => scrollTo(c.id)}
                  className={"category-pill-button cursor-pointer transition-all duration-200 active:scale-95 " + (isActive ? 'tab-active' : 'tab-inactive')}
                >
                  <span className="text-sm">{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Price key ── */}
      <div className="menu-container indicators-container mt-6 mb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted bg-bg-card border border-border rounded-2xl px-4 py-2.5 justify-center sm:justify-start">
          <div className="flex items-center gap-3">
            <span className="font-syne font-bold text-text-primary uppercase tracking-wider text-[10px]">Indicators:</span>
            <span className="flex items-center gap-1.5 font-medium text-text-primary"><span className="veg-dot" /> Veg</span>
            <span className="flex items-center gap-1.5 font-medium text-text-primary"><span className="nonveg-dot" /> Non-Veg</span>
          </div>
        </div>
      </div>

      {/* ── Menu sections ── */}
      <main className="menu-container pt-8">
        {menuCategories.map((cat) => {
          return <CategorySection key={cat.id} category={cat} />;
        })}

        {/* ── Thank You Card ── */}
        <div className="mt-16 text-center flex justify-center px-4">
          <div className="glow-border-wrapper max-w-xs sm:max-w-sm w-full mx-auto shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-accent-glow/20">
            <div className="glow-border-inner p-8 flex flex-col items-center gap-4">
              {/* Dynamic Animated Mesh Backdrop */}
              <div className="mesh-gradient-bg" />

              {/* Floating Sparkles inside card */}
              <div className="sparkle sparkle-animate w-1.5 h-1.5 bg-gold" style={{ '--sparkle-duration': '3s', '--sparkle-delay': '0s', left: '15%', bottom: '0%' } as React.CSSProperties} />
              <div className="sparkle sparkle-animate w-1 h-1 bg-accent" style={{ '--sparkle-duration': '4s', '--sparkle-delay': '1s', left: '35%', bottom: '0%' } as React.CSSProperties} />
              <div className="sparkle sparkle-animate w-2 h-2 bg-gold/80" style={{ '--sparkle-duration': '3.5s', '--sparkle-delay': '0.5s', left: '55%', bottom: '0%' } as React.CSSProperties} />
              <div className="sparkle sparkle-animate w-1 h-1 bg-accent" style={{ '--sparkle-duration': '4.5s', '--sparkle-delay': '1.5s', left: '75%', bottom: '0%' } as React.CSSProperties} />
              <div className="sparkle sparkle-animate w-1.5 h-1.5 bg-gold" style={{ '--sparkle-duration': '3.2s', '--sparkle-delay': '2s', left: '85%', bottom: '0%' } as React.CSSProperties} />

              {/* Heart Icon Wrapper with concentric rotating dashed/dotted SVG rings */}
              <div className="w-20 h-20 flex items-center justify-center relative z-10">
                {/* Rotating Dotted Ring 1 - Clockwise */}
                <svg className="absolute w-full h-full animate-spin-cw text-accent/30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                </svg>
                {/* Rotating Dotted Ring 2 - Counter Clockwise */}
                <svg className="absolute w-[82%] h-[82%] animate-spin-ccw text-gold/30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                </svg>
                {/* Pulse Glow Backdrops */}
                <div className="absolute w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-glow" />
                  <svg className="w-6 h-6 animate-heartbeat relative z-10 drop-shadow-[0_0_8px_rgba(255,77,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.749 0 3.3 1.01 4.312 2.733C13 4.011 14.551 3 16.312 3c2.974 0 5.438 2.322 5.438 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Wavy Letter Title */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <h3 className="font-syne font-extrabold text-3xl tracking-tight text-white flex gap-0.5 justify-center">
                  {"Thank You".split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-wave-letter text-transparent bg-clip-text bg-gradient-to-r from-accent via-gold to-accent"
                      style={{ 
                        animationDelay: `${index * 80}ms`,
                        backgroundSize: '200% auto',
                        animationName: 'wave-letter, gradient-text-flow',
                        animationDuration: '1.8s, 4s',
                        animationTimingFunction: 'ease-in-out, ease',
                        animationIterationCount: 'infinite, infinite'
                      } as React.CSSProperties}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h3>
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-accent animate-spacing-pulse mt-1">
                  Please visit again
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-bg-card text-text-primary text-center py-12 px-4 mt-12 rounded-t-[2.5rem] border-t border-border relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/40" />
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border border-accent/30 p-1 shadow-2xl shadow-accent-glow/20 overflow-hidden transition-transform duration-300 hover:scale-105">
          <img src="/logo.jpg" alt="SR Fast Food Logo" className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="font-syne font-bold text-xl tracking-tight text-white">SR Fast Food Bolara</h2>
        <p className="text-accent text-xs font-bold tracking-wide uppercase mt-1">Fresh · Tasty · Fast</p>
        
        <div className="mt-6 flex flex-col gap-3 text-xs text-text-muted max-w-xs mx-auto font-sans">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="font-semibold text-text-primary">🕐 Operating Hours:</span>
            <span>Everyday, 1:00 PM - 11:00 PM</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2 items-start gap-4">
            <span className="font-semibold text-text-primary shrink-0">📍 Address:</span>
            <span className="text-right">07, leevel junction, Bolar, Mangaluru, Karnataka 575001</span>
          </div>
          <div className="flex justify-between pb-1 items-start gap-4">
            <span className="font-semibold text-text-primary shrink-0">📞 Call / Order:</span>
            <div className="flex flex-col items-end gap-1">
              <a href="tel:+917760288291" className="hover:text-accent font-medium transition-colors duration-200">
                +91 77602 88291
              </a>
              <a href="tel:+918310063867" className="hover:text-accent font-medium transition-colors duration-200">
                +91 83100 63867
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-text-muted/65 text-[10px] font-bold tracking-wider uppercase mt-8">{"© 2026 SR Fast Food · All rights reserved"}</p>
      </footer>
    </div>
  );
}
