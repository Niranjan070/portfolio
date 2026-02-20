import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/portfolioData';

/* ── Pool of badge titles (randomly picked on each load) ── */
const BADGE_POOL = [
    { emoji: '🎓', text: 'Data Science' },
    { emoji: '🚀', text: 'ML Enthusiast' },
    { emoji: '📊', text: 'Data Analysis' },
    { emoji: '🤖', text: 'AI Engineer' },
    { emoji: '🧠', text: 'Deep Learning' },
    { emoji: '📈', text: 'Data Visualization' },
    { emoji: '💡', text: 'Problem Solver' },
    { emoji: '⚡', text: 'Python Developer' },
    { emoji: '🔬', text: 'NLP Explorer' },
    { emoji: '🛠️', text: 'Model Builder' },
];

function pickRandomPair() {
    const shuffled = [...BADGE_POOL].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
}

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

/* ── Liquid Glass Badge ── */
function GlassBadge({ emoji, text }) {
    return (
        <div className="glass-badge">
            <span className="glass-layer glass-blur" />
            <span className="glass-layer glass-tint" />
            <span className="glass-layer glass-rim" />
            <span className="glass-badge-content">
                <span className="badge-icon">{emoji}</span>
                <span>{text}</span>
            </span>
        </div>
    );
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

    // Pick two random badges on mount
    const [badgeTop, badgeBottom] = useMemo(() => pickRandomPair(), []);

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
                            I'm a passionate data science enthusiast with a strong foundation in
                            mathematics, statistics, and programming. Currently pursuing advanced
                            skills in machine learning, deep learning, and data visualization.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            My journey involves transforming complex data into actionable insights
                            and building predictive models that solve real-world problems. I believe
                            in the power of data to drive innovation and create meaningful impact.
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
                        <FrostedPhoto src="\images\profile 2.jpeg" alt="Niranjan" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
