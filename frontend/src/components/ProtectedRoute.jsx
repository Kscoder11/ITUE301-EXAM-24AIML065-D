// Task 2 — ProtectedRoute: redirects unauthenticated users to login
// Optional requiredRole prop gates access by role (e.g. 'hr')
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, role } = useAuth();

  // Not logged in → redirect to login
  if (!token) return <Navigate to="/" replace />;

  // Role check (e.g. for HR panel)
  if (requiredRole && role !== requiredRole) {
    return <p style={{ padding: '24px', color: '#DC3545' }}>Access denied. Required role: {requiredRole}</p>;
  }

  return children;
}
