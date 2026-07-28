// Gate.jsx — client-side password gate.
//
// NOT real security, and specifically NOT a defence against search engines or a
// determined visitor. Every file (index.html, the .jsx sources, wireframes-data.js,
// images/) is already downloaded before this component runs — the gate hides the
// *rendering*, never the *bytes*. Anyone with devtools walks around it. It keeps
// out casual link-sharers, nothing more. Real protection needs auth at the edge
// (Cloudflare Access) so content is never served in the first place.
// Staying out of Google is handled separately, by the noindex tag in index.html.
//
// Styling (July 27, 2026): rebuilt to the v4 design language so the gate reads as
// the site's front door rather than a bolted-on interstitial. It borrows the home
// hero's grammar — same #14211C ground, mono eyebrow, Instrument Serif display
// with an italic accent word, 540px body measure, hairline-underline input, and
// the HeroArrow text CTA instead of a filled button. The old glassmorphism card
// (backdrop-blur, 20px radius, drop shadow) appeared nowhere else on the site.
//
// Deliberately NO HeroBg dot field here, though the hero has one. The field's
// ripple tracks the cursor, and on a screen whose only job is a text input that
// pulls the eye away from the thing you are trying to type into. Flat ground,
// type only. The dot field starts on the other side of the password.
//
// To change the password: compute sha256(newPassword) and replace GATE_HASH below.
//   In a terminal:  printf '%s' 'yourPassword' | openssl dgst -sha256
//
// Current password: "Discover"
const GATE_HASH = 'd4a33d5b78bccebe3f16843dc30e6c0f73b4eb6efb4e7114ddfebde7fa2c9954';
const GATE_KEY  = 'lachler_gate_v1';

// How long an unlock survives:
//   'session' — until the tab is closed. New tab or new visit re-prompts;
//               an accidental refresh mid-browse does not. (default)
//   'none'    — never remembered. Every page load re-prompts, refresh included.
//   'forever' — the old behaviour: remembered until the visitor clears site data.
const GATE_MEMORY = 'session';

const gateStore = () => (GATE_MEMORY === 'session' ? sessionStorage : localStorage);

function gateIsUnlocked() {
  if (GATE_MEMORY === 'none') return false;
  try { return gateStore().getItem(GATE_KEY) === '1'; } catch { return false; }
}

function gateRemember() {
  if (GATE_MEMORY === 'none') return;
  try { gateStore().setItem(GATE_KEY, '1'); } catch {}
}

// Anyone who unlocked under the old 'forever' behaviour still carries a
// localStorage flag that would silently let them straight back in. Drop it.
if (GATE_MEMORY !== 'forever') {
  try { localStorage.removeItem(GATE_KEY); } catch {}
}

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mirrors HeroArrow (Hero.jsx) but adds a disabled state. Kept local so the gate
// has no load-order dependency on Hero.jsx — it is the first thing rendered.
const GateArrow = ({ children, disabled }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      type="submit"
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', padding: 0,
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        fontSize: '15px', fontWeight: 500,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: disabled ? 'rgba(242,239,230,0.3)' : (hov ? '#D45A1B' : '#F2EFE6'),
        cursor: disabled ? 'default' : 'pointer',
        transition: 'color 150ms',
      }}>
      {children}
      <span style={{
        display: 'inline-block', transition: 'transform 150ms',
        transform: (hov && !disabled) ? 'translateX(4px)' : 'none',
      }}>→</span>
    </button>
  );
};

const Gate = ({ children }) => {
  const [unlocked, setUnlocked] = React.useState(gateIsUnlocked);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [busy,  setBusy]  = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  React.useEffect(() => {
    if (!unlocked) {
      // Focus next tick to beat any layout shift
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (busy || !value) return;
    setBusy(true);
    const h = await sha256Hex(value);
    if (h === GATE_HASH) {
      gateRemember();
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setBusy(false);
      // Clear the field so they can retry cleanly
      setValue('');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  if (unlocked) return children;

  // Same staggered entrance as the home hero (Hero.jsx `fade`).
  const fade = (delay, dist = 18) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : `translateY(${dist}px)`,
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#14211C',
      // overflowY + `margin: auto` on the form (rather than justifyContent:
      // center) so the card still centres when there's room but SCROLLS when
      // there isn't. A centred flex child overflows equally in both directions
      // and clips off the top of the scroll container — on a landscape phone
      // (~390px tall) that put the password input off-screen and unreachable.
      overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      padding: 'clamp(2rem, 8vh, 4rem) clamp(1.5rem, 6vw, 2.5rem)',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <style>{`
        @keyframes gate-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .gate-shake { animation: gate-shake 420ms cubic-bezier(0.36,0.07,0.19,0.97); }
        .gate-input::placeholder { color: rgba(242,239,230,0.28); }
        .gate-input:focus { outline: none; border-bottom-color: rgba(242,239,230,0.55) !important; }
      `}</style>

      <form
        onSubmit={submit}
        className={shake ? 'gate-shake' : ''}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: 'auto' }}
      >
        <p style={{
          ...fade(200),
          fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(242,239,230,0.45)', margin: '0 0 2rem',
        }}>Private</p>

        <h1 style={{
          ...fade(350),
          fontFamily: 'var(--ff-serif)',
          fontSize: 'clamp(40px, 7vw, 76px)',
          fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.02,
          color: '#F2EFE6', margin: '0 0 1.75rem',
        }}>
          By <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.72)' }}>invitation</em>
        </h1>

        <p style={{
          ...fade(500),
          fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 400, lineHeight: 1.65,
          color: 'rgba(242,239,230,0.6)', maxWidth: '540px', margin: '0 0 3rem',
        }}>
          This portfolio isn't public. If you have the password, come on in.
        </p>

        <div style={{ ...fade(620), maxWidth: '380px' }}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Password"
            value={value}
            onChange={e => { setValue(e.target.value); if (error) setError(false); }}
            className="gate-input"
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid ' + (error ? 'rgba(212,90,27,0.7)' : 'rgba(242,239,230,0.25)'),
              borderRadius: 0,
              padding: '0 0 12px',
              fontSize: '17px',
              color: '#F2EFE6',
              fontFamily: "'Inter', system-ui, sans-serif",
              transition: 'border-color 200ms',
              boxSizing: 'border-box',
            }}
          />

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1.5rem', marginTop: '1.5rem', minHeight: '22px',
          }}>
            <GateArrow disabled={busy || !value}>Enter</GateArrow>
            <span style={{
              fontSize: '11px', fontFamily: 'var(--ff-mono)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(212,90,27,0.95)',
              opacity: error ? 1 : 0, transition: 'opacity 200ms',
            }}>Not it — try again</span>
          </div>
        </div>
      </form>
    </div>
  );
};

Object.assign(window, { Gate, GateArrow });
