// ScrollWork.jsx — pinned scroll section, projects reveal one-by-one
const ScrollWork = ({ onNavigate, tweaks = {} }) => {
  const { accentColor = '#D45A1B' } = tweaks;
  const projects = window.PROJECTS || [];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef(null);
  const ticking = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (!containerRef.current) { ticking.current = false; return; }
          const rect = containerRef.current.getBoundingClientRect();
          const containerH = containerRef.current.offsetHeight;
          const scrollable = containerH - window.innerHeight;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(1, scrolled / scrollable);
          const idx = Math.min(projects.length - 1, Math.floor(progress * projects.length));
          setActiveIndex(idx);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [projects.length]);

  // Height = n panels × viewport height
  const totalHeight = `${projects.length * 100}vh`;

  return (
    <section ref={containerRef} style={{ position: 'relative', height: totalHeight, background: '#F2EFE6' }}>
      {/* Sticky inner */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Section label */}
        <div style={{ padding: '3rem 2.5rem 0', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor }}>
            Selected Work
          </p>
          <span style={{ fontSize: '12px', color: 'rgba(20,33,28,0.35)' }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem 2.5rem 2.5rem', alignItems: 'center' }}>
          {/* Left: project info */}
          <div style={{ paddingRight: '4rem' }}>
            {projects.map((p, i) => (
              <ProjectInfoPanel
                key={p.id}
                project={p}
                active={activeIndex === i}
                onNavigate={onNavigate}
                accentColor={accentColor}
              />
            ))}
          </div>

          {/* Right: project tile visual */}
          <div style={{ position: 'relative', height: '60vh', maxHeight: '520px' }}>
            {projects.map((p, i) => (
              <ScrollTileVisual
                key={p.id}
                project={p}
                active={activeIndex === i}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(20,33,28,0.08)', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            background: accentColor,
            width: `${((activeIndex + 1) / projects.length) * 100}%`,
            transition: 'width 300ms cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>
      </div>
    </section>
  );
};

const ProjectInfoPanel = ({ project, active, onNavigate, accentColor }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div style={{
      position: active ? 'relative' : 'absolute',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 450ms cubic-bezier(0.22,1,0.36,1), transform 450ms cubic-bezier(0.22,1,0.36,1)',
      pointerEvents: active ? 'all' : 'none',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>
        {project.org} · {project.year}
      </p>
      <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#14211C', marginBottom: '1.5rem' }}>
        {project.title}
      </h2>
      <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(20,33,28,0.65)', marginBottom: '2.5rem', maxWidth: '440px' }}>
        {project.role}
      </p>
      <button
        onClick={() => onNavigate('project', project.id)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          background: accentColor,
          border: '1px solid rgba(255,255,255,0.20)', cursor: 'pointer',
          padding: '12px 24px', borderRadius: '14px',
          fontSize: '14px', fontWeight: 500,
          color: '#F2EFE6',
          fontFamily: "'Inter', system-ui, sans-serif",
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: `inset 0px 1px 0px 0px rgba(255,255,255,0.20), 0px 4px 16px 0px ${accentColor}50`,
          transition: 'opacity 180ms',
          opacity: hov ? 0.88 : 1,
        }}
      >
        View project
        <span style={{ transition: 'transform 150ms', transform: hov ? 'translateX(3px)' : 'none' }}>→</span>
      </button>

      {/* Org indicator */}
      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.tileBg === '#D45A1B' ? '#D45A1B' : '#3D5448' }} />
        <span style={{ fontSize: '11px', color: 'rgba(20,33,28,0.35)', letterSpacing: '0.05em' }}>{project.org}</span>
      </div>
    </div>
  );
};

const ScrollTileVisual = ({ project, active, onNavigate }) => {
  const [hov, setHov] = React.useState(false);
  const light = project.tileBg === '#E8E4D5' || project.tileBg === '#F2EFE6';

  return (
    <div
      onClick={() => onNavigate('project', project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', inset: 0,
        background: project.tileBg,
        borderRadius: '24px',
        cursor: 'pointer',
        opacity: active ? 1 : 0,
        transform: active ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(16px)',
        transition: 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        boxShadow: window.tileInset ? tileInset(project.tileBg) : 'none',
      }}
    >
      {window.TilePlaceholder && <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={hov} />}

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0)',
        transition: 'background 250ms',
        ...(hov ? { background: 'rgba(0,0,0,0.05)' } : {}),
      }} />

      {/* Corner arrow on hover */}
      <div style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translate(0,0)' : 'translate(-6px, 6px)',
        transition: 'opacity 180ms, transform 180ms',
        fontSize: '20px',
        color: light ? '#14211C' : '#F2EFE6',
      }}>→</div>
    </div>
  );
};

// Dot nav for project index
const ScrollDots = ({ total, active, accentColor }) => (
  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{
        width: i === active ? '20px' : '4px', height: '4px',
        borderRadius: '2px',
        background: i === active ? accentColor : 'rgba(20,33,28,0.2)',
        transition: 'width 300ms cubic-bezier(0.22,1,0.36,1), background 300ms',
      }} />
    ))}
  </div>
);

Object.assign(window, { ScrollWork, ProjectInfoPanel, ScrollTileVisual, ScrollDots });
