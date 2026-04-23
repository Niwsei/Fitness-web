import { Metadata } from 'next'
import { Zap, Clock, AlertTriangle, CheckCircle, FlaskConical, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ຄວາມຮູ້ກ່ຽວກັບ Pre-Workout | FitStore',
  description: 'ຂໍ້ມູນທາງວິທະຍາສາດກ່ຽວກັບອາຫານເສີມກ່ອນອອກກຳລັງກາຍ',
}

const ingredients = [
  {
    name: 'ຄາເຟອີນ (Caffeine)',
    dose: '150–400 mg',
    color: 'orange',
    icon: '⚡',
    summary: 'ສານທີ່ຄົ້ນຄວ້າຫຼາຍທີ່ສຸດໃນໂລກ ທີ່ຊ່ວຍເພີ່ມການປະຕິບັດ',
    research: [
      {
        finding: 'ເພີ່ມຄວາມທົນທານ 12–15% ໃນກິລາ endurance',
        source: 'Graham & Spriet, Journal of Applied Physiology, 1995',
      },
      {
        finding: 'ຫຼຸດຄວາມຮູ້ສຶກເມື່ອຍລ້ານຳ RPE (Rate of Perceived Exertion) ລົງ 5–8%',
        source: 'Doherty & Smith, Journal of Sports Sciences, 2005',
      },
      {
        finding: 'ປັບປຸງການເຕົ້າໂຕຂອງກ້າມ (muscle recruitment) ໃນການຝຶກ strength',
        source: 'Warren et al., Medicine & Science in Sports & Exercise, 2010',
      },
      {
        finding: 'ປະສິດທິພາບສູງສຸດທີ່ 3–6 mg ຕໍ່ kg ນ້ຳໜັກຕົວ',
        source: 'Burke, Applied Physiology, Nutrition, and Metabolism, 2008',
      },
    ],
    mechanism:
      'ຄາເຟອີນ block receptor adenosine ໃນສະໝອງ — adenosine ເປັນສານທີ່ເຮັດໃຫ້ຮູ້ສຶກງ່ວງ. ເມື່ອ block ໄດ້, dopamine ແລະ norepinephrine ເຮັດວຽກໄດ້ດີຂຶ້ນ ເຮັດໃຫ້ຕື່ນຕົວ ແລະ ສຸມໃສ່ໄດ້.',
    warning: 'ບໍ່ຄວນໃຊ້ຫຼາຍກວ່າ 400 mg/ວັນ. ຄວນຢຸດ 4–6 ຊົ່ວໂມງ ກ່ອນນອນ.',
  },
  {
    name: 'ເບຕ້າ-ອາລານີນ (Beta-Alanine)',
    dose: '3.2–6.4 g',
    color: 'red',
    icon: '🔥',
    summary: 'ຊ່ວຍ buffer ກົດ lactic acid ເຮັດໃຫ້ອອກກຳລັງໄດ້ດົນກວ່າ',
    research: [
      {
        finding: 'ເພີ່ມ carnosine ໃນກ້າມ 64% ຫຼັງໃຊ້ 4 ອາທິດ',
        source: 'Hobson et al., Amino Acids, 2012 — meta-analysis 15 studies',
      },
      {
        finding: 'ດີທີ່ສຸດສຳລັບ exercise 1–4 ນາທີ (high-intensity)',
        source: 'Stout et al., International Journal of Sport Nutrition, 2007',
      },
      {
        finding: 'ເພີ່ມ time-to-exhaustion 13–14% ໃນ cycle ergometer tests',
        source: 'Sale et al., International Journal of Sport Nutrition, 2011',
      },
    ],
    mechanism:
      'Beta-alanine ລວມກັບ histidine ສ້າງ carnosine ໃນກ້າມເນື້ອ. Carnosine ຈະດູດຊຶມ H⁺ ions (protons) ທີ່ເຮັດໃຫ້ກ້າມລ້າ ເຮັດໃຫ້ທ່ານຍູ້ຕໍ່ໄດ້ດົນກວ່າ.',
    warning: 'ອາດຮູ້ສຶກ tingling (paresthesia) ຕາມຜິວໜັງ ເປັນເລື່ອງປົກກະຕິ ບໍ່ເປັນອັນຕະລາຍ.',
  },
  {
    name: 'ຊິຕຣູລີນ (L-Citrulline)',
    dose: '6–8 g (citrulline) ຫຼື 8 g (malate 2:1)',
    color: 'orange',
    icon: '💪',
    summary: 'ເພີ່ມ blood flow ແລະ ຫຼຸດ soreness ຫຼັງການຝຶກ',
    research: [
      {
        finding: 'ເພີ່ມຈຳນວນ reps ໃນ bench press ໄດ້ 52.92%',
        source: 'Pérez-Guisado & Jakeman, Journal of Strength & Conditioning Research, 2010',
      },
      {
        finding: 'ຫຼຸດ muscle soreness 40% ຫຼັງ 24 ຊົ່ວໂມງ',
        source: 'Pérez-Guisado & Jakeman, 2010',
      },
      {
        finding: 'ເພີ່ມ plasma arginine ແລະ nitric oxide production',
        source: 'Schwedhelm et al., British Journal of Clinical Pharmacology, 2008',
      },
    ],
    mechanism:
      'Citrulline ຖືກ convert ເປັນ arginine ໃນໝາກໄຂ່ຫຼັງ, ແລ້ວ arginine ໃຊ້ສ້າງ nitric oxide (NO). NO ຂະຫຍາຍ blood vessels → ເລືອດ (ອາຫານ + ອົກຊີແຈນ) ໄປຮອດກ້າມໄດ້ຫຼາຍ.',
    warning: 'ຄວນໃຊ້ L-Citrulline ລ້ວນໆ ຫຼື Citrulline Malate (ບໍ່ເອົາ L-Arginine ເພາະດູດຊຶມໄດ້ຊ້າ).',
  },
  {
    name: 'ຄຣີອາຕີນ (Creatine Monohydrate)',
    dose: '3–5 g',
    color: 'red',
    icon: '🏋️',
    summary: 'ສານເສີມທີ່ໄດ້ຮັບການຄົ້ນຄວ້າຫຼາຍທີ່ສຸດ ແລະ ມີປະສິດທິພາບສູງທີ່ສຸດ',
    research: [
      {
        finding: 'ເພີ່ມ strength 8% ແລະ power output 14% ໃນ meta-analysis 22 studies',
        source: 'Lanhers et al., European Journal of Sport Science, 2017',
      },
      {
        finding: 'ດີທີ່ສຸດສຳລັບ short bursts (< 30 ວິນາທີ) ຂອງ max effort',
        source: 'Branch, International Journal of Sport Nutrition, 2003',
      },
      {
        finding: 'ປອດໄພສຳລັບການໃຊ້ໄລຍະຍາວ ໃນຄົນທີ່ສຸຂະພາບດີ',
        source: 'Rawson & Volek, Journal of Strength & Conditioning Research, 2003',
      },
    ],
    mechanism:
      'Creatine ເກັບຮັກສາ phosphate group ໃນກ້າມ. ເມື່ອຕ້ອງການ energy ໄວ (ATP), creatine phosphate ໃຫ້ phosphate ທັນທີ — ເຮັດໃຫ້ ATP ຟື້ນຕົວໄວກວ່າ ໂດຍທີ່ບໍ່ຕ້ອງໃຊ້ oxygen.',
    warning: 'ດື່ມນ້ຳໃຫ້ພຽງພໍ (≥ 2.5 L/ວັນ). ໄລຍະ loading (20 g/ວັນ × 5 ວັນ) ໃຊ້ຫຼື ບໍ່ໃຊ້ ກໍໄດ້ — ຜົນດຽວກັນໃນ 3–4 ອາທິດ.',
  },
  {
    name: 'ທໍລີນ (Taurine)',
    dose: '1–2 g',
    color: 'orange',
    icon: '🧠',
    summary: 'ຊ່ວຍ hydration, ຫຼຸດ oxidative stress ແລະ ສະໜັບສະໜູນ ຫົວໃຈ',
    research: [
      {
        finding: 'ເພີ່ມ VO2max ແລະ time-to-exhaustion ໃນ cyclists',
        source: 'Zhang et al., Amino Acids, 2004',
      },
      {
        finding: 'ຫຼຸດ exercise-induced DNA damage ແລະ oxidative stress',
        source: 'Balshaw et al., Applied Physiology, Nutrition, and Metabolism, 2013',
      },
    ],
    mechanism:
      'Taurine ລົງທະບຽນ cell volume ແລະ electrolyte balance ໃນກ້າມ. ຍັງເປັນ antioxidant ທີ່ປ້ອງກັນ mitochondria ຈາກ free radicals ທີ່ເກີດຈາກການອອກກຳລັງ.',
    warning: 'ປອດໄພສູງ. ຜົນຂ້າງຄຽງຂ້ອນຂ້າງຕໍ່າ.',
  },
  {
    name: 'ວິຕາມິນ B ກຸ່ມ (B-Vitamins)',
    dose: 'ຕາມ %DV ທີ່ label ລະບຸ',
    color: 'red',
    icon: '⚡',
    summary: 'ສຳຄັນຕໍ່ energy metabolism ຢູ່ໃນຂັ້ນຕອນ cellular',
    research: [
      {
        finding: 'B1, B2, B3, B6 ທັງໝົດເປັນ coenzymes ໃນ energy pathways',
        source: 'Kennedy, Nutrients Journal, 2016',
      },
      {
        finding: 'B12 ສຳຄັນຕໍ່ red blood cell formation ແລະ oxygen transport',
        source: 'Stabler, New England Journal of Medicine, 2013',
      },
    ],
    mechanism:
      'B vitamins ບໍ່ໃຫ້ energy ໂດຍກົງ ແຕ່ເປັນ cofactors ທີ່ຊ່ວຍ enzyme ໃນການ convert carbs, fats, proteins ເປັນ ATP ໃຫ້ cell ໃຊ້.',
    warning: 'ຖ້າ pre-workout ຂອງທ່ານມີ B-vitamins ຢູ່ແລ້ວ ອາດບໍ່ຈຳເປັນຕ້ອງ supplement ເພີ່ມ.',
  },
]

