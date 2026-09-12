import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { navLinks, socialLinks } from '../data/portfolioData';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const githubLink = socialLinks.find((s) => s.label === 'GitHub')?.href || 'https://github.com/Niranjan070';

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 20);

            const sections = document.querySelectorAll('section[id]');
            let current = 'home';
            sections.forEach((section) => {
                const top = section.offsetTop - 120;
                if (y >= top) {
                    current = section.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="nav-container">
                <motion.a
                    href="#home"
                    className="logo"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleNavClick(e, '#home')}
                >
                    <span className="logo-mark">N</span>
                    <span className="logo-dot">.</span>
                    <span className="logo-name">niranjan</span>
                </motion.a>

                <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <div className="nav-links-wrap">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 * i, duration: 0.4 }}
                                whileHover={{ y: -1 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>

                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-github-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaGithub className="github-icon" />
                        <span>GitHub</span>
                    </a>
                </div>

                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </motion.nav>
    );
}
