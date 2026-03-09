"use client";
import { useEffect, useRef, useState } from "react";
import { PowerGlitch } from "powerglitch";
import MagneticButton from "./MagneticButton";

const TYPED_STRINGS = [
  "open-source tools.",
  "clean UIs.",
  "engaging websites.",
  "CLI tools.",
  "fun projects.",
];
const TYPE_DELAY = 80;
const DELETE_DELAY = 40;
const PAUSE_AFTER = 1800;
const PAUSE_BEFORE = 400;

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [scrollOpacity, setOpacity] = useState(1);
  const stringIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const heroRef = useRef<HTMLElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  /* PowerGlitch on name */
  useEffect(() => {
    if (!glitchRef.current) return;
    const { stopGlitch } = PowerGlitch.glitch(glitchRef.current, {
      playMode: "hover",
      createContainers: true,
      hideOverflow: false,
      timing: { duration: 600, iterations: 1, easing: "ease-in-out" },
      glitchTimeSpan: { start: 0, end: 1 },
      shake: { velocity: 15, amplitudeX: 0.05, amplitudeY: 0.05 },
      slice: {
        count: 6,
        velocity: 10,
        minHeight: 0.01,
        maxHeight: 0.05,
        hueRotate: true,
      },
    });
    return () => stopGlitch();
  }, []);

  /* Typed effect */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPED_STRINGS[stringIndex.current];
      if (!isDeleting.current) {
        charIndex.current++;
        setTyped(current.slice(0, charIndex.current));
        if (charIndex.current === current.length) {
          isDeleting.current = true;
          timeout = setTimeout(tick, PAUSE_AFTER);
          return;
        }
        timeout = setTimeout(tick, TYPE_DELAY);
      } else {
        charIndex.current--;
        setTyped(current.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          isDeleting.current = false;
          stringIndex.current =
            (stringIndex.current + 1) % TYPED_STRINGS.length;
          timeout = setTimeout(tick, PAUSE_BEFORE);
          return;
        }
        timeout = setTimeout(tick, DELETE_DELAY);
      }
    };

    timeout = setTimeout(tick, PAUSE_BEFORE);
    return () => clearTimeout(timeout);
  }, []);

  /* Scroll indicator fade */
  useEffect(() => {
    const onScroll = () => {
      const heroHeight =
        document.getElementById("hero")?.offsetHeight ?? window.innerHeight;
      const fadeStart = heroHeight * 0.2;
      const fadeEnd = heroHeight * 0.4;
      const s = window.scrollY;
      if (s <= fadeStart) setOpacity(1);
      else if (s >= fadeEnd) setOpacity(0);
      else setOpacity(1 - (s - fadeStart) / (fadeEnd - fadeStart));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Parallax mouse tracking for orbs */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
      const orb1 = hero.querySelector(".orb-1") as HTMLElement | null;
      const orb2 = hero.querySelector(".orb-2") as HTMLElement | null;
      const ring1 = hero.querySelector(".ring-1") as HTMLElement | null;
      const ring2 = hero.querySelector(".ring-2") as HTMLElement | null;
      if (orb1)
        orb1.style.translate = `${mouse.current.x * 40}px ${mouse.current.y * 40}px`;
      if (orb2)
        orb2.style.translate = `${mouse.current.x * -30}px ${mouse.current.y * -30}px`;
      if (ring1)
        ring1.style.translate = `${mouse.current.x * 15}px ${mouse.current.y * 15}px`;
      if (ring2)
        ring2.style.translate = `${mouse.current.x * -10}px ${mouse.current.y * -10}px`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="hero-grid-lines" />
      </div>

      <div className="hero-content">
        <p className="hero-label">
          <span className="hero-label-line" />
          Welcome
          <span className="hero-label-line" />
        </p>
        <h1 className="hero-title">
          I&apos;m{" "}
          <span ref={glitchRef} className="gradient-text hero-name-glitch">
            Voximir
          </span>
        </h1>
        <p className="hero-subtitle">
          I build <span className="typed-text">{typed}</span>
          <span className="cursor">|</span>
        </p>
        <p className="hero-desc">Check out some of my works.</p>
        <div className="hero-actions">
          <MagneticButton
            href="#projects"
            className="btn btn-primary btn-shimmer"
            onClick={(e) => {
              e.preventDefault();
              const btn = (e.currentTarget as HTMLElement);
              btn.classList.remove('btn-clicked');
              void btn.offsetWidth;
              btn.classList.add('btn-clicked');
              btn.addEventListener('animationend', () => {
                btn.classList.remove('btn-clicked');
              }, { once: true });
              setTimeout(() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
          >
            <span className="btn-text">View My Work</span>
            <span className="btn-glow" />
            <span className="btn-ripple" />
          </MagneticButton>
        </div>
      </div>

      <div className="scroll-indicator" style={{ opacity: scrollOpacity }}>
        <div className="scroll-dot" />
        <div className="scroll-pulse" />
      </div>
    </section>
  );
}
