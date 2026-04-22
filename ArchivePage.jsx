// ArchivePage.jsx
const ARCHIVE_ITEMS = [
  { title: 'Mesa Verde', year: '2021', org: 'Pratt Institute', type: 'Graduate studio', desc: 'Structural and spatial investigation into mesa-top habitation. Graduate studio, Pratt School of Architecture.', bg: '#3D5448', imageIndex: 0 },
  { title: 'Bethlehem Riverfront', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'A park and small museum on the south bank of the Lehigh, stitched into the existing bike-and-running trail network to connect North and South Bethlehem across the river.', bg: '#14211C', imageIndex: 1 },
  { title: 'One Room Schoolhouse', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Expanded single-use structure on the Lehigh green for the Psychology department\u2019s child studies program. Angular faceted roof tuned to keep young attention focused outward into the space.', bg: '#E8E4D5', imageIndex: 2 },
  { title: 'Bethlehem Culinary Institute', year: '2017', org: 'Lehigh University', type: 'Studio project', desc: 'Four-story culinary school in South Bethlehem. Programmed around the regional farm economy and the 30-minute gap in culinary schools across the Allentown\u2013Bethlehem\u2013Easton region.', bg: '#3D5448', imageIndex: 3 },
  { title: 'Unit Multiplication', year: '2018', org: 'Lehigh University', type: 'Independent study', desc: 'Parametric paper architecture. A single folded unit, multiplied by brass fasteners into a flexible planar form. With Prof. Hyun-Tae Jung.', bg: '#14211C', imageIndex: 4 },
  { title: 'Singular Development + Flow', year: '2017', org: 'Lehigh University', type: 'Independent study', desc: 'A single lightweight three-dimensional unit joined to a mirror of itself. Viewable right-side up or upside-down \u2014 band thickness varies row to row to produce a flow of density through the form.', bg: '#E8E4D5', imageIndex: 5 },
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
