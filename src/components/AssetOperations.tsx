import React, { useState } from 'react';
import { PenTool as Tool, AlertTriangle, CheckCircle, Calendar, Plus } from 'lucide-react';
import type { Asset } from '../types';
import Pagination from './common/Pagination';
import { usePagination } from '../hooks/usePagination';
import { Link, useNavigate } from 'react-router-dom';

const AssetOperations = () => {
  const navigate = useNavigate();

  // Sample data - in a real app, this would come from your backend
  const maintenanceAssets: Asset[] = [
    {
      id: '1',
      name: 'CNC Machine',
      tag: 'MCH001',
      type: 'hardware',
      purchaseDate: '2023-01-15',
      purchasePrice: 50000,
      currentValue: 45000,
      status: 'active',
      location: 'Production Floor',
      branchOffice: 'Main Factory',
      maintenanceInterval: 'monthly',
      lastMaintenanceDate: '2024-02-15',
      nextMaintenanceDate: '2024-03-15',
      condition: 'good',
      maintenanceHistory: [],
      depreciationRate: 10
    },
    {
      id: '2',
      name: 'Industrial Printer',
      tag: 'PRN002',
      type: 'hardware',
      purchaseDate: '2023-06-20',
      purchasePrice: 15000,
      currentValue: 13500,
      status: 'maintenance',
      location: 'Print Shop',
      branchOffice: 'Branch A',
      maintenanceInterval: 'quarterly',
      lastMaintenanceDate: '2024-01-20',
      nextMaintenanceDate: '2024-04-20',
      condition: 'fair',
      maintenanceHistory: [],
      depreciationRate: 15
    }
  ];

  const {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
  } = usePagination({
    data: maintenanceAssets,
    itemsPerPage: 10,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Asset Operations</h2>
        <button 
          onClick={() => navigate('/asset-operations/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to={`/asset/1`} className="cursor-pointer">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700">Healthy Assets</h3>
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-700">24</p>
            <p className="text-sm text-green-600">Assets in excellent condition</p>
          </div>
        </Link>

        <Link to={`/asset/2`} className="cursor-pointer">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-yellow-700">Pending Maintenance</h3>
              <Calendar className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-yellow-700">8</p>
            <p className="text-sm text-yellow-600">Due this month</p>
          </div>
        </Link>

        <Link to={`/asset/3`} className="cursor-pointer">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-red-700">Critical Attention</h3>
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-700">3</p>
            <p className="text-sm text-red-600">Overdue maintenance</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4">Asset</th>
                  <th className="text-left py-3 px-4">Tag</th>
                  <th className="text-left py-3 px-4">Last Maintenance</th>
                  <th className="text-left py-3 px-4">Next Due</th>
                  <th className="text-left py-3 px-4">Condition</th>
                  <th className="text-left py-3 px-4">Depreciation Rate</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((asset) => (
                  <tr key={asset.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/asset/${asset.id}`}>
                    <td className="py-3 px-4">{asset.name}</td>
                    <td className="py-3 px-4">{asset.tag}</td>
                    <td className="py-3 px-4">{asset.lastMaintenanceDate}</td>
                    <td className="py-3 px-4">{asset.nextMaintenanceDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        asset.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                        asset.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                        asset.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {asset.condition}
                      </span>
                    </td>
                    <td className="py-3 px-4">{asset.depreciationRate}% / year</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        asset.status === 'active' ? 'bg-green-100 text-green-800' :
                        asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetOperations;