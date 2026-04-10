import { useEffect, useState, type FormEvent } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { CircularGallery, type GalleryItem } from '@/components/ui/circular-gallery';
import { ParallaxScrollFeatureSection } from '@/components/ui/parallax-scroll-feature-section';

/* ============================================
   Dermancy Medical House — React App
   ============================================ */

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ---- Header scroll visibility ---- */
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const past = window.scrollY > heroHeight - 80;
      setHeaderVisible(past);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  /* ---- Sticky booking button ---- */
  useEffect(() => {
    const sticky = document.getElementById('stickyBooking');
    const hero = document.getElementById('hero');
    const booking = document.getElementById('booking');
    if (!sticky || !hero || !booking) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) {
            sticky.classList.toggle('is-visible', !entry.isIntersecting);
          }
          if (entry.target === booking && entry.isIntersecting) {
            sticky.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
    observer.observe(booking);
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

  /* ---- Hero props ---- */
  const navLinks = [
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'THE DOCTOR', href: '#doctor' },
    { label: 'TREATMENTS', href: '#treatments' },
    { label: 'BOOK', href: '#booking' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
  ];

  return (
    <>
      {/* ========== FIXED HEADER (appears on scroll) ========== */}
      <header
        className={`header ${headerVisible ? 'is-visible is-scrolled' : ''}`}
        id="header"
        role="banner"
      >
        <div className="header__inner">
          <a href="#" className="header__logo" aria-label="Dermancy Medical House — Home">
            Dermancy Medical House
          </a>

          <nav
            className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}
            id="mobileNav"
            aria-label="Main navigation"
          >
            <a href="#philosophy" className="mobile-nav__link" onClick={closeMenu}>Philosophy</a>
            <a href="#doctor" className="mobile-nav__link" onClick={closeMenu}>The Doctor</a>
            <a href="#treatments" className="mobile-nav__link" onClick={closeMenu}>Treatments</a>
            <a href="#booking" className="mobile-nav__link" onClick={closeMenu}>Book</a>
            <div className="mobile-nav__cta">
              <a href="#booking" className="btn btn--primary" onClick={closeMenu}>Book Appointment</a>
            </div>
          </nav>

          <div className="header__actions">
            <a href="#booking" className="header__book-btn">Book</a>
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

      {/* ========== HERO — MinimalistHero Component ========== */}
      <section id="hero">
        <MinimalistHero
          logoText="DERMANCY"
          navLinks={navLinks}
          mainText="Welcome to a space where medical expertise meets aesthetic harmony."
          readMoreLink="#philosophy"
          imageSrc="/images/hero-portrait.png"
          imageAlt="Elegant woman in profile — Dermancy Medical House"
          overlayText={{
            part1: 'DERMANCY',
            part2: 'medical house',
          }}
          socialLinks={socialLinks}
          locationText="Rhodes, Greece"
        />
      </section>

      {/* ========== PARALLAX SCROLL SECTIONS ========== */}
      <ParallaxScrollFeatureSection
        sections={[
          {
            id: 'brand',
            reverse: false,
            imageUrl: 'https://images.unsplash.com/photo-1532926381893-7542571f0e53?w=800&q=80',
            imageAlt: 'Serene beauty and skincare ritual',
            content: (
              <div>
                <p className="eyebrow">Our Promise</p>
                <h2 className="section-title">Refinement,<br />Not Transformation</h2>
                <p className="body-text">
                  At Dermancy, aesthetic medicine is not about transformation — but refinement.
                  Each treatment is designed to restore balance, enhance natural features, and respect your individuality.
                </p>
              </div>
            ),
          },
          {
            id: 'philosophy',
            reverse: true,
            imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
            imageAlt: 'Calm, refined clinic environment',
            content: (
              <div id="philosophy">
                <p className="eyebrow">Our Philosophy</p>
                <h2 className="section-title">Beauty in Balance</h2>
                <p className="body-text">
                  We believe aesthetic medicine should never erase your identity — it should refine it.
                  Our approach is subtle, intentional, and clinically grounded.
                </p>
                <a href="#" className="text-link" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
                  Read More →
                </a>
              </div>
            ),
          },
          {
            id: 'doctor',
            reverse: false,
            imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
            imageAlt: 'Dr. Ioannis Michalakis portrait',
            content: (
              <div id="doctor">
                <p className="eyebrow">The Doctor</p>
                <h2 className="section-title">Dr. Ioannis Michalakis</h2>
                <p className="body-text">
                  With years of clinical experience and a refined eye for balance, Dr. Michalakis approaches aesthetic medicine as both science and art.
                  His work focuses on natural, harmonious results that enhance — never alter — your identity.
                </p>
                <a href="#" className="text-link" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
                  Discover the Approach →
                </a>
              </div>
            ),
          },
        ]}
      />

      {/* ========== TREATMENTS — Circular 3D Gallery ========== */}
      <TreatmentsCarousel />

      {/* ========== EXPERIENCE ========== */}
      <section className="section experience" id="experience">
        <div className="container container--narrow text-center reveal">
          <p className="eyebrow">The Experience</p>
          <h2 className="section-title">Every Detail Considered</h2>
          <p className="body-text" style={{ margin: '0 auto' }}>
            A calm, discreet environment designed for comfort and privacy.
            From consultation to treatment, every detail is carefully considered to ensure a seamless experience.
          </p>
        </div>
      </section>

      {/* ========== BOOKING ========== */}
      <BookingSection />

      {/* ========== FOOTER ========== */}
      <footer className="footer" id="footer" role="contentinfo">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <p className="footer__logo">Dermancy Medical House</p>
              <p className="footer__tagline">Subtle. Refined. Personal.</p>
            </div>
            <nav className="footer__nav" aria-label="Footer navigation">
              <p className="footer__nav-title">Explore</p>
              <a href="#philosophy" className="footer__link">Philosophy</a>
              <a href="#doctor" className="footer__link">The Doctor</a>
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
                <a href="#" className="footer__social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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

      {/* ========== MOBILE STICKY BOOKING BUTTON ========== */}
      <div className="sticky-booking" id="stickyBooking">
        <a href="#booking" className="btn btn--primary btn--full">Book Appointment</a>
      </div>
    </>
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

  return (
    <section className="section booking" id="booking">
      <div className="container">
        <div className="booking__card reveal">
          <p className="eyebrow text-center">Book a Consultation</p>
          <h2 className="section-title text-center">Begin Your Journey</h2>

          <form className="booking__form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Your name"
                required
                autoComplete="name"
                onInput={() => clearError('name')}
              />
              <span className="form-error">Please enter your name</span>
            </div>

            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                placeholder="your@email.com"
                required
                autoComplete="email"
                onInput={() => clearError('email')}
              />
              <span className="form-error">Please enter a valid email</span>
            </div>

            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="+30 000 000 0000"
                required
                autoComplete="tel"
                onInput={() => clearError('phone')}
              />
              <span className="form-error">Please enter your phone number</span>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={submitted}
              style={submitted ? { opacity: 0.7 } : undefined}
            >
              {submitted ? 'Thank You!' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


/* ============================================
   Treatments Carousel Section
   ============================================ */

const treatmentItems: GalleryItem[] = [
  {
    common: 'Botox',
    binomial: 'Botulinum Toxin Therapy',
    photo: {
      url: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=600&q=80',
      text: 'Botox treatment',
      pos: 'center',
      by: 'Dermancy',
    },
  },
  {
    common: 'Fillers',
    binomial: 'Dermal Filler Treatments',
    photo: {
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
      text: 'Dermal fillers treatment',
      pos: 'center',
      by: 'Dermancy',
    },
  },
  {
    common: 'Skin Boosters',
    binomial: 'Hyaluronic Skin Renewal',
    photo: {
      url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
      text: 'Skin boosters treatment',
      pos: 'center',
      by: 'Dermancy',
    },
  },
  {
    common: 'Mesotherapy',
    binomial: 'Microinjection Therapy',
    photo: {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
      text: 'Mesotherapy treatment',
      pos: 'center top',
      by: 'Dermancy',
    },
  },
  {
    common: 'Chemical Peels',
    binomial: 'Advanced Skin Resurfacing',
    photo: {
      url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
      text: 'Chemical peel treatment',
      pos: 'center',
      by: 'Dermancy',
    },
  },
  {
    common: 'Microneedling',
    binomial: 'Collagen Induction Therapy',
    photo: {
      url: 'https://images.unsplash.com/photo-1598524374912-6b0b0bdd29a0?w=600&q=80',
      text: 'Microneedling treatment',
      pos: 'center',
      by: 'Dermancy',
    },
  },
];

function TreatmentsCarousel() {
  return (
    <section className="section treatments" id="treatments" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="text-center reveal" style={{ marginBottom: 'var(--space-lg)' }}>
          <p className="eyebrow">Our Treatments</p>
          <h2 className="section-title">Refined Aesthetic Solutions</h2>
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '480px' }}>
            Swipe or scroll to explore our curated range of treatments.
          </p>
        </div>
      </div>

      <div className="reveal">
        <CircularGallery
          items={treatmentItems}
          radius={500}
          autoRotateSpeed={0.03}
        />
      </div>

      <div className="text-center reveal" style={{ marginTop: 'var(--space-lg)' }}>
        <a href="#" className="text-link">View All Treatments →</a>
      </div>
    </section>
  );
}
