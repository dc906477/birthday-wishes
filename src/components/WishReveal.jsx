import React from 'react';
import { RotateCcw, Heart, Sparkles, Stars, Gift } from 'lucide-react';

export default function WishReveal({ wish, onNextWish, cardStyleIndex = 0 }) {
    // Alag-alag wish titles aur icon sets
    const headers = [
        { title: 'Heartfelt Wish', icon: <Heart size={20} color="var(--primary-color)" /> },
        { title: 'Magical Blessings', icon: <Sparkles size={20} color="var(--primary-color)" /> },
        { title: 'Special Message', icon: <Stars size={20} color="var(--primary-color)" /> },
        { title: 'Golden Greetings', icon: <Gift size={20} color="var(--primary-color)" /> }
    ];

    const currentHeader = headers[cardStyleIndex % headers.length];

    // 4 dynamic card designs
    const getCardStyle = () => {
        switch (cardStyleIndex % 4) {
            case 0:
                return {
                    border: '2px dashed var(--primary-color)',
                    background: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                };
            case 1:
                return {
                    border: '2px solid var(--secondary-color)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,245,247,0.85))',
                    borderRadius: '16px',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.08)'
                };
            case 2:
                return {
                    border: '1px solid rgba(255,255,255,0.8)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '30px',
                    boxShadow: 'inset 0 0 15px rgba(255,182,193,0.2), 0 8px 20px rgba(0,0,0,0.06)'
                };
            default:
                return {
                    border: '2px dotted var(--primary-color)',
                    background: 'linear-gradient(180deg, #ffffff, rgba(255,250,240,0.8))',
                    borderRadius: '20px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
                };
        }
    };

    return (
        <div
            style={{
                padding: '1.5rem 1.2rem',
                marginTop: '1rem',
                transition: 'all 0.4s ease',
                ...getCardStyle()
            }}
        >
            {/* Dynamic Wish Header Title */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.8rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-main)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}
            >
                {currentHeader.icon}
                <span>{currentHeader.title}</span>
            </div>

            {/* Wish Text */}
            <p
                style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.6',
                    color: 'var(--text-main)',
                    fontStyle: 'italic',
                    margin: '0.6rem 0 1.2rem 0',
                    minHeight: '60px'
                }}
            >
                “{wish}”
            </p>

            {/* Nayi Wish Trigger Button */}
            <button
                type="button"
                className="btn-secondary"
                onClick={onNextWish}
                style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    fontWeight: 600
                }}
            >
                <RotateCcw size={18} />
                Nayi Wish
            </button>
        </div>
    );
}