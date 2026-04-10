import React, { useRef, useState, useEffect, HTMLAttributes } from 'react';

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Props
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

/**
 * Horizontal scroll carousel — swipe on mobile, drag or scroll on desktop.
 * Cards snap into place. Shows peek of next card to invite scrolling.
 */
const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius: _r, autoRotateSpeed: _a, ...props }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Update arrow visibility on scroll
    const checkScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
      const el = trackRef.current;
      if (!el) return;
      const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 300;
      el.scrollBy({ left: dir === 'right' ? cardWidth + 16 : -(cardWidth + 16), behavior: 'smooth' });
    };

    return (
      <div ref={ref} className={className} style={{ position: 'relative' }} {...props}>

        {/* Scroll track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            paddingLeft: 'max(1.5rem, calc((100vw - 1200px) / 2 + 1.5rem))',
            paddingRight: '1.5rem',
            paddingTop: '8px',
            paddingBottom: '8px',
          }}
          className="hide-scrollbar"
        >
          {items.map((item) => (
            <div
              key={item.common}
              data-card
              style={{
                flex: '0 0 auto',
                width: 'clamp(260px, 70vw, 340px)',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(43,43,43,0.08)',
                }}
              >
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: item.photo.pos || 'center',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {/* Gradient + labels */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px 16px 16px',
                    background: 'linear-gradient(to top, rgba(43,43,43,0.7) 0%, transparent 100%)',
                    color: '#fff',
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, margin: 0 }}>
                    {item.common}
                  </h3>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: '4px 0 0', fontStyle: 'italic' }}>
                    {item.binomial}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop arrow buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(184,169,153,0.3)',
              background: 'rgba(247,245,242,0.9)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#2B2B2B',
              zIndex: 10,
            }}
            className="hidden md:flex"
          >
            ←
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(184,169,153,0.3)',
              background: 'rgba(247,245,242,0.9)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#2B2B2B',
              zIndex: 10,
            }}
            className="hidden md:flex"
          >
            →
          </button>
        )}
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
