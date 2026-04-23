import Link from 'next/link'
import { Dumbbell } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-2">
            <Link href="/" className="flex items-center gap-1.5 font-bold text-primary">
              <Dumbbell className="h-4 w-4" />
              FitStore
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ຜະລິດຕະພັນເສີມຊັ້ນນຳ ສຳລັບທຸກເປົ້າໝາຍ.
            </p>
          </div>

          <div>
            <p className="font-medium text-sm mb-2">ສິນຄ້າ</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                { href: '/products?category=protein', label: 'ໂປຣຕີນ' },
                { href: '/products?category=pre-workout', label: 'ກ່ອນອອກກຳລັງ' },
                { href: '/products?category=creatine', label: 'ຄຣີອາຕີນ' },
                { href: '/products?category=vitamins', label: 'ວິຕາມິນ' },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-foreground">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm mb-2">ບັນຊີ</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="/account" className="hover:text-foreground">ບັນຊີຂອງຂ້ອຍ</Link></li>
              <li><Link href="/account?tab=orders" className="hover:text-foreground">ການສັ່ງຊື້</Link></li>
              <li><Link href="/cart" className="hover:text-foreground">ກະຕ່າ</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm mb-2">ຊ່ວຍເຫຼືອ</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground">ນະໂຍບາຍສົ່ງ</Link></li>
              <li><Link href="#" className="hover:text-foreground">ຕິດຕໍ່ພວກເຮົາ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FitStore. ສະຫງວນລິຂະສິດ.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">ຄວາມເປັນສ່ວນຕົວ</Link>
            <Link href="#" className="hover:text-foreground">ຂໍ້ກຳນົດ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
