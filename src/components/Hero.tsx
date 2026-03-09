"use client";
import { useEffect, useRef, useState } from "react";

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

  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="ring ring-1" />
        <div className="ring ring-2" />
      </div>

      <div className="hero-content">
        <p className="hero-label">- Welcome -</p>
        <h1 className="hero-title">
          I&apos;m <span className="gradient-text">Voximir</span>
        </h1>
        <p className="hero-subtitle">
          I build <span className="typed-text">{typed}</span>
          <span className="cursor">|</span>
        </p>
        <p className="hero-desc">Check out some of my works.</p>
        <div className="hero-actions">
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work
          </a>
        </div>
      </div>

      <div className="scroll-indicator" style={{ opacity: scrollOpacity }}>
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
