import { useParams } from 'react-router-dom'
import { Box, Typography, Chip, Button } from '@mui/material'
import { Edit2, ArrowLeft } from 'lucide-react'

const DepartmentDetail = () => {
  const { id } = useParams()
  
  // Mock data
  const department = {
    id: '1',
    name: 'IT Department',
    code: 'DEPT-IT',
    description: 'Information Technology Division',
    branchId: '1',
    branchName: 'HQ Jakarta',
    employeeCount: 25,
    createdAt: '2024-01-01'
  }

  return (
    <Box sx={{ p: 3 }}>
      <div className="flex items-center gap-4 mb-6">
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => window.history.back()}
        >
          Kembali
        </Button>
        <Typography variant="h4">{department.name}</Typography>
        <Chip
          label="Aktif"
          color="success"
          sx={{ ml: 2 }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h6" gutterBottom className="mb-4">
            Informasi Utama
          </Typography>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Kode Departemen:</span> {department.code}
            </div>
            <div>
              <span className="font-medium">Cabang:</span> {department.branchName}
            </div>
            <div>
              <span className="font-medium">Deskripsi:</span> {department.description}
            </div>
            <div>
              <span className="font-medium">Tanggal Pembuatan:</span> {department.createdAt}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h6" gutterBottom className="mb-4">
            Statistik
          </Typography>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Jumlah Karyawan:</span> {department.employeeCount}
            </div>
            <div>
              <span className="font-medium">Jumlah Aset:</span> 45
            </div>
            <div>
              <span className="font-medium">Jumlah Proyek Aktif:</span> 3
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="contained"
          startIcon={<Edit2 size={20} />}
          onClick={() => window.location.href = `/management/departments/edit/${id}`}
        >
          Edit Departemen
        </Button>
      </div>
    </Box>
  )
}

export default DepartmentDetail 