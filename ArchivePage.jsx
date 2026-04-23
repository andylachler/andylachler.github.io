// ArchivePage.jsx — featured graduate + undergraduate archive, with a quieter
// "Also" row for earlier work. Featured projects lead: Fluxing (thesis),
// Pastoral Urbanity, Mesa Verde, Elevate Ravenswood, and the Lehigh paper project
// (Unit Multiplication). The rest is still clickable but sits behind a divider.
//
// The archive mirrors the PROJECTS / PROJECT_DATA split used on the main portfolio:
//  - ARCHIVE_ITEMS is the list/grid metadata (shown on /archive)
//  - ARCHIVE_DATA is the full case study content (shown on /archive-project)
// Description prose is kept in sync between the two so tiles read the same as
// their detail page lede.

const ARCHIVE_ITEMS = [
  // ── Featured ───────────────────────────────────────────────────────────
  { id: 'fluxing', title: 'Fluxing', year: '2022', org: 'Pratt Institute', type: 'Graduate thesis', desc: 'A field station on Newtown Creek that diverts a combined sewer outflow through the building \u2014 making the city\u2019s waste visible and softening the boundary between urban and natural.', bg: '#14211C', imageIndex: 0, featured: true },
  { id: 'pastoral-urbanity', title: 'Pastoral Urbanity', year: '2021', org: 'Pratt Institute', type: 'Graduate studio', desc: 'A speculative expansion of Farragut Houses in Brooklyn, framed as commons-based housing. Derived from a Grasshopper aggregation script tuned to stack outdoor commons below and private residence above.', bg: '#3D5448', imageIndex: 1, featured: true },
  { id: 'mesa-verde', title: 'Mesa Verde', year: '2021', org: 'Pratt Institute', type: 'Graduate CAP studio', desc: 'A Waste-to-Energy plant and nightclub on the Anable Basin in Long Island City. Concrete paraboloid "mesas" cluster out of an existing warehouse and organize the program where their bases intersect.', bg: '#D45A1B', imageIndex: 2, silhouette: 'mesa-verde', featured: true },
  { id: 'elevate-ravenswood', title: 'Elevate Ravenswood', year: '2021', org: 'Pratt Institute', type: 'Graduate studio', desc: 'A mixed-use sports, education, and community-health building for the Ravenswood Community Land Trust. Mass timber, Vierendeel trusses, and a sunken basketball arena programmed to stay visible from the street.', bg: '#3D5448', imageIndex: 3, featured: true },
  { id: 'unit-multiplication', title: 'Unit Multiplication', year: '2018', org: 'Lehigh University', type: 'Independent study', desc: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. Density, curvature, and transparency emerge from the joint pattern rather than from the unit itself. With Prof. Hyun-Tae Jung.', bg: '#14211C', imageIndex: 4, featured: true },

  // ── Also ───────────────────────────────────────────────────────────────
  { id: 'bethlehem-riverfront', title: 'Bethlehem Riverfront', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'A park and small museum on the south bank of the Lehigh, stitched into the existing bike-and-running trail network.', bg: '#14211C', imageIndex: 5 },
  { id: 'bethlehem-culinary', title: 'Bethlehem Culinary Institute', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Four-story culinary school in South Bethlehem, programmed around the regional farm economy.', bg: '#3D5448', imageIndex: 6 },
  { id: 'one-room-schoolhouse', title: 'One Room Schoolhouse', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program.', bg: '#E8E4D5', imageIndex: 0 },
  { id: 'singular-flow', title: 'Singular Development + Flow', year: '2017', org: 'Lehigh University', type: 'Independent study', desc: 'A lightweight three-dimensional unit joined to a mirror of itself. Band thickness varies row to row to produce a flow of density.', bg: '#E8E4D5', imageIndex: 2 },
];
window.ARCHIVE_ITEMS = ARCHIVE_ITEMS;

// Detail-page data. Shape matches PROJECT_DATA so ArchiveProjectPage can reuse
// the ProjectPage pattern.
const ARCHIVE_DATA = {
  'fluxing': {
    title: 'Fluxing',
    org: 'Pratt Institute', year: '2022', role: 'Graduate thesis',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 0,
    lede: 'A field station on the Whale Creek Basin of Newtown Creek. Diverts a combined sewer outflow through the building so visitors come into direct visual contact with what the city dumps into the river.',
    body: 'Fluxing was my spring 2022 Pratt thesis (Prof. Philip Parker). The site \u2014 a hardscaped CSO outflow on Newtown Creek \u2014 is an artifact of New York\u2019s industrial waterfront, long since stripped of its natural form. The proposal rebuilds the edge as a soft boundary: a field station that brings people into contact with the tidal and sewer flows, and uses visibility as the instrument of environmental awareness.',
    process: [
      'Three driving principles. Influx / efflux as both material and idea \u2014 the CSO itself became a design element. Sarah Sze\u2019s relationship to ground as flux, fragility, and fracture. And the typology of a field station as public-facing infrastructure, built to be entered rather than bypassed.',
      'Formal language came from sand morphology in tidal zones. The field station follows those fluxing forms, intertwining human circulation with the CSO outflow so the two move through the building together.',
      'The project addresses two problems. The first is ecological \u2014 the oxygen dead zone the outflow creates. The second is civic: the invisibility of what we dump. By diverting the outflow through the building in plain view, infrastructure becomes legible. "Aesthetic infrastructure," as a non-hierarchical alternative to the utility-first civic systems David Solomon describes.',
    ],
    outcome: 'Graduate thesis, spring 2022. Site morphology studies, CSO diversion diagram, programmed sequence from Trakus nature walk into the gathering space, full rendering set.',
    credits: 'Pratt Institute, GSAUD. Advisor: Prof. Philip Parker. Co-teacher: Catheryn Dwyer. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Field station + CSO diversion' },
      { label: 'Site', value: 'Whale Creek Basin, Newtown Creek' },
      { label: 'Type', value: 'Graduate thesis' },
      { label: 'Year', value: '2022' },
    ],
    next: 'pastoral-urbanity',
  },

  'pastoral-urbanity': {
    title: 'Pastoral Urbanity',
    org: 'Pratt Institute', year: '2021', role: 'Graduate studio',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 1,
    lede: 'A speculative expansion of Farragut Houses in Brooklyn, framed as commons-based housing. Shared outdoor surfaces concentrate in the lower mass; private residences work their way up the tower above them.',
    body: 'Pastoral Urbanity was a fall 2021 Pratt studio proposal for the re-imagination of Farragut Housing (Prof. Sulan Kolatan, partner Shikai Huang). The studio started each team on a shared Grasshopper aggregation script; the design emerged from manipulating that script into a massing that could hold the pastoral and the urban at once. The argument: if the country can be brought into the city at small scale and its resources shared equally, the commons approach opens new terrain for what public housing can be.',
    process: [
      'Design moves came from tuning the script, not picking a typology. Scalar components combined into habitat clusters \u2014 residential units, vertical farm units, pet commons, communal outdoor commons \u2014 each cluster a different bundling of those components.',
      'Outdoor commons concentrate in the lower, larger sections of the tower where shared surfaces and vertical-farm infrastructure can anchor the ground plane. Private residential components work their way up above.',
      'Facade materials carry the cluster logic outward: fritted stone (BIPV-integrated), fritted walnut (BIPV), golden-frame glass, pre-cast rammed earth panels. Each reads as a different scale of use through the same aggregation language.',
    ],
    outcome: 'Graduate studio, fall 2021. Chunk models, facade and massing drawings, daytime and nighttime renderings.',
    credits: 'Pratt Institute, GSAUD, Kolatan studio, fall 2021. Partner: Shikai Huang. Professor: Sulan Kolatan. Co-teacher: Sandra Nataf.',
    details: [
      { label: 'Program', value: 'Public housing expansion' },
      { label: 'Site', value: 'Farragut Houses, Brooklyn' },
      { label: 'Partner', value: 'Shikai Huang' },
      { label: 'Year', value: '2021' },
    ],
    next: 'mesa-verde',
  },

  'mesa-verde': {
    title: 'Mesa Verde',
    org: 'Pratt Institute', year: '2021', role: 'Graduate CAP studio',
    bg: '#D45A1B', tileBg: '#D45A1B', imageIndex: 2, silhouette: 'mesa-verde',
    lede: 'A Waste-to-Energy plant and nightclub on the Anable Basin in Long Island City. Concrete paraboloid "mesas" cluster out of an existing warehouse and organize program where their bases intersect.',
    body: 'Mesa Verde was our spring 2021 Pratt CAP studio project (Prof. Gisela Bauermann, partner John D\u2019Onofrio). The brief combined a working Waste-to-Energy plant with a nightclub on the same parcel \u2014 infrastructure and nightlife in dialogue. The proposal organizes that combination as a cluster of concrete paraboloid forms rising out of an existing warehouse, each one tuned structurally and materially to the program it carries.',
    process: [
      'Concrete paraboloids are the primary structural system \u2014 self-supporting, able to carry large openings without internal bracing. A secondary steel space frame clad in frosted glass provides partial transparency where the industrial program needs to be visible, without exposing it completely.',
      'Programmatic bases intersect at ground level so the nightclub blurs into the industrial process. Visitors look through frosted panels into parts of the recycling operation \u2014 the club\u2019s main dance floor occupies a two-level atrium adjacent to the mechanical flow. MEP concentrates in three mechanical legs off the main cluster so the primary spaces stay clean.',
      'As a designated CAP studio, we worked with structural engineers and climate-comfort consultants to verify the paraboloids as a viable industrial-scale system. Wall assembly detailed as structural cast-in-place shell, non-structural stud framing, fiber-board insulation, and acoustic panels on the club side.',
    ],
    outcome: 'CAP studio final, spring 2021. Full architectural + structural package \u2014 site plan, sections through both program types, exploded wall assembly diagram, interior renderings.',
    credits: 'Pratt Institute, GSAUD, spring 2021. Partner: John D\u2019Onofrio. Professor: Gisela Bauermann. Co-teacher: Luz Wallace. Consultants: Cristobal Correa (structure), Corey Wowk (envelope), Stuart Bridgett (MEP).',
    details: [
      { label: 'Program', value: 'Waste-to-Energy plant + nightclub' },
      { label: 'Site', value: 'Anable Basin, Long Island City' },
      { label: 'Partner', value: 'John D\u2019Onofrio' },
      { label: 'Structure', value: 'Concrete paraboloids + steel space frame' },
    ],
    next: 'elevate-ravenswood',
  },

  'elevate-ravenswood': {
    title: 'Elevate Ravenswood',
    org: 'Pratt Institute', year: '2021', role: 'Graduate studio',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 3,
    lede: 'A mixed-use sports, education, and community-health building for the Ravenswood Community Land Trust. Mass timber, Vierendeel trusses, and a sunken basketball arena programmed to stay visible from the street.',
    body: 'Elevate Ravenswood was a fall 2021 Pratt studio (Prof. Meta Brunzema) for a building on Community Land Trust land in Ravenswood Houses, Queens. Three pillars drove the program \u2014 nutritional well-being, physical fitness, and social support \u2014 and three circulation cores plus a wooden Vierendeel truss system drove the structure, producing large uninterrupted interior spans that can change over time as the CLT\u2019s needs evolve.',
    process: [
      'The basketball arena was the conversation starter with the community. It sits sunken at grade and framed by glazing, so games are visible from the sidewalk. That visibility became the ground-floor organizing principle, not an afterthought.',
      'Flex spaces and community-health program \u2014 vocational culinary school, senior care, community meeting room, audio and visual recording studios \u2014 layer above the arena. The Vierendeel spans let those programs shift without restructuring the building.',
      'Phased: 68-foot phase 1 (~90,000 sf) and a 122-foot phase 2 (+30,000 sf) as funding permits. Mass timber chosen for low embodied carbon and construction-cost reduction \u2014 consistent with a Community Land Trust\u2019s long-horizon responsibility to its members.',
    ],
    outcome: 'Graduate studio, fall 2021. Phased construction logic, truss and core diagrams, program-by-pillar breakdown, site and perspective renderings.',
    credits: 'Pratt Institute, GSAUD, fall 2021. Professor: Meta Brunzema. Co-teacher: Carlos Acosta Perez. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Mixed-use CLT building' },
      { label: 'Site', value: 'Ravenswood Houses, Queens' },
      { label: 'Structure', value: 'Mass timber + Vierendeel truss' },
      { label: 'Phasing', value: '68\u2032 phase 1 \u00b7 122\u2032 phase 2' },
    ],
    next: 'unit-multiplication',
  },

  'unit-multiplication': {
    title: 'Unit Multiplication',
    org: 'Lehigh University', year: '2018', role: 'Independent study',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 4,
    lede: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. Density, curvature, and transparency emerge from the joint pattern rather than from the unit itself.',
    body: 'An independent study in parametric paper architecture at Lehigh. Starting from a single folded unit, the project tests how a field of units behaves when joined at controlled points by brass fasteners \u2014 how density, curvature, and transparency emerge from the joint pattern rather than from the unit itself. The same piece, recombined, produces a catalog of forms.',
    process: [
      'Folded a unit at fixed dimensions, then studied the form as a function of joint location. Every result came from the same unit; nothing was recut.',
      'Multiplied into larger planar assemblies, documented the resulting curvature, and catalogued the joint patterns against the emergent geometry. The project treats the joint as the operative design move \u2014 the paper is the substrate.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Physical artifacts and documentation.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Type', value: 'Independent study' },
      { label: 'Material', value: 'Paper, brass fasteners' },
      { label: 'Advisor', value: 'Prof. Hyun-Tae Jung' },
      { label: 'Year', value: '2018' },
    ],
    next: 'fluxing',
  },

  // ── Also (quieter entries — still clickable, still full detail pages) ──
  'bethlehem-riverfront': {
    title: 'Bethlehem Riverfront',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 5,
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
    next: 'bethlehem-culinary',
  },
  'bethlehem-culinary': {
    title: 'Bethlehem Culinary Institute',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 6,
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
    next: 'one-room-schoolhouse',
  },
  'one-room-schoolhouse': {
    title: 'One Room Schoolhouse',
    org: 'Lehigh University', year: '2017', role: 'Studio project',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 0,
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
    next: 'singular-flow',
  },
  'singular-flow': {
    title: 'Singular Development + Flow',
    org: 'Lehigh University', year: '2017', role: 'Independent study',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 2,
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
    next: 'bethlehem-riverfront',
  },
};
window.ARCHIVE_DATA = ARCHIVE_DATA;

