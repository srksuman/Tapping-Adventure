import React from 'react';
import { Award, ChevronUp } from 'lucide-react';
import './ScoreDisplay.css';

interface ScoreDisplayProps {
    score: number;
    level: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, level }) => (
    <div className="score-display">
        <div className="score">
            <Award className="award-icon" size={32} />
            <span>{score}</span>
        </div>
        <div className="level">
            <ChevronUp className="level-icon" size={28} />
            <span>Level {level}</span>
        </div>
    </div>
);

export default ScoreDisplay;