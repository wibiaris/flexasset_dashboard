import React, { useState } from 'react';
import { ClipboardCheck, Search, FileText, AlertCircle, UserCheck, Plus } from 'lucide-react';
import type { Asset, MaintenanceRecord } from '../types';
import Pagination from './common/Pagination';
import { usePagination } from '../hooks/usePagination';
import { Link, useNavigate } from 'react-router-dom';

const AssetMaintenance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - in a real app, this would come from your backend
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Dell Latitude 5420',
      tag: 'LAP001',
      type: 'hardware',
      purchaseDate: '2023-01-15',
      purchasePrice: 1200,
      currentValue: 900,
      status: 'active',
      location: 'IT Department',
      branchOffice: 'HQ Jakarta',
      assignedTo: 'John Doe',
      condition: 'good',
      maintenanceHistory: [],
      maintenanceInterval: 'quarterly',
      depreciationRate: 25
    },
    {
      id: '2',
      name: 'HP LaserJet Pro',
      tag: 'PRN002',
      type: 'hardware',
      purchaseDate: '2023-03-20',
      purchasePrice: 800,
      currentValue: 640,
      status: 'active',
      location: 'Finance Department',
      branchOffice: 'HQ Jakarta',
      assignedTo: 'Finance Team',
      condition: 'excellent',
      maintenanceHistory: [],
      maintenanceInterval: 'quarterly',
      depreciationRate: 20
    }
  ];

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
  } = usePagination({
    data: filteredAssets,
    itemsPerPage: 10,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Asset Maintenance</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/asset-maintenance/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Schedule Maintenance
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <ClipboardCheck size={20} />
            Start Inventory Check
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to={`/asset/1`} className="cursor-pointer">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-700">Total Assets</h3>
              <ClipboardCheck className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-700">156</p>
            <p className="text-sm text-blue-600">Registered in system</p>
          </div>
        </Link>

        <Link to={`/asset/2`} className="cursor-pointer">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700">Verified Assets</h3>
              <UserCheck className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-700">142</p>
            <p className="text-sm text-green-600">Matched with holders</p>
          </div>
        </Link>

        <Link to={`/asset/3`} className="cursor-pointer">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-yellow-700">Pending Verification</h3>
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-yellow-700">14</p>
            <p className="text-sm text-yellow-600">Need physical check</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Asset Inventory</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4">Asset Tag</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Assigned To</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Current Value</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Contract</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((asset) => (
                  <tr key={asset.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/asset/${asset.id}`}>
                    <td className="py-3 px-4 font-medium">{asset.tag}</td>
                    <td className="py-3 px-4">{asset.name}</td>
                    <td className="py-3 px-4">{asset.assignedTo || '-'}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1">
                        {asset.location}
                        <span className="text-sm text-gray-500">({asset.branchOffice})</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      ${asset.currentValue.toLocaleString()}
                      <span className="text-sm text-gray-500 block">
                        Original: ${asset.purchasePrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        asset.status === 'active' ? 'bg-green-100 text-green-800' :
                        asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                        <FileText size={16} />
                        View
                      </button>
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

export default AssetMaintenance;