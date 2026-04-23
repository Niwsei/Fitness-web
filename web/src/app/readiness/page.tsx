'use client'
import { useState } from 'react'
import { Metadata } from 'next'

const questions = [
  {
    id: 'sleep',
    label: 'ຄືນນີ້ນອນຫຼາຍຊົ່ວໂມງ?',
    emoji: '😴',
    options: [
      { label: 'ໜ້ອຍກວ່າ 5 ຊົ່ວໂມງ', score: 0, color: 'red' },
      { label: '5–6 ຊົ່ວໂມງ', score: 10, color: 'orange' },
      { label: '7–8 ຊົ່ວໂມງ', score: 25, color: 'green' },
      { label: '9+ ຊົ່ວໂມງ', score: 18, color: 'green' },
    ],
  },
  {
    id: 'soreness',
    label: 'ກ້າມເນື້ອເຈັບຢູ່ຫຼາຍບໍ?',
    emoji: '💪',
    options: [
      { label: 'ເຈັບໜັກ ຂຍັບລຳບາກ', score: 0, color: 'red' },
      { label: 'ເຈັບປານກາງ', score: 8, color: 'orange' },
      { label: 'ເຈັບໜ້ອຍໆ', score: 18, color: 'yellow' },
      { label: 'ບໍ່ເຈັບເລີຍ', score: 25, color: 'green' },
    ],
  },
  {
    id: 'hydration',
    label: 'ມື້ນີ້ດື່ມນ້ຳພໍບໍ?',
    emoji: '💧',
    options: [
      { label: 'ດື່ມໜ້ອຍ — ລືມດື່ມ', score: 0, color: 'red' },
      { label: 'ດື່ມໄດ້ ≥ 1 ລິດ', score: 8, color: 'orange' },
      { label: 'ດື່ມໄດ້ ≥ 2 ລິດ', score: 15, color: 'green' },
    ],
  },
  {
    id: 'food',
    label: 'ກິນຂ້າວ/ອາຫານ ຄົບ 3 ຄາບ ບໍ?',
    emoji: '🍽️',
    options: [
      { label: 'ຍັງບໍ່ທັນກິນ', score: 0, color: 'red' },
      { label: 'ກິນ 1–2 ຄາບ', score: 8, color: 'orange' },
      { label: 'ກິນຄົບ ແລະ ພຽງພໍ', score: 20, color: 'green' },
    ],
  },
  {
    id: 'stress',
    label: 'ມື້ນີ້ຕຶງຄຽດ / ກົດດັນຫຼາຍບໍ?',
    emoji: '🧠',
    options: [
      { label: 'ຫຼາຍຫຼາຍ — ໃຈຟຸ້ງ', score: 0, color: 'red' },
      { label: 'ມີໜ້ອຍໜຶ່ງ', score: 7, color: 'orange' },
      { label: 'ໃຈງຽບ ຜ່ອນຄາຍດີ', score: 15, color: 'green' },
    ],
  },
]

const maxScore = 25 + 25 + 15 + 20 + 15 // 100

