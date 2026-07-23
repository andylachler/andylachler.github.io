// ProjectPage.jsx — Full case study template
const PROJECT_DATA = {
  'autoease': {
    title: 'Full product study',
    org: 'AutoEase — Independent', year: '2026', role: 'Product Design',
    bg: '#1A2520',
    // Custom end-to-end study layout (July 2026) — FullProductStudyPage.jsx
    // renders instead of the standard template. Data below kept for cards,
    // silhouettes, and the Next rail.
    customPage: 'FullProductStudyPage',
    lede: 'Buying a used car is one of the largest consumer purchases people make, and one of the most distrusted interfaces they touch. AutoEase is a prototype that treats it like a financial decision, not a sales funnel.',
    body: 'AutoEase is a self-directed research and design prototype exploring what a consumer car-buying tool looks like when it\u2019s shaped around transparency rather than lead capture. Built as a Next.js application with a full question flow, vehicle detail pages, Sell and Price Check side-flows, and a data-viz system that keeps the math visible at every step.',
    process: [
      'Started with interviews \u2014 seven participants who had bought, sold, or shopped for used cars in the last eighteen months. The pattern that kept surfacing wasn\u2019t confusion about cars, it was confusion about the interface layer between them and a car. Dealer sites obscure cost. Marketplaces hide trade-in value. Nothing showed the user where their money was actually going.',
      'Translated that into a product architecture with four entry points \u2014 Browse, Answers (guided Q&A), Sell, and Price Check \u2014 each resolving a distinct user intent without forcing the others on them. The home page became a hub rather than a funnel.',
      'Designed the core ranking surface around a Fit gauge, a stacked-bar cost visualization, and a reliability sparkline. Every number the product shows has its inputs one click away.',
    ],
    insights: [
      { label: 'Trust is a UI problem', body: 'Dealer distrust wasn\u2019t ideological \u2014 it was interface. Every participant described moments where a dealer website felt like a trap door. The design response was to make math visible and reversible.',
        screen: 'https://autoease-prototype.vercel.app/price-check/', screenLabel: 'Price Check \u2014 the math, visible' },
      { label: 'Decisions outrun data', body: 'Buyers don\u2019t read spec sheets. They scan for a shape they recognize. That pushed the design toward a single primary metric per screen \u2014 Fit, Offer, Deal Score \u2014 with inputs available but not center-stage.',
        screen: 'https://autoease-prototype.vercel.app/results/', screenLabel: 'Results \u2014 one number per car' },
      { label: 'Selling is shopping', body: 'People who sell a car are usually buying a different one. Keeping the Sell flow inside the same visual language as Browse wasn\u2019t cosmetic \u2014 it made the next step legible.',
        screen: 'https://autoease-prototype.vercel.app/sell/', screenLabel: 'Sell \u2014 same grammar as Browse' },
    ],
    designSystem: [
      { label: 'Forest-deep palette', body: 'A single surface color anchors the dark pages. Amber is reserved for primary actions and live values. Sage carries secondary meaning. Three levels, not fifteen.' },
      { label: 'Glass utility layer', body: 'glass-light, glass-dark, glass-warm \u2014 three treatments for cards that need to float over colored surfaces. Each uses backdrop-filter blur and a 1px inner highlight, tuned per background.' },
      { label: 'Numeric type scale', body: 'Prices, offers, scores, and deltas all render in a dedicated numeric-xl class \u2014 tabular-nums, tight tracking, 56px at hero scale. Money should read as money.' },
      { label: 'Data-viz primitives', body: 'Three components carry the viz load \u2014 Gauge (SVG stroke-dasharray ring), StackedBar (segmented horizontal with legend), Sparkline (quadratic-midpoint smooth curves). Shared color tokens so a deduction bar on the Offer page matches a cost segment on the Result page.' },
    ],
    influences: [
      { label: 'The automotive press', body: 'The Drive, MotorTrend, CarBuzz, Car and Driver \u2014 the information side of the industry. AutoEase sits with the publications, not the dealerships: it exists to support the buyer, not to make money for the seller.' },
      { label: 'Consumer Reports', body: 'For the reliability voice. Understated, evidence-linked, willing to tell the user a car is a bad idea.' },
      { label: 'The AutoFocus channel', body: 'For the verdict format. Plain-spoken, owner-minded reviews that end with a recommendation you can act on \u2014 the tone AutoEase aims for in its Fit and Deal scores.' },
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
    // The embed is the INTERACTIVE prototype (all four flows) — never the v2
    // wireframe canvas (that board informs design language only). It points at
    // the Vercel deployment: the local autoease/ export is a STALE build (old
    // route structure + an /api/ call that can't run statically), which is
    // what broke the embed in July 2026. Don't point interactiveUrl back at
    // the local folder unless a fresh static export replaces it.
    interactiveUrl: 'https://autoease-prototype.vercel.app/',
    interactiveNote: 'The interactive prototype, embedded live — Browse, Answers, Sell, and Price Check. The v2 design-language board that informs the redesign is available as a reference below.',
    interactiveAltUrl: 'autoease-v2/',
    interactiveAltLabel: 'View the v2 design-language board ↗',
    next: 'wireframe-components',
  },
  // The two Algoma showcases (July 2026) — native rebuilds of the standalone
  // case studies, rebranded into the lachler.com design language. They
  // replace the retired Feasibility platform case study as the Algoma work.
  'wireframe-components': {
    title: 'Wireframe component work',
    org: 'Algoma', year: '2025–26', role: 'Product Design',
    bg: '#14211C',
    customPage: 'WireframeComponentsPage',
    lede: 'A running catalog of Algoma platform component designs — each series a working prototype, browsable state by state, with the reasoning documented next to it.',
    details: [
      { label: 'Scope', value: 'UI components · States · Interaction' },
      { label: 'Series', value: 'Chat · Rendering · Intake · Zoning report' },
      { label: 'Status', value: 'Living catalog' },
    ],
    tileBg: '#14211C', imageIndex: 3, silhouette: 'wireframe-components',
    next: 'platform-reports',
  },
  'platform-reports': {
    title: 'Platform driven reports',
    org: 'Algoma', year: '2026', role: 'Product Logic',
    bg: '#3D5448',
    customPage: 'PlatformReportsPage',
    lede: 'From manual packaging to self-service yield presentations — the product logic behind exporting a meeting-ready presentation directly from the platform.',
    details: [
      { label: 'Scope', value: 'Presentation export · Report engine' },
      { label: 'Type', value: 'Product logic study' },
      { label: 'Status', value: 'Framework in refinement' },
    ],
    tileBg: '#3D5448', imageIndex: 0, silhouette: 'platform-reports',
    next: 'exhibition-trailer',
  },
  // 'feasibility' retired July 2026 — replaced by the two showcases above.
  'ella': {
    title: 'Ella',
    org: 'Arquitectonica', year: '2023', role: 'Architecture',
    bg: '#D45A1B',
    bookLabel: 'Concept presentation · Arquitectonica', bookCols: 2,
    lede: 'A 95-unit condo on a long, narrow lot in Miami Beach. The design problem was what to do with the site\u2019s ground plane — and with the cross-block paseo the zoning required.',
    body: 'Ella sits on a skinny lot on Abbott Avenue in Miami Beach, pinned between two streets with a paseo cutting across the north edge. The brief asked for ground-floor retail, parking, and 95 residences, with the base elevated to meet floodplain requirements. The design response is a frame-patterned facade that reads lighter as it rises, and an arcade-and-paseo base that keeps an elevated building walkable at street level.',
    process: [
      'Started with the site. Long length between Abbott and Byron, a mandated cross-block paseo on the north edge, and a finished floor elevated to meet flood rules \u2014 three constraints that would otherwise dead-end the ground plane. The response was an ample arcade and a ramped paseo that reads continuous with the sidewalk, lobby activation on the south, retail on the north.',
      'The facade is a field of frame-like openings tuned to vary in size as they climb. Darker background, lighter frames \u2014 the white reads as figure, not ground. A small inversion that makes a tall building feel lighter than it is.',
      'The podium uses varying thicknesses of linear metal tubing to screen the garage without making a blank wall. The rhythm accentuates the tall columns rising out of the base and gives the ground-floor activation something to work against.',
    ],
    outcome: 'Entitlements approved 2023; construction documents completed 2024. The building is now under construction, completing in 2026.',
    credits: 'Arquitectonica. Project team: Raymond Fort, Ilon Kielson, Andreas L\u00e4chler, Kelsey Mallot, Ulysses Hernandez, Dolton Reading, EJ Kaufman, Jimmy Bullis, Monserrat Cardenas. Owner: Boschetti Group and Constellation Group.',
    details: [
      { label: 'Program', value: 'Multifamily condo + retail' },
      { label: 'Location', value: '6940 Abbott Ave, Miami Beach' },
      { label: 'Units', value: '95 residential' },
      { label: 'Total GSF', value: '186,480' },
      { label: 'Retail', value: '11,356 SF' },
      { label: 'Parking', value: '91 spaces' },
      { label: 'Status', value: 'Under construction \u00b7 Complete 2026' },
    ],
    tileBg: '#D45A1B', imageIndex: 2,
    next: 'autoease',
  },
  'exhibition-trailer': {
    title: 'Exhibition Trailer',
    org: 'Independent', year: '2022', role: 'Design \u2014 mobile pop-up',
    bg: '#3D5448',
    bookLabel: 'From the M.Arch portfolio \u00b7 2022', bookCols: 2,
    lede: 'A sustainable mobile exhibition trailer for MiiR. Existing gooseneck base, glulam-and-recycled-timber enclosure, deck that folds into the face for transport and opens on site into an inhabitable off-grid pop-up.',
    body: 'A submission to the Duggal Junior Designer Design Challenge: a mobile exhibition space for MiiR that moves between trade shows and events without the cost — monetary or embodied-carbon — of custom fabrication. MiiR’s mission funds projects for clean water, a healthy environment, and strong communities, so the enclosure is built from recycled timber, glulam beams, and existing components wherever a stock assembly was viable. An off-the-shelf gooseneck trailer forms the base, lightly modified with a deck-mounted battery system and container-style frame mounting points; the demountable enclosure folds down into the face for transport and opens on-site into a full exhibition interior under tall ceilings and a moon-roof.',
    process: [
      'Embodied carbon drove most of the material choices \u2014 glulam beams, recycled timber paneling, recycled composite boards. The brand\u2019s mission around clean water and ethical sourcing meant rejecting custom fabrication wherever an existing assembly was viable.',
      'The deck folds up against the enclosure face for transport; the railing rolls into a compact bundle of wood rods and recycled nylon cord that stores under the interior bench. Set-up is quick, tear-down is quicker, and the truck never has to wait.',
      'The enclosure attaches to the trailer chassis using the same frame-mounting logic as shipping containers \u2014 the trailer becomes a modular flatbed. That single decision turned the whole thing into a kit-of-parts that can be upgraded, replaced, or re-sited without rebuilding the base.',
      'Interior balances exhibition surfaces \u2014 brand story, product samples \u2014 with an open, light-filled feel: a moon-roof, tall ceilings, warm neutrals. The tail bench folds down when parked to stage a photo moment for visitors.',
    ],
    insights: [
      { label: 'Reuse as a design driver', body: 'The cheapest and lowest-carbon trailer is the one already in production. Starting from a standard gooseneck rather than a custom platform forced the design to work within constraints that made it better \u2014 modular, scalable, replaceable.' },
      { label: 'Packing as a feature, not a problem', body: 'The deck-folds-into-face move means the trailer is one object when parked and another when deployed. That changed the brand moment: the act of opening is itself the exhibition\u2019s opening.' },
      { label: 'Brand as interior architecture', body: 'The walls carry the company story, the tail-bench frames the visitor photo, the moon-roof adds legibility and light. Branding isn\u2019t wallpaper \u2014 it\u2019s how the volume organizes attention.' },
    ],
    insightsLabel: 'Design decisions',
    outcome: 'Submitted to the Duggal Junior Designer Design Challenge, summer 2022. Full package: plans, elevations, sections, exploded assembly axon, final renderings, and animations \u2014 shown in the gallery below.',
    credits: 'Duggal Junior Designer Design Challenge submission. Brand brief: MiiR. Design: Andreas L\u00e4chler.',
    details: [
      { label: 'Scope', value: 'Mobile exhibition + brand enclosure' },
      { label: 'Competition', value: 'Duggal Junior Designer Challenge' },
      { label: 'Brand brief', value: 'MiiR' },
      { label: 'Structure', value: 'Modified gooseneck + glulam' },
      { label: 'Materials', value: 'Recycled timber \u00b7 composite panels \u00b7 glulam' },
      { label: 'Year', value: '2022' },
    ],
    tileBg: '#3D5448', imageIndex: 1,
    next: 'ella',
  },
};
window.PROJECT_DATA = PROJECT_DATA;

const DetailBlock = ({ imageIndex, bg, hovered }) => (
  <div style={{ background: bg, borderRadius: '3px', overflow: 'hidden', position: 'relative', height: '100%', minHeight: '180px', border: (bg === '#E8E4D5' || bg === '#F2EFE6') ? '0.5px solid rgba(20,33,28,0.1)' : 'none' }}>
    <TilePlaceholder bg={bg} index={imageIndex} hovered={hovered} />
  </div>
);

const ProjectPage = ({ projectId = 'autoease', onNavigate }) => {
  // 'feasibility' retired — old links and stored state fall back to autoease.
  const project = PROJECT_DATA[projectId] || PROJECT_DATA['autoease'];
  // Custom case-study layouts (Full product study, the two Algoma showcases)
  // render their own page component instead of the standard template.
  const CustomPage = project.customPage && window[project.customPage];
  if (CustomPage) return <CustomPage projectId={projectId} onNavigate={onNavigate} />;
  const nextProject = project.next ? PROJECT_DATA[project.next] : null;
  const gallery = ((window.IMAGE_MANIFEST || {})[projectId] || {}).gallery || [];
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
  const heroMuted = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  const outerPad = isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem';
  const heroPad = isMobile ? '1.25rem' : '2rem';
  const ledeSize = isMobile ? 'clamp(17px, 4.5vw, 20px)' : 'clamp(18px, 1.8vw, 22px)';

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: outerPad }}>

      {/* Hero tile — full container width */}
      <div style={{ ...fade(0), marginBottom: isMobile ? '2.5rem' : '4rem' }}>
        <div
          style={{
            background: project.tileBg, borderRadius: '10px',
            height: isMobile ? 'clamp(220px, 55vw, 320px)' : 'clamp(280px, 32vw, 420px)',
            position: 'relative', overflow: 'hidden', cursor: 'default',
            border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
          }}
          onMouseEnter={() => setHeroHov(true)}
          onMouseLeave={() => setHeroHov(false)}
        >
          <ProjectVisual projectId={projectId} kind="hero" bg={project.tileBg} index={project.imageIndex} hovered={heroHov} />
          {/* Legibility gradient — only when a photo hero renders behind the title */}
          {(((window.IMAGE_MANIFEST || {})[projectId] || {}).hero || ((window.IMAGE_MANIFEST || {})[projectId] || {}).tile) && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(12,16,14,0.62) 0%, rgba(12,16,14,0.18) 38%, transparent 60%)' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, padding: heroPad, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '10px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: heroMuted, margin: '0 0 0.5rem' }}>
              {project.org} · {project.year} · {project.role}
            </p>
            <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: isMobile ? 'clamp(28px, 7.5vw, 38px)' : 'clamp(32px, 4.2vw, 52px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.04, color: heroText, margin: 0 }}>
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Lede — readable width, left-aligned */}
      <div style={{ ...fade(80), maxWidth: '820px', marginBottom: isMobile ? '2rem' : '3rem' }}>
        <p style={{ fontSize: ledeSize, fontWeight: 400, lineHeight: 1.55, color: '#14211C', margin: 0 }}>
          {project.lede}
        </p>
      </div>

      {/* Body + details — two-column on desktop, stacked on mobile */}
      <div style={{
        ...fade(140),
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)',
        gap: isMobile ? '2.5rem' : '4rem',
        marginBottom: isMobile ? '3rem' : '4rem',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Context</p>
          <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.body}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Details</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
            {project.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.1)', gap: '1rem' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.5)', flexShrink: 0 }}>{d.label}</span>
                <span style={{ fontSize: '13px', color: '#14211C', textAlign: 'right' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive embed OR tile pair — full content width.
          The decorative DetailBlock pair is a legacy fallback from before
          projects had real imagery: it only renders when a project has NO
          media at all (no hero/tile, gallery, or book pages). Projects with
          real content (e.g. Ella) skip it. */}
      {project.interactiveUrl ? (
        <div style={{ ...fade(180), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '1.5rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '0.5rem' }}>Try it out</p>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(20,33,28,0.6)', marginBottom: '1rem', maxWidth: '820px' }}>
            {project.interactiveNote || 'The full prototype is embedded below. Tap the screen to launch — all four flows (Browse, Answers, Sell, Price Check) are wired up.'}
          </p>
          <TryItOut src={project.interactiveUrl} label={project.title} />
          {project.interactiveAltUrl && (
            <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <a href={project.interactiveAltUrl} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--ff-mono)', fontSize: '11px', fontWeight: 400,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(20,33,28,0.55)', textDecoration: 'none',
              }}>{project.interactiveAltLabel || 'Open the full prototype ↗'}</a>
            </p>
          )}
        </div>
      ) : !((m => m.hero || m.tile || (m.gallery || []).length || (m.book || []).length)((window.IMAGE_MANIFEST || {})[projectId] || {})) ? (
        <div style={{
          ...fade(180),
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: '0.625rem',
          marginBottom: isMobile ? '3rem' : '4rem',
        }}>
          <div style={{ height: isMobile ? '200px' : '320px' }}>
            <DetailBlock imageIndex={project.imageIndex} bg={project.tileBg} hovered={false} />
          </div>
          <div style={{ height: isMobile ? '160px' : '320px' }}>
            <DetailBlock imageIndex={(project.imageIndex + 2) % 7} bg={['#3D5448','#14211C','#E8E4D5','#D45A1B','#3D5448','#14211C','#3D5448'][project.imageIndex]} hovered={false} />
          </div>
        </div>
      ) : null}

      {/* Process */}
      <div style={{ ...fade(220), maxWidth: '820px', marginBottom: isMobile ? '3rem' : '4rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Process</p>
        {project.process.map((para, i) => (
          <p key={i} style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', marginBottom: '1.25rem' }}>{para}</p>
        ))}
      </div>

      {/* Insights */}
      {project.insights && project.insights.length > 0 && (
        <div style={{ ...fade(260), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>{project.insightsLabel || 'Insights from research'}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1.25rem' : '2rem',
          }}>
            {project.insights.map((item, i) => (
              <div key={i} style={{ padding: isMobile ? '1.25rem' : '1.5rem', background: 'rgba(20,33,28,0.025)', borderRadius: '6px', border: '0.5px solid rgba(20,33,28,0.06)', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#14211C', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{item.label}</p>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(20,33,28,0.7)', margin: 0 }}>{item.body}</p>
                {/* Phone view — the app screen that answers this insight.
                    Live page in a bezel, scaled to fit; non-interactive
                    (pointerEvents none) so it reads as a screenshot. */}
                {item.screen && (
                  <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '240px', padding: '8px', flexShrink: 0,
                      background: '#0B1513', borderRadius: '34px',
                      border: '1px solid rgba(20,33,28,0.2)',
                      boxShadow: '0 12px 32px rgba(20,33,28,0.18), inset 0px 1px 0px 0px rgba(255,255,255,0.08)',
                    }}>
                      <div style={{ borderRadius: '26px', overflow: 'hidden', background: '#1A2520', height: `${Math.round(224 * 852 / 393)}px`, position: 'relative' }}>
                        <iframe
                          src={item.screen} title={`${item.label} — app view`} loading="lazy"
                          scrolling="no" tabIndex={-1} aria-hidden="true"
                          style={{
                            width: '393px', height: '852px', border: 0,
                            transformOrigin: 'top left', transform: `scale(${224 / 393})`,
                            pointerEvents: 'none', display: 'block',
                          }}
                        />
                      </div>
                    </div>
                    {item.screenLabel && (
                      <p style={{ fontSize: '10px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', margin: 0, textAlign: 'center' }}>{item.screenLabel}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Design system / Four arcs */}
      {project.designSystem && project.designSystem.length > 0 && (
        <div style={{ ...fade(300), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>{project.designSystemLabel || 'Design system'}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1rem' : '1.25rem',
          }}>
            {project.designSystem.map((item, i) => (
              <div key={i} style={{ padding: '1.25rem', background: 'rgba(20,33,28,0.025)', borderRadius: '6px', border: '0.5px solid rgba(20,33,28,0.06)' }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: '#14211C', margin: '0 0 0.5rem' }}>{item.label}</p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(20,33,28,0.65)', margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Component stories — linked step-by-step development narratives */}
      {project.componentStories && project.componentStories.length > 0 && (
        <div style={{ ...fade(310), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '0.75rem' }}>{project.componentStoriesLabel || 'Component stories'}</p>
          {project.componentStoriesIntro && (
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(20,33,28,0.6)', marginBottom: '1.5rem', maxWidth: '820px' }}>{project.componentStoriesIntro}</p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1rem' : '1.25rem',
          }}>
            {project.componentStories.map((s) => (
              <ComponentStoryCard key={s.id} story={s} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}

      {/* Featured modules — interactive wireframe embeds */}
      {project.modules && project.modules.length > 0 && (
        <div style={{ ...fade(320), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '0.75rem' }}>{project.modulesLabel || 'Featured modules'}</p>
          {project.modulesIntro && (
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(20,33,28,0.6)', marginBottom: '2.5rem', maxWidth: '820px' }}>{project.modulesIntro}</p>
          )}
          {project.modules.map((m, i) => (
            <div key={i} style={{ marginBottom: i < project.modules.length - 1 ? (isMobile ? '3rem' : '4.5rem') : 0 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 2fr)',
                gap: isMobile ? '1rem' : '3rem',
                alignItems: 'start',
              }}>
                <div>
                  <p style={{ fontSize: '17px', fontWeight: 500, color: '#14211C', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>{m.title}</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(20,33,28,0.7)', margin: 0 }}>{m.blurb}</p>
                </div>
                <DesktopFrame
                  src={m.src}
                  label={m.label}
                  gateTitle={m.gateTitle}
                  gateNote={m.gateNote}
                  designW={m.designW || 1440}
                  designH={m.designH || 900}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio book pages — shared BookSpreads component. Renders only
          when images/<project-id>/book-NN.jpg exist (e.g. exhibition-trailer's
          M.Arch 2022 pages). Layout metadata comes from PROJECT_DATA. */}
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

      {/* Gallery — images from images/<project-id>/ via the manifest.
          Add numbered files (01.jpg, 02.jpg…) + optional captions.json,
          rebuild the manifest, and they appear here. No images = no section. */}
      {gallery.length > 0 && (
        <div style={{ ...fade(340), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Gallery</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.75rem' : '2.5rem' }}>
            {gallery.map((g, i) => (
              <figure key={g.src} style={{ margin: 0 }}>
                {g.video ? (
                  <video
                    src={g.src}
                    controls muted loop playsInline preload="metadata"
                    style={{ width: '100%', display: 'block', borderRadius: '10px', background: '#14211C' }}
                  />
                ) : (
                <img
                  src={g.src}
                  alt={g.caption || `${project.title} — image ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '10px' }}
                />
                )}
                {g.caption && (
                  <figcaption style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(20,33,28,0.5)', marginTop: '0.6rem', letterSpacing: '0.01em' }}>
                    {g.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Influences */}
      {project.influences && project.influences.length > 0 && (
        <div style={{ ...fade(340), marginBottom: isMobile ? '3rem' : '4rem', paddingTop: '2rem', borderTop: '0.5px solid rgba(20,33,28,0.1)', maxWidth: '820px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Influences</p>
          {project.influences.map((item, i) => (
            <div key={i} style={{
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '140px 1fr',
              gap: isMobile ? '0.35rem' : '1.25rem',
              alignItems: 'baseline',
            }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#14211C', margin: 0, letterSpacing: '0.01em' }}>{item.label}</p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(20,33,28,0.65)', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Outcome + Credits — two-column */}
      <div style={{
        ...fade(380),
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: isMobile ? '2rem' : '4rem',
        borderTop: '0.5px solid rgba(20,33,28,0.1)',
        paddingTop: '2.5rem',
        marginBottom: isMobile ? '3rem' : '4rem',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Current state</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(20,33,28,0.75)', margin: 0 }}>{project.outcome}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1rem' }}>Credits</p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(20,33,28,0.6)', margin: 0 }}>{project.credits}</p>
        </div>
      </div>

      {/* Back to work */}
      <div style={{ ...fade(420), marginBottom: isMobile ? '3rem' : '4rem' }}>
        <ArrowLink onClick={() => onNavigate('work')} style={{ fontSize: '13px', color: 'rgba(20,33,28,0.55)' }}>Back to work</ArrowLink>
      </div>

      {/* Next project — full container width, matches hero */}
      {nextProject && (
        <div style={{ ...fade(460), borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: isMobile ? '2rem' : '3rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.35)', marginBottom: '1.5rem' }}>Next</p>
          <NextProjectCard project={nextProject} onNavigate={onNavigate} isMobile={isMobile} />
        </div>
      )}
    </main>
  );
};

// ComponentStoryCard — clickable card linking to a component's own case study
// page (zoning-chat, comps, site-search). Not an embed: the story pages carry
// the step-by-step development narrative.
const ComponentStoryCard = ({ story, onNavigate }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={() => onNavigate('project', story.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '1.5rem', borderRadius: '8px', cursor: 'pointer',
        background: hov ? 'rgba(20,33,28,0.05)' : 'rgba(20,33,28,0.025)',
        border: '0.5px solid rgba(20,33,28,0.08)',
        transition: 'background 180ms, transform 250ms cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.6rem' }}>
        <p style={{ fontSize: '15px', fontWeight: 500, color: '#14211C', margin: 0, letterSpacing: '-0.01em' }}>{story.title}</p>
        <span style={{ fontSize: '15px', color: hov ? '#D45A1B' : 'rgba(20,33,28,0.4)', transition: 'transform 180ms, color 180ms', transform: hov ? 'translateX(4px)' : 'none', flexShrink: 0 }}>→</span>
      </div>
      <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(20,33,28,0.65)', margin: 0 }}>{story.blurb}</p>
    </div>
  );
};

const NextProjectCard = ({ project, onNavigate, isMobile = false }) => {
  const [hov, setHov] = React.useState(false);
  const light = project.tileBg === '#F2EFE6' || project.tileBg === '#E8E4D5';
  const textC = light ? '#14211C' : '#F2EFE6';
  const mutedC = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  // `project` IS the previewed next project — navigate to it, not to ITS
  // next (the old `project.next ||` fallback skipped one project ahead).
  const targetId = Object.keys(PROJECT_DATA).find(k => PROJECT_DATA[k] === project);

  return (
    <div
      onClick={() => onNavigate('project', targetId)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: project.tileBg, borderRadius: '10px',
        height: isMobile ? 'clamp(180px, 40vw, 260px)' : 'clamp(220px, 22vw, 300px)',
        cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
      }}
    >
      <ProjectVisual projectId={Object.keys(PROJECT_DATA).find(k => PROJECT_DATA[k] === project)} bg={project.tileBg} index={project.imageIndex} hovered={hov} silhouette={project.silhouette} />
      <div style={{
        position: 'absolute', inset: 0,
        padding: isMobile ? '1.25rem' : '2rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ zIndex: 1 }}>
          <p style={{ fontSize: '10px', fontWeight: 500, fontFamily: 'var(--ff-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedC, margin: '0 0 5px' }}>{project.org} · {project.year}</p>
          <p style={{ fontFamily: 'var(--ff-serif)', fontSize: isMobile ? '21px' : 'clamp(24px, 2.6vw, 34px)', fontWeight: 400, color: textC, margin: 0, letterSpacing: '-0.02em' }}>{project.title}</p>
        </div>
        <span style={{ zIndex: 1, fontSize: isMobile ? '18px' : '22px', color: textC, transition: 'transform 180ms', transform: hov ? 'translateX(5px)' : 'none', flexShrink: 0 }}>→</span>
      </div>
    </div>
  );
};

Object.assign(window, { PROJECT_DATA, ProjectPage, NextProjectCard, DetailBlock });
