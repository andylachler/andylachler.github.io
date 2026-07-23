// FullProductStudyPage.jsx — "Full product study" (AutoEase).
// End-to-end product story told as numbered steps: idea → market scan →
// assumptions → research → prioritization → lowfi → hifi → working
// prototype. Research content sources from autoease/Case Study/ (2026
// re-synthesis); hi-fi comps are live screens of the Vercel prototype.

// ── 02 · Market scan — configurator-style feature comparison ──────────────
// Services read as columns (like trims on a configurator, or tiers on a
// pricing page); AutoEase sits at the end as the highlighted "tier" that
// combines the capabilities worth keeping. 2 = full, 1 = partial, 0 = none.
const FPS_MARKET_SERVICES = ['Edmunds', 'CarMax', 'KBB', 'Auto Trader', 'Carvana', 'eBay Motors'];
const FPS_MARKET_FEATURES = [
  { f: 'Upfront, fixed pricing',      v: [1, 2, 1, 0, 2, 0], note: 'CarMax and Carvana: the price on screen is the price. Edmunds/KBB publish benchmarks, not prices.' },
  { f: '5-year ownership cost',       v: [2, 0, 2, 0, 0, 0], note: 'Edmunds True Cost to Own® and KBB 5-Year Cost to Own — the two that treat a car as a financial decision.' },
  { f: 'History & reliability',       v: [1, 2, 0, 1, 2, 1], note: 'CarMax and Carvana include reports free; elsewhere it’s an upsell or seller-provided.' },
  { f: 'Unbiased reviews',            v: [2, 0, 2, 1, 0, 0], note: 'Edmunds and KBB carry real editorial benches; marketplaces don’t review what they sell.' },
  { f: 'Side-by-side comparison',     v: [1, 1, 1, 1, 0, 0], note: 'Exists everywhere in some form — nowhere as a first-class decision tool.' },
  { f: 'No-contact browsing',         v: [0, 1, 1, 0, 2, 2], note: 'Carvana is self-serve until checkout; eBay is anonymous until you bid. Lead-gen sites gate on contact info.' },
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
// Spectrum data: each dimension is a Low → High track; the three personas
// sit at their position along it (0 low · 1 mid · 2 high).
const FPS_SPECTRUM = [
  ['Appetite for raw data', 2, 1, 0],
  ['Wants the decision made for them', 0, 1, 2],
  ['Will do the research themselves', 2, 1, 0],
  ['Sensitivity to sales pressure', 1, 2, 2],
  ['Monthly-cost mindset', 2, 1, 1],
  ['Fixed-price mindset', 1, 2, 2],
  ['Trust in brand reputation', 1, 2, 2],
  ['Trust in third-party data', 2, 2, 2],
];
const FPS_PERSONA_KEYS = [
  { k: 'A', name: 'Alex', color: '#3D5448' },
  { k: 'J', name: 'John', color: '#D45A1B' },
  { k: 'E', name: 'Emma', color: '#14211C' },
];

// One dimension row: label + track with dodged persona markers.
const SpectrumRow = ({ dim, values, isMobile }) => {
  // group markers that share a position so they fan out instead of stacking
  const groups = {};
  values.forEach((v, i) => { (groups[v] = groups[v] || []).push(i); });
  const posPct = [8, 50, 92];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? '0.5rem' : '2rem', alignItems: 'center', padding: '0.85rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.07)' }}>
      <span style={{ fontSize: '13.5px', fontWeight: 500, color: ST.ink }}>{dim}</span>
      <div style={{ position: 'relative', height: '30px' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(20,33,28,0.15)' }} />
        {[0, 1, 2].map(p => (
          <div key={p} style={{ position: 'absolute', top: '50%', left: `${posPct[p]}%`, width: '1px', height: '7px', transform: 'translate(-0.5px, -50%)', background: 'rgba(20,33,28,0.2)' }} />
        ))}
        {values.map((v, i) => {
          const group = groups[v];
          const gi = group.indexOf(i);
          const dodge = (gi - (group.length - 1) / 2) * 24;
          const p = FPS_PERSONA_KEYS[i];
          return (
            <span key={i} title={`${p.name} — ${['low', 'mid', 'high'][v]}`} style={{
              position: 'absolute', top: '50%', left: `calc(${posPct[v]}% + ${dodge}px)`,
              transform: 'translate(-50%, -50%)',
              width: '22px', height: '22px', borderRadius: '50%',
              background: p.color, color: '#F2EFE6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 500,
              border: '1.5px solid #F2EFE6', boxShadow: '0 1px 3px rgba(20,33,28,0.2)',
            }}>{p.k}</span>
          );
        })}
      </div>
    </div>
  );
};

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

