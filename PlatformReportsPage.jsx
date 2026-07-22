// PlatformReportsPage.jsx — "Platform driven reports" (Algoma).
// Native rebuild of the platform-driven-reports case study in the
// lachler.com v4 design language. Platform track carries forest, manual
// track carries orange — the two tracks converge on the export.
const PR_PLATFORM_CHIPS = ['Address & parcel search', 'AI zoning report', 'GIS layer depth', 'Rent comps & market data', 'Demographics & permits', 'Site capacity / auto site plans', 'Pro forma modeling', 'Construction cost estimates', 'AI rendering', 'CAD export', 'One-click PDF export'];
const PR_MANUAL_CHIPS = ['Custom site plans', 'Client product types', 'Unit mix breakdown', 'Amenity centers', 'Retention ponds', 'Parking & circulation', '3D axonometric views', 'Yield metrics (coverage, FAR, density)', 'Revision rounds', 'Presentation packaging'];

const PR_PLATFORM_STEPS = [
  ['Find the site', 'Address entry or Site Discovery search across parcels'],
  ['Confirm zoning & GIS layers', 'AI zoning report — FAR, height, setbacks, permitted uses — plus overlays and constraints'],
  ['Understand the market', 'Rent comps, demographics, building permit activity'],
  ['Run site capacity & renderings', 'Auto-generated site plans, parametric massing, AI renders'],
  ['Model the financials', 'Pro forma and construction cost estimates'],
];
const PR_MANUAL_STEPS = [
  ['Lay out the site', "Client's pre-modeled product types placed on the parcel in Revit"],
  ['Confirm areas', 'Unit mix, coverage, FAR, and density validated'],
  ['Pull together presentation format', 'Site plan, axonometric views, metrics assembled by hand'],
  ['Run renders', 'Presentation-quality visuals for the concept'],
  ['Revise with the client', 'Multiple revision rounds via email and calls'],
  ['Package for client', 'Final branded PDF — 5–7 business day turnaround'],
];

const PR_PRINCIPLES = [
  ['Export a presentation with data layers', "The export isn't a flat document. Each section is backed by a live data layer — zoning, capacity, market, renders — so the presentation stays connected to the analysis that produced it."],
  ['Build for the addition of platform services', "The presentation structure anticipates capability we haven't shipped yet. As new data and functionality land, they slot into the format — no rework, no redesign of the package."],
  ['Manual work is the spec', 'Design services stays ahead of the platform by definition. Each manual step it performs is catalogued, measured, and queued for automation in priority order.'],
  ['Meeting-ready is the bar', "The output must survive an investment committee without touch-up. If a user has to rebuild it in another tool, the export hasn't done its job."],
];

const PR_PHASES = [
  { n: '1', status: 'Now', title: 'Build an expandable presentation format', body: 'Define the canonical presentation structure — cover, site summary, zoning, capacity, market, renders, yield metrics — as a modular format that accepts new sections without breaking existing ones.' },
  { n: '2', status: 'Now', title: 'Add platform data as functionality lands', body: 'Each time the platform gains a capability, its output flows into the package automatically. The presentation gets richer with every release, on the same structure.' },
  { n: '3', status: 'Next', title: 'Reduce manual assembly to zero', body: 'Move the assembly work itself into the product. This phase is demand-backed: customers consistently ask for editable assumptions over static reports, control of what data reaches the package, and white-label export — and the "Your Projects" initiative (Dashboard → Site → Design → Files → Export) is already scoped along these lines.',
    subs: [['3a', 'Host the presentation on the platform'], ['3b', 'Make it editable within the platform'], ['3c', "Host the user's product types"], ['3d', 'Toggle the specific data that makes it into the presentation'], ['3e', 'Custom export capabilities — PDF, CAD, and presentation formats']] },
  { n: '4', status: 'Ongoing', title: 'Test with users, iterate, adapt, implement', body: 'Every phase ships to trial customers and design partners first. Their feedback reorders the queue — the roadmap follows observed demand, not assumption.' },
];

