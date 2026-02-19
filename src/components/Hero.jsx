import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';

const LOOP_SKIP_SECONDS = 4;

function VideoBackground() {
    const videoRef = useRef(null);
    const hasPlayedOnce = useRef(false);

    const handleEnded = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        hasPlayedOnce.current = true;
        video.currentTime = LOOP_SKIP_SECONDS;
        video.play();
    }, []);

    return (
        <div className="video-bg">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleEnded}
            >
                <source src="/videos/huly_laser_remix.mp4" type="video/mp4" />
            </video>
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
            {/* Video Background */}
            <VideoBackground />

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
                    <a href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <FaEye /> View Resume
                    </a>
                    <a href="/docs/resume.pdf" download className="btn btn-secondary">
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