const timingGuide = [
  { time: '60 ນາທີ ກ່ອນ', action: 'ກິນ creatine (ຖ້ານຳໃຊ້) ພ້ອມນ້ຳ' },
  { time: '30–45 ນາທີ ກ່ອນ', action: 'ກິນ pre-workout ທົ່ວໄປ (caffeine + beta-alanine + citrulline)' },
  { time: '15–20 ນາທີ ກ່ອນ', action: 'Warm-up, mobility drills, ກຽມຮ່າງກາຍ' },
  { time: 'ລະຫວ່າງ training', action: 'ດື່ມນ້ຳ 200–300 ml ທຸກ 15–20 ນາທີ' },
  { time: 'ຫຼັງ training 30 ນາທີ', action: 'Protein + carbs (anabolic window)' },
]

const safetyWarnings = [
  'ເລີ່ມດ້ວຍ half dose ກ່ອນ ເພື່ອທົດສອບ tolerance',
  'ຢ່າໃຊ້ຖ້າທ່ານມີ ຄວາມດັນໂລຫິດສູງ, ຫົວໃຈ, ຫຼື anxiety',
  'ຢ່າໃຊ້ double dose ແທນ dose ທີ່ລືມ',
  'ບໍ່ຄວນໃຊ້ pre-workout ທຸກວັນ — ໃຫ້ off 1–2 ວັນ/ອາທິດ ເພື່ອ tolerance reset',
  'ກວດ label ຫາ banned substances ຖ້ານຳໄປ compete ໃນກິລາ',
  'ຫ້າມ pre-workout ສຳລັບ ຜູ້ທີ່ອາຍຸຕ່ຳກວ່າ 18 ປີ',
  'ຜູ້ຍິງຖືພາ ຫຼື ໃຫ້ນົມ ຫ້າມໃຊ້',
]

