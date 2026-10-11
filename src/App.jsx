import React, { useState, useEffect, useRef } from 'react';
import NameLogin from './components/NameLogin';
import BirthdayGreeting from './components/BirthdayGreeting';
import WishReveal from './components/WishReveal';
import ConfettiEffect from './components/ConfettiEffect';
import { wishesList } from './data/wishes';
import { themes } from './data/themes';
import { birthdayTracks } from './data/musicTracks';
import { getRandomItem } from './utils/randomizer';
import { Palette, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export default function App() {
    const [userName, setUserName] = useState('');
    const [currentTheme, setCurrentTheme] = useState(themes[0]);
    const [currentWish, setCurrentWish] = useState('');
    const [confettiTrigger, setConfettiTrigger] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [plateStyleIndex, setPlateStyleIndex] = useState(0);
    const [cardStyleIndex, setCardStyleIndex] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--background', currentTheme.background);
        root.style.setProperty('--primary-color', currentTheme.primary);
        root.style.setProperty('--secondary-color', currentTheme.secondary);
        root.style.setProperty('--text-main', currentTheme.textColor);
        root.style.setProperty('--text-muted', currentTheme.accentText);
    }, [currentTheme]);

    const handleStart = (name) => {
        setUserName(name);
        pickNewWish(name);
        setConfettiTrigger((prev) => prev + 1);

        // Random Theme & Designs
        setCurrentTheme(getRandomItem(themes, currentTheme));
        setPlateStyleIndex(Math.floor(Math.random() * 4));
        setCardStyleIndex(Math.floor(Math.random() * 4));

        // Random Audio Track
        let nextIndex;
        if (birthdayTracks && birthdayTracks.length > 1) {
            do {
                nextIndex = Math.floor(Math.random() * birthdayTracks.length);
            } while (nextIndex === currentTrackIndex);
        } else {
            nextIndex = 0;
        }
        setCurrentTrackIndex(nextIndex);

        setIsPlaying(true);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.load();
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
        }, 150);
    };

    const toggleSound = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.muted = false;
            audioRef.current.play().then(() => setIsPlaying(true));
        }
    };

    const pickNewWish = (name = userName) => {
        const rawWish = getRandomItem(wishesList, currentWish);
        const personalizedWish = rawWish.replace('{name}', name);
        setCurrentWish(personalizedWish);
    };

    // Nayi Wish click hote hi automatic Theme + Card Style + Confetti change hoga
    const handleNextWish = () => {
        pickNewWish();
        setConfettiTrigger((prev) => prev + 1);

        // Automatic theme badalna
        const nextTheme = getRandomItem(themes, currentTheme);
        setCurrentTheme(nextTheme);

        // Automatic card aur title style badalna
        setCardStyleIndex((prev) => (prev + 1) % 4);
    };

    const handleThemeChange = () => {
        const nextTheme = getRandomItem(themes, currentTheme);
        setCurrentTheme(nextTheme);
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(true);
        setUserName('');
        setCurrentWish('');
    };

    const activeTrack = birthdayTracks && birthdayTracks[currentTrackIndex];

    return (
        <div className="app-container">
            <audio
                ref={audioRef}
                src={activeTrack ? activeTrack.url : ''}
                loop
                preload="auto"
            />

            <ConfettiEffect trigger={confettiTrigger} />

            {!userName ? (
                <NameLogin onSubmitName={handleStart} />
            ) : (
                <div>
                    {/* Top Audio Toggle Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.4rem' }}>
                        <button
                            type="button"
                            onClick={toggleSound}
                            title={isPlaying ? 'Mute Music' : 'Play Music'}
                            style={{
                                background: 'rgba(255, 255, 255, 0.85)',
                                border: '1px solid var(--secondary-color)',
                                borderRadius: '50%',
                                width: '38px',
                                height: '38px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--primary-color)',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                            }}
                        >
                            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>
                    </div>

                    <BirthdayGreeting name={userName} styleIndex={plateStyleIndex} />

                    {/* Dynamic Wish Reveal Card */}
                    <WishReveal
                        wish={currentWish}
                        onNextWish={handleNextWish}
                        cardStyleIndex={cardStyleIndex}
                    />

                    <div className="button-row" style={{ marginTop: '1.2rem' }}>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={handleThemeChange}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                        >
                            <Palette size={16} />
                            Theme Badlein
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={handleReset}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}