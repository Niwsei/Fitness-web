import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10_000,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let queue: Array<{ resolve: (v: string) => void; reject: (r: unknown) => void }> = []

const processQueue = (error: unknown, token: string | null = null) => {
  queue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token!)))
  queue = []
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const req = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !req._retry) {
      if (isRefreshing) return new Promise((resolve, reject) => queue.push({ resolve, reject }))
        .then((token) => { req.headers.Authorization = `Bearer ${token}`; return api(req) })
        .catch(Promise.reject)
      req._retry = true
      isRefreshing = true
      try {
        const res = await api.post<{ data: { accessToken: string } }>('/auth/refresh')
        const token = res.data.data.accessToken
        useAuthStore.getState().setAccessToken(token)
        req.headers.Authorization = `Bearer ${token}`
        processQueue(null, token)
        return api(req)
      } catch (e) {
        processQueue(e)
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean }
}

export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> =>
  (await api.get<ApiResponse<T>>(url, { params })).data

export const post = async <T>(url: string, body?: object): Promise<ApiResponse<T>> =>
  (await api.post<ApiResponse<T>>(url, body)).data

export const patch = async <T>(url: string, body?: object): Promise<ApiResponse<T>> =>
  (await api.patch<ApiResponse<T>>(url, body)).data

export const del = async <T>(url: string): Promise<ApiResponse<T>> =>
  (await api.delete<ApiResponse<T>>(url)).data
