import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';

function Particles() {
    const particles = useMemo(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 8 + 6,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.5 + 0.2,
        })), []);

    return (
        <div className="hero-particles">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
    return (
        <section id="home" className="hero">
            {/* Background effects */}
            <div className="hero-bg">
                <div className="hero-bg-orb" />
                <div className="hero-bg-orb" />
                <div className="hero-bg-orb" />
                <div className="hero-bg-orb" />
                <div className="hero-bg-orb" />
                <div className="hero-bg-orb" />
            </div>
            <Particles />

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.p className="hero-greeting" variants={itemVariants}>
                    👋 Hello, I'm
                </motion.p>

                <motion.h1 className="hero-title" variants={itemVariants}>
                    <span className="name">Niranjan</span>
                    <span className="gradient-text">Data Scientist in the Making</span>
                </motion.h1>

                <motion.p className="hero-subtitle" variants={itemVariants}>
                    I create intelligent solutions and insights that help businesses
                    make data-driven decisions.
                </motion.p>

                <motion.div className="hero-buttons" variants={itemVariants}>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <FaEye /> View Resume
                    </a>
                    <a href="/resume.pdf" download className="btn btn-secondary">
                        <FaDownload /> Download Resume
                    </a>
                </motion.div>

                <motion.div className="hero-socials" variants={itemVariants}>
                    <span className="social-label">Follow Me</span>
                    {socialLinks.slice(0, 3).map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.href}
                            className="social-icon"
                            aria-label={s.label}
                            whileHover={{ scale: 1.2, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <s.icon />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span>Scroll</span>
                <div className="scroll-mouse">
                    <div className="scroll-dot" />
                </div>
            </motion.div>
        </section>
    );
}
