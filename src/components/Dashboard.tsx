import React from 'react';
import { BarChart3, Package, Building, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Total Assets</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">1,234</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Active Licenses</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-600 mt-2">56</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <BarChart3 className="text-emerald-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Branch Offices</p>
              <p className="text-2xl md:text-3xl font-bold text-indigo-600 mt-2">8</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <Building className="text-indigo-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Pending Actions</p>
              <p className="text-2xl md:text-3xl font-bold text-amber-600 mt-2">12</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <AlertCircle className="text-amber-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Assets</h3>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-gray-600 font-medium">Tag</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Name</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Location</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800">AST001</td>
                  <td className="py-3 text-gray-800">Dell Laptop</td>
                  <td className="py-3 text-gray-800">NYC Office</td>
                  <td><span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Active</span></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800">AST002</td>
                  <td className="py-3 text-gray-800">iPhone 13</td>
                  <td className="py-3 text-gray-800">LA Office</td>
                  <td><span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Maintenance</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Expiring Licenses</h3>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-gray-600 font-medium">Software</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Type</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Expiry</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800">Adobe CC</td>
                  <td className="py-3 text-gray-600">Subscription</td>
                  <td className="py-3 text-gray-800">2024-04-15</td>
                  <td><span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">Expiring Soon</span></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800">Windows 11</td>
                  <td className="py-3 text-gray-600">Perpetual</td>
                  <td className="py-3 text-gray-800">2025-01-01</td>
                  <td><span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;