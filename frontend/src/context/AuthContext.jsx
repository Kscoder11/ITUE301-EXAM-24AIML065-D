// Task 2 — AuthContext: holds { employee, token, role } + login/logout
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ employee: null, token: null, role: null });

  // login — called after successful POST /auth/login
  const login = (employee, token) => {
    setAuth({ employee, token, role: employee.role });
  };

  // logout — resets all auth state
  const logout = () => {
    setAuth({ employee: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
