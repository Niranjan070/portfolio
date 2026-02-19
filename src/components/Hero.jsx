import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { socialLinks } from '../data/portfolioData';

export default function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollRef = useRef(null);
    const sideMenuRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [animated, setAnimated] = useState(false);

    // GSAP entrance animations
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const tl = gsap.timeline({
                onStart: () => setAnimated(true),
            });

            // Side menu slides in
            if (sideMenuRef.current) {
                tl.fromTo(sideMenuRef.current,
                    { x: -100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                );
            }

            // Title characters fly up
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll('.title-char');
                if (chars.length > 0) {
                    tl.fromTo(chars,
                        { y: 200, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.5, stagger: 0.05, ease: 'power4.out' },
                        '-=0.5'
                    );
                }
            }

            // Subtitle lines
            if (subtitleRef.current) {
                const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
                if (lines.length > 0) {
                    tl.fromTo(lines,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
                        '-=0.8'
                    );
                }
            }

            // Scroll indicator
            if (scrollRef.current) {
                tl.fromTo(scrollRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                    '-=0.5'
                );
            }

            return () => tl.kill();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Scroll progress tracking
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="title-char" style={{ opacity: animated ? 1 : 0 }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));

    return (
        <section id="home" className="hero">
            {/* Side menu */}
            <div ref={sideMenuRef} className="hero-side-menu" style={{ opacity: 0 }}>
                <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="hero-vertical-text">SPACE</div>
            </div>

            {/* Main content */}
            <div className="hero-content">
                <h1 ref={titleRef} className="hero-title">
                    {splitText('NIRANJAN')}
                </h1>

                <div ref={subtitleRef} className="hero-subtitle-wrap">
                    <p className="hero-subtitle subtitle-line" style={{ opacity: animated ? 1 : 0 }}>
                        Data Scientist in the Making
                    </p>
                    <p className="hero-subtitle subtitle-line" style={{ opacity: animated ? 1 : 0 }}>
                        Creating intelligent solutions &amp; insights
                    </p>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <div ref={scrollRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
                <span className="scroll-label">SCROLL</span>
                <div className="scroll-track">
                    <div
                        className="scroll-fill"
                        style={{ width: `${scrollProgress * 100}%` }}
                    />
                </div>
                <span className="scroll-counter">
                    {String(Math.min(Math.floor(scrollProgress * 6), 5)).padStart(2, '0')} / 05
                </span>
            </div>

            {/* Social links */}
            <div className="hero-socials">
                <span className="social-label">Follow Me</span>
                {socialLinks.slice(0, 3).map((s, i) => (
                    <a
                        key={i}
                        href={s.href}
                        className="social-icon"
                        aria-label={s.label}
                    >
                        <s.icon />
                    </a>
                ))}
            </div>
        </section>
    );
}
