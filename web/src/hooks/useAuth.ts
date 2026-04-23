'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { post, get } from '@/lib/api'
import { useAuthStore } from '@/stores/auth.store'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      post<{ user: Parameters<typeof setAuth>[0]; accessToken: string }>('/auth/login', input),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.accessToken)
      router.push('/')
    },
  })
}

export function useRegister() {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (input: object) =>
      post<{ user: Parameters<typeof setAuth>[0]; accessToken: string }>('/auth/register', input),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.accessToken)
      router.push('/')
    },
  })
}

export function useLogout() {
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: () => post('/auth/logout'),
    onSettled: () => { logout(); queryClient.clear(); router.push('/login') },
  })
}

export function useProfile() {
  const { isAuthenticated } = useAuthStore()
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => get<{ user: object }>('/auth/me'),
    enabled: isAuthenticated,
  })
}
