import Image from 'next/image'

import { Button } from '../shared/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../shared/sheet'

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='default' size='lg'>
          Корзина
        </Button>
      </SheetTrigger>

      <SheetContent className='flex flex-col items-center justify-center text-center'>
        <SheetHeader>
          <Image src='/dog.svg' alt='Cart' width={324} height={324} className='mb-4' />

          <SheetTitle className='mb-2 text-xl font-bold'>Пока тут пусто</SheetTitle>

          <SheetDescription>
            Добавьте пиццу. Или две! <br />А мы доставим ваш заказ от 649 ₽
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
