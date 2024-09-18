// File: components/StaminaBar.tsx
import React from 'react';
import { Battery } from 'lucide-react';
import './StaminaBar.css';

interface StaminaBarProps {
    stamina: number;
}

const StaminaBar: React.FC<StaminaBarProps> = ({ stamina }) => {
    const getStaminaColor = () => {
        if (stamina > 50) return 'high';
        if (stamina > 20) return 'medium';
        return 'low';
    };

    return (
        <div className="stamina-bar">
            <div className="stamina-label">Stamina</div>
            <div className="stamina-meter">
                <div className={`stamina-fill ${getStaminaColor()}`} style={{ width: `${stamina}%` }}></div>
                <div className="stamina-text">
                    <Battery size={20} />
                    <span>{Math.round(stamina)}%</span>
                </div>
            </div>
        </div>
    );
};

export default StaminaBar;

