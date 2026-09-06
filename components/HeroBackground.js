'use client';
import { useEffect, useRef } from 'react';

// Z-bolt lightning shape (from the letter Z): two horizontal bars + diagonal
// Approximate bounding box: x 2-14, y 2-18 → center ~(8, 10)
const ZBOLT_PATH = 'M 8 2 L 2 10 L 6 10 L 2 18 L 14 8 L 10 8 Z';

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

    const svg = svgRef.current;
    if (!svg) return;

    let active = true;
    const zBolts = []; // track live z-bolt elements

    // ── Track SVG size via ResizeObserver ──────────────────────────────────
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        sizeRef.current = {
          w: entry.contentRect.width,
          h: entry.contentRect.height,
        };
      }
    });
    ro.observe(svg);

    // Seed initial size from bounding rect
    const initialRect = svg.getBoundingClientRect();
    if (initialRect.width > 0) {
      sizeRef.current = { w: initialRect.width, h: initialRect.height };
    }

    // ── Route Lines ────────────────────────────────────────────────────────
    // Each line: draws itself over 3-5 s, holds briefly, fades out, repeats.
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
      lineEl.style.opacity = '0.15';
      svg.appendChild(lineEl);

      const drawDuration = rand(3000, 5000);

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
            [{ opacity: 0.15 }, { opacity: 0 }],
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
    // Fade in over 1.5 s → hold 2-3 s → fade out 0.8 s.  Max 3-5 visible.
    const MAX_ZBOLTS = 4;

    function spawnZbolt() {
      if (!active) return;
      if (zBolts.length >= MAX_ZBOLTS) return;

      const { w, h } = sizeRef.current;
      const scale = rand(1.4, 2.6); // icon roughly 17-32 px across
      // Center the icon at a random point (icon center is at path coord (8,10))
      const cx = rand(w * 0.05, w * 0.92);
      const cy = rand(h * 0.05, h * 0.88);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute(
        'transform',
        `translate(${cx - 8 * scale} ${cy - 10 * scale}) scale(${scale})`
      );
      g.style.opacity = '0';

      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', ZBOLT_PATH);
      pathEl.setAttribute('fill', '#3D5CFF');
      g.appendChild(pathEl);
      svg.appendChild(g);
      zBolts.push(g);

      const targetOpacity = rand(0.08, 0.10);
      const holdMs = rand(2000, 3000);
      const fadeInMs = 1500;
      const fadeOutMs = 800;
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
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Animated SVG layer */}
      <svg
        ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Radial gradient: reveals center, fades to --color-bg at edges so
          the canvas doesn't bleed into the next section */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, var(--color-bg) 72%)',
        }}
      />
    </div>
  );
}
