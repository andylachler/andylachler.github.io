// ArchivePage.jsx — real Lehigh and Pratt work, homepage tile visual language,
// clickable into lightweight detail pages.
//
// The archive mirrors the PROJECTS / PROJECT_DATA split used on the main portfolio:
//  - ARCHIVE_ITEMS is the list/grid metadata (shown on /archive)
//  - ARCHIVE_DATA is the full case study content (shown on /archive-project)
// Description prose is kept in sync between the two so tiles read the same as
// their detail page lede.

const ARCHIVE_ITEMS = [
  { id: 'mesa-verde', title: 'Mesa Verde', year: '2021', org: 'Pratt Institute', type: 'Graduate studio', desc: 'Structural and spatial investigation into mesa-top habitation. Graduate studio, Pratt School of Architecture.', bg: '#3D5448', imageIndex: 0 },
  { id: 'bethlehem-riverfront', title: 'Bethlehem Riverfront', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'A park and small museum on the south bank of the Lehigh, stitched into the existing bike-and-running trail network to connect North and South Bethlehem across the river.', bg: '#14211C', imageIndex: 1 },
  { id: 'one-room-schoolhouse', title: 'One Room Schoolhouse', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program. Angular faceted roof tuned to keep young attention focused outward into the space.', bg: '#E8E4D5', imageIndex: 2 },
  { id: 'bethlehem-culinary', title: 'Bethlehem Culinary Institute', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Four-story culinary school in South Bethlehem. Programmed around the regional farm economy and the 30-minute gap in culinary schools across the Allentown\u2013Bethlehem\u2013Easton region.', bg: '#3D5448', imageIndex: 3 },
  { id: 'unit-multiplication', title: 'Unit Multiplication', year: '2018', org: 'Lehigh University', type: 'Independent study', desc: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. With Prof. Hyun-Tae Jung.', bg: '#14211C', imageIndex: 4 },
  { id: 'singular-flow', title: 'Singular Development + Flow', year: '2017', org: 'Lehigh University', type: 'Independent study', desc: 'A single lightweight three-dimensional unit joined to a mirror of itself. Viewable right-side up or upside-down \u2014 band thickness varies row to row to produce a flow of density through the form.', bg: '#E8E4D5', imageIndex: 5 },
];
window.ARCHIVE_ITEMS = ARCHIVE_ITEMS;

// Detail-page data. Short case studies — Andy can expand these over time. The
// shape matches PROJECT_DATA so ArchiveProjectPage can reuse the ProjectPage pattern.
const ARCHIVE_DATA = {
  'mesa-verde': {
    title: 'Mesa Verde',
    org: 'Pratt Institute', year: '2021', role: 'Graduate studio',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 0,
    lede: 'Structural and spatial investigation into mesa-top habitation. Graduate studio, Pratt School of Architecture.',
    body: 'A graduate studio project at Pratt that began with the Ancestral Puebloan cliff dwellings of Mesa Verde and asked what contemporary mesa-top habitation might look like \u2014 treated as a structural, climatic, and spatial problem rather than a historical reference.',
    process: [
      'Studied the original cliff-dwelling settlements as ecological systems: how water was harvested, where shade and thermal mass were deployed, how circulation moved vertically between dwelling and surface.',
      'Translated those operating principles into a new proposal for the mesa top \u2014 a ground plane of thickened masonry shelter with tuned apertures, paired with lighter timber structures above.',
    ],
    outcome: 'Graduate studio project. Drawings and physical model.',
    credits: 'Pratt Institute, Graduate School of Architecture. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Mesa-top habitation study' },
      { label: 'Type', value: 'Graduate studio' },
      { label: 'Year', value: '2021' },
    ],
    next: 'bethlehem-riverfront',
  },
  'bethlehem-riverfront': {
    title: 'Bethlehem Riverfront',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 1,
    lede: 'A park and small museum on the south bank of the Lehigh, stitched into the existing bike-and-running trail network to connect North and South Bethlehem across the river.',
    body: 'Bethlehem\u2019s two halves \u2014 the old steel north side and the industrial south side \u2014 are separated by the Lehigh River and a rail corridor. The project proposes a riverfront park and a small interpretive museum on the south bank, using the existing towpath and trail network as connective tissue back to the South Side and over to the North.',
    process: [
      'Traced the existing trail system and located the interventions at the gaps \u2014 places where a walker or cyclist currently has to dead-end or double back.',
      'Programmed the museum around the site\u2019s own history (steel, immigration, Moravian settlement) rather than importing a new subject. Kept the architecture low and long so the river stays the figure.',
    ],
    outcome: 'Undergraduate studio. Site plan, building plans, and perspective drawings.',
    credits: 'Lehigh University, Department of Art, Architecture and Design. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Park + museum' },
      { label: 'Location', value: 'South Bethlehem, PA' },
      { label: 'Type', value: 'Undergraduate studio' },
    ],
    next: 'one-room-schoolhouse',
  },
  'one-room-schoolhouse': {
    title: 'One Room Schoolhouse',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 2,
    lede: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program. Angular faceted roof tuned to keep young attention focused outward into the space.',
    body: 'A one-room schoolhouse expanded for contemporary program. The client was Lehigh\u2019s Psychology department and its early-childhood studies program, which needed a single dedicated room on the main green. The architectural question was how to make a single-volume structure that stays legible to a young user while still accommodating adult observation and circulation.',
    process: [
      'The roof became the main move \u2014 an angular faceted geometry that visually compresses the space where children sit, and opens up along the edges where adults move.',
      'A continuous band of clerestory lets daylight in without framing specific views, which kept attention inside the room on the activity rather than on the green outside.',
    ],
    outcome: 'Undergraduate studio. Plans, sections, and roof study model.',
    credits: 'Lehigh University. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Early childhood studies room' },
      { label: 'Location', value: 'Lehigh University green' },
      { label: 'Type', value: 'Undergraduate studio' },
    ],
    next: 'bethlehem-culinary',
  },
  'bethlehem-culinary': {
    title: 'Bethlehem Culinary Institute',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 3,
    lede: 'Four-story culinary school in South Bethlehem. Programmed around the regional farm economy and the 30-minute gap in culinary schools across the Allentown\u2013Bethlehem\u2013Easton region.',
    body: 'A four-story culinary institute in South Bethlehem. The brief was an \u201curban store\u201d generic; the project reframed it around a concrete regional gap \u2014 the 30-minute drive between the Lehigh Valley and the nearest culinary school \u2014 and tied the program to the farm economy of the surrounding region.',
    process: [
      'Anchored the program in a teaching kitchen at grade with a public-facing retail front, so the ground floor reads as a shop and not an institution.',
      'Classrooms, prep kitchens, and offices stack above with daylight from both long faces. A rooftop herb garden closes the produce loop visibly.',
    ],
    outcome: 'Undergraduate studio. Full design package with plans, sections, renderings, and program diagram.',
    credits: 'Lehigh University. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Culinary institute + retail' },
      { label: 'Location', value: 'South Bethlehem, PA' },
      { label: 'Stories', value: '4' },
    ],
    next: 'unit-multiplication',
  },
  'unit-multiplication': {
    title: 'Unit Multiplication',
    org: 'Lehigh University', year: '2018', role: 'Independent study',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 4,
    lede: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. With Prof. Hyun-Tae Jung.',
    body: 'An independent study in parametric paper architecture. Starting from a single folded unit, the project tests how a field of units behaves when joined at controlled points by brass fasteners \u2014 how density, curvature, and transparency emerge from the joint pattern rather than from the unit itself.',
    process: [
      'Folded a unit at fixed dimensions, then studied the form as a function of joint location. Every result came from the same unit; nothing was recut.',
      'Multiplied into larger planar assemblies, documented the resulting curvature, and catalogued the joint patterns against the emergent geometry.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Physical artifacts and documentation.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Type', value: 'Independent study' },
      { label: 'Material', value: 'Paper, brass fasteners' },
      { label: 'Year', value: '2018' },
    ],
    next: 'singular-flow',
  },
  'singular-flow': {
    title: 'Singular Development + Flow',
    org: 'Lehigh University', year: '2017', role: 'Independent study',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 5,
    lede: 'A single lightweight three-dimensional unit joined to a mirror of itself. Viewable right-side up or upside-down \u2014 band thickness varies row to row to produce a flow of density through the form.',
    body: 'An independent study in unit-based three-dimensional form. A single lightweight unit is joined to a mirror of itself, then varied by band thickness as the rows progress, producing a gradient of density through the form. The piece is designed to read either way up \u2014 top or bottom is a property of the viewer, not of the object.',
    process: [
      'Started from the reflected pair and treated it as the irreducible unit, rather than the single piece.',
      'Varied band thickness along the stack to tune how much light passes through \u2014 the resulting density reads as \u201cflow,\u201d which became the name.',
    ],
    outcome: 'Independent study. Physical artifact.',
    credits: 'Lehigh University. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Type', value: 'Independent study' },
      { label: 'Year', value: '2017' },
    ],
    next: 'mesa-verde',
  },
};
window.ARCHIVE_DATA = ARCHIVE_DATA;

