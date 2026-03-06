import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <div className="footer-content">
                    <div className="footer-left">
                        <div className="logo">
                            <span className="logo-mark">N</span>
                            <span className="logo-dot">.</span>
                            <span className="logo-name">niranjan</span>
                        </div>
                        <p>&copy; {new Date().getFullYear()} Niranjan</p>
                    </div>
                    <div className="footer-right">
                        <p>designed & built by me ☕</p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
