'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  driftAngle: number;
  driftSpeed: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;

    const colors = ['rgba(0,247,255,', 'rgba(124,58,237,', 'rgba(244,114,182,'];
    const COUNT = 60;
    const SPEED_SCALE = 0.02; // 50x slower motion
    const MOUSE_REACT_SCALE = 4; // 4x stronger cursor reaction
    const particles: Particle[] = [];

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.06 * SPEED_SCALE,
        vy: (Math.random() - 0.5) * 0.06 * SPEED_SCALE,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: (Math.random() * 0.012 + 0.004) * SPEED_SCALE,
      });
    }

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      w = canvas.width;
      h = canvas.height;
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scrollY = window.scrollY;

      for (const p of particles) {
        // Very slow, random wandering drift.
        p.driftAngle += (Math.random() - 0.5) * 0.02;
        p.vx += Math.cos(p.driftAngle) * p.driftSpeed;
        p.vy += Math.sin(p.driftAngle) * p.driftSpeed;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - (mouse.current.y - scrollY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          const safeDist = Math.max(dist, 0.001);
          p.vx += (dx / safeDist) * force * 0.14 * SPEED_SCALE * MOUSE_REACT_SCALE;
          p.vy += (dy / safeDist) * force * 0.14 * SPEED_SCALE * MOUSE_REACT_SCALE;
        }

        // Damping
        p.vx *= 0.993;
        p.vy *= 0.993;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,247,255,${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}
