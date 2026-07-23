// StudyKit.jsx — shared primitives for the custom case-study pages
// (Full product study, Wireframe component work, Platform driven reports).
// v4 design language: Instrument Serif display, JetBrains Mono labels,
// cream/forest/orange palette, dark-cover hero tiles, 0.5px rules.

// ── Support CSS ───────────────────────────────────────────────────────────
// .fit / .board / .pair / .stack / .pair-arrow / dotPulse are structural to
// the ported Algoma component prototypes (which keep their shipped design);
// the st-* classes are the lachler-branded page chrome.
(() => {
  if (document.getElementById('study-kit-css')) return;
  const css = `
  .st-viewport{overflow-x:auto;scroll-snap-type:x mandatory;display:flex;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .st-viewport::-webkit-scrollbar{display:none}
  .st-slide{flex:0 0 100%;scroll-snap-align:start;padding:28px 24px 8px;display:flex;flex-direction:column;align-items:center;gap:14px}
  .st-stage{height:560px;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .fit{flex-shrink:0}
  .pair{display:flex;align-items:center;gap:20px}
  .stack{display:flex;flex-direction:column;align-items:center;gap:12px}
  .pair-arrow{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#F2EFE6;color:#3D5448;flex-shrink:0}
  .stack .pair-arrow{transform:rotate(90deg)}
  .board{display:grid;grid-template-columns:repeat(2,340px);gap:14px 28px}
  .board-item{background:#fff;border:1px solid #ECECEC;border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:9px;justify-content:center}
  .board-cap{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#999999;font-weight:600}
  @keyframes dotPulse{0%,80%,100%{transform:scale(.7);opacity:.4}40%{transform:scale(1);opacity:1}}
  `;
  const el = document.createElement('style');
  el.id = 'study-kit-css';
  el.textContent = css;
  document.head.appendChild(el);
})();

// Prototype-internal fonts (Ubuntu / Poppins) — the ported Algoma components
// reference them inline. Loaded here so the components render as shipped;
// the page chrome itself never uses them.
(() => {
  if (document.getElementById('study-proto-fonts')) return;
  const l = document.createElement('link');
  l.id = 'study-proto-fonts'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Poppins:wght@300;400;500;600&display=swap';
  document.head.appendChild(l);
})();

const ST = {
  ink: '#14211C',
  muted: 'rgba(20,33,28,0.55)',
  faint: 'rgba(20,33,28,0.4)',
  body: 'rgba(20,33,28,0.75)',
  rule: '0.5px solid rgba(20,33,28,0.1)',
  cardBg: 'rgba(20,33,28,0.025)',
  cardBorder: '0.5px solid rgba(20,33,28,0.06)',
  accent: '#D45A1B',
  forest: '#3D5448',
  cream: '#F2EFE6',
};

// ── Text primitives ───────────────────────────────────────────────────────
const StudyLabel = ({ n, children, style = {} }) => (
  <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: ST.faint, margin: '0 0 0.9rem', ...style }}>
    {n && <span style={{ color: ST.accent }}>{n} — </span>}{children}
  </p>
);

const StudyH2 = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: ST.ink, margin: '0 0 1.1rem', ...style }}>{children}</h2>
);

const StudyLead = ({ children, style = {} }) => (
  <p style={{ fontSize: '16px', lineHeight: 1.75, color: ST.body, maxWidth: '820px', margin: 0, ...style }}>{children}</p>
);

const StudyMuted = ({ children, html, style = {} }) => html
  ? <p style={{ fontSize: '14px', lineHeight: 1.7, color: ST.muted, maxWidth: '820px', margin: '0.9rem 0 0', ...style }} dangerouslySetInnerHTML={{ __html: html }} />
  : <p style={{ fontSize: '14px', lineHeight: 1.7, color: ST.muted, maxWidth: '820px', margin: '0.9rem 0 0', ...style }}>{children}</p>;

const StudySection = ({ children, style = {}, first = false }) => (
  <div className="reveal" style={{ marginBottom: '4.5rem', paddingTop: first ? 0 : '2.5rem', borderTop: first ? 'none' : ST.rule, ...style }}>{children}</div>
);

