// Reel.jsx — pinned horizontal selected-work reel (v4 design language, P4).
//
// Replaces ScrollWork in the home flow. Cards: the featured four from
// PROJECTS + two door cards (Mini studies → Work page, Foundations → archive).
// Card imagery comes from the image manifest (tile.jpg); projects without a
// tile get the ghost-letter treatment and upgrade automatically when a tile
// lands. Scroll-per-card is held constant regardless of card count (0.62
// advance factor — the "too much scrolling" fix). Mobile: stacked cards.
const REEL_DOORS = [
  {
    id: '__work', title: 'Mini studies', em: true, year: '2024—', cat: 'UX',
    sub: 'Zoning chat · comps · site search', meta: 'Component Stories · Algoma',
    img: 'images/feasibility/01.png', ghost: 'M', nav: ['work'],
  },
  {
    id: '__foundations', title: 'Foundations', em: true, year: 'Index', cat: 'Foundations',
    sub: '12 entries · 2017 – 2023', meta: 'Models · Drawings · Craft',
    img: 'images/unit-multiplication/tile.jpg', ghost: 'F', nav: ['archive'],
  },
];

const ReelCard = ({ item, onNavigate, isMobile }) => {
  const [hov, setHov] = React.useState(false);
  const img = item.img || (((window.IMAGE_MANIFEST || {})[item.id] || {}).tile);
  return (
    <article
      onClick={() => onNavigate(...(item.nav || ['project', item.id]))}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', flex: '0 0 auto',
        width: isMobile ? '100%' : 'min(52vh, 480px)',
        minWidth: isMobile ? 0 : '340px',
        aspectRatio: '3 / 4',
        background: img ? '#0B1513' : 'linear-gradient(160deg, #16261F 0%, #0B1513 70%)',
        border: '1px solid rgba(242,239,230,0.08)',
        borderRadius: '6px', overflow: 'hidden',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
        padding: '26px', cursor: 'pointer',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {img ? (
        <>
          <img src={img} alt="" loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(0.92)',
            transform: hov ? 'scale(1.045)' : 'scale(1.001)',
            transition: 'transform 700ms cubic-bezier(0.2,0.7,0.2,1)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(11,21,19,0.92) 0%, rgba(11,21,19,0.45) 34%, rgba(11,21,19,0.12) 60%, rgba(11,21,19,0.25) 100%)',
          }} />
        </>
      ) : (
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-4%', bottom: '-14%',
          fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'min(44vh, 380px)', lineHeight: 1,
          color: 'rgba(242,239,230,0.05)', pointerEvents: 'none', userSelect: 'none',
        }}>{item.ghost || item.title[0]}</div>
      )}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>
        <span>{item.n} · {item.year}</span><span>{item.cat}</span>
      </div>
      <div style={{ position: 'relative', alignSelf: 'end' }}>
        <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400, color: '#F2EFE6', margin: 0 }}>
          {item.em ? <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.8)' }}>{item.title}</em> : item.title}
        </h3>
        <p style={{ margin: '10px 0 0', fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>{item.sub}</p>
      </div>
      <div style={{ position: 'relative', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(242,239,230,0.14)', paddingTop: '13px', fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>
        <span>{item.meta}</span>
        <span style={{
          width: '30px', height: '30px', borderRadius: '999px', border: '1px solid rgba(242,239,230,0.25)',
          display: 'grid', placeItems: 'center', color: 'rgba(242,239,230,0.85)',
          transform: hov ? 'translate(2px, -2px)' : 'none', transition: 'transform 200ms',
        }}>↗</span>
      </div>
    </article>
  );
};

const Reel = ({ onNavigate }) => {
  const isMobile = (window.useIsMobile || (() => false))(820);
  const hostRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [idx, setIdx] = React.useState(1);

  const items = React.useMemo(() => {
    const featured = (window.PROJECTS || []).map(p => ({
      id: p.id, title: p.title, year: String(p.year),
      cat: (p.role || '').split(' — ')[0] || 'Project',
      sub: (p.role || '').split(' — ')[1] || '',
      meta: p.org, nav: ['project', p.id],
    }));
    return [...featured, ...REEL_DOORS].map((it, i) => ({ ...it, n: String(i + 1).padStart(2, '0') }));
  }, []);

  React.useEffect(() => {
    if (isMobile) return;
    const host = hostRef.current, track = trackRef.current;
    if (!host || !track) return;
    const size = () => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      host.style.height = (window.innerHeight + distance * 0.62) + 'px';
    };
    const update = () => {
      const rect = host.getBoundingClientRect();
      const total = host.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -rect.top / (total || 1)));
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      track.style.transform = `translate(${-prog * distance}px, -50%)`;
      setIdx(Math.max(1, Math.min(items.length, Math.floor(prog * items.length) + 1)));
    };
    size(); update();
    window.addEventListener('scroll', update, { passive: true });
    const onResize = () => { size(); update(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [isMobile, items.length]);

  const head = (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem',
      ...(isMobile ? { marginBottom: '2.5rem' } : { position: 'absolute', top: '110px', left: '2.5rem', right: '2.5rem', zIndex: 3 }),
    }}>
      <div>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.5)', margin: 0 }}>
          <span style={{ color: '#D45A1B' }}>●</span>&nbsp;&nbsp;Selected Work · 01 — {String(items.length).padStart(2, '0')}
        </p>
        <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: isMobile ? 'clamp(34px, 9vw, 44px)' : 'clamp(40px, 5vw, 84px)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 400, color: '#F2EFE6', margin: '12px 0 0' }}>
          <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.72)' }}>Selected</em> work,<br />both mediums.
        </h2>
      </div>
      {!isMobile && (
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.5)', textAlign: 'right' }}>
          <div><b style={{ color: '#D45A1B', fontWeight: 400 }}>{String(idx).padStart(2, '0')}</b> / {String(items.length).padStart(2, '0')}</div>
          <div style={{ marginTop: '10px', opacity: 0.6 }}>Scroll to advance</div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <section style={{ background: '#14211C', padding: '5rem 1.25rem' }}>
        {head}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {items.map(it => <ReelCard key={it.id} item={it} onNavigate={onNavigate} isMobile />)}
        </div>
      </section>
    );
  }

  return (
    <div ref={hostRef} style={{ position: 'relative', background: '#14211C' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {head}
        <div ref={trackRef} style={{
          position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
          display: 'flex', gap: '32px', padding: '0 min(12vw, 160px)',
          willChange: 'transform',
        }}>
          {items.map(it => <ReelCard key={it.id} item={it} onNavigate={onNavigate} isMobile={false} />)}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Reel, ReelCard });
