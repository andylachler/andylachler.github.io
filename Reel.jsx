// Reel.jsx — pinned horizontal selected-work reel (v4 design language, P4).
//
// Replaces ScrollWork in the home flow. Cards: the featured four from
// PROJECTS + one terminal "More projects" arrow card (→ Work page). The
// door cards with project imagery are gone — a card that represents many
// projects shouldn't wear the image of one. Card imagery comes from the
// image manifest (tile.jpg); projects without a tile get the ghost-letter
// treatment and upgrade automatically when a tile lands. Desktop cards are
// wide-format (4:3) so the horizontal scroll reads as a filmstrip; mobile
// keeps the vertical 3:4 card. Scroll-per-card is held constant regardless
// of card count (0.62 advance factor). Mobile: stacked cards.
// `grid` prop: fluid width for use in page grids (WorkPage) — same card
// grammar everywhere, per the continuity pass.
const REEL_MORE = {
  id: '__more', more: true, nav: ['work'],
  title: 'More projects',
  sub: 'Mini studies · Foundations · Playable',
  note: 'Everything else — component stories from Algoma, graduate and undergraduate work from Pratt and Lehigh, and playable experiments.',
};

// Terminal reel card — no image, just an arrow and a note. Represents the
// index, not any single project.
const ReelMoreCard = ({ item, onNavigate, isMobile, grid }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <article
      onClick={() => onNavigate(...item.nav)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', flex: '0 0 auto',
        width: grid ? '100%' : (isMobile ? '100%' : 'min(86vh, 660px)'),
        minWidth: grid ? 0 : (isMobile ? 0 : '440px'),
        aspectRatio: isMobile && !grid ? '3 / 4' : '4 / 3',
        background: 'linear-gradient(160deg, #16261F 0%, #0B1513 70%)',
        border: '1px dashed rgba(242,239,230,0.22)',
        borderRadius: '6px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '18px', padding: '26px', cursor: 'pointer', textAlign: 'center',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1), border-color 250ms',
      }}
    >
      <span style={{
        width: '64px', height: '64px', borderRadius: '999px',
        border: '1px solid rgba(242,239,230,0.3)',
        display: 'grid', placeItems: 'center',
        fontSize: '24px', color: '#F2EFE6',
        transform: hov ? 'translateX(6px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
      }}>→</span>
      <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(26px, 2.8vw, 36px)', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400, color: '#F2EFE6', margin: 0 }}>
        <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.8)' }}>{item.title}</em>
      </h3>
      <p style={{ margin: 0, fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.6)' }}>{item.sub}</p>
      <p style={{ margin: 0, maxWidth: '40ch', fontSize: '13px', lineHeight: 1.6, color: 'rgba(242,239,230,0.55)' }}>{item.note}</p>
      <p style={{ margin: 0, fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D45A1B', opacity: hov ? 1 : 0.85 }}>Click to see more projects</p>
    </article>
  );
};

const ReelCard = ({ item, onNavigate, isMobile, grid }) => {
  const [hov, setHov] = React.useState(false);
  const img = item.img || (((window.IMAGE_MANIFEST || {})[item.id] || {}).tile);
  if (item.more) return <ReelMoreCard item={item} onNavigate={onNavigate} isMobile={isMobile} grid={grid} />;
  return (
    <article
      onClick={() => onNavigate(...(item.nav || ['project', item.id]))}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', flex: '0 0 auto',
        width: grid ? '100%' : (isMobile ? '100%' : 'min(86vh, 660px)'),
        minWidth: grid ? 0 : (isMobile ? 0 : '440px'),
        aspectRatio: isMobile && !grid ? '3 / 4' : '4 / 3',
        background: img ? '#0B1513' : 'linear-gradient(160deg, #16261F 0%, #0B1513 70%)',
        border: '1px solid rgba(242,239,230,0.08)',
        borderRadius: '6px', overflow: 'hidden',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
        padding: 0, cursor: 'pointer',
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
        </>
      ) : (
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-4%', bottom: '-14%',
          fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'min(44vh, 380px)', lineHeight: 1,
          color: 'rgba(242,239,230,0.05)', pointerEvents: 'none', userSelect: 'none',
        }}>{item.ghost || item.title[0]}</div>
      )}
      <div />
      <div />
      {/* Bottom info strip — compact, fades up into the image */}
      <div style={{ position: 'relative', background: 'linear-gradient(to top, rgba(11,21,19,0.82) 0%, rgba(11,21,19,0.58) 55%, rgba(11,21,19,0) 100%)', padding: grid ? '30px 20px 12px' : '42px 26px 16px' }}>
        <h3 style={{ fontFamily: 'var(--ff-serif)', fontSize: grid ? 'clamp(19px, 1.5vw, 24px)' : 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 400, color: '#F2EFE6', margin: 0 }}>
          {item.em ? <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.8)' }}>{item.title}</em> : item.title}
        </h3>
        <p style={{ margin: '6px 0 0', fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.65)' }}>{[item.sub, item.meta].filter(Boolean).join(' · ')}</p>
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
    const featured = (window.PROJECTS || []).map((p, i) => ({
      id: p.id, title: p.title, year: String(p.year),
      cat: (p.role || '').split(' — ')[0] || 'Project',
      sub: (p.role || '').split(' — ')[1] || '',
      meta: p.org, nav: ['project', p.id],
      n: String(i + 1).padStart(2, '0'),
    }));
    return [...featured, REEL_MORE];
  }, []);
  const projectCount = items.length - 1; // the More card isn't a numbered project

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
          <span style={{ color: '#D45A1B' }}>●</span>&nbsp;&nbsp;Selected Work · 01 — {String(projectCount).padStart(2, '0')}
        </p>
        <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: isMobile ? 'clamp(34px, 9vw, 44px)' : 'clamp(40px, 5vw, 84px)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 400, color: '#F2EFE6', margin: '12px 0 0' }}>
          <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.72)' }}>Selected</em> work,<br />both mediums.
        </h2>
      </div>
      {!isMobile && (
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.5)', textAlign: 'right' }}>
          <div><b style={{ color: '#D45A1B', fontWeight: 400 }}>{String(Math.min(idx, projectCount)).padStart(2, '0')}</b> / {String(projectCount).padStart(2, '0')}</div>
          <div style={{ marginTop: '10px', opacity: 0.6 }}>Scroll to advance</div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <section id="home-reel" style={{ background: '#14211C', padding: '5rem 1.25rem' }}>
        {head}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {items.map(it => <ReelCard key={it.id} item={it} onNavigate={onNavigate} isMobile />)}
        </div>
      </section>
    );
  }

  return (
    <div ref={hostRef} id="home-reel" style={{ position: 'relative', background: '#14211C' }}>
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
