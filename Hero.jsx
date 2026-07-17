// Hero.jsx — full-bleed with mouse-reactive canvas background
const Hero = ({ onNavigate, tweaks = {} }) => {
  const { heroLayout = 'default', accentColor = '#D45A1B' } = tweaks;
  const isMobile = (window.useIsMobile || (() => false))(768);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const fade = (delay, dist = 18) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : `translateY(${dist}px)`,
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  // Line-mask reveal (v4 rline): each line slides up from behind an
  // overflow-hidden wrapper. Delay staggers per line.
  const RLine = ({ children, delay = 0, style = {} }) => (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', ...style }}>
      <span style={{
        display: 'inline-block',
        transform: mounted ? 'translateY(0)' : 'translateY(112%)',
        transition: `transform 950ms cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
      }}>{children}</span>
    </span>
  );

  return (
    <section style={{
      position: 'relative',
      // svh = small viewport height — honest on iOS where the URL bar makes
      // 100vh taller than the visible screen. Mobile also gets top padding so
      // a content stack taller than the viewport pushes DOWN, never up under
      // the fixed nav (was the header/hero overlap bug).
      minHeight: isMobile ? '100svh' : '100vh',
      marginTop: '-80px', // pull up behind taller fixed nav
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: isMobile ? '7.5rem 1.25rem 3.5rem' : '0 2.5rem 5rem',
      overflow: 'hidden',
      background: '#14211C',
    }}>
      {/* Canvas parallax background */}
      <HeroBg />

      {/* Gradient fade bottom → text legible. Lower + shallower so the canvas breathes. */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%',
        background: 'linear-gradient(to bottom, transparent, rgba(20,33,28,0.85) 60%, #14211C 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <p style={{ ...fade(200), fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.45)', marginBottom: isMobile ? '1rem' : '2rem' }}>
          Based in New York
        </p>

        {heroLayout === 'large' ? (
          <h1 style={{ ...fade(350), fontSize: 'clamp(60px, 8vw, 104px)', fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.02, color: '#F2EFE6', maxWidth: '1100px', marginBottom: '3rem' }}>
            A product designer<br />trained as an architect.
          </h1>
        ) : heroLayout === 'split' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', maxWidth: '1100px' }}>
            <h1 style={{ ...fade(350), fontSize: 'clamp(42px, 5.2vw, 68px)', fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.04, color: '#F2EFE6', margin: 0 }}>
              A product designer<br />trained as an architect.
            </h1>
            <div style={fade(480)}>
              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(242,239,230,0.65)', marginBottom: '2rem' }}>
                Currently at Algoma, shipping B2B SaaS end-to-end. Before software, buildings at Arquitectonica — I prototype in both mediums.
              </p>
              <HeroArrow onClick={() => onNavigate('work')} color={accentColor}>Selected work</HeroArrow>
            </div>
          </div>
        ) : (
          <>
            <h1 style={{
              fontFamily: 'var(--ff-serif)',
              fontSize: isMobile ? 'clamp(38px, 10.5vw, 58px)' : 'clamp(56px, 7vw, 96px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.02,
              color: '#F2EFE6', maxWidth: '1020px',
              marginBottom: isMobile ? '1.5rem' : '2.5rem',
            }}>
              <RLine delay={250}>A product designer</RLine><br />
              <RLine delay={400}><em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.72)' }}>trained</em>&nbsp;as an architect.</RLine>
            </h1>
            <p style={{ ...fade(500), fontSize: isMobile ? '16px' : '18px', fontWeight: 400, lineHeight: 1.65, color: 'rgba(242,239,230,0.6)', maxWidth: '540px', marginBottom: isMobile ? '2rem' : '3rem' }}>
              Currently at Algoma, designing and shipping a data-dense B2B SaaS platform end-to-end. Before software, buildings — so I prototype as comfortably in the physical world as on screen.
            </p>
            <div style={{ ...fade(620), display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <HeroArrow onClick={() => onNavigate('work')} color={accentColor}>Selected work</HeroArrow>
              <button onClick={() => onNavigate('about')} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontSize: '14px', color: 'rgba(242,239,230,0.45)',
                fontFamily: "'Inter', system-ui, sans-serif",
                transition: 'color 150ms',
              }}
              onMouseEnter={e => e.target.style.color = 'rgba(242,239,230,0.85)'}
              onMouseLeave={e => e.target.style.color = 'rgba(242,239,230,0.45)'}
              >About</button>
            </div>
          </>
        )}
      </div>

      {/* Scroll indicator — anchored to viewport bottom; hidden on mobile
          where it collides with the CTA row on short screens */}
      {!isMobile && <div style={{
        ...fade(900),
        position: 'absolute', bottom: '2rem', left: '50%', transform: mounted ? 'translate(-50%, 0)' : 'translate(-50%, 18px)',
        zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(242,239,230,0.3)' }} />
        <span style={{ fontSize: '10px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.35)' }}>Scroll</span>
        <div style={{ width: '24px', height: '1px', background: 'rgba(242,239,230,0.3)' }} />
      </div>}
    </section>
  );
};

const HeroArrow = ({ children, onClick, color }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        fontSize: '15px', fontWeight: 500,
        color: hov ? color : '#F2EFE6',
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: 'color 150ms',
      }}>
      {children}
      <span style={{ display: 'inline-block', transition: 'transform 150ms', transform: hov ? 'translateX(4px)' : 'none' }}>→</span>
    </button>
  );
};

Object.assign(window, { Hero, HeroArrow });
