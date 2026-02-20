import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaEye, FaDownload } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';

const RESUME_PATH = '/docs/resume 1.2.pdf';

/* ── SVG filter for liquid glass distortion ── */
function GlassFilter() {
    return (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter
                id="glass-distortion"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                filterUnits="objectBoundingBox"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.001 0.005"
                    numOctaves="1"
                    seed="17"
                    result="turbulence"
                />
                <feComponentTransfer in="turbulence" result="mapped">
                    <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                    <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                    <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                </feComponentTransfer>
                <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
                <feSpecularLighting
                    in="softMap"
                    surfaceScale="5"
                    specularConstant="1"
                    specularExponent="100"
                    lightingColor="white"
                    result="specLight"
                >
                    <fePointLight x="-200" y="-200" z="300" />
                </feSpecularLighting>
                <feComposite
                    in="specLight"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0"
                    result="litImage"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="softMap"
                    scale="200"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
        </svg>
    );
}

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
            <GlassFilter />

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
