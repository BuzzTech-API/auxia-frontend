import axios from 'axios'
import { refreshAccessToken } from './auth'

const api = axios.create({
  baseURL: "http://localhost:8000"
})

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken()
        // atualiza header da requisição que falhou
        err.config.headers['Authorization'] = `Bearer ${newToken}`
        return api.request(err.config)
      } catch {
        return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)
export default api;
