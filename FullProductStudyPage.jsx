// FullProductStudyPage.jsx — "Full product study" (AutoEase).
// End-to-end product story told as numbered steps: idea → market scan →
// assumptions → research → prioritization → lowfi → hifi → working
// prototype. Research content sources from autoease/Case Study/ (2026
// re-synthesis); hi-fi comps are live screens of the Vercel prototype.
//
// Jul 2026 reposition: the product is an information layer that stays useful
// whether or not you buy. Section 07 now shows all eighteen screens grouped
// Decide / Research / Own / Buy — the Own group (VIN lookup, owner reports)
// is the one that carries the argument. Copy reconciled to autoease-copy.md.
// The Research group carries the EV hands-free study, which is genuine
// research rather than mock content.

// ── 02 · Market scan — configurator-style feature comparison ──────────────
// Services read as columns (like trims on a configurator, or tiers on a
// pricing page); AutoEase sits at the end as the highlighted "tier" that
// combines the capabilities worth keeping. 2 = full, 1 = partial, 0 = none.
const FPS_MARKET_SERVICES = ['Edmunds', 'CarMax', 'KBB', 'Auto Trader', 'Carvana', 'eBay Motors'];
const FPS_MARKET_FEATURES = [
  { f: 'Upfront, fixed pricing',      v: [1, 2, 1, 0, 2, 0], note: 'CarMax and Carvana: the price on screen is the price. Edmunds/KBB publish benchmarks, not prices.' },
  { f: 'Fair-market price check',     v: [2, 2, 2, 1, 2, 0], note: 'AutoEase checks against KBB for fair market value, then compares it to the actual return you would get from CarMax or Carvana.' },
  { f: '5-year ownership cost',       v: [2, 0, 2, 0, 0, 0], note: 'Edmunds True Cost to Own® and KBB 5-Year Cost to Own — the two that treat a car as a financial decision.' },
  { f: 'History & reliability',       v: [1, 2, 0, 1, 2, 1], note: 'CarMax and Carvana include reports free; elsewhere it’s an upsell or seller-provided.' },
  { f: 'Unbiased reviews',            v: [2, 0, 2, 1, 0, 0], note: 'Edmunds and KBB carry real editorial benches; marketplaces don’t review what they sell.' },
  { f: 'Side-by-side comparison',     v: [1, 1, 1, 1, 0, 0], note: 'Exists everywhere in some form — nowhere as a first-class decision tool.' },
  { f: 'No-contact browsing',         v: [0, 1, 1, 0, 2, 2], note: 'Carvana is self-serve until checkout; eBay is anonymous until you bid. Lead-gen sites gate on contact info.' },
];

// ── 03 · Assumptions carried into the featureset ──────────────────────────
const FPS_ASSUMPTIONS = ['Useful whether or not you ever buy', 'The price on the screen is the price', 'Total 5-year cost beats sticker price', 'History & reliability shown before contact', 'Reviews with no dealership incentive', 'Side-by-side comparison as a first-class tool', 'Browsing never costs your phone number', 'The people who owned one are the review'];

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

// ── 05 · Feature prioritization — evidence chart ──────────────────────────
// One dot per interview participant (9 total): filled = the feature came up.
// Cut tier carries reasons instead of counts — those weren't outvoted, they
// were dropped on the evidence.
const FPS_TIERS = [
  { name: 'Core — built now', tone: 2, items: [
    { f: 'Transparent, upfront pricing', n: 8, ev: 'Raised unprompted in nearly every interview' },
    { f: 'Side-by-side comparison tool', n: 6, ev: 'The decision is always between cars, never about one' },
    { f: '5-year cost of ownership estimate', n: 6, ev: 'Sticker price isn’t the number that matters' },
    { f: 'Vehicle history + reliability score', n: 6, ev: 'The single biggest trust checkpoint' },
    { f: 'Independent / user reviews', n: 5, ev: 'Verdicts with no dealership incentive' },
  ]},
  { name: 'Later — earned consideration', tone: 1, items: [
    { f: 'No-contact / anonymous browsing', n: 5, ev: 'Strong signal, but a stance more than a feature' },
    { f: 'Financing calculator (monthly view)', n: 4, ev: 'Monthly-cost mindset, mostly Alex’s cohort' },
    { f: 'Insurance estimator', n: 3, ev: 'Adjacent cost — belongs inside the 5-year number' },
    { f: 'Location-specific inventory filtering', n: 2, ev: 'Rare, but acute where it hit — Emma was blocked on it' },
  ]},
  { name: 'Cut — deliberately dropped', tone: 0, items: [
    { f: 'Online transaction processing as a headline', ev: 'Users still want to see the car in person first' },
    { f: 'Personalized recommendations', ev: 'Nobody asked — they asked for better filters' },
    { f: 'Visual / interactive car tours', ev: 'Never prioritized over the cost-transparency problem' },
  ]},
];

