// Cursor.jsx — custom difference-blend cursor (v4 design language).
//
// 8px cream dot easing after the pointer; grows to 36px over interactive
// elements (event delegation, so SPA re-renders are covered automatically).
// Fine pointers only — touch devices never mount the DOM node. The rAF loop
// stops when the dot has converged on the pointer (same idle-stop pattern as
// HeroBg) and restarts on movement.
const Cursor = () => {
  const dotRef = React.useRef(null);
  const s = React.useRef({ x: -100, y: -100, tx: -100, ty: -100, raf: null, running: false });

  const fine = React.useMemo(
    () => window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  React.useEffect(() => {
    if (!fine) return;
    const dot = dotRef.current;
    const st = s.current;

    const loop = () => {
      st.x += (st.tx - st.x) * 0.22;
      st.y += (st.ty - st.y) * 0.22;
      dot.style.transform = `translate(${st.x}px, ${st.y}px) translate(-50%, -50%)`;
      if (Math.abs(st.tx - st.x) < 0.1 && Math.abs(st.ty - st.y) < 0.1) {
        st.running = false;
        return;
      }
      st.raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (st.running) return;
      st.running = true;
      st.raf = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      st.tx = e.clientX; st.ty = e.clientY;
      start();
    };
    // Delegated hover growth — survives SPA re-renders without rebinding.
    const isInteractive = (el) => el.closest && el.closest('a, button, [role="button"], [data-cursor="big"]');
    const onOver = (e) => { if (isInteractive(e.target)) dot.classList.add('cursor-big'); };
    const onOut = (e) => { if (isInteractive(e.target)) dot.classList.remove('cursor-big'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button { cursor: none; }
        }
        .cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 99999;
          width: 8px; height: 8px; border-radius: 999px;
          background: #F2EFE6;
          pointer-events: none;
          mix-blend-mode: difference;
          transition: width 180ms ease, height 180ms ease;
        }
        .cursor-dot.cursor-big { width: 36px; height: 36px; }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

window.Cursor = Cursor;
