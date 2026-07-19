// BookSpreads.jsx — shared "pages from the portfolio book" section.
//
// Renders images/<project-id>/book-NN.jpg (via the manifest) with a
// click-to-zoom lightbox. Used by ArchiveProjectPage (undergrad 2018 book,
// wide 2.4:1 spreads → stacked full-width) and ProjectPage (M.Arch 2022
// book, portrait letter pages → 2-up grid via `cols`). Self-contained:
// owns its zoom state, Escape-to-close, and body scroll lock.
//
// Props:
//   projectId  — manifest key
//   title      — project title (alt text)
//   label      — section eyebrow, e.g. 'From the portfolio book · 2018'
//   cols       — desktop grid columns (default 1 = stacked full-width)
//   isMobile   — collapses grids to one column
//   style      — outer wrapper style (page passes its fade-in)
const BookSpreads = ({ projectId, title, label = 'From the portfolio book', cols = 1, isMobile = false, style = {} }) => {
  const [zoom, setZoom] = React.useState(null); // { src, caption }
  const pages = ((window.IMAGE_MANIFEST || {})[projectId] || {}).book || [];

  React.useEffect(() => { setZoom(null); }, [projectId]);

  // Lightbox: Escape closes, body scroll locks while open.
  React.useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [zoom]);

  if (!pages.length) return null;
  const gridCols = isMobile ? 1 : cols;

  return (
    <div style={{ marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>{label}</p>
        <p style={{ fontSize: '11px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em', color: 'rgba(20,33,28,0.35)', margin: 0 }}>Click a page to enlarge</p>
      </div>
      <div style={gridCols > 1
        ? { display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '1rem', alignItems: 'start' }
        : { display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
        {pages.map((b, i) => (
          <figure key={b.src} style={{ margin: 0 }}>
            <img
              src={b.src} alt={b.caption || `${title} — portfolio page ${i + 1}`} loading="lazy"
              onClick={() => setZoom(b)}
              style={{ width: '100%', display: 'block', borderRadius: '10px', border: '0.5px solid rgba(20,33,28,0.12)', cursor: 'zoom-in', background: '#fff' }}
            />
            {b.caption && (
              <figcaption style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(20,33,28,0.5)', marginTop: '0.6rem', letterSpacing: '0.01em' }}>{b.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox — dark overlay; the page renders at ~85vh tall so text is
          legible, with scroll to pan. Click backdrop or Escape to close. */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(12,16,14,0.94)',
            display: 'flex', flexDirection: 'column',
            padding: isMobile ? '3.5rem 0 1rem' : '3.5rem 1.5rem 1.5rem',
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setZoom(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '1rem', right: '1.25rem',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(242,239,230,0.8)', fontSize: '13px',
              fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}
          >
            Close ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', cursor: 'default', WebkitOverflowScrolling: 'touch' }}
          >
            <img
              src={zoom.src} alt={zoom.caption || 'Portfolio page'}
              style={isMobile
                ? { width: 'auto', height: '72vh', maxWidth: 'none', margin: 'auto', display: 'block' }
                : { height: '82vh', width: 'auto', maxWidth: 'none', margin: 'auto', display: 'block', borderRadius: '4px' }}
            />
          </div>
          {zoom.caption && (
            <p onClick={(e) => e.stopPropagation()} style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(242,239,230,0.6)', margin: '0.85rem auto 0', maxWidth: '80ch', textAlign: 'center', cursor: 'default', padding: '0 1rem' }}>
              {zoom.caption} · Scroll to pan
            </p>
          )}
        </div>
      )}
    </div>
  );
};

window.BookSpreads = BookSpreads;
