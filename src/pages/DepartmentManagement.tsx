import { useState } from 'react'
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function DepartmentManagement() {
  const [formData, setFormData] = useState({
    departmentName: '',
    description: '',
    branchId: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logika submit ke API
    console.log('Data departemen:', formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Manajemen Departemen</Typography>
      
      <TextField
        label="Nama Departemen"
        fullWidth
        margin="normal"
        value={formData.departmentName}
        onChange={(e) => setFormData({...formData, departmentName: e.target.value})}
      />
      
      <TextField
        label="Deskripsi"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Cabang</InputLabel>
        <Select
          value={formData.branchId}
          onChange={(e) => setFormData({...formData, branchId: e.target.value})}
        >
          {/* Data cabang bisa diambil dari API */}
          <MenuItem value="1">Cabang Pusat</MenuItem>
          <MenuItem value="2">Cabang Barat</MenuItem>
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Simpan Departemen
      </Button>
    </Box>
  )
} 