// HeroBg.jsx — mouse-reactive parallax canvas background.
//
// Performance architecture (rewritten July 2026):
//   • Each layer is pre-rendered ONCE to an offscreen canvas (padded by the
//     max parallax displacement). The per-frame cost is six drawImage calls
//     instead of ~300 stroke/fill calls.
//   • The rAF loop only runs while the parallax is actually converging.
//     When the eased offset settles (or the mouse never moves — touch
//     devices), the loop STOPS. Idle cost: zero.
//   • An IntersectionObserver stops everything while the hero is scrolled
//     out of view.
//   • window.__HERO_BG_STATUS exposes 'running' / 'idle' for the design lab
//     FPS meter.
const HeroBg = () => {
  const canvasRef = React.useRef(null);
  const state = React.useRef({
    mouse: { x: 0.5, y: 0.5 },
    target: { x: 0.5, y: 0.5 },
    raf: null, running: false, inView: true,
    W: 0, H: 0, dpr: 1, pad: 44, sprites: [],
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;
    const maxDisp = 60; // px at depth=1

    // ── Layer definitions (unchanged visuals) ──────────────────────────────
    const layers = [
      // Layer 0 — deepest: fine grid
      {
        depth: 0.04,
        draw: (ctx, W, H) => {
          ctx.strokeStyle = 'rgba(242,239,230,0.06)';
          ctx.lineWidth = 0.5;
          const step = 48;
          ctx.beginPath();
          for (let x = -step; x < W + step * 2; x += step) { ctx.moveTo(x, -step); ctx.lineTo(x, H + step); }
          for (let y = -step; y < H + step * 2; y += step) { ctx.moveTo(-step, y); ctx.lineTo(W + step, y); }
          ctx.stroke();
        }
      },
      // Layer 1 — far: large building footprint / site plan
      {
        depth: 0.10,
        draw: (ctx, W, H) => {
          ctx.strokeStyle = 'rgba(242,239,230,0.10)';
          ctx.lineWidth = 1;
          const x0 = W * 0.08, y0 = H * 0.20, bw = W * 0.50, bh = H * 0.50;
          ctx.strokeRect(x0, y0, bw, bh);
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = 'rgba(242,239,230,0.07)';
          ctx.strokeRect(x0 + bw * 0.22, y0 + bh * 0.15, bw * 0.36, bh * 0.30);
          ctx.strokeRect(x0 + bw * 0.22, y0 + bh * 0.55, bw * 0.36, bh * 0.30);
          ctx.strokeRect(x0 + bw * 0.62, y0 + bh * 0.15, bw * 0.28, bh * 0.30);
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = 'rgba(242,239,230,0.05)';
          ctx.beginPath(); ctx.moveTo(x0, y0 - 20); ctx.lineTo(x0 + bw, y0 - 20); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x0 - 20, y0); ctx.lineTo(x0 - 20, y0 + bh); ctx.stroke();
          ctx.setLineDash([]);
        }
      },
      // Layer 2 — mid: dot constellation (structural grid)
      {
        depth: 0.18,
        draw: (ctx, W, H) => {
          ctx.fillStyle = 'rgba(242,239,230,0.20)';
          const cols = 14, rows = 9;
          const sx = W * 0.55, sy = H * 0.10, gx = W * 0.40 / cols, gy = H * 0.70 / rows;
          ctx.beginPath();
          for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
              ctx.moveTo(sx + c * gx + 1.2, sy + r * gy);
              ctx.arc(sx + c * gx, sy + r * gy, 1.2, 0, Math.PI * 2);
            }
          }
          ctx.fill();
        }
      },
      // Layer 3 — mid: building section elevation
      {
        depth: 0.28,
        draw: (ctx, W, H) => {
          const ground = H * 0.88;
          ctx.strokeStyle = 'rgba(242,239,230,0.12)';
          ctx.lineWidth = 0.75;
          ctx.beginPath(); ctx.moveTo(W * 0.58, ground); ctx.lineTo(W * 1.05, ground); ctx.stroke();
          const blocks = [
            { x: W * 0.60, w: 44, h: H * 0.38 },
            { x: W * 0.66, w: 36, h: H * 0.28 },
            { x: W * 0.725, w: 48, h: H * 0.44 },
            { x: W * 0.80, w: 36, h: H * 0.22 },
            { x: W * 0.86, w: 44, h: H * 0.34 },
            { x: W * 0.925, w: 36, h: H * 0.26 },
          ];
          blocks.forEach(b => {
            ctx.strokeStyle = 'rgba(242,239,230,0.12)';
            ctx.lineWidth = 0.75;
            ctx.strokeRect(b.x, ground - b.h, b.w, b.h);
            ctx.strokeStyle = 'rgba(242,239,230,0.08)';
            ctx.lineWidth = 0.4;
            const floors = Math.floor(b.h / 22);
            for (let f = 0; f < floors - 1; f++) {
              const wy = ground - b.h + 10 + f * 22;
              ctx.strokeRect(b.x + 6, wy, 12, 10);
              if (b.w > 36) ctx.strokeRect(b.x + 24, wy, 12, 10);
            }
          });
        }
      },
      // Layer 4 — near: cutting plane + section markers
      {
        depth: 0.40,
        draw: (ctx, W, H) => {
          ctx.strokeStyle = 'rgba(212,90,27,0.12)';
          ctx.lineWidth = 0.5;
          ctx.setLineDash([2, 8]);
          ctx.beginPath(); ctx.moveTo(W * 0.06, H * 0.48); ctx.lineTo(W * 0.62, H * 0.48); ctx.stroke();
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(212,90,27,0.18)';
          ctx.lineWidth = 0.75;
          ctx.beginPath(); ctx.arc(W * 0.06, H * 0.48, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(W * 0.62, H * 0.48, 8, 0, Math.PI * 2); ctx.stroke();
        }
      },
      // Layer 5 — nearest: sparse large geometry
      {
        depth: 0.55,
        draw: (ctx, W, H) => {
          ctx.strokeStyle = 'rgba(242,239,230,0.06)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(W * 0.12, H * 0.12);
          ctx.lineTo(W * 0.12, H * 0.72);
          ctx.lineTo(W * 0.38, H * 0.72);
          ctx.lineTo(W * 0.38, H * 0.42);
          ctx.lineTo(W * 0.55, H * 0.42);
          ctx.lineTo(W * 0.55, H * 0.12);
          ctx.closePath();
          ctx.stroke();
        }
      },
    ];

    // ── Pre-render each layer to an offscreen sprite ───────────────────────
    const buildSprites = () => {
      const { W, H, dpr, pad } = s;
      s.sprites = layers.map(layer => {
        const off = document.createElement('canvas');
        off.width = (W + pad * 2) * dpr;
        off.height = (H + pad * 2) * dpr;
        const octx = off.getContext('2d');
        octx.scale(dpr, dpr);
        octx.translate(pad, pad);
        layer.draw(octx, W, H);
        return { canvas: off, depth: layer.depth };
      });
    };

    // ── Composite one frame: six drawImage calls ───────────────────────────
    const drawFrame = () => {
      const { W, H, pad } = s;
      const dx = (s.target.x - 0.5) * maxDisp;
      const dy = (s.target.y - 0.5) * maxDisp;
      ctx.clearRect(0, 0, W, H);
      for (const sp of s.sprites) {
        ctx.drawImage(sp.canvas, dx * sp.depth - pad, dy * sp.depth - pad, W + pad * 2, H + pad * 2);
      }
    };

    const resize = () => {
      s.W = canvas.offsetWidth;
      s.H = canvas.offsetHeight;
      s.dpr = window.devicePixelRatio || 1;
      canvas.width = s.W * s.dpr;
      canvas.height = s.H * s.dpr;
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      buildSprites();
      drawFrame();
    };

    // ── Loop runs only while converging; stops when settled ───────────────
    const EPS = 0.0012; // normalized: ~0.04px at max depth — visually settled
    const loop = () => {
      s.target.x += (s.mouse.x - s.target.x) * 0.06;
      s.target.y += (s.mouse.y - s.target.y) * 0.06;
      drawFrame();
      if (Math.abs(s.mouse.x - s.target.x) < EPS && Math.abs(s.mouse.y - s.target.y) < EPS) {
        s.running = false;
        window.__HERO_BG_STATUS = 'idle';
        return;
      }
      s.raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (s.running || !s.inView) return;
      s.running = true;
      window.__HERO_BG_STATUS = 'running';
      s.raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = (e.clientX - rect.left) / rect.width;
      s.mouse.y = (e.clientY - rect.top) / rect.height;
      start();
    };

    // Stop everything while the hero is offscreen
    const io = new IntersectionObserver(([entry]) => {
      s.inView = entry.isIntersecting;
      if (!s.inView && s.running) {
        cancelAnimationFrame(s.raf);
        s.running = false;
        window.__HERO_BG_STATUS = 'idle';
      }
    });
    io.observe(canvas);

    resize();
    window.__HERO_BG_STATUS = 'idle';
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(s.raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        display: 'block',
      }}
    />
  );
};

Object.assign(window, { HeroBg });
