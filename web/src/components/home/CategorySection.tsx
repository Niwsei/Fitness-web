import Link from 'next/link'

const categories = [
  { name: 'ໂປຣຕີນ',       href: '/products?category=protein',          emoji: '💪', bg: 'bg-blue-950',   accent: 'border-blue-700',   text: 'text-blue-300' },
  { name: 'ກ່ອນອອກກຳລັງ', href: '/knowledge/pre-workout',              emoji: '⚡', bg: 'bg-orange-950', accent: 'border-orange-700', text: 'text-orange-300' },
  { name: 'ຄຣີອາຕີນ',     href: '/products?category=creatine',         emoji: '🏋️', bg: 'bg-purple-950', accent: 'border-purple-700', text: 'text-purple-300' },
  { name: 'ວິຕາມິນ',      href: '/knowledge/vitamins',                 emoji: '🌿', bg: 'bg-teal-950',   accent: 'border-teal-700',   text: 'text-teal-300' },
  { name: 'ຫຼຸດນ້ຳໜັກ',   href: '/products?category=weight-loss',      emoji: '🔥', bg: 'bg-red-950',    accent: 'border-red-700',    text: 'text-red-300' },
  { name: 'ຟື້ນຟູ',        href: '/products?category=recovery',         emoji: '🧪', bg: 'bg-cyan-950',   accent: 'border-cyan-700',   text: 'text-cyan-300' },
]

export function CategorySection() {
  return (
    <section className="py-14 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">ໝວດໝູ່</h2>
          <Link href="/products" className="text-zinc-400 hover:text-white text-sm transition-colors">ທັງໝົດ →</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`${cat.bg} border ${cat.accent} rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:brightness-125 transition-all`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className={`text-xs font-semibold ${cat.text}`}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
