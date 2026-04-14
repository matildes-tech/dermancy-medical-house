import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VersionSwitcher, type VersionId } from './versions/shared/VersionSwitcher';

/* Lazy-load each version for code splitting */
const V1 = lazy(() => import('./versions/v1/index'));
const V2 = lazy(() => import('./versions/v2/index'));
const V3 = lazy(() => import('./versions/v3/index'));

/* Lazy-load subpages */
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TreatmentPage = lazy(() => import('./pages/TreatmentPage'));
const TreatmentsListPage = lazy(() => import('./pages/TreatmentsListPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

/* Read initial version from URL ?version=v1|v2 */
function getInitialVersion(): VersionId {
  const params = new URLSearchParams(window.location.search);
  const v = params.get('version');
  if (v === 'v1' || v === 'v2' || v === 'v3') return v;
  return 'v1';
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/treatments" element={<TreatmentsListPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/care/:slug" element={<TreatmentPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function HomePage() {
  const [version, setVersion] = useState<VersionId>(getInitialVersion);

  /* Sync version to URL query param */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('version', version);
    window.history.replaceState({}, '', url.toString());
    /* Scroll to top on version switch */
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [version]);

  return (
    <>
      <VersionSwitcher current={version} onChange={setVersion} />
      {version === 'v1' && <V1 />}
      {version === 'v2' && <V2 />}
      {version === 'v3' && <V3 />}
    </>
  );
}

function Loading() {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: '#B8A999', background: '#F7F5F2',
    }}>
      Loading…
    </div>
  );
}
