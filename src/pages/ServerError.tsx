import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ErrorOutline } from '@mui/icons-material'

const ServerError = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <ErrorOutline sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        500 - Kesalahan Server
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Terjadi kesalahan pada server. Silakan coba lagi beberapa saat.
      </Typography>
      <div className="flex gap-4 justify-center">
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ textTransform: 'none' }}
        >
          Coba Lagi
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          sx={{ textTransform: 'none' }}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </Container>
  )
}

export default ServerError 