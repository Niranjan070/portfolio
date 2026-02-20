import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { socialLinks, contactDetails } from '../data/portfolioData';

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        const form = e.target;

        try {
            const res = await fetch('https://formspree.io/f/xldlbgqz', {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });

            if (res.ok) {
                setFormStatus('success');
                form.reset();
                setTimeout(() => setFormStatus(null), 5000);
            } else {
                throw new Error('Failed');
            }
        } catch {
            setFormStatus('error');
            setTimeout(() => setFormStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="section section-alt" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Contact Me</h2>
                    <div className="section-subtitle">Get in touch</div>
                </motion.div>

                <div className="contact-grid">
                    {/* Left - Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Let's work together</h3>
                        <p>
                            I'm always open to discussing new opportunities, interesting projects,
                            or just having a chat about data science and technology.
                        </p>

                        {contactDetails.map((detail, i) => (
                            <motion.div
                                key={i}
                                className="contact-detail"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                whileHover={{ x: 4 }}
                            >
                                <div className="contact-detail-icon">
                                    <detail.icon />
                                </div>
                                <span className="contact-detail-text">{detail.text}</span>
                            </motion.div>
                        ))}

                        <div className="contact-socials">
                            {socialLinks.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    className="social-icon"
                                    aria-label={s.label}
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <s.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        className="contact-form-wrap"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence>
                                {formStatus === 'success' && (
                                    <motion.div
                                        className="form-status success"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        ✅ Message sent! I'll get back to you soon.
                                    </motion.div>
                                )}
                                {formStatus === 'error' && (
                                    <motion.div
                                        className="form-status error"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        ❌ Something went wrong. Please try again.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="form-group">
                                <motion.input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    whileFocus={{ borderColor: 'var(--accent-cyan)' }}
                                />
                            </div>
                            <div className="form-group">
                                <motion.input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    whileFocus={{ borderColor: 'var(--accent-cyan)' }}
                                />
                            </div>
                            <div className="form-group">
                                <motion.input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    required
                                    whileFocus={{ borderColor: 'var(--accent-cyan)' }}
                                />
                            </div>
                            <div className="form-group">
                                <motion.textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={6}
                                    required
                                    whileFocus={{ borderColor: 'var(--accent-cyan)' }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="glass-btn"
                                disabled={formStatus === 'sending'}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <span className="glass-layer glass-blur" />
                                <span className="glass-layer glass-tint" />
                                <span className="glass-layer glass-rim" />
                                <span className="glass-btn-content">
                                    {formStatus === 'sending' ? (
                                        <>Sending...</>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <FaPaperPlane />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
