import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../shared/data';

/* ============================================
   V2 — Editorial Olive Serif
   Inspired by: lowercase "dermancy" in dark olive,
   Cormorant Garamond, leaf ornament, earthy palette
   ============================================ */

const olive = '#4A5A52';
const cream = '#E8E1D5';
const bg = '#EDEAE4';

const font = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Inter', sans-serif",
};

export default function V2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: bg, color: olive, fontFamily: font.body, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', position: 'relative', zIndex: 10 }}
        >
          <span style={{ fontFamily: font.body, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
            Rhodes, Greece
          </span>
          <div style={{ display: 'flex', gap: 32 }}>
            {siteData.nav.map(n => (
              <a key={n.label} href={n.href} style={{ fontFamily: font.body, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: olive, opacity: 0.6, textDecoration: 'none' }}>
                {n.label}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* Hero content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 5 }}>
          {/* Large brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: font.display, fontSize: 'clamp(4rem, 14vw, 10rem)', fontWeight: 400, lineHeight: 0.85, letterSpacing: '-0.02em', color: olive, margin: 0 }}
          >
            dermancy
          </motion.h1>

          {/* Leaf ornament (SVG) */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ margin: '24px 0 16px' }}>
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
              <path d="M24 16 C18 8, 6 4, 2 8 C6 12, 14 14, 24 16 Z" fill={olive} opacity="0.5"/>
              <path d="M24 16 C30 8, 42 4, 46 8 C42 12, 34 14, 24 16 Z" fill={olive} opacity="0.5"/>
              <path d="M24 16 C20 20, 12 28, 16 30 C18 28, 22 22, 24 16 Z" fill={olive} opacity="0.35"/>
              <path d="M24 16 C28 20, 36 28, 32 30 C30 28, 26 22, 24 16 Z" fill={olive} opacity="0.35"/>
            </svg>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 24 }}
          >
            <span style={{ fontFamily: font.body, fontSize: 12, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.5 }}>Medical</span>
            <span style={{ fontFamily: font.body, fontSize: 12, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.5 }}>House</span>
          </motion.div>

          {/* Portrait below */}
          <motion.div style={{ y: heroImgY, opacity: heroOpacity }} className="mt-12">
            <motion.img
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              src={siteData.hero.imageSrc}
              alt={siteData.hero.imageAlt}
              style={{ width: 'min(280px, 60vw)', borderRadius: '50%', objectFit: 'cover', aspectRatio: '1', border: `3px solid ${cream}`, boxShadow: '0 20px 60px rgba(74,90,82,0.15)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== SECTIONS ===== */}
      {[
        { ...siteData.sections.brand, img: 'https://images.unsplash.com/photo-1532926381893-7542571f0e53?w=800&q=80', reverse: false },
        { ...siteData.sections.philosophy, img: siteData.sections.philosophy.imageUrl, reverse: true },
        { ...siteData.sections.doctor, img: siteData.sections.doctor.imageUrl, reverse: false },
      ].map((s, i) => (
        <ScrollSection key={i} section={s} font={font} olive={olive} />
      ))}

      {/* ===== TREATMENTS ===== */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }} id="treatments">
        <p style={{ fontFamily: font.body, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>Our Treatments</p>
        <h2 style={{ fontFamily: font.display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, margin: '0 0 48px' }}>Refined Aesthetic Solutions</h2>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 16 }} className="hide-scrollbar">
          {siteData.treatments.map(t => (
            <div key={t.name} style={{ flex: '0 0 auto', width: 'clamp(240px, 65vw, 300px)', scrollSnapAlign: 'start' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'linear-gradient(to top, rgba(74,90,82,0.8), transparent)', color: '#fff' }}>
                  <strong style={{ fontFamily: font.display, fontSize: 20 }}>{t.name}</strong>
                  <p style={{ fontSize: 12, opacity: 0.7, margin: '4px 0 0' }}>{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section id="booking" style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', maxWidth: 480, width: '100%', boxShadow: '0 8px 40px rgba(74,90,82,0.08)' }}>
          <p style={{ fontFamily: font.body, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, textAlign: 'center', marginBottom: 8 }}>Book a Consultation</p>
          <h2 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 400, textAlign: 'center', margin: '0 0 32px' }}>Begin Your Journey</h2>
          {['Full Name', 'Email', 'Phone'].map(label => (
            <input key={label} placeholder={label} style={{ width: '100%', padding: '14px 16px', border: `1px solid ${cream}`, borderRadius: 10, marginBottom: 12, fontSize: 14, background: bg, fontFamily: font.body, color: olive, outline: 'none' }} />
          ))}
          <button style={{ width: '100%', padding: 16, background: olive, color: bg, border: 'none', borderRadius: 10, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: font.body, fontWeight: 500 }}>
            Continue
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: olive, color: cream, padding: '48px 32px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: font.display, fontSize: 24, marginBottom: 8 }}>dermancy</p>
        <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 32 }}>Medical House · Rhodes, Greece</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
          {siteData.nav.map(n => (
            <a key={n.label} href={n.href} style={{ color: cream, opacity: 0.6, fontSize: 12, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{n.label}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, opacity: 0.3 }}>&copy; 2026 Dermancy Medical House</p>
      </footer>
    </div>
  );
}

/* Parallax scroll section for V2 */
function ScrollSection({ section, font, olive }: { section: { eyebrow: string; title: string; text: string; img: string; reverse: boolean }; font: { display: string; body: string }; olive: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useTransform(scrollYProgress, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <div ref={ref} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 5vw, 80px)', padding: '60px 24px', flexDirection: section.reverse ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
      <motion.div style={{ y, opacity, maxWidth: 400 }}>
        <p style={{ fontFamily: font.body, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>{section.eyebrow}</p>
        <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 16px' }}>{section.title}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.7 }}>{section.text}</p>
      </motion.div>
      <motion.div style={{ opacity, clipPath }}>
        <img src={section.img} alt={section.title} style={{ width: 'clamp(240px, 35vw, 340px)', height: 'clamp(300px, 40vw, 420px)', objectFit: 'cover', borderRadius: 12 }} loading="lazy" />
      </motion.div>
    </div>
  );
}
