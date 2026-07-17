// ScrollRail.jsx — left-side section progress rail (v4 design language).
//
// Fixed at mid-left: one tick per home section, the active tick stretched and
// orange, a rotated mono "Scroll" label beneath. Flips to ink once the cream
// zone (Foundations teaser) reaches mid-viewport — same boundary the nav
// watches. Desktop + home page only; sections are resolved by element id so
// the rail needs no wiring into the sections themselves.
const RAIL_SECTIONS = [
  { id: 'home-hero', label: 'Intro' },
  { id: 'home-reel', label: 'Work' },
  { id: 'home-teaser', label: 'Foundations' },
  { id: 'site-footer', label: 'Contact' },
];

const ScrollRail = () => {
  const isMobile = (window.useIsMobile || (() => false))(820);
  const [active, setActive] = React.useState(0);
  const [light, setLight] = React.useState(false);
  const [inMounted, setInMounted] = React.useState(false);

  React.useEffect(() => {
    if (isMobile) return;
    const t = setTimeout(() => setInMounted(true), 500);
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let a = 0;
      RAIL_SECTIONS.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= mid) a = i;
      });
      setActive(a);
      const cream = document.getElementById('home-teaser');
      setLight(cream ? cream.getBoundingClientRect().top < window.innerHeight * 0.5 : false);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const idle = light ? 'rgba(20,33,28,0.18)' : 'rgba(242,239,230,0.18)';
  const labelC = light ? 'rgba(20,33,28,0.45)' : 'rgba(242,239,230,0.45)';

  return (
    <aside aria-hidden="true" style={{
      position: 'fixed', left: '24px', top: '50%', transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex', flexDirection: 'column', gap: '14px',
      opacity: inMounted ? 1 : 0,
      transition: 'opacity 800ms ease',
      pointerEvents: 'none',
    }}>
      {RAIL_SECTIONS.map((sec, i) => (
        <div key={sec.id} title={sec.label} style={{
          width: '2px', borderRadius: '2px',
          height: i === active ? '40px' : '24px',
          background: i === active ? '#D45A1B' : idle,
          transition: 'height 260ms ease, background 260ms ease',
        }} />
      ))}
      <span style={{
        fontFamily: 'var(--ff-mono)', fontSize: '9px', fontWeight: 400,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: labelC, transition: 'color 260ms ease',
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        marginTop: '8px',
      }}>Scroll</span>
    </aside>
  );
};

window.ScrollRail = ScrollRail;
