// AboutPage.jsx
const AboutPage = () => {
  const isMobile = (window.useIsMobile || (() => false))(768);
  const outerPad = isMobile ? '7rem 1.25rem 4rem' : '8.5rem 2.5rem 6rem';

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: outerPad }}>
      {/* Section label */}
      <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: isMobile ? '1.5rem' : '2.5rem' }}>About</p>

      {/* Lede — larger, full reading width */}
      <div style={{ maxWidth: '920px', marginBottom: isMobile ? '3rem' : '4.5rem' }}>
        <p style={{ fontSize: isMobile ? 'clamp(18px, 4.8vw, 22px)' : 'clamp(20px, 2.1vw, 26px)', fontWeight: 400, lineHeight: 1.5, color: '#14211C', margin: 0, letterSpacing: '-0.005em' }}>
          I'm a designer and technologist working at the intersection of architecture, product, and automation. My practice spans the full stack of how buildings get made — from permit sets and feasibility studies to the software, data, and brand systems that shape how architects and developers make decisions.
        </p>
      </div>

      {/* Body + sidebar info — fills full 1400px container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)',
        gap: isMobile ? '3rem' : '5rem',
      }}>
        {/* Left: biography */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Practice</p>
          <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', marginBottom: '1.25rem' }}>
            As Product Lead at Algoma, I drive the platform end-to-end: wireframing and shipping features, designing AI-powered zoning and market-intelligence tools, integrating GIS and regulatory data, and shaping the brand and go-to-market system. I partner closely with engineering and learn directly from users through design-partner interviews and customer research.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', marginBottom: '1.25rem' }}>
            Before Algoma, I was an Associate Designer at Arquitectonica on large-scale multifamily projects, where I helped introduce AI-driven visualization and computational workflows. Earlier work at boutique firms grounded me in the full arc of design, from concept through schematic development.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.75)', margin: 0 }}>
            Master of Architecture from Pratt, B.S. Architecture from Lehigh. Dual US / German national — fluent English and Spanish, proficient German. Hands-on with carpentry, 3D printing, and model making.
          </p>
        </div>

        {/* Right: contact + education + experience */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Contact</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', marginBottom: '2.5rem' }}>
            <ContactRow label="Email" value="andy@lachler.com" link />
            <ContactRow label="Location" value="New York, NY" />
            <ContactRow label="Currently" value="Algoma — Product Lead" />
          </div>

          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Education</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', marginBottom: '2.5rem' }}>
            <InfoRow left="Pratt Institute" sub="M.Arch" right="2022" />
            <InfoRow left="Lehigh University" sub="B.S. Architecture" right="2018" />
          </div>

          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Experience</p>
          <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)' }}>
            <InfoRow left="Algoma" sub="Product Lead" right="2024–" />
            <InfoRow left="Arquitectonica" sub="Associate" right="2022–24" />
          </div>
        </div>
      </div>
    </main>
  );
};

const ContactRow = ({ label, value, link }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.75rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.1)', gap: '1rem' }}>
    <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.5)', flexShrink: 0 }}>{label}</span>
    {link
      ? <a href={`mailto:${value}`} style={{ fontSize: '14px', fontWeight: 400, color: '#14211C', textDecoration: 'none', textAlign: 'right' }}
           onMouseEnter={e => e.target.style.color='#D45A1B'}
           onMouseLeave={e => e.target.style.color='#14211C'}
        >{value}</a>
      : <span style={{ fontSize: '14px', fontWeight: 400, color: '#14211C', textAlign: 'right' }}>{value}</span>
    }
  </div>
);

const InfoRow = ({ left, sub, right }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.75rem 0', borderBottom: '0.5px solid rgba(20,33,28,0.1)', gap: '1rem' }}>
    <div style={{ minWidth: 0 }}>
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#14211C' }}>{left}</span>
      <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(20,33,28,0.5)', marginLeft: '0.5rem' }}>{sub}</span>
    </div>
    <span style={{ fontSize: '12px', color: 'rgba(20,33,28,0.45)', flexShrink: 0 }}>{right}</span>
  </div>
);

Object.assign(window, { AboutPage, ContactRow, InfoRow });