const colorMap: Record<string, string> = {
  orange: 'border-orange-500/30 bg-orange-500/5',
  red: 'border-red-500/30 bg-red-500/5',
}
const badgeColorMap: Record<string, string> = {
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function PreWorkoutKnowledgePage() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-950/40 via-zinc-950 to-zinc-950 py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300 mb-6">
            <FlaskConical className="h-3.5 w-3.5" />
            ຂໍ້ມູນທາງວິທະຍາສາດ — peer-reviewed research
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            ອາຫານເສີມ<span className="text-orange-500"> ກ່ອນອອກກຳລັງກາຍ</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ຄູ່ມືຄົບຖ້ວນ ທີ່ອ້າງອິງຈາກການຄົ້ນຄວ້າທາງວິທະຍາສາດ. ຮຽນຮູ້ວ່າສ່ວນປະກອບໃດໃຊ້ງານ,
            ເຮັດວຽກແນວໃດ, ໃຊ້ຫຼາຍເທົ່າໃດ ແລະ ຄວນລະວັງຫຍັງ.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 space-y-20">

        {/* What is pre-workout */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-black">Pre-Workout ຄືຫຍັງ?</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 text-zinc-300 leading-relaxed space-y-4">
            <p>
              Pre-workout supplement ຫຼື "ອາຫານເສີມກ່ອນອອກກຳລັງ" ແມ່ນສູດທີ່ຜະສົມສ່ວນປະກອບຫຼາຍຊະນິດ
              ທີ່ຖືກຄົ້ນຄວ້າທາງວິທະຍາສາດ ເພື່ອຊ່ວຍ:
            </p>
            <ul className="space-y-2 pl-4">
              {['ເພີ່ມ energy ແລະ ຄວາມຕື່ນຕົວ', 'ຊ່ວຍໃຫ້ກ້າມເນື້ອທຳງານໄດ້ດີຂຶ້ນ',
                'ຫຼຸດຄວາມເໜື່ອຍລ້າ ທຳໃຫ້ training ດົນຂຶ້ນ', 'ເພີ່ມ blood flow ໄປຮອດກ້າມ'].map(b => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-zinc-500 italic">
              ໝາຍເຫດ: Pre-workout ບໍ່ໄດ້ "ສ້າງ" ກ້າມ — ເປັນແຕ່ tool ທີ່ຊ່ວຍໃຫ້ training ຂອງທ່ານ ມີຄຸນນະພາບດີຂຶ້ນ.
              ໂພຊະນາການ + ການພັກ ຍັງສຳຄັນຫຼາຍກວ່າ supplement ສະເໝີ.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-black">ສ່ວນປະກອບຫຼັກ ແລະ ຫຼັກຖານວິທະຍາສາດ</h2>
          </div>
          <div className="space-y-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className={`rounded-2xl border ${colorMap[ing.color]} p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-5">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-3xl">{ing.icon}</span>
                    <div>
                      <h3 className="text-xl font-black">{ing.name}</h3>
                      <p className="text-zinc-400 text-sm mt-0.5">{ing.summary}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shrink-0 ${badgeColorMap[ing.color]}`}>
                    ປະລິມານ: {ing.dose}
                  </span>
                </div>

                {/* Research findings */}
                <div className="mb-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingUp className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm font-semibold text-zinc-300">ຜົນການຄົ້ນຄວ້າ</span>
                  </div>
                  <div className="space-y-3">
                    {ing.research.map((r, i) => (
                      <div key={i} className="bg-zinc-950/60 rounded-xl p-4">
                        <p className="text-sm text-zinc-200 mb-1.5">{r.finding}</p>
                        <p className="text-xs text-zinc-500 italic">{r.source}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mechanism */}
                <div className="mb-4 bg-zinc-900/70 rounded-xl p-4">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">ກົນໄກການທຳງານ</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{ing.mechanism}</p>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-2 text-sm text-amber-300/80">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>{ing.warning}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timing Guide */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-black">ຕາຕະລາງເວລາ ທີ່ດີທີ່ສຸດ</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {timingGuide.map((t, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 ${i < timingGuide.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                <div className="flex items-center gap-2 w-44 shrink-0">
                  <Clock className="h-4 w-4 text-orange-500 shrink-0" />
                  <span className="text-sm font-bold text-orange-400">{t.time}</span>
                </div>
                <span className="text-sm text-zinc-300">{t.action}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-red-500" />
            <h2 className="text-2xl font-black">ຄວາມປອດໄພ — ສິ່ງທີ່ຄວນລະວັງ</h2>
          </div>
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="font-bold text-red-300">ຄຳເຕືອນທີ່ສຳຄັນ</span>
            </div>
            <ul className="space-y-3">
              {safetyWarnings.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to choose */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-black">ເລືອກ Pre-Workout ແນວໃດ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'ເລີ່ມຕົ້ນ (Beginner)', recs: ['Caffeine ≤ 150 mg', 'Citrulline 6 g', 'ບໍ່ຕ້ອງການ creatine (ໃຊ້ແຍກ)'], icon: '🌱' },
              { label: 'ລະດັບກາງ (Intermediate)', recs: ['Caffeine 200 mg', 'Beta-alanine 3.2 g', 'Citrulline 6–8 g', 'Taurine 1 g'], icon: '⚡' },
              { label: 'ລະດັບສູງ (Advanced)', recs: ['Caffeine 300–400 mg', 'Beta-alanine 6 g', 'Citrulline Malate 8 g', 'Creatine 5 g', 'B-Vitamins'], icon: '🔥' },
            ].map((tier) => (
              <div key={tier.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="font-bold text-sm text-zinc-100 mb-3">{tier.label}</h3>
                <ul className="space-y-2">
                  {tier.recs.map(r => (
                    <li key={r} className="text-xs text-zinc-400 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-orange-500 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6 text-center">
          <p className="text-xs text-zinc-500 leading-relaxed">
            ຂໍ້ມູນທັງໝົດນີ້ ອ້າງອິງຈາກ peer-reviewed journals ທີ່ຕີພິມໃນ PubMed ແລະ Google Scholar.
            ກ່ອນໃຊ້ supplement ໃດໆ ຄວນປຶກສາ ແພດ ຫຼື ນັກໂພຊະນາການ ໂດຍສະເພາະ ຖ້າທ່ານມີ ພະຍາດຊຳເຮື້ອ.
            ຂໍ້ມູນນີ້ ໃຊ້ເພື່ອການສຶກສາ ບໍ່ແມ່ນຄຳແນະນຳທາງການແພດ.
          </p>
        </div>
      </div>
    </main>
  )
}
