import React, { useState } from 'react';
import { LayoutDashboard, Box, Key, Building2, Settings, Menu, X, CheckSquare } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-8">FlexAsset</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/dashboard' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a 
                  href="/asset-maintenance" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/asset-maintenance' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Box size={20} />
                  <span>Assets Maintenance</span>
                </a>
              </li>
              <li>
                <a 
                  href="/asset-operations" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/asset-operations' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Box size={20} />
                  <span>Assets Operations</span>
                </a>
              </li>
              <li>
                <a 
                  href="/depreciation" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/depreciation' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Box size={20} />
                  <span>Depreciation</span>
                </a>
              </li>
              <li>
                <a 
                  href="/approvals" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/approvals' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <CheckSquare size={20} />
                  <span>Approvals</span>
                </a>
              </li>
              <li>
                <a 
                  href="/licenses" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/licenses' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Key size={20} />
                  <span>Licenses</span>
                </a>
              </li>
              <li>
                <a 
                  href="/branches" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/branches' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Building2 size={20} />
                  <span>Branches</span>
                </a>
              </li>
              <li>
                <a 
                  href="/settings" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${currentPath === '/settings' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;