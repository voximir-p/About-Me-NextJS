'use client';
import { useRef } from 'react';
import RevealWrapper from './RevealWrapper';

interface Project {
  tag: string;
  title: string;
  desc: string;
  stack: string[];
  href: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    tag: 'Featured', featured: true,
    title: 'totp',
    desc: 'A CLI software written in Rust. It aims to provide the user with fast and easy way to manage their TOTP accounts.',
    stack: ['Rust', 'TOTP', 'CLI', 'Security'],
    href: 'https://github.com/voximir-p/totp',
  },
  {
    tag: 'Open Source',
    title: 'aria2c-gui',
    desc: 'A Gradio web application that helps a new aria2c user by being able to use it as a GUI.',
    stack: ['Python', 'Gradio', 'Web App'],
    href: 'https://github.com/voximir-p/aria2c-gui',
  },
  {
    tag: 'Library',
    title: 'aeif-lib',
    desc: 'A Python library that provides functionality for encrypting and decrypting image files using the AES encryption algorithm.',
    stack: ['Python', 'AES', 'Cryptography'],
    href: 'https://github.com/voximir-p/aeif-lib',
  },
  {
    tag: 'Socket',
    title: 'tcp-lan-chat-room',
    desc: 'A simple server and client chat room. It uses the TCP protocol and the socket library.',
    stack: ['Python', 'TCP', 'Socket'],
    href: 'https://github.com/voximir-p/tcp-lan-chat-room',
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
          <a href={project.href} target="_blank" rel="noopener" title="GitHub">↗</a>
        </div>
      </div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="project-stack">
        {project.stack.map(s => <span key={s}>{s}</span>)}
      </div>
    </article>
  );
}

export default function Projects() {
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
            <RevealWrapper key={p.title} delay={i * 0.1}>
              <ProjectCard project={p} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
