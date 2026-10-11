import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { validateName } from '../utils/validateName';

export default function NameLogin({ onSubmitName }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateName(name);

        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setError('');
        onSubmitName(name.trim());
    };

    return (
        <div className="login-card">
            <h1 className="title-script">Celebration Time</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Kisi special ke liye birthday surprise taiyar karein!
            </p>

            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Kiska Birthday hai? Naam likhein..."
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError('');
                    }}
                    autoFocus
                />

                {error && <p className="error-text">{error}</p>}

                <button
                    type="submit"
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                >
                    <Sparkles size={18} />
                    Surprise Dekhein
                </button>
            </form>
        </div>
    );
}