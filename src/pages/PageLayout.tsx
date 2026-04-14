import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteData } from '../versions/shared/data';

/* ============================================
   Shared layout for subpages — matches V1 design system
   Cormorant Garamond headings, DM Sans body, cream palette
   ============================================ */

const charcoal = '#2C2C2A';
const ivory = '#F5F3EE';
const gold = '#B8A882';
const mutedColor = '#888780';

const fontDisplay = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'DM Sans', sans-serif";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <div style={{ background: ivory, color: charcoal, fontFamily: fontSans, minHeight: '100vh' }}>
      <SubpageHeader />
      <main>{children}</main>
      <SubpageFooter />
    </div>
  );
}

/* ---- Header — matches V1 sticky nav ---- */
function SubpageHeader() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px clamp(28px, 4vw, 48px)',
        background: 'rgba(245, 243, 238, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: fontSans,
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: charcoal,
          textDecoration: 'none',
        }}
      >
        Dermancy
      </Link>

      <nav style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center' }}>
        <NavLink to="/about" label="About" />
        <NavLink to="/#treatments" label="Treatments" />
        <a
          href="/#booking"
          style={{
            fontFamily: fontSans,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: charcoal,
            padding: '8px 20px',
            border: `0.5px solid ${charcoal}`,
            borderRadius: 24,
            textDecoration: 'none',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = charcoal; e.currentTarget.style.color = ivory; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = charcoal; }}
        >
          Book consultation
        </a>
      </nav>
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const isHash = to.startsWith('/#');
  const Component = isHash ? 'a' : Link;
  const props = isHash ? { href: to } : { to };

  return (
    <Component
      {...(props as any)}
      style={{
        fontFamily: fontSans,
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: charcoal,
        opacity: 0.5,
        textDecoration: 'none',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = '0.5')}
    >
      {label}
    </Component>
  );
}

/* ---- Footer — matches V1 footer ---- */
function SubpageFooter() {
  return (
    <footer style={{ background: charcoal, color: ivory, padding: '80px clamp(28px, 4vw, 48px) 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 40,
        }}>
          <style>{`
            @media (min-width: 640px) {
              .subpage-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
            }
          `}</style>
          <div className="subpage-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
            <div>
              <p style={{ fontFamily: fontSans, fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: ivory, marginBottom: 8 }}>
                Dermancy Medical House
              </p>
              <p style={{ fontFamily: fontSans, fontSize: 14, fontWeight: 300, color: '#B8A999' }}>
                Subtle. Refined. Personal.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ivory, marginBottom: 12 }}>Explore</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link to="/about" style={{ color: '#B8A999', fontSize: 14, textDecoration: 'none' }}>About</Link>
                <a href="/#treatments" style={{ color: '#B8A999', fontSize: 14, textDecoration: 'none' }}>Treatments</a>
                <a href="/#booking" style={{ color: '#B8A999', fontSize: 14, textDecoration: 'none' }}>Book</a>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ivory, marginBottom: 12 }}>Contact</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href={`mailto:${siteData.contact.email}`} style={{ color: '#B8A999', fontSize: 14, textDecoration: 'none' }}>{siteData.contact.email}</a>
                <a href={`tel:${siteData.contact.phone?.replace(/\s/g, '')}`} style={{ color: '#B8A999', fontSize: 14, textDecoration: 'none' }}>{siteData.contact.phone}</a>
                <span style={{ color: '#B8A999', fontSize: 14 }}>Rhodes, Greece</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: ivory, marginBottom: 12 }}>Follow</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="https://www.instagram.com/dermancy_medical_house/" target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(184,169,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8A999' }} aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="https://www.facebook.com/giannis.michalakis.3/" target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(184,169,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8A999' }} aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@dr_michalakis" target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(184,169,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8A999' }} aria-label="TikTok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid rgba(184,169,153,0.15)', fontSize: 11, color: '#B8A999' }}>
          &copy; 2026 Dermancy Medical House. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---- Reusable primitives ---- */
export function PageSection({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  return (
    <section id={id} style={{ padding: '80px clamp(28px, 4vw, 48px)', maxWidth: 780, margin: '0 auto', ...style }}>
      {children}
    </section>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: fontDisplay,
        fontWeight: 400,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        lineHeight: 1.15,
        margin: '0 0 16px',
        color: charcoal,
      }}
    >
      {children}
    </motion.h1>
  );
}

export function PageTagline({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        fontFamily: fontDisplay,
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        fontStyle: 'italic',
        fontWeight: 400,
        color: gold,
        margin: '0 0 48px',
        lineHeight: 1.5,
      }}
    >
      {children}
    </motion.p>
  );
}

export function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      style={{ fontSize: 15, lineHeight: 1.8, color: '#4A5A52', fontFamily: fontSans }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ children, eyebrow }: { children: React.ReactNode; eyebrow?: string }) {
  return (
    <>
      {eyebrow && (
        <p style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 14 }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontFamily: fontDisplay,
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: 400,
        lineHeight: 1.25,
        margin: '0 0 24px',
        color: charcoal,
      }}>
        {children}
      </h2>
    </>
  );
}

export { charcoal, ivory, gold, mutedColor, fontDisplay, fontSans };
