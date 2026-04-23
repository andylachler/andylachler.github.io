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

// Project-specific silhouettes — used for archive tiles where we want the
// pattern to *read as* the project, not as generic architecture. Each entry
// is a viewBox="0 0 400 260" SVG drawn against a ground line at y=230 so it
// composes with the existing tile grammar. Forms are filled (not stroked)
// because the source reference is a black silhouette, and we use a single
// tone so the shapes read cleanly on any brand-color tile.
const SILHOUETTES = {
  // Mesa Verde — architectural linework of the paraboloid cluster + swooping
  // extension, sitting on the warehouse ground line. This is Andy's own
  // hand-drawn outline from Container.svg, preserved path-for-path. Strokes
  // use `vectorEffect="non-scaling-stroke"` so the line weight stays constant
  // regardless of tile size, and `preserveAspectRatio="xMidYMax meet"` roots
  // the drawing to the bottom of the tile so the mesas always "stand on" the
  // floor of the card.
  // `variant`: 'tile' (archive grid, homepage tile) → heavier stroke + higher
  // opacity so the linework reads at small size. 'hero' (project banner) →
  // subtler, since the linework sits across a larger canvas.
  'mesa-verde': (stroke, hovered, variant = 'tile') => (
    <svg viewBox="320 140 1010 440" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: variant === 'hero'
          ? (hovered ? 0.5 : 0.35)
          : (hovered ? 0.75 : 0.6),
        transition: 'opacity 350ms ease-out',
        pointerEvents: 'none' }}>
      <g fill="none" stroke={stroke} strokeWidth={variant === 'hero' ? 1.4 : 2}
        strokeLinecap="round" strokeLinejoin="round"
        vectorEffect="non-scaling-stroke">
        {/* Main building section — warehouse roof, paraboloid cluster,
            stepped blocks, and arm to the right sail */}
        <path d="M 377.539 573.107H699.668M699.668 573.107C697.681 535.907 700.027 487.371 701.853 461.764C702.051 458.989 702.243 456.482 702.422 454.289H610.359M699.668 573.107H711.471M610.359 454.289H550.163M610.359 454.289C611.539 431.208 616.103 369.15 624.916 305.571H678.029C678.009 322.572 683.492 362.069 703.695 402.749M857.829 411.405H720.52C719.577 416.791 718.714 422.175 717.926 427.536M857.829 411.405H863.337L866.485 438.643M857.829 411.405C854.825 397.507 851.998 383.695 849.343 370.094M866.485 438.643L840.911 438.945C844.583 462.945 855.469 523.376 869.632 573.107M866.485 438.643L915.271 438.066M1041.17 551.468C1083.98 508.977 1096.51 424.388 1097.43 387.405H1222.54C1242.06 433.358 1294.41 530.353 1318.15 573.107H1041.17M1041.17 551.468C1029.63 534.943 1006.7 488.911 1007.33 436.978L915.271 438.066M1041.17 551.468V573.107M849.343 370.094C831.136 276.809 821.068 193.421 818.092 160H757.503C745.858 309.19 716.779 383.996 703.695 402.749M849.343 370.094H901.107C903.992 384.852 910.864 419.108 915.271 438.066M703.695 402.749C707.804 411.022 712.522 419.344 717.926 427.536M717.926 427.536C708.715 490.159 709.659 549.671 711.471 573.107M711.471 573.107H869.632M869.632 573.107H1041.17" />
        {/* Curl across to the left sail base */}
        <path d="M 550.163 454.289H548.983C550.557 460.584 549.612 474.276 533.245 478.682C513.047 484.12 491.314 497.995 332.494 477.143" />
        {/* Left sail — inner arcs */}
        <path d="M 332.833 477.188C329.757 476.095 327.541 475.988 326.299 476.322C320.397 478.945 322.144 501.659 377.539 573.107M359.741 480.65C382.166 472.912 426.782 438.002 425.838 360.259" />
        {/* Left sail — connector up */}
        <path d="M 332.833 477.188C338.203 479.096 346.194 484.007 356.2 494.813" />
        {/* Left sail — sweep down to ground */}
        <path d="M 356.2 494.813C364.855 504.78 390.979 534.393 426.231 573.107" />
        {/* Right sail — section + ground tick */}
        <path d="M 1010.48 472.387C1019.4 470.814 1046.52 468.138 1083.66 470.027M1149.76 387.405C1160.01 414.521 1183.73 465.1 1216.25 510.701M1272.12 572.713C1251.63 555.833 1232.8 533.912 1216.25 510.701M1226.08 572.713L1216.25 510.701" />
        {/* Inner buttress + roof return */}
        <path d="M 595.015 453.896C582.556 438.814 556.93 399.366 554.097 362.226M426.231 359.078H554.097" />
        {/* Small vertical tick */}
        <path d="M 554.097 362.226V359.078" />
      </g>
    </svg>
  ),
};

// SVG architectural placeholder patterns
const TilePlaceholder = ({ bg, index, hovered, silhouette, variant = 'tile' }) => {
  // If a named silhouette is supplied, it wins — used for archive tiles
  // where the pattern should read as the specific project.
  if (silhouette && SILHOUETTES[silhouette]) {
    // Stroke/fill color: cream on dark tiles, ink on light tiles.
    const light = bg === '#F2EFE6' || bg === '#E8E4D5';
    const tone = light ? '#14211C' : '#F2EFE6';
    // `variant` lets silhouettes tune stroke weight + opacity per context.
    return SILHOUETTES[silhouette](tone, hovered, variant);
  }
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

const ProjectTile = ({ title, org, year, role, bg = '#3D5448', onNavigate, featured = false, imageIndex = 0, silhouette, projectId, id }) => {
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
      <TilePlaceholder bg={bg} index={imageIndex} hovered={hovered} silhouette={silhouette} />
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
