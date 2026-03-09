'use client';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

export default function Footer() {
  return (
    <footer>
      <RevealWrapper>
        <div className="footer-content">
          <div className="footer-line" />
          <p>
            Made with <span className="footer-heart"><Image src="/svg/heart.svg" alt="" aria-hidden="true" width={14} height={14} className="footer-heart-icon" /></span> by{' '}
            <strong><span className="gradient-text footer-name">Voximir</span></strong> · 2026
          </p>
        </div>
      </RevealWrapper>
    </footer>
  );
}
