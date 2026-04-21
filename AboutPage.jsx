// AboutPage.jsx
const AboutPage = () => (
  <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2.5rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', maxWidth: '960px' }}>
      {/* Bio */}
      <div>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '2rem' }}>About</p>
        <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.7, color: '#14211C', marginBottom: '1.5rem', maxWidth: '460px' }}>
          I design product interfaces and physical objects. Trained as an architect at Lehigh and Pratt. Currently at Algoma in New York.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.68)', marginBottom: '1.5rem', maxWidth: '460px' }}>
          At Arquitectonica, I led facade resolution and consultant coordination on residential and mixed-use projects from 20 units to over a million square feet. Promoted from Project Designer to Associate in under two years.
        </p>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(20,33,28,0.68)', maxWidth: '460px' }}>
          Three languages — English, Spanish fluent; German proficient. US and German dual national. Hands-on making: carpentry, 3D printing, model making.
        </p>
      </div>

      {/* Info */}
      <div>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '2rem' }}>Contact</p>
        <div style={{ marginBottom: '3rem' }}>
          <ContactRow label="Email" value="a@lachler.com" link />
          <ContactRow label="Location" value="New York, NY" />
          <ContactRow label="Currently" value="Algoma" />
        </div>

        <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Education</p>
          <InfoRow left="Pratt Institute" sub="M.Arch" right="2022" />
          <InfoRow left="Lehigh University" sub="B.S. Architecture" right="2018" />
        </div>

        <div style={{ borderTop: '0.5px solid rgba(20,33,28,0.1)', paddingTop: '2rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.25rem' }}>Experience</p>
          <InfoRow left="Algoma" sub="Product Designer" right="2024–" />
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
