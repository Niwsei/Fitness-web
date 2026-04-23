'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-2">ກະຕ່າສິນຄ້າຫວ່າງ</h1>
        <p className="text-muted-foreground mb-8">ເພີ່ມສິນຄ້າເພື່ອເລີ່ມຕົ້ນ</p>
        <Button size="lg" asChild>
          <Link href="/products">ຊື້ດຽວນີ້</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">ກະຕ່າສິນຄ້າ</h1>
        <span className="text-muted-foreground text-lg">({totalItems()} ລາຍການ)</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 p-4 rounded-xl border bg-card">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center text-3xl text-muted-foreground/30">🏋️</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold leading-snug">{item.productName}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{item.variantName}</p>
                <p className="text-primary font-bold mt-1">${item.price.toFixed(2)} / ຊິ້ນ</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground gap-1.5">
              <Trash2 className="h-4 w-4" /> ລ້າງກະຕ່າ
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
            <h2 className="font-bold text-lg">ສຸ່ມລາຍການ</h2>
            <Separator />
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.variantId} className="flex justify-between">
                  <span className="text-muted-foreground truncate max-w-[180px]">
                    {item.productName} × {item.quantity}
                  </span>
                  <span className="font-medium ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ລວມກ່ອນສ່ວນຫຼຸດ</span>
              <span className="font-medium">${totalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ຄ່າຈັດສົ່ງ</span>
              <span className={`font-medium ${totalPrice() >= 50 ? 'text-primary' : ''}`}>
                {totalPrice() >= 50 ? 'ຟຣີ' : '$5.00'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>ລວມທັງໝົດ</span>
              <span className="text-primary">
                ${(totalPrice() >= 50 ? totalPrice() : totalPrice() + 5).toFixed(2)}
              </span>
            </div>
            {totalPrice() < 50 && (
              <p className="text-xs text-center text-muted-foreground bg-muted/50 rounded-lg p-2">
                ເພີ່ມ ${(50 - totalPrice()).toFixed(2)} ອີກ ສຳລັບຟຣີຄ່າສົ່ງ!
              </p>
            )}
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">ດຳເນີນການຊຳລະ</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">ຊື້ຕໍ່ໄປ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
