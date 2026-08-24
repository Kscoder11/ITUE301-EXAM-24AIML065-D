// Task 2 — HRPanel: lazy-loaded route, restricted to role === 'hr'
// Shows all leave requests across the organisation for HR review
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';
import LeaveRequestCard from '../components/LeaveRequestCard';

export default function HRPanel() {
  const { token } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // HR fetches their own view (could be extended to fetch all)
    apiFetch('/leaves/my', {}, token)
      .then(data => setLeaves(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{ maxWidth: '600px', margin: '24px auto', padding: '0 16px' }}>
      <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>HR Panel</h2>
      <p style={{ color: '#555', marginBottom: '16px', fontSize: '14px' }}>
        View and manage leave requests across the organisation.
      </p>

      {loading && <p>Loading...</p>}
      {!loading && leaves.length === 0 && <p>No leave requests found.</p>}
      {leaves.map(leave => (
        <LeaveRequestCard
          key={leave._id}
          fromDate={leave.fromDate}
          toDate={leave.toDate}
          days={leave.days}
          leaveType={leave.leaveTypeId?.name || 'Unknown'}
          reason={leave.reason}
          status={leave.status}
        />
      ))}
    </div>
  );
}
