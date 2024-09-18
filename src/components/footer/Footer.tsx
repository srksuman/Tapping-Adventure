import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
    <footer className="game-footer">
        <p>
            Tapping Adventure Game| Created by Your SRK |
            <a href="https://github.com/srksuman/Tapping-Adventure" target="_blank" rel="noopener noreferrer" className="github-link">
                GitHub Repository
            </a>
        </p>
    </footer>
);

export default Footer;