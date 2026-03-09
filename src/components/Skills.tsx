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
              <span
                id="skills-default-text"
                style={{
                  opacity: highlight ? 0 : 1,
                  maxWidth: highlight ? "0" : "300px",
                }}
              >
                ...
              </span>
              <span
                id="skills-highlight"
                style={{
                  opacity: highlight ? 1 : 0,
                  maxWidth: highlight ? "300px" : "0",
                }}
              >
                {highlight}
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
              {SKILLS.map((skill) => (
                <div
                  key={skill.lang}
                  className="skill-icon-item"
                  data-lang={skill.lang}
                  role="img"
                  aria-label={skill.lang}
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
