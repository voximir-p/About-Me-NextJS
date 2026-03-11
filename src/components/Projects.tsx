'use client';
import { useRef } from 'react';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

interface Project {
  tag: string;
  title: string;
  desc: string;
  stack: string[];
  href: string;
  featured?: boolean;
}

const GITHUB_PROFILE_URL = 'https://www.github.com/voximir-p';

const PROJECTS: Project[] = [
  {
    tag: 'Featured', featured: true,
    title: 'totp',
    desc: 'A CLI software written in Rust. It aims to provide the user with fast and easy way to manage their TOTP accounts.',
    stack: ['Rust', 'TOTP', 'CLI', 'Security'],
    href: `${GITHUB_PROFILE_URL}/totp`,
  },
  {
    tag: 'Featured', featured: true,
    title: 'cppu',
    desc: 'A C++ utility tool for competitive programming written in Rust. It can compile your code, use an input from a file and can output to another file.',
    stack: ['C++', 'Rust', 'Competitive Programming'],
    href: `${GITHUB_PROFILE_URL}/cppu`,
  },
  {
    tag: 'CLI Tool', featured: true,
    title: 'VVD',
    desc: 'A simple command-line tool written in Python that allows you to download videos from multiple websites.',
    stack: ['Python', 'CLI', 'Video Downloader'],
    href: `${GITHUB_PROFILE_URL}/VVD/`,
  },
  {
    tag: 'Open Source',
    title: 'aria2c-gui',
    desc: 'A Gradio web application that helps a new aria2c user by being able to use it as a GUI.',
    stack: ['Python', 'Gradio', 'Web App'],
    href: `${GITHUB_PROFILE_URL}/aria2c-gui`,
  },
  {
    tag: 'Library',
    title: 'aeif-lib',
    desc: 'A Python library that provides functionality for encrypting and decrypting image files using the AES encryption algorithm.',
    stack: ['Python', 'AES', 'Cryptography'],
    href: `${GITHUB_PROFILE_URL}/aeif-lib`,
  },
  {
    tag: 'Socket',
    title: 'tcp-lan-chat-room',
    desc: 'A simple server and client chat room. It uses the TCP protocol and the socket library.',
    stack: ['Python', 'TCP', 'Socket'],
    href: `${GITHUB_PROFILE_URL}/tcp-lan-chat-room`,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx   = ((e.clientX - rect.left) / rect.width)  * 100;
    const my   = ((e.clientY - rect.top)  / rect.height) * 100;
    const rotX = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
    const rotY = ((e.clientX - rect.left) / rect.width  - 0.5) *  6;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <article
      ref={cardRef}
      className={`project-card glass${project.featured ? ' featured' : ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-meta">
        <span className="project-tag">{project.tag}</span>
        <div className="project-links">
          <a
            href={project.href}
            target="_blank"
            rel="noopener"
            title="GitHub"
            aria-label={`Open ${project.title} on GitHub`}
            className="project-link-arrow"
          >
            <Image src="/svg/arrow.svg" alt="" aria-hidden="true" width={14} height={14} className="project-link-arrow-icon" />
          </a>
        </div>
      </div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="project-stack">
        {project.stack.map(s => <span key={s} className="stack-chip">{s}</span>)}
      </div>
    </article>
  );
}

export default function Projects() {
  const featuredCount = PROJECTS.filter((p) => p.featured).length;
  const shouldSpanFirstFeatured = featuredCount % 2 === 1;
  const firstFeaturedIndex = PROJECTS.findIndex((p) => p.featured);

  return (
    <section id="projects" className="section">
      <div className="container">
        <RevealWrapper>
          <div className="section-header">
            <span className="section-tag">{'// projects'}</span>
            <h2>Things I&apos;ve Built</h2>
          </div>
        </RevealWrapper>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <RevealWrapper
              key={p.title}
              delay={i * 0.1}
              className={
                shouldSpanFirstFeatured && i === firstFeaturedIndex
                  ? 'featured-project-item'
                  : ''
              }
            >
              <ProjectCard project={p} />
            </RevealWrapper>
          ))}

          <RevealWrapper
            key="more-projects"
            delay={PROJECTS.length * 0.1}
            className="more-projects-item"
          >
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card glass more-projects-card"
              aria-label="View more projects on GitHub"
            >
              <span className="more-projects-title">Looking for more projects?</span>
              <span className="more-projects-subtitle">Open my GitHub profile</span>
            </a>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
