'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { post } from '@/lib/api'
import { useAuthStore } from '@/stores/auth.store'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      post<{ user: Parameters<typeof setAuth>[0]; accessToken: string }>('/auth/login', input),
    onSuccess: (res) => {
      const { user, accessToken } = res.data
      if (user.role === 'CUSTOMER') throw new Error('Not authorized')
      setAuth(user, accessToken)
      router.push('/dashboard')
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
