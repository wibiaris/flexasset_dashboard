import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Warning } from '@mui/icons-material'

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Warning sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        404 - Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Halaman yang Anda cari mungkin telah dihapus atau dipindahkan.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ textTransform: 'none' }}
      >
        Kembali ke Beranda
      </Button>
    </Container>
  )
}

export default NotFound 