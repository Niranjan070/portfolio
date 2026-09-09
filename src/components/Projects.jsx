import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaEye, FaGithub, FaExternalLinkAlt, FaTimes, FaLayerGroup, FaCheckCircle, FaRocket } from 'react-icons/fa';
import { projects, projectCategories } from '../data/portfolioData';

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
                    aria-label="Close modal"
                >
                    <FaTimes />
                </motion.button>

                <div className="modal-body">
                    <div className="modal-image-section">
                        <img src={project.image} alt={project.title} />
                        {project.badge && (
                            <span className={`project-card-badge badge-${project.badgeType} modal-badge`}>
                                {project.badge}
                            </span>
                        )}
                    </div>

                    <div className="modal-details">
                        <div className="modal-header-meta">
                            <span className="modal-domain-tag">
                                <FaLayerGroup style={{ marginRight: '6px' }} />
                                {project.category === 'ai_agents' ? 'Agentic AI & LLMs' :
                                 project.category === 'vision_dl' ? 'Computer Vision & Deep Learning' :
                                 'Data Science & Analytics'}
                            </span>
                            <h3>{project.title}</h3>
                        </div>

                        <p className="modal-description">{project.fullDesc}</p>

                        {project.highlights && project.highlights.length > 0 && (
                            <div className="modal-highlights-box">
                                <strong className="modal-section-title">
                                    Engineering Highlights &amp; Metrics
                                </strong>
                                <div className="modal-highlights-grid">
                                    {project.highlights.map((h, i) => (
                                        <div key={i} className="highlight-item">
                                            <span className="highlight-label">{h.label}</span>
                                            <span className="highlight-value">{h.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <strong className="modal-section-title">
                                Technologies &amp; Architecture
                            </strong>
                            <div className="modal-tech-list">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="project-tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <strong className="modal-section-title">
                                Key Innovations &amp; Features
                            </strong>
                            <ul className="modal-features">
                                {project.features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.05 }}
                                    >
                                        <FaCheckCircle className="feature-check-icon" />
                                        <span>{f}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-actions">
                            <a
                                href={project.github}
                                className="glass-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="glass-layer glass-blur" />
                                <span className="glass-layer glass-tint" />
                                <span className="glass-layer glass-rim" />
                                <span className="glass-btn-content">
                                    <FaGithub /> View Repository
                                </span>
                            </a>

                            {project.live && (
                                <a
                                    href={project.live}
                                    className="glass-btn glass-btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="glass-layer glass-blur" />
                                    <span className="glass-layer glass-tint" />
                                    <span className="glass-layer glass-rim" />
                                    <span className="glass-btn-content">
                                        <FaRocket /> Live Demo
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

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
                        <div className="section-subtitle">Real-World AI &amp; Data Systems</div>
                    </motion.div>

                    {/* Category Filter Tabs */}
                    <motion.div
                        className="projects-filter-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {projectCategories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                className={`project-filter-tab ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                layout
                            >
                                <span>{cat.label}</span>
                                <span className="filter-tab-count">
                                    {cat.id === 'all'
                                        ? projects.length
                                        : projects.filter(p => p.category === cat.id).length}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div className="projects-grid" layout>
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    className="project-card"
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="project-image">
                                        <img src={project.image} alt={project.title} />

                                        {project.badge && (
                                            <span className={`project-card-badge badge-${project.badgeType}`}>
                                                {project.badge}
                                            </span>
                                        )}

                                        <div className="project-overlay">
                                            <motion.button
                                                className="overlay-btn"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setSelectedProject(project)}
                                                aria-label="View project details"
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
                                                aria-label="View GitHub repository"
                                            >
                                                <FaGithub />
                                            </motion.a>
                                            {project.live && (
                                                <motion.a
                                                    href={project.live}
                                                    className="overlay-btn overlay-btn-live"
                                                    whileHover={{ scale: 1.15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="View live demo"
                                                >
                                                    <FaExternalLinkAlt />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="project-info">
                                        <div className="project-category-label">
                                            {project.category === 'ai_agents' ? 'Agentic AI & LLMs' :
                                             project.category === 'vision_dl' ? 'Computer Vision' :
                                             'Data Science & Analytics'}
                                        </div>
                                        <h3>{project.title}</h3>
                                        <p>{project.shortDesc}</p>
                                        <div className="project-tags">
                                            {project.technologies.slice(0, 5).map((tech) => (
                                                <span key={tech} className="project-tag">{tech}</span>
                                            ))}
                                            {project.technologies.length > 5 && (
                                                <span className="project-tag project-tag-more">
                                                    +{project.technologies.length - 5}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
