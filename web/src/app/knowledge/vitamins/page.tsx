import { Metadata } from 'next'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ວິຕາມິນ ສຳຫຼັບນັກກິລາ | FitStore',
  description: 'ວິຕາມິນ ແລະ ແຮ່ທາດ ທີ່ຮ່າງກາຍຕ້ອງການ — ອ່ານເຂົ້າໃຈງ່າຍ',
}

const vitamins = [
  {
    emoji: '☀️',
    name: 'ວິຕາມິນ D',
    nickname: '"ວິຕາມິນດາວ"',
    color: 'orange',
    explain: 'ຮ່າງກາຍຕ້ອງໃຊ້ວິຕາມິນ D ໃນການດູດຊຶມທາດການຊຽມ ເພື່ອສ້າງກະດູກ ແລະ ກ້າມເນື້ອ. ຍັງຊ່ວຍຄວບຄຸມ ຮໍໂມນ ໃນຮ່າງກາຍ ລວມທັງ testosterone ໃນຜູ້ຊາຍ.',
    lack: 'ກ້າມຢ່ອນ, ເໜື່ອຍງ່າຍ, ເປັນໄຂ້ຫວັດເລື້ອຍ, ອາລົມບໍ່ດີ, ກະດູກໜາຍ — ຄົນທີ່ຢູ່ໃນຫ້ອງ ບໍ່ຄ່ອຍໂດນແດດ ມັກຂາດວິຕາມິນນີ້',
    foods: ['ປາ (ປາໂທນາ, ປາແຊນ)', 'ໄຂ່ (ສ່ວນໄຂ່ເຫຼືອງ)', 'ນົມ', 'ອອກໄປໂດນແດດ 15–20 ນາທີ/ວັນ (ດີທີ່ສຸດ)'],
    dose: '1,000–3,000 IU ຕໍ່ວັນ — ກິນພ້ອມອາຫານ',
    tip: 'ຄົນທີ່ນຳໃຊ້ supplement ຄວນກວດ D3 ຮ່ວມກັບ K2 ຍ້ອນຊ່ວຍໃຫ້ທາດການຊຽມໄປສ້ານກະດູກ ບໍ່ໃຊ້ໄປຕົກຄ້າງໃນເສັ້ນເລືອດ',
  },
  {
    emoji: '🍊',
    name: 'ວິຕາມິນ C',
    nickname: '"ຮອ້ງໃຫ້ລູກ"',
    color: 'red',
    explain: 'ວິຕາມິນ C ຊ່ວຍ 3 ຢ່າງ: (1) ສ້ອມແປງກ້າມ ແລະ ເສັ້ນເອັນ (2) ສ້ອມແປງ ພູມຕ້ານທານ ຊ່ວຍໃຫ້ຮ່າງກາຍສູ້ໄຂ້ຫວັດ (3) ຊ່ວຍຮ່າງກາຍດູດຊຶມທາດເຫຼັກ ໄດ້ດີຂຶ້ນ',
    lack: 'ເປັນໄຂ້ຫວັດເລື້ອຍ, ບາດແຜຫາຍຊ້າ, ເໜື່ອຍລ້າ, ເລືອດອອກຕາມ ເຫືອກ',
    foods: ['ຝັ່ງດ່ຽງ (bell pepper) — ອຸດົມທີ່ສຸດ', 'ໝາກກ້ຽງ, ໝາກນາວ', 'ໝາກກີວີ', 'ໝາກເດືອຍ, ຜັກທຸກຊະນິດ'],
    dose: '500–1,000 mg ຕໍ່ວັນ — ກິນພ້ອມອາຫານ',
    tip: 'ຢ່າກິນ Vit C ທັນທີຫຼັງອອກກຳລັງ ຍ້ອນຈະ "ຢຸດ" ສັນຍານ ທີ່ກ້າມໃຊ້ເພື່ອຂະຫຍາຍ — ຄວນກິນໃນຕອນເຊົ້າ ຫຼື ກ່ອນນອນ',
  },
  {
    emoji: '🔋',
    name: 'ແມກນີຊຽມ',
    nickname: '"ຕົວຊ່ວຍ energy"',
    color: 'orange',
    explain: 'ແມກນີຊຽມ ເຮັດວຽກຄ້າຍກັບ ໄຂ machine — ຖ້າບໍ່ໃສ່ ຕົວ machine ກໍ່ຈະວຽກຊ້າ ຫຼື ເຮັດວຽກບໍ່ໄດ້. ຮ່າງກາຍໃຊ້ແມກນີຊຽມ ໃນທຸກຂະບວນການສ້າງພະລັງງານ ແລະ ກ້າມເນື້ອຫຍຸ້ຍ-ຜ່ອນ',
    lack: 'ກ້າມກາຍ (cramp), ນອນຫຼັບຍາກ, ເໜື່ອຍຕຳ, ສ້ຽວໂລ, ຫົວໃຈເຕັ້ນຜິດປົກກະຕິ — ນັກກິລາທີ່ຂຽ່ວ ສູນແມກນີຊຽມທາງ ເຫື່ອ ຫຼາຍ',
    foods: ['ໝາກວໍນັດ', 'ຊັອກໂກແລດດຳ (70%+)', 'ໝາກຖົ່ວ', 'ຜັກສີຂຽວເຂັ້ມ'],
    dose: '300–400 mg ກ່ອນນອນ — ຊ່ວຍຜ່ອນຄາຍ ແລະ ນອນຫຼັບດີ',
    tip: 'ຊື້ Magnesium Glycinate ຫຼື Magnesium Malate — ບໍ່ໃຊ້ Oxide (ຮ່າງກາຍໃຊ້ໄດ້ 4% ເທົ່ານັ້ນ ສ່ວນທີ່ເຫຼືອ ເຮັດໃຫ້ຖ່າຍ)',
  },
  {
    emoji: '🐟',
    name: 'ໂອເມກ້າ 3',
    nickname: '"ໄຂມັນດີ ຈາກປາ"',
    color: 'red',
    explain: 'ໄຂມັນ omega-3 ເປັນ ໄຂມັນທີ່ດີ ທີ່ຮ່າງກາຍ ສ້າງເອງບໍ່ໄດ້ ຕ້ອງໄດ້ຮັບຈາກອາຫານ. ຊ່ວຍຫຼຸດການອັກເສບ (ຄຶ: ຮ່າງກາຍຫຼໍ່ ສ, ບວມ, ເຈັບ ຫຼັງ workout) ແລະ ຊ່ວຍ ສໝອງ + ຫົວໃຈ ທຳງານດີ',
    lack: 'ກ້າມເຈັບດົນ ຫຼາຍກວ່າ 3 ວັນ, ຂໍ້ຕໍ່ negative , ຜິວແຫ້ງ, ສໝອງຊ້າ, ເໜື່ອຍງ່າຍ',
    foods: ['ປາໂທນາ, ປາແຊນ (ດີທີ່ສຸດ)', 'ໄຂ່ omega-3', 'ໝາກວໍນັດ (ໄດ້ຮັບໜ້ອຍກວ່າ)', 'ສຳຫຼັບຜູ້ທີ່ ບໍ່ກິນປາ — ຕ້ອງ supplement ຈາກ ນ້ຳມັນປາ'],
    dose: '2–3 g ຕໍ່ວັນ — ກິນພ້ອມອາຫານ (ຫຼີກລ່ຽງ ກິນທ້ອງຫວ່າງ ຈະ burp ກິ່ນປາ)',
    tip: 'ເລືອກ fish oil ທີ່ label ບອກ EPA+DHA ຊັດເຈນ ບໍ່ໃຊ້ "fish oil 1,000 mg" ອຽ່ງດຽວ ຍ້ອນ ໃນ 1,000 mg ອາດມີ EPA+DHA ແຄ່ 300 mg',
  },
  {
    emoji: '🔴',
    name: 'ວິຕາມິນ B12',
    nickname: '"ວິຕາມິນສ້າງເລືອດ"',
    color: 'orange',
    explain: 'B12 ຊ່ວຍສ້າງ ເມັດເລືອດແດງ ທີ່ນຳ ອົກຊີແຈນ ໄປທົ່ວຮ່າງກາຍ. ຖ້າ ເລືອດ ນຳ oxygen ໄດ້ ໜ້ອຍ → ກ້າມ ໄດ້ energy ໜ້ອຍ → ເໜື່ອຍໄວ ທຳ workout ລຸດ',
    lack: 'ເໜື່ອຍ ທຸກຕອນ ທັງທີ່ ນອນຫຼາຍ, ຫາຍໃຈສັ້ນ ຫຼັງ effort ໜ້ອຍ, ມືຕີນ ຊາ, ຫົວໃຈສັ່ນ — ກຸ່ມສ່ຽງ: ຄົນ vegetarian/vegan ທຸກຄົນ ຕ້ອງ supplement',
    foods: ['ຊີ້ນ, ໄກ່, ປາ', 'ໄຂ່ (ສ່ວນໄຂ່ເຫຼືອງ)', 'ນົມ, ຊີດ', 'ຜູ້ທີ່ ບໍ່ກິນສັດ — ຫາ B12 ຈາກ ອາຫານ ບໍ່ໄດ້ ຕ້ອງ supplement ເທົ່ານັ້ນ'],
    dose: '500–1,000 mcg ຕໍ່ວັນ — ກິນຕອນເຊົ້າ',
    tip: 'ຊື້ Methylcobalamin (ອ່ານວ່າ: methyl-co-ba-la-min) ບໍ່ໃຊ້ Cyanocobalamin — ຮ່າງກາຍ ໃຊ້ methyl ໄດ້ ໂດຍກົງ ໄວກວ່າ',
  },
  {
    emoji: '⚙️',
    name: 'ສັງກະສີ (Zinc)',
    nickname: '"ຕົວຄວບຄຸມ ຮໍໂມນ"',
    color: 'red',
    explain: 'ສັງກະສີ ສຳຄັນຕໍ່ ການສ້າງ testosterone (ຮໍໂມນ ສ້າງກ້າມ) ໃນຜູ້ຊາຍ ແລະ ໃຊ້ ໃນການ ສ້ອມແປງ ເນື້ອເຍື່ອ ຫຼັງ workout ຍັງ ສ້ອມແປງ ລະບົບ ພູມຕ້ານທານ',
    lack: 'ເຈ็ບໜ້ຶງ ຫາຍຊ້າ, ເປັນໄຂ້ຫວັດ ເລື້ອຍ, ຜົມຮ່ວງ, ຜິວ ບໍ່ສະອາດ, ຂາດ testosterone — ນັກກິລາ ສູນ zinc ທາງ ເຫື່ອ ທຸກຄັ້ງທີ່ ຂຽ່ວ',
    foods: ['ຫອຍ oyster (ອຸດົມ zinc ທີ່ສຸດ)', 'ຊີ້ນ ຄ, ໄກ່', 'ໝາກຖົ່ວ pumpkin', 'ໄຂ່'],
    dose: '15–25 mg ຕໍ່ວັນ — ຢ່າກິນ zinc ພ້ອມ ກາເຟ ຫຼື ນົມ ຍ້ອນດູດຊຶມໄດ້ ໜ້ອຍ',
    tip: 'ຊື້ Zinc Bisglycinate ຫຼື Picolinate — ດູດຊຶມດີ ກວ່າ Zinc Oxide ຫຼາຍ. ຢ່າໃຊ້ > 40 mg/ວັນ ດົນໆ ຍ້ອນ ຈະ block ການ ດູດຊຶມ ທອງແດງ',
  },
  {
    emoji: '🩸',
    name: 'ທາດເຫຼັກ (Iron)',
    nickname: '"ຕົວ ສົ່ງ oxygen"',
    color: 'orange',
    explain: 'ທາດເຫຼັກ ຢູ່ໃນ ເມັດເລືອດແດງ ທຳໜ້າທີ່ ດຽວ: ນຳ oxygen ຈາກ ປອດ ໄປ ໃຫ້ ກ້າມ. ຖ້າ ທາດເຫຼັກ ຕ່ຳ ຮ່າງກາຍ ບໍ່ ສາມາດ ສ່ງ oxygen ໃຫ້ ກ້າມ ໄດ້ ພໍ → ຫາຍໃຈ ສ່ວຍ + ເໜື່ອຍ ໄວ ຫຼາຍ',
    lack: 'ເໜື່ອຍ ທັງທີ່ ບໍ່ໄດ້ ເຮັດ ຫຍັງ, ໜ້າ ຊີດ, ຫາຍໃຈ ສ່ວຍ, ຫົວໃຈ ດື, ຊາ ມື — ຜູ້ຍິງ ທີ່ ມີ ປະຈຳ ເດືອນ ສ່ຽງ ສູງ ຫຼາຍ',
    foods: ['ຕັບ ງົວ (ອຸດົມ ທາດ ເຫຼັກ ທີ່ສຸດ)', 'ຊີ້ນ ຄ, ໄກ່', 'ຜັກ ຊີ spinach', 'ກິນ ຄຽງ ກັບ Vit C ຈະ ດູດ ຊຶມ ໄດ້ ດີ ຂຶ້ນ 3 ເທົ່າ'],
    dose: 'ຜູ້ຍິງ: 18 mg/ວັນ — ຜູ້ຊາຍ: 8 mg/ວັນ — ຄວນ ກວດ ເລືອດ ກ່ອນ supplement',
    tip: 'ໂດດ ເດັ່ນ: ຢ່າ ໃຊ້ supplement ທາດ ເຫຼັກ ໂດຍ ບໍ່ ກວດ ເລືອດ ກ່ອນ — ທາດ ເຫຼັກ ເກີນ ອັນຕະລາຍ ກວ່າ ຂາດ',
  },
  {
    emoji: '🦴',
    name: 'ທາດ ການຊຽມ (Calcium)',
    nickname: '"ອາຫານ ກະດູກ"',
    color: 'red',
    explain: 'ທາດ ການ ຊຽມ ບໍ່ ໄດ້ ໃຊ້ ແຕ່ ສ້າງ ກະດູກ — ຍັງ ເປັນ ສັນຍານ ທີ່ ສັ່ງ ໃຫ້ ກ້າມ ໜ້ຶງ ທຸກ ຄັ້ງ ທີ່ ທ່ານ ຍົກ ໄດ. ຖ້າ ທາດ ການ ຊຽມ ຕ່ຳ ກ້າມ ກາຍ + ກະດູກ ອ່ອນ',
    lack: 'ກ້າມ ກາຍ ໂດຍ ສະ ເພາະ ຕອນ ກາງ ຄືນ, ກະດູກ ຢ່ອນ, ຂໍ້ ຕໍ່ ເຈັບ, ຟັນ ໝໍ່ ງ່າຍ — ຜູ້ ຍິງ ໂດຍ ສະ ເພາະ ອາຍຸ 30+ ຄວນ ໃຫ້ ຄວາມ ສຳ ຄັນ',
    foods: ['ນົມ, ໂຍເກີດ, ຊີດ', 'ຜັກ bok choy, ຜັກ ກາດ', 'ປາ ກ້ອງ ທີ່ ກິນ ກ້າງ ໄດ້', 'ໄທ ຟູ (tofu)'],
    dose: '1,000 mg/ວັນ — ແບ່ງ ກິນ 2 ຄັ້ງ ຄັ້ງ ລະ 500 mg ດູດ ຊຶມ ດີ ກວ່າ ກິນ ທີ ດຽວ ໝົດ',
    tip: 'ກິນ ທາດ ການ ຊຽມ ພ້ອມ ວິຕາ ມິນ D — D ຊ່ວຍ ໃຫ້ ຮ່າງ ກາຍ ດູດ ຊຶມ ການ ຊຽມ ໄດ້ ດີ ຂຶ້ນ 40%. ຢ່າ ກິນ ພ້ອມ ທາດ ເຫຼັກ ຍ້ອນ ຂັດ ກັນ',
  },
]

