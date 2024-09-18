// File: components/GameStart.tsx
import React from 'react';
import './GameStart.css';

interface GameStartProps {
    onStartGame: () => void;
}

const GameStart: React.FC<GameStartProps> = ({ onStartGame }) => (
    <div className="game-start">
        <h1 className="game-title">TapTastic Mood Booster</h1>
        <p className="game-description">Tap to keep the character happy and energized!</p>
        <button onClick={onStartGame} className="start-button">
            Start Game
        </button>
    </div>
);

export default GameStart;