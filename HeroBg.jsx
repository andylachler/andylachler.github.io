// HeroBg.jsx — mouse-reactive parallax canvas background
const HeroBg = () => {
  const canvasRef = React.useRef(null);
  const state = React.useRef({
    mouse: { x: 0.5, y: 0.5 },   // normalized 0-1
    target: { x: 0.5, y: 0.5 },  // smoothed
    raf: null,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = (e.clientX - rect.left) / rect.width;
      s.mouse.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMove);

    // ── Define layers ──────────────────────────────────────────────────────
    // Each layer: { depth: 0-1 (0=far, 1=near), draw: fn(ctx, W, H, ox, oy) }
    // ox, oy = pixel offset from mouse parallax

    const layers = [
      // Layer 0 — deepest: fine grid
      {
        depth: 0.04,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          ctx.strokeStyle = 'rgba(242,239,230,0.06)';
          ctx.lineWidth = 0.5;
          const step = 48;
          // extend beyond canvas to avoid edge gaps
          for (let x = -step; x < W + step * 2; x += step) {
            ctx.beginPath(); ctx.moveTo(x, -step); ctx.lineTo(x, H + step); ctx.stroke();
          }
          for (let y = -step; y < H + step * 2; y += step) {
            ctx.beginPath(); ctx.moveTo(-step, y); ctx.lineTo(W + step, y); ctx.stroke();
          }
          ctx.restore();
        }
      },

      // Layer 1 — far: large building footprint / site plan
      {
        depth: 0.10,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          ctx.strokeStyle = 'rgba(242,239,230,0.10)';
          ctx.lineWidth = 1;
          const x0 = W * 0.08, y0 = H * 0.20, bw = W * 0.50, bh = H * 0.50;
          ctx.strokeRect(x0, y0, bw, bh);

          ctx.lineWidth = 0.6;
          ctx.strokeStyle = 'rgba(242,239,230,0.07)';
          // Interior walls
          ctx.strokeRect(x0 + bw * 0.22, y0 + bh * 0.15, bw * 0.36, bh * 0.30);
          ctx.strokeRect(x0 + bw * 0.22, y0 + bh * 0.55, bw * 0.36, bh * 0.30);
          ctx.strokeRect(x0 + bw * 0.62, y0 + bh * 0.15, bw * 0.28, bh * 0.30);
          // Dimension lines
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = 'rgba(242,239,230,0.05)';
          ctx.beginPath(); ctx.moveTo(x0, y0 - 20); ctx.lineTo(x0 + bw, y0 - 20); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x0 - 20, y0); ctx.lineTo(x0 - 20, y0 + bh); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      },

      // Layer 2 — mid: dot constellation (structural grid)
      {
        depth: 0.18,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          ctx.fillStyle = 'rgba(242,239,230,0.20)';
          const cols = 14, rows = 9;
          const sx = W * 0.55, sy = H * 0.10, gx = W * 0.40 / cols, gy = H * 0.70 / rows;
          for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
              ctx.beginPath();
              ctx.arc(sx + c * gx, sy + r * gy, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        }
      },

      // Layer 3 — mid: building section elevation
      {
        depth: 0.28,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          const ground = H * 0.88;
          // Ground line
          ctx.strokeStyle = 'rgba(242,239,230,0.12)';
          ctx.lineWidth = 0.75;
          ctx.beginPath(); ctx.moveTo(W * 0.58, ground); ctx.lineTo(W * 1.05, ground); ctx.stroke();
          // Tower blocks
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
            // Windows
            ctx.strokeStyle = 'rgba(242,239,230,0.08)';
            ctx.lineWidth = 0.4;
            const floors = Math.floor(b.h / 22);
            for (let f = 0; f < floors - 1; f++) {
              const wy = ground - b.h + 10 + f * 22;
              ctx.strokeRect(b.x + 6, wy, 12, 10);
              if (b.w > 36) ctx.strokeRect(b.x + 24, wy, 12, 10);
            }
          });
          ctx.restore();
        }
      },

      // Layer 4 — near: large cross drawn lines (axon/section indicator)
      {
        depth: 0.40,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          ctx.strokeStyle = 'rgba(212,90,27,0.12)'; // Gear Orange at very low opacity
          ctx.lineWidth = 0.5;
          ctx.setLineDash([2, 8]);
          // Cutting plane line across blueprint
          ctx.beginPath();
          ctx.moveTo(W * 0.06, H * 0.48);
          ctx.lineTo(W * 0.62, H * 0.48);
          ctx.stroke();
          // Section marker circles at ends
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(212,90,27,0.18)';
          ctx.lineWidth = 0.75;
          ctx.beginPath(); ctx.arc(W * 0.06, H * 0.48, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(W * 0.62, H * 0.48, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
      },

      // Layer 5 — nearest: sparse large geometry
      {
        depth: 0.55,
        draw: (ctx, W, H, ox, oy) => {
          ctx.save();
          ctx.translate(ox, oy);
          ctx.strokeStyle = 'rgba(242,239,230,0.06)';
          ctx.lineWidth = 1;
          // Large L-shape massing
          ctx.beginPath();
          ctx.moveTo(W * 0.12, H * 0.12);
          ctx.lineTo(W * 0.12, H * 0.72);
          ctx.lineTo(W * 0.38, H * 0.72);
          ctx.lineTo(W * 0.38, H * 0.42);
          ctx.lineTo(W * 0.55, H * 0.42);
          ctx.lineTo(W * 0.55, H * 0.12);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      },
    ];

    // ── Render loop ────────────────────────────────────────────────────────
    const render = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      // Smooth mouse follow — faster when further, slower near
      const lerpFactor = 0.06;
      s.target.x += (s.mouse.x - s.target.x) * lerpFactor;
      s.target.y += (s.mouse.y - s.target.y) * lerpFactor;

      // Parallax offset: mouse deviation from center × depth × max displacement
      const maxDisp = 60; // px at depth=1
      const dx = (s.target.x - 0.5) * maxDisp;
      const dy = (s.target.y - 0.5) * maxDisp;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Draw each layer
      layers.forEach(layer => {
        const ox = dx * layer.depth;
        const oy = dy * layer.depth;
        layer.draw(ctx, W, H, ox, oy);
      });

      s.raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(s.raf);
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
