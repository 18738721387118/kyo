import Image from 'next/image'

import { Card } from '@/components/shared/card'

export function OftenBoughtCard() {
  return (
    <Card className='flex w-1/4 cursor-pointer flex-row items-center gap-4 rounded-xl border-none px-4 py-4 shadow-[0_0_25px_0_rgba(0,0,0,0.07)] transition-all duration-300 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]'>
      <div className='shrink-0'>
        <Image
          src='/often-bought.jpg'
          alt='Пепперони фреш'
          width={80}
          height={80}
          className='rounded-full object-cover'
        />
      </div>

      <div className='flex flex-col justify-center'>
        <h3 className='text-md'>Пепперони фреш</h3>
        <p className='text-muted-foreground font-numeric'>от 289 ₽</p>
      </div>
    </Card>
  )
}
