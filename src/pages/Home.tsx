import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import type { WelcomeResponse } from '../types/api.types';
import reactLogo from '../assets/react.svg';

function Home() {
  const [welcomeData, setWelcomeData] = useState<WelcomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchWelcomeData();
  }, []);

  const fetchWelcomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getWelcome();
      setWelcomeData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch welcome data');
      console.error('Error fetching welcome data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      {loading && (
        <div style={{ padding: '20px' }}>
          <h2>Loading backend data...</h2>
        </div>
      )}

      {error && (
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#ff6b6b' }}>⚠️ Error</h2>
          <p style={{ color: '#ff6b6b' }}>{error}</p>
          <button
            onClick={fetchWelcomeData}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              cursor: 'pointer',
              background: '#646cff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {welcomeData && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          maxWidth: '600px',
          margin: '20px auto'
        }}>
          <h2 style={{ color: '#646cff' }}>Backend API Connected! 🚀</h2>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            {welcomeData.message}
          </p>

          <div style={{ textAlign: 'left', marginTop: '20px' }}>
            <strong style={{ color: '#646cff' }}>Available Endpoints:</strong>
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              {welcomeData.endpoints.map((endpoint, index) => (
                <li key={index} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                  {endpoint}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={fetchWelcomeData}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              cursor: 'pointer',
              background: '#646cff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;

