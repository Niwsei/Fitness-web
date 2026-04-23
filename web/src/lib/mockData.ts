import type { ApiResponse } from './api'

// placehold.co is whitelisted in next.config.ts
const img = (color: string, text: string) => ({
  url: `https://placehold.co/400x400/${color}/ffffff?text=${encodeURIComponent(text)}`,
  isPrimary: true,
})

export const MOCK_PRODUCTS = [
  {
    id: 'm1',
    name: 'Whey Protein Gold Standard',
    slug: 'whey-protein-gold-standard',
    basePrice: 49.99,
    description: 'ໂປຣຕີນ Whey ຄຸນນະພາບສູງ ຊ່ວຍສ້າງກ້າມ ແລະ ຟື້ນຕົວໄວ. ມີ 24g protein ຕໍ່ serving.',
    images: [img('1e40af', 'Whey Protein')],
    variants: [
      { id: 'v1a', name: '1 lbs', price: 29.99, stock: 40 },
      { id: 'v1b', name: '2 lbs', price: 49.99, stock: 55 },
      { id: 'v1c', name: '5 lbs', price: 99.99, stock: 20 },
    ],
    category: { name: 'ໂປຣຕີນ' },
    brand: 'Optimum Nutrition',
    rating: 4.8,
    reviewCount: 1024,
    isFeatured: true,
  },
  {
    id: 'm2',
    name: 'Pre-Workout Fury X',
    slug: 'pre-workout-fury-x',
    basePrice: 39.99,
    description: 'ເພີ່ມພະລັງງານ, ສະມາທິ ແລະ ຄວາມທົນທານ ກ່ອນອອກກຳລັງກາຍ. ມີ Caffeine 200mg + Beta-Alanine.',
    images: [img('ea580c', 'Pre-Workout')],
    variants: [
      { id: 'v2a', name: '30 servings', price: 39.99, stock: 30 },
      { id: 'v2b', name: '60 servings', price: 69.99, stock: 15 },
    ],
    category: { name: 'ກ່ອນອອກກຳລັງ' },
    brand: 'C4 Sport',
    rating: 4.6,
    reviewCount: 512,
    isFeatured: true,
  },
  {
    id: 'm3',
    name: 'Creatine Monohydrate Pure',
    slug: 'creatine-monohydrate-pure',
    basePrice: 24.99,
    description: 'ຄຣີອາຕີນ Monohydrate 100% ບໍລິສຸດ ຊ່ວຍເພີ່ມຄວາມແຂງແຮງ ແລະ ການຟື້ນຕົວ.',
    images: [img('7c3aed', 'Creatine')],
    variants: [
      { id: 'v3a', name: '300g', price: 24.99, stock: 60 },
      { id: 'v3b', name: '500g', price: 34.99, stock: 35 },
    ],
    category: { name: 'ຄຣີອາຕີນ' },
    brand: 'Bulk Supplements',
    rating: 4.7,
    reviewCount: 836,
    isFeatured: false,
  },
  {
    id: 'm4',
    name: 'Daily Multivitamin Elite',
    slug: 'daily-multivitamin-elite',
    basePrice: 19.99,
    description: 'ວິຕາມິນ ແລະ ແຮ່ທາດຄົບຊຸດ ສຳລັບສຸຂະພາບທົ່ວໄປ ແລະ ລະບົບພູມຕ້ານທານ.',
    images: [img('0284c7', 'Multivitamin')],
    variants: [
      { id: 'v4a', name: '60 capsules', price: 19.99, stock: 80 },
      { id: 'v4b', name: '120 capsules', price: 34.99, stock: 45 },
    ],
    category: { name: 'ວິຕາມິນ' },
    brand: 'Garden of Life',
    rating: 4.5,
    reviewCount: 298,
    isFeatured: false,
  },
  {
    id: 'm5',
    name: 'Fat Burner Thermo Pro',
    slug: 'fat-burner-thermo-pro',
    basePrice: 44.99,
    description: 'ເຜົາຜານໄຂມັນ ເພີ່ມ metabolism ແລະ ຄວບຄຸມຄວາມຢາກອາຫານ ດ້ວຍ Green Tea Extract.',
    images: [img('dc2626', 'Fat Burner')],
    variants: [
      { id: 'v5a', name: '60 capsules', price: 44.99, stock: 25 },
    ],
    category: { name: 'ຫຼຸດນ້ຳໜັກ' },
    brand: 'Hydroxycut',
    rating: 4.3,
    reviewCount: 445,
    isFeatured: true,
  },
  {
    id: 'm6',
    name: 'BCAA Recovery Blend',
    slug: 'bcaa-recovery-blend',
    basePrice: 32.99,
    description: 'ກົດອາມິໂນ BCAA 2:1:1 ຊ່ວຍຟື້ນຕົວ, ຫຼຸດ muscle soreness ຫຼັງອອກກຳລັງ.',
    images: [img('0f766e', 'BCAA')],
    variants: [
      { id: 'v6a', name: '30 servings', price: 32.99, stock: 40 },
      { id: 'v6b', name: '60 servings', price: 54.99, stock: 22 },
    ],
    category: { name: 'ຟື້ນຟູຮ່າງກາຍ' },
    brand: 'Scivation',
    rating: 4.6,
    reviewCount: 621,
    isFeatured: false,
  },
  {
    id: 'm7',
    name: 'Casein Protein Night',
    slug: 'casein-protein-night',
    basePrice: 54.99,
    description: 'ໂປຣຕີນ Casein ຍ່ອຍຊ້າ ສຳລັບດື່ມກ່ອນນອນ ຊ່ວຍບຳລຸງກ້າມໃນຕອນກາງຄືນ.',
    images: [img('1e3a5f', 'Casein')],
    variants: [
      { id: 'v7a', name: '2 lbs', price: 54.99, stock: 18 },
      { id: 'v7b', name: '4 lbs', price: 89.99, stock: 10 },
    ],
    category: { name: 'ໂປຣຕີນ' },
    brand: 'Dymatize',
    rating: 4.7,
    reviewCount: 387,
    isFeatured: false,
  },
  {
    id: 'm8',
    name: 'Omega-3 Fish Oil 1000mg',
    slug: 'omega-3-fish-oil',
    basePrice: 15.99,
    description: 'ນ້ຳມັນປາ Omega-3 ຄຸນນະພາບສູງ ສຳລັບສຸຂະພາບຫົວໃຈ, ຂໍ້ຕໍ່ ແລະ ສະໝອງ.',
    images: [img('0369a1', 'Omega-3')],
    variants: [
      { id: 'v8a', name: '90 softgels', price: 15.99, stock: 100 },
      { id: 'v8b', name: '180 softgels', price: 27.99, stock: 70 },
    ],
    category: { name: 'ວິຕາມິນ' },
    brand: 'Nordic Naturals',
    rating: 4.9,
    reviewCount: 1203,
    isFeatured: true,
  },
]

