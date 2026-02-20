import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaEye, FaDownload } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';

const RESUME_PATH = '/docs/resume 1.2.pdf';

/* ── Liquid glass button ── */
function GlassButton({ href, download, target, rel, id, icon: Icon, children }) {
    return (
        <a
            href={href}
            download={download}
            target={target}
            rel={rel}
            id={id}
            className="glass-btn"
        >
            {/* Layer 1 – distortion backdrop */}
            <span className="glass-layer glass-blur" />
            {/* Layer 2 – white tint */}
            <span className="glass-layer glass-tint" />
            {/* Layer 3 – rim / inset shadow */}
            <span className="glass-layer glass-rim" />
            {/* Content on top */}
            <span className="glass-btn-content">
                <Icon /> {children}
            </span>
        </a>
    );
}

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollRef = useRef(null);
    const sideMenuRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // GSAP entrance — clean and minimal
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Title chars fly up
            tl.to('.title-char', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.04,
                ease: 'power4.out',
            });

            // Subtitle fades in
            tl.to('.subtitle-line', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            }, '-=0.6');

            // Resume buttons fade in
            tl.to('.hero-buttons', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.4');

            // Side menu slides in
            tl.to('.hero-side-menu', {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.6');

            // Scroll indicator
            tl.to('.hero-scroll-indicator', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.4');

            // Socials
            tl.to('.hero-socials', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.6');
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const title = 'NIRANJAN';

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Liquid glass SVG filter (rendered once, invisible) */}


            {/* Side menu — starts hidden */}
            <div className="hero-side-menu">
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
                    {title.split('').map((char, i) => (
                        <span key={i} className="title-char">
                            {char}
                        </span>
                    ))}
                </h1>

                <div ref={subtitleRef} className="hero-subtitle-wrap">
                    <p className="hero-subtitle subtitle-line">
                        Data Scientist in the Making
                    </p>
                    <p className="hero-subtitle subtitle-line">
                        Creating intelligent solutions &amp; insights
                    </p>
                </div>

                {/* Liquid Glass Resume Buttons */}
                <div className="hero-buttons">
                    <GlassButton
                        href={RESUME_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="view-resume-btn"
                        icon={FaEye}
                    >
                        View Resume
                    </GlassButton>

                    <GlassButton
                        href={RESUME_PATH}
                        download="Niranjan_Resume.pdf"
                        id="download-resume-btn"
                        icon={FaDownload}
                    >
                        Download Resume
                    </GlassButton>
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef} className="hero-scroll-indicator">
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

            {/* Socials */}
            <div className="hero-socials">
                <span className="social-label">Follow Me</span>
                {socialLinks.slice(0, 3).map((s, i) => (
                    <a key={i} href={s.href} className="social-icon" aria-label={s.label}>
                        <s.icon />
                    </a>
                ))}
            </div>
        </section>
    );
}
