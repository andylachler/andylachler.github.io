// ScrollWork.jsx — v2: single unified section. All projects get the pinned cinematic
// treatment on desktop; on mobile, we ditch pinning (which felt jarring at touch-scroll
// speeds) and render the same projects as clean stacked cards.
const ScrollWork = ({ onNavigate, tweaks = {} }) => {
  const { accentColor = '#D45A1B' } = tweaks;
  const projects = window.PROJECTS || [];
  const isMobile = window.useIsMobile ? useIsMobile(768) : false;

  return (
    <section style={{ background: '#F2EFE6', position: 'relative' }}>
      {/* Chapter header */}
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: isMobile ? '4.5rem 1.5rem 2rem' : '6rem 2.5rem 2.5rem',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>
            Selected Work
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#14211C', margin: 0, maxWidth: '720px' }}>
            Product design, research,<br />and architecture.
          </h2>
        </div>
        <button onClick={() => onNavigate('work')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '14px', fontWeight: 500, color: '#14211C',
          fontFamily: "'Inter', system-ui, sans-serif",
          flexShrink: 0,
        }}>
          All projects <span>→</span>
        </button>
      </div>

      {/* Desktop: pinned cinematic scroll. Mobile: stacked cards. */}
      {isMobile
        ? <StackedProjects projects={projects} onNavigate={onNavigate} accentColor={accentColor} />
        : <FeaturedPinned projects={projects} onNavigate={onNavigate} accentColor={accentColor} />
      }
    </section>
  );
};

// ── Pinned cinematic (desktop) ───────────────────────────────────────────────
const FeaturedPinned = ({ projects, onNavigate, accentColor }) => {
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
          const scrollable = Math.max(1, containerH - window.innerHeight);
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(1, scrolled / scrollable);
          const idx = Math.min(
            projects.length - 1,
            Math.floor(progress * projects.length * 0.999)
          );
          setActiveIndex(idx);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [projects.length]);

  // 80vh per panel rather than 100vh — keeps 4 projects from sprawling into 400vh
  // of dead scroll, and the end-of-pin handoff lands inside the next panel cleanly.
  const panelVh = 80;
  const totalHeight = `${projects.length * panelVh}vh`;

  return (
    <section ref={containerRef} style={{ position: 'relative', height: totalHeight, background: '#F2EFE6' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        <div style={{ padding: '2rem 2.5rem 0', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)' }}>
            Featured
          </p>
          <span style={{ fontSize: '12px', color: 'rgba(20,33,28,0.35)' }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <div style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '3rem',
          maxWidth: '1400px', margin: '0 auto', width: '100%',
          padding: '1.5rem 2.5rem 2.5rem', alignItems: 'center',
        }}>
          <div style={{ position: 'relative' }}>
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

// ── Mobile: stacked projects ─────────────────────────────────────────────────
// On mobile, pinned scroll + cross-fade reads as jarring — the panel flips at a
// single scroll-depth threshold and there's no tile to anchor the eye. Plain
// stacked cards are more legible, match the tile language from the rest of the
// site, and still let the user scroll through all four quickly.
const StackedProjects = ({ projects, onNavigate, accentColor }) => (
  <div style={{
    maxWidth: '600px', margin: '0 auto',
    padding: '1rem 1.5rem 4rem',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  }}>
    {projects.map(p => (
      <MobileProjectCard key={p.id} project={p} onNavigate={onNavigate} accentColor={accentColor} />
    ))}
  </div>
);

const MobileProjectCard = ({ project, onNavigate, accentColor }) => {
  const tileBg = project.bg || project.tileBg;
  const light = tileBg === '#E8E4D5' || tileBg === '#F2EFE6';
  const tc = light ? '#14211C' : '#F2EFE6';
  const mc = light ? 'rgba(20,33,28,0.55)' : 'rgba(242,239,230,0.55)';

  return (
    <button
      onClick={() => onNavigate('project', project.id)}
      style={{
        textAlign: 'left', cursor: 'pointer',
        background: tileBg,
        borderRadius: '10px', padding: 0,
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        overflow: 'hidden', position: 'relative',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Visual */}
      <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
        {window.TilePlaceholder && <TilePlaceholder bg={tileBg} index={project.imageIndex} hovered={false} />}
        <div style={{
          position: 'absolute', inset: 0,
          background: light
            ? 'linear-gradient(rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)'
            : 'linear-gradient(rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>
      {/* Meta */}
      <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: mc, margin: '0 0 0.35rem' }}>
          {project.org} · {project.year}
        </p>
        <p style={{ fontSize: '17px', fontWeight: 500, color: tc, margin: '0 0 0.35rem', lineHeight: 1.25 }}>
          {project.title}
        </p>
        <p style={{ fontSize: '13px', color: mc, margin: 0, lineHeight: 1.5 }}>
          {project.role}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.9rem', color: tc, fontSize: '13px', fontWeight: 500 }}>
          View project <span>→</span>
        </div>
      </div>
    </button>
  );
};

// ── Info panel (desktop pinned) ─────────────────────────────────────────────
const ProjectInfoPanel = ({ project, active, onNavigate, accentColor }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div style={{
      position: active ? 'relative' : 'absolute',
      top: 0, left: 0, right: 0,
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 450ms cubic-bezier(0.22,1,0.36,1), transform 450ms cubic-bezier(0.22,1,0.36,1)',
      pointerEvents: active ? 'all' : 'none',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>
        {project.org} · {project.year}
      </p>
      <h3 style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#14211C', marginBottom: '1.5rem' }}>
        {project.title}
      </h3>
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
          padding: '12px 24px', borderRadius: '10px',
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

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.bg === '#D45A1B' ? '#D45A1B' : '#3D5448' }} />
        <span style={{ fontSize: '11px', color: 'rgba(20,33,28,0.35)', letterSpacing: '0.05em' }}>{project.org}</span>
      </div>
    </div>
  );
};

// ── Tile visual (desktop pinned) ────────────────────────────────────────────
const ScrollTileVisual = ({ project, active, onNavigate }) => {
  const [hov, setHov] = React.useState(false);
  const tileBg = project.bg || project.tileBg;
  const light = tileBg === '#E8E4D5' || tileBg === '#F2EFE6';

  return (
    <div
      onClick={() => onNavigate('project', project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', inset: 0,
        background: tileBg,
        borderRadius: '10px',
        cursor: 'pointer',
        opacity: active ? 1 : 0,
        transform: active ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(16px)',
        transition: 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {window.TilePlaceholder && <TilePlaceholder bg={tileBg} index={project.imageIndex} hovered={hov} />}

      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0)',
        transition: 'background 250ms',
        ...(hov ? { background: 'rgba(0,0,0,0.05)' } : {}),
      }} />

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

Object.assign(window, { ScrollWork, FeaturedPinned, StackedProjects, MobileProjectCard, ProjectInfoPanel, ScrollTileVisual });
