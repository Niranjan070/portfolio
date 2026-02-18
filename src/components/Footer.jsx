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
                            <div className="logo-icon">N</div>
                            <span>NIRANJAN</span>
                        </div>
                        <p>&copy; {new Date().getFullYear()} Niranjan. All rights reserved.</p>
                    </div>
                    <div className="footer-right">
                        <p>Built with passion for data science ❤️</p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