const ArchivePage = ({ onNavigate }) => {
  const items = ARCHIVE_ITEMS;

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '8.5rem 2.5rem 5rem' }}>
      <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Archive</p>
        <h1 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#14211C', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Before buildings, there were drawings of buildings that couldn't exist.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(20,33,28,0.6)', lineHeight: 1.65, margin: 0 }}>
          Work from Lehigh and Pratt, 2014–2022.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.625rem',
      }}>
        {items.map(item => (
          <ArchiveTile key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </main>
  );
};

// Archive tile — same visual grammar as ProjectTile on the homepage:
// TilePlaceholder background, shimmer overlay, hover lift, ambient shadow.
// Clicking navigates to the archive detail page.
const ArchiveTile = ({ item, onNavigate }) => {
  const [hov, setHov] = React.useState(false);
  const bg = item.bg;
  const light = bg === '#E8E4D5' || bg === '#F2EFE6';
  const textC = light ? '#14211C' : '#F2EFE6';
  const mutedC = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  const shadow = hov
    ? (window.tileBoxShadow ? tileBoxShadow(bg, true) : 'none')
    : (window.tileInset ? tileInset(bg) : 'none');

  return (
    <div
      onClick={() => onNavigate && onNavigate('archive-project', item.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg, borderRadius: '10px',
        padding: '1.5rem',
        minHeight: '260px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1), box-shadow 250ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: shadow,
      }}
    >
      {/* Background SVG pattern — matches the homepage tile language */}
      {window.TilePlaceholder && <TilePlaceholder bg={bg} index={item.imageIndex} hovered={hov} />}

      {/* Top-down shimmer */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: light
          ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
      }} />

      {/* Hover tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hov ? (light ? 'rgba(20,33,28,0.03)' : 'rgba(0,0,0,0.05)') : 'transparent',
        transition: 'background 250ms',
      }} />

      {/* Hover arrow */}
      <div style={{
        position: 'absolute', top: '1.25rem', right: '1.25rem',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translate(0,0)' : 'translate(-4px, 4px)',
        transition: 'opacity 180ms, transform 180ms',
        fontSize: '14px', color: textC,
      }}>→</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedC, margin: '0 0 6px' }}>
          {item.org} · {item.year}
        </p>
        <p style={{ fontSize: '16px', fontWeight: 500, color: textC, margin: '0 0 6px', lineHeight: 1.25 }}>{item.title}</p>
        <p style={{ fontSize: '12px', color: mutedC, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedC, margin: '0.9rem 0 0' }}>{item.type}</p>
      </div>
    </div>
  );
};