// Nine-dot evidence strip — one dot per participant.
const EvidenceDots = ({ n, tone }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
    {Array.from({ length: 9 }, (_, i) => (
      <span key={i} style={{
        width: '9px', height: '9px', borderRadius: '50%',
        background: i < n ? FPS_TONE[tone].fg : 'rgba(20,33,28,0.1)',
        border: i < n ? 'none' : '0.5px solid rgba(20,33,28,0.15)',
      }} />
    ))}
    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: FPS_TONE[tone].fg, marginLeft: '7px', fontWeight: 500 }}>{n}/9</span>
  </span>
);

// Harvey ball — full / half / empty circle, far easier to scan than glyphs.
const Harvey = ({ v, size = 15 }) => {
  const color = v === 2 ? '#3D5448' : v === 1 ? '#B0801F' : 'rgba(20,33,28,0.22)';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-label={v === 2 ? 'Full support' : v === 1 ? 'Partial support' : 'Not offered'} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="8" cy="8" r="6.4" fill={v === 2 ? color : 'none'} stroke={color} strokeWidth="1.6" />
      {v === 1 && <path d="M 8 1.6 A 6.4 6.4 0 0 1 8 14.4 Z" fill={color} />}
    </svg>
  );
};

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
// Grouped by what the screen is for, because the product's whole argument is
// that three of the four groups work for someone who never buys anything.
const FPS_BASE = 'https://autoease-prototype.vercel.app';
const FPS_HIFI_GROUPS = [
  {
    group: 'Decide',
    note: 'The advisor asks, then commits to an answer — a specific car, a specific year, and the number you should pay for it.',
    shots: [
      { src: `${FPS_BASE}/advisor/`, label: 'Advisor — a conversation, not a form' },
      { src: `${FPS_BASE}/advisor/result/`, label: 'The pick — open at, fair, walk away' },
      { src: `${FPS_BASE}/q/1/`, label: 'Five questions — the fast path' },
      { src: `${FPS_BASE}/results/`, label: 'Ranked — one number per car' },
    ],
  },
  {
    group: 'Research',
    note: 'The reference layer. The EV module is real research — my own May 2026 analysis of electric SUVs and hands-free driving, which was an actual purchase decision rather than sample content.',
    shots: [
      { src: `${FPS_BASE}/`, label: 'Home — a hub, not a funnel' },
      { src: `${FPS_BASE}/research/`, label: 'EV research — real analysis, not mock data' },
      { src: `${FPS_BASE}/browse/subaru/`, label: 'Browse — brand to model-year' },
      { src: `${FPS_BASE}/news/`, label: 'Reviews & recalls — no seller' },
      { src: `${FPS_BASE}/compare/`, label: 'Compare — first-class, not a modal' },
    ],
  },
  {
    group: 'Own',
    note: 'The half of the product that has nothing to do with buying. Check the car in your driveway; report what owning it was actually like.',
    shots: [
      { src: `${FPS_BASE}/vin/`, label: 'VIN check — free, no account' },
      { src: `${FPS_BASE}/vin/4S4BSANC5K3218847/`, label: 'The record — recalls, TSBs, failure points' },
      { src: `${FPS_BASE}/owners/`, label: 'Owner reports — real numbers' },
      { src: `${FPS_BASE}/owners/new/`, label: 'Contribute — the data asset' },
    ],
  },
  {
    group: 'Buy',
    note: 'Deliberately last. Used listings priced against fair market; new inventory showing the gap between invoice and sticker, which is where the entire negotiation actually lives.',
    shots: [
      { src: `${FPS_BASE}/listings/`, label: 'Used — six sources, fees included' },
      { src: `${FPS_BASE}/listings/?condition=new`, label: 'New — invoice vs sticker, exposed' },
      { src: `${FPS_BASE}/price-check/`, label: 'Price check — the math, visible' },
      { src: `${FPS_BASE}/sell/`, label: 'Sell — same grammar as Browse' },
      { src: `${FPS_BASE}/car/crosstrek/`, label: 'Detail — every figure sourced' },
    ],
  },
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
        image="images/autoease/study-hero.jpg"
        eyebrow="Case study · Full product study · AutoEase"
        title="One product, end to end — from a question to a"
        titleEm="working prototype"
        sub="AutoEase is a self-directed study of the car-buying problem: research, market analysis, personas, prioritization, wireframes, and a built prototype — the complete arc of taking a product from idea to interface. It is designed to be useful whether or not you ever buy anything."
        meta={[
          { label: 'Role', value: 'Research · Strategy · Product · Brand · UI' },
          { label: 'Timeline', value: '2024 origin · 2026 re-synthesis' },
          { label: 'Status', value: 'Working prototype, live below' },
        ]}
      />

      {/* About */}
      <StudySection first>
        <StudyLabel>About</StudyLabel>
        <StudyH2>Car buying is a world of information asymmetry</StudyH2>
        <StudyLead>Every person I interviewed described car buying in terms of what they couldn't see — real prices, real reliability, real total cost, and real intent from the salesperson. The power seems to lie with everyone except the consumer. The one person who should have the most insight is often the one most in the dark. That asymmetry is a design problem, and this study walks the full arc of answering it.</StudyLead>
      </StudySection>

      {/* 01 Product idea */}
      <StudySection>
        <StudyLabel n="01">Product idea</StudyLabel>
        <StudyH2>The user needs better information tools when thinking about what car to buy</StudyH2>
        <StudyLead>The thesis: a neutral intelligence layer between buyers and the industry — fixed pricing, full vehicle history, five-year true cost, and unbiased reviews, all before a salesperson ever gets your phone number. Not another marketplace; the information side of the transaction, built to support the buyer rather than monetize the lead.</StudyLead>
        <StudyLead>From a business standpoint, this works by monetizing the information and consumer choices rather than through the sale of a vehicle. Revenue comes from selling comprehensive, raw consumer survey data and competitive analysis reports to manufacturers so they can track product quality and consumer habits. That model is what lets the product stay useful to someone who never buys anything — the app works whether you're shopping, checking a recall on the car in your driveway, or reporting what six years of owning one actually cost you.</StudyLead>
      </StudySection>

      {/* 02 Market scan — configurator-style comparison, AutoEase as the
          highlighted tier that combines what's worth keeping. */}
      <StudySection>
        <StudyLabel n="02">Test this</StudyLabel>
        <StudyH2>What is available on the market now?</StudyH2>
        <StudyLead>Here are the services consumers actually use today, compared the way a configurator compares trims — feature by feature. No single incumbent covers the whole decision; AutoEase is specified as the tier that does, because consumer information is the main goal.</StudyLead>
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
                    <td key={ci} style={{ ...td, textAlign: 'center' }}>
                      <Harvey v={v} />
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
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10.5px', letterSpacing: '0.08em', color: ST.faint, margin: '0.9rem 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Harvey v={2} size={13} /> full support&ensp;·&ensp;<Harvey v={1} size={13} /> partial / paywalled&ensp;·&ensp;<Harvey v={0} size={13} /> not offered
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
        <StudyLead>Based on the interviews and how participants actually approach looking for a car, each candidate feature is held to its evidence — one dot per participant who raised it. Built now, considered, or deliberately cut.</StudyLead>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', marginTop: '2rem', alignItems: 'start' }}>
          {FPS_TIERS.map((tier, ti) => (
            <div key={ti} style={{ background: ST.cardBg, border: ST.cardBorder, borderTop: `2px solid ${FPS_TONE[tier.tone].fg}`, borderRadius: '10px', padding: '1.4rem 1.5rem' }}>
              <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: FPS_TONE[tier.tone].fg, margin: '0 0 1.1rem' }}>{tier.name}</p>
              {tier.items.map((p, i) => (
                <div key={i} style={{ padding: '0.8rem 0', borderTop: i ? '0.5px solid rgba(20,33,28,0.07)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: tier.tone === 0 ? 'rgba(20,33,28,0.55)' : ST.ink, textDecoration: tier.tone === 0 ? 'line-through' : 'none', textDecorationColor: 'rgba(156,53,39,0.5)' }}>{p.f}</span>
                    {p.n != null && <EvidenceDots n={p.n} tone={tier.tone} />}
                  </div>
                  <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: 'rgba(20,33,28,0.5)', margin: '0.35rem 0 0' }}>{p.ev}</p>
                </div>
              ))}
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

      {/* 07 Hifi — every section of the app, grouped by what it's for */}
      <StudySection>
        <StudyLabel n="07">Hi-fi wireframes</StudyLabel>
        <StudyH2>Every screen in the product, grouped by what it's for</StudyH2>
        <StudyLead>The sketches became high-fidelity comps in the AutoEase brand system — forest-deep surfaces, amber reserved for the highest-stakes value on each screen, and money rendered in a dedicated numeric scale. Eighteen screens across four groups, shown live from the built prototype. Three of the four groups work for someone who never buys a car.</StudyLead>
        {FPS_HIFI_GROUPS.map((g, gi) => (
          <div key={gi} style={{ marginTop: gi === 0 ? '2.5rem' : '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', flexWrap: 'wrap', paddingBottom: '0.75rem', borderBottom: '0.5px solid rgba(20,33,28,0.12)' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: ST.forest }}>{g.group}</span>
              <span style={{ fontSize: '12.5px', lineHeight: 1.55, color: 'rgba(20,33,28,0.55)', flex: '1 1 300px' }}>{g.note}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(210px, 1fr))' : 'repeat(4, 1fr)', justifyItems: 'center', rowGap: '2rem', marginTop: '1.75rem' }}>
              {g.shots.map((s, i) => <HifiPhone key={i} shot={s} />)}
            </div>
          </div>
        ))}
      </StudySection>

      {/* 08 Working prototype */}
      <StudySection>
        <StudyLabel n="08">Working prototype</StudyLabel>
        <StudyH2>The high-fidelity framework, built out into working logic</StudyH2>
        <StudyLead>The comps became the framework for the base design, and the logic was built out into an interactive prototype — a full Next.js application. The agentic advisor holds a real conversation and commits to a car, a year, and a price. VIN lookup decodes a vehicle and maps known failure points against its odometer. Owner reports read and write. Listings aggregate six sources across new and used, and show what got filtered out and why. The EV research module is the one place the content isn't mock: it's my own analysis of electric SUVs and hands-free driving, carried in as a real reference document. Try it below.</StudyLead>
        <div style={{ marginTop: '2rem' }}>
          <TryItOut src="https://autoease-prototype.vercel.app/" label="AutoEase" />
          <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <a href="autoease-v2/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.55)', textDecoration: 'none' }}>View the v2 design-language board ↗</a>
          </p>
        </div>
      </StudySection>

      <StudyTail
        outcome="Prototype complete and live — an agentic advisor that recommends a car and a price, VIN lookup with recalls and mileage-mapped failure points, owner reports read and write, an EV research module built on real analysis, and a listings aggregator covering used inventory across six sources plus new inventory with the invoice-to-sticker gap exposed. Eighteen screens in a single Next.js build. Used as a portfolio-facing study of consumer-finance UI patterns applied to a non-finance domain."
        credits="Independent project. Research, strategy, product design, interaction design, brand, and prototype build: Andreas Lächler."
        nextId="wireframe-components"
        onNavigate={onNavigate}
        isMobile={isMobile}
      />
    </main>
  );
};

window.FullProductStudyPage = FullProductStudyPage;
