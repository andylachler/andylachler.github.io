// BookSpreads.jsx — shared "pages from the portfolio book" section.
//
// Grid of pages from images/<project-id>/book-NN.jpg (via the manifest).
// Clicking a page pops a BOOK MODAL: the page fits the viewport and you flip
// through the set like a book — arrow buttons, ←/→ keys, swipe on touch.
// Each flip runs a subtle perspective page-turn. A zoom toggle (or clicking
// the page) switches to a large pan-scroll view for reading small text.
// Escape or backdrop click closes.
//
// Props:
//   projectId  — manifest key
//   title      — project title (alt text)
//   label      — section eyebrow, e.g. 'From the portfolio book · 2018'
//   cols       — desktop grid columns (default 1 = stacked full-width)
//   isMobile   — collapses grids to one column
//   style      — outer wrapper style (page passes its fade-in)
const BookSpreads = ({ projectId, title, label = 'From the portfolio book', cols = 1, isMobile = false, style = {} }) => {
  const pages = ((window.IMAGE_MANIFEST || {})[projectId] || {}).book || [];
  const [openIdx, setOpenIdx] = React.useState(null); // null = closed
  const [zoomed, setZoomed] = React.useState(false);
  const [dir, setDir] = React.useState(0); // 1 = forward flip, -1 = back
  const touchX = React.useRef(null);
  const open = openIdx !== null;
  const page = open ? pages[openIdx] : null;

  React.useEffect(() => { setOpenIdx(null); setZoomed(false); }, [projectId]);

  const flip = React.useCallback((d) => {
    setOpenIdx(i => {
      if (i === null) return i;
      const next = i + d;
      if (next < 0 || next >= pages.length) return i;
      setDir(d);
      setZoomed(false);
      return next;
    });
  }, [pages.length]);

  // Keyboard + scroll lock while the book is open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') flip(1);
      else if (e.key === 'ArrowLeft') flip(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, flip]);

  if (!pages.length) return null;
  const gridCols = isMobile ? 1 : cols;

  const arrowStyle = (disabled) => ({
    width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px',
    borderRadius: '999px', flexShrink: 0,
    border: '1px solid rgba(242,239,230,0.3)',
    background: 'rgba(16,26,22,0.6)',
    color: '#F2EFE6', fontSize: '18px',
    display: 'grid', placeItems: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.22 : 0.9,
    transition: 'opacity 180ms, background 180ms',
    pointerEvents: 'auto',
  });

  return (
    <div style={{ marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', ...style }}>
      <style>{`
        @keyframes bookFlipFwd { from { transform: perspective(2200px) rotateY(-62deg); opacity: 0.25; } to { transform: perspective(2200px) rotateY(0deg); opacity: 1; } }
        @keyframes bookFlipBack { from { transform: perspective(2200px) rotateY(62deg); opacity: 0.25; } to { transform: perspective(2200px) rotateY(0deg); opacity: 1; } }
        .book-page-fwd { animation: bookFlipFwd 340ms cubic-bezier(0.22,1,0.36,1) both; transform-origin: left center; }
        .book-page-back { animation: bookFlipBack 340ms cubic-bezier(0.22,1,0.36,1) both; transform-origin: right center; }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>{label}</p>
        <p style={{ fontSize: '11px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em', color: 'rgba(20,33,28,0.35)', margin: 0 }}>Click a page to flip through the book</p>
      </div>
      <div style={gridCols > 1
        ? { display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '1rem', alignItems: 'start' }
        : { display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
        {pages.map((b, i) => (
          <figure key={b.src} style={{ margin: 0 }}>
            <img
              src={b.src} alt={b.caption || `${title} — portfolio page ${i + 1}`} loading="lazy"
              onClick={() => { setDir(0); setZoomed(false); setOpenIdx(i); }}
              style={{ width: '100%', display: 'block', borderRadius: '10px', border: '0.5px solid rgba(20,33,28,0.12)', cursor: 'zoom-in', background: '#fff' }}
            />
            {b.caption && (
              <figcaption style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(20,33,28,0.5)', marginTop: '0.6rem', letterSpacing: '0.01em' }}>{b.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Book modal */}
      {open && (
        <div
          onClick={() => setOpenIdx(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 44) flip(dx < 0 ? 1 : -1);
          }}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(12,16,14,0.95)',
            display: 'flex', flexDirection: 'column',
            padding: isMobile ? '3.25rem 0 0.75rem' : '3.25rem 1rem 1rem',
          }}
        >
          {/* Top bar: counter left, close right */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.25rem' }}>
            <p style={{ margin: 0, fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>
              <span style={{ color: '#D45A1B' }}>{String(openIdx + 1).padStart(2, '0')}</span> / {String(pages.length).padStart(2, '0')}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenIdx(null); }}
              aria-label="Close"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,239,230,0.8)', fontSize: '13px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Close ✕
            </button>
          </div>

          {/* Page + arrows */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
            {!isMobile && (
              <button aria-label="Previous page" onClick={(e) => { e.stopPropagation(); flip(-1); }} style={arrowStyle(openIdx === 0)}>←</button>
            )}
            <div
              onClick={(e) => e.stopPropagation()}
              style={zoomed
                ? { flex: 1, alignSelf: 'stretch', overflow: 'auto', cursor: 'zoom-out', WebkitOverflowScrolling: 'touch' }
                : { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
            >
              <img
                key={openIdx}
                src={page.src} alt={page.caption || `${title} — portfolio page ${openIdx + 1}`}
                className={dir === 1 ? 'book-page-fwd' : dir === -1 ? 'book-page-back' : undefined}
                onClick={() => setZoomed(z => !z)}
                style={zoomed
                  ? { width: '1600px', maxWidth: 'none', height: 'auto', margin: 'auto', display: 'block', cursor: 'zoom-out' }
                  : { maxWidth: '100%', maxHeight: isMobile ? '68vh' : '76vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '4px', cursor: 'zoom-in', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
              />
            </div>
            {!isMobile && (
              <button aria-label="Next page" onClick={(e) => { e.stopPropagation(); flip(1); }} style={arrowStyle(openIdx === pages.length - 1)}>→</button>
            )}
          </div>

          {/* Footer: mobile arrows + caption + hint */}
          <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', paddingTop: '0.75rem' }}>
            {isMobile && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '0.6rem' }}>
                <button aria-label="Previous page" onClick={() => flip(-1)} style={arrowStyle(openIdx === 0)}>←</button>
                <button aria-label="Next page" onClick={() => flip(1)} style={arrowStyle(openIdx === pages.length - 1)}>→</button>
              </div>
            )}
            {page.caption && (
              <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(242,239,230,0.65)', margin: '0 auto', maxWidth: '80ch', textAlign: 'center', padding: '0 1rem' }}>{page.caption}</p>
            )}
            <p style={{ fontSize: '10px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.35)', margin: '0.5rem auto 0', textAlign: 'center' }}>
              {isMobile ? 'Swipe to flip · tap page to zoom' : '← → to flip · click page to zoom'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

window.BookSpreads = BookSpreads;
