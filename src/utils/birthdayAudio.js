// Browser ka built-in AudioContext engine (No external file/network dependency)
let audioCtx = null;
let activeOscillators = [];
let isPlaybackActive = false;

// Note frequencies (Hz)
const N = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
    C6: 1046.50
};

// 5 Alag-Alag Birthday Melodies aur unki musical timings
export const melodyPresets = [
    // 1. Classic Sweet Piano Version
    {
        name: 'Classic Birthday Melody',
        type: 'triangle',
        notes: [
            { f: N.C4, d: 0.3 }, { f: N.C4, d: 0.3 }, { f: N.D4, d: 0.6 }, { f: N.C4, d: 0.6 },
            { f: N.F4, d: 0.6 }, { f: N.E4, d: 1.0 },
            { f: N.C4, d: 0.3 }, { f: N.C4, d: 0.3 }, { f: N.D4, d: 0.6 }, { f: N.C4, d: 0.6 },
            { f: N.G4, d: 0.6 }, { f: N.F4, d: 1.0 },
            { f: N.C4, d: 0.3 }, { f: N.C4, d: 0.3 }, { f: N.C5, d: 0.6 }, { f: N.A4, d: 0.6 },
            { f: N.F4, d: 0.6 }, { f: N.E4, d: 0.6 }, { f: N.D4, d: 0.8 },
            { f: N.B4, d: 0.3 }, { f: N.B4, d: 0.3 }, { f: N.A4, d: 0.6 }, { f: N.F4, d: 0.6 },
            { f: N.G4, d: 0.6 }, { f: N.F4, d: 1.2 }
        ]
    },
    // 2. High-Pitched Music Box / Glockenspiel
    {
        name: 'Music Box Celebration',
        type: 'sine',
        notes: [
            { f: N.C5, d: 0.25 }, { f: N.C5, d: 0.25 }, { f: N.D5, d: 0.5 }, { f: N.C5, d: 0.5 },
            { f: N.F5, d: 0.5 }, { f: N.E5, d: 0.8 },
            { f: N.C5, d: 0.25 }, { f: N.C5, d: 0.25 }, { f: N.D5, d: 0.5 }, { f: N.C5, d: 0.5 },
            { f: N.G5, d: 0.5 }, { f: N.F5, d: 0.8 },
            { f: N.C5, d: 0.25 }, { f: N.C5, d: 0.25 }, { f: N.C6, d: 0.5 }, { f: N.A5, d: 0.5 },
            { f: N.F5, d: 0.5 }, { f: N.E5, d: 0.5 }, { f: N.D5, d: 0.7 },
            { f: N.A5, d: 0.3 }, { f: N.F5, d: 0.5 }, { f: N.G5, d: 0.5 }, { f: N.F5, d: 1.0 }
        ]
    },
    // 3. Cheerful Upbeat Tempo
    {
        name: 'Joyful Upbeat Tempo',
        type: 'triangle',
        notes: [
            { f: N.G4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.A4, d: 0.4 }, { f: N.G4, d: 0.4 },
            { f: N.C5, d: 0.4 }, { f: N.B4, d: 0.7 },
            { f: N.G4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.A4, d: 0.4 }, { f: N.G4, d: 0.4 },
            { f: N.D5, d: 0.4 }, { f: N.C5, d: 0.7 },
            { f: N.G4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.G5, d: 0.5 }, { f: N.E5, d: 0.5 },
            { f: N.C5, d: 0.4 }, { f: N.B4, d: 0.4 }, { f: N.A4, d: 0.6 },
            { f: N.F5, d: 0.3 }, { f: N.E5, d: 0.4 }, { f: N.C5, d: 0.4 }, { f: N.D5, d: 0.4 }, { f: N.C5, d: 1.0 }
        ]
    },
    // 4. Warm Lofi Marimba
    {
        name: 'Warm Harmony Lofi',
        type: 'sine',
        notes: [
            { f: N.C4, d: 0.4 }, { f: N.E4, d: 0.4 }, { f: N.G4, d: 0.6 }, { f: N.C5, d: 0.8 },
            { f: N.D4, d: 0.4 }, { f: N.F4, d: 0.4 }, { f: N.A4, d: 0.6 }, { f: N.B4, d: 0.8 },
            { f: N.C5, d: 0.5 }, { f: N.A4, d: 0.5 }, { f: N.F4, d: 0.6 }, { f: N.G4, d: 0.6 },
            { f: N.E4, d: 0.6 }, { f: N.C4, d: 1.2 }
        ]
    },
    // 5. Grand Fanfare
    {
        name: 'Festive Fanfare Tune',
        type: 'sawtooth',
        notes: [
            { f: N.C4, d: 0.25 }, { f: N.E4, d: 0.25 }, { f: N.G4, d: 0.3 }, { f: N.C5, d: 0.6 },
            { f: N.C4, d: 0.25 }, { f: N.E4, d: 0.25 }, { f: N.G4, d: 0.3 }, { f: N.C5, d: 0.6 },
            { f: N.F4, d: 0.3 }, { f: N.A4, d: 0.3 }, { f: N.C5, d: 0.5 }, { f: N.G4, d: 0.5 },
            { f: N.E4, d: 0.4 }, { f: N.C4, d: 1.0 }
        ]
    }
];

export function stopBirthdayMelody() {
    isPlaybackActive = false;
    activeOscillators.forEach((item) => {
        try {
            item.stop();
            item.disconnect();
        } catch { }
    });
    activeOscillators = [];
}

export function playBirthdayMelody(presetIndex = 0) {
    stopBirthdayMelody();
    isPlaybackActive = true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx || audioCtx.state === 'closed') {
        audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const preset = melodyPresets[presetIndex % melodyPresets.length];
    let startTime = audioCtx.currentTime + 0.05;

    const scheduleLoop = () => {
        if (!isPlaybackActive) return;

        let totalDuration = 0;
        preset.notes.forEach((note) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = preset.type;
            osc.frequency.setValueAtTime(note.f, startTime + totalDuration);

            // Volume envelope (Soft attack and sweet fade out)
            const noteStart = startTime + totalDuration;
            const noteEnd = noteStart + note.d;

            gain.gain.setValueAtTime(0.001, noteStart);
            gain.gain.exponentialRampToValueAtTime(preset.type === 'sawtooth' ? 0.08 : 0.22, noteStart + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd - 0.03);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(noteStart);
            osc.stop(noteEnd);

            activeOscillators.push(osc);
            totalDuration += note.d + 0.04;
        });

        // Melodic loop (Song khatam hote hi dobara play karein)
        setTimeout(() => {
            if (isPlaybackActive) {
                startTime = audioCtx.currentTime + 0.5;
                scheduleLoop();
            }
        }, totalDuration * 1000);
    };

    scheduleLoop();
}