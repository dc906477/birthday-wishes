import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiEffect({ trigger }) {
    useEffect(() => {
        if (!trigger) return;

        // Burst 1: Center blast
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
        });

        // Burst 2: Left cannon
        setTimeout(() => {
            confetti({
                particleCount: 40,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
            });
        }, 200);

        // Burst 3: Right cannon
        setTimeout(() => {
            confetti({
                particleCount: 40,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
            });
        }, 400);
    }, [trigger]);

    return null;
}