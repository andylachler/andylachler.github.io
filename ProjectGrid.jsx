// ProjectGrid.jsx
// The featured five (July 2026 restructure): the AutoEase full product study
// leads, the Algoma work is shown as two focused showcases (component catalog
// + report logic) instead of the retired Feasibility platform case study,
// then Exhibition Trailer and Ella. Site search, Zoning chat, and Comps
// analysis remain as mini studies on the Work page.
const PROJECTS = [
  { id: 'autoease', title: 'Full product study', org: 'AutoEase — Independent', year: '2026', role: 'Product Design — idea to working prototype', bg: '#1A2520', featured: true, imageIndex: 6 },
  { id: 'wireframe-components', title: 'Wireframe component work', org: 'Algoma', year: '2025–26', role: 'Product Design — platform component catalog', bg: '#14211C', featured: true, imageIndex: 3, silhouette: 'wireframe-components' },
  { id: 'platform-reports', title: 'Platform driven reports', org: 'Algoma', year: '2026', role: 'Product Logic — self-service yield presentations', bg: '#3D5448', featured: true, imageIndex: 0, silhouette: 'platform-reports' },
  { id: 'exhibition-trailer', title: 'Exhibition Trailer', org: 'Independent', year: '2022', role: 'Physical prototyping — modular off-grid pop-up', bg: '#3D5448', featured: true, imageIndex: 1 },
  { id: 'ella', title: 'Ella', org: 'Arquitectonica', year: '2023', role: 'Architecture — 95-unit condo, Miami Beach', bg: '#D45A1B', featured: true, imageIndex: 2 },
];

// expose so other pages can reference
window.PROJECTS = PROJECTS;

const ProjectGrid = ({ onNavigate, tweaks = {} }) => {
  const { gridLayout = 'asymmetric' } = tweaks;
  const isMobile = (window.useIsMobile || (() => false))(768);

  const featured = PROJECTS.slice(0, 5);

  // On mobile every layout collapses to a single column so tiles stay readable.
  const renderMobileStack = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.625rem' }}>
      {featured.map(p => <ProjectTile key={p.id} {...p} onNavigate={onNavigate} />)}
    </div>
  );

  const renderAsymmetric = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.625rem', marginBottom: '0.625rem' }}>
        <ProjectTile {...featured[0]} onNavigate={onNavigate} />
        <ProjectTile {...featured[1]} onNavigate={onNavigate} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.625rem', marginBottom: '0.625rem' }}>
        <ProjectTile {...featured[2]} onNavigate={onNavigate} />
        <ProjectTile {...featured[3]} onNavigate={onNavigate} />
      </div>
      {featured[4] && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.625rem' }}>
          <ProjectTile {...featured[4]} onNavigate={onNavigate} />
        </div>
      )}
    </>
  );

  const renderUniform = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
      {featured.map(p => <ProjectTile key={p.id} {...p} onNavigate={onNavigate} featured={false} />)}
    </div>
  );

  const renderThree = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.625rem' }}>
      {PROJECTS.map(p => <ProjectTile key={p.id} {...p} onNavigate={onNavigate} featured={false} />)}
    </div>
  );

  return (
    <section style={{ padding: isMobile ? '3rem 1.25rem 4rem' : '5rem 2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: isMobile ? '1.5rem' : '2rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D45A1B', margin: 0 }}>
          Selected Work
        </p>
        <ArrowLink onClick={() => onNavigate('work')}>All projects</ArrowLink>
      </div>

      {isMobile
        ? renderMobileStack()
        : (<>
            {gridLayout === 'asymmetric' && renderAsymmetric()}
            {gridLayout === 'uniform' && renderUniform()}
            {gridLayout === 'three-col' && renderThree()}
            {gridLayout === 'wide' && renderAsymmetric()}
          </>)
      }

      <div style={{ marginTop: isMobile ? '2rem' : '3rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '14px', color: 'rgba(20,33,28,0.5)', margin: 0 }}>Mini studies, foundations, and playable experiments — the full index.</p>
        <ArrowLink onClick={() => onNavigate('work')}>More projects</ArrowLink>
      </div>
    </section>
  );
};

Object.assign(window, { PROJECTS, ProjectGrid });
