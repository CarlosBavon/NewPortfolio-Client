import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Bavon Carlos</h3>
                        <p>Full Stack Developer & UI/UX Designer</p>
                    </div>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="footer-social">
                        <a href="https://github.com/CarlosBavon" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
                        <a href="https://www.linkedin.com/in/bavon-carlos-868775367" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
                        <a href="mailto:carlosbavon46@gmail.com"><FiMail /></a>
                        <a href="/resume.pdf" download><FiDownload /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 BavDev. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;