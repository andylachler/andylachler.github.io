// ProjectTile.jsx — v1.1: inset highlights + ambient shadows

const ArrowLink = ({ children, onClick, style = {} }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        fontSize: '14px', fontWeight: 500,
        color: hov ? '#D45A1B' : '#14211C',
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: 'color 150ms ease-out',
        ...style,
      }}
    >
      {children}
      <span style={{ display: 'inline-block', transition: 'transform 150ms ease-out', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
    </button>
  );
};

// Ambient shadow tokens matched to tile bg color
const tileBoxShadow = (bg, hovered) => {
  if (!hovered) return 'none';
  if (bg === '#14211C') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.10), 0px 8px 24px 0px rgba(20,33,28,0.25)';
  if (bg === '#1A2520') return 'inset 0px 1px 0px 0px rgba(245,200,140,0.14), 0px 8px 28px 0px rgba(26,37,32,0.35)';
  if (bg === '#3D5448') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.15), 0px 8px 24px 0px rgba(61,84,72,0.25)';
  if (bg === '#D45A1B') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.20), 0px 4px 16px 0px rgba(212,90,27,0.31)';
  if (bg === '#2A3D34') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.10), 0px 8px 24px 0px rgba(20,33,28,0.25)';
  // light tiles
  return '0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)';
};

// Inset highlight (always on dark tiles, subtle)
const tileInset = (bg) => {
  if (bg === '#14211C') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.06)';
  if (bg === '#1A2520') return 'inset 0px 1px 0px 0px rgba(245,200,140,0.10)';
  if (bg === '#3D5448') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.10)';
  if (bg === '#D45A1B') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.14)';
  if (bg === '#2A3D34') return 'inset 0px 1px 0px 0px rgba(255,255,255,0.06)';
  return 'none';
};

// SVG architectural placeholder patterns
const TilePlaceholder = ({ bg, index, hovered }) => {
  const patterns = [
    // 0: Dot grid — Feasibility platform
    <svg key={0} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.22 : 0.14, transition: 'opacity 350ms ease-out' }}>
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 13 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 30} cy={20 + row * 32} r={1.5} fill="#F2EFE6" />
        ))
      )}
      <line x1="0" y1="130" x2="400" y2="130" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.3" />
      <line x1="200" y1="0" x2="200" y2="260" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.3" />
    </svg>,
    // 1: Floor plan — Site search
    <svg key={1} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.2 : 0.12, transition: 'opacity 350ms ease-out' }}>
      <rect x="40" y="50" width="140" height="90" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <rect x="220" y="50" width="80" height="40" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <rect x="220" y="100" width="80" height="40" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <rect x="40" y="160" width="60" height="60" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <rect x="120" y="160" width="60" height="60" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <rect x="220" y="160" width="140" height="60" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <line x1="40" y1="70" x2="180" y2="70" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.4" />
    </svg>,
    // 2: Building elevation — The Ella
    <svg key={2} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.28 : 0.18, transition: 'opacity 350ms ease-out' }}>
      <line x1="0" y1="220" x2="400" y2="220" stroke="#F2EFE6" strokeWidth="0.75" />
      {[40, 90, 150, 220, 280, 340].map((x, i) => (
        <g key={i}>
          <rect x={x} y={220 - (i % 3 === 0 ? 140 : i % 3 === 1 ? 100 : 70)} width="36" height={i % 3 === 0 ? 140 : i % 3 === 1 ? 100 : 70} fill="none" stroke="#F2EFE6" strokeWidth="0.75" />
          {Array.from({ length: 4 }, (_, row) => (
            <line key={row} x1={x + 4} y1={220 - (i % 3 === 0 ? 140 : i % 3 === 1 ? 100 : 70) + 16 + row * 20} x2={x + 32} y2={220 - (i % 3 === 0 ? 140 : i % 3 === 1 ? 100 : 70) + 16 + row * 20} stroke="#F2EFE6" strokeWidth="0.4" opacity="0.5" />
          ))}
        </g>
      ))}
    </svg>,
    // 3: Chat bubbles — Zoning chat (ink-on-stone, dark lines)
    <svg key={3} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.18 : 0.10, transition: 'opacity 350ms ease-out' }}>
      <rect x="40" y="40" width="200" height="28" rx="4" fill="none" stroke="#14211C" strokeWidth="1" />
      <rect x="40" y="80" width="160" height="28" rx="4" fill="none" stroke="#14211C" strokeWidth="1" />
      <rect x="160" y="130" width="200" height="28" rx="4" fill="none" stroke="#14211C" strokeWidth="1" />
      <rect x="180" y="170" width="160" height="28" rx="4" fill="none" stroke="#14211C" strokeWidth="1" />
    </svg>,
    // 4: Section polyline — Brickell residential
    <svg key={4} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.22 : 0.14, transition: 'opacity 350ms ease-out' }}>
      <polyline points="0,260 80,80 160,140 240,40 320,120 400,20" fill="none" stroke="#F2EFE6" strokeWidth="1" />
      <polyline points="0,260 80,200 160,230 240,160 320,200 400,120" fill="none" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.5" />
      {[80, 160, 240, 320].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#F2EFE6" strokeWidth="0.4" opacity="0.2" />)}
    </svg>,
    // 5: Stacked plates — Comps / Mixed-use tower
    <svg key={5} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.22 : 0.14, transition: 'opacity 350ms ease-out' }}>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={100 - i * 4} y={20 + i * 24} width={200 + i * 8} height="18" fill="none" stroke="#F2EFE6" strokeWidth={i === 0 ? 1 : 0.6} opacity={1 - i * 0.07} />
      ))}
    </svg>,
    // 6: Car silhouette + data-viz motif — AutoEase
    <svg key={6} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 0.32 : 0.22, transition: 'opacity 350ms ease-out' }}>
      {/* Sparkline behind */}
      <path d="M 10 190 Q 60 160 100 170 T 190 140 T 280 150 T 390 110" fill="none" stroke="#F5C88C" strokeWidth="1" opacity="0.55" />
      <path d="M 10 220 Q 60 200 100 210 T 190 180 T 280 190 T 390 160" fill="none" stroke="#F5C88C" strokeWidth="0.5" opacity="0.28" />
      {/* Horizon line */}
      <line x1="0" y1="225" x2="400" y2="225" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.4" />
      {/* Gauge arc top-right */}
      <g transform="translate(320, 60)">
        <circle cx="0" cy="0" r="34" fill="none" stroke="#F2EFE6" strokeWidth="1.2" strokeDasharray="213.6" strokeDashoffset="53.4" strokeLinecap="round" transform="rotate(-90)" opacity="0.8" />
        <circle cx="0" cy="0" r="34" fill="none" stroke="#F2EFE6" strokeWidth="0.5" opacity="0.18" />
      </g>
      {/* Data point dots */}
      {[100, 190, 280, 390].map((x, i) => {
        const ys = [170, 140, 150, 110];
        return <circle key={i} cx={x} cy={ys[i]} r={i === 1 ? 2.5 : 1.5} fill="#F5C88C" opacity={i === 1 ? 1 : 0.5} />;
      })}
      {/* Car silhouette — SUV profile, centered on horizon */}
      <g transform="translate(110, 145)" opacity="0.92">
        {/* body */}
        <path d="M 0 50 L 6 28 Q 10 22 18 20 L 40 14 Q 60 8 90 8 Q 120 8 140 14 L 162 20 Q 170 22 174 28 L 180 50 Z" fill="#F2EFE6" opacity="0.08" stroke="#F2EFE6" strokeWidth="1.1" />
        {/* greenhouse / windows */}
        <path d="M 30 22 L 45 12 Q 60 8 90 8 Q 120 8 135 12 L 150 22 Z" fill="none" stroke="#F2EFE6" strokeWidth="0.6" opacity="0.55" />
        <line x1="90" y1="8" x2="90" y2="22" stroke="#F2EFE6" strokeWidth="0.4" opacity="0.4" />
        {/* belt line */}
        <line x1="6" y1="28" x2="174" y2="28" stroke="#F2EFE6" strokeWidth="0.4" opacity="0.35" />
        {/* wheels */}
        <circle cx="36" cy="50" r="10" fill="none" stroke="#F2EFE6" strokeWidth="1" />
        <circle cx="36" cy="50" r="4" fill="#F2EFE6" opacity="0.35" />
        <circle cx="144" cy="50" r="10" fill="none" stroke="#F2EFE6" strokeWidth="1" />
        <circle cx="144" cy="50" r="4" fill="#F2EFE6" opacity="0.35" />
      </g>
      {/* Small marker above car */}
      <g transform="translate(200, 118)" opacity="0.85">
        <circle cx="0" cy="0" r="3" fill="#F5C88C" />
        <circle cx="0" cy="0" r="7" fill="none" stroke="#F5C88C" strokeWidth="0.5" opacity="0.5" />
      </g>
    </svg>,
  ];
  return patterns[index % patterns.length] || patterns[0];
};

