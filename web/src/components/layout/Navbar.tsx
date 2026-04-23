'use client'
import Link from 'next/link'
import { ShoppingCart, Dumbbell, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'
import { useLogout } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/products', label: 'ສິນຄ້າ' },
  { href: '/readiness', label: 'ກວດຮ່າງກາຍ' },
  { href: '/knowledge/pre-workout', label: 'ກ່ອນອອກກຳລັງ' },
  { href: '/knowledge/vitamins', label: 'ວິຕາມິນ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const { totalItems, openCart } = useCartStore()
  const logout = useLogout()
  const count = totalItems()

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 font-black text-lg text-orange-500">
          <Dumbbell className="h-5 w-5" />
          FitStore
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={openCart} className="relative p-2 text-zinc-400 hover:text-white transition-colors" aria-label="ກະຕ່າ">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/account">
                <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">{user?.firstName}</Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" onClick={() => logout.mutate()} disabled={logout.isPending}>
                ອອກ
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">ເຂົ້າ</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">ສະໝັກ</Button>
              </Link>
            </div>
          )}

          <button className="md:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm text-zinc-400 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex gap-2">
            <Link href={isAuthenticated ? '/account' : '/login'} onClick={() => setOpen(false)} className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300">
                {isAuthenticated ? 'ບັນຊີ' : 'ເຂົ້າ'}
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">ສະໝັກ</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
