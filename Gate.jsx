// Gate.jsx — client-side password gate.
//
// NOT real security: anyone with devtools can bypass this. The password is stored
// as a SHA-256 hash so it isn't literally readable in source, but a determined
// visitor can skip the check. This is enough to keep the site out of Google and
// away from casual link-sharers while the portfolio is a work in progress.
//
// To change the password: compute sha256(newPassword) and replace GATE_HASH below.
//   In a terminal:  printf '%s' 'yourPassword' | openssl dgst -sha256
//
// Current password: "Discover"
const GATE_HASH = 'd4a33d5b78bccebe3f16843dc30e6c0f73b4eb6efb4e7114ddfebde7fa2c9954';
const GATE_KEY  = 'lachler_gate_v1';

async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const Gate = ({ children }) => {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return localStorage.getItem(GATE_KEY) === '1'; } catch { return false; }
  });
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [busy,  setBusy]  = React.useState(false);
  const inputRef = React.useRef(null);

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
      try { localStorage.setItem(GATE_KEY, '1'); } catch {}
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

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#14211C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Inter', system-ui, sans-serif",
      zIndex: 9999,
      // Subtle vignette so the card has something to sit against
      backgroundImage: 'radial-gradient(ellipse at center, rgba(61,84,72,0.35) 0%, rgba(20,33,28,0) 70%)',
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
        .gate-input::placeholder { color: rgba(242,239,230,0.32); }
        .gate-input:focus { outline: none; border-color: rgba(242,239,230,0.4) !important; background: rgba(20,33,28,0.45) !important; }
        .gate-submit:hover:not(:disabled) { box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 20px rgba(212,90,27,0.4); }
      `}</style>

      <form
        onSubmit={submit}
        className={shake ? 'gate-shake' : ''}
        style={{
          width: '100%', maxWidth: '420px',
          background: 'rgba(242,239,230,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(242,239,230,0.12)',
          borderRadius: '20px',
          padding: '2.75rem 2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <p style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(242,239,230,0.4)',
          margin: '0 0 1.25rem',
        }}>Private preview</p>

        <h1 style={{
          fontSize: '26px', fontWeight: 500, letterSpacing: '-0.015em',
          color: '#F2EFE6', margin: '0 0 0.6rem', lineHeight: 1.2,
        }}>Not quite ready</h1>

        <p style={{
          fontSize: '15px', color: 'rgba(242,239,230,0.6)',
          lineHeight: 1.55, margin: '0 0 2rem',
        }}>
          This portfolio is still in progress. If you have the password, come on in.
        </p>

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
            background: 'rgba(20,33,28,0.35)',
            border: '1px solid ' + (error ? 'rgba(212,90,27,0.55)' : 'rgba(242,239,230,0.15)'),
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '15px',
            color: '#F2EFE6',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'border-color 150ms, background 150ms',
            marginBottom: error ? '0.5rem' : '1.25rem',
            boxSizing: 'border-box',
          }}
        />

        {error && (
          <p style={{
            fontSize: '12px', color: 'rgba(212,90,27,0.9)',
            margin: '0 0 1rem',
          }}>That's not it — try again.</p>
        )}

        <button
          type="submit"
          disabled={busy || !value}
          className="gate-submit"
          style={{
            width: '100%', position: 'relative', overflow: 'hidden',
            background: '#D45A1B',
            border: '1px solid rgba(255,255,255,0.20)',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '14px', fontWeight: 500,
            color: '#F2EFE6',
            fontFamily: "'Inter', system-ui, sans-serif",
            cursor: (busy || !value) ? 'default' : 'pointer',
            opacity: !value ? 0.5 : 1,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 16px rgba(212,90,27,0.3)',
            transition: 'opacity 150ms, box-shadow 200ms',
          }}
        >
          <span style={{
            background: 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
            position: 'absolute', inset: 0, pointerEvents: 'none',
          }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Enter →</span>
        </button>
      </form>
    </div>
  );
};

Object.assign(window, { Gate });
