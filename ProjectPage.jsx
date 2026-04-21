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
    interactiveUrl: '/autoease/',
    next: 'feasibility',
  },
  'feasibility': {
    title: 'Feasibility platform',
    org: 'Algoma', year: '2024', role: 'Product Design',
    bg: '#3D5448',
    lede: 'Algoma evaluates what a development site can become. I design the surfaces where that question gets answered.',
    body: 'The product is an AI platform that helps developers understand what a site can actually become, running zoning, program, and economics in parallel. My role covers the full product surface — from the initial site search through zoning analysis, capacity modeling, and comparable sales.',
    process: [
      'Designed from first principles — no inherited design system, no legacy patterns. Started with the question: what does a developer actually need to decide?',
      'Architecture training covers the same problem in a different medium: take something with too many moving parts and give it a shape a person can move through.',
    ],
    outcome: 'In active development. Details anonymized per client agreement.',
    credits: 'Algoma. Product design: Andreas Lächler.',
    details: [{ label: 'Scope', value: 'Full product surface' }, { label: 'Type', value: 'AI platform' }, { label: 'Status', value: 'Active' }],
    tileBg: '#3D5448', imageIndex: 0,
    next: 'site-search',
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
    next: 'the-ella',
  },
  'the-ella': {
    title: 'The Ella',
    org: 'Arquitectonica', year: '2023', role: 'Architecture',
    bg: '#D45A1B',
    lede: 'Residential tower in Miami. The work lives in the facade — how a building resolves at the corner, what it does with light.',
    body: 'Led facade design and consultant coordination from schematic design through design development. The tower is a residential building in Miami — the problem is making something that stands in a skyline but still has a human scale when you\'re standing in front of it.',
    process: [
      'Facade geometry was the central design problem. The building uses a setback profile that\'s structural in origin but ends up doing most of the visual work.',
      'Coordination with facade consultants, structural engineers, and the client team across multiple design iterations.',
    ],
    outcome: 'Design development complete. In permitting.',
    credits: 'Arquitectonica. Design: Andreas Lächler. Principal: Bernardo Fort-Brescia.',
    details: [{ label: 'Program', value: 'Residential tower' }, { label: 'Location', value: 'Miami, FL' }, { label: 'Status', value: 'In permitting' }],
    tileBg: '#D45A1B', imageIndex: 2,
    next: 'zoning-chat',
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
    next: 'comps',
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
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem 6rem' }}>

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
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Insights from research</p>
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
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Design system</p>
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
