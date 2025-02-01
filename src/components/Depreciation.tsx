import React, { useState } from 'react';
import { TrendingDown, AlertTriangle, Ban, ArrowDownToLine, Plus, Calendar } from 'lucide-react';
import type { Asset } from '../types';
import DepreciationForm from './forms/DepreciationForm';
import Pagination from './common/Pagination';
import { usePagination } from '../hooks/usePagination';
import { Link } from 'react-router-dom';

const Depreciation = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'warning' | 'healthy'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Sample data - in a real app, this would come from your backend
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Dell Latitude 5420',
      tag: 'LAP001',
      type: 'hardware',
      purchaseDate: '2022-01-15',
      purchasePrice: 1200,
      currentValue: 600,
      status: 'active',
      location: 'IT Department',
      branchOffice: 'HQ Jakarta',
      condition: 'fair',
      maintenanceHistory: [],
      maintenanceInterval: 'quarterly',
      depreciationRate: 25
    },
    {
      id: '2',
      name: 'HP LaserJet Pro',
      tag: 'PRN002',
      type: 'hardware',
      purchaseDate: '2021-03-20',
      purchasePrice: 800,
      currentValue: 240,
      status: 'active',
      location: 'Finance Department',
      branchOffice: 'HQ Jakarta',
      condition: 'poor',
      maintenanceHistory: [],
      maintenanceInterval: 'quarterly',
      depreciationRate: 30
    }
  ];

  const calculateDepreciationStatus = (asset: Asset) => {
    const purchaseDate = new Date(asset.purchaseDate);
    const today = new Date();
    const ageInYears = (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const valueRatio = asset.currentValue / asset.purchasePrice;

    if (valueRatio < 0.3 || asset.condition === 'poor') return 'critical';
    if (valueRatio < 0.5 || asset.condition === 'fair') return 'warning';
    return 'healthy';
  };

  const calculateRemainingLife = (asset: Asset) => {
    const valueRatio = asset.currentValue / asset.purchasePrice;
    const yearsLeft = (valueRatio / (asset.depreciationRate / 100)).toFixed(1);
    return Math.max(0, parseFloat(yearsLeft));
  };

  const getRecommendation = (asset: Asset) => {
    const status = calculateDepreciationStatus(asset);
    const remainingLife = calculateRemainingLife(asset);

    if (status === 'critical') {
      return 'Recommended for immediate disposal or replacement';
    } else if (status === 'warning') {
      return `Plan replacement within ${remainingLife} years`;
    }
    return 'Continue regular maintenance';
  };

  const filteredAssets = assets.filter(asset => 
    filterStatus === 'all' || calculateDepreciationStatus(asset) === filterStatus
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

  const stats = {
    critical: assets.filter(a => calculateDepreciationStatus(a) === 'critical').length,
    warning: assets.filter(a => calculateDepreciationStatus(a) === 'warning').length,
    healthy: assets.filter(a => calculateDepreciationStatus(a) === 'healthy').length
  };

  const handleDepreciationSubmit = (data: Partial<Asset>) => {
    console.log('Depreciation updated:', data);
    // Here you would typically send this to your backend
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Asset Depreciation Analysis</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Update Depreciation
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <ArrowDownToLine size={20} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to={`/asset/1`} className="cursor-pointer">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-red-700">Critical Assets</h3>
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.critical}</p>
            <p className="text-sm text-red-600">Need immediate attention</p>
          </div>
        </Link>

        <Link to={`/asset/2`} className="cursor-pointer">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-yellow-700">Warning Level</h3>
              <Ban className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.warning}</p>
            <p className="text-sm text-yellow-600">Monitor closely</p>
          </div>
        </Link>

        <Link to={`/asset/3`} className="cursor-pointer">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700">Healthy Assets</h3>
              <TrendingDown className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.healthy}</p>
            <p className="text-sm text-green-600">Normal depreciation</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'all' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setFilterStatus('critical')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'critical' ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterStatus('warning')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'hover:bg-gray-100'
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setFilterStatus('healthy')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'healthy' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
              }`}
            >
              Healthy
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4">Asset</th>
                  <th className="text-left py-3 px-4">Purchase Info</th>
                  <th className="text-left py-3 px-4">Current Value</th>
                  <th className="text-left py-3 px-4">Depreciation Rate</th>
                  <th className="text-left py-3 px-4">Remaining Life</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((asset) => {
                  const status = calculateDepreciationStatus(asset);
                  const remainingLife = calculateRemainingLife(asset);
                  
                  return (
                    <tr key={asset.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/asset/${asset.id}`}>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.tag}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-gray-400" />
                          <span>{asset.purchaseDate}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          ${asset.purchasePrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">
                          ${asset.currentValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {((asset.currentValue / asset.purchasePrice) * 100).toFixed(1)}% of original
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {asset.depreciationRate}% per year
                      </td>
                      <td className="py-3 px-4">
                        {remainingLife} years
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          status === 'critical' ? 'bg-red-100 text-red-800' :
                          status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getRecommendation(asset)}
                      </td>
                    </tr>
                  );
                })}
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

      <DepreciationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleDepreciationSubmit}
      />
    </div>
  );
};

export default Depreciation;