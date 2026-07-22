// FullProductStudyPage.jsx — "Full product study" (AutoEase).
// End-to-end product story told as numbered steps: idea → market scan →
// assumptions → research → prioritization → lowfi → hifi → working
// prototype. Research content sources from autoease/Case Study/ (2026
// re-synthesis); hi-fi comps are live screens of the Vercel prototype.

// ── 02 · Market scan — services × features ────────────────────────────────
// hl: the capability that appeals and feeds the AutoEase featureset.
const FPS_MARKET_COLS = ['Upfront pricing', 'Ownership cost data', 'History & reliability', 'Editorial & reviews', 'No-contact browsing'];
const FPS_MARKET_ROWS = [
  { s: 'Edmunds', cells: [['Fair-price ranges', false], ['True Cost to Own®', true], ['Via partner reports', false], ['Deep editorial bench', true], ['Lead-gen forms gate contact', false]] },
  { s: 'CarMax', cells: [['Fixed, no-haggle price', true], ['—', false], ['AutoCheck included', false], ['—', false], ['Retail flow, account required', false]] },
  { s: 'KBB', cells: [['Price benchmark standard', true], ['5-Year Cost to Own', true], ['—', false], ['Expert + owner reviews', false], ['Browsing open, buying referred', false]] },
  { s: 'Auto Trader', cells: [['Varies by dealer listing', false], ['—', false], ['Report upsell', false], ['Some editorial', false], ['Contact pushed early', false]] },
  { s: 'Carvana', cells: [['Fixed price, end-to-end online', true], ['—', false], ['Free history on listings', true], ['—', false], ['Fully self-serve until checkout', true]] },
  { s: 'eBay Motors', cells: [['Auction — price found at close', false], ['—', false], ['Seller-provided', false], ['—', false], ['Anonymous until bid', false]] },
];

// ── 03 · Assumptions carried into the featureset ──────────────────────────
const FPS_ASSUMPTIONS = ['The price on the screen is the price', 'Total 5-year cost beats sticker price', 'History & reliability shown before contact', 'Reviews with no dealership incentive', 'Side-by-side comparison as a first-class tool', 'Browsing never costs your phone number'];

// ── 04 · Research — participants + persona trade-off matrix ───────────────
const FPS_PARTICIPANTS = 'Emma Wood · George Hayes · Hamid Jahandar · Jackson Hayes · Nancy Gillespie · Octavio Vidal · Ulrich Lachler · Priya Raman · Marcus Bell';
const FPS_PERSONAS = [
  { name: 'Alex — the Spreadsheet Buyer', body: 'Wants every number and the sources behind it. Builds his own comparison stack across six sites today. AutoEase wins him by letting him dig without hitting a lead-gen wall.' },
  { name: 'John — the Fixed-Price Traditionalist', body: 'Hates haggling more than he hates paying a premium. Named CarMax and Tesla unprompted — the price on the screen is the price. AutoEase wins him by never making price a negotiation.' },
  { name: 'Emma — the Delegating Optimizer', body: 'Wants a confident answer, not a research project. Will happily hand the decision to a tool she trusts. AutoEase wins her with one defensible number per car and a short path to done.' },
];
const FPS_MATRIX = [
  ['Wants more data', 2, 1, 0],
  ['Wants fewer decisions', 0, 1, 2],
  ['Will do the research themselves', 2, 1, 0],
  ['Sensitive to sales pressure', 1, 2, 2],
  ['Monthly-cost mindset', 2, 1, 1],
  ['Fixed-price mindset', 1, 2, 2],
  ['Trusts brand reputation', 1, 2, 2],
  ['Trusts third-party data', 2, 2, 2],
];

