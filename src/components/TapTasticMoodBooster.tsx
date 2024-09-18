// File: TapTasticMoodBooster.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import GameOver from './over/GameOver';
import Footer from './footer/Footer';
import './TapTasticMoodBooster.css';
import GameStart from './start/GameStart';
import ScoreDisplay from './score/ScoreDisplay';
import GameArea from './area/GameArea';
import StaminaBar from './stimina/StaminaBar';
import { TapPosition } from './types/position';

const TapTasticMoodBooster: React.FC = () => {
    const [score, setScore] = useState(0);
    const [taps, setTaps] = useState<TapPosition[]>([]);
    const [stamina, setStamina] = useState(100);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(1);
    const [characterMood, setCharacterMood] = useState('normal');
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const tapIdRef = useRef(0);
    const lastTapTime = useRef(Date.now());

    const calculatePointValue = (currentScore: number) => {
        return Math.floor(currentScore / 100) + 1;
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const staminaInterval = setInterval(() => {
            setStamina((prevStamina) => {
                const now = Date.now();
                const timeSinceLastTap = now - lastTapTime.current;
                if (timeSinceLastTap > 1000) {
                    return Math.max(prevStamina - 1, 0);
                }
                return prevStamina;
            });
        }, 100);

        return () => clearInterval(staminaInterval);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (stamina <= 0 && gameStarted) {
            setGameOver(true);
        }
    }, [stamina, gameStarted]);

    useEffect(() => {
        const newLevel = Math.floor(score / 500) + 1;
        if (newLevel !== level) {
            setLevel(newLevel);
        }
    }, [score, level]);

    useEffect(() => {
        if (stamina < 20) {
            setCharacterMood('dying');
        } else if (stamina < 50) {
            setCharacterMood('sad');
        } else {
            setCharacterMood('normal');
        }
    }, [stamina]);

    const handleTap = useCallback((event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();

        if (stamina <= 0 || !gameStarted || gameOver) return;

        const rect = gameAreaRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const pointValue = calculatePointValue(score) * level;

        setScore((prevScore) => prevScore + pointValue);
        setStamina((prevStamina) => Math.min(prevStamina + 2, 100));
        lastTapTime.current = Date.now();

        const newTapId = tapIdRef.current++;
        setTaps((prevTaps) => [
            ...prevTaps,
            { id: newTapId, x, y, value: pointValue }
        ]);

        setTimeout(() => {
            setTaps((prevTaps) => prevTaps.filter(tap => tap.id !== newTapId));
        }, 1000);
    }, [score, stamina, gameStarted, gameOver, level]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setStamina(100);
        setLevel(1);
    };

    const restartGame = () => {
        setGameOver(false);
        setScore(0);
        setStamina(100);
        setLevel(1);
    };

    return (
        <div className="game-container">
            {!gameStarted ? (
                <GameStart onStartGame={startGame} />
            ) : (
                <>
                    <ScoreDisplay score={score} level={level} />
                    <StaminaBar stamina={stamina} />
                    <GameArea
                        gameAreaRef={gameAreaRef}
                        handleTap={handleTap}
                        stamina={stamina}
                        characterMood={characterMood}
                        taps={taps}
                    />
                    <p className="game-instructions">
                        Tap to energize the character!<br />
                        <span className="highlight-yellow">Level up for more points!</span><br />
                        <span className="highlight-green">Keep the stamina high!</span>
                    </p>
                </>
            )}
            {gameOver && (
                <GameOver score={score} level={level} onRestart={restartGame} />
            )}
            <Footer />
        </div>
    );
};

export default TapTasticMoodBooster;