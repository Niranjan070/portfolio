import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skills, skillCategories } from '../data/portfolioData';

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState('all');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const filteredSkills = activeFilter === 'all'
        ? skills
        : skills.filter((s) => s.category === activeFilter);

    return (
        <section id="skills" className="section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Technical Skills</h2>
                    <div className="section-subtitle">What I do</div>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className="skills-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {skillCategories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            className={`skill-tab ${activeFilter === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            layout
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div className="skills-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill) => (
                            <motion.div
                                key={skill.id}
                                className="skill-card"
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -6, boxShadow: '0 0 40px rgba(0, 212, 255, 0.18)' }}
                            >
                                <div className="skill-card-icon">
                                    <skill.icon />
                                </div>
                                <h3>{skill.title}</h3>
                                <div className="skill-pills">
                                    {skill.pills.map((pill, i) => (
                                        <motion.span
                                            key={pill}
                                            className="skill-pill"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                        >
                                            {pill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