// ── 05 · Feature prioritization, ranked by evidence ───────────────────────
const FPS_PRIORITIES = [
  { tier: 2, f: 'Transparent, upfront pricing', ev: '8 of 9 participants, unprompted' },
  { tier: 2, f: 'Side-by-side comparison tool', ev: '6 of 9 participants' },
  { tier: 2, f: '5-year cost of ownership estimate', ev: '6 of 9 participants' },
  { tier: 2, f: 'Vehicle history + reliability score', ev: '6 of 9 participants' },
  { tier: 2, f: 'Independent / user reviews', ev: '5 of 9 participants' },
  { tier: 1, f: 'No-contact / anonymous browsing', ev: '5 of 9 — medium-high' },
  { tier: 1, f: 'Financing calculator (monthly view)', ev: '4 of 9 — medium' },
  { tier: 1, f: 'Insurance estimator', ev: '3 of 9 — medium' },
  { tier: 1, f: 'Location-specific inventory filtering', ev: '2 of 9 — but acute where it hit' },
  { tier: 0, f: 'Online transaction processing as a headline', ev: 'Users still want to see the car first' },
  { tier: 0, f: 'Personalized recommendations', ev: 'Nobody asked — they asked for better filters' },
  { tier: 0, f: 'Visual / interactive car tours', ev: 'Never prioritized over the cost problem' },
];

// Traffic-light tones tuned to the palette.
const FPS_TONE = [
  { bg: 'rgba(178,58,45,0.1)', fg: '#9C3527', b: 'rgba(178,58,45,0.22)' },   // 0 — weak / cut
  { bg: 'rgba(217,164,65,0.16)', fg: '#8A6414', b: 'rgba(217,164,65,0.35)' }, // 1 — partial
  { bg: 'rgba(61,84,72,0.13)', fg: '#3D5448', b: 'rgba(61,84,72,0.3)' },      // 2 — strong
];

// ── 06 · Lowfi wireframes — native linework strip ─────────────────────────
const FPS_LOWFI = [
  { t: 'Welcome', rows: [[0.55, 0.1], [0.8, 0.34], [0.8, 0.08], [0.5, 0.08]], cta: true },
  { t: 'Home hub', rows: [[0.85, 0.16], [0.85, 0.16], [0.85, 0.16], [0.85, 0.16]], cta: false },
  { t: 'Guided Q&A', rows: [[0.7, 0.08], [0.85, 0.12], [0.85, 0.12], [0.85, 0.12]], cta: true },
  { t: 'Results', rows: [[0.6, 0.08], [0.85, 0.22], [0.85, 0.22], [0.85, 0.22]], cta: false },
  { t: 'Vehicle detail', rows: [[0.85, 0.3], [0.6, 0.08], [0.85, 0.14], [0.85, 0.14]], cta: true },
  { t: 'Price check', rows: [[0.7, 0.1], [0.5, 0.24], [0.85, 0.1], [0.85, 0.1]], cta: true },
];

const LowfiPhone = ({ frame }) => {
  const W = 120, H = 240, pad = 10;
  let y = 18;
  const rects = frame.rows.map(([w, h]) => {
    const r = { x: pad, y, w: (W - pad * 2) * w, h: (H - 60) * h };
    y += (H - 60) * h + 8;
    return r;
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: '100%' }} aria-label={`Lowfi sketch — ${frame.t}`}>
        <rect x="1.5" y="1.5" width={W - 3} height={H - 3} rx="14" fill="none" stroke="rgba(20,33,28,0.55)" strokeWidth="1.5" />
        <line x1={W / 2 - 12} y1="9" x2={W / 2 + 12} y2="9" stroke="rgba(20,33,28,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="2.5" fill="none" stroke="rgba(20,33,28,0.4)" strokeWidth="1" strokeDasharray={i % 2 ? 'none' : '3 2.5'} />
        ))}
        {frame.cta && <rect x={pad} y={H - 30} width={W - pad * 2} height="16" rx="8" fill="rgba(212,90,27,0.25)" stroke="#D45A1B" strokeWidth="1" />}
      </svg>
      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.45)' }}>{frame.t}</span>
    </div>
  );
};

