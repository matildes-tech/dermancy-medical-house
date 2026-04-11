import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../shared/data';

/* ============================================
   V3 — Haute Editorial
   Inspired by: uppercase "DERMANCY" in high-contrast
   didone/modern serif with dramatic thin/thick strokes,
   horizontal rule, "MEDICAL HOUSE" below,
   "Rhodes, Greece" above. Black on white. Fashion-magazine.
   Uses Playfair Display as the closest Google Font to the
   high-contrast didone style.
   ============================================ */

const ink = '#0A0A0A';
const paper = '#FFFFFF';
const rule = '#C8C0B8';

const font = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', sans-serif",
};

export default function V3() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: paper, color: ink, fontFamily: font.body, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
      >
        {/* Top bar — "Rhodes, Greece" left, nav right */}
        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '24px clamp(20px, 4vw, 48px)', position: 'relative', zIndex: 10,
          }}
        >
          <span style={{ fontFamily: font.body, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.4 }}>
            Rhodes, Greece
          </span>
          <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 36px)', flexWrap: 'wrap' }}>
            {siteData.nav.map(n => (
              <a
                key={n.label} href={n.href}
                style={{ fontFamily: font.body, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ink, opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
              >
                {n.label}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* Center: brand lockup + portrait */}
        <motion.div
          style={{ y: parallaxY, opacity: fadeOut }}
          className="flex-1 flex flex-col items-center justify-center text-center px-6 relative"
        >
          {/* Large display name — high-contrast serif */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: font.display, fontWeight: 700,
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              lineHeight: 0.9, letterSpacing: '0.04em',
              textTransform: 'uppercase', margin: 0, color: ink,
            }}
          >
            DERMANCY
          </motion.h1>

          {/* Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'clamp(180px, 30vw, 320px)', height: 1,
              background: ink, margin: '16px auto 14px',
              transformOrigin: 'center',
            }}
          />

          {/* MEDICAL HOUSE */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: font.body, fontSize: 'clamp(11px, 1.4vw, 15px)',
              letterSpacing: '0.45em', textTransform: 'uppercase',
              opacity: 0.55, margin: 0,
            }}
          >
            Medical House
          </motion.p>

          {/* Portrait — centered below lockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: 'clamp(32px, 5vh, 64px)', position: 'relative' }}
          >
            {/* Thin circle outline */}
            <div style={{
              width: 'min(300px, 60vw)', height: 'min(300px, 60vw)',
              borderRadius: '50%', border: `1px solid ${rule}`,
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', zIndex: 0,
            }} />
            <img
              src={siteData.hero.imageSrc}
              alt={siteData.hero.imageAlt}
              style={{
                width: 'min(260px, 52vw)', position: 'relative', zIndex: 1,
                mixBlendMode: 'multiply',
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              fontFamily: font.body, fontSize: 13, lineHeight: 1.7,
              maxWidth: 340, opacity: 0.45, marginTop: 32,
            }}
          >
            {siteData.hero.mainText}
          </motion.p>
        </motion.div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      {[
        { ...siteData.sections.brand, img: 'https://images.unsplash.com/photo-1532926381893-7542571f0e53?w=800&q=80', reverse: false },
        { ...siteData.sections.philosophy, img: siteData.sections.philosophy.imageUrl, reverse: true },
        { ...siteData.sections.doctor, img: siteData.sections.doctor.imageUrl, reverse: false },
      ].map((s, i) => (
        <EditorialSection key={i} section={s} />
      ))}

      {/* ===== TREATMENTS ===== */}
      <section id="treatments" style={{ padding: '80px 0', borderTop: `1px solid ${rule}` }}>
        <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 24px' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.35, marginBottom: 12 }}>
            Our Treatments
          </p>
          <h2 style={{ fontFamily: font.display, fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Refined Solutions
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 clamp(16px, 4vw, 48px) 16px' }} className="hide-scrollbar">
          {siteData.treatments.map(t => (
            <div key={t.name} style={{ flex: '0 0 auto', width: 'clamp(220px, 60vw, 280px)', scrollSnapAlign: 'start' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 16px 14px',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.75), transparent)',
                  color: '#fff',
                }}>
                  <strong style={{ fontFamily: font.display, fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.name}</strong>
                  <p style={{ fontSize: 11, opacity: 0.6, margin: '4px 0 0', fontStyle: 'italic' }}>{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section id="booking" style={{ padding: '80px 24px', borderTop: `1px solid ${rule}`, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.35, marginBottom: 10 }}>Consultation</p>
          <h2 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 36 }}>
            Begin Your Journey
          </h2>
          {['Full Name', 'Email', 'Phone'].map(label => (
            <input
              key={label} placeholder={label}
              style={{
                width: '100%', padding: '14px 0',
                border: 'none', borderBottom: `1px solid ${rule}`,
                marginBottom: 20, fontSize: 14,
                background: 'transparent', fontFamily: font.body,
                color: ink, outline: 'none', letterSpacing: '0.02em',
              }}
            />
          ))}
          <button style={{
            width: '100%', padding: 16,
            background: ink, color: paper, border: 'none',
            fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: font.body, fontWeight: 500,
            marginTop: 8,
          }}>
            Continue
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: ink, color: paper, padding: '56px 24px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
          Dermancy
        </p>
        <div style={{ width: 60, height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 auto 10px' }} />
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.3, marginBottom: 32 }}>
          Medical House · Rhodes, Greece
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
          {siteData.nav.map(n => (
            <a key={n.label} href={n.href} style={{ color: paper, opacity: 0.35, fontSize: 10, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{n.label}</a>
          ))}
        </div>
        <p style={{ fontSize: 10, opacity: 0.15 }}>&copy; 2026 Dermancy Medical House</p>
      </footer>
    </div>
  );
}

/* --- Parallax content section for V3 --- */
function EditorialSection({ section }: { section: { eyebrow: string; title: string; text: string; img: string; reverse: boolean } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clip = useTransform(scrollYProgress, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(24px, 5vw, 72px)', padding: '64px clamp(20px, 4vw, 48px)',
        flexDirection: section.reverse ? 'row-reverse' : 'row', flexWrap: 'wrap',
        borderTop: `1px solid ${rule}`,
      }}
    >
      <motion.div style={{ y, opacity, maxWidth: 400 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.35, marginBottom: 14 }}>{section.eyebrow}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.15, margin: '0 0 18px' }}>
          {section.title}
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.85, opacity: 0.55 }}>{section.text}</p>
      </motion.div>
      <motion.div style={{ opacity, clipPath: clip }}>
        <img
          src={section.img} alt={section.title}
          style={{ width: 'clamp(240px, 32vw, 340px)', height: 'clamp(300px, 38vw, 440px)', objectFit: 'cover' }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
