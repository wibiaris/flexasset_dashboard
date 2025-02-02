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
import CreateMaintenanceRequest from './pages/CreateMaintenanceRequest';
import CreateAsset from './pages/CreateAsset';
import UpdateDepreciation from './pages/UpdateDepreciation';
import BranchList from './pages/management/BranchList';
  {/* import BranchForm from './pages/management/BranchForm';
import DepartmentList from './pages/management/DepartmentList';
import DepartmentForm from './pages/management/DepartmentForm';
import UserList from './pages/management/UserList';
import UserForm from './pages/management/UserForm';
import RoleList from './pages/management/RoleList';
import RoleForm from './pages/management/RoleForm';*/}

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
            <Route path="asset-maintenance/create" element={<CreateMaintenanceRequest />} />
            <Route path="asset-operations" element={<AssetOperations />} />
            <Route path="asset-operations/create" element={<CreateAsset />} />
            <Route path="depreciation" element={<Depreciation />} />
            <Route path="depreciation/update" element={<UpdateDepreciation />} />
            <Route path="asset/:id" element={<AssetDetails />} />
            <Route path="approvals" element={<ApprovalRequests />} />
            
            {/* Management Routes
            <Route path="management">
              <Route path="branches" element={<BranchList />} />
              <Route path="branches/create" element={<BranchForm />} />
              <Route path="branches/edit/:id" element={<BranchForm />} />
              
              <Route path="departments" element={<DepartmentList />} />
              <Route path="departments/create" element={<DepartmentForm />} />
              <Route path="departments/edit/:id" element={<DepartmentForm />} />
              
              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<UserForm />} />
              <Route path="users/edit/:id" element={<UserForm />} />
              
              <Route path="roles" element={<RoleList />} />
              <Route path="roles/create" element={<RoleForm />} />
              <Route path="roles/edit/:id" element={<RoleForm />} />
            </Route> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;