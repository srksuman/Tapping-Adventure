// File: components/GameOver.tsx
import React from 'react';
import './GameOver.css';

interface GameOverProps {
    score: number;
    level: number;
    onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, level, onRestart }) => (
    <div className="game-over-overlay">
        <div className="game-over-modal">
            <h2 className="game-over-title">Game Over!</h2>
            <p className="game-over-score">Your score: {score}</p>
            <p className="game-over-level">Level reached: {level}</p>
            <button onClick={onRestart} className="restart-button">
                Play Again
            </button>
        </div>
    </div>
);

export default GameOver;