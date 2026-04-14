import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface CarouselCard {
  title: string;
  subtitle: string;
  image?: string;
  badge?: {
    text: string;
    variant: 'gold' | 'sage' | 'warm' | 'muted';
  };
  href: string;
}

interface RuixenCarouselWaveProps {
  cards: CarouselCard[];
}

const badgeColors = {
  gold: 'bg-[#B8A882] text-white',
  sage: 'bg-[#6B8F71] text-white',
  warm: 'bg-[#A09080] text-white',
  muted: 'bg-[#888780] text-white',
};

export default function RuixenCarouselWave({ cards }: RuixenCarouselWaveProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const shift = (direction: 'next' | 'prev') => {
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      let position = i - currentIndex;
      if (position < -Math.floor(cards.length / 2)) {
        position += cards.length;
      } else if (position > Math.floor(cards.length / 2)) {
        position -= cards.length;
      }

      const isMobile = window.innerWidth < 640;
      const spacing = isMobile ? 240 : 300;
      const x = position * spacing;
      const y = position === 0 ? 16 : 0;
      const scale = position === 0 ? 1.03 : 0.93;
      const opacity = Math.abs(position) > 2 ? 0 : 1;

      if (Math.abs(position) > 3) {
        gsap.set(card, { x, y, scale, opacity: 0 });
      } else {
        gsap.to(card, {
          x,
          y,
          scale,
          opacity,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    });
  }, [currentIndex, cards.length]);

  return (
    <div className="w-full relative py-8 overflow-hidden">
      <div className="relative flex items-center justify-center" style={{ height: 420 }}>
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="absolute"
            style={{ willChange: 'transform' }}
          >
            <div className="flex flex-col group">
              <Link
                to={card.href}
                className="relative block overflow-hidden rounded-2xl shadow-lg border border-[rgba(0,0,0,0.06)]"
                style={{
                  background: 'linear-gradient(135deg, #FAFAF7 0%, #F0EDE6 100%)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* Image */}
                <div className="relative" style={{ height: 280, width: 240 }}>
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #EBE8E0 0%, #DDD8CE 100%)' }}
                    >
                      <span style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 28,
                        fontWeight: 400,
                        color: '#B8A882',
                        opacity: 0.5,
                      }}>
                        {card.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-3 left-3">
                    <div
                      className={cn(
                        'px-2.5 py-0.5 text-[10px] font-medium rounded-full tracking-wide uppercase',
                        badgeColors[card.badge.variant]
                      )}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {card.badge.text}
                    </div>
                  </div>
                )}

                {/* Text Overlay */}
                <div
                  className="absolute bottom-3 left-3 right-3 group-hover:translate-y-[-2px] transform transition-all duration-300 ease-out rounded-xl p-3.5 shadow-sm"
                  style={{
                    background: 'rgba(250, 250, 247, 0.88)',
                    backdropFilter: 'blur(10px)',
                    border: '0.5px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#2C2C2A',
                    margin: '0 0 3px',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: '#888780',
                    margin: 0,
                  }}>
                    {card.subtitle}
                  </p>
                  <div className="flex justify-end mt-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(44,44,42,0.06)' }}>
                      <ArrowUpRight className="w-3 h-3" style={{ color: '#2C2C2A' }} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => shift('prev')}
          className="p-2.5 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            border: '0.5px solid rgba(0,0,0,0.1)',
            background: '#FAFAF7',
          }}
          aria-label="Previous treatment"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: '#2C2C2A' }} />
        </button>
        <button
          onClick={() => shift('next')}
          className="p-2.5 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            border: '0.5px solid rgba(0,0,0,0.1)',
            background: '#FAFAF7',
          }}
          aria-label="Next treatment"
        >
          <ChevronRight className="w-4 h-4" style={{ color: '#2C2C2A' }} />
        </button>
      </div>
    </div>
  );
}
