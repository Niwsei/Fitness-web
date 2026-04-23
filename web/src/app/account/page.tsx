'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/api'
import { useAuthStore } from '@/stores/auth.store'
import { useLogout } from '@/hooks/useAuth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, User, LogOut, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

const ORDER_STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' }> = {
  PENDING:    { label: 'ລໍຖ້າ',       variant: 'secondary' },
  CONFIRMED:  { label: 'ຢືນຢັນແລ້ວ',  variant: 'default' },
  PROCESSING: { label: 'ກຳລັງດຳເນີນ', variant: 'warning' },
  SHIPPED:    { label: 'ຈັດສົ່ງແລ້ວ', variant: 'default' },
  DELIVERED:  { label: 'ໄດ້ຮັບແລ້ວ',  variant: 'success' },
  CANCELLED:  { label: 'ຍົກເລີກ',     variant: 'destructive' },
}

const FITNESS_GOAL_MAP: Record<string, string> = {
  MUSCLE_GAIN:     'ສ້າງກ້າມ',
  WEIGHT_LOSS:     'ຫຼຸດນ້ຳໜັກ',
  ENDURANCE:       'ຄວາມທົນທານ',
  GENERAL_FITNESS: 'ສຸຂະພາບທົ່ວໄປ',
}

function AccountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'profile'
  const { isAuthenticated, user } = useAuthStore()
  const logout = useLogout()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => get<{ orders: any[] }>('/orders'),
    enabled: isAuthenticated && tab === 'orders',
  })
  const orders = (ordersData as any)?.data?.orders ?? []

  if (!isAuthenticated) return null

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-8">ບັນຊີຂອງຂ້ອຍ</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="md:col-span-1">
          <nav className="space-y-1 rounded-xl border bg-card p-2">
            {[
              { key: 'profile', label: 'ໂປຣໄຟລ໌', icon: User },
              { key: 'orders', label: 'ການສັ່ງຊື້', icon: Package },
            ].map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                href={`/account?tab=${key}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  tab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <Separator className="my-1" />
            <button
              onClick={() => logout.mutate()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              ອອກຈາກລະບົບ
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {tab === 'profile' && (
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <h2 className="font-semibold text-lg">ຂໍ້ມູນໂປຣໄຟລ໌</h2>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'ຊື່', value: user?.firstName },
                  { label: 'ນາມສະກຸນ', value: user?.lastName },
                  { label: 'ອີເມວ', value: user?.email },
                  { label: 'ເປົ້າໝາຍຟິດເນດ', value: user?.fitnessGoal ? (FITNESS_GOAL_MAP[user.fitnessGoal] ?? user.fitnessGoal) : 'ຍັງບໍ່ໄດ້ຕັ້ງ' },
                  { label: 'ພາລະບົດບາດ', value: user?.role },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="font-medium">{value ?? '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">ການສັ່ງຊື້ຂອງຂ້ອຍ</h2>
              {ordersLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-xl border bg-card p-10 text-center">
                  <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-medium text-muted-foreground">ຍັງບໍ່ມີການສັ່ງຊື້</p>
                  <Button className="mt-4" asChild><Link href="/products">ຊື້ດຽວນີ້</Link></Button>
                </div>
              ) : (
                orders.map((order: any) => {
                  const status = ORDER_STATUS_MAP[order.status] ?? { label: order.status, variant: 'secondary' as const }
                  return (
                    <Link
                      key={order.id}
                      href={`/account/orders/${order.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-all"
                    >
                      <Package className="h-10 w-10 text-primary bg-primary/10 rounded-lg p-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm font-mono">{order.orderNumber ?? order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('lo-LA')} · {order.items?.length ?? 0} ລາຍການ
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <p className="font-bold text-sm mt-1">${Number(order.total).toFixed(2)}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto" /></div>}>
      <AccountContent />
    </Suspense>
  )
}
