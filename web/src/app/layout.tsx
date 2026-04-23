import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans-variable' })

export const metadata: Metadata = {
  title: { default: 'FitStore — ຜະລິດຕະພັນເສີມຊັ້ນນຳ', template: '%s | FitStore' },
  description: 'ຜະລິດຕະພັນເສີມສຸຂະພາບຊັ້ນນຳ ສຳລັບສ້າງກ້າມ, ຫຼຸດນ້ຳໜັກ, ແລະ ຄວາມທົນທານ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
