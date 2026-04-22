// AboutPage.jsx
const AboutPage = () => (
  <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '8.5rem 2.5rem 5rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', maxWidth: '960px' }}>
      {/* Bio */}
      <div>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '2rem' }}>About</p>
        <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.7, color: '#14211C', marginBottom: '1.5rem', maxWidth: '480px' }}>
          I'm a designer and technologist working at the intersection of architecture, product, and automation. My practice spans the full stack of how buildings get made — from permit sets and feasibility studies to the software, data, and brand systems that shape how architects and developers make decisions.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.68)', marginBottom: '1.5rem', maxWidth: '480px' }}>
          As Product Lead at Algoma, I drive the platform end-to-end: wireframing and shipping features, designing AI-powered zoning and market-intelligence tools, integrating GIS and regulatory data, and shaping the brand and go-to-market system. I partner closely with engineering and learn directly from users through design-partner interviews and customer research.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.68)', marginBottom: '1.5rem', maxWidth: '480px' }}>
          Before Algoma, I was an Associate Designer at Arquitectonica on large-scale multifamily projects, where I helped introduce AI-driven visualization and computational workflows. Earlier work at boutique firms grounded me in the full arc of design, from concept through schematic development.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.68)', maxWidth: '480px' }}>
          Master of Architecture from Pratt, B.S. Architecture from Lehigh. Dual US / German national — fluent English and Spanish, proficient German. Hands-on with carpentry, 3D printing, and model making.
        </p>
      </div>

      {/* Info */}
      <div>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '2rem' }}>Contact</p>
        <div style={{ marginBottom: '3rem' }}>
          <ContactRow label="Email" value="andy@lachler.com" link />
          <ContactRow label="Location" value="New York, NY" />
          <ContactRow label="Currently" value="Algoma — Product Lead" />
        </div>

        <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Education</p>
          <InfoRow left="Pratt Institute" sub="M.Arch" right="2022" />
          <InfoRow left="Lehigh University" sub="B.S. Architecture" right="2018" />
        </div>

        <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Experience</p>
          <InfoRow left="Algoma" sub="Product Lead" right="2024–" />
          <InfoRow left="Arquitectonica" sub="Associate" right="2022–24" />
        </div>
      </div>
    </div>
  </main>
);

const ContactRow = ({ label, value, link }) => (
  <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.9rem', alignItems: 'baseline' }}>
    <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', minWidth: '80px' }}>{label}</span>
    {link
      ? <a href={`mailto:${value}`} style={{ fontSize: '15px', fontWeight: 500, color: '#14211C', textDecoration: 'none', borderBottom: '1px solid rgba(20,33,28,0.15)', paddingBottom: '1px' }}
           onMouseEnter={e => e.target.style.color='#D45A1B'}
           onMouseLeave={e => e.target.style.color='#14211C'}
        >{value}</a>
      : <span style={{ fontSize: '15px', fontWeight: 400, color: '#14211C' }}>{value}</span>
    }
  </div>
);

const InfoRow = ({ left, sub, right }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'baseline' }}>
    <div>
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#14211C' }}>{left}</span>
      <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(20,33,28,0.5)', marginLeft: '0.6rem' }}>{sub}</span>
    </div>
    <span style={{ fontSize: '12px', color: 'rgba(20,33,28,0.4)' }}>{right}</span>
  </div>
);

Object.assign(window, { AboutPage, ContactRow, InfoRow });
