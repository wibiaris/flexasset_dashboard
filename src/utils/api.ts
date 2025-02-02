import axios from 'axios'
// import { store } from './store'
// import { showError } from './features/error/errorSlice'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      window.location.href = '/500'
    }
    
    // Handle error lainnya
    //store.dispatch(showError(error.response?.data?.message || 'Terjadi kesalahan'))
    
    return Promise.reject(error)
  }
)

export default api 