const ProjectTile = ({ title, org, year, role, bg = '#3D5448', onNavigate, featured = false, imageIndex = 0, projectId, id }) => {
  const [hovered, setHovered] = React.useState(false);
  const light = bg === '#F2EFE6' || bg === '#E8E4D5';
  const textColor = light ? '#14211C' : '#F2EFE6';
  const mutedColor = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';
  const pid = projectId || id;

  const shadow = hovered
    ? tileBoxShadow(bg, true)
    : tileInset(bg);

  return (
    <div
      onClick={() => onNavigate && onNavigate('project', pid)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: '10px',
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        cursor: 'pointer', height: '100%', minHeight: featured ? '300px' : '220px',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1), box-shadow 250ms cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: shadow,
        border: light ? '1px solid rgba(20,33,28,0.063)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <TilePlaceholder bg={bg} index={imageIndex} hovered={hovered} />
      {/* White shimmer overlay — top-to-bottom per Figma */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: light
          ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
      }} />
      {/* Hover tint overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transition: 'background 250ms',
        background: hovered ? (light ? 'rgba(20,33,28,0.03)' : 'rgba(0,0,0,0.05)') : 'transparent',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedColor, margin: '0 0 5px' }}>
          {org} · {year}
        </p>
        <p style={{ fontSize: '16px', fontWeight: 500, color: textColor, margin: 0, lineHeight: 1.25 }}>{title}</p>
        <p style={{ fontSize: '12px', color: mutedColor, margin: '5px 0 0', lineHeight: 1.4 }}>{role}</p>
      </div>
      <div style={{
        position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 1,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 180ms, transform 180ms',
        transform: hovered ? 'translate(0,0)' : 'translate(-4px, 4px)',
        fontSize: '14px', color: textColor,
      }}>→</div>
    </div>
  );
};

Object.assign(window, { ArrowLink, TilePlaceholder, ProjectTile, tileBoxShadow, tileInset });
