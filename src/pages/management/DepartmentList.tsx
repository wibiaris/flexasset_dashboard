import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import { Department } from '../../types'
import Pagination from '../../components/common/Pagination'
import { usePagination } from '../../hooks/usePagination'

const DepartmentList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const departments: Department[] = [
    {
      id: '1',
      name: 'IT Department',
      code: 'DEPT-IT',
      description: 'Information Technology Division',
      branchId: '1',
      branchName: 'HQ Jakarta',
      employeeCount: 25,
      createdAt: '2024-01-01'
    }
  ]

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination({
    data: filteredDepartments,
    itemsPerPage: 10
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Departemen</h1>
        <button
          onClick={() => navigate('/management/departments/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Tambah Departemen
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari departemen..."
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
                  <th className="text-left py-3 px-4">Nama Departemen</th>
                  <th className="text-left py-3 px-4">Cabang</th>
                  <th className="text-left py-3 px-4">Jumlah Karyawan</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((dept) => (
                  <tr 
                    key={dept.id} 
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/management/departments/${dept.id}`)}
                  >
                    <td className="py-3 px-4 font-medium">{dept.code}</td>
                    <td className="py-3 px-4">{dept.name}</td>
                    <td className="py-3 px-4">{dept.branchName}</td>
                    <td className="py-3 px-4">{dept.employeeCount}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/management/departments/edit/${dept.id}`)
                          }}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Delete department:', dept.id)
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
  )
}

export default DepartmentList 