// Task 2 — Navbar: navigation links using React Router (no full-page reload)
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { employee, role, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Leave Portal</span>
      <div style={styles.links}>
        {!employee ? (
          <Link to="/" style={styles.link}>Login</Link>
        ) : (
          <>
            <Link to="/apply" style={styles.link}>Apply Leave</Link>
            <Link to="/my-leaves" style={styles.link}>My Leaves</Link>
            {/* Task 2: HR link shown only to hr role */}
            {role === 'hr' && <Link to="/hr" style={styles.link}>HR Panel</Link>}
            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1a1a2e',
    color: '#fff'
  },
  brand: { fontWeight: '700', fontSize: '18px' },
  links: { display: 'flex', gap: '16px', alignItems: 'center' },
  link: { color: '#e0e0e0', textDecoration: 'none', fontSize: '14px' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #e0e0e0',
    color: '#e0e0e0',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px'
  }
};