function getResult(score: number) {
  const pct = Math.round((score / maxScore) * 100)
  if (pct >= 80) return { label: 'ພ້ອມ 100%! ລຸຍໄດ້ເລີຍ 🔥', sub: 'ຮ່າງກາຍຢູ່ໃນສະພາບດີເລີດ ອອກກຳລັງໜັກໄດ້ເຕັມທີ່', color: 'green', ring: 'ring-green-500', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/40', tip: 'ໃຊ້ Pre-Workout + Creatine ໄດ້ເຕັມ dose' }
  if (pct >= 60) return { label: 'ພ້ອມດີ — ກ່ຽວໄດ້', sub: 'ຮ່າງກາຍໃຊ້ໄດ້ດີ ແຕ່ອາດຫຼຸດ intensity ໜ້ອຍໜຶ່ງ', color: 'orange', ring: 'ring-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/40', tip: 'ດື່ມນ້ຳໃຫ້ຄົບ + Electrolytes ກ່ອນ workout' }
  if (pct >= 40) return { label: 'ຄວນ Light Training', sub: 'ຮ່າງກາຍຍັງບໍ່ທັນຟື້ນຕົວ ລຸດ weight ແລະ ບໍ່ push ໜັກ', color: 'yellow', ring: 'ring-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/40', tip: 'ຍ່າງ, ຍືດ, ຫຼື mobility ແທນ heavy lifting' }
  return { label: 'ຄວນພັກ ມື້ນີ້', sub: 'ຮ່າງກາຍຕ້ອງການ ການພັກ ບໍ່ແມ່ນ workout — ການພັກ ກໍ່ເປັນ progress', color: 'red', ring: 'ring-red-500', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/40', tip: 'ນອນ + ດື່ມນ້ຳ + ກິນ Magnesium ກ່ອນນອນ' }
}

export default function ReadinessPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const answered = Object.keys(answers).length
  const done = answered === questions.length
  const score = Object.values(answers).reduce((a, b) => a + b, 0)
  const pct = Math.round((score / maxScore) * 100)
  const result = done ? getResult(score) : null

  function pick(id: string, s: number) {
    setAnswers(prev => ({ ...prev, [id]: s }))
  }

  function reset() { setAnswers({}) }

  const circumference = 2 * Math.PI * 45
  const dashOffset = circumference - (pct / 100) * circumference

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 py-14 px-4 text-center border-b border-zinc-800">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          ກວດ<span className="text-orange-500">ຮ່າງກາຍ</span>ກ່ອນ workout
        </h1>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto">
          ຕອບ 5 ຄຳຖາມ — ລະບົບຈະບອກວ່ານີ້ຮ່າງກາຍພ້ອມລຸຍ ຫຼື ຄວນພັກ
        </p>
      </section>

      <div className="mx-auto max-w-xl px-4 py-10 space-y-5">

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 shrink-0">{answered}/{questions.length}</span>
        </div>

        {/* Questions */}
        {questions.map((q) => (
          <div key={q.id} className={`rounded-2xl border p-5 transition-all ${answers[q.id] !== undefined ? 'border-orange-500/30 bg-orange-500/5' : 'border-zinc-800 bg-zinc-900'}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{q.emoji}</span>
              <p className="font-semibold text-sm">{q.label}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.score
                const colorClass = selected
                  ? opt.color === 'green' ? 'border-green-500 bg-green-500/15 text-green-300'
                    : opt.color === 'orange' ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                    : opt.color === 'yellow' ? 'border-yellow-500 bg-yellow-500/15 text-yellow-300'
                    : 'border-red-500 bg-red-500/15 text-red-300'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500'
                return (
                  <button
                    key={opt.label}
                    onClick={() => pick(q.id, opt.score)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${colorClass}`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Result */}
        {done && result && (
          <div className={`rounded-2xl border ${result.border} ${result.bg} p-6 text-center mt-4`}>
            {/* Circle score */}
            <div className="flex justify-center mb-5">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={result.color === 'green' ? '#22c55e' : result.color === 'orange' ? '#f97316' : result.color === 'yellow' ? '#eab308' : '#ef4444'}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${result.text}`}>{pct}%</span>
                  <span className="text-[10px] text-zinc-500">ພ້ອມ</span>
                </div>
              </div>
            </div>

            <h2 className={`text-xl font-black mb-1 ${result.text}`}>{result.label}</h2>
            <p className="text-zinc-400 text-sm mb-5">{result.sub}</p>

            <div className="bg-zinc-900/60 rounded-xl px-4 py-3 text-sm text-zinc-300 text-left mb-5">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-1">ຄຳແນະນຳ supplement ມື້ນີ້</span>
              {result.tip}
            </div>

            <button
              onClick={reset}
              className="text-sm text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              ກວດໃໝ່ອີກຄັ້ງ
            </button>
          </div>
        )}

        {!done && (
          <p className="text-center text-xs text-zinc-600 pt-2">ຕອບທຸກຄຳຖາມ ເພື່ອເບິ່ງຜົນ</p>
        )}
      </div>
    </main>
  )
}
