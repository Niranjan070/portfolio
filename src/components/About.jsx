import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/portfolioData';

function AnimatedCounter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── 3D Frosted Photo Card ── */
function FrostedPhoto({ src, alt }) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateY = (x / width - 0.5) * 30;
        const rotateX = -(y / height - 0.5) * 30;
        setRotate({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotate({ x: 0, y: 0 });
    }, []);

    return (
        <div
            className="frosted-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="frosted-card-inner"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`,
                }}
            >
                <img src={src} alt={alt} className="frosted-card-img" />
                <div className="frosted-card-overlay" />
                <div className="frosted-card-shine" />
            </div>
        </div>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section section-alt" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">About Me</h2>
                    <div className="section-subtitle">Who I am</div>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.15 } },
                        }}
                        initial="hidden"
                        animate={isInView ? 'show' : 'hidden'}
                    >
                        <motion.p variants={fadeUp}>
                            I'm an AI &amp; Data Science undergraduate at Karunya Institute of Technology
                            and Sciences, engineering production-grade AI systems, multi-agent architectures,
                            and deep learning pipelines across NLP, Computer Vision, and autonomous agent workflows.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            From building local 4-bit quantized multi-agent platforms (AIRA) and token-efficient
                            EDA agents (Intel Unnati Challenge 2) to edge YOLO microscopic spore diagnostics (SporeNet)
                            and delivering production data pipelines as a Data Science Intern at Edify Techno Solutions,
                            I focus on engineering AI that drives decisions and operates reliably in production.
                        </motion.p>

                        <motion.div className="stats-grid" variants={fadeUp}>
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="stat-card"
                                    whileHover={{ y: -4, boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
                                >
                                    <span className="stat-number">
                                        <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                                    </span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="about-image-wrap"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <FrostedPhoto src="/images/profile 2.jpeg" alt="Niranjan" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
