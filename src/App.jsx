import React from 'react';
import Hero from './components/Hero';
import Samples from './components/Samples';
import Builder from './components/Builder';
import AuthGate from './components/AuthGate';

function App() {
  /* Theme Toggle Logic */
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    // Check system or stored preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <AuthGate>
      <div className="App">
        {/* Absolute positioned toggle button */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: 100,
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '1.5rem'
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <Hero />
        <Samples />
        <Builder />

        {/* Footer / Copyright */}
        <footer style={{ padding: '2rem 1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          <p>&copy; 2026 UGC Ad Builder. All rights reserved.</p>
        </footer>
      </div>
    </AuthGate>
  );
}

export default App;
