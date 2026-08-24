// Task 1 + 2 + 4 — ApplyLeavePage: leave application form
// Uses useState for form data + computed days (two meaningful state values)
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';

export default function ApplyLeavePage() {
  const { token } = useAuth();

  // Task 2: useState for form fields
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false });

  // Task 2: second meaningful state — computed number of days
  const [days, setDays] = useState(0);

  // Compute days whenever dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const diff = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1;
      setDays(diff > 0 ? diff : 0);
    } else {
      setDays(0);
    }
  }, [fromDate, toDate]);

  // Fetch leave types on mount (public endpoint)
  useEffect(() => {
    apiFetch('/leave-types')
      .then(data => setLeaveTypes(data.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    if (days < 1) {
      setMessage({ text: 'To-date must be on or after from-date', isError: true });
      return;
    }

    try {
      // Task 4: POST to create leave request
      await apiFetch('/leaves', {
        method: 'POST',
        body: JSON.stringify({ leaveTypeId, fromDate, toDate, days, reason })
      }, token);

      setMessage({ text: 'Leave applied successfully!', isError: false });
      // Reset form
      setLeaveTypeId(''); setFromDate(''); setToDate(''); setReason('');
    } catch (err) {
      setMessage({ text: err.message, isError: true });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Apply for Leave</h2>
      {message.text && (
        <p style={{ ...styles.msg, color: message.isError ? '#DC3545' : '#28A745' }}>{message.text}</p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Leave Type
          <select value={leaveTypeId} onChange={e => setLeaveTypeId(e.target.value)} required style={styles.input}>
            <option value="">Select type</option>
            {leaveTypes.map(t => (
              <option key={t._id} value={t._id}>{t.name} (max {t.maxDaysPerYear}/yr)</option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          From Date
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} required style={styles.input} />
        </label>
        <label style={styles.label}>
          To Date
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} required style={styles.input} />
        </label>
        {/* Task 2: display computed days */}
        {days > 0 && <p style={styles.daysInfo}>Number of days: <strong>{days}</strong></p>}
        <label style={styles.label}>
          Reason
          <textarea value={reason} onChange={e => setReason(e.target.value)} maxLength={500} rows={3} style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Submit Application</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '480px', margin: '24px auto', padding: '24px' },
  title: { marginBottom: '16px', color: '#1a1a2e' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  label: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', fontWeight: '500' },
  input: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' },
  daysInfo: { fontSize: '14px', color: '#555' },
  button: {
    padding: '10px', backgroundColor: '#1a1a2e', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
  },
  msg: { fontSize: '14px', textAlign: 'center' }
};
