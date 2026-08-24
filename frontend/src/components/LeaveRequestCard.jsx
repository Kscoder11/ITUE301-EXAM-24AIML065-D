// Task 1 — LeaveRequestCard: reusable component rendering leave request details
// Accepts props: fromDate, toDate, days, leaveType, reason, status
// Status renders as a coloured pill badge

const STATUS_COLORS = {
  pending:  '#FFC107',
  approved: '#28A745',
  rejected: '#DC3545',
  cancelled: '#6C757D'
};

export default function LeaveRequestCard({ fromDate, toDate, days, leaveType, reason, status }) {
  const badgeColor = STATUS_COLORS[status] || '#6C757D';

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.leaveType}>{leaveType}</span>
        {/* Task 1: coloured pill badge for status */}
        <span style={{ ...styles.badge, backgroundColor: badgeColor }}>
          {status}
        </span>
      </div>
      <div style={styles.details}>
        <p><strong>From:</strong> {new Date(fromDate).toLocaleDateString()}</p>
        <p><strong>To:</strong> {new Date(toDate).toLocaleDateString()}</p>
        <p><strong>Days:</strong> {days}</p>
        <p><strong>Reason:</strong> {reason || '—'}</p>
      </div>
    </div>
  );
}

// Inline styles — keeps component self-contained
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  leaveType: {
    fontWeight: '600',
    fontSize: '16px'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  details: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#444'
  }
};
