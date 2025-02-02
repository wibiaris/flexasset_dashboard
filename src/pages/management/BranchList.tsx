import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Branch } from '../../types';

const BranchList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  const branches: Branch[] = [
    {
      id: '1',
      name: 'HQ Jakarta',
      code: 'HQ-JKT',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      country: 'Indonesia',
      phone: '+62 21 1234567',
      email: 'hq.jakarta@flexasset.com',
      managerId: '1',
      managerName: 'John Doe',
      employeeCount: 150,
      assetCount: 450,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-03-15'
    },
    // Add more mock data as needed
  ];

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branch Management</h1>
        <button
          onClick={() => navigate('/management/branches/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Branch
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search branches..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4">Branch</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Manager</th>
                  <th className="text-left py-3 px-4">Employees</th>
                  <th className="text-left py-3 px-4">Assets</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="border-t">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{branch.name}</div>
                        <div className="text-sm text-gray-500">{branch.code}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div>{branch.city}</div>
                        <div className="text-sm text-gray-500">{branch.country}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{branch.managerName}</td>
                    <td className="py-3 px-4">{branch.employeeCount}</td>
                    <td className="py-3 px-4">{branch.assetCount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {branch.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/management/branches/edit/${branch.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            // Add delete confirmation
                            console.log('Delete branch:', branch.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;