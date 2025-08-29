import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div 
        style={{
          textAlign: 'center',
          padding: '40px 30px',
          borderRadius: '15px',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '6rem', margin: '0', color: '#007bff' }}>404</h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#555' }}>
          Oops! Page Not Found
        </p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '12px 25px',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            transition: '0.3s',
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
