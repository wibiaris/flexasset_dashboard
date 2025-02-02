import { useState } from 'react'
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material'

export default function RoleAccessManagement() {
  const [formData, setFormData] = useState({
    roleName: '',
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  })

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [event.target.name]: event.target.checked
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logika submit ke API
    console.log('Data role:', formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Manajemen Role Access</Typography>
      
      <TextField
        label="Nama Role"
        fullWidth
        margin="normal"
        value={formData.roleName}
        onChange={(e) => setFormData({...formData, roleName: e.target.value})}
      />
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Hak Akses:</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.permissions.create}
              onChange={handlePermissionChange}
              name="create"
            />
          }
          label="Create"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.permissions.read}
              onChange={handlePermissionChange}
              name="read"
            />
          }
          label="Read"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.permissions.update}
              onChange={handlePermissionChange}
              name="update"
            />
          }
          label="Update"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.permissions.delete}
              onChange={handlePermissionChange}
              name="delete"
            />
          }
          label="Delete"
        />
      </FormGroup>
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Simpan Role
      </Button>
    </Box>
  )
} 