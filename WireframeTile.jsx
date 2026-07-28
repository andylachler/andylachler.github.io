// WireframeTile.jsx — custom tile visual for the `wireframe-components` project.
//
// Ported from Andy's "Wireframe Tile v2" mockup (Algoma Platform Design System
// export, July 28 2026). Reads left-to-right: a rotated, half-opacity wireframe
// sketch → dashed arrow → the shipped UI built from it → a strip of the actual
// catalog components underneath. It's the argument the project makes, as a
// picture.
//
// Why a component and not a tile.jpg like every other project:
//   • This is the component-catalog case study. A tile that IS live components
//     is the point, and it stays pin-sharp at any card size and any DPR — the
//     rasters elsewhere are capped by their source resolution.
//   • The composition is ~100 nested boxes of pure geometry. As markup it's
//     smaller than the JPEG would be, and editable.
//
// The mockup ships its own bottom title block + scrim. Both are DELIBERATELY
// omitted here: ReelCard already draws that treatment over every tile, so
// keeping them would double the title and break the shared card grammar.
//
// Fonts: the mockup calls for Poppins (body) and Ubuntu (numerals). Neither is
// loaded by the site, and adding two families for one tile isn't worth the
// requests — at final size the largest type here renders around 6px, where the
// substitution is invisible. Swap FONT_UI / FONT_NUM below if they're ever
// loaded for real.
const WF = (() => {
  const CREAM = 'rgb(242,239,230)';
  const MINT = '#03F3A3';
  const FONT_UI = "'Inter', system-ui, sans-serif";        // stands in for Poppins
  const FONT_NUM = "'Inter', system-ui, sans-serif";       // stands in for Ubuntu
  const FONT_MONO = "var(--ff-mono), ui-monospace, Menlo, monospace";
  return { CREAM, MINT, FONT_UI, FONT_NUM, FONT_MONO };
})();

// ── Small primitives ────────────────────────────────────────────────────────
const WfLabel = ({ children, color, top, left, size = 8, ls = 1.2 }) => (
  <div style={{
    position: 'absolute', left, top,
    fontFamily: WF.FONT_MONO, fontSize: size, letterSpacing: ls,
    color, textTransform: 'uppercase', whiteSpace: 'nowrap',
  }}>{children}</div>
);

// Outlined box in the wireframe sketch — everything there is 1.5px linework.
const WfBox = ({ dashed, style, children }) => (
  <div style={{
    border: `1.5px ${dashed ? 'dashed' : 'solid'} ${WF.CREAM}`,
    boxSizing: 'border-box', ...style,
  }}>{children}</div>
);

const WfPill = ({ label, style }) => (
  <div style={{
    fontFamily: WF.FONT_UI, fontSize: 7.5, fontWeight: 500, lineHeight: 1,
    whiteSpace: 'nowrap', borderRadius: 90, padding: '4px 10px', ...style,
  }}>{label}</div>
);

