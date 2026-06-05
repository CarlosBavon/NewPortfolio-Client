import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);
    if (window.innerWidth < 768) return null;
    return <div className="custom-cursor" style={{ left: position.x, top: position.y }} />;
};

export default CustomCursor;