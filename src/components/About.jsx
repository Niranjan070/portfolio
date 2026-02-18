import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/portfolioData';

function AnimatedCounter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
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
                        <motion.div
                            className="about-image-container"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <img src="/profile.jpeg" alt="Niranjan" />
                        </motion.div>

                        <motion.div
                            className="about-float-badge top"
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <span className="badge-icon">🎓</span>
                            <span>Data Science</span>
                        </motion.div>

                        <motion.div
                            className="about-float-badge bottom"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <span className="badge-icon">🚀</span>
                            <span>ML Enthusiast</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
