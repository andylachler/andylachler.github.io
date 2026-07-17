// TryItOut.jsx — iPhone-framed live-embed component for project case studies.
//
// Loads the target app in an iframe sized to iPhone 15 proportions
// (393 × 852 CSS, scaled down to ~360w on-screen). Hardware-style bezel with
// Dynamic Island, rounded corners, side buttons, and a bottom home indicator.
//
// Behavior:
//   • Tap-to-load gate so the iframe doesn't eat bandwidth on case-study page
//     loads where the visitor isn't planning to interact.
//   • Reload button snaps the iframe back to the base URL (src key bump).
//   • Open-in-new-tab link for visitors who want the full experience.
//
// Props:
//   src:   string — URL loaded inside the frame (e.g. '/autoease/').
//   label: string — shown under the frame as the "device" caption.

const TryItOut = ({ src, label = 'Live prototype' }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);
  const [ready, setReady] = React.useState(false); // iframe onLoad fired

  // Measure screen width so we can scale down on narrow viewports.
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const recalc = () => {
      const w = wrapRef.current ? wrapRef.current.clientWidth : 420;
      // Frame outer width ≈ 380px — scale down if the column is narrower.
      const maxDeviceW = 380;
      setScale(Math.min(1, w / maxDeviceW));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    setReady(false);
  };

  const handleReload = () => {
    setReady(false);
    setReloadKey(k => k + 1);
  };

  // Constants — iPhone 15 is 393×852 CSS points. Slightly trimmed for UI fit.
  const DEVICE_W = 360;
  const DEVICE_H = 780;
  const BEZEL = 10;
  const RADIUS = 48;

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 0',
      }}
    >
      {/* Device + side buttons wrapper (scaled together) */}
      <div
        style={{
          position: 'relative',
          width: DEVICE_W,
          height: DEVICE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: (scale < 1 ? -(DEVICE_H * (1 - scale)) : 0),
        }}
      >
        {/* Side buttons — volume up/down (left) + sleep/wake (right) */}
        <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 32, background: '#0c100e', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: 160, width: 3, height: 56, background: '#0c100e', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: 225, width: 3, height: 56, background: '#0c100e', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', right: -3, top: 180, width: 3, height: 90, background: '#0c100e', borderRadius: '0 2px 2px 0' }} />

        {/* Outer frame */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #1a1d1c 0%, #0c100e 100%)',
            borderRadius: RADIUS,
            padding: BEZEL,
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.08) inset, ' +
              '0 30px 60px -20px rgba(20,33,28,0.45), ' +
              '0 8px 20px -8px rgba(20,33,28,0.25)',
            position: 'relative',
          }}
        >
          {/* Inner screen */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#000',
              borderRadius: RADIUS - BEZEL,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 110,
                height: 32,
                background: '#000',
                borderRadius: 20,
                zIndex: 5,
                pointerEvents: 'none',
              }}
            />

            {/* Either the gate (before load) or the iframe (after) */}
            {!loaded ? (
              <div
                onClick={() => setLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #1A2520 0%, #0c100e 100%)',
                  color: '#F2EFE6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '0 2rem',
                  textAlign: 'center',
                  gap: '1.25rem',
                  transition: 'background 200ms',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'rgba(245,200,140,0.12)',
                    border: '1px solid rgba(245,200,140,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7L8 5z" fill="#F5C88C" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.55)', margin: '0 0 0.5rem' }}>Interactive prototype</p>
                  <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>Tap to launch AutoEase</p>
                  <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(242,239,230,0.5)', margin: '0.5rem 0 0' }}>Loads the real Next.js build inside this frame. Browse, Answers, Sell, and Price Check all work.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Loader — shown until iframe fires onLoad */}
                {!ready && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#1A2520',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 24, height: 24,
                        border: '2px solid rgba(245,200,140,0.2)',
                        borderTopColor: '#F5C88C',
                        borderRadius: '50%',
                        animation: 'ae-spin 700ms linear infinite',
                      }}
                    />
                    <style>{`@keyframes ae-spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}
                <iframe
                  key={reloadKey}
                  src={src}
                  onLoad={() => setReady(true)}
                  title={label}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 0,
                    background: '#F2EFE6',
                    display: 'block',
                  }}
                  allow="fullscreen"
                />
              </>
            )}

            {/* Bottom home indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 4,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.35)',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption + controls */}
      <div
        style={{
          marginTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)',
          }}
        >
          {label} · iPhone 15
        </span>
        {loaded && (
          <button
            onClick={handleReload}
            style={{
              background: 'transparent',
              border: '0.5px solid rgba(20,33,28,0.2)',
              color: 'rgba(20,33,28,0.7)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.06em',
              padding: '6px 12px',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,33,28,0.05)'; e.currentTarget.style.color = '#14211C'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(20,33,28,0.7)'; }}
          >
            ↻ Reload
          </button>
        )}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'rgba(20,33,28,0.55)',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 999,
            transition: 'color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#14211C'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(20,33,28,0.55)'; }}
        >
          Open full screen ↗
        </a>
      </div>
    </div>
  );
};

window.TryItOut = TryItOut;

// DesktopFrame — browser-window-framed embed for desktop-scale wireframes.
// Same tap-to-load gate as TryItOut, but framed as a macOS-style browser
// window and scaled to fit the content column. Renders the iframe at a
// fixed design width (default 1440) and transform-scales it down.
//
// Props:
//   src:      string — URL loaded inside the frame (e.g. 'algoma/chat/').
//   label:    string — caption under the frame.
//   gateTitle:string — headline on the tap-to-load gate.
//   gateNote: string — small print on the gate.
//   designW / designH: number — native canvas size of the embedded page.

const DesktopFrame = ({ src, label = 'Interactive wireframe', gateTitle = 'Tap to load', gateNote = '', designW = 1440, designH = 900 }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const recalc = () => {
      const w = wrapRef.current ? wrapRef.current.clientWidth : designW;
      setScale(Math.min(1, w / designW));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [designW]);

  const CHROME_H = 36;

  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
      <div style={{
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 0 0 0.5px rgba(20,33,28,0.15), 0 24px 48px -16px rgba(20,33,28,0.35), 0 6px 16px -6px rgba(20,33,28,0.2)',
        background: '#0c100e',
      }}>
        {/* Browser chrome bar */}
        <div style={{
          height: CHROME_H,
          background: 'linear-gradient(180deg, #1a1d1c 0%, #121514 100%)',
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 14px',
        }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3D5448' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5a6e60' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8ba190' }} />
          <span style={{
            marginLeft: 12, flex: 1, maxWidth: 380, height: 20, borderRadius: 5,
            background: 'rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', padding: '0 10px',
            fontSize: 10, letterSpacing: '0.06em', color: 'rgba(242,239,230,0.45)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{label}</span>
        </div>

        {/* Viewport — scaled iframe or gate */}
        <div style={{ width: '100%', height: designH * scale, position: 'relative', overflow: 'hidden', background: '#F2EFE6' }}>
          {!loaded ? (
            <div
              onClick={() => setLoaded(true)}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, #1A2520 0%, #0c100e 100%)',
                color: '#F2EFE6',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: '0 2rem', textAlign: 'center', gap: '1.1rem',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 13,
                background: 'rgba(245,200,140,0.12)', border: '1px solid rgba(245,200,140,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="#F5C88C" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,239,230,0.55)', margin: '0 0 0.4rem' }}>Interactive wireframe</p>
                <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{gateTitle}</p>
                {gateNote && <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(242,239,230,0.5)', margin: '0.45rem 0 0', maxWidth: 420 }}>{gateNote}</p>}
              </div>
            </div>
          ) : (
            <>
              {!ready && (
                <div style={{ position: 'absolute', inset: 0, background: '#1A2520', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
                  <div style={{
                    width: 24, height: 24,
                    border: '2px solid rgba(245,200,140,0.2)', borderTopColor: '#F5C88C',
                    borderRadius: '50%', animation: 'ae-spin 700ms linear infinite',
                  }} />
                  <style>{`@keyframes ae-spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}
              <iframe
                key={reloadKey}
                src={src}
                onLoad={() => setReady(true)}
                title={label}
                style={{
                  width: designW, height: designH,
                  transform: `scale(${scale})`, transformOrigin: 'top left',
                  border: 0, background: '#F2EFE6', display: 'block',
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Caption + controls */}
      <div style={{ marginTop: '0.9rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)' }}>{label}</span>
        {loaded && (
          <button
            onClick={() => { setReady(false); setReloadKey(k => k + 1); }}
            style={{
              background: 'transparent', border: '0.5px solid rgba(20,33,28,0.2)',
              color: 'rgba(20,33,28,0.7)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em',
              padding: '5px 11px', borderRadius: 999, cursor: 'pointer',
            }}
          >↻ Reload</button>
        )}
        <a href={src} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(20,33,28,0.55)', textDecoration: 'none' }}
        >Open full screen ↗</a>
      </div>
    </div>
  );
};

window.DesktopFrame = DesktopFrame;