const WfStat = ({ label, value, delta }) => (
  <div style={{
    flex: 1, background: '#FFFFFF', border: '1px solid #ECECEC', borderRadius: 8,
    padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2,
  }}>
    <div style={{ fontFamily: WF.FONT_MONO, fontSize: 6.5, letterSpacing: 0.8, color: '#999999', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
      <div style={{ fontFamily: WF.FONT_NUM, fontWeight: 700, fontSize: 16, color: '#0D292B' }}>{value}</div>
      {delta && <div style={{ fontFamily: WF.FONT_MONO, fontSize: 6.5, color: '#2FB297' }}>{delta}</div>}
    </div>
  </div>
);

const WfSwatch = ({ bg }) => (
  <div style={{ width: 14, height: 14, borderRadius: 4, background: bg, border: '1px solid rgba(242,239,230,0.25)', boxSizing: 'border-box' }} />
);

// ── The 640×480 composition ─────────────────────────────────────────────────
// Authored at the mockup's native size and scaled as a unit, so every offset
// below is the mockup's own number — no re-derivation, no drift.
const WireframeStage = ({ hovered }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, width: 640, height: 480,
    background: 'linear-gradient(160deg, rgb(22,38,31) 0%, rgb(11,21,19) 70%)',
    fontFamily: WF.FONT_UI,
  }}>
    {/* Aquamarine glow behind the shipped UI */}
    <div style={{
      position: 'absolute', left: 180, top: -40, width: 560, height: 460,
      background: 'radial-gradient(closest-side, rgba(3,243,163,0.16), rgba(3,243,163,0) 70%)',
      opacity: hovered ? 1 : 0.82, transition: 'opacity 400ms ease-out',
    }} />

    {/* ── 01 · the wireframe sketch ── */}
    <WfLabel left={40} top={78} color="rgba(242,239,230,0.55)">01 · Wireframe</WfLabel>
    <div style={{
      position: 'absolute', left: 36, top: 100, width: 224, height: 190,
      opacity: 0.55, transform: 'rotate(-2deg)',
      border: `1.5px solid ${WF.CREAM}`, borderRadius: 10, display: 'flex', overflow: 'hidden',
    }}>
      {/* rail */}
      <div style={{ width: 30, borderRight: `1.5px solid ${WF.CREAM}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 10, boxSizing: 'border-box', flexShrink: 0 }}>
        <WfBox style={{ width: 11, height: 11, borderRadius: 3 }} />
        <WfBox style={{ width: 9, height: 9, borderRadius: 2 }} />
        <WfBox dashed style={{ width: 9, height: 9, borderRadius: 2 }} />
        <WfBox style={{ width: 9, height: 9, borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderBottom: `1.5px solid ${WF.CREAM}` }}>
          <div style={{ width: 64, height: 0, borderTop: `1.5px solid ${WF.CREAM}` }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <WfBox style={{ width: 34, height: 10, borderRadius: 90 }} />
            <WfBox style={{ width: 12, height: 12, borderRadius: '50%' }} />
          </div>
        </div>
        {/* body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 10px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1].map(i => (
              <WfBox key={i} style={{ flex: 1, height: 30, borderRadius: 5, padding: '5px 7px' }}>
                <div style={{ width: '60%', height: 0, borderTop: `1.5px solid ${WF.CREAM}` }} />
              </WfBox>
            ))}
          </div>
          <WfBox style={{ flex: 1, borderRadius: 5, display: 'flex', alignItems: 'flex-end', gap: 5, padding: '7px 8px' }}>
            {[[42, 0], [58, 0], [90, 1], [70, 0], [52, 0]].map(([h, d], i) => (
              <WfBox key={i} dashed={!!d} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0' }} />
            ))}
          </WfBox>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
            <WfBox dashed style={{ width: 46, height: 15, borderRadius: 90 }} />
            <WfBox style={{ width: 46, height: 15, borderRadius: 90 }} />
          </div>
        </div>
      </div>
    </div>

    {/* ── the arrow between states ── */}
    <div style={{ position: 'absolute', left: 262, top: 194, width: 30, height: 0, borderTop: '1.6px dashed rgba(3,243,163,0.8)' }} />
    <svg style={{ position: 'absolute', left: 287, top: 189 }} width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 1 L8 5 L1 9" stroke="rgba(3,243,163,0.8)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>

    {/* ── 02 · the shipped UI ── */}
    <WfLabel left={296} top={42} color={WF.MINT}>02 · Design system build</WfLabel>
    <div style={{
      position: 'absolute', left: 296, top: 58, width: 300, height: 252,
      borderRadius: 10, background: '#FFFFFF', overflow: 'hidden', display: 'flex',
      boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 4px 14px rgba(0,0,0,0.35)',
    }}>
      <div style={{ width: 40, background: '#194651', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingTop: 12, boxSizing: 'border-box', flexShrink: 0 }}>
        <div style={{ width: 14, height: 14, borderRadius: 4, background: WF.MINT }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(242,239,230,0.28)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(242,239,230,0.9)', outline: '2px solid rgba(3,243,163,0.5)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(242,239,230,0.28)' }} />
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(242,239,230,0.28)' }} />
      </div>
      <div style={{ flex: 1, background: '#F7F7F0', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#FFFFFF', borderBottom: '1px solid #ECECEC' }}>
          <div style={{ fontFamily: WF.FONT_NUM, fontWeight: 700, fontSize: 12, color: '#0D292B' }}>Site capacity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <WfPill label="Zoning R-4" style={{ fontSize: 7, color: '#194651', background: '#D5F8EB', padding: '3px 8px' }} />
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #03F3A3, #1EA5E1)' }} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: '10px 14px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <WfStat label="Max units" value="128" delta="+12%" />
            <WfStat label="Buildable SF" value="96.4k" />
          </div>
          <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #ECECEC', borderRadius: 8, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ fontFamily: WF.FONT_MONO, fontSize: 6.5, letterSpacing: 0.8, color: '#999999', textTransform: 'uppercase' }}>Yield by scheme</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 7 }}>
              {[[42, '#99E3B2'], [58, '#2FB297'], [90, '#3479FE'], [70, '#2FB297'], [52, '#99E3B2'], [34, '#D5F8EB']].map(([h, c], i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: c, borderRadius: '2px 2px 0 0' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['#2FB297', 'As-of-right'], ['#3479FE', 'With bonus']].map(([c, t]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
                  <div style={{ fontFamily: WF.FONT_UI, fontSize: 6, color: '#999999' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
            <WfPill label="Compare" style={{ color: '#194651', border: '1px solid #D9D9D9', background: '#FFFFFF' }} />
            <WfPill label="Run study" style={{ color: '#FFFFFF', background: '#3479FE' }} />
          </div>
        </div>
      </div>
    </div>

    {/* cursor */}
    <svg style={{ position: 'absolute', left: 556, top: 292, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }} width="15" height="17" viewBox="0 0 15 17" fill="none">
      <path d="M1 1 L13.5 8.6 L7.4 9.9 L4.6 15.6 Z" fill="#0D292B" stroke="#FFFFFF" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>

    {/* ── the catalog strip ── */}
    <div style={{
      position: 'absolute', left: 48, top: 318, right: 48,
      display: 'flex', alignItems: 'flex-start', gap: 22,
      paddingTop: 10, borderTop: '1px dashed rgba(242,239,230,0.18)',
    }}>
      {[
        ['Button / Primary', <WfPill label="Run study" style={{ fontSize: 8, color: '#FFFFFF', background: '#3479FE', padding: '5px 12px', alignSelf: 'flex-start' }} />],
        ['Button / Secondary', <WfPill label="Compare" style={{ fontSize: 8, color: WF.CREAM, border: '1px solid rgba(242,239,230,0.4)', alignSelf: 'flex-start' }} />],
        ['Chip / Zoning', <WfPill label="Zoning R-4" style={{ color: '#194651', background: '#D5F8EB', alignSelf: 'flex-start' }} />],
        ['Avatar', <div style={{ width: 17, height: 17, borderRadius: '50%', background: 'linear-gradient(135deg, #03F3A3, #1EA5E1)' }} />],
        ['Tokens / Core', <div style={{ display: 'flex', gap: 4 }}>{['#3479FE', '#03F3A3', '#D5F8EB', '#194651'].map(c => <WfSwatch key={c} bg={c} />)}</div>],
      ].map(([label, node]) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: WF.FONT_MONO, fontSize: 6.5, letterSpacing: 0.9, color: 'rgba(242,239,230,0.5)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</div>
          {node}
        </div>
      ))}
    </div>
  </div>
);

// ── Scaler ──────────────────────────────────────────────────────────────────
// The card is 4:3 but its pixel width varies (up to 640 in the reel, full-bleed
// on mobile, narrower in the Work grid). Scaling the whole 640×480 stage by
// width keeps every internal proportion exact — the alternative, making 100
// nested boxes fluid, would drift.
const WireframeTile = ({ hovered = false }) => {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w) setScale(w / 640);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'linear-gradient(160deg, rgb(22,38,31) 0%, rgb(11,21,19) 70%)',
    }}>
      {/* Held back until measured — a flash of the unscaled 640px stage inside a
          narrow mobile card is far uglier than one frame of flat background. */}
      {scale !== null && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 640, height: 480,
          transform: `scale(${scale * (hovered ? 1.03 : 1)})`,
          transformOrigin: 'top left',
          transition: 'transform 600ms cubic-bezier(0.2,0.7,0.2,1)',
        }}>
          <WireframeStage hovered={hovered} />
        </div>
      )}
    </div>
  );
};

// Registry the tile system reads — see ProjectVisual in ProjectTile.jsx.
window.CUSTOM_TILES = Object.assign(window.CUSTOM_TILES || {}, {
  'wireframe-components': WireframeTile,
});
Object.assign(window, { WireframeTile, WireframeStage });
