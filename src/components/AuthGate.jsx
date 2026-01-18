import React, { useState, useEffect } from 'react';

const AuthGate = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('isAuthenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded password
        if (password === 'admin123') {
            sessionStorage.setItem('isAuthenticated', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg-page)',
            color: 'var(--color-text-main)',
            padding: '1rem'
        }}>
            <div className="builder-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Access</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-input)',
                                color: 'var(--color-text-main)',
                                width: '100%'
                            }}
                            placeholder="Enter admin password"
                        />
                    </div>
                    {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
                    <button type="submit" className="submit-btn">
                        Enter Site
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginTop: '0.5rem' }}>
                        Default: admin123
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthGate;