const ArchivePage = ({ onNavigate }) => {
  const featured = ARCHIVE_ITEMS.filter(i => i.featured);
  const also = ARCHIVE_ITEMS.filter(i => !i.featured);
  const isMobile = (window.useIsMobile || (() => false))(768);

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 5rem' }}>
      <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Archive</p>
        <h1 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#14211C', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Before buildings, there were drawings of buildings that couldn&rsquo;t exist.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(20,33,28,0.6)', lineHeight: 1.65, margin: 0 }}>
          Graduate work from Pratt and selected independent studies from Lehigh, 2017&ndash;2022.
        </p>
      </div>

      {/* Featured archive projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.625rem',
        marginBottom: '4rem',
      }}>
        {featured.map(item => (
          <ArchiveTile key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Also — quieter, more compact */}
      {also.length > 0 && (
        <>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>Also from the archive</p>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(20,33,28,0.35)', margin: 0 }}>Lehigh · 2017</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.625rem',
          }}>
            {also.map(item => (
              <ArchiveTile key={item.id} item={item} onNavigate={onNavigate} compact />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

// Archive tile — same visual grammar as ProjectTile on the homepage:
// TilePlaceholder background, shimmer overlay, hover lift, ambient shadow.
// Clicking navigates to the archive detail page. `compact` mode renders at
// smaller scale for the "Also" row.
const ArchiveTile = ({ item, onNavigate, compact = false }) => {
  const [hov, setHov] = React.useState(false);
  const bg = item.bg;
  const light = bg === '#E8E4D5' || bg === '#F2EFE6';
  const textC = light ? '#14211C' : '#F2EFE6';
  const mutedC = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';
  // Description color — only rendered on hover, sits over the grey-out
  // overlay, so it uses a higher-opacity variant of the muted tone for
  // legibility without being as strong as the title.
  const descC = light ? 'rgba(20,33,28,0.75)' : 'rgba(242,239,230,0.85)';
  // Eyebrow color — mirrors the hero banner treatment. On dark tiles we
  // punch up to cream at 0.9 so the label pops against both the silhouette
  // and the warm background; light tiles keep their ink-at-0.5 tone.
  const eyebrowC = light ? mutedC : 'rgba(242,239,230,0.9)';

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
        padding: compact ? '1.1rem' : '1.5rem',
        minHeight: compact ? '180px' : '260px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1), box-shadow 250ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: shadow,
      }}
    >
      {/* Background SVG pattern — matches the homepage tile language. If the
          archive entry tags a `silhouette`, TilePlaceholder will render the
          project-specific outline instead of the generic pattern. */}
      {window.TilePlaceholder && <TilePlaceholder bg={bg} index={item.imageIndex} hovered={hov} silhouette={item.silhouette} />}

      {/* Top-down shimmer */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: light
          ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
      }} />

      {/* Hover grey-out — dims the silhouette + colors so the description
          reads clearly on hover. Sits above the silhouette but below the
          content stack (which has zIndex:1), so title + metadata stay
          un-dimmed while the background recedes. */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: light ? 'rgba(20,33,28,0.09)' : 'rgba(0,0,0,0.22)',
        opacity: hov ? 1 : 0,
        transition: 'opacity 220ms ease-out',
      }} />

      {/* Hover arrow */}
      <div style={{
        position: 'absolute', top: compact ? '1rem' : '1.25rem', right: compact ? '1rem' : '1.25rem',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translate(0,0)' : 'translate(-4px, 4px)',
        transition: 'opacity 180ms, transform 180ms',
        fontSize: '14px', color: textC,
      }}>→</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: compact ? '11px' : '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: eyebrowC, margin: '0 0 7px' }}>
          {item.org} · {item.year}
        </p>
        <p style={{ fontSize: compact ? '14px' : '16px', fontWeight: 500, color: textC, margin: '0 0 6px', lineHeight: 1.25 }}>{item.title}</p>
        {/* Description — hidden at rest, expands in on hover. Sits in its
            natural slot between title and type; max-height + margin animate
            so the tile visibly "opens up" rather than the desc just fading
            in over the type. */}
        {!compact && (
          <p style={{
            fontSize: '12px', color: descC, lineHeight: 1.5,
            margin: hov ? '0 0 6px' : 0,
            maxHeight: hov ? '120px' : 0,
            opacity: hov ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 280ms ease-out, opacity 220ms ease-out 60ms, margin 280ms ease-out',
          }}>{item.desc}</p>
        )}
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedC, margin: (compact ? '0.6rem' : '0.9rem') + ' 0 0' }}>{item.type}</p>
      </div>
    </div>
  );
};

