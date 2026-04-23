'use client'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/cart.store'
import { useAuthStore } from '@/stores/auth.store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { post } from '@/lib/api'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Lock } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(1, 'ກະລຸນາໃສ່ຊື່'),
  lastName: z.string().min(1, 'ກະລຸນາໃສ່ນາມສະກຸນ'),
  email: z.string().email('ອີເມວບໍ່ຖືກຕ້ອງ'),
  phone: z.string().min(7, 'ເບີໂທບໍ່ຖືກຕ້ອງ'),
  addressLine1: z.string().min(1, 'ກະລຸນາໃສ່ທີ່ຢູ່'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'ກະລຸນາໃສ່ເມືອງ'),
  state: z.string().min(1, 'ກະລຸນາໃສ່ແຂວງ'),
  postalCode: z.string().min(3, 'ກະລຸນາໃສ່ລະຫັດໄປສະນີ'),
  country: z.string().min(2, 'ກະລຸນາໃສ່ປະເທດ'),
  discountCode: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
    },
  })

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">ກະຕ່າສິນຄ້າຫວ່າງ.</p>
        <Button asChild><Link href="/products">ຊື້ດຽວນີ້</Link></Button>
      </div>
    )
  }

  const subtotal = totalPrice()
  const shipping = subtotal >= 50 ? 0 : 5
  const total = subtotal + shipping

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)
    try {
      const res = await post<{ orderId: string }>('/orders', {
        items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          phone: data.phone,
        },
        discountCode: data.discountCode || undefined,
      })
      clearCart()
      router.push(`/checkout/success?orderId=${res.data.orderId}`)
    } catch {
      toast({ title: 'ການຊຳລະລົ້ມເຫຼວ', description: 'ກະລຸນາລອງໃໝ່ ຫຼື ຕິດຕໍ່ຝ່າຍສະໜັບສະໜູນ.', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">ຊຳລະເງິນ</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {!isAuthenticated && (
              <div className="rounded-lg bg-orange-50 border border-orange-200 px-4 py-3 text-sm text-orange-800">
                <Link href="/login" className="font-medium underline">ເຂົ້າສູ່ລະບົບ</Link> ສຳລັບການຊຳລະທີ່ໄວຂຶ້ນ ແລະ ຕິດຕາມການສັ່ງຊື້.
              </div>
            )}

            {/* Shipping info */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg">ຂໍ້ມູນການຈັດສົ່ງ</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>ຊື່</Label>
                  <Input placeholder="ສົມ" {...register('firstName')} />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>ນາມສະກຸນ</Label>
                  <Input placeholder="ສີລາ" {...register('lastName')} />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>ອີເມວ</Label>
                  <Input type="email" placeholder="you@example.com" {...register('email')} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>ເບີໂທ</Label>
                  <Input placeholder="+856 20 000 0000" {...register('phone')} />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>ທີ່ຢູ່ 1</Label>
                <Input placeholder="ຖະໜົນ, ເຮືອນ" {...register('addressLine1')} />
                {errors.addressLine1 && <p className="text-xs text-destructive">{errors.addressLine1.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>ທີ່ຢູ່ 2 (ທາງເລືອກ)</Label>
                <Input placeholder="ຫ້ອງ, ຊັ້ນ, ອື່ນໆ" {...register('addressLine2')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>ເມືອງ</Label>
                  <Input placeholder="ວຽງຈັນ" {...register('city')} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>ແຂວງ / ລັດ</Label>
                  <Input placeholder="ນະຄອນຫຼວງ" {...register('state')} />
                  {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>ລະຫັດໄປສະນີ</Label>
                  <Input placeholder="01000" {...register('postalCode')} />
                  {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>ປະເທດ</Label>
                  <Input placeholder="ລາວ" {...register('country')} />
                  {errors.country && <p className="text-xs text-destructive">{errors.country.message}</p>}
                </div>
              </div>
            </div>

            {/* Discount */}
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <h2 className="font-semibold">ລະຫັດສ່ວນຫຼຸດ</h2>
              <div className="flex gap-2">
                <Input placeholder="ໃສ່ລະຫັດ..." {...register('discountCode')} className="max-w-xs" />
                <Button type="button" variant="outline">ນຳໃຊ້</Button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
              <h2 className="font-bold text-lg">ສຸ່ມການສັ່ງຊື້</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3 items-center">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.imageUrl
                        ? <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                        : <div className="h-full flex items-center justify-center text-xl text-muted-foreground/30">🏋️</div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">{item.variantName} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ລວມກ່ອນສ່ວນຫຼຸດ</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ຄ່າຈັດສົ່ງ</span>
                  <span className={shipping === 0 ? 'text-primary font-medium' : ''}>{shipping === 0 ? 'ຟຣີ' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>ລວມທັງໝົດ</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                <Lock className="h-4 w-4" />
                {isSubmitting ? 'ກຳລັງສັ່ງຊື້...' : 'ສັ່ງຊື້'}
              </Button>
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> ຊຳລະດ້ວຍ SSL ທີ່ປອດໄພ
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
