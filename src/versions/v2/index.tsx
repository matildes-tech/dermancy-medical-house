import { useEffect, useState, type FormEvent, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ============================================
   V2 — Rhodes Beach (Figma-match)
   File: DERMANCY V2 (28:16 desktop / 1:162 mobile)
   ============================================ */

const c = {
  bg: '#fefdfb',
  cream: '#f5eee6',
  brown: '#5e554b',
  stone: '#8c8073',
  sage: '#979c88',
  ink: '#151414',
  navy: '#1c242e',
  blue: '#2e5677',
  line: '#e5ebf0',
  white: '#ffffff',
  fieldBg: '#e9e7e3',
  fieldText: 'rgba(0,0,0,.63)',
  bodyText: '#f5f0e7',
};
const F = "'Inter','Helvetica Neue',sans-serif";
const FD = "'Lexend Zetta','Inter',sans-serif"; // display

/* ---------- CSS ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@500;700;900&display=swap');
.r-reveal{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}
.r-reveal.vis{opacity:1;transform:translateY(0)}
@keyframes rFU{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.r-ha{animation:rFU .9s ease both}.r-h1{animation-delay:.1s}.r-h2{animation-delay:.35s}.r-h3{animation-delay:.6s}
.r-img{display:block;width:100%;height:100%;object-fit:cover}
.r-pill{display:inline-flex;align-items:center;justify-content:center;border-radius:100px;padding:14px 36px;background:rgba(255,255,255,.5);color:${c.brown};font-family:${F};font-weight:600;font-size:15px;letter-spacing:.04em;cursor:pointer;text-decoration:none;border:none;backdrop-filter:blur(8px);transition:background .25s,transform .25s}
.r-pill:hover{background:rgba(255,255,255,.8);transform:translateY(-1px)}
.r-pill-lg{padding:24px 36px;font-size:24px;color:${c.ink}}
.r-pill-white{background:${c.white};color:${c.brown};font-weight:800;letter-spacing:.18em;font-size:11px;padding:17px 36px}
.r-pill-white:hover{background:${c.cream}}
.r-link{font-family:${F};font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${c.white};text-decoration:none;transition:opacity .2s}
.r-link:hover{opacity:.7}
.r-eyebrow{font-family:${F};font-weight:800;font-size:14px;letter-spacing:.25em;text-transform:uppercase;color:${c.ink};margin:0}
.r-eyebrow-lt{color:${c.white}}
.r-display{font-family:${F};font-weight:300;line-height:1.18;letter-spacing:-.01em;color:${c.navy};margin:0}
.r-body{font-family:${F};font-weight:400;font-size:14px;line-height:1.7;color:${c.stone};margin:0}
.r-rule{width:40px;height:3px;background:${c.brown};display:block}
.r-rule-lt{background:rgba(255,255,255,.5)}
/* nav scrim */
.r-nav-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0));pointer-events:none}
/* hero */
.r-hero{position:relative;width:100%;min-height:100vh;overflow:hidden;background:#283645}
.r-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:saturate(1.05) contrast(1.02)}
.r-hero-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,.08) 35%,rgba(0,0,0,.28) 100%);z-index:1;pointer-events:none}
.r-hero>*:not(.r-hero-video):not(.r-hero-scrim){position:relative;z-index:2}
.r-logo-display{font-family:${FD};font-weight:500;letter-spacing:.04em;color:${c.white};line-height:.92;text-align:center}
/* mobile menu */
.r-mob{position:fixed;inset:0;background:${c.cream};z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;opacity:0;pointer-events:none;transition:opacity .3s}
.r-mob.open{opacity:1;pointer-events:auto}
.r-mob a{font-family:${F};font-size:1.6rem;font-weight:500;color:${c.ink};text-decoration:none;letter-spacing:.18em;text-transform:uppercase}
/* show/hide */
.desk-only{display:block}.mob-only{display:none}
.r-desk-nav{display:flex}.r-burger{display:none}
/* responsive */
@media(max-width:980px){
  .desk-only{display:none!important}.mob-only{display:block!important}
  .r-desk-nav{display:none!important}.r-burger{display:flex!important}
  .r-hero-title{font-size:clamp(40px,11vw,80px)!important;letter-spacing:0!important}
  .r-hero-sub{font-size:clamp(18px,4.5vw,28px)!important}
  .r-treatments-grid{grid-template-columns:1fr 1fr!important}
  .r-section-pad{padding:48px 20px!important}
  .r-philosophy{grid-template-columns:1fr!important}
  .r-philosophy-img{height:280px!important}
  .r-philosophy-card{margin:-40px 20px 0!important;padding:32px 24px!important}
  .r-doctor{grid-template-columns:1fr!important}
  .r-doctor-img{height:380px!important;margin:0 20px!important}
  .r-doctor-text{padding:32px 20px!important}
  .r-scan{grid-template-columns:1fr!important;padding:48px 20px!important}
  .r-scan-imgs{height:300px!important}
  .r-booking{grid-template-columns:1fr!important;padding:48px 20px!important;gap:32px!important}
  .r-booking-title{font-size:64px!important;line-height:1.05!important}
  .r-footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
  .r-footer-display{font-size:64px!important;letter-spacing:6px!important}
}
@media(max-width:560px){
  .r-treatments-grid{grid-template-columns:1fr!important}
  .r-footer-grid{grid-template-columns:1fr!important}
}
`;

/* ============================================ */
export default function V2() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    const e = document.querySelectorAll('.r-reveal:not(.vis)');
    if (!e.length) return;
    const o = new IntersectionObserver(en => en.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('vis'); o.unobserve(x.target); }
    }), { threshold: .08, rootMargin: '0px 0px -32px 0px' });
    e.forEach(x => o.observe(x));
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: F, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{CSS}</style>

      {/* mobile menu */}
      <div className={`r-mob ${menu ? 'open' : ''}`}>
        <button onClick={() => setMenu(false)} aria-label="Close" style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.ink} strokeWidth="1.5"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
        </button>
        <Link to="/about" onClick={() => setMenu(false)}>About</Link>
        <a href="#treatments" onClick={() => setMenu(false)}>Treatments</a>
        <a href="#scanning" onClick={() => setMenu(false)}>3D Scanning</a>
        <a href="#doctor" onClick={() => setMenu(false)}>Doctor</a>
        <a href="#booking" onClick={() => setMenu(false)}>Book</a>
      </div>

      {/* ===== HERO ===== */}
      <section className="r-hero">
        <video
          className="r-hero-video"
          src="/images/v2-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="r-hero-scrim" />
        <div className="r-nav-scrim" />

        {/* nav */}
        <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '28px clamp(20px,4vw,56px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1440, margin: '0 auto' }}>
          <a href="/" style={{ fontFamily: F, fontSize: 13, fontWeight: 800, letterSpacing: '.22em', color: c.white, textDecoration: 'none', opacity: scrolled ? 1 : .9 }}>DERMANCY</a>
          <div className="r-desk-nav" style={{ gap: 'clamp(24px,4vw,56px)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {[
              { l: 'ABOUT', h: '/about', i: true },
              { l: 'TREATMENTS', h: '#treatments' },
              { l: '3D SCANNING', h: '#scanning' },
              { l: 'DOCTOR', h: '#doctor' },
            ].map(n =>
              n.i ? <Link key={n.l} to={n.h} className="r-link">{n.l}</Link>
                : <a key={n.l} href={n.h} className="r-link">{n.l}</a>)}
          </div>
          {/* phone icon (desk) */}
          <a href="tel:+302241000000" className="desk-only" aria-label="Call" style={{ color: c.white }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.36 1.84.7 2.7a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2.11-.45c.86.34 1.77.57 2.7.7a2 2 0 0 1 1.72 2z" /></svg>
          </a>
          {/* burger (mob) */}
          <button className="r-burger" onClick={() => setMenu(true)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ display: 'block', width: 22, height: 1.5, background: c.white }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: c.white, marginTop: 6 }} />
          </button>
        </nav>

        {/* center display */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px', textAlign: 'center' }}>
          <motion.h1 className="r-logo-display r-hero-title r-ha r-h1"
            style={{ fontSize: 'clamp(64px,11vw,128px)', textShadow: '0 4px 24px rgba(0,0,0,.18)' }}>
            DERMANCY
          </motion.h1>
          <motion.p className="r-logo-display r-hero-sub r-ha r-h2"
            style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 500, marginTop: 'clamp(16px,3vw,40px)', fontStyle: 'italic', letterSpacing: '.02em', textShadow: '0 2px 12px rgba(0,0,0,.18)' }}>
            medical clinic
          </motion.p>
        </div>

        {/* CTA */}
        <a href="#booking" className="r-pill r-pill-lg r-ha r-h3"
          style={{ position: 'absolute', left: '50%', bottom: 'clamp(40px,9vh,90px)', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          Book Free Consultation
        </a>

        {/* SCROLL ind */}
        <div className="desk-only" style={{ position: 'absolute', right: 28, bottom: 30, transform: 'rotate(90deg)', transformOrigin: 'right bottom', fontFamily: F, fontSize: 9, fontWeight: 500, letterSpacing: '.4em', color: 'rgba(255,255,255,.55)' }}>
          SCROLL
        </div>

        {/* corner monogram */}
        <a href="/" aria-label="Home" className="desk-only" style={{ position: 'absolute', left: 28, bottom: 24, width: 44, height: 44, borderRadius: 22, border: '1.5px solid rgba(255,255,255,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <span style={{ fontFamily: F, fontStyle: 'italic', fontSize: 16, fontWeight: 600, color: c.white }}>Ai</span>
        </a>
        {/* whatsapp */}
        <a href="https://wa.me/302241000000" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="desk-only" style={{ position: 'absolute', right: 28, bottom: 76, width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.307 1.265.489 1.697.626.713.226 1.362.194 1.875.118.572-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" /></svg>
        </a>
      </section>

      {/* ===== TREATMENTS ===== */}
      <section id="treatments" style={{ background: c.cream, padding: 'clamp(64px,7vw,100px) clamp(20px,4vw,60px)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
          <div className="r-reveal" style={{ marginBottom: 40 }}>
            <p className="r-eyebrow" style={{ marginBottom: 12 }}>OUR TREATMENTS</p>
            <h2 className="r-display" style={{ fontSize: 'clamp(28px,3.5vw,40px)', color: c.brown }}>Refined Aesthetic Solutions</h2>
          </div>

          {/* desk arrows top right */}
          <div className="desk-only" style={{ position: 'absolute', top: 8, right: 0, display: 'flex', gap: 12 }}>
            <button aria-label="Previous" style={arrowBtn}><span style={arrowGlyph}>←</span></button>
            <button aria-label="Next" style={arrowBtn}><span style={arrowGlyph}>→</span></button>
          </div>

          <div className="r-treatments-grid r-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { name: 'Dermal Fillers', sub: 'Restoring volume and contour.', bg: '#d8d2c9', slug: 'fillers' },
              { name: 'Botulinum Therapy', sub: 'Targeted expression line relaxation.', bg: '#b2bbb3', slug: 'botox' },
              { name: 'Skin Boosters', sub: 'Deep hydration and luminous skin.', bg: '#6c8083', slug: 'skin-boosters' },
              { name: 'Mesotherapy', sub: 'Customised microinjection cocktails.', bg: '#40525a', slug: 'mesotherapy' },
            ].map(t => (
              <Link key={t.name} to={`/care/${t.slug}`} style={{ textDecoration: 'none', color: c.navy }}>
                <div style={{ background: c.white, border: `1px solid ${c.line}`, borderRadius: 12, overflow: 'hidden', height: 380, display: 'flex', flexDirection: 'column', transition: 'transform .35s ease,box-shadow .35s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ background: t.bg, height: 220, width: '100%' }} />
                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontFamily: F, fontWeight: 500, fontSize: 17, color: c.navy, margin: '8px 0 6px' }}>{t.name}</p>
                    <p style={{ fontFamily: F, fontWeight: 400, fontSize: 13, color: c.stone, margin: 0 }}>{t.sub}</p>
                    <span style={{ marginTop: 'auto', alignSelf: 'flex-end', color: c.blue, fontSize: 18 }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
            <Link to="/treatments" className="r-pill" style={{ fontSize: 18, padding: '16px 36px' }}>
              Explore all Treatments&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3D SCANNING ===== */}
      <section id="scanning" style={{ background: `linear-gradient(180deg,${c.sage} 0%,${c.sage} 45%,${c.cream} 100%)`, padding: 'clamp(64px,7vw,100px) clamp(20px,4vw,80px)' }}>
        <div className="r-scan" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', maxWidth: 1440, margin: '0 auto', alignItems: 'center' }}>
          <div className="r-reveal">
            <p className="r-eyebrow r-eyebrow-lt" style={{ marginBottom: 18, color: c.white }}>3D INTELLIGENT SCANNING</p>
            <h2 className="r-display" style={{ fontSize: 'clamp(36px,4.5vw,52px)', color: c.white, lineHeight: 1.18, marginBottom: 28 }}>
              See the result before the first injection.
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: 20, color: '#e0dbd1', marginBottom: 18 }}>Precision mapped to your anatomy.</p>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: c.bodyText, maxWidth: 540, marginBottom: 14 }}>
              Using advanced 3D scanning technology, Dr. Michalakis captures a precise digital model of the treatment area — showing exactly what a treatment will achieve, how proportions will shift, and where the boundaries of natural enhancement lie.
            </p>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: c.bodyText, maxWidth: 540 }}>
              Not every clinic offers this level of visibility. At Dermancy Medical House, it is standard.
            </p>
          </div>
          <div className="r-reveal r-scan-imgs" style={{ position: 'relative', height: 460, display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, height: '88%', alignSelf: 'flex-end', overflow: 'hidden', borderRadius: 4 }}>
              <img src="/images/v2-scan-2.jpg" alt="3D facial mapping" className="r-img" loading="lazy" />
            </div>
            <div style={{ flex: 1, height: '100%', overflow: 'hidden', borderRadius: 4 }}>
              <img src="/images/v2-scan-1.jpg" alt="3D facial mapping" className="r-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section style={{ background: c.cream, position: 'relative' }}>
        <div className="r-philosophy" style={{ display: 'grid', gridTemplateColumns: '58% 42%', minHeight: 760, maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
          <div className="r-philosophy-img" style={{ height: '100%', minHeight: 'clamp(380px,55vw,760px)', overflow: 'hidden' }}>
            <img src="/images/v2-doctor-consultation.jpg" alt="Doctor consultation" className="r-img" loading="lazy" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: 'clamp(40px,5vw,80px) clamp(28px,4vw,60px)' }}>
            <div className="r-philosophy-card r-reveal" style={{ background: c.sage, border: `1px solid ${c.bodyText}`, borderRadius: 16, padding: 'clamp(32px,4vw,48px)', color: c.white, width: '100%' }}>
              <p className="r-eyebrow" style={{ color: c.ink, marginBottom: 18 }}>OUR PHILOSOPHY</p>
              <h2 className="r-display" style={{ fontSize: 'clamp(28px,3vw,38px)', color: c.white, lineHeight: 1.25, marginBottom: 24 }}>
                We listen<br />before we treat
              </h2>
              <span className="r-rule" style={{ background: c.brown, marginBottom: 20 }} />
              <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.7, color: c.cream, marginBottom: 18 }}>
                Every patient arrives with a different face, a different concern, a different expectation. Our work begins long before any procedure — in the conversation, the assessment, the trust that forms when someone feels understood.
              </p>
              <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.7, color: c.cream, marginBottom: 28 }}>
                We have the expertise to deliver remarkable results. We have the integrity to recommend only what is right.
              </p>
              <Link to="/about" className="r-pill" style={{ fontSize: 13, padding: '10px 28px', color: c.stone, background: 'rgba(255,255,255,.5)' }}>
                READ MORE&nbsp;→
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOCTOR ===== */}
      <section id="doctor" style={{ background: c.cream, padding: 'clamp(48px,5vw,50px) clamp(20px,4vw,60px) clamp(64px,7vw,80px)' }}>
        <div className="r-doctor" style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 'clamp(40px,6vw,80px)', maxWidth: 1440, margin: '0 auto', alignItems: 'center' }}>
          <div className="r-doctor-img r-reveal" style={{ height: 680, borderRadius: 12, overflow: 'hidden' }}>
            <img src="/images/v2-dr-rhodes.jpg" alt="Dr. Ioannis Michalakis in Rhodes" className="r-img" loading="lazy" />
          </div>
          <div className="r-doctor-text r-reveal" style={{ padding: '40px 0' }}>
            <p className="r-eyebrow" style={{ marginBottom: 18 }}>THE DOCTOR</p>
            <h2 className="r-display" style={{ fontSize: 'clamp(34px,3.8vw,44px)', color: 'rgba(0,0,0,.73)', lineHeight: 1.18, marginBottom: 28 }}>
              Dr. Ioannis<br />Michalakis
            </h2>
            <div style={{ fontFamily: F, fontWeight: 400, fontSize: 12, lineHeight: 1.7, color: c.brown, marginBottom: 22 }}>
              <p style={{ margin: 0 }}>Cosmetic Dermatology</p>
              <p style={{ margin: 0 }}>MSc Dermatology &amp; Allergology</p>
              <p style={{ margin: 0 }}>Medical University of Athens</p>
            </div>
            <span className="r-rule" style={{ background: 'rgba(0,0,0,.18)', marginBottom: 22 }} />
            <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.75, color: c.stone, maxWidth: 620, marginBottom: 18 }}>
              Aesthetic medicine is not about following trends — it is about reading the face. Every consultation begins with structure, proportion, and the patient&rsquo;s own identity.
            </p>
            <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.75, color: c.stone, maxWidth: 620, marginBottom: 32 }}>
              The goal is never to change. It is to restore what time has softened and reveal what was always there.
            </p>
            <Link to="/about" className="r-pill" style={{ fontSize: 13, padding: '10px 32px', color: c.stone, background: 'rgba(255,255,255,.5)' }}>
              DISCOVER THE APPROACH&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <BookingSection />

      {/* ===== FOOTER ===== */}
      <footer style={{ position: 'relative', background: c.ink, color: c.white, overflow: 'hidden', minHeight: 480 }}>
        <img src="/images/v2-footer-bg.jpg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,30,40,.55),rgba(20,30,40,.85))' }} />
        <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: 'clamp(32px,4vw,40px) clamp(20px,5vw,80px) 28px' }}>
          <p className="r-footer-display" style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(56px,12vw,140px)', letterSpacing: 'clamp(4px,1vw,12px)', color: c.white, margin: '0 0 60px', lineHeight: 1, textShadow: '0 4px 24px rgba(151,156,136,.45)' }}>
            DERMANCY
          </p>
          <div className="r-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, marginBottom: 80 }}>
            <FCol heading="EXPLORE" links={[
              { l: 'About', h: '/about', i: true },
              { l: 'Treatments', h: '#treatments' },
              { l: '3D Scanning', h: '#scanning' },
              { l: 'Book', h: '#booking' },
            ]} />
            <FCol heading="CONTACT" links={[
              { l: 'info@dermancy.gr', h: 'mailto:info@dermancy.gr' },
              { l: '+30 22410 00 000', h: 'tel:+302241000000' },
              { l: 'Larnakas 5, Rhodes 85100, Greece', h: 'https://maps.google.com', ext: true },
            ]} />
            <FCol heading="FOLLOW" links={[
              { l: 'Instagram', h: '#', ext: true },
              { l: 'Facebook', h: '#', ext: true },
              { l: 'TikTok', h: '#', ext: true },
            ]} />
            <div style={{ alignSelf: 'flex-start' }}>
              <p style={{ fontFamily: F, fontWeight: 500, fontSize: 14, color: c.white, margin: 0, lineHeight: 1.6 }}>Subtle. Refined.<br />Sun-kissed.</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.12)' }}>
            <p style={{ fontFamily: F, fontWeight: 500, fontSize: 11, color: c.white, opacity: .7, margin: 0 }}>© 2026 Dermancy Medical House. All rights reserved.</p>
            <a href="#" style={{ fontFamily: F, fontSize: 10, color: c.white, opacity: .7, textDecoration: 'none' }}>Terms &amp; conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================ */
const arrowBtn: CSSProperties = { width: 44, height: 44, borderRadius: 22, background: c.white, border: `1px solid #e0e5eb`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const arrowGlyph: CSSProperties = { fontFamily: F, fontSize: 16, color: c.navy };