const colorMap: Record<string, { card: string; badge: string; dot: string }> = {
  orange: { card: 'border-orange-500/20 bg-orange-500/5', badge: 'bg-orange-500/15 text-orange-300', dot: 'bg-orange-500' },
  red: { card: 'border-red-500/20 bg-red-500/5', badge: 'bg-red-500/15 text-red-300', dot: 'bg-red-500' },
}

export default function VitaminsPage() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-100">
      {/* Hero */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 py-16 px-4 text-center">
        <p className="text-orange-400 text-sm font-semibold mb-2">ຄູ່ ມື ຄົບ ຖ້ວນ</p>
        <h1 className="text-4xl font-black mb-3">ວິຕາ ມິນ ທີ່ ຮ່າງ ກາຍ ຕ້ອງ ການ</h1>
        <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
          ອ່ານ ຮູ້ ວ່າ ວິຕາ ມິນ ແຕ່ ລະ ຢ່າງ ໃຊ້ ຫຍັງ, ຖ້າ ຂາດ ຈະ ເກີດ ຫຍັງ ຂຶ້ນ ແລະ ຄວນ ໄດ້ ຮັບ ຈາກ ອາຫານ ຫຍັງ
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 space-y-6">
        {vitamins.map((v) => {
          const c = colorMap[v.color]
          return (
            <div key={v.name} className={`rounded-2xl border ${c.card} overflow-hidden`}>
              {/* Top */}
              <div className="flex items-center gap-4 p-6 pb-4">
                <span className="text-5xl">{v.emoji}</span>
                <div>
                  <h2 className="text-xl font-black">{v.name}</h2>
                  <span className={`inline-block text-xs font-medium rounded-full px-3 py-0.5 mt-1 ${c.badge}`}>
                    {v.nickname}
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-5">
                {/* What it does */}
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">ໃຊ້ ຫຍັງ ໃນ ຮ່າງ ກາຍ?</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{v.explain}</p>
                </div>

                {/* If lacking */}
                <div className="bg-zinc-900 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-400 mb-1">ຖ້າ ຮ່າງ ກາຍ ຂາດ...</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{v.lack}</p>
                    </div>
                  </div>
                </div>

                {/* Foods */}
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">ໄດ້ ຈາກ ອາຫານ ຫຍັງ?</p>
                  <div className="flex flex-wrap gap-2">
                    {v.foods.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300">
                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${c.dot}`} />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dose + tip */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <p className="text-xs font-bold text-zinc-400 mb-1">ຄວນ ກິນ ຫຼາຍ ເທົ່າ ໃດ?</p>
                    <p className="text-sm text-zinc-300">{v.dose}</p>
                  </div>
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-orange-400 mb-1">ຄຳ ແນະ ນຳ</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">{v.tip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Simple stack guide */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mt-4">
          <h2 className="text-lg font-black mb-4">ຈະ ເລີ່ມ ຈາກ ໃສ ດີ?</h2>
          <p className="text-sm text-zinc-400 mb-5">ຖ້າ ຍັງ ບໍ່ ຮູ້ ຈະ ເລີ່ມ supplement ຫຍັງ ກ່ອນ — ເລີ່ມ 4 ຢ່າງ ນີ້ ກ່ອນ:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { emoji: '☀️', name: 'ວິຕາ ມິນ D', reason: 'ຄົນ ສ່ວນ ໃຫຍ່ ຂາດ ໂດຍ ບໍ່ ຮູ້ ຕົວ' },
              { emoji: '🐟', name: 'Omega-3', reason: 'ຫຼຸດ ຄວາມ ເຈັບ ໃນ ກ້າມ + ໃຫ້ ດີ ຫຼາຍ ຢ່າງ' },
              { emoji: '🔋', name: 'ແມກ ນີ ຊຽມ', reason: 'ຊ່ວຍ ນອນ ຫຼັບ ດີ + ກ້າມ ບໍ່ ກາຍ' },
              { emoji: '🔴', name: 'ວິຕາ ມິນ B12', reason: 'ສຳ ຄັນ ຫຼາຍ ຖ້າ ບໍ່ ຄ່ອຍ ກິນ ສັດ' },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-4">
                <span className="text-2xl">{s.emoji}</span>
                <div>
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="text-xs text-zinc-500">{s.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 pt-2">
          ຂໍ້ ມູນ ນີ້ ໃຊ້ ເພື່ອ ການ ສຶກ ສາ — ກ່ອນ ໃຊ້ supplement ໃດ ໆ ໂດຍ ສະ ເພາະ ທາດ ເຫຼັກ ຄວນ ກວດ ເລືອດ ກ່ອນ
        </p>
      </div>
    </main>
  )
}
