import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

export default function BranchManagement() {
  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    address: '',
    phoneNumber: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logika submit ke API
    console.log('Data cabang:', formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Manajemen Cabang</Typography>
      
      <TextField
        label="Nama Cabang"
        fullWidth
        margin="normal"
        value={formData.branchName}
        onChange={(e) => setFormData({...formData, branchName: e.target.value})}
      />
      
      <TextField
        label="Kode Cabang"
        fullWidth
        margin="normal"
        value={formData.branchCode}
        onChange={(e) => setFormData({...formData, branchCode: e.target.value})}
      />
      
      <TextField
        label="Alamat"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.address}
        onChange={(e) => setFormData({...formData, address: e.target.value})}
      />
      
      <TextField
        label="Nomor Telepon"
        fullWidth
        margin="normal"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
      />
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Simpan Cabang
      </Button>
    </Box>
  )
} 