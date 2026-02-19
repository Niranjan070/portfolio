import {
    FaChartLine, FaCode, FaMicrochip, FaDatabase,
    FaCodeBranch, FaLaptopCode, FaLinkedin, FaGithub,
    FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';

export const socialLinks = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
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
    { number: 5, suffix: '+', label: 'Certifications' },
    { number: 2, suffix: '+', label: 'Years Learning' },
];

export const skillCategories = [
    { id: 'all', label: 'All', icon: '⚡' },
    { id: 'data', label: 'Data & Analytics', icon: '📊' },
    { id: 'dev', label: 'Development', icon: '💻' },
    { id: 'devops', label: 'DevOps', icon: '🔧' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
];

export const skills = [
    {
        id: 1,
        category: 'data',
        title: 'Data Analysis & Visualization',
        icon: FaChartLine,
        pills: ['Power BI', 'Tableau', 'Python (Pandas, NumPy)', 'Matplotlib'],
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
        category: 'dev',
        title: 'IoT Development',
        icon: FaMicrochip,
        pills: ['Arduino', 'Raspberry Pi', 'Sensors Integration'],
    },
    {
        id: 4,
        category: 'data',
        title: 'Database',
        icon: FaDatabase,
        pills: ['PostgreSQL', 'MongoDB'],
    },
    {
        id: 5,
        category: 'devops',
        title: 'Version Control',
        icon: FaCodeBranch,
        pills: ['Git', 'GitHub'],
    },
    {
        id: 6,
        category: 'tools',
        title: 'Tools',
        icon: FaLaptopCode,
        pills: ['Visual Studio Code', 'Jupyter Notebook'],
    },
];

export const projects = [
    {
        id: 1,
        title: 'Fake News Detection System',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        shortDesc: 'News classifier using TF-IDF + Logistic Regression (88% accuracy). Keyword alerts, URL scanning, Flask integration.',
        fullDesc: 'A comprehensive fake news detection system that uses TF-IDF vectorization with Logistic Regression to classify news articles. Features keyword alerts, URL scanning integration, and a Flask web interface for easy access.',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
        features: [
            'TF-IDF vectorization',
            'Logistic Regression model',
            '88% accuracy',
            'Keyword alerts',
            'URL scanning integration',
            'Flask web interface',
        ],
        github: '#',
        live: '#',
    },
    {
        id: 2,
        title: 'Bank Customer Churn Prediction',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop',
        shortDesc: 'Decision Tree model, improved accuracy by 12%. EDA and feature engineering for churn factors.',
        fullDesc: 'A machine learning model to predict bank customer churn using Decision Tree algorithm. Performed extensive Exploratory Data Analysis and feature engineering to identify key churn factors, achieving a 12% improvement in prediction accuracy.',
        technologies: ['Python', 'Decision Trees', 'Pandas'],
        features: [
            'Decision Tree algorithm',
            '12% accuracy improvement',
            'Exploratory Data Analysis',
            'Feature engineering for churn',
            'Visualization of churn factors',
        ],
        github: '#',
        live: '#',
    },
];

export const certificates = [
    {
        id: 1,
        title: 'Power BI for Data Visualization',
        org: 'Onwingspan',
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
        title: 'MongoDB Python Developer Path',
        org: 'MongoDB University',
        date: '2024',
        image: '/images/certificates/mongodb.webp',
    },
    {
        id: 4,
        title: 'Exploratory Data Analysis',
        org: 'Onwingspan',
        date: '2024',
        image: '/images/certificates/eda.png',
    },
    {
        id: 5,
        title: 'Data Fundamentals',
        org: 'IBM SkillsBuild',
        date: '2024',
        image: '/images/certificates/data_fundamentals.svg',
    },
];

export const contactDetails = [
    { icon: FaEnvelope, text: 'niranjan2005official@gmail.com' },
    { icon: FaPhone, text: '+91 6382531629' },
    { icon: FaMapMarkerAlt, text: 'Coimbatore, Tamil Nadu, India' },
];
