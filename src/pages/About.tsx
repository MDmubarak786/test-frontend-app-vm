import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import type { AboutData } from '../types/api.types';

function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAbout();
      setAboutData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch about data');
      console.error('Error fetching about data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: '#ff6b6b' }}>⚠️ Error</h2>
        <p style={{ color: '#ff6b6b' }}>{error}</p>
        <button
          onClick={fetchAboutData}
          style={{
            marginTop: '20px',
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
    );
  }

  if (!aboutData) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No data available</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>About</h1>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Name:</strong> {aboutData.name}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Version:</strong> {aboutData.version}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Description:</strong> {aboutData.description}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Author:</strong> {aboutData.author}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Environment:</strong> {aboutData.environment}
        </div>
        <div>
          <strong style={{ color: '#646cff' }}>Uptime:</strong> {aboutData.uptime}
        </div>
      </div>

      <button
        onClick={fetchAboutData}
        style={{
          marginTop: '20px',
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
        🔄 Refresh Data
      </button>
    </div>
  );
}

export default About;