const PR_METRICS = [
  ['5–7 days', 'current design services turnaround per packaged concept — the manual baseline the export compresses'],
  ['1 click', 'from analysis to investor-presentation-ready PDF — the standard the export must hold'],
  ['31 : 1', 'opportunities evaluated per deal pursued — the volume the export has to keep up with'],
];

const PlatformReportsPage = ({ onNavigate }) => {
  const isMobile = (window.useIsMobile || (() => false))(768);
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const chip = (manual) => ({
    fontFamily: 'var(--ff-mono)', fontSize: '11px', padding: '6px 12px', borderRadius: '999px',
    background: manual ? 'rgba(212,90,27,0.07)' : 'rgba(61,84,72,0.08)',
    color: manual ? '#A34415' : ST.forest,
    border: `0.5px solid ${manual ? 'rgba(212,90,27,0.25)' : 'rgba(61,84,72,0.25)'}`,
  });

  const Track = ({ title, tag, steps, manual }) => (
    <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(20,33,28,0.14)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ padding: '1.1rem 1.5rem', background: manual ? ST.accent : ST.forest, color: ST.cream, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '14.5px', fontWeight: 500 }}>{title}</span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>{tag}</span>
      </div>
      <div style={{ padding: '0.5rem 0' }}>
        {steps.map(([b, s], i) => (
          <div key={i} style={{ display: 'flex', gap: '14px', padding: '0.85rem 1.5rem', alignItems: 'flex-start', borderTop: i ? '0.5px solid rgba(20,33,28,0.06)' : 'none' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 500, flexShrink: 0, width: '26px', height: '26px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', background: manual ? 'rgba(212,90,27,0.1)' : 'rgba(61,84,72,0.1)', color: manual ? '#A34415' : ST.forest }}>{i + 1}</span>
            <div>
              <b style={{ fontSize: '14px', fontWeight: 500, color: ST.ink, display: 'block' }}>{b}</b>
              <span style={{ fontSize: '13px', color: ST.muted, lineHeight: 1.55 }}>{s}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem' }}>
      <StudyHero
        isMobile={isMobile}
        bg="#3D5448"
        eyebrow="Case study · Product logic · Algoma"
        title="Platform-driven reports: from manual packaging to"
        titleEm="self-service yield presentations"
        sub="Bridging manual concept design and platform automation — a study of the product logic behind exporting a meeting-ready presentation directly from the platform."
        meta={[
          { label: 'Role', value: 'Andy Lachler — Product' },
          { label: 'Scope', value: 'Presentation export · Design services · Report engine' },
          { label: 'Status', value: 'Framework in refinement' },
        ]}
      />

      {/* 01 About */}
      <StudySection first>
        <StudyLabel n="01">About</StudyLabel>
        <StudyH2>Bridging the manual and the automated</StudyH2>
        <StudyLead>Today, Algoma produces two kinds of client-facing output. The platform generates preliminary site analysis on demand — parcel search, zoning confirmation, GIS layers, site capacity, renderings, one-click PDF export. Alongside it, our design services team builds fully customized site plans by hand: client-requested geometry, unit mix, amenity centers, retention ponds, and packaged yield metrics.</StudyLead>
        <StudyMuted>The manual work is valuable precisely because it shows us what the platform should learn to do next. This case study maps that logic: which steps each track performs, where they converge, and the sequence for automating the gap.</StudyMuted>
        <blockquote style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.45, color: ST.ink, borderLeft: `2px solid ${ST.accent}`, padding: '0.25rem 0 0.25rem 1.75rem', margin: '2.5rem 0 0', maxWidth: '720px' }}>
          Every step a human performs to package a presentation is a product spec waiting to be written.
        </blockquote>
      </StudySection>

      {/* 02 The Logic */}
      <StudySection>
        <StudyLabel n="02">The logic</StudyLabel>
        <StudyH2>The platform needs to export a presentation that is meeting-ready</StudyH2>
        <StudyLead>A developer's real deliverable isn't a data layer — it's the document they carry into an investment committee, a lender meeting, or a client review. The platform already computes the substance. The remaining work is assembling that substance into a presentation without a human in the loop.</StudyLead>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem', marginTop: '2.25rem' }}>
          {[{ manual: false, h: 'What the platform does today', note: 'Everything needed for preliminary site analysis, on demand.', chips: PR_PLATFORM_CHIPS },
            { manual: true, h: 'What design services adds by hand', note: "Custom concept work in Revit, driven by client-requested geometry and the client's pre-modeled housing products.", chips: PR_MANUAL_CHIPS }].map((c, i) => (
            <div key={i} style={{ background: ST.cardBg, border: ST.cardBorder, borderRadius: '10px', padding: '1.6rem' }}>
              <p style={{ fontSize: '15px', fontWeight: 500, color: ST.ink, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span aria-hidden="true" style={{ width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0, background: c.manual ? ST.accent : ST.forest }} />{c.h}
              </p>
              <p style={{ fontSize: '13px', color: ST.muted, margin: '0.7rem 0 0' }}>{c.note}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                {c.chips.map(t => <span key={t} style={chip(c.manual)}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </StudySection>

      {/* 03 Two tracks */}
      <StudySection>
        <StudyLabel n="03">Two tracks, one destination</StudyLabel>
        <StudyH2>How the work happens now</StudyH2>
        <StudyLead>The same client outcome is currently produced two ways. Mapping both tracks step-by-step exposes exactly which steps are shared, which are automatable, and which still require judgment.</StudyLead>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.5rem' : '3rem', marginTop: '2.25rem' }}>
          <Track title="Platform-Driven Work" tag="Automated" steps={PR_PLATFORM_STEPS} manual={false} />
          <Track title="Manual Concept Design" tag="Design Services" steps={PR_MANUAL_STEPS} manual={true} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isMobile && (
            <svg viewBox="0 0 760 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: 'block', width: '100%', maxWidth: '760px', height: '90px' }}>
              <path d="M150 0 C150 45 380 30 380 78" stroke="#3D5448" strokeWidth="1.5" />
              <path d="M610 0 C610 45 380 30 380 78" stroke="#D45A1B" strokeWidth="1.5" />
              <path d="M372 72 L380 84 L388 72" stroke="#14211C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div style={{ background: '#14211C', color: ST.cream, borderRadius: '10px', padding: isMobile ? '1.75rem' : '2.25rem 2.75rem', textAlign: 'center', maxWidth: '560px', marginTop: isMobile ? '2rem' : 0, position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${ST.accent}, transparent)` }} />
            <p style={{ fontFamily: 'var(--ff-serif)', fontSize: '22px', fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>Self-service <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.8)' }}>yield presentations</em></p>
            <p style={{ fontSize: '13.5px', color: 'rgba(242,239,230,0.7)', margin: 0, lineHeight: 1.6 }}>A presentation with data layers, exported directly from the platform — structured so it grows as platform capability grows.</p>
          </div>
        </div>
      </StudySection>

      {/* 04 Principles */}
      <StudySection>
        <StudyLabel n="04">Design principles</StudyLabel>
        <StudyH2>Structure that supports growth</StudyH2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem', marginTop: '1rem' }}>
          {PR_PRINCIPLES.map(([h, b], i) => (
            <div key={i} style={{ borderRadius: '10px', padding: '1.5rem 1.6rem', background: ST.cardBg, border: ST.cardBorder }}>
              <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: ST.accent, margin: '0 0 0.6rem' }}>Principle {String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: ST.ink, margin: '0 0 0.5rem' }}>{h}</p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: ST.muted, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
      </StudySection>

      {/* 05 Sequence */}
      <StudySection>
        <StudyLabel n="05">Sequence</StudyLabel>
        <StudyH2>The automation path</StudyH2>
        <StudyLead>Four phases, ordered so that each ships value on its own while reducing the manual work required for the next.</StudyLead>
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          {PR_PHASES.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '48px 1fr' : '64px 1fr', gap: isMobile ? '18px' : '28px', position: 'relative', paddingBottom: i < PR_PHASES.length - 1 ? '2.75rem' : 0 }}>
              {i < PR_PHASES.length - 1 && (
                <span aria-hidden="true" style={{ position: 'absolute', left: isMobile ? '23px' : '31px', top: isMobile ? '48px' : '64px', bottom: '8px', width: '1px', background: 'rgba(20,33,28,0.15)' }} />
              )}
              <div style={{ width: isMobile ? '48px' : '64px', height: isMobile ? '48px' : '64px', borderRadius: '12px', flexShrink: 0, background: '#14211C', color: ST.accent, fontFamily: 'var(--ff-mono)', fontSize: isMobile ? '16px' : '20px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.n}</div>
              <div>
                <p style={{ fontSize: '17px', fontWeight: 500, color: ST.ink, margin: '0 0 0.5rem' }}>
                  {p.title}
                  <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px', marginLeft: '10px', verticalAlign: '2px', background: p.status === 'Now' ? 'rgba(61,84,72,0.12)' : p.status === 'Next' ? 'rgba(212,90,27,0.1)' : 'rgba(20,33,28,0.06)', color: p.status === 'Now' ? ST.forest : p.status === 'Next' ? '#A34415' : ST.muted }}>{p.status}</span>
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: ST.muted, margin: 0, maxWidth: '640px' }}>{p.body}</p>
                {p.subs && (
                  <div style={{ marginTop: '1rem', display: 'grid', gap: '8px', maxWidth: '640px' }}>
                    {p.subs.map(([m, t]) => (
                      <div key={m} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: ST.cardBg, border: ST.cardBorder, borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '13.5px', color: 'rgba(20,33,28,0.7)' }}>
                        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 500, color: ST.accent, marginTop: '2px', flexShrink: 0 }}>{m}</span>{t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </StudySection>

      {/* 06 Why it matters — dark band */}
      <div className="reveal" style={{ background: '#14211C', borderRadius: '10px', padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem', marginBottom: '4.5rem' }}>
        <StudyLabel n="06" style={{ color: 'rgba(242,239,230,0.45)' }}><span style={{ color: 'rgba(242,239,230,0.45)' }}>Why it matters</span></StudyLabel>
        <StudyH2 style={{ color: ST.cream }}>The presentation is where the platform <em style={{ fontStyle: 'italic', color: 'rgba(242,239,230,0.75)' }}>earns the meeting</em></StudyH2>
        <p style={{ maxWidth: '700px', fontSize: '15px', lineHeight: 1.7, color: 'rgba(242,239,230,0.72)', margin: 0 }}>Developers evaluate dozens of opportunities for every deal they pursue. The teams that move fastest are the ones who can walk into a room with a defensible package the same day they find the site. Automating the export closes the last gap between analysis and decision.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '2.5rem' }}>
          {PR_METRICS.map(([v, l], i) => (
            <div key={i} style={{ border: '0.5px solid rgba(242,239,230,0.16)', borderRadius: '10px', padding: '1.6rem', background: 'rgba(242,239,230,0.03)' }}>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '28px', fontWeight: 500, color: ST.accent, lineHeight: 1.1 }}>{v}</div>
              <div style={{ fontSize: '13px', color: 'rgba(242,239,230,0.6)', marginTop: '0.6rem', lineHeight: 1.55 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <StudyTail
        outcome="Framework in refinement. Phases 1–2 are live — the modular presentation format ships richer with every platform release. Phase 3 (zero manual assembly) is scoped under the Your Projects initiative and demand-backed by trial customers."
        credits="Algoma. Product logic, presentation architecture, and case study: Andreas Lächler. Built with the Algoma design services and engineering teams."
        nextId="exhibition-trailer"
        onNavigate={onNavigate}
        isMobile={isMobile}
      />
    </main>
  );
};

window.PlatformReportsPage = PlatformReportsPage;
