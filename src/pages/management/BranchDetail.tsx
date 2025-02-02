import { useParams } from 'react-router-dom'
import { Box, Typography, Chip, Button } from '@mui/material'
import { Edit2, ArrowLeft } from 'lucide-react'

const BranchDetail = () => {
  const { id } = useParams()
  
  // Mock data - replace with API call
  const branch = {
    id: '1',
    name: 'HQ Jakarta',
    code: 'HQ-JKT',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta',
    country: 'Indonesia',
    phone: '+62 21 1234567',
    email: 'hq.jakarta@company.com',
    status: 'active',
    managerName: 'John Doe',
    employeeCount: 150,
    assetCount: 450,
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
        <Typography variant="h4">{branch.name}</Typography>
        <Chip
          label={branch.status === 'active' ? 'Aktif' : 'Non-Aktif'}
          color={branch.status === 'active' ? 'success' : 'error'}
          sx={{ ml: 2 }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h6" gutterBottom className="mb-4">
            Informasi Umum
          </Typography>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Kode Cabang:</span> {branch.code}
            </div>
            <div>
              <span className="font-medium">Lokasi:</span> {branch.city}, {branch.country}
            </div>
            <div>
              <span className="font-medium">Alamat:</span> {branch.address}
            </div>
            <div>
              <span className="font-medium">Telepon:</span> {branch.phone}
            </div>
            <div>
              <span className="font-medium">Email:</span> {branch.email}
            </div>
            <div>
              <span className="font-medium">Tanggal Pembuatan:</span> {branch.createdAt}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h6" gutterBottom className="mb-4">
            Statistik
          </Typography>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Jumlah Karyawan:</span> {branch.employeeCount}
            </div>
            <div>
              <span className="font-medium">Total Aset:</span> {branch.assetCount}
            </div>
            <div>
              <span className="font-medium">Manajer:</span> {branch.managerName}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="contained"
          startIcon={<Edit2 size={20} />}
          onClick={() => window.location.href = `/management/branches/edit/${id}`}
        >
          Edit Cabang
        </Button>
      </div>
    </Box>
  )
}

export default BranchDetail 