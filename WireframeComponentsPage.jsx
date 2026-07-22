// WireframeComponentsPage.jsx — "Wireframe component work" (Algoma).
// Native rebuild of the platform-components case study in the lachler.com
// design language. Page chrome is v4; the component prototypes inside each
// carousel are ported verbatim (wireframes-data.js) and keep their shipped
// design — that contrast is the point: the catalog frames the work.
const WireframeComponentsPage = ({ onNavigate, projectId }) => {
  const isMobile = (window.useIsMobile || (() => false))(768);
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
  const series = window.WF_SERIES || [];
  const about = window.WF_ABOUT || {};

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem' }}>
      <StudyHero
        isMobile={isMobile}
        bg="#14211C"
        eyebrow="Case study · Component design · Algoma"
        title="Wireframe component work — designs that"
        titleEm="earn their place"
        sub="A running catalog of platform component designs — what each one does, what it adds to the user's ability, and how it serves the platform's growth goals. Each series is a working prototype, not a mockup."
        meta={[
          { label: 'Role', value: 'Andy Lachler — Product' },
          { label: 'Scope', value: 'UI components · States · Interaction design' },
          { label: 'Status', value: 'Series 1–2 complete · Series 3 open' },
        ]}
      />

      <StudySection first>
        <StudyLabel n="01">About</StudyLabel>
        <StudyH2>Why a component catalog</StudyH2>
        <StudyLead>{about.lead}</StudyLead>
        <StudyMuted>{about.note}</StudyMuted>
      </StudySection>

      {series.map((s, i) => (
        <StudySection key={i}>
          <StudyLabel n={String(i + 2).padStart(2, '0')}>Component series {i + 1}</StudyLabel>
          <StudyH2>{s.title}</StudyH2>
          <StudyLead>{s.lead}</StudyLead>
          <StudyCarousel title={s.carTitle} slides={s.slides} />
          <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ST.faint, margin: '2.5rem 0 0' }}>Description</p>
          <StudyImpact items={s.impact} isMobile={isMobile} />
        </StudySection>
      ))}

      <StudyTail
        outcome="A living catalog — each series lands here as a working HTML prototype before engineering picks it up. Series 1 and 2 are spec-complete; the service-intake and zoning-report series are in active refinement. Client-specific data stays out of view."
        credits="Algoma. Component design, states, and interaction design: Andreas Lächler. Built with the Algoma engineering team."
        nextId="platform-reports"
        onNavigate={onNavigate}
        isMobile={isMobile}
      />
    </main>
  );
};

window.WireframeComponentsPage = WireframeComponentsPage;
