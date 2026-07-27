// HeroBg.jsx — ambient dot field with mouse ripple (v4 design language, P2).
//
// Replaces the blueprint parallax. Perf architecture:
//   • Dot positions precomputed once per resize (no per-frame allocation).
//   • Dots are batched by quantized alpha bucket — ~14 beginPath/fill calls
//     per frame instead of one per dot (~2,700 on a laptop viewport).
//   • DPR capped at 1.75; grid step scales up on small screens.
//   • IntersectionObserver pauses the loop when the hero is offscreen.
//   • Touch devices and prefers-reduced-motion get a single static frame —
//     zero animation cost on phones.
//   • window.__HERO_BG_STATUS = 'running' | 'idle' for the design-lab meter.
const HeroBg = () => {
  const canvasRef = React.useRef(null);
  const state = React.useRef({
    raf: null, running: false, inView: true,
    W: 0, H: 0, mx: -9999, my: -9999, t: 0,
    dots: null, cols: 0, rows: 0, step: 22,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animated = !isTouch && !reduced;

    const CREAM = [242, 239, 230];
    const ORANGE = [212, 90, 27];
    // ── Visibility knobs (tuned up July 27, 2026 — the field read as noise) ──
    // Resting alpha now spans 0.13–0.33 instead of 0.07–0.18. Paired with the
    // canvas opacity lift below (0.55 → 0.85) that's roughly 2.5× the effective
    // contrast against the forest ground. BUCKETS raised because the old 14
    // levels were spread across a 0.75 range the dots never reached — at rest
    // only three of them were ever used, which is what made the wave band.
    const BUCKETS = 18;      // alpha quantization levels
    const MAX_ALPHA = 0.90;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      s.W = canvas.offsetWidth;
      s.H = canvas.offsetHeight;
      canvas.width = s.W * dpr;
      canvas.height = s.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.step = s.W < 640 ? 28 : 22;
      s.cols = Math.ceil(s.W / s.step) + 2;
      s.rows = Math.ceil(s.H / s.step) + 2;
      // Precompute grid positions (flat arrays — cache-friendly)
      const n = s.cols * s.rows;
      s.dots = { x: new Float32Array(n), y: new Float32Array(n) };
      let k = 0;
      for (let j = 0; j < s.rows; j++) {
        for (let i = 0; i < s.cols; i++) {
          s.dots.x[k] = i * s.step;
          s.dots.y[k] = j * s.step;
          k++;
        }
      }
      drawFrame();
    };

    // One frame: bucket dots by (alpha, orange?) then fill each bucket once.
    const buckets = [];
    const drawFrame = () => {
      const { W, H, mx, my, t, dots } = s;
      if (!dots) return;
      ctx.clearRect(0, 0, W, H);
      // reset buckets: [bucketIndex][isOrange] -> array of (x, y, size)
      buckets.length = 0;
      for (let b = 0; b < BUCKETS * 2; b++) buckets.push([]);

      const n = dots.x.length;
      for (let k = 0; k < n; k++) {
        const x = dots.x[k], y = dots.y[k];
        const dx = x - mx, dy = y - my;
        const d2 = dx * dx + dy * dy;
        const ripple = d2 < 67600 ? 1 - Math.sqrt(d2) / 260 : 0; // 260px radius
        const wave = Math.sin((x + y) * 0.012 + t) * 0.5 + 0.5;
        const size = 0.55 + wave * 1.15 + ripple * 2.6;
        const alpha = 0.13 + wave * 0.20 + ripple * 0.55;
        const bi = Math.min(BUCKETS - 1, (alpha / MAX_ALPHA * BUCKETS) | 0);
        buckets[ripple > 0.12 ? BUCKETS + bi : bi].push(x, y, size);
      }
      for (let b = 0; b < BUCKETS * 2; b++) {
        const arr = buckets[b];
        if (!arr.length) continue;
        const orange = b >= BUCKETS;
        const a = ((b % BUCKETS) + 0.5) / BUCKETS * MAX_ALPHA;
        const c = orange ? ORANGE : CREAM;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < arr.length; i += 3) {
          ctx.moveTo(arr[i] + arr[i + 2], arr[i + 1]);
          ctx.arc(arr[i], arr[i + 1], arr[i + 2], 0, 6.2832);
        }
        ctx.fill();
      }
    };

    const loop = () => {
      s.t += 0.011;   // ~13s wave period → ~9.5s; motion reads without fidgeting
      drawFrame();
      s.raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (s.running || !s.inView || !animated) return;
      s.running = true;
      window.__HERO_BG_STATUS = 'running';
      s.raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(s.raf);
      s.running = false;
      window.__HERO_BG_STATUS = 'idle';
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mx = e.clientX - rect.left;
      s.my = e.clientY - rect.top;
    };

    const io = new IntersectionObserver(([entry]) => {
      s.inView = entry.isIntersecting;
      if (s.inView) start(); else stop();
    });
    io.observe(canvas);

    resize();
    window.__HERO_BG_STATUS = 'idle';
    window.addEventListener('resize', resize);
    if (animated) {
      window.addEventListener('mousemove', onMove);
      start();
    }

    return () => {
      stop();
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
        opacity: 0.85,
      }}
    />
  );
};

Object.assign(window, { HeroBg });
