'use client'
import { useState, useCallback } from 'react'

export interface ToastData {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'destructive'
  duration?: number
}

let toastListeners: Array<(toasts: ToastData[]) => void> = []
let toastList: ToastData[] = []

function notify() {
  toastListeners.forEach((fn) => fn([...toastList]))
}

export function toast(data: Omit<ToastData, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  toastList = [...toastList, { ...data, id }]
  notify()
  setTimeout(() => {
    toastList = toastList.filter((t) => t.id !== id)
    notify()
  }, data.duration ?? 4000)
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const subscribe = useCallback((fn: (toasts: ToastData[]) => void) => {
    toastListeners.push(fn)
    return () => { toastListeners = toastListeners.filter((l) => l !== fn) }
  }, [])

  return { toasts, setToasts, subscribe, toast }
}
