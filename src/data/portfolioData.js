import {
    FaChartLine, FaCode, FaMicrochip, FaDatabase,
    FaCodeBranch, FaLaptopCode, FaLinkedin, FaGithub,
    FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt,
    FaBrain, FaFlask, FaEye
} from 'react-icons/fa';

export const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com/in/niranjan-t-79a6b7320', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/Niranjan070', label: 'GitHub' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
];

export const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
];

export const stats = [
    { number: 15, suffix: '+', label: 'Projects Completed' },
    { number: 6, suffix: '+', label: 'Certifications' },
    { number: 1, suffix: '', label: 'Internship' },
];

export const skillCategories = [
    { id: 'all', label: 'All', icon: '⚡' },
    { id: 'data', label: 'Data & Analytics', icon: '📊' },
    { id: 'ml', label: 'ML & AI', icon: '🤖' },
    { id: 'dev', label: 'Development', icon: '💻' },
    { id: 'tools', label: 'Tools & Platforms', icon: '🛠️' },
];

export const skills = [
    {
        id: 1,
        category: 'data',
        title: 'Data Science & Analytics',
        icon: FaChartLine,
        pills: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering', 'Power BI', 'Matplotlib'],
    },
    {
        id: 2,
        category: 'dev',
        title: 'Programming',
        icon: FaCode,
        pills: ['Python', 'SQL'],
    },
    {
        id: 3,
        category: 'ml',
        title: 'Machine Learning',
        icon: FaBrain,
        pills: ['scikit-learn', 'Classification', 'Regression', 'Cross-Validation', 'Error Analysis'],
    },
    {
        id: 4,
        category: 'ml',
        title: 'Deep Learning & CV',
        icon: FaEye,
        pills: ['TensorFlow', 'YOLO', 'Object Detection', 'Image Processing'],
    },
    {
        id: 5,
        category: 'ml',
        title: 'NLP',
        icon: FaMicrochip,
        pills: ['Text Preprocessing', 'TF-IDF', 'Text Classification'],
    },
    {
        id: 6,
        category: 'data',
        title: 'Database',
        icon: FaDatabase,
        pills: ['MongoDB', 'Vector Search', 'SQL'],
    },
    {
        id: 7,
        category: 'dev',
        title: 'Web & Deployment',
        icon: FaFlask,
        pills: ['Flask', 'Streamlit', 'RAG Architectures'],
    },
    {
        id: 8,
        category: 'tools',
        title: 'Tools & Version Control',
        icon: FaCodeBranch,
        pills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code'],
    },
];

export const projects = [
    {
        id: 1,
        title: 'Fake News Detection System',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        shortDesc: 'NLP-based classification pipeline using TF-IDF and supervised learning for real-time fake news detection via Flask.',
        fullDesc: 'Designed and trained an NLP-based classification pipeline using TF-IDF vectorization and supervised learning techniques. Evaluated model performance using accuracy and precision–recall metrics, and deployed the solution via a Flask web application for real-time inference.',
        technologies: ['Python', 'scikit-learn', 'TF-IDF', 'Flask', 'NLP'],
        features: [
            'TF-IDF vectorization pipeline',
            'Supervised learning classification',
            'Accuracy & precision-recall evaluation',
            'Real-time inference via Flask',
            'End-to-end NLP pipeline',
        ],
        github: 'https://github.com/Niranjan070',
        live: '#',
    },
    {
        id: 2,
        title: 'Early Plant Disease Prediction',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
        shortDesc: 'Proactive disease forecasting using YOLO-based airborne spore detection and temporal pattern analysis for agriculture.',
        fullDesc: 'Developed a proactive disease forecasting system by capturing airborne fungal spores using a microscopic camera and spore trap. Applied YOLO-based object detection to classify spore types and analyzed temporal occurrence patterns to enable early disease risk prediction. Built predictive models to support preventive agricultural decision-making before visible symptoms appeared.',
        technologies: ['Python', 'YOLO', 'Object Detection', 'Computer Vision'],
        features: [
            'Microscopic camera spore capture',
            'YOLO-based spore classification',
            'Temporal pattern analysis',
            'Predictive disease risk modeling',
            'Preventive agriculture decisions',
        ],
        github: 'https://github.com/Niranjan070',
        live: '#',
    },
    {
        id: 3,
        title: 'AIRA – Adaptive Insights & Reliable Actions',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        shortDesc: 'Multimodal enterprise analytics platform integrating four AI models for Finance, Governance, Risk, and Market analysis.',
        fullDesc: 'Co-developed a multimodal enterprise analytics platform integrating four AI models for Finance, Governance, Risk, and Market analysis. Aggregated cross-domain model outputs into unified insights to support data-driven strategic decision-making at the organizational level.',
        technologies: ['Python', 'Machine Learning', 'Data Analytics', 'Multi-Model AI'],
        features: [
            'Four integrated AI models',
            'Finance & Risk analysis',
            'Governance & Market insights',
            'Cross-domain data aggregation',
            'Strategic decision-making support',
        ],
        github: 'https://github.com/Niranjan070',
        live: '#',
    },
];

export const certificates = [
    {
        id: 1,
        title: 'Hands-On Data Visualization with Power BI',
        org: 'Infosys Springboard',
        date: '2025',
        image: '/images/certificates/powerbi.png',
    },
    {
        id: 2,
        title: 'Python 101 for Data Science',
        org: 'IBM Cognitive Class',
        date: '2025',
        image: '/images/certificates/python-datascience.jpg',
    },
    {
        id: 3,
        title: 'Exploratory Data Analysis',
        org: 'Infosys Springboard',
        date: '2024',
        image: '/images/certificates/eda.png',
    },
    {
        id: 4,
        title: 'Data Fundamentals',
        org: 'IBM SkillsBuild',
        date: '2024',
        image: '/images/certificates/data_fundamentals.svg',
    },
    {
        id: 5,
        title: 'Building AI-Powered Search with Vector Search',
        org: 'MongoDB',
        date: '2025',
        image: '/images/certificates/mongodb.webp',
    },
    {
        id: 6,
        title: 'Building RAG Applications Using MongoDB',
        org: 'MongoDB',
        date: '2025',
        image: '/images/certificates/mongodb.webp',
    },
];

export const contactDetails = [
    { icon: FaEnvelope, text: 'niranjan2005official@gmail.com' },
    { icon: FaPhone, text: '+91 6382531629' },
    { icon: FaMapMarkerAlt, text: 'Coimbatore, Tamil Nadu, India' },
];
