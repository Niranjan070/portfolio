import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { socialLinks } from '../data/portfolioData';

export default function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollRef = useRef(null);
    const sideMenuRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // GSAP entrance animations (matching 21st.dev Horizon)
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Set initially hidden
        gsap.set([sideMenuRef.current, titleRef.current, subtitleRef.current, scrollRef.current], {
            visibility: 'visible',
        });

        // Side menu slides in
        if (sideMenuRef.current) {
            tl.from(sideMenuRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        }

        // Title characters fly up
        if (titleRef.current) {
            const chars = titleRef.current.querySelectorAll('.title-char');
            tl.from(chars, {
                y: 200,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: 'power4.out',
            }, '-=0.5');
        }

        // Subtitle lines
        if (subtitleRef.current) {
            const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
            tl.from(lines, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            }, '-=0.8');
        }

        // Scroll indicator
        if (scrollRef.current) {
            tl.from(scrollRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power2.out',
            }, '-=0.5');
        }

        return () => tl.kill();
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
            <span key={i} className="title-char">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));

    return (
        <section id="home" className="hero">
            {/* Side menu */}
            <div ref={sideMenuRef} className="hero-side-menu" style={{ visibility: 'hidden' }}>
                <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="hero-vertical-text">SPACE</div>
            </div>

            {/* Main content — no glass card, raw text on scene */}
            <div className="hero-content">
                <h1 ref={titleRef} className="hero-title" style={{ visibility: 'hidden' }}>
                    {splitText('NIRANJAN')}
                </h1>

                <div ref={subtitleRef} className="hero-subtitle-wrap" style={{ visibility: 'hidden' }}>
                    <p className="hero-subtitle subtitle-line">
                        Data Scientist in the Making
                    </p>
                    <p className="hero-subtitle subtitle-line">
                        Creating intelligent solutions &amp; insights
                    </p>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <div ref={scrollRef} className="hero-scroll-indicator" style={{ visibility: 'hidden' }}>
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

            {/* Social links at bottom */}
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
