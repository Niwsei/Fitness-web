'use client'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            ກະຕ່າ ({items.length})
          </h2>
          <button onClick={closeCart} className="p-2 rounded-md hover:bg-accent transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              <div>
                <p className="font-medium text-muted-foreground">ກະຕ່າສິນຄ້າຫວ່າງ</p>
                <p className="text-sm text-muted-foreground/60 mt-1">ເພີ່ມສິນຄ້າເພື່ອເລີ່ມຕົ້ນ</p>
              </div>
              <Button onClick={closeCart} asChild>
                <Link href="/products">ຊື້ດຽວນີ້</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground/30 text-2xl">🏋️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">{item.productName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="h-6 w-6 rounded border flex items-center justify-center hover:bg-accent transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="h-6 w-6 rounded border flex items-center justify-center hover:bg-accent transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ລວມກ່ອນສ່ວນຫຼຸດ</span>
              <span className="font-semibold">${totalPrice().toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>ລວມທັງໝົດ</span>
              <span className="text-primary text-lg">${totalPrice().toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" asChild onClick={closeCart}>
              <Link href="/checkout">ດຳເນີນການຊຳລະ</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={closeCart} asChild>
              <Link href="/cart">ເບິ່ງກະຕ່າ</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
