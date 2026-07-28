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
  { id: 'unit-multiplication', title: 'Unit Multiplication', year: '2018', org: 'Lehigh University', type: 'Craft — paper model', desc: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. Density, curvature, and transparency emerge from the joint pattern rather than from the unit itself. With Prof. Hyun-Tae Jung.', bg: '#14211C', imageIndex: 4, featured: true },
  { id: 'brickell', title: 'Midtown Walk', year: '2024', org: 'Arquitectonica', type: 'Professional — design documentation', desc: 'Two residential towers over a retail podium at 3000 NE 1st Ave, part of the Midtown Park masterplan in Miami. Studio-to-3BR tower plates, level-by-level podium documentation, and street elevations, iterated against the unit matrix and Miami 21 zoning.', bg: '#14211C', imageIndex: 4, featured: true },

  // ── Playable ──────────────────────────────────────────────────────────
  // Unity / WebGL experiments — self-initiated. Architecture-adjacent:
  // terrain, environment, physics, real-time lighting. Each project page
  // offers a "Play in browser" button that lazy-loads the Unity canvas.
  // 'ground-is-lava' removed from the grid July 2026 (structure pass); 'ball-game'
  // pulled Jul 22 2026 (WebGL export unfinished — not worth hosting yet). Detail
  // data for both retained below; restore by re-adding an item here. With no
  // items left, the Playable section auto-hides.

  // ── Also ───────────────────────────────────────────────────────────────
  { id: 'bethlehem-riverfront', title: 'Bethlehem Riverfront', year: '2017', org: 'Lehigh University', type: 'Craft — physical model', desc: 'A park and small museum on the south bank of the Lehigh, stitched into the existing bike-and-running trail network.', bg: '#14211C', imageIndex: 5 },
  { id: 'bethlehem-culinary', title: 'Bethlehem Culinary Institute', year: '2017', org: 'Lehigh University', type: 'Craft — physical model', desc: 'Four-story culinary school in South Bethlehem, programmed around the regional farm economy.', bg: '#3D5448', imageIndex: 6 },
  { id: 'one-room-schoolhouse', title: 'One Room Schoolhouse', year: '2017', org: 'Lehigh University', type: 'Craft — physical model', desc: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program.', bg: '#E8E4D5', imageIndex: 0 },
  { id: 'singular-flow', title: 'Singular Development + Flow', year: '2017', org: 'Lehigh University', type: 'Craft — paper model', desc: 'A lightweight three-dimensional unit joined to a mirror of itself. Band thickness varies row to row to produce a flow of density.', bg: '#E8E4D5', imageIndex: 2 },
  { id: 'dissection', title: 'Dissection', year: '2019', org: 'Pratt Institute', type: 'Intro sequence', desc: 'An everyday object cut apart on paper. Make2D linework, section planes, and three drawing iterations from the first-semester intro sequence.', bg: '#E8E4D5', imageIndex: 3 },
];
window.ARCHIVE_ITEMS = ARCHIVE_ITEMS;

// Detail-page data. Shape matches PROJECT_DATA so ArchiveProjectPage can reuse
// the ProjectPage pattern.
const ARCHIVE_DATA = {
  'dissection': {
    title: 'Dissection',
    org: 'Pratt Institute', year: '2019', role: 'Intro sequence — drawing',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 3,
    lede: 'An everyday object taken apart on paper, then rebuilt in the material. Dissection drawings and the constructed cutout from the first-semester intro sequence at Pratt.',
    body: 'The exercise started two-dimensional: dissect a familiar object and redraw it as a precise projection system. Section planes slice the volume, Make2D linework flattens it, and hatch and color progressively separate skin, cut surface, and interior void — three iterations of the same drawing, the visual language tightening with each pass. The drawing then left the page: the linework was projected onto a primitive volume to inform the cutout and the void constructed physically — a layered paper relief and a plywood-and-paper model that rebuild the dissection in three dimensions.',
    process: [
      'The three drawing passes run as a triptych below — linework, then tone, then color, each pass sharpening the separation of skin, cut, and void.',
      'The projection step turned the 2D system into instructions for making: crumpled-paper primitives established the receiving volume, and the projected linework drove the cutout — where material was removed and where the void was built up in plywood strata.',
    ],
    outcome: 'Drawing series and constructed models, Fall 2019.',
    credits: 'Pratt Institute, graduate intro sequence. Andreas Lächler.',
    details: [
      { label: 'Course', value: 'Intro sequence, first semester' },
      { label: 'Medium', value: 'Rhino Make2D · Illustrator · paper, plywood' },
      { label: 'Year', value: '2019' },
    ],
    galleryCols: 3,
    next: 'unit-multiplication',
  },
  'brickell': {
    title: 'Midtown Walk',
    org: 'Arquitectonica', year: '2024', role: 'Architecture — design documentation',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 4,
    lede: 'Two residential towers over a retail podium at 3000 NE 1st Avenue, in Miami’s Midtown. Part of the Midtown Park masterplan — towers, plazas, shopping, and office parcels knitted into a walkable district.',
    body: 'A two-tower multifamily development on the block between N. Miami Avenue and NE 31st Street, developed at Arquitectonica as part of the larger Midtown Park masterplan. Each tower carries its own typical residential plate — unit mixes running from studios and junior one-bedrooms through three-bedrooms — over a shared podium of parking levels wrapped with retail at grade. The drawing set is where the project actually lived: site and zoning diagrams, level-by-level podium plans, tower plates, and street elevations, iterated against the developer’s unit matrix and Miami 21 zoning.',
    process: [
      'The podium is the hard problem — stacking the parking count inside the allowable envelope while keeping the ground floor retail-active on the avenue. A large share of the set is level-by-level podium plans reconciling ramps, cores, and liner depths.',
      'Tower plates were driven by the unit matrix: studio through 3BR mixes per level, with the two towers carrying different plate geometries on a shared podium grid.',
      'Documented as a progress set — conceptual numbers flagged for refinement as structure and MEP came aboard — which meant drawing for coordination, not just presentation.',
    ],
    outcome: 'Progress set issued July 2024. Development ongoing.',
    credits: 'Arquitectonica. Team member: Andreas Lächler. Masterplan renderings courtesy of the Midtown Park development.',
    details: [
      { label: 'Program', value: 'Two residential towers + retail podium' },
      { label: 'Location', value: '3000 NE 1st Ave, Midtown Miami' },
      { label: 'Masterplan', value: 'Midtown Park' },
      { label: 'Year', value: '2023–24' },
    ],
    // The four street elevations lead the page full width (01–04); the
    // masterplan renders follow in the two-up gallery grid.
    leadCount: 4, leadLabel: 'Street elevations',
    next: 'fluxing',
  },
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
    org: 'Lehigh University', year: '2018', role: 'Craft — paper model',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 4,
    lede: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. Density, curvature, and transparency emerge from the joint pattern rather than from the unit itself.',
    body: 'An independent study in parametric paper architecture at Lehigh. Starting from a single folded unit, the project tests how a field of units behaves when joined at controlled points by brass fasteners \u2014 how density, curvature, and transparency emerge from the joint pattern rather than from the unit itself. The same piece, recombined, produces a catalog of forms.',
    process: [
      'Each unit stems from a simple geometric shape: folded to establish verticality, cut to establish form, then opened with voids to allow variance. The unit is cut flat \u2014 fold lines and fastener points printed on the sheet \u2014 so every result comes from the same unit; nothing was recut.',
      'Brass fasteners act as the mesh that holds each unit together and the model as a whole. Rows are offset according to void-size variation, and a fastener locks each offset \u2014 the joint pattern, not the unit, sets the directions of flow across the field.',
      'Because the fasteners are the only color in the model, their organization and density become the visual emphasis. The voids read darker than the surrounding paper, so weight disparity expands and contracts from one end of the form to the other.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Final field model 5\u2032 \u00d7 2\u00bd\u2032 in bristol paper and brass fasteners, plus documentation.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Type', value: 'Independent study' },
      { label: 'Material', value: 'Bristol paper, brass fasteners' },
      { label: 'Final model', value: '5\u2032 \u00d7 2\u00bd\u2032' },
      { label: 'Advisor', value: 'Prof. Hyun-Tae Jung' },
      { label: 'Year', value: '2018' },
    ],
    next: 'fluxing',
  },

  // ── Also (quieter entries — still clickable, still full detail pages) ──
  'bethlehem-riverfront': {
    title: 'Bethlehem Riverfront',
    org: 'Lehigh University', year: '2017', role: 'Craft — physical model',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 5,
    lede: 'A riverfront park on the south bank of the Lehigh, stitched into the existing bike-and-running trail network to connect North and South Bethlehem across the river.',
    body: 'Bethlehem\u2019s two halves are separated by the Lehigh River. The North side has the D&L and Sand Island trails; the South side \u2014 the industrial worker\u2019s side, searching for a new identity since Bethlehem Steel closed \u2014 has only a short stretch of path along the Greenway and almost no accessible green space, forcing residents across the bridges to reach recreation. The project proposes a riverfront park between the New St. and Hill-to-Hill bridges as the missing link: a center for cultural, social, and leisure activity on a site the existing infrastructure already touches.',
    process: [
      'Circulation is organized around four speeds of movement: a separated bicycle path for quick passage, a direct pedestrian walkway for those continuing past the park, an elevated walkway with seating and a connection to the bridge, and local circulation that breaks down and encloses the spaces within the park itself.',
      'The program is drawn from what the South side lacks \u2014 a local supermarket and farmers market, a performance venue sized for Musikfest, a dog park, waterfront seating \u2014 with a future bike-path extension linking the Greenway, the D&L Trail, and the ArtsQuest pedestrian area at the steel stacks.',
      'Rail tracks from the Bethlehem Steel era run through the site; the proposal reuses the steel rails and ties in the park\u2019s built elements, tying the development back into the history of the ground it sits on.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Site analysis, circulation studies, and a full physical model of the park.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Riverfront park + venue' },
      { label: 'Location', value: 'South Bethlehem, PA' },
      { label: 'Site', value: 'New St. \u2013 Hill-to-Hill Bridge' },
      { label: 'Type', value: 'Independent study' },
    ],
    next: 'bethlehem-culinary',
  },
  'bethlehem-culinary': {
    title: 'Bethlehem Culinary Institute',
    org: 'Lehigh University', year: '2017', role: 'Craft — physical model',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 6,
    lede: 'Four-story culinary school in South Bethlehem. Programmed around the regional farm economy and the 30-minute gap in culinary schools across the Allentown\u2013Bethlehem\u2013Easton region.',
    body: 'A four-story culinary institute in South Bethlehem, reframed around a concrete regional gap \u2014 every other culinary school is 30+ minutes from the Allentown\u2013Bethlehem\u2013Easton region \u2014 and tied to the farm economy around it. Agriculture is Pennsylvania\u2019s largest export, and the farm-to-table program uses local, in-season sourcing to connect students to their community while teaching flexibility and waste discipline. The site\u2019s slope and the empty plot behind the building give it continuous access to the Bethlehem Greenway.',
    process: [
      'The organizing move is a set of bands that run through the building and designate its circulation. Offsetting the bands pulls natural light into the middle portions of the building \u2014 not just the ends \u2014 and opens a gap between the institute and its neighbors on either side.',
      'Circulation sits at the center of the plan so every floor uses its full depth. The public program faces outward: a market leads onto the Greenway with a rotating menu of student-prepared items, and the event space showcases student work, with mixology placed just off it so it doubles as a bar during events.',
      'Teaching splits by mode \u2014 hands-on cooking spaces for technique, a classroom for the business side \u2014 with cold storage for aging and ingredient experiments, and administrative space above.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Site analysis, program sections, and a sectional model at 3/16\u2033 scale in basswood and acrylic.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Culinary institute + market' },
      { label: 'Location', value: 'South Bethlehem, PA' },
      { label: 'Stories', value: '4' },
      { label: 'Model', value: '3/16\u2033 scale, basswood + acrylic' },
    ],
    next: 'one-room-schoolhouse',
  },
  'one-room-schoolhouse': {
    title: 'One Room Schoolhouse',
    org: 'Lehigh University', year: '2017', role: 'Craft — physical model',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 0,
    lede: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program. Angular faceted roof tuned to keep young attention focused outward into the space.',
    body: 'A one-room schoolhouse for Lehigh\u2019s Psychology department, whose child studies program \u2014 working with children with ADHD, anxiety, depression, and autism \u2014 had outgrown an inadequate borrowed room. The proposal gives the program its own building with a deliberately simple plan, on the premise that a classroom\u2019s culture and its learning space are tightly linked. The complex angular exterior is the point: it draws children\u2019s attention away from the idea that they are at school, keeping them focused on the learning environment instead.',
    process: [
      'Sited in the core of the university grounds, in a large green space ringed by historic buildings \u2014 pedestrian, vehicular, and accessible routes already reach it, and the placement keeps the schoolhouse visible from the University Center and the front lawn.',
      'The form was developed in three passes: a primary form identified and varied, a secondary form draped and fragmented over it, and a tertiary faceted roof structure. Skin emphasizes form \u2014 linework accentuates the tubes and separates them from the fractured, angular roof.',
      'Inside, the cross-shaped plan holds a quiet work space, mixed-use space, storage, and two entrances, with a sloped pathway for easy access and outdoor recreation space on the terraced site.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Elevations, form studies, and a 27\u2033 \u00d7 32\u2033 site model at 3/16\u2033 scale in chipboard and bristol paper.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Program', value: 'Child studies schoolhouse' },
      { label: 'Location', value: 'Lehigh University green' },
      { label: 'Model', value: '27\u2033 \u00d7 32\u2033, 3/16\u2033 scale' },
      { label: 'Type', value: 'Independent study' },
    ],
    next: 'singular-flow',
  },
  'singular-flow': {
    title: 'Singular Development + Flow',
    org: 'Lehigh University', year: '2017', role: 'Craft — paper model',
    bg: '#E8E4D5', tileBg: '#E8E4D5', imageIndex: 2,
    lede: 'A single lightweight three-dimensional unit joined to a mirror of itself. Viewable right-side up or upside-down \u2014 band thickness varies row to row to produce a flow of density through the form.',
    body: 'An independent study in unit-based three-dimensional form. A single lightweight unit is joined to a mirror of itself, then varied by band thickness as the rows progress, producing a gradient of density through the form. The piece is designed to read either way up \u2014 top or bottom is a property of the viewer, not of the object.',
    process: [
      'The unit sequence: establish the unit, create disruptions in it, join opposite ends, fold the remaining ends together \u2014 the final form is the original unit with its own reflection glued behind it. The reflected pair, not the single piece, is the irreducible element.',
      'Band thickness determines unit variation. Rows thicken toward the center and thin at the ends, producing a flow of density through the form \u2014 which became the name.',
      'Red tabs connect the units and establish order in the model; their color accentuates the linear elements in an otherwise complex array of forms, and the assembly holds its identity viewed from any orientation.',
    ],
    outcome: 'Independent study with Prof. Hyun-Tae Jung. Final model 2\u00bd\u2032 \u00d7 1\u00bc\u2032 in sketchbook paper, colored paper, and glue.',
    credits: 'Lehigh University. Advisor: Prof. Hyun-Tae Jung. Student: Andreas L\u00e4chler.',
    details: [
      { label: 'Type', value: 'Independent study' },
      { label: 'Material', value: 'Sketchbook + colored paper' },
      { label: 'Final model', value: '2\u00bd\u2032 \u00d7 1\u00bc\u2032' },
      { label: 'Year', value: '2017' },
    ],
    next: 'bethlehem-riverfront',
  },
  // ── Playable (Unity / WebGL) ─────────────────────────────────────────
  // `unityBuild` points to the build's index folder (we only reference the
  // Build/ + loader.js; the embed code owns its own canvas chrome, so we
  // don't use Unity's default index.html).
  'ground-is-lava': {
    title: 'Ground Is Lava',
    org: 'Self-initiated', year: '2024', role: 'Unity / WebGL',
    bg: '#3D5448', tileBg: '#3D5448', imageIndex: 1,
    lede: 'A 3D terrain-and-ramps exercise built in Unity. Lava rises from the floor; a first-person camera traverses a network of raised platforms and ramps before the ground is gone.',
    body: 'Ground Is Lava was a self-directed exercise to get comfortable with real-time 3D outside the architectural-render pipeline. The goal was to understand Unity\u2019s terrain tools, physics-based movement, URP materials, and play-state logic \u2014 how a spatial designer thinks differently when the scene is something you move through instead of look at.',
    process: [
      'Built the terrain using Unity\u2019s heightmap editor, then hand-placed ramps and site objects imported from SketchUp as OBJ. Kept the geometry intentionally blocky so the rising lava reads as the primary event.',
      'Rising-lava mechanic driven by a simple time-based Y translation on a wide volume with an emissive URP Lit material. Collision triggers end-game.',
      'First-person controller uses a CharacterController with standard WASD + jump. Camera rig parented to the controller with a mouse-look script.',
      'Exported to WebGL for the web so the project can be played in-browser without install friction.',
    ],
    outcome: 'Self-directed Unity study, 2024. Playable build embedded below \u2014 desktop recommended.',
    credits: 'Self-initiated. Andreas L\u00e4chler.',
    details: [
      { label: 'Engine', value: 'Unity 2022 LTS' },
      { label: 'Target', value: 'WebGL' },
      { label: 'Type', value: 'Self-directed study' },
      { label: 'Year', value: '2024' },
    ],
    unityBuild: 'unity/ground-is-lava/',
    next: 'ball-game',
  },

  'ball-game': {
    title: 'Ball Game',
    org: 'Self-initiated', year: '2024', role: 'Unity / WebGL',
    bg: '#14211C', tileBg: '#14211C', imageIndex: 0,
    lede: 'A small interactive ball-and-environment piece. Outdoor scene, camera rig, physics-driven movement \u2014 built as a scripting and prefab sandbox.',
    body: 'Ball Game is a companion study to Ground Is Lava. Where that project focused on terrain and environment, this one is about object behavior: prefabs, scripts, collision layers, and a camera that tracks a physics object without getting in its way.',
    process: [
      'Outdoor scene reused the SketchUp-authored site mesh from earlier architectural work, imported as OBJ and retopologized for Unity lightmap baking.',
      'Ball is a prefab with Rigidbody + SphereCollider; input maps WASD to AddForce so the physics simulator \u2014 not the script \u2014 decides the movement feel.',
      'Camera rig follows the ball with smoothed translation and a small angular offset so the horizon tilts with movement.',
    ],
    outcome: 'Self-directed Unity study, 2024. Playable build in progress \u2014 WebGL export pending.',
    credits: 'Self-initiated. Andreas L\u00e4chler.',
    details: [
      { label: 'Engine', value: 'Unity 2022 LTS' },
      { label: 'Target', value: 'WebGL' },
      { label: 'Type', value: 'Self-directed study' },
      { label: 'Year', value: '2024' },
    ],
    // unityBuild: 'unity/ball-game/',  // ← Uncomment + drop build into portfolio/unity/ball-game/
    unityPending: true,
    next: 'brickell',
  },

};

