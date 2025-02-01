import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, DollarSign, MapPin, User, PenTool as Tool, AlertTriangle, Clock, FileText } from 'lucide-react';
import type { Asset } from '../types';

const AssetDetails = () => {
  const { id } = useParams();
  
  // Mock data - replace with actual API call
  const asset: Asset = {
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
    depreciationRate: 25,
    specifications: {
      processor: 'Intel i7-1165G7',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '14" FHD (1920 x 1080)',
    },
    warranty: {
      provider: 'Dell Inc.',
      expiryDate: '2024-01-15',
      terms: '1 year limited hardware warranty',
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{asset.name}</h1>
        <p className="text-gray-500">Asset Tag: {asset.tag}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Asset Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Purchase Date</p>
                  <p className="font-medium">{asset.purchaseDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Purchase Price</p>
                  <p className="font-medium">${asset.purchasePrice}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{asset.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{asset.assignedTo || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(asset.specifications || {}).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-500 capitalize">{key}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Maintenance History</h2>
            {asset.maintenanceHistory.length === 0 ? (
              <p className="text-gray-500">No maintenance records found</p>
            ) : (
              <div className="space-y-4">
                {asset.maintenanceHistory.map((record) => (
                  <div key={record.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-gray-500">{record.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        record.status === 'completed' ? 'bg-green-100 text-green-800' :
                        record.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{record.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Current Status</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    asset.status === 'active' ? 'bg-green-100 text-green-800' :
                    asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {asset.status}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Condition</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    asset.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                    asset.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                    asset.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {asset.condition}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Warranty Information</h2>
            {asset.warranty ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="font-medium">{asset.warranty.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">{asset.warranty.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Terms</p>
                  <p className="text-sm">{asset.warranty.terms}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No warranty information available</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100">
                <Tool size={20} />
                <span>Schedule Maintenance</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-50 text-purple-600 p-2 rounded-lg hover:bg-purple-100">
                <Clock size={20} />
                <span>Request Borrow</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100">
                <MapPin size={20} />
                <span>Request Move</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-yellow-50 text-yellow-600 p-2 rounded-lg hover:bg-yellow-100">
                <AlertTriangle size={20} />
                <span>Report Issue</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-gray-50 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                <FileText size={20} />
                <span>Export Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;