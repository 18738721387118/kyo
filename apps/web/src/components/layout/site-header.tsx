'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/shared/button'

import { NavigationBar } from './navigation-bar'
import { SiteRoutes } from '@/constants/routes'

export function SiteHeader() {
  return (
    <header className='bg-background sticky top-0 z-50 w-full'>
      <div className='flex justify-between gap-8 py-8'>
        <section className='flex items-start gap-8'>
          <div className='flex flex-col'>
            <Link href={SiteRoutes.HOME}>
              <Image src='/logo-with-text.svg' alt='Логотип' width={256} height={256} />
            </Link>

            <div className='ml-12.5 flex flex-col text-xs leading-[1.1]'>
              <span className='text-foreground'>Сеть №1 в России</span>
              <span className='text-primary'>по количеству пиццерий</span>
            </div>
          </div>

          <div className='text-md text-foreground leading-[1.1]'>
            <span className='font-semibold'>
              Доставка пиццы <span className='text-primary font-semibold'>Москва</span>
            </span>

            <div className='text-md mt-1 grid w-max cursor-pointer auto-cols-max grid-flow-col items-center gap-1'>
              <span className='flex items-center gap-1'>
                36 мин
                <span className='font-extrabold'>&middot;</span>
                4.78
              </span>
              <Star className='h-3.75 w-3.75 fill-yellow-400 text-yellow-400' />
            </div>
          </div>
        </section>

        <section className='flex items-center gap-6'>
          <div className='flex flex-col items-center gap-1'>
            <Image
              src='/coin.svg'
              alt='Додокоины'
              width={28}
              height={28}
              className='text-foreground'
            />
            <span className='text-foreground text-sm font-semibold'>Додокоины</span>
          </div>

          <Button variant='secondary' size='sm' className='px-4'>
            Войти
          </Button>
        </section>
      </div>

      <NavigationBar />
    </header>
  )
}
