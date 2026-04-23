import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-0 min-h-[520px] items-center">

          {/* Left — content */}
          <div className="py-16 md:py-24 md:pr-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full px-3 py-1 text-xs font-medium mb-6">
              <Zap className="h-3 w-3 fill-current" />
              ໂປຣໂມຊັ່ນ — ສ່ວນຫຼຸດ 20% ວັນນີ້
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
              FUEL<br />
              YOUR<br />
              <span className="text-orange-500">BEST</span>
            </h1>

            <p className="mt-5 text-zinc-400 text-base max-w-sm leading-relaxed">
              ຜະລິດຕະພັນເສີມຄຸນນະພາບສູງ ສ້າງກ້າມ, ຫຼຸດໄຂມັນ ແລະ ຟື້ນຟູໄວ.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-7" asChild>
                <Link href="/products">ຊື້ດຽວນີ້ <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-12" asChild>
                <Link href="/products">ດູສິນຄ້າ</Link>
              </Button>
            </div>

            <div className="mt-10 flex gap-8">
              {[
                { n: '50+', label: 'ສິນຄ້າ' },
                { n: '10K+', label: 'ລູກຄ້າ' },
                { n: '4.9', label: 'ຄະແນນ' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">{s.n}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="hidden md:flex bg-zinc-900 h-full items-center justify-center relative overflow-hidden">
            {/* Decorative orange bar on left edge */}
            <div className="absolute left-0 top-0 w-1 h-full bg-orange-500" />

            {/* Big product mockup placeholder */}
            <div className="flex flex-col items-center gap-4 px-16">
              <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/20">
                <span className="text-7xl">💪</span>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">Whey Protein Gold</p>
                <p className="text-zinc-400 text-sm">Optimum Nutrition</p>
                <p className="text-orange-400 font-black text-2xl mt-1">$49.99</p>
              </div>
              <div className="flex gap-2 mt-1">
                {['1 lbs', '2 lbs', '5 lbs'].map((v) => (
                  <span key={v} className={`text-xs px-3 py-1 rounded-full border ${v === '2 lbs' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-zinc-700 text-zinc-500'}`}>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-8 right-8 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ຂາຍດີ #1
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
