import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../shared/data';

/* ============================================
   V3 — Script / Signature
   Inspired by: handwritten cursive "Dermancy",
   Dancing Script, black & white, editorial minimalism
   ============================================ */

const black = '#1A1A1A';
const warm = '#F5F3EF';

const font = {
  script: "'Dancing Script', cursive",
  body: "'Inter', sans-serif",
};

export default function V3() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: '#fff', color: black, fontFamily: font.body, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', position: 'relative', zIndex: 10 }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.4 }}>Est. 2020</span>
          <div style={{ display: 'flex', gap: 28 }}>
            {siteData.nav.map(n => (
              <a key={n.label} href={n.href} style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: black, opacity: 0.5, textDecoration: 'none' }}>
                {n.label}
              </a>
            ))}
          </div>
        </motion.nav>

        {/* Hero content — large script + portrait */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', position: 'relative' }}>
          {/* Handwritten script */}
          <motion.h1
            style={{ scale: titleScale, opacity: titleOpacity }}
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: font.script, fontSize: 'clamp(4rem, 16vw, 12rem)', fontWeight: 400, lineHeight: 0.8, display: 'block', color: black, fontStyle: 'normal' }}
            >
              Dermancy
            </motion.span>
          </motion.h1>

          {/* Subtitle line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 80 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ height: 1, background: black, margin: '20px auto 16px', opacity: 0.2 }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <span style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.4 }}>Medical House</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.25, marginTop: 8 }}
          >
            Rhodes, Greece
          </motion.p>

          {/* Portrait — black circle bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{ marginTop: 48, position: 'relative' }}
          >
            <div style={{ width: 'min(260px, 55vw)', height: 'min(260px, 55vw)', borderRadius: '50%', background: black, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
            <img
              src={siteData.hero.imageSrc}
              alt={siteData.hero.imageAlt}
              style={{ width: 'min(240px, 50vw)', position: 'relative', zIndex: 1, mixBlendMode: 'screen', filter: 'grayscale(100%) contrast(1.1)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      {[
        { ...siteData.sections.brand, img: 'https://images.unsplash.com/photo-1532926381893-7542571f0e53?w=800&q=80', reverse: false },
        { ...siteData.sections.philosophy, img: siteData.sections.philosophy.imageUrl, reverse: true },
        { ...siteData.sections.doctor, img: siteData.sections.doctor.imageUrl, reverse: false },
      ].map((s, i) => (
        <V3Section key={i} section={s} />
      ))}

      {/* ===== TREATMENTS ===== */}
      <section id="treatments" style={{ padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 24px' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.35, marginBottom: 8 }}>Our Treatments</p>
          <h2 style={{ fontFamily: font.script, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400 }}>Refined Solutions</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 24px 16px' }} className="hide-scrollbar">
          {siteData.treatments.map(t => (
            <div key={t.name} style={{ flex: '0 0 auto', width: 'clamp(200px, 55vw, 260px)', scrollSnapAlign: 'start' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(40%)' }} loading="lazy" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: '#fff' }}>
                  <strong style={{ fontFamily: font.script, fontSize: 20 }}>{t.name}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section id="booking" style={{ padding: '80px 24px', background: warm, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontFamily: font.script, fontSize: 36, fontWeight: 400, marginBottom: 32 }}>Book a Consultation</h2>
          {['Full Name', 'Email', 'Phone'].map(label => (
            <input key={label} placeholder={label} style={{ width: '100%', padding: '14px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', marginBottom: 20, fontSize: 14, background: 'transparent', fontFamily: font.body, color: black, outline: 'none' }} />
          ))}
          <button style={{ width: '100%', padding: 16, background: black, color: '#fff', border: 'none', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 12, fontFamily: font.body }}>
            Continue
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: black, color: '#fff', padding: '48px 24px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: font.script, fontSize: 28, marginBottom: 4 }}>Dermancy</p>
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.3, marginBottom: 28 }}>Medical House · Rhodes, Greece</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginBottom: 28, flexWrap: 'wrap' }}>
          {siteData.nav.map(n => (
            <a key={n.label} href={n.href} style={{ color: '#fff', opacity: 0.4, fontSize: 11, textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{n.label}</a>
          ))}
        </div>
        <p style={{ fontSize: 10, opacity: 0.2 }}>&copy; 2026 Dermancy Medical House</p>
      </footer>
    </div>
  );
}

function V3Section({ section }: { section: { eyebrow: string; title: string; text: string; img: string; reverse: boolean } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const clip = useTransform(scrollYProgress, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <div ref={ref} style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)', padding: '60px 24px', flexDirection: section.reverse ? 'row-reverse' : 'row', flexWrap: 'wrap', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
      <motion.div style={{ y, opacity, maxWidth: 380 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.35, marginBottom: 12 }}>{section.eyebrow}</p>
        <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 400, margin: '0 0 16px' }}>{section.title}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.6 }}>{section.text}</p>
      </motion.div>
      <motion.div style={{ opacity, clipPath: clip }}>
        <img src={section.img} alt={section.title} style={{ width: 'clamp(220px, 30vw, 320px)', height: 'clamp(280px, 35vw, 400px)', objectFit: 'cover', filter: 'grayscale(30%)' }} loading="lazy" />
      </motion.div>
    </div>
  );
}
