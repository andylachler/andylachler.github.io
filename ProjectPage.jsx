// ProjectPage.jsx — Full case study template
const PROJECT_DATA = {
  'autoease': {
    title: 'AutoEase',
    org: 'Independent', year: '2026', role: 'Product Design',
    bg: '#1A2520',
    lede: 'Buying a used car is one of the largest consumer purchases people make, and one of the most distrusted interfaces they touch. AutoEase is a prototype that treats it like a financial decision, not a sales funnel.',
    body: 'AutoEase is a self-directed research and design prototype exploring what a consumer car-buying tool looks like when it\u2019s shaped around transparency rather than lead capture. Built as a Next.js application with a full question flow, vehicle detail pages, Sell and Price Check side-flows, and a data-viz system that keeps the math visible at every step.',
    process: [
      'Started with interviews \u2014 seven participants who had bought, sold, or shopped for used cars in the last eighteen months. The pattern that kept surfacing wasn\u2019t confusion about cars, it was confusion about the interface layer between them and a car. Dealer sites obscure cost. Marketplaces hide trade-in value. Nothing showed the user where their money was actually going.',
      'Translated that into a product architecture with four entry points \u2014 Browse, Answers (guided Q&A), Sell, and Price Check \u2014 each resolving a distinct user intent without forcing the others on them. The home page became a hub rather than a funnel.',
      'Designed the core ranking surface around a Fit gauge, a stacked-bar cost visualization, and a reliability sparkline. Every number the product shows has its inputs one click away.',
    ],
    insights: [
      { label: 'Trust is a UI problem', body: 'Dealer distrust wasn\u2019t ideological \u2014 it was interface. Every participant described moments where a dealer website felt like a trap door. The design response was to make math visible and reversible.' },
      { label: 'Decisions outrun data', body: 'Buyers don\u2019t read spec sheets. They scan for a shape they recognize. That pushed the design toward a single primary metric per screen \u2014 Fit, Offer, Deal Score \u2014 with inputs available but not center-stage.' },
      { label: 'Selling is shopping', body: 'People who sell a car are usually buying a different one. Keeping the Sell flow inside the same visual language as Browse wasn\u2019t cosmetic \u2014 it made the next step legible.' },
    ],
    designSystem: [
      { label: 'Forest-deep palette', body: 'A single surface color anchors the dark pages. Amber is reserved for primary actions and live values. Sage carries secondary meaning. Three levels, not fifteen.' },
      { label: 'Glass utility layer', body: 'glass-light, glass-dark, glass-warm \u2014 three treatments for cards that need to float over colored surfaces. Each uses backdrop-filter blur and a 1px inner highlight, tuned per background.' },
      { label: 'Numeric type scale', body: 'Prices, offers, scores, and deltas all render in a dedicated numeric-xl class \u2014 tabular-nums, tight tracking, 56px at hero scale. Money should read as money.' },
      { label: 'Data-viz primitives', body: 'Three components carry the viz load \u2014 Gauge (SVG stroke-dasharray ring), StackedBar (segmented horizontal with legend), Sparkline (quadratic-midpoint smooth curves). Shared color tokens so a deduction bar on the Offer page matches a cost segment on the Result page.' },
    ],
    influences: [
      { label: 'Robinhood', body: 'For the numeric-first visual grammar. Big numbers, small chrome, deltas colored but not shouted. The way Robinhood treats a stock price is the way AutoEase treats a car price.' },
      { label: 'Consumer Reports', body: 'For the reliability voice. Understated, evidence-linked, willing to tell the user a car is a bad idea.' },
      { label: 'Editorial magazines', body: 'For the news surface \u2014 structured kind labels, restrained typography, and the courage to have whitespace.' },
    ],
    outcome: 'Prototype complete. Browse flow, guided Q&A with Fit ranking, Sell flow with instant offer and transparent deductions, Price Check flow with verdict scoring \u2014 all in a single Next.js build. Used as a portfolio-facing exploration of consumer-finance UI patterns applied to a non-finance domain.',
    credits: 'Independent project. Research, product design, interaction design, and prototype build: Andreas L\u00e4chler.',
    details: [
      { label: 'Scope', value: 'Consumer app prototype' },
      { label: 'Stack', value: 'Next.js 14 \u00b7 TS \u00b7 Tailwind' },
      { label: 'Surfaces', value: 'Browse \u00b7 Answers \u00b7 Sell \u00b7 Price Check' },
      { label: 'Status', value: 'Portfolio prototype' },
    ],
    tileBg: '#1A2520', imageIndex: 6,
    interactiveUrl: 'https://autoease-prototype.vercel.app/',
    next: 'feasibility',
  },
  'feasibility': {
    title: 'Feasibility platform',
    org: 'Algoma', year: '2024\u2013', role: 'Product Lead',
    bg: '#3D5448',
    lede: 'Algoma evaluates what a development site can become. As Product Lead, I design the surfaces where that question gets answered \u2014 from first site summary through zoning analysis, capacity modeling, and the handoff into schematic design.',
    body: 'I joined at the start of V.02 and have led the platform\u2019s design language, feature set, and brand system since. The work spans four connected arcs \u2014 product design, data and AI intelligence, brand and GTM, and the architecture practice that keeps feeding the product real problems to solve. Each arc teaches the next: feasibility studies surface what the software should actually do, the software changes how we deliver architecture, and the brand carries the whole thing to market.',
    insights: [
      { label: 'Phase-based project framing', body: 'Design partners kept asking "where is this site in our pipeline?" \u2014 acquisition, feasibility, or active design. That question became the product\u2019s primary organizing metaphor. Sites are treated as things that move through phases rather than static records, and each phase has its own surface in service of that motion.' },
      { label: 'One flow, two typologies', body: 'Early prototypes split single-family and multi-family capacity into separate tools. Interviews showed the opposite pattern \u2014 developers compared typologies on the same site within the same conversation with their LPs. We unified the flow, and the shared surface now carries both analyses with a single switch.' },
      { label: 'AI with visible uncertainty', body: 'The zoning analysis feature runs language models over the underlying code text. The UX challenge was surfacing model confidence without overpromising. The answer pattern cites code sections inline, flags ambiguity rather than hiding it, and pushes the user toward verification rather than blind trust. Three model tiers were tested in parallel to tune the threshold for when to defer.' },
      { label: 'Map as theme, not hero', body: 'Feasibility tools love maps, but the comps workflow is a judgment workflow, not a map workflow. The decision was to demote the map from primary surface to secondary view and lead with a table tuned for underwriter scan patterns. Map became a theme across the product \u2014 a consistent visual layer \u2014 not a centerpiece.' },
    ],
    insightsLabel: 'Key design decisions',
    process: [
      'Every non-trivial feature ships through the same loop \u2014 sketch, interactive prototype in Figma, walk three or four design partners through it, rebuild, then hand off to engineering. By the time something lands in the codebase, the people it\u2019s being built for have already pushed back on it at least twice.',
      'Customer and design-partner interviews run on a weekly cadence. Patterns that surface in three conversations become backlog candidates; the ones that show up in one stay in the notes. A Posthog dashboard tells us whether what shipped actually gets used \u2014 the interviews tell us why.',
      'The architecture practice runs in parallel, not separately. Feasibility studies for live development projects become stress tests for the platform: if the tool makes a real study faster, it\u2019s solving a real problem. If it doesn\u2019t, the feature changes.',
    ],
    designSystem: [
      { label: 'Product design', body: 'End-to-end design for the V.02 platform \u2014 site summary, capacity studies, comps, exports, onboarding, billing, help content, and the presentation surfaces developers use to pitch their LPs.' },
      { label: 'Data & AI intelligence', body: 'Shaped the AI zoning analysis, GIS data layers, state-level legislative overlays, and the 3D model hosting backbone. The work runs from research and legislation reading through to the final user-facing surface.' },
      { label: 'Brand & GTM', body: 'Rebuilt the marketing site, ran the brand system refresh live across site and platform, designed campaigns and conference collateral (IBS, RETCON, IMN), and set up the analytics dashboards that tell us whether any of it is working.' },
      { label: 'Architecture practice', body: 'Lead architect on several of the studio\u2019s active residential and industrial feasibility projects. The platform gets better because the practice keeps finding edge cases it has to solve.' },
    ],
    designSystemLabel: 'Four connected arcs',
    outcome: 'V.02 platform shipped September 2025 \u2014 site summary, capacity, comps, and exports. AI zoning analysis and legislative data overlays shipped through late 2025. Marketing system overhaul live April 2026. Weekly research\u2192design\u2192ship cadence continues. Specific features and client work remain confidential; this page teases the patterns, not the proprietary surfaces.',
    credits: 'Algoma. Product Lead, brand, and design system: Andreas L\u00e4chler. Built with the Algoma engineering and leadership team.',
    details: [
      { label: 'Role', value: 'Product Lead' },
      { label: 'Timeframe', value: 'Dec 2024 \u2013 present' },
      { label: 'Scope', value: 'Product \u00b7 data/AI \u00b7 brand \u00b7 architecture' },
      { label: 'Methods', value: 'Design-partner interviews \u00b7 Figma prototyping \u00b7 Posthog' },
      { label: 'Status', value: 'Active \u00b7 V.02 shipped 09/2025' },
    ],
    tileBg: '#3D5448', imageIndex: 0,
    next: 'ella',
  },
  'site-search': {
    title: 'Site search',
    org: 'Algoma', year: '2024', role: 'Product Design',
    bg: '#14211C',
    lede: 'How do you search for a development site when you don\'t yet know what you\'re looking for?',
    body: 'The site search surface combines map-based exploration with filter logic tuned for real estate feasibility — lot size, zoning, ownership structure, recent sales. The challenge is designing a system that surfaces signal without requiring the user to already know what the signal is.',
    process: [
      'Started by mapping the decision space developers actually navigate before a site gets shortlisted. Filters are a consequence of that, not a starting point.',
      'The interface needed to work both as an active search tool and as a passive discovery surface for exploratory sessions.',
    ],
    outcome: 'Shipped as part of the Algoma platform. Details anonymized.',
    credits: 'Algoma. Product design: Andreas Lächler.',
    details: [{ label: 'Scope', value: 'Search + map interface' }, { label: 'Type', value: 'Data-dense UI' }, { label: 'Status', value: 'Shipped' }],
    tileBg: '#14211C', imageIndex: 1,
    next: 'ella',
  },
  'ella': {
    title: 'Ella',
    org: 'Arquitectonica', year: '2023', role: 'Architecture',
    bg: '#D45A1B',
    lede: 'A 95-unit condo on a long, narrow lot in Miami Beach. The design problem was what to do with the site\u2019s ground plane — and with the cross-block paseo the zoning required.',
    body: 'Ella sits on a skinny lot on Abbott Avenue in Miami Beach, pinned between two streets with a paseo cutting across the north edge. The brief asked for ground-floor retail, parking, and 95 residences, with the base elevated to meet floodplain requirements. The design response is a frame-patterned facade that reads lighter as it rises, and an arcade-and-paseo base that keeps an elevated building walkable at street level.',
    process: [
      'Started with the site. Long length between Abbott and Byron, a mandated cross-block paseo on the north edge, and a finished floor elevated to meet flood rules \u2014 three constraints that would otherwise dead-end the ground plane. The response was an ample arcade and a ramped paseo that reads continuous with the sidewalk, lobby activation on the south, retail on the north.',
      'The facade is a field of frame-like openings tuned to vary in size as they climb. Darker background, lighter frames \u2014 the white reads as figure, not ground. A small inversion that makes a tall building feel lighter than it is.',
      'The podium uses varying thicknesses of linear metal tubing to screen the garage without making a blank wall. The rhythm accentuates the tall columns rising out of the base and gives the ground-floor activation something to work against.',
    ],
    outcome: 'CD 90%. Entitlements approved 2023. Completion scheduled 2026.',
    credits: 'Arquitectonica. Project team: Raymond Fort, Ilon Kielson, Andreas L\u00e4chler, Kelsey Mallot, Ulysses Hernandez, Dolton Reading, EJ Kaufman, Jimmy Bullis, Monserrat Cardenas. Owner: Boschetti Group and Constellation Group.',
    details: [
      { label: 'Program', value: 'Multifamily condo + retail' },
      { label: 'Location', value: '6940 Abbott Ave, Miami Beach' },
      { label: 'Units', value: '95 residential' },
      { label: 'Total GSF', value: '186,480' },
      { label: 'Retail', value: '11,356 SF' },
      { label: 'Parking', value: '91 spaces' },
      { label: 'Status', value: 'CD 90% \u00b7 Complete 2026' },
    ],
    tileBg: '#D45A1B', imageIndex: 2,
    next: 'brickell',
  },
  'zoning-chat': {
    title: 'Zoning chat',
    org: 'Algoma', year: '2024', role: 'Product Design',
    bg: '#E8E4D5',
    lede: 'Zoning is effectively a legal document. The question was whether a conversational interface could make it navigable.',
    body: 'Designed the conversational UI for Algoma\'s zoning analysis surface — a chat interface that lets developers ask plain-language questions about what a site allows, and get structured, citable answers drawn from the underlying zoning code.',
    process: [
      'The hardest part isn\'t the conversation — it\'s the response format. Developers need to trust what they\'re reading. Designed a structured citation pattern that keeps the AI answer grounded in the actual code text.',
      'Worked closely with the engineering team on the interaction model: what happens on ambiguity, how the system surfaces uncertainty, when to push back.',
    ],
    outcome: 'Shipped. In active use.',
    credits: 'Algoma. Product design: Andreas Lächler.',
    details: [{ label: 'Scope', value: 'Conversational UI' }, { label: 'Type', value: 'AI interface' }, { label: 'Status', value: 'Shipped' }],
    tileBg: '#E8E4D5', imageIndex: 3,
    next: 'brickell',
  },
  'brickell': {
    title: 'Brickell residential',
    org: 'Arquitectonica', year: '2023', role: 'Architecture',
    bg: '#14211C',
    lede: '32-unit multifamily in Brickell. Mass timber structure, constrained lot, ground-floor retail.',
    body: 'Led schematic design and consultant coordination for a 32-unit residential building on a constrained infill lot in Miami\'s Brickell neighborhood. Mass timber structure was the client\'s requirement — the design problem was making it work within a tight lot footprint and local zoning.',
    process: [
      'The structural system drove everything. Mass timber spans are long, which gave us open floor plates but constrained the facade module. Most of the design work was resolving that constraint.',
      'Ground-floor retail required coordination with a separate tenant buildout team. Designed the base as a neutral frame.',
    ],
    outcome: 'Schematic design complete. Handed off to design development team.',
    credits: 'Arquitectonica. Design: Andreas Lächler. Principal: Bernardo Fort-Brescia.',
    details: [{ label: 'Program', value: '32-unit residential' }, { label: 'Location', value: 'Brickell, Miami' }, { label: 'Structure', value: 'Mass timber' }],
    tileBg: '#14211C', imageIndex: 4,
    next: 'autoease',
  },
  'comps': {
    title: 'Comps analysis',
    org: 'Algoma', year: '2024', role: 'Product Design',
    bg: '#3D5448',
    lede: 'Real estate comps are tables of numbers. The design question was what to do with them.',
    body: 'Designed the comparable sales analysis surface for Algoma — the part of the platform where developers understand what similar sites have sold for and what that means for their underwriting.',
    process: [
      'Started with the underwriter\'s actual workflow. Comps analysis is a judgment call, not a calculation — the interface needed to support that judgment rather than pretend to automate it.',
      'Explored multiple approaches to data density. Ended up with a table-first layout with a secondary map view, rather than trying to make the map primary.',
    ],
    outcome: 'Shipped as part of the Algoma platform.',
    credits: 'Algoma. Product design: Andreas Lächler.',
    details: [{ label: 'Scope', value: 'Data visualization' }, { label: 'Type', value: 'Analytics surface' }, { label: 'Status', value: 'Shipped' }],
    tileBg: '#3D5448', imageIndex: 5,
    next: 'autoease',
  },
};
window.PROJECT_DATA = PROJECT_DATA;