// Archive project detail page — reuses the ProjectPage visual language.
// Hero tile, lede + body, process, details grid, and a "Next archive project" link.
const ArchiveProjectPage = ({ projectId, onNavigate }) => {
  const project = ARCHIVE_DATA[projectId] || ARCHIVE_DATA['fluxing'];
  const nextProject = project.next ? ARCHIVE_DATA[project.next] : null;
  const [heroHov, setHeroHov] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const isMobile = (window.useIsMobile || (() => false))(768);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); setHeroHov(false); }, [projectId]);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 450ms ease-out ${delay}ms, transform 450ms ease-out ${delay}ms`,
  });

  const light = project.tileBg === '#F2EFE6' || project.tileBg === '#E8E4D5';
  const heroText = light ? '#14211C' : '#F2EFE6';
  // Eyebrow on dark tiles: cream at high opacity. Linework has been dialed
  // back to ~0.35, so a cream eyebrow with a slight weight + size bump reads
  // cleanly over it without fighting the title for attention.
  const heroMuted = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.9)';

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem' }}>
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
          {/* Fading dot grid — sits behind the linework. Opacity fades from
              top (more visible) down through the text area (invisible), so the
              dots read as "distance" above the silhouette without competing
              with the title. Uses a pattern + mask so dots stay round at any
              hero aspect ratio. */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="mvHeroDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="14" cy="14" r="1.25" fill={heroText} />
              </pattern>
              <linearGradient id="mvHeroDotFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="mvHeroDotMask">
                <rect width="100%" height="100%" fill="url(#mvHeroDotFade)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="url(#mvHeroDots)" mask="url(#mvHeroDotMask)" />
          </svg>

          {/* Silhouette — fills the full banner. Text renders after this in
              DOM order, so the title overlays the linework as an architectural
              blueprint beneath it. `variant="hero"` keeps stroke + opacity
              subtle; the archive grid tile (default `variant="tile"`) uses
              the heavier treatment. */}
          {window.TilePlaceholder && <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={heroHov} silhouette={project.silhouette} variant="hero" />}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: light
              ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
              : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
          }} />
          <div style={{ position: 'absolute', inset: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: heroMuted, margin: '0 0 0.6rem' }}>
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
      <div style={{ ...fade(220), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)', gap: isMobile ? '2.5rem' : '4rem', marginBottom: isMobile ? '3rem' : '4rem' }}>
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
      <div style={{ ...fade(380), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)', gap: isMobile ? '2rem' : '4rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '3rem' : '4rem' }}>
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
