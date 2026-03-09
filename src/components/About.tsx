'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

const BIRTHDAY   = new Date('2010-09-06T00:00:00');
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

const TAGS = ['Open Source', 'Problem Solver', 'Critical Thinker'];

export default function About() {
  const [age, setAge] = useState('15.00');

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
              <div className="avatar-wrapper">
                <div className="avatar-ring" />
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
                <div className="stat">
                  <span className="stat-num">{age}</span>
                  <span className="stat-label">Years Old</span>
                </div>
                <div className="stat">
                  <span className="stat-num">40+</span>
                  <span className="stat-label">Projects</span>
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
              <br />
              <p>
                I focus on <strong>problem-solving and programming fundamentals</strong>, often working with C++
                and experimenting with algorithms and data structures while aiming to write clean, logical, and
                efficient code.
              </p>
              <br />
              <p>
                Outside of coding, I spend time learning about computer architectures, figuring out how things
                work, refining my workflow, and occasionally relaxing with games and other small interests.
              </p>
              <div className="about-tags">
                {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
