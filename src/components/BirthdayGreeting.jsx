import React from 'react';
import { PartyPopper, Sparkles, Crown, Cake } from 'lucide-react';

export default function BirthdayGreeting({ name, styleIndex = 0 }) {
    // 4 alag-alag stylish name plate variants
    const renderPlateVariant = () => {
        switch (styleIndex % 4) {
            // Style 1: Royal Crown Badge (Golden Glow Style)
            case 0:
                return (
                    <div
                        style={{
                            padding: '1.2rem',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
                            border: '2px solid rgba(255,215,0,0.5)',
                            boxShadow: '0 8px 24px rgba(255,182,193,0.3)',
                            marginBottom: '1.2rem',
                            animation: 'popIn 0.6s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', color: '#eab308' }}>
                            <Crown size={32} />
                        </div>
                        <h1 className="title-script" style={{ fontSize: '2.6rem', margin: '0.2rem 0' }}>
                            Happy Birthday
                        </h1>
                        <div
                            style={{
                                display: 'inline-block',
                                background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                                color: '#fff',
                                padding: '0.35rem 1.4rem',
                                borderRadius: '50px',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            ✨ {name} ✨
                        </div>
                    </div>
                );

            // Style 2: Floating Party Popper Banner
            case 1:
                return (
                    <div
                        style={{
                            padding: '1.2rem',
                            borderRadius: '24px',
                            border: '2px dashed var(--primary-color)',
                            background: 'rgba(255,255,255,0.7)',
                            marginBottom: '1.2rem',
                            transform: 'rotate(-1deg)',
                            animation: 'bounceIn 0.6s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--primary-color)' }}>
                            <PartyPopper size={42} />
                        </div>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '1.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0.4rem 0' }}>
                            🎉 Special Day 🎉
                        </h1>
                        <h2
                            style={{
                                fontFamily: 'cursive',
                                fontSize: '2.5rem',
                                color: 'var(--primary-color)',
                                margin: 0,
                                textShadow: '2px 2px 0px rgba(0,0,0,0.06)'
                            }}
                        >
                            Happy Birthday, {name}!
                        </h2>
                    </div>
                );

            // Style 3: Sweet Cake & Sparkles Ribbon Plate
            case 2:
                return (
                    <div
                        style={{
                            padding: '1.4rem 1rem',
                            borderRadius: '16px',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,240,245,0.8))',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                            marginBottom: '1.2rem',
                            animation: 'fadeInUp 0.6s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>
                            <Sparkles size={24} />
                            <Cake size={32} />
                            <Sparkles size={24} />
                        </div>
                        <h1 className="title-script" style={{ fontSize: '2.8rem', lineHeight: 1.1 }}>
                            Happy Birthday
                        </h1>
                        <h2
                            style={{
                                fontSize: '1.85rem',
                                fontWeight: 800,
                                color: 'var(--text-main)',
                                textTransform: 'capitalize',
                                marginTop: '0.3rem'
                            }}
                        >
                            Dear {name} 🎂
                        </h2>
                    </div>
                );

            // Style 4: Minimalist Luxe Stamp
            default:
                return (
                    <div
                        style={{
                            padding: '1.2rem',
                            borderRadius: '30px',
                            background: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
                            marginBottom: '1.2rem'
                        }}
                    >
                        <span style={{ fontSize: '2rem' }}>🎈</span>
                        <h1 className="title-script" style={{ fontSize: '2.4rem', margin: '0.2rem 0' }}>
                            Happy Birthday
                        </h1>
                        <h2
                            style={{
                                fontSize: '1.6rem',
                                fontWeight: 700,
                                color: 'var(--primary-color)',
                                borderBottom: '2px solid var(--secondary-color)',
                                display: 'inline-block',
                                paddingBottom: '4px'
                            }}
                        >
                            {name}
                        </h2>
                    </div>
                );
        }
    };

    return <div>{renderPlateVariant()}</div>;
}