import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RuixenCarouselWave, { type CarouselCard } from '../components/ui/ruixen-carousel-wave';
import PageLayout, { PageSection, PageTitle, PageTagline, PageBody, SectionHeading, charcoal, ivory, gold, fontDisplay, fontSans } from './PageLayout';
import { treatments, getTreatmentBySlug } from '../data/treatments';

export default function TreatmentPage() {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? getTreatmentBySlug(slug) : undefined;

  if (!treatment) {
    return <Navigate to="/" replace />;
  }

  const otherTreatments = treatments.filter(t => t.slug !== treatment.slug);
  const crossLinkCards: CarouselCard[] = otherTreatments.map(t => ({
    title: t.name,
    subtitle: t.sub,
    image: t.img,
    badge: { text: 'Treatment', variant: 'gold' as const },
    href: `/care/${t.slug}`,
  }));

  return (
    <PageLayout title={treatment.metaTitle}>
      {/* Hero */}
      <div style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)',
        textAlign: 'center',
        maxWidth: 860,
        margin: '0 auto',
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 20 }}
        >
          Treatment
        </motion.p>
        <PageTitle>{treatment.name}</PageTitle>
        <PageTagline>{treatment.tagline}</PageTagline>
      </div>

      {/* Body */}
      <PageSection>
        <PageBody>
          {treatment.body.map((paragraph, i) => (
            <p key={i} style={{ textAlign: 'justify', marginBottom: i < treatment.body.length - 1 ? 24 : 0 }}>
              {paragraph}
            </p>
          ))}
        </PageBody>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: fontDisplay, fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: gold,
            marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.06)', lineHeight: 1.7,
          }}
        >
          {treatment.closingLine}
        </motion.p>
      </PageSection>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 clamp(28px, 4vw, 48px) 60px' }}>
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
      </div>

      {/* Cross-links carousel */}
      <section style={{ padding: '80px 0 60px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, padding: '0 28px' }}>
          <p style={{ fontFamily: fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 12 }}>Explore</p>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: charcoal }}>Other Treatments</h2>
        </div>
        <RuixenCarouselWave cards={crossLinkCards} />
      </section>
    </PageLayout>
  );
}
