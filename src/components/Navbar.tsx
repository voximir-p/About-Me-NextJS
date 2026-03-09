'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

const SOCIALS = [
  { href: 'https://github.com/voximir-p/',                          title: 'GitHub',    img: '/svg/github.svg'    },
  { href: 'https://discord.com/users/711114008954142752',           title: 'Discord',   img: '/svg/discord.svg'   },
  { href: 'https://web.facebook.com/pek.n.thach/',                  title: 'Facebook',  img: '/svg/facebook.svg'  },
  { href: 'https://www.instagram.com/voximir/',                     title: 'Instagram', img: '/svg/instagram.svg' },
  { href: 'mailto:pek795b@gmail.com',                               title: 'E-Mail',    img: '/svg/email.svg'     },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive]       = useState('');
  const dropdownRef               = useRef<HTMLDivElement>(null);
  const linksRef                  = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let current = '';
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function updateUnderline() {
      if (!linksRef.current) return;
      const activeEl = linksRef.current.querySelector(`a[href="#${active || 'hero'}"]`) as HTMLElement | null;
      if (activeEl) {
        const ul = linksRef.current.getBoundingClientRect();
        const a = activeEl.getBoundingClientRect();
        setUnderline({ left: a.left - ul.left, width: a.width });
      }
    }

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [active]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-locked', mobileNav);
    return () => { document.body.classList.remove('nav-locked'); };
  }, [mobileNav]);

  const smoothScroll = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNav(false);
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      {/* Hamburger / Contact Me */}
      <div className="nav-menu" ref={dropdownRef}>
        <button
          type="button"
          className={`nav-contact${open ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
          aria-label="Menu"Hee tung tung
        >
          <span className="nav-contact-text">Contact Me</span>
          <span className="nav-contact-ripple" />
        </button>
        <div className={`nav-dropdown${open ? ' open' : ''}`}>
          {SOCIALS.map((s, i) => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener" title={s.title} style={{ animationDelay: `${i * 0.05}s` }}>
              <Image src={s.img} alt={s.title} width={22} height={22} />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileNav && (
        <button
          type="button"
          className="nav-overlay visible"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Nav links */}
      <ul ref={linksRef} className={`nav-links${mobileNav ? ' mobile-open' : ''}`}>
        {NAV_LINKS.map(link => {
          const id = link.href.replace('#', '');
          const isActive = active === id || (active === '' && id === 'hero');
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={e => { e.preventDefault(); smoothScroll(link.href); }}
              >
                {link.label}
              </a>
            </li>
          );
        })}
        <span
          className="nav-underline"
          style={{ left: underline.left, width: underline.width }}
        />
      </ul>

      {/* Mobile nav toggle */}
      <button
        type="button"
        className={`nav-toggle${mobileNav ? ' open' : ''}`}
        onClick={() => setMobileNav(o => !o)}
        aria-label="Toggle navigation"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
