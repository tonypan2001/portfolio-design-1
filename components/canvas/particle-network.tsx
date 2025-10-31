import { useEffect, useRef } from "react";
import { Particle } from "@/types/particle-network";

export default function ParticleNetwork({
  count = 80,
  linkDistance = 140,
  maxSpeed = 0.6,
  dotSize = 2,
}: {
  count?: number;
  linkDistance?: number;
  maxSpeed?: number;
  dotSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    // Measure the size of the parent (hero section) so the canvas
    // always matches the visible section bounds across displays/DPIs.
    const measureAndResize = () => {
      const parent = canvas.parentElement as HTMLElement | null;
      const rect = parent?.getBoundingClientRect();
      const w = Math.ceil(rect?.width ?? window.innerWidth);
      const h = Math.ceil(rect?.height ?? window.innerHeight);
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };
    const { w: initW, h: initH } = measureAndResize();
    window.addEventListener("resize", measureAndResize);

    // init particles
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: rand(0, initW),
      y: rand(0, initH),
      vx: rand(-maxSpeed, maxSpeed),
      vy: rand(-maxSpeed, maxSpeed),
    }));

    const step = () => {
      // Use canvas CSS size for logical drawing bounds
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const pts = particlesRef.current;

      // move + draw dots
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // bounce on edges
        if (p.x <= 0 || p.x >= w) p.vx *= -1;
        if (p.y <= 0 || p.y >= h) p.vy *= -1;

        // mild mouse interaction (attraction)
        if (mouseRef.current) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 160 * 160) {
            p.vx += (dx / Math.sqrt(dist2 + 1)) * 0.005;
            p.vy += (dy / Math.sqrt(dist2 + 1)) * 0.005;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = 1 - dist / linkDistance;
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => (mouseRef.current = null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    step();

    return () => {
      window.removeEventListener("resize", measureAndResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, linkDistance, maxSpeed, dotSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-0 bg-primary pointer-events-none"
    />
  );
}
