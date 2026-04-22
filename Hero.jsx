// Hero.jsx — full-bleed with mouse-reactive canvas background
const Hero = ({ onNavigate, tweaks = {} }) => {
  const { heroLayout = 'default', accentColor = '#D45A1B' } = tweaks;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const fade = (delay, dist = 18) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : `translateY(${dist}px)`,
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      marginTop: '-80px', // pull up behind taller fixed nav
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '0 2.5rem 5rem',
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
        <p style={{ ...fade(200), fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.45)', marginBottom: '2rem' }}>
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
                Currently at Algoma. Previously at Arquitectonica on residential and mixed-use projects at significant scale.
              </p>
              <HeroArrow onClick={() => onNavigate('work')} color={accentColor}>Selected work</HeroArrow>
            </div>
          </div>
        ) : (
          <>
            <h1 style={{ ...fade(350), fontSize: 'clamp(52px, 6.5vw, 84px)', fontWeight: 500, letterSpacing: '-0.024em', lineHeight: 1.04, color: '#F2EFE6', maxWidth: '960px', marginBottom: '2.5rem' }}>
              A product designer<br />trained as an architect.
            </h1>
            <p style={{ ...fade(500), fontSize: '18px', fontWeight: 400, lineHeight: 1.65, color: 'rgba(242,239,230,0.6)', maxWidth: '540px', marginBottom: '3rem' }}>
              Currently at Algoma, designing an AI platform for real estate feasibility. Previously at Arquitectonica on residential and mixed-use projects at significant scale.
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

      {/* Scroll indicator — anchored to viewport bottom */}
      <div style={{
        ...fade(900),
        position: 'absolute', bottom: '2rem', left: '50%', transform: mounted ? 'translate(-50%, 0)' : 'translate(-50%, 18px)',
        zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(242,239,230,0.3)' }} />
        <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.35)' }}>Scroll</span>
        <div style={{ width: '24px', height: '1px', background: 'rgba(242,239,230,0.3)' }} />
      </div>
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
