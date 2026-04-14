import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RuixenCarouselWave, { type CarouselCard } from '../components/ui/ruixen-carousel-wave';
import PageLayout, { PageSection, PageTitle, PageTagline, charcoal, ivory, gold, fontDisplay, fontSans } from './PageLayout';
import { treatments } from '../data/treatments';

const allCards: CarouselCard[] = treatments.map(t => ({
  title: t.name,
  subtitle: t.sub,
  image: t.img,
  badge: { text: 'Treatment', variant: 'gold' as const },
  href: `/care/${t.slug}`,
}));

export default function TreatmentsListPage() {
  return (
    <PageLayout title="Treatments | Dermancy Medical House">
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
          Our Treatments
        </motion.p>
        <PageTitle>Refined Aesthetic Solutions</PageTitle>
        <PageTagline>Every face has its own structure, its own balance, its own story.</PageTagline>
      </div>

      {/* Carousel */}
      <div style={{ marginBottom: 60 }}>
        <RuixenCarouselWave cards={allCards} />
      </div>

      {/* Treatment list */}
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          {treatments.map((t, i) => (
            <Link
              key={t.slug}
              to={`/care/${t.slug}`}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 0',
                borderTop: i === 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                textDecoration: 'none', color: charcoal,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.015)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 400, margin: '0 0 4px', color: charcoal }}>
                  {t.name}
                </h3>
                <p style={{ fontFamily: fontSans, fontSize: 13, color: '#888780', margin: 0 }}>
                  {t.sub}
                </p>
              </div>
              <ArrowRight size={18} style={{ color: '#B8A882', flexShrink: 0, marginLeft: 16 }} />
            </Link>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 28px 80px' }}>
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
    </PageLayout>
  );
}
