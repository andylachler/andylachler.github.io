// ScrollWork.jsx — hybrid: first N projects get pinned/cinematic treatment,
// the rest render as a compact grid below. Cuts total scroll travel and
// keeps the section reading as a single chapter.
const ScrollWork = ({ onNavigate, tweaks = {} }) => {
  const { accentColor = '#D45A1B' } = tweaks;
  const projects = window.PROJECTS || [];

  // Hybrid split: first 2 are hero treatment, rest are grid
  const FEATURED_COUNT = Math.min(2, projects.length);
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section style={{ background: '#F2EFE6', position: 'relative' }}>
      {/* Chapter header — announces the section as a landmark */}
      <div style={{
        maxWidth: '1400px', margin: '0 auto', padding: '6rem 2.5rem 2.5rem',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '2rem',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>
            Selected Work
          </p>
          <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#14211C', margin: 0, maxWidth: '720px' }}>
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

      {/* Featured (pinned cinematic) */}
      <FeaturedPinned projects={featured} onNavigate={onNavigate} accentColor={accentColor} />

      {/* Remaining grid */}
      {rest.length > 0 && (
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '4rem 2.5rem 6rem',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>
            More work
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '0.75rem',
          }}>
            {rest.map(p => (
              <CompactProjectCard key={p.id} project={p} onNavigate={onNavigate} accentColor={accentColor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ── Pinned featured ───────────────────────────────────────────────────────
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
          // Smooth index selection with a small overshoot so the second panel
          // takes over a hair before the user hits the end
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

  // Reduced travel: 100vh per panel (was 100vh per panel × 6 = 600vh total)
  const totalHeight = `${projects.length * 100}vh`;

  return (
    <section ref={containerRef} style={{ position: 'relative', height: totalHeight, background: '#F2EFE6' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Index counter */}
        <div style={{ padding: '2rem 2.5rem 0', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)' }}>
            Featured
          </p>
          <span style={{ fontSize: '12px', color: 'rgba(20,33,28,0.35)' }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Two-column content */}
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

// ── Info panel ────────────────────────────────────────────────────────────
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

// ── Tile visual ───────────────────────────────────────────────────────────
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

// ── Compact grid card (for non-featured projects) ─────────────────────────
const CompactProjectCard = ({ project, onNavigate, accentColor }) => {
  const [hov, setHov] = React.useState(false);
  const tileBg = project.bg || project.tileBg;
  const light = tileBg === '#E8E4D5' || tileBg === '#F2EFE6';

  return (
    <button
      onClick={() => onNavigate('project', project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        textAlign: 'left', fontFamily: "'Inter', system-ui, sans-serif",
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        background: tileBg,
        borderRadius: '10px',
        overflow: 'hidden',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
      }}>
        {window.TilePlaceholder && <TilePlaceholder bg={tileBg} index={project.imageIndex} hovered={hov} />}
        <div style={{
          position: 'absolute', inset: 0,
          background: hov ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)',
          transition: 'background 250ms',
        }} />
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translate(0,0)' : 'translate(-4px, 4px)',
          transition: 'opacity 180ms, transform 180ms',
          fontSize: '16px',
          color: light ? '#14211C' : '#F2EFE6',
        }}>→</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#14211C', marginBottom: '0.15rem', letterSpacing: '-0.005em' }}>
            {project.title}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(20,33,28,0.45)' }}>
            {project.org} · {project.year}
          </p>
        </div>
      </div>
    </button>
  );
};

Object.assign(window, { ScrollWork, FeaturedPinned, ProjectInfoPanel, ScrollTileVisual, CompactProjectCard });
