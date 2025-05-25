// src/services/authService.ts
import api from '@/services/api'
import { useRouter } from 'vue-router'


export async function refreshAccessToken(): Promise<string> {
  const router = useRouter()
  const currentRefresh = localStorage.getItem('refresh_token')
  if (!currentRefresh) {
    throw new Error('No refresh token available')
  }

  // Prepara body x-www-form-urlencoded
  const form = new URLSearchParams()
  form.append('grant_type', 'refresh_token')
  form.append('refresh_token', currentRefresh)

  try {
    const response = await api.post(
      '/oauth/token',
      form,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    // armazena os novos tokens
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('refresh_token', response.data.refresh_token)

    return response.data.access_token

  } catch (err: any) {
    // se o refresh falhar (ex.: expirado), limpa e força login
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    await router.push({ name: 'Login' })
    throw new Error('Session expired, please login again')
  }
}

