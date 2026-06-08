import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useToast } from '../../hooks/useToast';
import './Home.css';

const Home = () => {
    const [githubStats, setGithubStats] = useState(null);
    const [projects, setProjects] = useState([]);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        api.get('/api/projects').then(res => setProjects(res.data));
        api.get('/api/github/stats')
            .then(res => setGithubStats(res.data))
            .catch(err => console.error('GitHub stats error:', err));
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post('/api/contact', contactForm);
            if (response.data.success) {
                showSuccess(response.data.message);
                setContactForm({ name: '', email: '', message: '' });
            } else {
                showError(response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to send message. Please try again.';
            showError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setIsSubmitting(true);
        try {
            const response = await api.post('/api/newsletter', { email: newsletterEmail });
            if (response.data.success) {
                showSuccess(response.data.message);
                setNewsletterEmail('');
            } else {
                showError(response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Subscription failed.';
            showError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="home" className="hero">
                <div className="container hero-container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-content">
                        <h1 className="hero-title">
                            Building Digital Products<br />
                            <span className="hero-accent">That People Love To Use</span>
                        </h1>
                        <p className="hero-subtitle">Full Stack Developer · UI/UX Designer · Mobile App Developer · Based In Kenya</p>
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">View Projects</a>
                            <a href="#contact" className="btn">Book A Call</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="about" className="about section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content">
                            <h1 style={{ marginBottom: "100px" }}>About Me</h1>
                            <h2>Who Am I?</h2>
                            <p>I’m Bavon, a passionate Web & App Developer who transforms ideas into digital realities. With a strong eye for design and a love for functionality, I craft solutions that blend beauty and performance.</p>
                            <h2>My Approach</h2>
                            <p>Every project I work on is guided by clarity, quality, and care. Whether it’s a sleek portfolio or a complex web platform, my goal is to deliver something that makes an impact.</p>
                            <p>Transforming ideas into high-impact digital realities. I craft performant,
                                responsive web & mobile experiences with modern stacks. Obsessed with
                                clean UI, robust backends, and continuous learning. Based in Kenya, working globally.</p>

                            <div className="stats-grid">
                                <div><strong>1+</strong><span>Years Coding</span></div>
                                <div><strong>15+</strong><span>Projects Completed</span></div>
                                <div><strong>10+</strong><span>Technologies</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="projects section">
                <div className="container">
                    <h2 className="section-title">Featured Work</h2>
                    <div className="projects-grid">
                        {projects.filter(p => p.featured).map(project => (
                            <div key={project._id} className="project-card">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">{project.technologies.join(' · ')}</div>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">View Project</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {githubStats && (
                <section className="github-stats section">
                    <div className="container">
                        <h2>GitHub Live Statistics</h2>
                        <div className="github-grid">
                            <div>Followers: {githubStats.followers}</div>
                            <div>Following: {githubStats.following}</div>
                            <div>Repositories: {githubStats.publicRepos}</div>
                        </div>
                    </div>
                </section>
            )}

            <section id="contact" className="contact section">
                <div className="container">
                    <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Let's Work Together</h2>
                    <div className="contact-wrapper">
                        <form className="contact-form" onSubmit={handleContactSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        <div className="newsletter-section">
                            <h3>Subscribe to Newsletter</h3>
                            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn" disabled={isSubmitting}>
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;