function FCol({ heading, links }: { heading: string; links: Array<{ l: string; h: string; i?: boolean; ext?: boolean }> }) {
  return (
    <div>
      <p style={{ fontFamily: F, fontWeight: 800, fontSize: 13, letterSpacing: '.22em', color: 'rgba(255,255,255,.7)', margin: '0 0 16px' }}>{heading}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(n =>
          <li key={n.l}>
            {n.i ? <Link to={n.h} style={fLink}>{n.l}</Link>
              : <a href={n.h} style={fLink} {...(n.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{n.l}</a>}
          </li>)}
      </ul>
    </div>
  );
}
const fLink: CSSProperties = { fontFamily: F, fontWeight: 600, fontSize: 14, color: c.white, textDecoration: 'none', opacity: .92 };

/* ============================================ */
function BookingSection() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const go = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const n = (f.elements.namedItem('name') as HTMLInputElement).value.trim();
    const em = (f.elements.namedItem('email') as HTMLInputElement).value.trim();
    const ph = (f.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const ne: Record<string, boolean> = {};
    if (!n) ne.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) ne.email = true;
    if (!ph || ph.length < 6) ne.phone = true;
    setErrors(ne);
    if (!Object.keys(ne).length) {
      setSubmitted(true);
      setTimeout(() => { f.reset(); setSubmitted(false); }, 3000);
    }
  };
  const clr = (x: string) => setErrors(p => { const n = { ...p }; delete n[x]; return n; });

  const inp: CSSProperties = {
    width: '100%', height: 44, padding: '12px 13px', borderRadius: 8,
    background: c.fieldBg, border: '1px solid rgba(255,255,255,.3)',
    fontSize: 14, fontFamily: F, color: c.ink, outline: 'none',
    transition: 'border-color .2s'
  };
  const lbl: CSSProperties = { fontFamily: F, fontWeight: 500, fontSize: 11, letterSpacing: '.22em', color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: 8 };

  return (
    <section id="booking" className="r-booking" style={{ background: c.cream, padding: 'clamp(64px,7vw,100px) clamp(20px,4vw,80px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', maxWidth: 1440, margin: '0 auto', alignItems: 'center' }}>
        <div className="r-reveal">
          <h2 className="r-booking-title" style={{ fontFamily: F, fontWeight: 600, fontSize: 'clamp(56px,7vw,72px)', lineHeight: 1.1, color: c.brown, margin: '0 0 36px' }}>
            Begin<br />Your<br />Journey
          </h2>
          <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.7, color: c.stone, margin: 0, maxWidth: 320 }}>
            Complimentary 15-minute consultation.<br />We&rsquo;ll confirm via email within 24 hours.
          </p>
        </div>
        <div className="r-reveal" style={{ background: c.sage, borderRadius: 8, padding: 'clamp(36px,4vw,56px) clamp(28px,3vw,40px)' }}>
          <form onSubmit={go} noValidate>
            {[
              { n: 'name', l: 'FULL NAME', t: 'text', p: 'Your name', a: 'name' },
              { n: 'email', l: 'EMAIL', t: 'email', p: 'your@email.com', a: 'email' },
              { n: 'phone', l: 'PHONE', t: 'tel', p: '+30 000 000 0000', a: 'tel' },
            ].map(f => (
              <div key={f.n} style={{ marginBottom: 22 }}>
                <label style={lbl} htmlFor={f.n}>{f.l}</label>
                <input id={f.n} type={f.t} name={f.n} placeholder={f.p} required autoComplete={f.a}
                  style={{ ...inp, borderColor: errors[f.n] ? '#c0392b' : 'rgba(255,255,255,.3)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = c.white)}
                  onBlur={e => (e.currentTarget.style.borderColor = errors[f.n] ? '#c0392b' : 'rgba(255,255,255,.3)')}
                  onInput={() => clr(f.n)} />
                {errors[f.n] && <span style={{ fontSize: 11, color: '#ffd1c2', marginTop: 4, display: 'block' }}>
                  {f.n === 'email' ? 'Valid email required' : `Enter your ${f.l.toLowerCase()}`}
                </span>}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
              <button type="submit" disabled={submitted} className="r-pill r-pill-white" style={{ width: 296, height: 48 }}>
                {submitted ? 'THANK YOU' : 'BOOK CONSULTATION'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
