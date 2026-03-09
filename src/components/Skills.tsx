"use client";
import { useRef, useState } from "react";
import RevealWrapper from "./RevealWrapper";

const SKILLS = [
  { lang: "Python", icon: "devicon-python-plain" },
  { lang: "C", icon: "devicon-c-plain" },
  { lang: "C++", icon: "devicon-cplusplus-plain" },
  { lang: "Rust", icon: "devicon-rust-plain" },
  { lang: "JavaScript", icon: "devicon-javascript-plain" },
  { lang: "Blender", icon: "devicon-blender-original" },
];

export default function Skills() {
  const [highlight, setHighlight] = useState<string | null>(null);
  const isTouchRef = useRef(false);

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <RevealWrapper>
          <div className="section-header">
            <span className="section-tag">{"// skills"}</span>
            <h2>
              I Work With{" "}
              <span className="skills-swap">
                <span
                  id="skills-default-text"
                  className={highlight ? 'hidden' : ''}
                >
                  ...
                </span>
                <span
                  id="skills-highlight"
                  className={highlight ? 'visible' : ''}
                >
                  {highlight}
                </span>
              </span>
            </h2>
          </div>
        </RevealWrapper>

        <div className="skills-layout">
          <RevealWrapper>
            <div className="skills-desc">
              <p>
                I work across multiple languages and paradigms, from low-level
                systems programming to high-level scripting. My focus is always
                on writing{" "}
                <strong>clean, efficient, and maintainable code</strong>{" "}
                regardless of the stack. I also have some skills in other
                software, not just programming.
              </p>
            </div>
          </RevealWrapper>

          <RevealWrapper>
            <div className="skills-icons">
              {SKILLS.map((skill, i) => (
                <div
                  key={skill.lang}
                  className="skill-icon-item"
                  data-lang={skill.lang}
                  role="img"
                  aria-label={skill.lang}
                  style={{ animationDelay: `${i * 0.12}s` }}
                  onPointerMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    el.style.setProperty('--sx', `${x}px`);
                    el.style.setProperty('--sy', `${y}px`);
                  }}
                  onPointerEnter={() => {
                    if (!isTouchRef.current) setHighlight(skill.lang);
                  }}
                  onPointerLeave={() => {
                    if (!isTouchRef.current) setHighlight(null);
                  }}
                  onTouchStart={() => {
                    isTouchRef.current = true;
                  }}
                  onClick={() => {
                    if (!isTouchRef.current) return;
                    setHighlight((h) => (h === skill.lang ? null : skill.lang));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setHighlight((h) => (h === skill.lang ? null : skill.lang));
                    }
                  }}
                >
                  <span className="skill-icon-glow" />
                  <i className={skill.icon} />
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