// Portfolio-book metadata — which book a project's pages come from and how
// they lay out. The 2018 undergrad book is wide 2.4:1 spreads (stacked
// full-width); the 2022 M.Arch book is portrait letter pages (2-up grid).
['singular-flow', 'unit-multiplication', 'bethlehem-riverfront', 'bethlehem-culinary', 'one-room-schoolhouse'].forEach(id => {
  if (ARCHIVE_DATA[id]) ARCHIVE_DATA[id].bookLabel = 'From the portfolio book · 2018';
});
['fluxing', 'pastoral-urbanity', 'mesa-verde', 'elevate-ravenswood'].forEach(id => {
  if (ARCHIVE_DATA[id]) Object.assign(ARCHIVE_DATA[id], { bookLabel: 'From the M.Arch portfolio · 2022', bookCols: 2 });
});
window.ARCHIVE_DATA = ARCHIVE_DATA;

const ArchivePage = ({ onNavigate }) => {
  const featured = ARCHIVE_ITEMS.filter(i => i.featured);
  const playable = ARCHIVE_ITEMS.filter(i => i.section === 'playable');
  const also = ARCHIVE_ITEMS.filter(i => !i.featured && i.section !== 'playable');
  const isMobile = (window.useIsMobile || (() => false))(768);

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 5rem' }}>
      <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Foundations</p>
        <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(32px,3.8vw,50px)', fontWeight: 400, letterSpacing: '-0.03em', color: '#14211C', lineHeight: 1.05, marginBottom: '1.25rem' }}>
          Learning to think with my hands.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(20,33,28,0.6)', lineHeight: 1.65, margin: 0 }}>
          Graduate work from Pratt, studies from Lehigh, and early professional work, 2017&ndash;2023 — shown for what they are: model making, material studies, and physical craft. These are the foundations under the product work. Each tile&rsquo;s linework is hand-traced from the original project.
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

      {/* Playable — Unity / WebGL experiments. Same grid dimensions as
          Featured, but behind a labeled divider so the section reads as
          a separate category from the architectural work. */}
      {playable.length > 0 && (
        <>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>Playable</p>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(20,33,28,0.35)', margin: 0 }}>Unity &middot; WebGL</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.625rem',
            marginBottom: '4rem',
          }}>
            {playable.map(item => (
              <ArchiveTile key={item.id} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </>
      )}

      {/* Also — quieter, more compact */}
      {also.length > 0 && (
        <>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0 }}>Also from the archive</p>
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
      {/* Offset media layout: tile image (manifest) renders as an inset media
          card above the text. Silhouette/pattern full-bleed is the fallback. */}
      {((window.IMAGE_MANIFEST || {})[item.id] || {}).tile ? (
        <div style={{
          position: 'relative', zIndex: 1, flex: 1,
          minHeight: compact ? '110px' : '150px',
          borderRadius: '14px', overflow: 'hidden',
          marginBottom: compact ? '0.9rem' : '1.1rem',
          background: light ? 'rgba(20,33,28,0.05)' : 'rgba(0,0,0,0.25)',
        }}>
          <img
            src={window.IMAGE_MANIFEST[item.id].tile} alt="" loading="lazy"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
      ) : (
        window.ProjectVisual && <ProjectVisual projectId={item.id} bg={bg} index={item.imageIndex} hovered={hov} silhouette={item.silhouette} />
      )}

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
        <p style={{ fontSize: compact ? '11px' : '12px', fontWeight: 600, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: eyebrowC, margin: '0 0 7px' }}>
          {item.org} · {item.year}
        </p>
        <p style={{ fontFamily: 'var(--ff-serif)', fontSize: compact ? '17px' : '20px', fontWeight: 400, color: textC, margin: '0 0 6px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{item.title}</p>
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
// Hero tile, lede + body, process, details grid, and a "Next in Foundations" link.
const ArchiveProjectPage = ({ projectId, onNavigate }) => {
  const project = ARCHIVE_DATA[projectId] || ARCHIVE_DATA['fluxing'];
  const nextProject = project.next ? ARCHIVE_DATA[project.next] : null;
  const [heroHov, setHeroHov] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const isMobile = (window.useIsMobile || (() => false))(768);
  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    setHeroHov(false);
    setPlaying(false); // reset Unity embed when navigating between projects
  }, [projectId]);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 450ms ease-out ${delay}ms, transform 450ms ease-out ${delay}ms`,
  });

  const light = project.tileBg === '#F2EFE6' || project.tileBg === '#E8E4D5';
  // Photo heroes always take cream text over the HeroGlass strip — the
  // tileBg-based ink/cream split only applies to flat linework banners.
  const heroPhoto = !!(((window.IMAGE_MANIFEST || {})[projectId] || {}).hero || ((window.IMAGE_MANIFEST || {})[projectId] || {}).tile);
  const heroText = heroPhoto ? '#F2EFE6' : (light ? '#14211C' : '#F2EFE6');
  // Eyebrow on dark tiles: cream at high opacity. Linework has been dialed
  // back to ~0.35, so a cream eyebrow with a slight weight + size bump reads
  // cleanly over it without fighting the title for attention.
  const heroMuted = heroPhoto ? 'rgba(242,239,230,0.8)' : (light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.9)');

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem' }}>
      {/* Back link */}
      <button
        onClick={() => onNavigate('work')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '13px', color: 'rgba(20,33,28,0.55)',
          fontFamily: "'Inter', system-ui, sans-serif",
          marginBottom: '1.5rem',
          ...fade(0),
        }}
      >
        <span>←</span> Back to work
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
          {window.ProjectVisual && <ProjectVisual projectId={projectId} kind="hero" bg={project.tileBg} index={project.imageIndex} hovered={heroHov} silhouette={project.silhouette} variant="hero" />}
          {/* Liquid-glass legibility strip — frosted blur fading out above
              the title (July 2026, replaces the plain dark gradient). */}
          {window.HeroGlass && <HeroGlass light={light && !heroPhoto} />}
          {!heroPhoto && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: light
                ? 'linear-gradient(rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0) 100%)'
                : 'linear-gradient(rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
            }} />
          )}
          <div style={{ position: 'absolute', inset: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: heroMuted, margin: '0 0 0.6rem', textShadow: heroPhoto ? '0 1px 10px rgba(11,21,19,0.5)' : 'none' }}>
              {project.org} · {project.year} · {project.role}
            </p>
            <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(32px, 4.2vw, 52px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.04, color: heroText, margin: 0, textShadow: heroPhoto ? '0 1px 2px rgba(11,21,19,0.5), 0 2px 22px rgba(11,21,19,0.45)' : 'none' }}>
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Playable — Unity / WebGL embed. Only renders when the project
          declares either a ready build (`unityBuild`) or a pending one
          (`unityPending`). The iframe is lazy: we don't inject it until
          the user clicks Play, so the 14MB WebGL bundle never loads for
          visitors just browsing the detail page. */}
      {(project.unityBuild || project.unityPending) && (
        <div style={{ ...fade(100), marginBottom: '3rem' }}>
          {!playing && project.unityBuild && (
            <div style={{
              background: '#F2EFE6',
              border: '0.5px solid rgba(20,33,28,0.12)',
              borderRadius: '10px',
              padding: isMobile ? '1.5rem' : '2rem',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: '0 0 0.5rem' }}>Play in browser</p>
                <p style={{ fontSize: '15px', color: 'rgba(20,33,28,0.75)', lineHeight: 1.55, margin: 0, maxWidth: '52ch' }}>
                  Unity WebGL build &middot; ~14 MB download on first play. Keyboard + mouse &middot; desktop recommended.
                </p>
              </div>
              <button
                onClick={() => setPlaying(true)}
                style={{
                  background: '#14211C', color: '#F2EFE6', border: 'none',
                  padding: '0.8rem 1.6rem', borderRadius: '8px',
                  fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em',
                  cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '12px' }}>&#9654;</span> Play {project.title}
              </button>
            </div>
          )}
          {playing && project.unityBuild && (
            <div style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#14211C',
              aspectRatio: '16 / 9',
            }}>
              <iframe
                src={project.unityBuild}
                title={project.title}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                allow="autoplay; fullscreen; gamepad"
                allowFullScreen
              />
              <button
                onClick={() => setPlaying(false)}
                style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  background: 'rgba(20,33,28,0.85)', color: '#F2EFE6',
                  border: '0.5px solid rgba(242,239,230,0.2)',
                  padding: '0.4rem 0.8rem', borderRadius: '6px',
                  fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Stop
              </button>
            </div>
          )}
          {!project.unityBuild && project.unityPending && (
            <div style={{
              background: '#F2EFE6',
              border: '0.5px dashed rgba(20,33,28,0.2)',
              borderRadius: '10px',
              padding: isMobile ? '1.5rem' : '2rem',
            }}>
              <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: '0 0 0.5rem' }}>Playable &middot; build in progress</p>
              <p style={{ fontSize: '15px', color: 'rgba(20,33,28,0.75)', lineHeight: 1.55, margin: 0, maxWidth: '52ch' }}>
                The WebGL export for this project is not yet published. Check back soon &mdash; or see the companion project for a playable Unity build.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Lede */}
      <div style={{ ...fade(140), maxWidth: '760px', marginBottom: '3rem' }}>
        <p style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 400, lineHeight: 1.55, color: '#14211C', margin: 0 }}>
          {project.lede}
        </p>
      </div>

      {/* Body + details two-column */}
      <div style={{ ...fade(220), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)', gap: isMobile ? '2.5rem' : '4rem', marginBottom: isMobile ? '3rem' : '4rem' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Context</p>
          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.body}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Details</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
            {project.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.1)', gap: '1rem' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.5)' }}>{d.label}</span>
                <span style={{ fontSize: '13px', color: '#14211C', textAlign: 'right' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      {project.process && (
        <div style={{ ...fade(300), marginBottom: '4rem', maxWidth: '760px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Process</p>
          {project.process.map((p, i) => (
            <p key={i} style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', marginBottom: '1rem' }}>{p}</p>
          ))}
        </div>
      )}

      {/* Portfolio book pages — shared BookSpreads component (undergrad 2018
          wide spreads stack full-width; M.Arch 2022 portrait pages render
          2-up via bookCols). Photographs follow below. */}
      {window.BookSpreads && (
        <BookSpreads
          projectId={projectId}
          title={project.title}
          label={project.bookLabel || 'From the portfolio book'}
          cols={project.bookCols || 1}
          isMobile={isMobile}
          style={fade(320)}
        />
      )}

      {/* Gallery — shared Gallery component. Photographs from
          images/<project-id>/ via the manifest; Foundations pages are
          photo-first (model shots, drawings, process). Two tiles side by side
          by default; galleryCols overrides (e.g. dissection's triptych rows).
          Click a tile to expand into the flip-through viewer.

          leadCount splits the folder into two sections: the first N images run
          full width in their own section above (Midtown Walk's street
          elevations), the rest fall into the gallery grid below. */}
      {window.Gallery && (() => {
        const all = ((window.IMAGE_MANIFEST || {})[projectId] || {}).gallery || [];
        const lead = project.leadCount ? all.slice(0, project.leadCount) : [];
        const rest = project.leadCount ? all.slice(project.leadCount) : all;
        return (
          <>
            {lead.length > 0 && (
              <Gallery
                projectId={projectId}
                title={project.title}
                items={lead}
                label={project.leadLabel || 'Drawings'}
                cols={project.leadCols || 1}
                isMobile={isMobile}
                style={fade(330)}
              />
            )}
            {rest.length > 0 && (
              <Gallery
                projectId={projectId}
                title={project.title}
                items={project.leadCount ? rest : undefined}
                label="Photographs"
                cols={project.galleryCols || 2}
                isMobile={isMobile}
                style={fade(340)}
              />
            )}
          </>
        );
      })()}

      {/* Outcome + credits */}
      <div style={{ ...fade(380), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)', gap: isMobile ? '2rem' : '4rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '3rem' : '4rem' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Outcome</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.outcome}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Credits</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.credits}</p>
        </div>
      </div>

      {/* Next in Foundations — the same preview card the main case studies use
          (NextProjectCard from ProjectPage.jsx), so Foundations projects get a
          tile image at the foot instead of a bare text link. archiveId routes
          the click to 'archive-project'. Falls back to the old text row if
          ProjectPage hasn't loaded. */}
      {nextProject && (
        <div style={{ ...fade(460), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: isMobile ? '2rem' : '3rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.35)', marginBottom: '1.5rem' }}>Next in Foundations</p>
          {window.NextProjectCard ? (
            <NextProjectCard project={nextProject} archiveId={project.next} onNavigate={onNavigate} isMobile={isMobile} />
          ) : (
            <button onClick={() => onNavigate('archive-project', project.next)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: '20px', fontWeight: 500, color: '#14211C',
              fontFamily: "'Inter', system-ui, sans-serif",
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {nextProject.title} <span>→</span>
            </button>
          )}
        </div>
      )}

    </main>
  );
};

Object.assign(window, { ARCHIVE_ITEMS, ARCHIVE_DATA, ArchivePage, ArchiveTile, ArchiveProjectPage });
