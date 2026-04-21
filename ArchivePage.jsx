// ArchivePage.jsx
const ARCHIVE_ITEMS = [
  { title: 'Mesa Verde', year: '2021', org: 'Pratt Institute', type: 'Thesis', desc: 'Structural and spatial investigation into mesa-top habitation. Studio thesis, Pratt School of Architecture.', bg: '#3D5448', imageIndex: 0 },
  { title: 'Fluxing', year: '2020', org: 'Pratt Institute', type: 'Studio project', desc: 'Abstract paper architecture exploring form and movement without gravitational constraint.', bg: '#14211C', imageIndex: 1 },
  { title: 'Mass Studies', year: '2019', org: 'Pratt Institute', type: 'Studio project', desc: 'Volumetric composition studies. Material: chipboard and basswood.', bg: '#E8E4D5', imageIndex: 2 },
  { title: 'Urban Threshold', year: '2018', org: 'Lehigh University', type: 'Studio project', desc: 'Adaptive reuse examining threshold conditions in urban context.', bg: '#3D5448', imageIndex: 3 },
  { title: 'Lehigh Paper Architecture', year: '2017', org: 'Lehigh University', type: 'Studio work', desc: 'Form and composition work from undergraduate studio. No program, no gravity.', bg: '#14211C', imageIndex: 4 },
  { title: 'Surface Studies', year: '2016', org: 'Lehigh University', type: 'Studio work', desc: 'Material and surface explorations. Hand-built models.', bg: '#E8E4D5', imageIndex: 5 },
];
window.ARCHIVE_ITEMS = ARCHIVE_ITEMS;

const ArchivePage = ({ onNavigate }) => {
  const items = ARCHIVE_ITEMS;

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2.5rem' }}>
      <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,33,28,0.4)', marginBottom: '1.5rem' }}>Archive</p>
        <h1 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#14211C', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Before buildings, there were drawings of buildings that couldn't exist.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(20,33,28,0.6)', lineHeight: 1.65, margin: 0 }}>
          Work from Lehigh and Pratt, 2014–2022.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
        {items.map((item, i) => (
          <ArchiveTile key={i} item={item} />
        ))}
      </div>
    </main>
  );
};

const ArchiveTile = ({ item }) => {
  const [hov, setHov] = React.useState(false);
  const light = item.bg === '#E8E4D5' || item.bg === '#F2EFE6';
  const textC = light ? '#14211C' : '#F2EFE6';
  const mutedC = light ? 'rgba(20,33,28,0.5)' : 'rgba(242,239,230,0.5)';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: item.bg, borderRadius: '10px', padding: '1.5rem',
        minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        border: light ? '0.5px solid rgba(20,33,28,0.12)' : 'none',
        cursor: 'default',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedC, margin: '0 0 6px' }}>
          {item.org} · {item.year}
        </p>
        <p style={{ fontSize: '15px', fontWeight: 500, color: textC, margin: '0 0 8px', lineHeight: 1.25 }}>{item.title}</p>
        <p style={{ fontSize: '12px', color: mutedC, lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
      </div>
      <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedC, margin: '1rem 0 0' }}>{item.type}</p>
    </div>
  );
};

Object.assign(window, { ArchivePage, ArchiveTile });
