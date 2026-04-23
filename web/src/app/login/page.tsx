'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useLogin } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const schema = z.object({
  email: z.string().email('ອີເມວບໍ່ຖືກຕ້ອງ'),
  password: z.string().min(1, 'ກະລຸນາໃສ່ລະຫັດຜ່ານ'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const login = useLogin()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">ຍິນດີຕ້ອນຮັບ</CardTitle>
        <CardDescription>ເຂົ້າສູ່ລະບົບ FitStore ຂອງທ່ານ</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">ອີເມວ</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">ລະຫັດຜ່ານ</Label>
              <Link href="#" className="text-xs text-primary hover:underline">ລືມລະຫັດຜ່ານ?</Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
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

          {login.error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
              {(login.error as any)?.response?.data?.message ?? 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ'}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={login.isPending}>
            {login.isPending ? 'ກຳລັງເຂົ້າ...' : 'ເຂົ້າສູ່ລະບົບ'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          ຍັງບໍ່ມີບັນຊີ?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">ສະໝັກ</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
