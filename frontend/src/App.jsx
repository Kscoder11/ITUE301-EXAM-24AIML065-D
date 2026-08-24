// App.jsx — Task 2: React Router configuration + lazy-loaded HRPanel
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ApplyLeavePage from './pages/ApplyLeavePage';
import MyLeavesPage from './pages/MyLeavesPage';

// Task 2: lazy-load HRPanel with React.lazy
const HRPanel = lazy(() => import('./pages/HRPanel'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes — require authentication */}
        <Route path="/apply" element={
          <ProtectedRoute><ApplyLeavePage /></ProtectedRoute>
        } />
        <Route path="/my-leaves" element={
          <ProtectedRoute><MyLeavesPage /></ProtectedRoute>
        } />

        {/* Task 2: lazy-loaded + role-gated HR route */}
        <Route path="/hr" element={
          <ProtectedRoute requiredRole="hr">
            <Suspense fallback={<p style={{ padding: '24px', textAlign: 'center' }}>Loading HR Panel...</p>}>
              <HRPanel />
            </Suspense>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
