import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import './CommandPalette.css';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    useHotkeys('ctrl+k', (e) => { e.preventDefault(); setIsOpen(!isOpen); });
    if (!isOpen) return null;
    return (
        <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
            <div className="command-palette" onClick={e => e.stopPropagation()}>
                <input type="text" placeholder="Search sections..." autoFocus />
                <div className="command-items">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;