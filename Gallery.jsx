// Gallery.jsx — shared project gallery section.
//
// Grid of gallery items from images/<project-id>/NN.jpg|mp4 (via the manifest).
// Two tiles side by side on desktop, stacked on mobile. Clicking a tile opens
// the same expanded viewer the portfolio book uses (BookSpreads.jsx): the item
// fits the viewport, you step through the set with arrow buttons, ←/→ keys, or
// a swipe, and a zoom toggle switches stills to a large pan-scroll view for
// reading small text. Escape or a backdrop click closes.
//
// Videos: the tile plays a muted, controls-free loop as a preview; the modal
// gives it real controls. Zoom is stills-only.
//
// Props:
//   projectId  — manifest key
//   title      — project title (alt text)
//   label      — section eyebrow (default 'Gallery'; archive pages pass
//                'Photographs')
//   cols       — desktop grid columns (default 2). A single-item gallery
//                always renders full width regardless.
//   items      — optional explicit item list, overriding the manifest lookup.
//                Used when a page splits one folder into two sections (e.g.
//                Midtown Walk's elevations above, photographs below).
//   isMobile   — collapses the grid to one column
//   style      — outer wrapper style (page passes its fade-in)
const Gallery = ({ projectId, title, label = 'Gallery', cols = 2, items: itemsProp, isMobile = false, style = {} }) => {
  const items = itemsProp || ((window.IMAGE_MANIFEST || {})[projectId] || {}).gallery || [];
  const [openIdx, setOpenIdx] = React.useState(null); // null = closed
  const [zoomed, setZoomed] = React.useState(false);
  const [dir, setDir] = React.useState(0); // 1 = forward, -1 = back
  const touchX = React.useRef(null);
  const open = openIdx !== null;
  const item = open ? items[openIdx] : null;

  React.useEffect(() => { setOpenIdx(null); setZoomed(false); }, [projectId]);

  const step = React.useCallback((d) => {
    setOpenIdx(i => {
      if (i === null) return i;
      const next = i + d;
      if (next < 0 || next >= items.length) return i;
      setDir(d);
      setZoomed(false);
      return next;
    });
  }, [items.length]);

  // Keyboard + scroll lock while the viewer is open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, step]);

  if (!items.length) return null;
  // One item has nothing to sit beside — let it run full width (fluxing).
  const gridCols = (isMobile || items.length < 2) ? 1 : cols;

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
        @keyframes galStepFwd { from { transform: perspective(2200px) rotateY(-62deg); opacity: 0.25; } to { transform: perspective(2200px) rotateY(0deg); opacity: 1; } }
        @keyframes galStepBack { from { transform: perspective(2200px) rotateY(62deg); opacity: 0.25; } to { transform: perspective(2200px) rotateY(0deg); opacity: 1; } }
        .gal-item-fwd { animation: galStepFwd 340ms cubic-bezier(0.22,1,0.36,1) both; transform-origin: left center; }
        .gal-item-back { animation: galStepBack 340ms cubic-bezier(0.22,1,0.36,1) both; transform-origin: right center; }
        .gal-tile { transition: transform 250ms cubic-bezier(0.22,1,0.36,1); }
        .gal-tile:hover { transform: translateY(-2px); }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>{label}</p>
        {items.length > 1 && (
          <p style={{ fontSize: '11px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em', color: 'rgba(20,33,28,0.35)', margin: 0 }}>Click to expand</p>
        )}
      </div>

      <div style={gridCols > 1
        ? { display: 'grid', gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, gap: '1rem', alignItems: 'start' }
        : { display: 'flex', flexDirection: 'column', gap: isMobile ? '1.75rem' : '2.5rem' }}>
        {items.map((g, i) => (
          <figure key={g.src} style={{ margin: 0 }}>
            <div
              className="gal-tile"
              onClick={() => { setDir(0); setZoomed(false); setOpenIdx(i); }}
              style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', cursor: 'zoom-in', background: g.video ? '#14211C' : 'transparent', lineHeight: 0 }}
            >
              {g.video ? (
                // Poster frame only — these files run to ~20MB, so the tile
                // loads metadata and the modal does the playing.
                <video
                  src={g.src}
                  muted loop playsInline preload="metadata"
                  style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
                />
              ) : (
                <img
                  src={g.src}
                  alt={g.caption || `${title} — image ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', display: 'block' }}
                />
              )}
              {g.video && (
                <span style={{
                  position: 'absolute', left: '10px', bottom: '10px',
                  fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(242,239,230,0.85)', background: 'rgba(12,16,14,0.55)',
                  padding: '4px 8px', borderRadius: '999px', lineHeight: 1.4,
                }}>▶ Play animation</span>
              )}
            </div>
            {g.caption && (
              <figcaption style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(20,33,28,0.5)', marginTop: '0.6rem', letterSpacing: '0.01em' }}>{g.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Expanded viewer — portaled to <body> for the same reason BookSpreads
          is: the page wrapper animates with a transform, and a transformed
          ancestor becomes the containing block for position:fixed. */}
      {open && ReactDOM.createPortal(
        <div
          onClick={() => setOpenIdx(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 44) step(dx < 0 ? 1 : -1);
          }}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(12,16,14,0.95)',
            display: 'flex', flexDirection: 'column',
            padding: isMobile ? '2.75rem 0 0.25rem' : '2.75rem 0.75rem 0.25rem',
          }}
        >
          {/* Top bar: counter left, close right */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.25rem' }}>
            <p style={{ margin: 0, fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>
              <span style={{ color: '#D45A1B' }}>{String(openIdx + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenIdx(null); }}
              aria-label="Close"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,239,230,0.8)', fontSize: '13px', fontFamily: 'var(--ff-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Close ✕
            </button>
          </div>

          {/* Item area — the media box is position:absolute/inset:0 inside this
              relative, flex-sized row. That matters: a percentage height only
              resolves against a parent with a DEFINITE height, and in the
              earlier flex-only version `height: 100%` fell back to auto, so a
              tall image (Ella's 1:1 renders) rendered at full width and got
              clipped top and bottom. Absolute positioning makes the box
              definite, and the media sizes itself with max-width/max-height so
              its natural aspect ratio always survives.
              Arrows float over it instead of reserving side columns. */}
          <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex' }}>
            <div
              onClick={(e) => e.stopPropagation()}
              style={(zoomed && !item.video)
                ? { position: 'absolute', inset: 0, overflow: 'auto', cursor: 'zoom-out', WebkitOverflowScrolling: 'touch' }
                : { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
            >
              {item.video ? (
                <video
                  key={openIdx}
                  src={item.src}
                  controls autoPlay muted loop playsInline preload="metadata"
                  className={dir === 1 ? 'gal-item-fwd' : dir === -1 ? 'gal-item-back' : undefined}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block', filter: 'drop-shadow(0 18px 48px rgba(0,0,0,0.45))' }}
                />
              ) : (
                <img
                  key={openIdx}
                  src={item.src} alt={item.caption || `${title} — image ${openIdx + 1}`}
                  className={dir === 1 ? 'gal-item-fwd' : dir === -1 ? 'gal-item-back' : undefined}
                  onClick={() => setZoomed(z => !z)}
                  style={zoomed
                    ? { width: '1600px', maxWidth: 'none', height: 'auto', margin: 'auto', display: 'block', cursor: 'zoom-out' }
                    : { maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block', cursor: 'zoom-in', filter: 'drop-shadow(0 18px 48px rgba(0,0,0,0.45))' }}
                />
              )}
            </div>
            {!isMobile && items.length > 1 && (
              <>
                <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}
                  style={{ ...arrowStyle(openIdx === 0), position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>←</button>
                <button aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}
                  style={{ ...arrowStyle(openIdx === items.length - 1), position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>→</button>
              </>
            )}
          </div>

          {/* Footer: one compact line (caption + controls hint); mobile keeps
              its arrow pair. Kept minimal so the item area gets the height. */}
          <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', paddingTop: '0.4rem' }}>
            {isMobile && items.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '0.4rem' }}>
                <button aria-label="Previous" onClick={() => step(-1)} style={arrowStyle(openIdx === 0)}>←</button>
                <button aria-label="Next" onClick={() => step(1)} style={arrowStyle(openIdx === items.length - 1)}>→</button>
              </div>
            )}
            <p style={{ fontSize: '11px', lineHeight: 1.5, color: 'rgba(242,239,230,0.55)', margin: '0 auto', maxWidth: '110ch', textAlign: 'center', padding: '0 1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.caption ? `${item.caption}  ·  ` : ''}
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.35)' }}>
                {items.length < 2
                  ? (item.video ? 'Esc to close' : (isMobile ? 'Tap to zoom' : 'Click to zoom'))
                  : (isMobile ? 'Swipe to step · tap to zoom' : '← → to step · click to zoom')}
              </span>
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

window.Gallery = Gallery;