// ── 06 · Lowfi wireframes — Andy's actual sketch ──────────────────────────
// The real thing, from image-sources/AutoEase/Image 1.png (copied to
// images/autoease/sketch-lowfi.png — intentionally outside the manifest's
// naming scheme so it never lands in the gallery).
const FPS_SKETCH = 'images/autoease/sketch-lowfi.png';

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

      {/* 02 Market scan — configurator-style comparison, AutoEase as the
          highlighted tier that combines what's worth keeping. */}
      <StudySection>
        <StudyLabel n="02">Test this</StudyLabel>
        <StudyH2>What is available on the market now?</StudyH2>
        <StudyLead>Here are the services consumers actually use today, compared the way a configurator compares trims — feature by feature. No single incumbent covers the whole decision; AutoEase is specified as the tier that does.</StudyLead>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table style={{ borderCollapse: 'separate', borderSpacing: 0, minWidth: '900px', width: '100%', background: '#FFFFFF', border: '0.5px solid rgba(20,33,28,0.12)', borderRadius: '10px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th style={{ ...th, width: '220px' }}>Feature</th>
                {FPS_MARKET_SERVICES.map(s => (
                  <th key={s} style={{ ...th, textAlign: 'center' }}>{s}</th>
                ))}
                <th style={{ ...th, textAlign: 'center', background: '#14211C', color: '#F2EFE6', borderBottom: 'none' }}>
                  <span style={{ display: 'block', color: ST.accent, fontSize: '9px', letterSpacing: '0.18em', marginBottom: '3px' }}>The featureset</span>
                  AutoEase
                </th>
              </tr>
            </thead>
            <tbody>
              {FPS_MARKET_FEATURES.map((row, ri) => (
                <tr key={ri}>
                  <td style={{ ...td, fontWeight: 500, color: ST.ink }}>
                    {row.f}
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 400, color: 'rgba(20,33,28,0.45)', lineHeight: 1.5, marginTop: '3px' }}>{row.note}</span>
                  </td>
                  {row.v.map((v, ci) => (
                    <td key={ci} style={{ ...td, textAlign: 'center', fontSize: '15px', color: v === 2 ? ST.forest : v === 1 ? '#8A6414' : 'rgba(20,33,28,0.25)' }}>
                      {v === 2 ? '✓' : v === 1 ? '◐' : '—'}
                    </td>
                  ))}
                  <td style={{ ...td, textAlign: 'center', background: 'rgba(61,84,72,0.1)', borderLeft: `2px solid ${ST.forest}` }}>
                    <span style={{ display: 'inline-flex', width: '22px', height: '22px', borderRadius: '50%', background: ST.forest, color: '#F2EFE6', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10.5px', letterSpacing: '0.08em', color: ST.faint, margin: '0.9rem 0 0' }}>
          <span style={{ color: ST.forest }}>✓</span> full support&ensp;·&ensp;<span style={{ color: '#8A6414' }}>◐</span> partial / paywalled&ensp;·&ensp;<span>—</span> not offered
        </p>
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
        {/* Persona trade-offs — spectrum tracks instead of a colored matrix:
            each dimension is a Low→High axis and the three personas sit on
            it, so convergence and divergence read at a glance. */}
        <div style={{ marginTop: '1.5rem', background: ST.cardBg, border: ST.cardBorder, borderRadius: '10px', padding: isMobile ? '1.25rem' : '1.75rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ST.faint, margin: 0 }}>How the personas trade off</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {FPS_PERSONA_KEYS.map(p => (
                <span key={p.k} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'rgba(20,33,28,0.65)' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: p.color, color: '#F2EFE6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-mono)', fontSize: '9px' }}>{p.k}</span>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', marginBottom: '0.25rem' }}>
              <span />
              <div style={{ position: 'relative', height: '14px', fontFamily: 'var(--ff-mono)', fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.35)' }}>
                <span style={{ position: 'absolute', left: '8%', transform: 'translateX(-50%)' }}>Low</span>
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Mid</span>
                <span style={{ position: 'absolute', left: '92%', transform: 'translateX(-50%)' }}>High</span>
              </div>
            </div>
          )}
          {FPS_SPECTRUM.map(([dim, a, j, e], i) => (
            <SpectrumRow key={i} dim={dim} values={[a, j, e]} isMobile={isMobile} />
          ))}
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
        <StudyLead>Sketched out the basic operations of the app and how a user would move through it — four entry points (Browse, guided Q&A, Sell, Price Check) resolving distinct intents, with the home screen as a hub rather than a funnel. This is the actual sketch the app grew from.</StudyLead>
        <figure style={{ margin: '2.25rem 0 0', padding: isMobile ? '1.25rem' : '2rem', background: '#FFFFFF', border: '0.5px solid rgba(20,33,28,0.12)', borderRadius: '10px' }}>
          <img src={FPS_SKETCH} alt="AutoEase lowfi wireframe sketch — screen flow from welcome through home, vehicle results, detail, and options pages" loading="lazy" style={{ width: '100%', display: 'block' }} />
          <figcaption style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.45)', marginTop: '1rem', textAlign: 'center' }}>Original flow sketch — welcome · home · results · detail · options</figcaption>
        </figure>
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
