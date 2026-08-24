// Task 4 — Thin fetch wrapper with base URL and auth header injection
const API_BASE = 'http://localhost:5000/api/v1';

/**
 * Makes an authenticated API call.
 * @param {string} path  — endpoint path (e.g. '/leaves/my')
 * @param {object} options — fetch options (method, body, etc.)
 * @param {string|null} token — JWT token for Authorization header
 */
export async function apiFetch(path, options = {}, token = null) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
