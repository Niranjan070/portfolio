import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaEye, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { projects } from '../data/portfolioData';

function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.button
                    className="modal-close"
                    onClick={onClose}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaTimes />
                </motion.button>

                <div className="modal-body">
                    <div className="modal-image-section">
                        <img src={project.image} alt={project.title} />
                    </div>

                    <div className="modal-details">
                        <h3>{project.title}</h3>
                        <p>{project.fullDesc}</p>

                        <div>
                            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>
                                Technologies
                            </strong>
                            <div className="modal-tech-list">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="project-tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>
                                Key Features
                            </strong>
                            <ul className="modal-features">
                                {project.features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                    >
                                        {f}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-actions">
                            <a href={project.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> View Code
                            </a>
                            <a href={project.live} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <>
            <section id="projects" className="section section-alt" ref={sectionRef}>
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Featured Projects</h2>
                        <div className="section-subtitle">Showcase</div>
                    </motion.div>

                    <div className="projects-grid">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="project-card"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <motion.button
                                            className="overlay-btn"
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <FaEye />
                                        </motion.button>
                                        <motion.a
                                            href={project.github}
                                            className="overlay-btn"
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.9 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub />
                                        </motion.a>
                                    </div>
                                </div>

                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.shortDesc}</p>
                                    <div className="project-tags">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="project-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
