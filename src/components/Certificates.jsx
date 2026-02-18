import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { certificates } from '../data/portfolioData';

export default function Certificates() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const scroll = (direction) => {
        if (trackRef.current) {
            const scrollAmount = 340;
            trackRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Drag scroll support
    const handleMouseDown = (e) => {
        const el = trackRef.current;
        if (!el) return;
        el.dataset.isDown = 'true';
        el.dataset.startX = e.pageX - el.offsetLeft;
        el.dataset.scrollLeft = el.scrollLeft;
        el.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
        const el = trackRef.current;
        if (!el) return;
        el.dataset.isDown = 'false';
        el.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
        const el = trackRef.current;
        if (!el || el.dataset.isDown !== 'true') return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - Number(el.dataset.startX)) * 1.5;
        el.scrollLeft = Number(el.dataset.scrollLeft) - walk;
    };

    return (
        <section id="certificates" className="section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Certificates</h2>
                    <div className="section-subtitle">Achievements</div>
                </motion.div>

                <motion.div
                    className="certificates-track"
                    ref={trackRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            className="cert-card"
                            initial={{ opacity: 0, x: 60 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, boxShadow: '0 0 40px rgba(0, 212, 255, 0.18)' }}
                        >
                            <div className="cert-image">
                                <img src={cert.image} alt={cert.title} draggable="false" />
                            </div>
                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p className="cert-org">{cert.org}</p>
                                <span className="cert-date">{cert.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="cert-nav"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <motion.button
                        className="cert-nav-btn"
                        onClick={() => scroll('left')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft />
                    </motion.button>
                    <motion.button
                        className="cert-nav-btn"
                        onClick={() => scroll('right')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Scroll right"
                    >
                        <FaChevronRight />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
