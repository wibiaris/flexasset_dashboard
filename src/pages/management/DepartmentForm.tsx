import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

interface DepartmentFormValues {
  name: string
  code: string
  description: string
  branchId: string
}

const DepartmentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  // Mock branches - replace with API call
  const branches = [
    { id: '1', name: 'HQ Jakarta' },
    { id: '2', name: 'Cabang Bandung' }
  ]

  const formik = useFormik<DepartmentFormValues>({
    initialValues: {
      name: '',
      code: '',
      description: '',
      branchId: ''
    },
    onSubmit: (values) => {
      console.log('Submitted:', values)
      navigate('/management/departments')
    }
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit Departemen' : 'Buat Departemen Baru'}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Nama Departemen"
          fullWidth
          margin="normal"
          required
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Kode Departemen"
          fullWidth
          margin="normal"
          required
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
        />
        
        <TextField
          label="Deskripsi"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Cabang</InputLabel>
          <Select
            name="branchId"
            value={formik.values.branchId}
            onChange={formik.handleChange}
            label="Cabang"
            required
          >
            {branches.map(branch => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
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
          onClick={() => navigate('/management/departments')}
        >
          Batal
        </Button>
      </div>
    </Box>
  )
}

export default DepartmentForm 