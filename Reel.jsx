// Reel.jsx — horizontal selected-work reel (v4 design language).
//
// July 22 pass: the scroll-hijack (pinned sticky section that converted
// vertical scroll into horizontal travel) is RETIRED — the page scrolls
// independently and the reel advances via prev/next buttons (plus native
// horizontal drag/trackpad scroll, kept in sync). The left ScrollRail is
// gone from home too; the counter in the section header is the single
// progress indicator. Cards: the featured five from PROJECTS + one
// terminal "More projects" arrow card (→ Work page). Card imagery comes
// from the image manifest (tile.jpg); projects without a tile get the
// linework/ghost treatment and upgrade automatically when a tile lands.
// Mobile: stacked cards.
// `grid` prop: fluid width for use in page grids (WorkPage) — same card
// grammar everywhere, per the continuity pass.
const REEL_MORE = {
  id: '__more', more: true, nav: ['work'],
  title: 'More projects',
  sub: 'Architecture · Foundations · Playable',
  note: 'Everything else — built work from Arquitectonica, graduate and undergraduate work from Pratt and Lehigh, and playable experiments.',
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
        width: grid ? '100%' : (isMobile ? '100%' : 'min(72vh, 640px)'),
        minWidth: grid ? 0 : (isMobile ? 0 : '420px'),
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
  // Card image: explicit override → tile → hero. Never a book page (rule:
  // card/hero imagery always comes from images, not PDF pages).
  const mEntry = (window.IMAGE_MANIFEST || {})[item.id] || {};
  const img = item.img || mEntry.tile || mEntry.hero;
  if (item.more) return <ReelMoreCard item={item} onNavigate={onNavigate} isMobile={isMobile} grid={grid} />;
  return (
    <article
      onClick={() => onNavigate(...(item.nav || ['project', item.id]))}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', flex: '0 0 auto',
        width: grid ? '100%' : (isMobile ? '100%' : 'min(72vh, 640px)'),
        minWidth: grid ? 0 : (isMobile ? 0 : '420px'),
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
      ) : window.ProjectVisual ? (
        /* No tile in the manifest — fall back to the hand-traced linework
           silhouette (TilePlaceholder) on the project's own background color,
           same as the old ProjectTile grammar. Upgrades automatically when a
           tile.jpg lands in images/<id>/. */
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
          <ProjectVisual projectId={item.id} bg={item.bg || '#16261F'} index={item.imageIndex || 0} hovered={hov} silhouette={item.silhouette} />
        </div>
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
  const trackRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0); // 0-based active card

  const items = React.useMemo(() => {
    const featured = (window.PROJECTS || []).map((p, i) => ({
      id: p.id, title: p.title, year: String(p.year),
      cat: (p.role || '').split(' — ')[0] || 'Project',
      sub: (p.role || '').split(' — ')[1] || '',
      meta: p.org, nav: ['project', p.id],
      bg: p.bg, imageIndex: p.imageIndex, silhouette: p.silhouette,
      n: String(i + 1).padStart(2, '0'),
    }));
    return [...featured, REEL_MORE];
  }, []);
  const projectCount = items.length - 1; // the More card isn't a numbered project

  // Advance by card: scroll the track so card n sits at the left padding.
  const go = (n) => {
    const track = trackRef.current;
    if (!track) return;
    n = Math.max(0, Math.min(items.length - 1, n));
    const card = track.children[n];
    if (card) track.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || 0), behavior: 'smooth' });
  };
  // Native drag / trackpad scroll stays possible — keep the counter in sync.
  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    requestAnimationFrame(() => {
      const padL = parseFloat(getComputedStyle(track).paddingLeft || 0);
      let best = 0, bestD = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - padL - track.scrollLeft);
        if (d < bestD) { bestD = d; best = i; }
      });
      setIdx(best);
    });
  };

  const NavBtn = ({ dir, disabled }) => (
    <button
      aria-label={dir > 0 ? 'Next project' : 'Previous project'}
      onClick={() => go(idx + dir)}
      disabled={disabled}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: '1px solid rgba(242,239,230,0.3)', background: 'transparent',
        color: '#F2EFE6', fontSize: '17px', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 180ms, border-color 180ms, background 180ms',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = '#D45A1B'; e.currentTarget.style.background = 'rgba(212,90,27,0.12)'; } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242,239,230,0.3)'; e.currentTarget.style.background = 'transparent'; }}
    >{dir > 0 ? '→' : '←'}</button>
  );

  const head = (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem',
      marginBottom: isMobile ? '2.5rem' : '3rem',
      padding: isMobile ? 0 : '0 2.5rem',
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.5)' }}>
            <b style={{ color: '#D45A1B', fontWeight: 400 }}>{String(Math.min(idx + 1, projectCount)).padStart(2, '0')}</b> / {String(projectCount).padStart(2, '0')}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <NavBtn dir={-1} disabled={idx === 0} />
            <NavBtn dir={1} disabled={idx >= items.length - 1} />
          </div>
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
    <section id="home-reel" style={{ background: '#14211C', padding: '6rem 0 6.5rem' }}>
      {head}
      {/* Horizontal track — plain overflow scroll (scrollbar hidden), driven
          by the buttons above; drag/trackpad also works and syncs the
          counter. No scroll-hijack: the page scrolls past this section
          normally. */}
      <style>{`#home-reel .reel-track::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={trackRef}
        className="reel-track"
        onScroll={onTrackScroll}
        style={{
          display: 'flex', gap: '32px', padding: '0 2.5rem',
          overflowX: 'auto', scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map(it => <ReelCard key={it.id} item={it} onNavigate={onNavigate} isMobile={false} />)}
      </div>
    </section>
  );
};

Object.assign(window, { Reel, ReelCard });