const DetailBlock = ({ imageIndex, bg, hovered }) => (
  <div style={{ background: bg, borderRadius: '3px', overflow: 'hidden', position: 'relative', height: '100%', minHeight: '180px', border: (bg === '#E8E4D5' || bg === '#F2EFE6') ? '0.5px solid rgba(20,33,28,0.1)' : 'none' }}>
    <TilePlaceholder bg={bg} index={imageIndex} hovered={hovered} />
  </div>
);

const ProjectPage = ({ projectId = 'feasibility', onNavigate }) => {
  const project = PROJECT_DATA[projectId] || PROJECT_DATA['feasibility'];
  const nextProject = project.next ? PROJECT_DATA[project.next] : null;
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

      {/* Hero tile */}
      <div style={{ ...fade(0), marginBottom: '4rem' }}>
        <div
          style={{
            background: project.tileBg, borderRadius: '10px',
            height: 'clamp(280px, 32vw, 420px)',
            position: 'relative', overflow: 'hidden', cursor: 'default',
            transition: 'transform 0ms',
          }}
          onMouseEnter={() => setHeroHov(true)}
          onMouseLeave={() => setHeroHov(false)}
        >
          <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={heroHov} />
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

      {/* Main content + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '5rem', maxWidth: '1000px' }}>
        {/* Left: text content */}
        <div>
          <p style={{ ...fade(80), fontSize: '20px', fontWeight: 400, lineHeight: 1.6, color: '#14211C', marginBottom: '2rem' }}>
            {project.lede}
          </p>
          <p style={{ ...fade(140), fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.7)', marginBottom: '3rem' }}>
            {project.body}
          </p>

          {/* Detail visual — either an interactive iPhone-framed live embed
              or the default tile-pair for static projects. */}
          {project.interactiveUrl ? (
            <div style={{ ...fade(180), marginBottom: '3rem', padding: '0.5rem 0', borderTop: '0.5px solid rgba(20,33,28,0.1)', borderBottom: '0.5px solid rgba(20,33,28,0.1)' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Try it out</p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(20,33,28,0.6)', marginBottom: '0.5rem' }}>
                The full prototype is embedded below. Tap the screen to launch — all four flows (Browse, Answers, Sell, Price Check) are wired up.
              </p>
              <TryItOut src={project.interactiveUrl} label={project.title} />
            </div>
          ) : (
            <div style={{ ...fade(180), display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.625rem', marginBottom: '3rem' }}>
              <DetailBlock imageIndex={project.imageIndex} bg={project.tileBg} hovered={false} />
              <DetailBlock imageIndex={(project.imageIndex + 2) % 7} bg={['#3D5448','#14211C','#E8E4D5','#D45A1B','#3D5448','#14211C','#3D5448'][project.imageIndex]} hovered={false} />
            </div>
          )}

          {project.insights && project.insights.length > 0 && (
            <div style={{ ...fade(200), marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>{project.insightsLabel || 'Insights from research'}</p>
              {project.insights.map((item, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < project.insights.length - 1 ? '0.5px solid rgba(20,33,28,0.08)' : 'none' }}>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#14211C', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{item.label}</p>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.7)', margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          )}

          <div style={fade(220)}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Process</p>
            {project.process.map((para, i) => (
              <p key={i} style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.7)', marginBottom: '1.25rem' }}>{para}</p>
            ))}
          </div>

          {project.designSystem && project.designSystem.length > 0 && (
            <div style={{ ...fade(240), marginTop: '2.5rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>{project.designSystemLabel || 'Design system'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                {project.designSystem.map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem', background: 'rgba(20,33,28,0.025)', borderRadius: '6px', border: '0.5px solid rgba(20,33,28,0.06)' }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#14211C', margin: '0 0 0.5rem', letterSpacing: '-0.005em' }}>{item.label}</p>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(20,33,28,0.65)', margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.influences && project.influences.length > 0 && (
            <div style={{ ...fade(250), marginTop: '2.5rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Influences</p>
              {project.influences.map((item, i) => (
                <div key={i} style={{ marginBottom: '1rem', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1.25rem', alignItems: 'baseline' }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#14211C', margin: 0, letterSpacing: '0.01em' }}>{item.label}</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(20,33,28,0.65)', margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ ...fade(260), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Current state</p>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(20,33,28,0.65)' }}>{project.outcome}</p>
          </div>

          <div style={{ ...fade(300), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '1.5rem', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '0.75rem' }}>Credits</p>
            <p style={{ fontSize: '13px', color: 'rgba(20,33,28,0.55)', lineHeight: 1.6 }}>{project.credits}</p>
          </div>
        </div>

        {/* Right: sidebar details */}
        <div style={fade(100)}>
          <div style={{ position: 'sticky', top: '80px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Details</p>
            {project.details.map(d => (
              <div key={d.label} style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.35)', margin: '0 0 3px' }}>{d.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 400, color: '#14211C', margin: 0 }}>{d.value}</p>
              </div>
            ))}

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
              <ArrowLink onClick={() => onNavigate('work')} style={{ fontSize: '13px', color: 'rgba(20,33,28,0.55)' }}>Back to work</ArrowLink>
            </div>
          </div>
        </div>
      </div>

      {/* Next project */}
      {nextProject && (
        <div style={{ ...fade(340), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '3rem', marginTop: '4rem', maxWidth: '1000px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.35)', marginBottom: '1.5rem' }}>Next</p>
          <NextProjectCard project={nextProject} onNavigate={onNavigate} />
        </div>
      )}
    </main>
  );
};

const NextProjectCard = ({ project, onNavigate }) => {
  const [hov, setHov] = React.useState(false);
  const light = project.tileBg === '#F2EFE6' || project.tileBg === '#E8E4D5';
  const textC = light ? '#14211C' : '#F2EFE6';
  const mutedC = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  return (
    <div
      onClick={() => onNavigate('project', project.next || project.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: project.tileBg, borderRadius: '10px',
        padding: '2rem 2.5rem', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
      }}
    >
      <TilePlaceholder bg={project.tileBg} index={project.imageIndex} hovered={hov} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedC, margin: '0 0 5px' }}>{project.org} · {project.year}</p>
        <p style={{ fontSize: '18px', fontWeight: 500, color: textC, margin: 0 }}>{project.title}</p>
      </div>
      <span style={{ position: 'relative', zIndex: 1, fontSize: '18px', color: textC, transition: 'transform 180ms', transform: hov ? 'translateX(5px)' : 'none' }}>→</span>
    </div>
  );
};

Object.assign(window, { PROJECT_DATA, ProjectPage, NextProjectCard, DetailBlock });
