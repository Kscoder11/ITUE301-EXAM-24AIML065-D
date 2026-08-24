// Task 1 + 2 + 4 — MyLeavesPage
// Fetches employee's leave requests from API; renders via LeaveRequestCard
// Includes client-side status filter dropdown
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';
import LeaveRequestCard from '../components/LeaveRequestCard';

export default function MyLeavesPage() {
  const { employee, token } = useAuth();

  // Task 4: three states — leaves, loading, error
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Task 4: client-side status filter
  const [filter, setFilter] = useState('All');

  // Task 4: fetch leaves on mount via useEffect
  useEffect(() => {
    apiFetch('/leaves/my', {}, token)
      .then(data => setLeaves(data.data))
      .catch(err => setError('Failed to load your leave history.'))
      .finally(() => setLoading(false));
  }, [token]);

  // Task 4: filter without new API call
  const filtered = leaves.filter(l => filter === 'All' || l.status === filter.toLowerCase());

  return (
    <div style={styles.container}>
      {/* Task 2: display "Welcome, [Name]" from context */}
      <h2 style={styles.title}>Welcome, {employee?.name || 'Employee'}</h2>

      {/* Task 4: status filter dropdown */}
      <div style={styles.filterRow}>
        <label style={styles.filterLabel}>Filter by status:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
          {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Task 4: loading indicator */}
      {loading && <p style={styles.info}>Loading your leave history...</p>}

      {/* Task 4: error state */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Task 1 + 4: render leave data using LeaveRequestCard */}
      {!loading && !error && filtered.length === 0 && (
        <p style={styles.info}>No leave requests found.</p>
      )}
      {filtered.map(leave => (
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

const styles = {
  container: { maxWidth: '600px', margin: '24px auto', padding: '0 16px' },
  title: { marginBottom: '16px', color: '#1a1a2e' },
  filterRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
  filterLabel: { fontSize: '14px', fontWeight: '500' },
  select: { padding: '6px 10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' },
  info: { fontSize: '14px', color: '#666', textAlign: 'center', padding: '24px 0' },
  error: { fontSize: '14px', color: '#DC3545', textAlign: 'center', padding: '24px 0' }
};
