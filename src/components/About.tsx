'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

const BIRTHDAY   = new Date('2010-09-06T00:00:00');
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

const TAGS = ['Open Source', 'Problem Solver', 'Critical Thinker', 'Fast Learner'];

export default function About() {
  const [age, setAge] = useState('15.00');
  const avatarWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setAge(((Date.now() - BIRTHDAY.getTime()) / MS_PER_YEAR).toFixed(2));
    update();
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, []);

  /* 3D tilt on avatar */
  useEffect(() => {
    const el = avatarWrapperRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const update = () => setAge(((Date.now() - BIRTHDAY.getTime()) / MS_PER_YEAR).toFixed(2));
    update();
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="section">
      <div className="container">
        <RevealWrapper>
          <div className="section-header">
            <span className="section-tag">{'// about me'}</span>
            <h2>Who I Am</h2>
          </div>
        </RevealWrapper>

        <div className="about-grid">
          {/* Avatar column */}
          <RevealWrapper>
            <div className="about-avatar">
              <div
                className="avatar-wrapper"
                ref={avatarWrapperRef}
                style={{ transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)' }}
              >
                <div className="avatar-ring" />
                <div className="avatar-glow-pulse" />
                <Image
                  src="/img/profile.webp"
                  alt="Voximir"
                  width={160}
                  height={160}
                  className="avatar-img"
                  priority
                />
              </div>
              <div className="about-stats glass">
                <div className="stat hover-lift">
                  <span className="stat-num">{age}</span>
                  <span className="stat-label"><b>Years Old</b></span>
                </div>
                <div className="stat-divider" />
                <div className="stat hover-lift">
                  <span className="stat-num">40+</span>
                  <span className="stat-label"><b>Projects</b></span>
                </div>
              </div>
            </div>
          </RevealWrapper>

          {/* Text column */}
          <RevealWrapper delay={0.15}>
            <div className="about-text">
              <p>
                I&apos;m a student and aspiring developer based in Nakhon Si Thammarat, Thailand, who enjoys
                understanding how systems work and turning ideas into working code. What started as curiosity
                about programming quickly became something I genuinely enjoy spending time on.
              </p>
              <br className="about-br" />
              <p>
                I focus on <strong>problem-solving and programming fundamentals</strong>, often working with C++
                and experimenting with algorithms and data structures while aiming to write clean, logical, and
                efficient code.
              </p>
              <br className="about-br" />
              <p>
                Outside of coding, I spend time learning about computer architectures, figuring out how things
                work, refining my workflow, and occasionally relaxing with games and other small interests.
              </p>
              <div className="about-tags">
                {TAGS.map((t, i) => (
                  <span key={t} className="tag tag-interactive" style={{ animationDelay: `${i * 0.15}s` }}>
                    <span className="tag-dot" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
