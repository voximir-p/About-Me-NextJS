'use client';
import { useEffect, useRef, useState } from 'react';

export default function MouseGlow() {
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateEnabled = () => {
      const touchCapable = media.matches || navigator.maxTouchPoints > 0;
      setEnabled(!touchCapable);
    };

    updateEnabled();
    media.addEventListener('change', updateEnabled);
    return () => media.removeEventListener('change', updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      const trail = trailRef.current;
      if (trail) {
        trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
        trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
        trail.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={trailRef} className="mouse-trail" />
    </>
  );
}
