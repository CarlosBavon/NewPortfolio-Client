import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo" onClick={closeMenu}>BAVDEV</Link>

                {/* Desktop Navigation */}
                <nav className={`nav ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
                    <a href="#home" onClick={closeMenu}>Home</a>
                    <a href="#about" onClick={closeMenu}>About</a>
                    <a href="#projects" onClick={closeMenu}>Work</a>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'dark' ? <FiSun /> : <FiMoon />}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu Overlay (optional, for closing) */}
            {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
        </header>
    );
};

export default Header;
