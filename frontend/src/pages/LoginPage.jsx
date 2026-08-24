// Task 1 + 4 — LoginPage: login form that calls POST /api/v1/auth/login
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Task 4: POST to auth/login endpoint
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      // Task 2: update global auth context
      login(data.employee, data.token);
      navigate('/my-leaves');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Employee Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
  form: {
    display: 'flex', flexDirection: 'column', gap: '12px',
    padding: '32px', borderRadius: '8px', backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '320px'
  },
  title: { textAlign: 'center', marginBottom: '8px', color: '#1a1a2e' },
  input: {
    padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px',
    fontSize: '14px', outline: 'none'
  },
  button: {
    padding: '10px', backgroundColor: '#1a1a2e', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  error: { color: '#DC3545', fontSize: '13px', textAlign: 'center' }
};
