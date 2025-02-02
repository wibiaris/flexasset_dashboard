import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

interface BranchFormValues {
  name: string
  code: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  status: string
}

const BranchForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const formik = useFormik<BranchFormValues>({
    initialValues: {
      name: '',
      code: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      status: 'active'
    },
    onSubmit: (values) => {
      console.log('Submitted:', values)
      navigate('/management/branches')
    }
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit Cabang' : 'Buat Cabang Baru'}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Nama Cabang"
          fullWidth
          margin="normal"
          required
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Kode Cabang"
          fullWidth
          margin="normal"
          required
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Alamat"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          required
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Kota"
          fullWidth
          margin="normal"
          required
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Negara"
          fullWidth
          margin="normal"
          required
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Telepon"
          fullWidth
          margin="normal"
          required
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          required
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            label="Status"
          >
            <MenuItem value="active">Aktif</MenuItem>
            <MenuItem value="inactive">Non-Aktif</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mt-6 flex gap-4">
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Simpan
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/management/branches')}
        >
          Batal
        </Button>
      </div>
    </Box>
  )
}

export default BranchForm 