// Archive project detail page — reuses the ProjectPage visual language.
// Hero tile, lede + body, process, details grid, and a "Next archive project" link.
const ArchiveProjectPage = ({ projectId, onNavigate }) => {
  const project = ARCHIVE_DATA[projectId] || ARCHIVE_DATA['mesa-verde'];
  const nextProject = project.next ? ARCHIVE_DATA[project.next] : null;
  const [heroHov, setHeroHov] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); setHeroHov(false); }, [projectId]);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 450ms ease-out ${delay}ms, transform 450ms ease-out ${delay}ms`,
  });

  const light = project.tileBg === '#F2EFE6' || project.tileBg === '#E8E4D5';
  const heroText = light ? '#14211C' : '#F2EFE6';
  const heroMuted = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '8.5rem 2.5rem 6rem' }}>
      {/* Back link */}
      <button
        onClick={() => onNavigate('archive')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '13px', color: 'rgba(20,33,28,0.55)',
          fontFamily: "'Inter', system-ui, sans-serif",
          marginBottom: '1.5rem',
          ...fade(0),
        }}
      >
        <span>←</span> Back to archive
      </button>

      {/* Hero tile */}
      <div style={{ ...fade(60), marginBottom: '4rem' }}>
        <div
          onMouseEnter={() => setHeroHov(true)}
          onMouseLeave={() => setHeroHov(false)}
          style={{
            background: project.tileBg, borderRadius: '10px',
            height: 'clamp(280px, 32vw, 420px)',
            position: 'relative', overflow: 'hidden',
            border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
          }}
        >
          {window.TilePlaceholder && <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={heroHov} />}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: light
              ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
              : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
          }} />
          <div style={{ position: 'absolute', inset: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: heroMuted, margin: '0 0 0.5rem' }}>
              {project.org} · {project.year} · {project.role}
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: heroText, margin: 0 }}>
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Lede */}
      <div style={{ ...fade(140), maxWidth: '760px', marginBottom: '3rem' }}>
        <p style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 400, lineHeight: 1.55, color: '#14211C', margin: 0 }}>
          {project.lede}
        </p>
      </div>

      {/* Body + details two-column */}
      <div style={{ ...fade(220), display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Context</p>
          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.body}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Details</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
            {project.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.1)', gap: '1rem' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.5)' }}>{d.label}</span>
                <span style={{ fontSize: '13px', color: '#14211C', textAlign: 'right' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      {project.process && (
        <div style={{ ...fade(300), marginBottom: '4rem', maxWidth: '760px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Process</p>
          {project.process.map((p, i) => (
            <p key={i} style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', marginBottom: '1rem' }}>{p}</p>
          ))}
        </div>
      )}

      {/* Outcome + credits */}
      <div style={{ ...fade(380), display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '3rem', marginBottom: '4rem' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Outcome</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.outcome}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Credits</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.credits}</p>
        </div>
      </div>

      {/* Next archive project */}
      {nextProject && (
        <div style={{ ...fade(460), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: '0 0 0.35rem' }}>Next archive project</p>
            <p style={{ fontSize: '20px', fontWeight: 500, color: '#14211C', margin: 0, letterSpacing: '-0.01em' }}>{nextProject.title}</p>
          </div>
          <button onClick={() => onNavigate('archive-project', project.next)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '14px', fontWeight: 500, color: '#14211C',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          }}>
            Open <span>→</span>
          </button>
        </div>
      )}
    </main>
  );
};

Object.assign(window, { ARCHIVE_ITEMS, ARCHIVE_DATA, ArchivePage, ArchiveTile, ArchiveProjectPage });
