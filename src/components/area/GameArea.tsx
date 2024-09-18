import React from 'react';
import { Heart } from 'lucide-react';
import './GameArea.css';
import { TapPosition } from '../types/position';

interface GameAreaProps {
    gameAreaRef: React.RefObject<HTMLDivElement>;
    handleTap: (event: React.MouseEvent | React.TouchEvent) => void;
    stamina: number;
    characterMood: string;
    taps: TapPosition[];
}

const GameArea: React.FC<GameAreaProps> = ({ gameAreaRef, handleTap, stamina, characterMood, taps }) => {
    const renderCharacter = () => {
        let emoji = '😊';
        switch (characterMood) {
            case 'sad':
                emoji = '😢';
                break;
            case 'dying':
                emoji = '😵';
                break;
        }
        return <div className="character">{emoji}</div>;
    };

    return (
        <div
            ref={gameAreaRef}
            className={`game-area ${stamina <= 20 ? 'shake' : ''}`}
            onClick={handleTap}
            onTouchStart={handleTap}
            role="button"
            tabIndex={0}
        >
            {renderCharacter()}
            {taps.map((tap) => (
                <div
                    key={tap.id}
                    className="tap-effect"
                    style={{
                        left: tap.x,
                        top: tap.y,
                    }}
                >
                    <Heart className="heart-icon" size={32} color="red" />
                    <span className="tap-value">+{tap.value}</span>
                </div>
            ))}
        </div>
    );
};

export default GameArea;