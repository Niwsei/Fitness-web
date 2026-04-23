import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />

      {/* Trust strip */}
      <section className="border-t border-zinc-800 bg-zinc-950 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚚', title: 'ຟຣີຄ່າສົ່ງ', desc: 'ຊື້ເກີນ $50' },
              { icon: '🔬', title: 'ກວດຄຸນນະພາບ', desc: 'ທຸກສິນຄ້າ' },
              { icon: '↩️', title: 'ສົ່ງຄືນໄດ້', desc: 'ພາຍໃນ 30 ວັນ' },
              { icon: '🔒', title: 'ຊຳລະປອດໄພ', desc: 'SSL ເຂົ້າລະຫັດ' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-zinc-100">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
