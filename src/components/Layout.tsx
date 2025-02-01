import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div className="w-full lg:ml-64 min-h-screen">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;