export function getMockProducts(query: {
  page?: number
  limit?: number
  category?: string
  q?: string
  fitnessGoal?: string
  sortBy?: string
  sortOrder?: string
}): ApiResponse<{ products: typeof MOCK_PRODUCTS }> {
  let results = [...MOCK_PRODUCTS]

  if (query.category && query.category !== 'all') {
    const map: Record<string, string> = {
      protein: 'ໂປຣຕີນ',
      'pre-workout': 'ກ່ອນອອກກຳລັງ',
      creatine: 'ຄຣີອາຕີນ',
      vitamins: 'ວິຕາມິນ',
      'weight-loss': 'ຫຼຸດນ້ຳໜັກ',
      recovery: 'ຟື້ນຟູຮ່າງກາຍ',
    }
    const name = map[query.category]
    if (name) results = results.filter((p) => p.category.name === name)
  }

  if (query.q) {
    const q = query.q.toLowerCase()
    results = results.filter((p) =>
      p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    )
  }

  if (query.sortBy === 'price') {
    results.sort((a, b) =>
      query.sortOrder === 'desc' ? b.basePrice - a.basePrice : a.basePrice - b.basePrice
    )
  } else if (query.sortBy === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name))
  }

  const page = query.page ?? 1
  const limit = query.limit ?? 12
  const total = results.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const paged = results.slice((page - 1) * limit, page * limit)

  return {
    success: true,
    data: { products: paged } as any,
    meta: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
  }
}

export function getMockProduct(slug: string): ApiResponse<{ product: (typeof MOCK_PRODUCTS)[0] | undefined }> {
  return { success: true, data: { product: MOCK_PRODUCTS.find((p) => p.slug === slug) } as any }
}
