// Nav.jsx — v1.3: unified glass — dropdowns are natural downward expansion of the nav container
const AL_MARK = ({ color = '#14211C', size = 20 }) => (
  <svg viewBox="0 0 841.95 1113.38" width={size} height={size} style={{ display: 'block', flexShrink: 0 }}>
    <path d="M269.66 913.36H.38l458.74-688.12a73.75 73.75 0 0 1 61.35-32.83H645.7l-436.42 671.4H317.5" fill={color}/>
    <path d="M426.43 913.36h414.82l-18.11-27.16-254.13-381.19-13.56-20.35L136.56 1113h122.55c18.82 0 42.76-12.81 53.2-28.47l291.74-437.62 13.1 19.64 131.5 197.25h-289.2l-33.03 49.55Z" fill={color}/>
  </svg>
);

const Nav = ({ page, onNavigate, tweaks = {} }) => {
  const { navStyle = 'floating', accentColor = '#D45A1B' } = tweaks;
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null); // 'work' | 'archive' | 'about' | null
  const closeTimer = React.useRef(null);
  const isDarkHero = tweaks._darkBg;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open       = (m) => { clearTimeout(closeTimer.current); setOpenMenu(m); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 120); };
  const cancelClose   = () => { clearTimeout(closeTimer.current); };
  const closeNow      = () => { clearTimeout(closeTimer.current); setOpenMenu(null); };

  const menuOpen = openMenu !== null;
  // When a menu is open, the nav engages its frosted state even over the dark hero —
  // this keeps the expansion readable and feels like the nav "waking up".
  const overDark = isDarkHero && !scrolled && !menuOpen;

  const navBg        = overDark ? 'transparent' : 'rgba(242,239,230,0.584)';
  const navBorder    = overDark ? '1px solid transparent' : '1px solid rgba(20,33,28,0.082)';
  const textColor    = overDark ? '#F2EFE6' : '#14211C';
  const mutedColor   = overDark ? 'rgba(242,239,230,0.6)' : 'rgba(20,33,28,0.55)';
  const subColor     = overDark ? 'rgba(242,239,230,0.5)' : 'rgba(20,33,28,0.5)';
  const onDark       = overDark;
  const dividerColor = 'rgba(20,33,28,0.082)';
  const dropdownMuted = 'rgba(20,33,28,0.45)';

  const projects = (window.PROJECTS || []).slice(0, 6);
  const archiveItems = window.ARCHIVE_ITEMS || [];

  return (
    <div style={{ position: 'fixed', top: 0, zIndex: 200, width: '100%' }}>
      <style>{`.nav-carousel::-webkit-scrollbar{display:none}`}</style>

      {/* Unified glass shell — nav + any open dropdown share this background, blur, and border.
          Bottom corners carry a generous radius; top corners stay square against the viewport —
          when the dropdown opens, the whole shape grows downward keeping the same rounded tail. */}
      <div
        onMouseLeave={scheduleClose}
        style={{
          background: navBg,
          backdropFilter: overDark ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: overDark ? 'none' : 'blur(12px)',
          borderBottom: navBorder,
          borderLeft: overDark ? '1px solid transparent' : '1px solid rgba(20,33,28,0.082)',
          borderRight: overDark ? '1px solid transparent' : '1px solid rgba(20,33,28,0.082)',
          borderRadius: '0 0 24px 24px',
          overflow: 'hidden',
          transition: 'background 350ms cubic-bezier(0.22,1,0.36,1), border-color 350ms cubic-bezier(0.22,1,0.36,1)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Nav row */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2.5rem', height: '80px',
        }}>
          {/* Wordmark + DESIGNER subline */}
          <button
            onMouseEnter={() => setOpenMenu(null)}
            onClick={() => { closeNow(); onNavigate('home'); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
            }}
          >
            <AL_MARK color={overDark ? '#D45A1B' : '#3D5448'} size={30} />
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
            <div onMouseEnter={() => open('work')}>
              <NavPill
                active={page === 'work' || page === 'project'}
                onClick={() => { closeNow(); onNavigate('work'); }}
                accentColor={accentColor}
                onDark={onDark}
                textColor={textColor}
                mutedColor={mutedColor}
              >Work</NavPill>
            </div>

            <div onMouseEnter={() => open('archive')}>
              <NavPill
                active={page === 'archive'}
                onClick={() => { closeNow(); onNavigate('archive'); }}
                accentColor={accentColor}
                onDark={onDark}
                textColor={textColor}
                mutedColor={mutedColor}
              >Archive</NavPill>
            </div>

            <div onMouseEnter={() => open('about')}>
              <NavPill
                active={page === 'about'}
                onClick={() => { closeNow(); onNavigate('about'); }}
                accentColor={accentColor}
                onDark={onDark}
                textColor={textColor}
                mutedColor={mutedColor}
              >About</NavPill>
            </div>
          </div>
        </nav>

        {/* Expansion panel — lives inside the glass shell so it inherits bg + blur */}
        <div
          onMouseEnter={cancelClose}
          style={{
            maxHeight: menuOpen ? '260px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 350ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div style={{
            borderTop: `0.5px solid ${dividerColor}`,
            // Subtle tonal wash so the menu area reads as a distinct surface
            // from the nav's structural row, without breaking the shared glass.
            background: 'rgba(20,33,28,0.025)',
            padding: '1.25rem 2.5rem 1.5rem',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 240ms cubic-bezier(0.22,1,0.36,1) 60ms, transform 240ms cubic-bezier(0.22,1,0.36,1) 60ms',
          }}>
            {openMenu === 'work' && (
              <DropdownCarousel
                items={projects}
                onItemClick={(id) => { closeNow(); onNavigate('project', id); }}
                ctaLabel="All projects →"
                onCta={() => { closeNow(); onNavigate('work'); }}
                accentColor={accentColor}
                mutedColor={dropdownMuted}
              />
            )}
            {openMenu === 'archive' && (
              <DropdownCarousel
                items={archiveItems.map((it, i) => ({
                  id: 'archive-' + i,
                  title: it.title,
                  org: it.org,
                  bg: it.bg,
                  imageIndex: it.imageIndex,
                }))}
                onItemClick={() => { closeNow(); onNavigate('archive'); }}
                ctaLabel="View all archive →"
                onCta={() => { closeNow(); onNavigate('archive'); }}
                accentColor={accentColor}
                mutedColor={dropdownMuted}
              />
            )}
            {openMenu === 'about' && (
              <AboutDropdown
                onReadMore={() => { closeNow(); onNavigate('about'); }}
                accentColor={accentColor}
                mutedColor={dropdownMuted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Carousel used inside the expansion panel — full nav width, horizontally scrollable
const DropdownCarousel = ({ items, onItemClick, ctaLabel, onCta, accentColor, mutedColor }) => (
  <React.Fragment>
    <div className="nav-carousel" style={{
      display: 'flex', gap: '0.625rem', overflowX: 'auto',
      justifyContent: 'center',
      scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none', msOverflowStyle: 'none',
      marginBottom: '0.875rem',
    }}>
      {items.map(p => (
        <div key={p.id} style={{ flexShrink: 0, width: '200px', scrollSnapAlign: 'start' }}>
          <DropdownTile project={p} onNavigate={(_pg, id) => onItemClick(id || p.id)} accentColor={accentColor} />
        </div>
      ))}
    </div>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontSize: '11px', color: mutedColor, letterSpacing: '0.05em' }}>Scroll to explore ·</span>
      <button
        onClick={onCta}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontSize: '12px', fontWeight: 500, color: mutedColor,
          fontFamily: "'Inter', system-ui, sans-serif",
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          transition: 'color 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.color = accentColor}
        onMouseLeave={e => e.currentTarget.style.color = mutedColor}
      >{ctaLabel}</button>
    </div>
  </React.Fragment>
);

// Nav pill — active = orange glass, inactive = subtle glass
const NavPill = ({ children, active, onClick, accentColor, onDark, textColor, mutedColor }) => {
  const [hov, setHov] = React.useState(false);

  const activeBg = accentColor;
  const activeShadow = `inset 0px 1px 0px 0px rgba(255,255,255,0.20), 0px 4px 16px 0px ${accentColor}50`;
  const inactiveBg = onDark
    ? (hov ? 'rgba(212,90,27,0.18)' : 'transparent')
    : (hov ? 'rgba(20,33,28,0.06)' : 'transparent');
  const inactiveBorder = onDark
    ? (hov ? `1px solid rgba(212,90,27,0.35)` : '1px solid rgba(255,255,255,0.12)')
    : '1px solid transparent';
  const inactiveShadow = onDark && hov ? `0px 4px 12px 0px rgba(212,90,27,0.20)` : 'none';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: active ? activeBg : inactiveBg,
        border: active ? '1px solid rgba(255,255,255,0.20)' : inactiveBorder,
        borderRadius: '10px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px', fontWeight: active ? 500 : 400,
        color: active ? '#F2EFE6' : (hov ? textColor : mutedColor),
        fontFamily: "'Inter', system-ui, sans-serif",
        boxShadow: active ? activeShadow : inactiveShadow,
        transition: 'color 150ms, background 150ms, box-shadow 150ms, border-color 150ms',
        opacity: 1,
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
  // Accept either `bg` (canonical across PROJECTS + ARCHIVE_ITEMS) or legacy `tileBg`.
  const bg = project.bg || project.tileBg;
  const light = bg === '#E8E4D5' || bg === '#F2EFE6';
  const tc = light ? '#14211C' : '#F2EFE6';
  const mc = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  return (
    <div
      onClick={() => onNavigate('project', project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg, borderRadius: '10px',
        padding: '1rem', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform 180ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        boxShadow: hov ? (window.tileBoxShadow ? tileBoxShadow(bg, true) : 'none') : (window.tileInset ? tileInset(bg) : 'none'),
      }}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: light
          ? 'linear-gradient(rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none',
      }} />
      {window.TilePlaceholder && <TilePlaceholder bg={bg} index={project.imageIndex} hovered={hov} />}
      {/* Hover arrow */}
      <div style={{
        position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 1,
        opacity: hov ? 1 : 0, transition: 'opacity 150ms, transform 150ms',
        transform: hov ? 'translate(0,0)' : 'translate(-3px, 3px)',
        fontSize: '13px', color: tc,
      }}>→</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.11em', textTransform: 'uppercase', color: mc, margin: '0 0 3px' }}>{project.org}</p>
        <p style={{ fontSize: '13px', fontWeight: 500, color: tc, margin: 0, lineHeight: 1.2 }}>{project.title}</p>
      </div>
    </div>
  );
};

