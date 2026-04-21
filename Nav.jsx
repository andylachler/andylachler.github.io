// Nav.jsx — v1.2: frosted Paper default, DESIGNER subline, orange active pill, glass inactives
const AL_MARK = ({ color = '#14211C', size = 20 }) => (
  <svg viewBox="0 0 841.95 1113.38" width={size} height={size} style={{ display: 'block', flexShrink: 0 }}>
    <path d="M269.66 913.36H.38l458.74-688.12a73.75 73.75 0 0 1 61.35-32.83H645.7l-436.42 671.4H317.5" fill={color}/>
    <path d="M426.43 913.36h414.82l-18.11-27.16-254.13-381.19-13.56-20.35L136.56 1113h122.55c18.82 0 42.76-12.81 53.2-28.47l291.74-437.62 13.1 19.64 131.5 197.25h-289.2l-33.03 49.55Z" fill={color}/>
  </svg>
);

const Nav = ({ page, onNavigate, tweaks = {} }) => {
  const { navStyle = 'floating', accentColor = '#D45A1B' } = tweaks;
  const [scrolled, setScrolled] = React.useState(false);
  const [workOpen, setWorkOpen] = React.useState(false);
  const closeTimer = React.useRef(null);
  const isDarkHero = tweaks._darkBg;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openWork = () => { clearTimeout(closeTimer.current); setWorkOpen(true); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setWorkOpen(false), 120); };

  // Nav always frosted Paper on light pages; transparent then frosted over dark hero
  const overDark = isDarkHero && !scrolled;
  const navBg = overDark ? 'transparent' : 'rgba(242,239,230,0.584)';
  const navBorder = overDark ? 'none' : '1px solid rgba(20,33,28,0.082)';
  const textColor = overDark ? '#F2EFE6' : '#14211C';
  const mutedColor = overDark ? 'rgba(242,239,230,0.6)' : 'rgba(20,33,28,0.55)';
  const subColor = overDark ? 'rgba(242,239,230,0.5)' : 'rgba(20,33,28,0.5)';
  const onDark = overDark;

  const projects = (window.PROJECTS || []).slice(0, 6);

  return (
    <div style={{
      position: 'fixed', top: 0, zIndex: 200, width: '100%',
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '80px',
        background: navBg,
        backdropFilter: overDark ? 'none' : 'blur(12px)',
        borderBottom: navBorder,
        transition: 'background 350ms cubic-bezier(0.22,1,0.36,1), border-color 350ms',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        {/* Wordmark + DESIGNER subline */}
        <button onClick={() => onNavigate('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
        }}>
          <AL_MARK color={textColor} size={22} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 500, color: textColor, lineHeight: 1.2, letterSpacing: '0.004em', fontFamily: "'Inter', system-ui, sans-serif", transition: 'color 300ms' }}>
              Andreas Lächler
            </div>
            <div style={{ fontSize: '12px', fontWeight: 400, color: subColor, letterSpacing: '0.06em', fontFamily: "'Inter', system-ui, sans-serif", transition: 'color 300ms', textTransform: 'uppercase' }}>
              Designer
            </div>
          </div>
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div onMouseEnter={openWork} onMouseLeave={scheduleClose} style={{ position: 'relative' }}>
            <NavPill
              active={page === 'work' || page === 'project'}
              onClick={() => { setWorkOpen(false); onNavigate('work'); }}
              accentColor={accentColor}
              onDark={onDark}
              textColor={textColor}
              mutedColor={mutedColor}
            >Work</NavPill>

            {/* Mega dropdown */}
            <div
              onMouseEnter={openWork}
              onMouseLeave={scheduleClose}
              style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: '-1rem',
                width: '560px',
                background: '#1A2E27',
                boxShadow: 'inset 0px 1px 0px 0px rgba(255,255,255,0.10), 0px 8px 24px 0px rgba(20,33,28,0.35)',
                borderRadius: '16px',
                padding: '1.5rem',
                opacity: workOpen ? 1 : 0,
                pointerEvents: workOpen ? 'all' : 'none',
                transform: workOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 180ms ease-out, transform 180ms ease-out',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {projects.map(p => (
                  <DropdownTile key={p.id} project={p} onNavigate={(pg, id) => { setWorkOpen(false); onNavigate(pg, id); }} accentColor={accentColor} />
                ))}
              </div>
              <div style={{ borderTop: '0.5px solid rgba(242,239,230,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => { setWorkOpen(false); onNavigate('work'); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12px', fontWeight: 500, color: 'rgba(242,239,230,0.45)', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'color 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = accentColor}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,239,230,0.45)'}
                >All projects →</button>
              </div>
            </div>
          </div>

          <NavPill active={page === 'archive'} onClick={() => onNavigate('archive')} accentColor={accentColor} onDark={onDark} textColor={textColor} mutedColor={mutedColor}>Archive</NavPill>
          <NavPill active={page === 'about'} onClick={() => onNavigate('about')} accentColor={accentColor} onDark={onDark} textColor={textColor} mutedColor={mutedColor}>About</NavPill>
        </div>
      </nav>
    </div>
  );
};

// Nav pill — active = orange glass, inactive = subtle glass
const NavPill = ({ children, active, onClick, accentColor, onDark, textColor, mutedColor }) => {
  const [hov, setHov] = React.useState(false);

  const activeBg = accentColor;
  const activeShadow = `inset 0px 1px 0px 0px rgba(255,255,255,0.20), 0px 4px 16px 0px ${accentColor}50`;
  const inactiveBg = onDark ? 'rgba(255,255,255,0.10)' : (hov ? 'rgba(20,33,28,0.06)' : 'transparent');
  const inactiveBorder = onDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: active ? activeBg : inactiveBg,
        border: active ? '1px solid rgba(255,255,255,0.20)' : inactiveBorder,
        borderRadius: '14px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px', fontWeight: active ? 500 : 400,
        color: active ? '#F2EFE6' : (hov ? textColor : mutedColor),
        fontFamily: "'Inter', system-ui, sans-serif",
        boxShadow: active ? activeShadow : 'none',
        transition: 'color 150ms, background 150ms, box-shadow 150ms',
        opacity: (!active && onDark) ? 0.8 : 1,
      }}
    >
      {/* White gradient shimmer on active orange */}
      {active && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

const DropdownTile = ({ project, onNavigate, accentColor }) => {
  const [hov, setHov] = React.useState(false);
  const light = project.tileBg === '#E8E4D5' || project.tileBg === '#F2EFE6';
  const tc = light ? '#14211C' : '#F2EFE6';
  const mc = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  return (
    <div
      onClick={() => onNavigate('project', project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: project.tileBg, borderRadius: '14px',
        padding: '0.75rem', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'transform 180ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        boxShadow: hov ? (window.tileBoxShadow ? tileBoxShadow(project.tileBg, true) : 'none') : 'none',
        minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: light
          ? 'linear-gradient(rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none',
      }} />
      {window.TilePlaceholder && <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={hov} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: mc, margin: '0 0 2px' }}>{project.org}</p>
        <p style={{ fontSize: '12px', fontWeight: 500, color: tc, margin: 0, lineHeight: 1.2 }}>{project.title}</p>
      </div>
    </div>
  );
};

Object.assign(window, { Nav, NavPill, DropdownTile, AL_MARK });
