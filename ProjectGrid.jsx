// ProjectGrid.jsx
// Four canonical projects — Site search, Zoning chat, and Comps analysis are folded
// into the Feasibility platform case study rather than standing as separate entries.
const PROJECTS = [
  { id: 'autoease', title: 'AutoEase', org: 'Independent', year: '2026', role: 'Product Design — consumer car-buying prototype', bg: '#1A2520', featured: true, imageIndex: 6 },
  { id: 'feasibility', title: 'Feasibility platform', org: 'Algoma', year: '2024', role: 'Product Design — AI platform for real estate feasibility', bg: '#3D5448', featured: true, imageIndex: 0 },
  { id: 'ella', title: 'Ella', org: 'Arquitectonica', year: '2023', role: 'Architecture — 95-unit condo, Miami Beach', bg: '#D45A1B', featured: true, imageIndex: 2 },
  { id: 'brickell', title: 'Brickell residential', org: 'Arquitectonica', year: '2023', role: 'Architecture — 32-unit multifamily', bg: '#14211C', featured: true, imageIndex: 4 },
];

// expose so other pages can reference
window.PROJECTS = PROJECTS;

const ProjectGrid = ({ onNavigate, tweaks = {} }) => {
  const { gridLayout = 'asymmetric' } = tweaks;

  const featured = PROJECTS.slice(0, 4);

  const renderAsymmetric = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.625rem', marginBottom: '0.625rem' }}>
        <ProjectTile {...featured[0]} onNavigate={onNavigate} />
        <ProjectTile {...featured[1]} onNavigate={onNavigate} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.625rem' }}>
        <ProjectTile {...featured[2]} onNavigate={onNavigate} />
        <ProjectTile {...featured[3]} onNavigate={onNavigate} />
      </div>
    </>
  );

  const renderUniform = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
      {featured.map(p => <ProjectTile key={p.id} {...p} onNavigate={onNavigate} featured={false} />)}
    </div>
  );

  const renderWide = () => (
    <>
      {featured.map((p, i) => (
        <div key={p.id} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '3fr 1fr' : '1fr 3fr', gap: '0.625rem', marginBottom: '0.625rem' }}>
          <ProjectTile {...(i % 2 === 0 ? p : { ...featured[0], ...{ title: '', org: '' } })} onNavigate={onNavigate} featured />
          <ProjectTile {...(i % 2 === 0 ? featured[i + 1] || featured[0] : p)} onNavigate={onNavigate} />
        </div>
      )).filter((_, i) => i < 2)}
    </>
  );

  const renderThree = () => (
    // 4 tiles over 2 rows of 2 on narrow screens, 4-up on wide
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.625rem' }}>
      {PROJECTS.map(p => <ProjectTile key={p.id} {...p} onNavigate={onNavigate} featured={false} />)}
    </div>
  );

  return (
    <section style={{ padding: '5rem 2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D45A1B', margin: 0 }}>
          Selected Work
        </p>
        <ArrowLink onClick={() => onNavigate('work')}>All projects</ArrowLink>
      </div>

      {gridLayout === 'asymmetric' && renderAsymmetric()}
      {gridLayout === 'uniform' && renderUniform()}
      {gridLayout === 'three-col' && renderThree()}
      {gridLayout === 'wide' && renderAsymmetric()}

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '14px', color: 'rgba(20,33,28,0.5)', margin: 0 }}>Earlier work from Pratt and Lehigh, 2014–2022.</p>
        <ArrowLink onClick={() => onNavigate('archive')}>Archive</ArrowLink>
      </div>
    </section>
  );
};

Object.assign(window, { PROJECTS, ProjectGrid });
