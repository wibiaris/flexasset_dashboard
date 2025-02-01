import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import AssetMaintenance from './components/AssetMaintenance';
import AssetOperations from './components/AssetOperations';
import Depreciation from './components/Depreciation';
import Layout from './components/Layout';
import AssetDetails from './pages/AssetDetails';
import ApprovalRequests from './pages/ApprovalRequests';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="asset-maintenance" element={<AssetMaintenance />} />
            <Route path="asset-operations" element={<AssetOperations />} />
            <Route path="depreciation" element={<Depreciation />} />
            <Route path="asset/:id" element={<AssetDetails />} />
            <Route path="approvals" element={<ApprovalRequests />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;