import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteData } from '../shared/data';

/* ============================================
   V3 — Stitch Editorial
   Clean cream palette, large editorial serif,
   split hero, bracketed CTAs, full-bleed imagery.
   ============================================ */

const palette = {
  bg: '#F4F0EA',
  bgLight: '#FAF8F4',
  dark: '#1A1A1A',
  muted: '#6B6560',
  accent: '#B8A882',
  border: '#E0DBD3',
  white: '#FFFFFF',
};

const font = {
  serif: "'Cormorant Garamond', 'Times New Roman', Georgia, serif",
  sans: "'Inter', 'DM Sans', Helvetica, Arial, sans-serif",
};

const mq = { mobile: '(max-width: 768px)' };

/* ============================================
   ROOT
   ============================================ */
export default function V3() {
  return (
    <div style={{ background: palette.bg, color: palette.dark, fontFamily: font.sans, minHeight: '100vh' }}>
      <Header />
      <Hero />
      <IntroSection />
      <PhilosophySection />
      <DoctorSection />
      <ScanningSection />
      <TreatmentsSection />
      <BookingSection />
      <Footer />
    </div>
  );
}

/* ============================================
   HEADER
   ============================================ */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: palette.bg,
      borderBottom: `1px solid ${palette.border}`,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px clamp(20px, 4vw, 48px)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <a href="/" style={{
          fontFamily: font.serif, fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontWeight: 400, color: palette.dark, textDecoration: 'none',
          letterSpacing: '0.01em',
        }}>
          Dermancy Medical House
        </a>

        <nav style={{ display: 'flex', gap: 'clamp(20px, 3vw, 40px)', alignItems: 'center' }}
          className="v3-desktop-nav">
          {[
            { label: 'About', href: '/about', internal: true },
            { label: 'Services', href: '#treatments', internal: false },
            { label: 'Booking', href: '#booking', internal: false },
            { label: 'Shop', href: '#', internal: false },
          ].map(n => {
            const style: React.CSSProperties = {
              fontFamily: font.sans, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: palette.dark, textDecoration: 'none',
              transition: 'opacity 0.2s', opacity: 0.7,
            };
            return n.internal ? (
              <Link key={n.label} to={n.href} style={style}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
                {n.label}
              </Link>
            ) : (
              <a key={n.label} href={n.href} style={style}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
                {n.label}
              </a>
            );
          })}
        </nav>

        <button
          className="v3-burger"
          onClick={() => { setMenuOpen(!menuOpen); document.body.style.overflow = menuOpen ? '' : 'hidden'; }}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: 5, padding: 4,
          }}>
          <span style={{ width: 24, height: 1.5, background: palette.dark, transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ width: 24, height: 1.5, background: palette.dark, transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 1.5, background: palette.dark, transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, top: 62, background: palette.bg, zIndex: 99,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          {[
            { label: 'About', href: '/about', internal: true },
            { label: 'Services', href: '#treatments', internal: false },
            { label: 'Booking', href: '#booking', internal: false },
            { label: 'Shop', href: '#', internal: false },
          ].map(n => {
            const style: React.CSSProperties = {
              fontFamily: font.serif, fontSize: 28, fontWeight: 400,
              color: palette.dark, textDecoration: 'none',
            };
            const onClick = () => { setMenuOpen(false); document.body.style.overflow = ''; };
            return n.internal ? (
              <Link key={n.label} to={n.href} style={style} onClick={onClick}>{n.label}</Link>
            ) : (
              <a key={n.label} href={n.href} style={style} onClick={onClick}>{n.label}</a>
            );
          })}
        </div>
      )}

      <style>{`
        @media ${mq.mobile} {
          .v3-desktop-nav { display: none !important; }
          .v3-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

/* ============================================
   HERO — split layout matching Stitch design
   ============================================ */
function Hero() {
  return (
    <section style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'clamp(500px, 80vh, 900px)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ flex: '1 1 50%', minWidth: 300, minHeight: 400, position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1532926381893-7542571f0e53?w=900&q=85"
          alt={siteData.hero.imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/hero-portrait.png'; }}
        />
      </motion.div>

      <div style={{
        flex: '1 1 50%', minWidth: 300,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(40px, 6vw, 80px) clamp(28px, 5vw, 72px)',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: font.serif, fontWeight: 400,
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            lineHeight: 1.08, letterSpacing: '-0.01em',
            margin: '0 0 clamp(24px, 3vw, 40px)', color: palette.dark,
          }}>
          Advanced<br />Aesthetic Care.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7,
            color: palette.muted, maxWidth: 380,
            margin: '0 0 clamp(28px, 3vw, 40px)',
          }}>
          Dermancy Medical House is a premier clinic specializing in facial aesthetics, skin health, and advanced skincare treatments.
        </motion.p>

        <motion.a
          href="#booking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: font.sans, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: palette.dark, textDecoration: 'none',
            transition: 'opacity 0.2s', alignSelf: 'flex-start',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          [ &nbsp;Book Your Consultation&nbsp; ]
        </motion.a>
      </div>
    </section>
  );
}

/* ============================================
   INTRO / BRAND
   ============================================ */
function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <>
      <div style={{ width: '100%', height: 'clamp(200px, 30vw, 360px)', overflow: 'hidden' }}>
        <img
          src="/images/reception-area.jpg"
          alt="Dermancy reception"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          loading="lazy"
        />
      </div>

      <section ref={ref} style={{
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 56px)',
        textAlign: 'center',
      }}>
        <motion.div style={{ opacity, y, maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontFamily: font.sans, fontSize: 10, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: palette.accent, marginBottom: 20,
          }}>Dermancy Medical House</p>
          <h2 style={{
            fontFamily: font.serif, fontWeight: 400,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.2, letterSpacing: '-0.01em',
            margin: '0 0 24px', color: palette.dark,
          }}>
            Where science meets the art of subtlety.
          </h2>
          <p style={{
            fontSize: 15, lineHeight: 1.8, color: palette.muted,
            maxWidth: 540, margin: '0 auto 32px',
          }}>{siteData.sections.brand.text}</p>
          <Link to="/about" style={{
            fontFamily: font.sans, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: palette.dark, textDecoration: 'none',
          }}>[ &nbsp;Learn More&nbsp; ]</Link>
        </motion.div>
      </section>
    </>
  );
}

/* ============================================
   PHILOSOPHY — split image + text
   ============================================ */
function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <section ref={ref} style={{ display: 'flex', flexWrap: 'wrap', borderTop: `1px solid ${palette.border}` }}>
      <motion.div style={{
        y, opacity, flex: '1 1 50%', minWidth: 300,
        padding: 'clamp(48px, 8vw, 96px) clamp(28px, 5vw, 72px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <p style={{ fontFamily: font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, marginBottom: 16 }}>Our Philosophy</p>
        <h2 style={{ fontFamily: font.serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15, margin: '0 0 20px' }}>
          We listen before<br />we treat.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: palette.muted, maxWidth: 440 }}>{siteData.sections.philosophy.text}</p>
        <Link to="/about" style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.dark, textDecoration: 'none', marginTop: 28, alignSelf: 'flex-start' }}>
          [ &nbsp;Read More&nbsp; ]
        </Link>
      </motion.div>
      <div style={{ flex: '1 1 50%', minWidth: 300, minHeight: 'clamp(360px, 50vw, 560px)', overflow: 'hidden' }}>
        <img src="/images/textbook-hands.jpg" alt="Dr. Michalakis reviewing dermatology reference" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      </div>
    </section>
  );
}

/* ============================================
   DOCTOR — reverse split
   ============================================ */
function DoctorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <section ref={ref} style={{ display: 'flex', flexWrap: 'wrap-reverse', borderTop: `1px solid ${palette.border}` }}>
      <div style={{ flex: '1 1 50%', minWidth: 300, minHeight: 'clamp(360px, 50vw, 560px)', overflow: 'hidden' }}>
        <img src="/images/dr-michalakis.jpg" alt="Dr. Ioannis Michalakis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} loading="lazy" />
      </div>
      <motion.div style={{
        y, opacity, flex: '1 1 50%', minWidth: 300,
        padding: 'clamp(48px, 8vw, 96px) clamp(28px, 5vw, 72px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <p style={{ fontFamily: font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, marginBottom: 16 }}>The Doctor</p>
        <h2 style={{ fontFamily: font.serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15, margin: '0 0 12px' }}>
          Dr. Ioannis<br />Michalakis
        </h2>
        <p style={{ fontFamily: font.sans, fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: palette.muted, marginBottom: 20, lineHeight: 1.5 }}>{siteData.sections.doctor.credentials}</p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: palette.muted, maxWidth: 440 }}>{siteData.sections.doctor.text}</p>
        <Link to="/about" style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.dark, textDecoration: 'none', marginTop: 28, alignSelf: 'flex-start' }}>
          [ &nbsp;Discover the Approach&nbsp; ]
        </Link>
      </motion.div>
    </section>
  );
}

/* ============================================
   3D SCANNING — dark section
   ============================================ */
function ScanningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section ref={ref} id="scanning" style={{ background: palette.dark, color: palette.bg, padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 56px)' }}>
      <motion.div style={{ opacity, y, maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontFamily: font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, marginBottom: 16, textAlign: 'center' }}>
          {siteData.sections.scanning.eyebrow}
        </p>
        <h2 style={{ fontFamily: font.serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2, textAlign: 'center', margin: '0 0 12px', color: palette.bg }}>
          See the result before<br />the first injection.
        </h2>
        <p style={{ fontFamily: font.serif, fontStyle: 'italic', fontSize: 'clamp(16px, 1.6vw, 18px)', textAlign: 'center', color: palette.accent, margin: '0 0 36px' }}>
          Precision mapped to your anatomy.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(244,240,234,0.55)', textAlign: 'center' }}>
          Using advanced 3D scanning, Dr. Michalakis captures a precise digital model of the treatment area — showing you exactly what a specific treatment will achieve, how proportions will shift, and where the boundaries of natural enhancement lie. Not every clinic offers this level of visibility. At Dermancy Medical House, it is standard.
        </p>
      </motion.div>
    </section>
  );
}

/* ============================================
   TREATMENTS — horizontal scroll cards
   ============================================ */
function TreatmentsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} id="treatments" style={{ padding: 'clamp(72px, 10vw, 120px) 0', borderTop: `1px solid ${palette.border}` }}>
      <motion.div style={{ opacity }}>
        <div style={{ textAlign: 'center', padding: '0 clamp(24px, 5vw, 56px)', marginBottom: 48 }}>
          <p style={{ fontFamily: font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, marginBottom: 16 }}>Our Services</p>
          <h2 style={{ fontFamily: font.serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, margin: '0 0 16px' }}>Refined Aesthetic Solutions.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: palette.muted, maxWidth: 520, margin: '0 auto' }}>{siteData.sections.treatmentsIntro.text}</p>
        </div>

        <div style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 clamp(24px, 5vw, 56px) 20px' }} className="hide-scrollbar">
          {siteData.treatments.map(t => (
            <Link key={t.name} to={`/care/${t.slug}`} style={{ flex: '0 0 auto', width: 'clamp(260px, 50vw, 320px)', scrollSnapAlign: 'start', textDecoration: 'none', color: palette.dark }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', marginBottom: 14 }}>
                <img src={t.img} alt={t.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              </div>
              <h3 style={{ fontFamily: font.serif, fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 400, margin: '0 0 4px' }}>{t.name}</h3>
              <p style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.muted, opacity: 0.7 }}>{t.sub}</p>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/treatments" style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.dark, textDecoration: 'none' }}>
            [ &nbsp;Explore All Treatments&nbsp; ]
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================
   BOOKING — split with image
   ============================================ */
function BookingSection() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!phone || phone.length < 6) newErrors.phone = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => { form.reset(); setSubmitted(false); }, 3000);
    }
  };

  const clearError = (field: string) => setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 0', fontSize: 14, fontFamily: font.sans,
    background: 'transparent', border: 'none', borderBottom: `1px solid ${palette.border}`,
    color: palette.dark, outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section id="booking" style={{ display: 'flex', flexWrap: 'wrap', borderTop: `1px solid ${palette.border}` }}>
      <div style={{ flex: '1 1 50%', minWidth: 300, minHeight: 'clamp(360px, 50vw, 560px)', overflow: 'hidden' }}>
        <img src="/images/consultation-room.jpg" alt="Dermancy consultation room" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      </div>
      <div style={{ flex: '1 1 50%', minWidth: 300, padding: 'clamp(48px, 8vw, 96px) clamp(28px, 5vw, 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: font.sans, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, marginBottom: 16 }}>Book a Consultation</p>
        <h2 style={{ fontFamily: font.serif, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.15, margin: '0 0 12px' }}>Begin Your Journey.</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: palette.muted, marginBottom: 36, maxWidth: 400 }}>Complimentary 15-minute consultation. We'll confirm via email within 24 hours.</p>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
          {[
            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', auto: 'name' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', auto: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+30 000 000 0000', auto: 'tel' },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: 8 }}>
              <input type={f.type} name={f.name} placeholder={f.placeholder} required autoComplete={f.auto}
                style={{ ...inputStyle, borderBottomColor: errors[f.name] ? '#c0392b' : palette.border }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = palette.accent)}
                onBlur={e => (e.currentTarget.style.borderBottomColor = errors[f.name] ? '#c0392b' : palette.border)}
                onInput={() => clearError(f.name)} />
              {errors[f.name] && <span style={{ fontSize: 11, color: '#c0392b', marginTop: 4, display: 'block' }}>{f.name === 'email' ? 'Please enter a valid email' : `Please enter your ${f.label.toLowerCase()}`}</span>}
            </div>
          ))}
          <button type="submit" disabled={submitted} style={{
            alignSelf: 'flex-start', marginTop: 20, fontFamily: font.sans, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: submitted ? palette.accent : palette.dark,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.2s',
          }}>
            {submitted ? 'Thank You!' : '[ \u00A0Book Consultation\u00A0 ]'}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  return (
    <footer style={{ background: palette.dark, color: palette.bg, padding: '56px clamp(24px, 5vw, 56px) 28px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, maxWidth: 1200, margin: '0 auto' }}>
        <div>
          <p style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 400, marginBottom: 8 }}>Dermancy Medical House</p>
          <p style={{ fontFamily: font.sans, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(244,240,234,0.4)' }}>Subtle. Refined. Personal.</p>
        </div>
        <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            { label: 'About', href: '/about', internal: true },
            { label: 'Services', href: '#treatments', internal: false },
            { label: 'Booking', href: '#booking', internal: false },
            { label: 'Shop', href: '#', internal: false },
          ].map(n => {
            const s: React.CSSProperties = { fontFamily: font.sans, fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.bg, opacity: 0.4, textDecoration: 'none', transition: 'opacity 0.2s' };
            return n.internal ? (
              <Link key={n.label} to={n.href} style={s} onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}>{n.label}</Link>
            ) : (
              <a key={n.label} href={n.href} style={s} onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}>{n.label}</a>
            );
          })}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <a href="mailto:info@dermancy.gr" style={{ fontFamily: font.sans, fontSize: 11, letterSpacing: '0.08em', color: palette.bg, opacity: 0.4, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}>info@dermancy.gr</a>
          <a href="tel:+302241000000" style={{ fontFamily: font.sans, fontSize: 11, letterSpacing: '0.08em', color: palette.bg, opacity: 0.4, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}>+30 22410 00 000</a>
          <span style={{ fontFamily: font.sans, fontSize: 11, letterSpacing: '0.08em', color: palette.bg, opacity: 0.3 }}>Rhodes, Greece</span>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(244,240,234,0.08)', marginTop: 40, paddingTop: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 10, opacity: 0.2, letterSpacing: '0.1em' }}>&copy; 2026 Dermancy Medical House. All rights reserved.</p>
      </div>
    </footer>
  );
}