// ── 07 · Hi-fi — live prototype screens in phone bezels ───────────────────
const FPS_HIFI = [
  { src: 'https://autoease-prototype.vercel.app/', label: 'Home — the hub, not a funnel' },
  { src: 'https://autoease-prototype.vercel.app/results/', label: 'Results — one number per car' },
  { src: 'https://autoease-prototype.vercel.app/sell/', label: 'Sell — same grammar as Browse' },
  { src: 'https://autoease-prototype.vercel.app/price-check/', label: 'Price check — the math, visible' },
];

const HifiPhone = ({ shot }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
    <div style={{ width: '212px', padding: '7px', background: '#0B1513', borderRadius: '30px', border: '1px solid rgba(20,33,28,0.2)', boxShadow: '0 12px 32px rgba(20,33,28,0.18), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
      <div style={{ borderRadius: '23px', overflow: 'hidden', background: '#1A2520', height: `${Math.round(198 * 852 / 393)}px`, position: 'relative' }}>
        <iframe src={shot.src} title={shot.label} loading="lazy" scrolling="no" tabIndex={-1} aria-hidden="true"
          style={{ width: '393px', height: '852px', border: 0, transformOrigin: 'top left', transform: `scale(${198 / 393})`, pointerEvents: 'none', display: 'block' }} />
      </div>
    </div>
    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.45)', textAlign: 'center', maxWidth: '200px' }}>{shot.label}</span>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────
const FullProductStudyPage = ({ onNavigate }) => {
  const isMobile = (window.useIsMobile || (() => false))(768);
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const th = { fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: ST.faint, textAlign: 'left', padding: '0.7rem 0.9rem', borderBottom: '0.5px solid rgba(20,33,28,0.15)' };
  const td = { fontSize: '13px', lineHeight: 1.5, color: 'rgba(20,33,28,0.7)', padding: '0.65rem 0.9rem', borderBottom: '0.5px solid rgba(20,33,28,0.07)', verticalAlign: 'top' };

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem' }}>
      <StudyHero
        isMobile={isMobile}
        bg="#1A2520"
        eyebrow="Case study · Full product study · AutoEase"
        title="One product, end to end — from a question to a"
        titleEm="working prototype"
        sub="AutoEase is a self-directed study of the used-car buying problem: research, market analysis, personas, prioritization, wireframes, and a built prototype — the complete arc of taking a product from idea to interface."
        meta={[
          { label: 'Role', value: 'Research · Strategy · Product · Brand · UI' },
          { label: 'Timeline', value: '2024 origin · 2026 re-synthesis' },
          { label: 'Status', value: 'Working prototype, live below' },
        ]}
      />

      {/* About */}
      <StudySection first>
        <StudyLabel>About</StudyLabel>
        <StudyH2>Buying a used car is a financial decision sold as a sales funnel</StudyH2>
        <StudyLead>Every person I interviewed described used-car buying in terms of what they couldn't see — real prices, real reliability, real total cost, and real intent from the salesperson. The incumbents aren't missing features; they're solving a different objective than the user. That asymmetry is a design problem, and this study walks the full arc of answering it.</StudyLead>
      </StudySection>

      {/* 01 Product idea */}
      <StudySection>
        <StudyLabel n="01">Product idea</StudyLabel>
        <StudyH2>The user needs better information tools when thinking about what car to buy</StudyH2>
        <StudyLead>The thesis: a neutral intelligence layer between buyers and the industry — fixed pricing, full vehicle history, five-year true cost, and unbiased reviews, all before a salesperson ever gets your phone number. Not another marketplace; the information side of the transaction, built to support the buyer rather than monetize the lead.</StudyLead>
      </StudySection>

      {/* 02 Market scan */}
      <StudySection>
        <StudyLabel n="02">Test this</StudyLabel>
        <StudyH2>What is available on the market now?</StudyH2>
        <StudyLead>Here are the services consumers actually use today and how their features stack up. The highlighted cells are the capabilities that appeal — the ones I judged genuinely helpful to buyers, and carried into the featureset.</StudyLead>
        <div style={{ overflowX: 'auto', marginTop: '2rem', border: '0.5px solid rgba(20,33,28,0.12)', borderRadius: '10px', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr>
                <th style={th}>Service</th>
                {FPS_MARKET_COLS.map(c => <th key={c} style={th}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {FPS_MARKET_ROWS.map((r, ri) => (
                <tr key={ri}>
                  <td style={{ ...td, fontWeight: 500, color: ST.ink, whiteSpace: 'nowrap' }}>{r.s}</td>
                  {r.cells.map(([txt, hl], ci) => (
                    <td key={ci} style={{ ...td, background: hl ? FPS_TONE[2].bg : 'transparent', color: hl ? FPS_TONE[2].fg : td.color, fontWeight: hl ? 500 : 400 }}>{txt}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudySection>

      {/* 03 User assumptions */}
      <StudySection>
        <StudyLabel n="03">User assumptions</StudyLabel>
        <StudyH2>The assumptions carried into the featureset</StudyH2>
        <StudyLead>Picking the capabilities that appealed from the market scan and combining them into the working assumptions for the AutoEase featureset — each one phrased as the promise it makes to the buyer.</StudyLead>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem', marginTop: '2rem' }}>
          {FPS_ASSUMPTIONS.map((a, i) => (
            <div key={i} style={{ background: FPS_TONE[2].bg, border: `0.5px solid ${FPS_TONE[2].b}`, borderRadius: '8px', padding: '0.9rem 1.1rem', fontSize: '13.5px', fontWeight: 500, color: FPS_TONE[2].fg, lineHeight: 1.45 }}>{a}</div>
          ))}
        </div>
      </StudySection>

      {/* 04 User research */}
      <StudySection>
        <StudyLabel n="04">User research</StudyLabel>
        <StudyH2>Nine interviews, three personas</StudyH2>
        <StudyLead>I ran nine semi-structured interviews, 45–90 minutes each, across a deliberately wide range — ages mid-20s to 73, urban and suburban, first-time buyers to lifelong brand loyalists, including a first-time EV cross-shopper and a suburban parent replacing the family car. One interview was recorded and fully transcribed as a gold-standard reference for verbatim quotes. The patterns clustered into three evidence-based personas.</StudyLead>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.06em', color: ST.faint, margin: '1.25rem 0 0', lineHeight: 1.8 }}>{FPS_PARTICIPANTS}</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '2rem' }}>
          {FPS_PERSONAS.map((p, i) => (
            <div key={i} style={{ padding: '1.4rem', background: ST.cardBg, borderRadius: '8px', border: ST.cardBorder }}>
              <p style={{ fontSize: '14.5px', fontWeight: 500, color: ST.ink, margin: '0 0 0.5rem' }}>{p.name}</p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(20,33,28,0.7)', margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
        <div style={{ overflowX: 'auto', marginTop: '1.5rem', border: '0.5px solid rgba(20,33,28,0.12)', borderRadius: '10px', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr>
                <th style={th}>How the personas trade off</th>
                {['Alex', 'John', 'Emma'].map(n => <th key={n} style={{ ...th, textAlign: 'center' }}>{n}</th>)}
              </tr>
            </thead>
            <tbody>
              {FPS_MATRIX.map(([dim, a, j, e], ri) => (
                <tr key={ri}>
                  <td style={{ ...td, fontWeight: 500, color: ST.ink }}>{dim}</td>
                  {[a, j, e].map((v, ci) => (
                    <td key={ci} style={{ ...td, background: FPS_TONE[v].bg, color: FPS_TONE[v].fg, textAlign: 'center', fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 500 }}>
                      {v === 2 ? 'Strong' : v === 1 ? 'Partial' : 'Low'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <StudyMuted>The three personas converge on transparency, third-party trust, and a no-pressure flow. They diverge on how much control they want over the decision — a healthy AutoEase lets Alex dig, lets John skip, and lets Emma delegate, without forcing any of them down a single funnel.</StudyMuted>
      </StudySection>

      {/* 05 Prioritization */}
      <StudySection>
        <StudyLabel n="05">Data-driven analysis</StudyLabel>
        <StudyH2>The feature set, ranked by evidence</StudyH2>
        <StudyLead>Based on the interviews and how participants actually approach looking for a car, each candidate feature is held to its evidence — built now, considered, or deliberately cut.</StudyLead>
        <div style={{ display: 'grid', gap: '0.5rem', marginTop: '2rem', maxWidth: '900px' }}>
          {FPS_PRIORITIES.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.4fr) minmax(0, 1fr) 90px', gap: isMobile ? '0.25rem' : '1rem', alignItems: 'center', background: FPS_TONE[p.tier].bg, border: `0.5px solid ${FPS_TONE[p.tier].b}`, borderRadius: '8px', padding: '0.75rem 1.1rem' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 500, color: ST.ink }}>{p.f}</span>
              <span style={{ fontSize: '12.5px', color: 'rgba(20,33,28,0.55)' }}>{p.ev}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, color: FPS_TONE[p.tier].fg, textAlign: isMobile ? 'left' : 'right' }}>
                {p.tier === 2 ? 'Core' : p.tier === 1 ? 'Later' : 'Cut'}
              </span>
            </div>
          ))}
        </div>
      </StudySection>

      {/* 06 Lowfi */}
      <StudySection>
        <StudyLabel n="06">Lowfi wireframes</StudyLabel>
        <StudyH2>Sketching the basic operations and flow</StudyH2>
        <StudyLead>Sketched out the basic operations of the app and how a user would move through it — four entry points (Browse, guided Q&A, Sell, Price Check) resolving distinct intents, with the home screen as a hub rather than a funnel.</StudyLead>
        <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '2.5rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', marginTop: '2.25rem', padding: '2rem', background: ST.cardBg, border: ST.cardBorder, borderRadius: '10px' }}>
          {FPS_LOWFI.map((f, i) => <LowfiPhone key={i} frame={f} />)}
        </div>
      </StudySection>

      {/* 07 Hifi */}
      <StudySection>
        <StudyLabel n="07">Hi-fi wireframes</StudyLabel>
        <StudyH2>From sketch to high-fidelity screens</StudyH2>
        <StudyLead>The sketches became high-fidelity comps in the AutoEase brand system — forest-deep surfaces, amber reserved for the highest-stakes value on each screen, and money rendered in a dedicated numeric scale. Shown here as live screens from the built prototype.</StudyLead>
        <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '2rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', marginTop: '2.25rem' }}>
          {FPS_HIFI.map((s, i) => <HifiPhone key={i} shot={s} />)}
        </div>
      </StudySection>

      {/* 08 Working prototype */}
      <StudySection>
        <StudyLabel n="08">Working prototype</StudyLabel>
        <StudyH2>The high-fidelity framework, built out into working logic</StudyH2>
        <StudyLead>The comps became the framework for the base design, and the logic was built out into an interactive prototype — a full Next.js application with the question flow, ranked results, vehicle detail, Sell, and Price Check all wired up. Try it below.</StudyLead>
        <div style={{ marginTop: '2rem' }}>
          <TryItOut src="https://autoease-prototype.vercel.app/" label="AutoEase" />
          <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <a href="autoease-v2/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.55)', textDecoration: 'none' }}>View the v2 design-language board ↗</a>
          </p>
        </div>
      </StudySection>

      <StudyTail
        outcome="Prototype complete and live — Browse, guided Q&A with Fit ranking, Sell with transparent deductions, and Price Check with verdict scoring, all in a single Next.js build. Used as a portfolio-facing study of consumer-finance UI patterns applied to a non-finance domain."
        credits="Independent project. Research, strategy, product design, interaction design, brand, and prototype build: Andreas Lächler."
        nextId="wireframe-components"
        onNavigate={onNavigate}
        isMobile={isMobile}
      />
    </main>
  );
};

window.FullProductStudyPage = FullProductStudyPage;
