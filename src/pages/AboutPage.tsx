import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout, { PageSection, PageTitle, PageTagline, PageBody, SectionHeading, charcoal, ivory, gold, fontDisplay, fontSans } from './PageLayout';

export default function AboutPage() {
  return (
    <PageLayout title="About | Dermancy Medical House">
      {/* Hero — with studio background */}
      <div style={{
        position: 'relative',
        padding: 'clamp(100px, 14vw, 180px) clamp(28px, 4vw, 48px) clamp(60px, 8vw, 100px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/consultation-room.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(245,243,238,0.4) 0%, rgba(245,243,238,0.75) 50%, rgba(245,243,238,0.95) 80%, rgba(245,243,238,1) 100%)',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 20 }}
          >
            About Us
          </motion.p>
          <PageTitle>Dermancy Medical House</PageTitle>
          <PageTagline>Where science meets the art of subtlety.</PageTagline>
        </div>
      </div>

      {/* The Clinic */}
      <PageSection>
        <SectionHeading eyebrow="The Clinic">The Clinic</SectionHeading>
        <PageBody>
          <p style={{ textAlign: 'justify', marginBottom: 24 }}>
            Dermancy Medical House was established in Rhodes with a single conviction: that aesthetic medicine, practised with rigour and restraint, can offer something most clinics do not — trust.
          </p>
          <p style={{ textAlign: 'justify', marginBottom: 24 }}>
            Every element of the clinic has been designed with intention. The environment is discreet, unhurried, and built for privacy. There are no queues, no rush between appointments, no compromise on time. Each patient receives the full attention of Dr. Michalakis — from the first consultation through every stage of treatment and follow-up.
          </p>
          <p style={{ textAlign: 'justify' }}>
            This is not a volume practice. It is a medical house — small by design, precise by principle.
          </p>
        </PageBody>
      </PageSection>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(28px, 4vw, 48px)' }}>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />
      </div>

      {/* The Doctor — with photo */}
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(32px, 5vw, 48px)', alignItems: 'start' }}>
          <style>{`@media (min-width: 640px) { .about-doctor-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          <div className="about-doctor-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(32px, 5vw, 48px)', alignItems: 'start' }}>
            <div>
              <SectionHeading eyebrow="The Doctor">Dr. Ioannis Michalakis</SectionHeading>
              <p style={{ fontFamily: fontSans, fontSize: 13, letterSpacing: '0.04em', color: '#888780', marginBottom: 28 }}>
                Cosmetic Dermatology. MSc in Dermatology &amp; Allergology, Medical University of Athens.
              </p>
              <PageBody>
                <p style={{ textAlign: 'justify', marginBottom: 24 }}>
                  Aesthetic medicine is not about following trends — it is about reading the face. Dr. Michalakis has built his practice around this principle. Every consultation begins with structure, proportion, and the patient's own identity. The goal is never to change. It is to restore what time has softened and reveal what was always there.
                </p>
                <p style={{ textAlign: 'justify', marginBottom: 24 }}>
                  His approach combines anatomical precision with a deep understanding of facial harmony — knowing not only where to treat, but how much is enough and, critically, when to stop.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Dr. Michalakis performs every procedure personally. There is no delegation, no rotation of practitioners. The hands that assess are the hands that treat.
                </p>
              </PageBody>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="/images/dr-at-desk.jpg"
                alt="Dr. Ioannis Michalakis"
                style={{ width: '100%', maxWidth: 380, aspectRatio: '3 / 4', objectFit: 'cover', objectPosition: 'top center', borderRadius: 8 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </PageSection>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(28px, 4vw, 48px)' }}>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />
      </div>

      {/* Philosophy */}
      <PageSection>
        <SectionHeading eyebrow="Our Philosophy">We listen before we treat</SectionHeading>
        <PageBody>
          <p style={{ textAlign: 'justify' }}>
            Every patient arrives with a different face, a different concern, a different expectation. Our work begins long before any procedure — in the conversation, the assessment, the trust that forms when someone feels genuinely understood. We have the expertise to deliver remarkable results. We have the integrity to recommend only what is right.
          </p>
        </PageBody>
      </PageSection>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(28px, 4vw, 48px)' }}>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />
      </div>

      {/* CTA */}
      <PageSection style={{ textAlign: 'center' }}>
        <PageBody>
          <p style={{ textAlign: 'center', marginBottom: 36 }}>
            The first step is always a conversation. Book a consultation with Dr. Michalakis and experience the standard of care that defines Dermancy Medical House.
          </p>
        </PageBody>
        <Link
          to="/booking"
          style={{
            display: 'inline-block', padding: '14px 40px', background: charcoal, color: ivory,
            borderRadius: 8, fontFamily: fontSans, fontSize: 13, fontWeight: 500,
            letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Book a Consultation
        </Link>
      </PageSection>
    </PageLayout>
  );
}
