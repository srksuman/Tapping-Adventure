import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
    <footer className="game-footer">
        <p>
            TapTastic Mood Booster | Created with ❤️ by Your Name |
            <a href="https://github.com/yourusername/taptastic-mood-booster" target="_blank" rel="noopener noreferrer" className="github-link">
                GitHub Repository
            </a>
        </p>
    </footer>
);

export default Footer;