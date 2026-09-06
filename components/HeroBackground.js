'use client';
import { useEffect, useRef } from 'react';

// Zerbiq logo mark: 24×24 rounded square with white Z letterform inside.
// Z path: top bar (6,7)→(18,7), diagonal (18,7)→(6,17), bottom bar (6,17)→(18,17)
const LOGO_Z_PATH = 'M 6 7 L 18 7 L 6 17 L 18 17';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroBackground() {
  const svgRef = useRef(null);
  const sizeRef = useRef({ w: 800, h: 600 });

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    console.log('HeroBackground mounted');

    const svg = svgRef.current;
    if (!svg) return;

    let active = true;
    const zBolts = []; // track live z-bolt elements

    // ── Track viewport size via window resize ──────────────────────────────
    sizeRef.current = { w: window.innerWidth, h: window.innerHeight };

    const onResize = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    window.addEventListener('resize', onResize);

    // ── Route Lines ────────────────────────────────────────────────────────
    // Each line: draws itself over 1.5-2.5 s, holds briefly, fades out, repeats.
    function spawnLine() {
      if (!active) return;
      const { w, h } = sizeRef.current;

      const x1 = rand(0, w);
      const y1 = rand(0, h);
      const x2 = rand(0, w);
      const y2 = rand(0, h);
      const length = Math.hypot(x2 - x1, y2 - y1);
      if (length < 40) {
        // Too short — skip and retry
        if (active) setTimeout(spawnLine, 50);
        return;
      }

      const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      lineEl.setAttribute('x1', x1);
      lineEl.setAttribute('y1', y1);
      lineEl.setAttribute('x2', x2);
      lineEl.setAttribute('y2', y2);
      lineEl.setAttribute('stroke', '#3D5CFF');
      lineEl.setAttribute('stroke-width', '0.5');
      lineEl.setAttribute('stroke-linecap', 'round');
      lineEl.style.strokeDasharray = length;
      lineEl.style.strokeDashoffset = length;
      lineEl.style.opacity = '0.45';
      svg.appendChild(lineEl);

      const drawDuration = 1500; // draw in 1.5 seconds

      // Phase 1: draw the line (stroke-dashoffset → 0)
      const drawAnim = lineEl.animate(
        [
          { strokeDashoffset: `${length}` },
          { strokeDashoffset: '0' },
        ],
        { duration: drawDuration, easing: 'linear', fill: 'forwards' }
      );

      drawAnim.onfinish = () => {
        if (!active) { lineEl.remove(); return; }
        // Phase 2: hold, then fade out
        const holdMs = rand(1000, 2500);
        setTimeout(() => {
          if (!active) { lineEl.remove(); return; }
          const fadeAnim = lineEl.animate(
            [{ opacity: 0.45 }, { opacity: 0 }],
            { duration: 700, easing: 'ease-out', fill: 'forwards' }
          );
          fadeAnim.onfinish = () => {
            lineEl.remove();
            if (active) setTimeout(spawnLine, rand(100, 600));
          };
        }, holdMs);
      };
    }

    // ── Z Waypoints ────────────────────────────────────────────────────────
    // Fade in over 1.5 s → hold 2-3 s → fade out 0.8 s.  Max 4 visible.
    const MAX_ZBOLTS = 4;

    function spawnZbolt() {
      if (!active) return;
      if (zBolts.length >= MAX_ZBOLTS) return;

      const { w, h } = sizeRef.current;
      // Center the 24×24 logo mark at a random point
      const cx = rand(w * 0.05, w * 0.92);
      const cy = rand(h * 0.05, h * 0.88);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${cx - 12} ${cy - 12})`);
      g.style.opacity = '0';

      // 1. Rounded square background
      const rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectEl.setAttribute('x', '0');
      rectEl.setAttribute('y', '0');
      rectEl.setAttribute('width', '24');
      rectEl.setAttribute('height', '24');
      rectEl.setAttribute('rx', '4');
      rectEl.setAttribute('fill', '#3D5CFF');
      g.appendChild(rectEl);

      // 2. White Z letterform inside
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', LOGO_Z_PATH);
      pathEl.setAttribute('fill', 'none');
      pathEl.setAttribute('stroke', 'white');
      pathEl.setAttribute('stroke-width', '2');
      pathEl.setAttribute('stroke-linecap', 'round');
      pathEl.setAttribute('stroke-linejoin', 'round');
      g.appendChild(pathEl);

      svg.appendChild(g);
      zBolts.push(g);

      const targetOpacity = 0.20; // subtle but visible waypoint
      // Total cycle = 2 s: 600 ms fade-in + 800 ms hold + 600 ms fade-out
      const fadeInMs = 600;
      const holdMs = 800;
      const fadeOutMs = 600;
      const totalMs = fadeInMs + holdMs + fadeOutMs;

      const anim = g.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: targetOpacity, offset: fadeInMs / totalMs },
          { opacity: targetOpacity, offset: (fadeInMs + holdMs) / totalMs },
          { opacity: 0, offset: 1 },
        ],
        { duration: totalMs, easing: 'ease-in-out', fill: 'forwards' }
      );

      anim.onfinish = () => {
        const idx = zBolts.indexOf(g);
        if (idx !== -1) zBolts.splice(idx, 1);
        g.remove();
        if (active) setTimeout(spawnZbolt, rand(300, 1200));
      };
    }

    // ── Bootstrap animations with staggered starts ──────────────────────────
    // 5 concurrent line "streams"
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnLine, i * rand(300, 800));
    }

    // Stagger initial Z-bolt appearances
    for (let i = 0; i < MAX_ZBOLTS; i++) {
      setTimeout(spawnZbolt, i * rand(700, 1800));
    }

    return () => {
      active = false;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