// About dropdown — centered headshot + short bio + Read bio CTA.
// Uses the AL mark in a tinted circle as a placeholder headshot; swap `src` with
// a real photo by replacing the Avatar component's inner content with an <img />.
const AboutDropdown = ({ onReadMore, accentColor, mutedColor }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '1.75rem', padding: '0.5rem 0 1rem',
  }}>
    <Avatar size={96} accentColor={accentColor} />
    <div style={{ maxWidth: '440px' }}>
      <p style={{
        fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)',
        margin: '0 0 0.6rem',
      }}>Andreas Lächler · Designer</p>
      <p style={{
        fontSize: '15px', fontWeight: 400, lineHeight: 1.55,
        color: '#14211C', margin: '0 0 0.75rem',
      }}>
        Product designer and architect in New York. Currently at Algoma. Previously Arquitectonica, trained at Pratt and Lehigh.
      </p>
      <button
        onClick={onReadMore}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontSize: '12px', fontWeight: 500, color: mutedColor,
          fontFamily: "'Inter', system-ui, sans-serif",
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          transition: 'color 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.color = accentColor}
        onMouseLeave={e => e.currentTarget.style.color = mutedColor}
      >Read bio →</button>
    </div>
  </div>
);

// Placeholder headshot. Replace with <img src="assets/headshot.jpg" .../> when you have one.
const Avatar = ({ size = 96, accentColor = '#D45A1B' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: '#E8E4D5',
    border: '0.5px solid rgba(20,33,28,0.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    boxShadow: 'inset 0px 1px 0px 0px rgba(255,255,255,0.4), 0px 2px 8px 0px rgba(20,33,28,0.06)',
  }}>
    <AL_MARK color={accentColor} size={size * 0.42} />
  </div>
);

Object.assign(window, { Nav, NavPill, DropdownTile, DropdownCarousel, AboutDropdown, Avatar, AL_MARK });
