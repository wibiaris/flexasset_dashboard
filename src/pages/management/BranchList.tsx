import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Branch } from '../../types';
import Pagination from '../../components/common/Pagination';
import { usePagination } from '../../hooks/usePagination';
import api from '../../utils/api';
import axios from 'axios';

const BranchList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchBranches = async () => {
    try {
      const response = await api.get('/branches');
      setBranches(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 500) {
        console.error('Error fetching branches:', error.message);
      }
    }
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination({
    data: filteredBranches,
    itemsPerPage: 10
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Cabang</h1>
        <button
          onClick={() => navigate('/management/branches/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Tambah Cabang
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari cabang..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">Kode</th>
                  <th className="text-left py-3 px-4">Nama Cabang</th>
                  <th className="text-left py-3 px-4">Lokasi</th>
                  <th className="text-left py-3 px-4">Telepon</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((branch) => (
                  <tr 
                    key={branch.id} 
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/management/branches/${branch.id}`)}
                  >
                    <td className="py-3 px-4 font-medium">{branch.code}</td>
                    <td className="py-3 px-4">{branch.name}</td>
                    <td className="py-3 px-4">{branch.city}, {branch.country}</td>
                    <td className="py-3 px-4">{branch.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {branch.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/management/branches/edit/${branch.id}`)
                          }}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Delete branch:', branch.id)
                          }}
                          className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
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
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BranchList;