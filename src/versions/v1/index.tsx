import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { MagicText } from '@/components/ui/magic-text';
import { ParallaxScrollFeatureSection, type ParallaxSection } from '@/components/ui/parallax-scroll-feature-section';
import RuixenCarouselWave, { type CarouselCard } from '@/components/ui/ruixen-carousel-wave';
import { siteData } from '../shared/data';

/* ============================================
   Dermancy Medical House — V1 Refined
   ============================================ */

export default function V1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---- Toggle mobile menu ---- */
  const toggleMenu = () => {
    setMobileMenuOpen((prev) => {
      document.body.style.overflow = prev ? '' : 'hidden';
      return !prev;
    });
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* ========== FIXED HEADER — always visible, sticky with blur ========== */}
      <header className="header is-visible" id="header" role="banner">
        <div className="header__inner">
          <a href="/" className="header__logo" aria-label="Dermancy — Home">
            Dermancy
          </a>

          <nav
            className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}
            id="mobileNav"
            aria-label="Main navigation"
          >
            <Link to="/about" className="mobile-nav__link" onClick={closeMenu}>About</Link>
            <a href="#treatments" className="mobile-nav__link" onClick={closeMenu}>Treatments</a>
            <a href="#booking" className="mobile-nav__link" onClick={closeMenu}>Book</a>
          </nav>

          <div className="header__actions">
            <a href="#booking" className="header__book-btn">Book consultation</a>
            <button
              className={`hamburger ${mobileMenuOpen ? 'is-open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ========== HERO — Scroll Expansion with branded image ========== */}
      <section id="hero">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/images/dermancy-brand.jpg"
          bgImageSrc="/images/reception-full.jpg"
          scrollToExpand="Scroll to explore"
        >
          {/* Content revealed after expansion — intentionally empty */}
          <div />
        </ScrollExpandMedia>
      </section>

      {/* ========== CONTENT SECTIONS ========== */}
      <V1ContentSections />

      {/* ========== TREATMENTS — Static Grid ========== */}
      <TreatmentsGrid />

      {/* ========== 3D SCANNING ========== */}
      <V1ScanningSection />

      {/* ========== BOOKING ========== */}
      <BookingSection />

      {/* ========== FOOTER ========== */}
      <footer className="footer" id="footer" role="contentinfo">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                marginBottom: 8,
              }}>
                Dermancy Medical House
              </p>
              <p className="footer__tagline">Subtle. Refined. Personal.</p>
            </div>
            <nav className="footer__nav" aria-label="Footer navigation">
              <p className="footer__nav-title">Explore</p>
              <Link to="/about" className="footer__link">About</Link>
              <a href="#treatments" className="footer__link">Treatments</a>
              <a href="#booking" className="footer__link">Book</a>
            </nav>
            <div className="footer__contact">
              <p className="footer__nav-title">Contact</p>
              <a href="mailto:info@dermancy.gr" className="footer__link">info@dermancy.gr</a>
              <a href="tel:+302241000000" className="footer__link">+30 22410 00 000</a>
              <p className="footer__link">Rhodes, Greece</p>
            </div>
            <div className="footer__social">
              <p className="footer__nav-title">Follow</p>
              <div className="footer__social-icons">
                <a href="https://www.instagram.com/dermancy_medical_house/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/giannis.michalakis.3/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@dr_michalakis" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2026 Dermancy Medical House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}


/* ============================================
   V1 Content Sections
   ============================================ */

function V1ContentSections() {
  const parallaxSections: ParallaxSection[] = [
    {
      id: 'philosophy',
      reverse: true,
      imageUrl: '/images/textbook-hands.jpg',
      imageAlt: 'Dr. Michalakis reviewing dermatology reference',
      content: (
        <div>
          <p className="eyebrow">Our philosophy</p>
          <h2 className="section-title">We listen before we treat</h2>
          <p className="body-text" style={{ textAlign: 'justify' }}>
            Every patient arrives with a different face, a different concern, a different expectation. Our work begins long before any procedure — in the conversation, the assessment, the trust that forms when someone feels understood.
          </p>
          <Link to="/about" className="text-link" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
            Read more &rarr;
          </Link>
        </div>
      ),
    },
    {
      id: 'doctor',
      reverse: false,
      content: (
        <div>
          <p className="eyebrow">{siteData.sections.doctor.eyebrow}</p>
          <h2 className="section-title">{siteData.sections.doctor.title}</h2>
          <p style={{ fontSize: 'var(--fs-sm)', letterSpacing: '0.04em', color: 'var(--color-muted)', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-sans)' }}>
            {siteData.sections.doctor.credentials}
          </p>
          <p className="body-text" style={{ textAlign: 'justify' }}>{siteData.sections.doctor.text}</p>
          <Link to="/about" className="text-link" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
            Discover the Approach &rarr;
          </Link>
        </div>
      ),
      imageElement: (
        <img
          src="/images/dr-michalakis.jpg"
          alt="Dr. Ioannis Michalakis"
          style={{
            width: '100%',
            maxWidth: 340,
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: 8,
          }}
          loading="lazy"
        />
      ),
    },
  ];

  return (
    <>
      {/* ===== SECTION 2: ABOUT / INTRO — centered with MagicText ===== */}
      <section className="section" id="brand" style={{ background: 'var(--color-ivory)' }}>
        <div className="container" style={{
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: 'var(--color-charcoal)',
            marginBottom: 'var(--space-lg)',
          }}>
            Where science meets the art of subtlety
          </h2>
          <MagicText
            text="Dermancy Medical House was founded on the belief that aesthetic medicine demands the same rigour as any medical discipline — meticulous assessment, anatomical expertise, and an unwavering commitment to natural results."
            className="justify-center text-base leading-relaxed"
          />
          <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
            <Link to="/about" className="text-link">
              Read more &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTIONS 3 & 4: PHILOSOPHY + DOCTOR with Parallax ===== */}
      <div style={{ background: 'var(--color-ivory)' }}>
        <ParallaxScrollFeatureSection
          sections={parallaxSections}
          className="max-w-[1200px] mx-auto"
        />
      </div>
    </>
  );
}

/* ============================================
   Section 6: 3D Scanning — dark charcoal bg
   ============================================ */

function V1ScanningSection() {
  return (
    <section id="scanning" style={{
      background: '#2C2C2A',
      padding: 'clamp(80px, 10vw, 100px) clamp(28px, 4vw, 48px)',
    }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }} className="reveal">
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#C4A96A',
          marginBottom: 16,
        }}>
          3D facial scanning
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          color: '#F5F3EE',
          margin: '0 0 14px',
        }}>
          See the result before the first injection
        </h2>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 18,
          color: '#C4A96A',
          margin: '0 0 28px',
        }}>
          Precision mapped to your anatomy.
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          lineHeight: 1.75,
          color: '#B4B2A9',
          margin: 0,
          textAlign: 'justify',
        }}>
          Using advanced 3D scanning, Dr. Michalakis captures a precise digital model of the treatment area — showing you exactly what a specific treatment will achieve, how proportions will shift, and where the boundaries of natural enhancement lie.
        </p>
        {/* TODO: add 3D scanner photo from next shoot */}
      </div>
    </section>
  );
}

/* ============================================
   Booking Section (isolated for form state)
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
      setTimeout(() => {
        form.reset();
        setSubmitted(false);
      }, 3000);
    }
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    fontSize: 14,
    fontFamily: 'var(--font-sans)',
    background: '#F5F3EE',
    border: '0.5px solid rgba(0,0,0,0.08)',
    borderRadius: 8,
    color: 'var(--color-charcoal)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <section id="booking" style={{
      background: 'var(--color-ivory)',
      padding: 'clamp(80px, 10vw, 100px) clamp(28px, 4vw, 48px)',
    }}>
      <div className="reveal" style={{
        background: '#FAFAF7',
        borderRadius: 16,
        border: '0.5px solid rgba(0,0,0,0.06)',
        padding: '48px 28px 40px',
        maxWidth: 440,
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#B8A882',
          marginBottom: 12,
          textAlign: 'center',
        }}>
          Book a Consultation
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          color: 'var(--color-charcoal)',
          margin: '0 0 14px',
          textAlign: 'center',
        }}>
          Begin Your Journey
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#888780',
          textAlign: 'center',
          margin: '0 0 32px',
          lineHeight: 1.5,
        }}>
          Complimentary 15-minute consultation.<br />
          We'll confirm via email within 24 hours.
        </p>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-charcoal)', display: 'block', marginBottom: 6 }}>
              Full Name
            </label>
            <input
              type="text" name="name" placeholder="Your name" required autoComplete="name"
              style={{ ...inputStyle, borderColor: errors.name ? '#c0392b' : undefined }}
              onFocus={e => (e.currentTarget.style.borderColor = '#B8A882')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.name ? '#c0392b' : 'rgba(0,0,0,0.08)')}
              onInput={() => clearError('name')}
            />
            {errors.name && <span style={{ fontSize: 11, color: '#c0392b', marginTop: 4, display: 'block' }}>Please enter your name</span>}
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-charcoal)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email" name="email" placeholder="your@email.com" required autoComplete="email"
              style={{ ...inputStyle, borderColor: errors.email ? '#c0392b' : undefined }}
              onFocus={e => (e.currentTarget.style.borderColor = '#B8A882')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#c0392b' : 'rgba(0,0,0,0.08)')}
              onInput={() => clearError('email')}
            />
            {errors.email && <span style={{ fontSize: 11, color: '#c0392b', marginTop: 4, display: 'block' }}>Please enter a valid email</span>}
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-charcoal)', display: 'block', marginBottom: 6 }}>
              Phone
            </label>
            <input
              type="tel" name="phone" placeholder="+30 000 000 0000" required autoComplete="tel"
              style={{ ...inputStyle, borderColor: errors.phone ? '#c0392b' : undefined }}
              onFocus={e => (e.currentTarget.style.borderColor = '#B8A882')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.phone ? '#c0392b' : 'rgba(0,0,0,0.08)')}
              onInput={() => clearError('phone')}
            />
            {errors.phone && <span style={{ fontSize: 11, color: '#c0392b', marginTop: 4, display: 'block' }}>Please enter your phone number</span>}
          </div>

          <button
            type="submit"
            disabled={submitted}
            style={{
              width: '100%',
              padding: 14,
              background: '#2C2C2A',
              color: '#F5F3EE',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: 6,
              transition: 'opacity 0.2s',
              opacity: submitted ? 0.7 : 1,
            }}
          >
            {submitted ? 'Thank You!' : 'Book consultation'}
          </button>
        </form>
      </div>
    </section>
  );
}


/* ============================================
   Treatments Section — Wave Carousel
   ============================================ */

const treatmentCarouselCards: CarouselCard[] = [
  {
    title: 'Dermal Fillers',
    subtitle: 'Restoring volume and contour with precision placement.',
    image: '/images/syringe-prep.jpg',
    badge: { text: 'Popular', variant: 'gold' },
    href: '/care/fillers',
  },
  {
    title: 'Botulinum Therapy',
    subtitle: 'Targeted relaxation of expression lines for a natural result.',
    image: '/images/botox-vials.jpg',
    badge: { text: 'Non-invasive', variant: 'sage' },
    href: '/care/botox',
  },
  {
    title: 'Skin Boosters',
    subtitle: 'Deep hydration and collagen stimulation for luminous skin.',
    badge: { text: 'Rejuvenation', variant: 'gold' },
    href: '/care/skin-boosters',
  },
  {
    title: 'Mesotherapy',
    subtitle: 'Customised microinjection cocktails to nourish from within.',
    badge: { text: 'Advanced', variant: 'muted' },
    href: '/care/mesotherapy',
  },
  {
    title: 'Biostimulators',
    subtitle: 'Activating your own collagen for long-term structural renewal.',
    badge: { text: 'Regenerative', variant: 'sage' },
    href: '/care/biostimulator',
  },
  {
    title: 'PRP Rejuvenation',
    subtitle: 'Your own biology redirected for face and scalp renewal.',
    badge: { text: 'Natural', variant: 'warm' },
    href: '/care/prp-face-scalp-rejuvenation',
  },
  {
    title: 'Body Treatments',
    subtitle: 'Medical body contouring for firmness, texture, and tone.',
    badge: { text: 'Body', variant: 'warm' },
    href: '/care/body-treatments',
  },
  {
    title: 'Hyperhidrosis',
    subtitle: 'Medical-grade therapy for excessive sweating and comfort.',
    badge: { text: 'Medical', variant: 'muted' },
    href: '/care/hyperhidrosis-treatment',
  },
];

function TreatmentsGrid() {
  return (
    <section id="treatments" style={{
      background: 'var(--color-ivory)',
      padding: 'clamp(80px, 10vw, 100px) 0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(28px, 4vw, 48px)' }}>
        <div className="text-center reveal" style={{ marginBottom: 16 }}>
          <p className="eyebrow">Our Treatments</p>
          <h2 className="section-title">Refined Aesthetic Solutions</h2>
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '520px' }}>
            {siteData.sections.treatmentsIntro.text}
          </p>
        </div>
      </div>

      <div className="reveal">
        <RuixenCarouselWave cards={treatmentCarouselCards} />
      </div>

      {/* Explore all treatments button */}
      <div className="reveal" style={{ textAlign: 'center', marginTop: 24 }}>
        <Link
          to="/treatments"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 32px',
            background: '#2C2C2A',
            color: '#F5F3EE',
            borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Explore all treatments
        </Link>
      </div>
    </section>
  );
}
