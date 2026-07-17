// Loader.jsx — AL mark stroke-draw loader (v4 design language, P3).
//
// Plays ONCE per browser session (sessionStorage), always AFTER the Gate —
// it renders inside <App/>, which only mounts post-unlock. Skipped entirely
// for prefers-reduced-motion and for repeat in-session visits.
const Loader = () => {
  const KEY = 'lachler_loader_seen';
  const [phase, setPhase] = React.useState(() => {
    try {
      if (sessionStorage.getItem(KEY)) return 'done';
    } catch {}
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done';
    return 'draw';
  });

  React.useEffect(() => {
    if (phase === 'done') return;
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    const fillT = setTimeout(() => setPhase('fill'), 1500);
    const outT = setTimeout(() => setPhase('out'), 2300);
    const doneT = setTimeout(() => setPhase('done'), 3300);
    return () => { clearTimeout(fillT); clearTimeout(outT); clearTimeout(doneT); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#14211C',
      display: 'grid', placeItems: 'center',
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 900ms ease',
      pointerEvents: phase === 'out' ? 'none' : 'auto',
    }}>
      <style>{`
        @keyframes lachlerDrawMark { to { stroke-dashoffset: 0; } }
      `}</style>
      <svg viewBox="0 0 841.95 1113.38" aria-hidden="true" style={{
        width: '150px', height: '186px',
        stroke: '#F2EFE6',
        fill: phase !== 'draw' ? '#F2EFE6' : 'transparent',
        transition: 'fill 600ms ease',
      }}>
        {[0, 180].map((delay, i) => (
          <path
            key={i}
            d={i === 0
              ? 'M269.66 913.36H.38l458.74-688.12a73.75 73.75 0 0 1 61.35-32.83H645.7l-436.42 671.4H317.5'
              : 'M426.43 913.36h414.82l-18.11-27.16-254.13-381.19-13.56-20.35L136.56 1113h122.55c18.82 0 42.76-12.81 53.2-28.47l291.74-437.62 13.1 19.64 131.5 197.25h-289.2l-33.03 49.55Z'}
            style={{
              strokeWidth: 1.2,
              strokeDasharray: 4200,
              strokeDashoffset: 4200,
              animation: `lachlerDrawMark 1600ms cubic-bezier(.6,0,.3,1) ${delay}ms forwards`,
            }}
          />
        ))}
      </svg>
      <div style={{
        position: 'absolute', bottom: '10%', left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 400,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(242,239,230,0.42)',
      }}>
        <span style={{ margin: '0 18px' }}>Lachler Studio</span>
        <span style={{ margin: '0 18px' }}>New York · 40° 43′ N</span>
        <span style={{ margin: '0 18px' }}>Est. MMXIV</span>
      </div>
    </div>
  );
};

window.Loader = Loader;
