import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            setWidth((winScroll / height) * 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return <div className="scroll-progress" style={{ width: `${width}%` }} />;
};

export default ScrollProgress;