import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import type { NameData } from '../types/api.types';

function MyName() {
  const [nameData, setNameData] = useState<NameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNameData();
  }, []);

  const fetchNameData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getMyName();
      setNameData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch name data');
      console.error('Error fetching name data:', err);
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
          onClick={fetchNameData}
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

  if (!nameData) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No data available</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>My Name</h1>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Full Name:</strong> {nameData.fullName}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>First Name:</strong> {nameData.firstName}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#646cff' }}>Last Name:</strong> {nameData.lastName}
        </div>
        <div>
          <strong style={{ color: '#646cff' }}>Initials:</strong> {nameData.initials}
        </div>
      </div>

      <button
        onClick={fetchNameData}
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

export default MyName;

