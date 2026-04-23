'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const categories = [
  { value: 'all', label: 'ທຸກໝວດ' },
  { value: 'protein', label: 'ໂປຣຕີນ' },
  { value: 'pre-workout', label: 'ກ່ອນອອກກຳລັງ' },
  { value: 'creatine', label: 'ຄຣີອາຕີນ' },
  { value: 'vitamins', label: 'ວິຕາມິນ' },
  { value: 'weight-loss', label: 'ຫຼຸດນ້ຳໜັກ' },
  { value: 'recovery', label: 'ຟື້ນຟູຮ່າງກາຍ' },
]

const fitnessGoals = [
  { value: 'all', label: 'ທຸກເປົ້າໝາຍ' },
  { value: 'MUSCLE_GAIN', label: 'ສ້າງກ້າມ' },
  { value: 'WEIGHT_LOSS', label: 'ຫຼຸດນ້ຳໜັກ' },
  { value: 'ENDURANCE', label: 'ຄວາມທົນທານ' },
  { value: 'GENERAL_FITNESS', label: 'ສຸຂະພາບທົ່ວໄປ' },
]

const sortOptions = [
  { value: 'createdAt:desc', label: 'ໃໝ່ທີ່ສຸດ' },
  { value: 'price:asc', label: 'ລາຄາ: ຕ່ຳ → ສູງ' },
  { value: 'price:desc', label: 'ລາຄາ: ສູງ → ຕ່ຳ' },
  { value: 'name:asc', label: 'ຊື່ ກ-ຮ' },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }, [router, searchParams])

  const currentCategory = searchParams.get('category') ?? 'all'
  const currentGoal = searchParams.get('fitnessGoal') ?? 'all'
  const currentSort = searchParams.get('sortBy')
    ? `${searchParams.get('sortBy')}:${searchParams.get('sortOrder') ?? 'asc'}`
    : 'createdAt:desc'

  const hasFilters = currentCategory !== 'all' || currentGoal !== 'all'

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">ໝວດ</Label>
        <Select value={currentCategory} onValueChange={(v) => updateParam('category', v)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">ເປົ້າໝາຍ</Label>
        <Select value={currentGoal} onValueChange={(v) => updateParam('fitnessGoal', v)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fitnessGoals.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">ຈັດລຽງ</Label>
        <Select
          value={currentSort}
          onValueChange={(v) => {
            const [sortBy, sortOrder] = v.split(':')
            const params = new URLSearchParams(searchParams.toString())
            params.set('sortBy', sortBy)
            params.set('sortOrder', sortOrder)
            router.push(`/products?${params.toString()}`)
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => router.push('/products')} className="text-muted-foreground">
          ລ້າງຕົວກອງ
        </Button>
      )}
    </div>
  )
}
