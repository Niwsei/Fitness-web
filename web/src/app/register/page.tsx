'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRegister } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const schema = z.object({
  firstName: z.string().min(1, 'ກະລຸນາໃສ່ຊື່'),
  lastName: z.string().min(1, 'ກະລຸນາໃສ່ນາມສະກຸນ'),
  email: z.string().email('ອີເມວບໍ່ຖືກຕ້ອງ'),
  password: z.string().min(8, 'ລະຫັດຜ່ານຕ້ອງຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ'),
  fitnessGoal: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const register_ = useRegister()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">ສ້າງບັນຊີ</CardTitle>
        <CardDescription>ເລີ່ມຕົ້ນເສັ້ນທາງຟິດເນດກັບ FitStore</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit((data) => register_.mutate(data))} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">ຊື່</Label>
              <Input id="firstName" placeholder="ສົມ" {...register('firstName')} />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">ນາມສະກຸນ</Label>
              <Input id="lastName" placeholder="ສີລາ" {...register('lastName')} />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">ອີເມວ</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">ລະຫັດຜ່ານ</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="ຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ"
                autoComplete="new-password"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>ເປົ້າໝາຍຟິດເນດ (ທາງເລືອກ)</Label>
            <Select onValueChange={(v) => setValue('fitnessGoal', v)}>
              <SelectTrigger>
                <SelectValue placeholder="ເລືອກເປົ້າໝາຍ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MUSCLE_GAIN">💪 ສ້າງກ້າມ</SelectItem>
                <SelectItem value="WEIGHT_LOSS">🔥 ຫຼຸດນ້ຳໜັກ</SelectItem>
                <SelectItem value="ENDURANCE">🏃 ຄວາມທົນທານ</SelectItem>
                <SelectItem value="GENERAL_FITNESS">🌿 ສຸຂະພາບທົ່ວໄປ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {register_.error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
              {(register_.error as any)?.response?.data?.message ?? 'ການສ້າງບັນຊີລົ້ມເຫຼວ. ກະລຸນາລອງໃໝ່.'}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={register_.isPending}>
            {register_.isPending ? 'ກຳລັງສ້າງບັນຊີ...' : 'ສ້າງບັນຊີ'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            ໂດຍການສ້າງບັນຊີ, ທ່ານຍອມຮັບ{' '}
            <Link href="#" className="text-primary hover:underline">ຂໍ້ກຳນົດການໃຫ້ບໍລິການ</Link>
          </p>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          ມີບັນຊີຢູ່ແລ້ວ?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">ເຂົ້າສູ່ລະບົບ</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
