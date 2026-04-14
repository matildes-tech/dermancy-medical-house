import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import PageLayout, { PageTitle, PageTagline, charcoal, ivory, gold, fontDisplay, fontSans } from './PageLayout';

export default function BookingPage() {
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

  const clearError = (field: string) => {
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontSize: 14, fontFamily: fontSans,
    background: '#F5F3EE', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 8,
    color: charcoal, outline: 'none', transition: 'border-color 0.2s ease',
  };

  return (
    <PageLayout title="Book a Consultation | Dermancy Medical House">
      {/* Hero */}
      <div style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(28px, 4vw, 48px) clamp(48px, 6vw, 60px)',
        textAlign: 'center',
        maxWidth: 700,
        margin: '0 auto',
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 20 }}
        >
          Book a Consultation
        </motion.p>
        <PageTitle>Begin Your Journey</PageTitle>
        <PageTagline>The first step is always a conversation.</PageTagline>
      </div>

      {/* Form card */}
      <div style={{
        padding: '0 clamp(28px, 4vw, 48px) clamp(80px, 10vw, 120px)',
      }}>
        <div style={{
          background: '#FAFAF7', borderRadius: 16,
          border: '0.5px solid rgba(0,0,0,0.06)',
          padding: '48px 28px 40px', maxWidth: 440, margin: '0 auto',
        }}>
          <p style={{ fontFamily: fontSans, fontSize: 14, color: '#888780', textAlign: 'center', margin: '0 0 32px', lineHeight: 1.5 }}>
            Complimentary 15-minute consultation.<br />
            We'll confirm via email within 24 hours.
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: charcoal, display: 'block', marginBottom: 6 }}>Full Name</label>
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
              <label style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: charcoal, display: 'block', marginBottom: 6 }}>Email</label>
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
              <label style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: charcoal, display: 'block', marginBottom: 6 }}>Phone</label>
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
              type="submit" disabled={submitted}
              style={{
                width: '100%', padding: 14, background: charcoal, color: ivory,
                border: 'none', borderRadius: 8, fontFamily: fontSans, fontSize: 13, fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
                marginTop: 6, transition: 'opacity 0.2s', opacity: submitted ? 0.7 : 1,
              }}
            >
              {submitted ? 'Thank You!' : 'Book consultation'}
            </button>
          </form>
        </div>
      </div>

      {/* Info section */}
      <div style={{ textAlign: 'center', padding: '48px 28px 0', maxWidth: 520, margin: '0 auto' }}>
        <p style={{ fontFamily: fontSans, fontSize: 14, color: '#888780', lineHeight: 1.7 }}>
          Dermancy Medical House is located in Rhodes, Greece. We welcome international patients. All consultations are conducted personally by Dr. Ioannis Michalakis.
        </p>
      </div>
    </PageLayout>
  );
}