// ── Hero — dark cover tile, matches ProjectPage grammar ───────────────────
const StudyHero = ({ eyebrow, title, titleEm, sub, meta = [], bg = '#14211C', isMobile }) => (
  <div style={{ background: bg, borderRadius: '10px', padding: isMobile ? '2.5rem 1.5rem' : 'clamp(3rem, 5vw, 4.5rem) clamp(1.75rem, 4vw, 4rem)', marginBottom: isMobile ? '2.5rem' : '4rem', position: 'relative', overflow: 'hidden' }}>
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(242,239,230,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(242,239,230,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
    <div style={{ position: 'relative' }}>
      {eyebrow && (
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: ST.accent, margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span aria-hidden="true" style={{ width: '32px', height: '1px', background: ST.accent, display: 'inline-block' }} />{eyebrow}
        </p>
      )}
      <h1 style={{ fontFamily: 'var(--ff-serif)', fontWeight: 400, fontSize: isMobile ? 'clamp(30px, 8vw, 42px)' : 'clamp(38px, 4.6vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: ST.cream, margin: 0, maxWidth: '900px' }}>
        {title}{titleEm && <> <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.75)' }}>{titleEm}</em></>}
      </h1>
      {sub && <p style={{ marginTop: '1.5rem', maxWidth: '640px', fontSize: '16px', lineHeight: 1.7, color: 'rgba(242,239,230,0.72)' }}>{sub}</p>}
      {meta.length > 0 && (
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          {meta.map((m, i) => (
            <div key={i} style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'rgba(242,239,230,0.5)' }}>
              <b style={{ display: 'block', color: ST.cream, fontWeight: 500, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '10px' }}>{m.label}</b>{m.value}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ── Carousel — lachler chrome around preserved prototype slides ───────────
const StudyCarousel = ({ title, slides }) => {
  const vpRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0);

  const fitAll = React.useCallback(() => {
    const vp = vpRef.current;
    if (!vp) return;
    vp.querySelectorAll('.st-stage').forEach(stage => {
      const fit = stage.querySelector('.fit');
      if (!fit) return;
      fit.style.transform = 'none';
      const w = fit.scrollWidth, h = fit.scrollHeight;
      const s = Math.min(1, (stage.clientWidth - 16) / (w || 1), (stage.clientHeight - 16) / (h || 1));
      fit.style.transform = `scale(${s})`;
      fit.style.transformOrigin = 'center center';
    });
  }, []);

  React.useEffect(() => {
    fitAll();
    const t = setTimeout(fitAll, 350);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    window.addEventListener('resize', fitAll);
    return () => { clearTimeout(t); window.removeEventListener('resize', fitAll); };
  }, [fitAll]);

  const go = (n) => {
    const vp = vpRef.current;
    if (!vp) return;
    n = Math.max(0, Math.min(slides.length - 1, n));
    vp.scrollTo({ left: n * vp.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const vp = vpRef.current;
    if (!vp) return;
    requestAnimationFrame(() => setIdx(Math.round(vp.scrollLeft / vp.clientWidth)));
  };

  // Prev/next — same circular button grammar as the home reel.
  const CarBtn = ({ dir, disabled }) => (
    <button
      aria-label={dir > 0 ? 'Next state' : 'Previous state'}
      onClick={() => go(idx + dir)}
      disabled={disabled}
      style={{
        width: '38px', height: '38px', borderRadius: '50%',
        border: '1px solid rgba(20,33,28,0.25)', background: 'transparent',
        color: ST.ink, fontSize: '15px', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 180ms, border-color 180ms, background 180ms',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = ST.accent; e.currentTarget.style.background = 'rgba(212,90,27,0.08)'; } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,33,28,0.25)'; e.currentTarget.style.background = 'transparent'; }}
    >{dir > 0 ? '→' : '←'}</button>
  );

  return (
    <div style={{ marginTop: '2.25rem', background: '#FFFFFF', border: '0.5px solid rgba(20,33,28,0.14)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.5rem', borderBottom: ST.rule, background: 'rgba(20,33,28,0.015)' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.55)' }}>
          <span style={{ color: ST.accent }}>●</span>&nbsp;&nbsp;{title}
        </span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.1em', color: ST.faint, flexShrink: 0 }}>
          <b style={{ color: ST.accent, fontWeight: 400 }}>{String(idx + 1).padStart(2, '0')}</b> / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
      <div className="st-viewport" ref={vpRef} onScroll={onScroll}>
        {slides.map((sl, i) => (
          <div className="st-slide" key={i}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ST.forest, background: 'rgba(61,84,72,0.09)', borderRadius: '999px', padding: '6px 16px', maxWidth: '92%', textAlign: 'center' }}>
              <b style={{ color: ST.accent, fontWeight: 500, marginRight: '8px' }}>{sl.n}</b>{sl.label}
            </span>
            <p style={{ fontSize: '13px', color: ST.muted, maxWidth: '620px', textAlign: 'center', lineHeight: 1.55, margin: 0 }}>{sl.caption}</p>
            {sl.stage && sl.stage.length > 60 ? (
              <div className="st-stage" dangerouslySetInnerHTML={{ __html: sl.stage }} />
            ) : (
              /* Stage empty in the source mockup — Andy drops raw HTML into
                 the slide-stage there, then tools/extract-wireframe-slides.py
                 regenerates wireframes-data.js and the state appears here. */
              <div className="st-stage">
                <div style={{ border: '1px dashed rgba(20,33,28,0.2)', borderRadius: '10px', padding: '2.5rem 3rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: ST.faint, margin: 0 }}>State mock — in progress</p>
                  <p style={{ fontSize: '12px', color: 'rgba(20,33,28,0.35)', margin: '0.6rem 0 0' }}>Component HTML lands here once the state is mocked.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', borderTop: ST.rule, background: 'rgba(20,33,28,0.015)' }}>
        <CarBtn dir={-1} disabled={idx === 0} />
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button key={i} aria-label={`Go to state ${i + 1}`} onClick={() => go(i)} style={{
              width: '8px', height: '8px', borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
              background: i === idx ? ST.accent : 'rgba(20,33,28,0.15)',
              transform: i === idx ? 'scale(1.25)' : 'none', transition: 'all 200ms',
            }} />
          ))}
        </div>
        <CarBtn dir={1} disabled={idx === slides.length - 1} />
      </div>
    </div>
  );
};

// ── Impact cards ("Description" triptych) ─────────────────────────────────
const StudyImpact = ({ items, isMobile }) => (
  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: isMobile ? '1rem' : '1.25rem', marginTop: '2rem' }}>
    {items.map((it, i) => (
      <div key={i} style={{ padding: '1.4rem', background: ST.cardBg, borderRadius: '8px', border: ST.cardBorder }}>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ST.faint, margin: '0 0 0.6rem' }}>{it.k}</p>
        <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(20,33,28,0.7)', margin: 0 }} dangerouslySetInnerHTML={{ __html: it.html }} />
      </div>
    ))}
  </div>
);

// ── Outcome / credits / next — shared page tail ───────────────────────────
const StudyTail = ({ outcome, credits, nextId, onNavigate, isMobile }) => {
  const next = nextId && window.PROJECT_DATA ? window.PROJECT_DATA[nextId] : null;
  return (
    <>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', borderTop: ST.rule, paddingTop: '2.5rem', marginBottom: isMobile ? '3rem' : '4rem' }}>
        <div>
          <StudyLabel>Current state</StudyLabel>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: ST.body, margin: 0 }}>{outcome}</p>
        </div>
        <div>
          <StudyLabel>Credits</StudyLabel>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(20,33,28,0.6)', margin: 0 }}>{credits}</p>
        </div>
      </div>
      <div style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>
        <ArrowLink onClick={() => onNavigate('work')} style={{ fontSize: '13px', color: 'rgba(20,33,28,0.55)' }}>Back to work</ArrowLink>
      </div>
      {next && (
        <div style={{ borderTop: ST.rule, paddingTop: isMobile ? '2rem' : '3rem' }}>
          <StudyLabel style={{ marginBottom: '1.5rem' }}>Next</StudyLabel>
          <NextProjectCard project={next} onNavigate={onNavigate} isMobile={isMobile} />
        </div>
      )}
    </>
  );
};

Object.assign(window, { ST, StudyLabel, StudyH2, StudyLead, StudyMuted, StudySection, StudyHero, StudyCarousel, StudyImpact, StudyTail });
