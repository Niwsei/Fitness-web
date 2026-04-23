'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="h-20 w-20 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-2">ສັ່ງຊື້ສຳເລັດ!</h1>
      <p className="text-muted-foreground text-lg mb-2">
        ຂອບໃຈສຳລັບການຊື້ຂອງທ່ານ. ພວກເຮົາຈະດຳເນີນການສັ່ງຊື້ຂອງທ່ານທັນທີ.
      </p>
      {orderId && (
        <p className="text-sm text-muted-foreground mb-8">
          ລະຫັດການສັ່ງຊື້: <span className="font-mono font-medium text-foreground">{orderId}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {orderId && (
          <Button asChild variant="outline">
            <Link href={`/account?tab=orders`}>ເບິ່ງການສັ່ງຊື້</Link>
          </Button>
        )}
        <Button asChild>
          <Link href="/products">ຊື້ຕໍ່ໄປ</Link>
        </Button>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted-foreground">ກຳລັງໂຫຼດ...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
