'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../shared/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../shared/hover-card'

import { SiteRoutes } from '@/constants/routes'

const NAV_LINKS = [
  { href: SiteRoutes.HOME, label: 'Комбо' },
  { href: SiteRoutes.HOME, label: 'Пиццы' },
  { href: SiteRoutes.HOME, label: 'Римские пиццы' },
  { href: SiteRoutes.HOME, label: 'Закуски' },
  { href: SiteRoutes.HOME, label: 'Кофе' },
  { href: SiteRoutes.HOME, label: 'Напитки' },
  { href: SiteRoutes.HOME, label: 'Коктейли' },
  { href: SiteRoutes.HOME, label: 'Десерты' },
  { href: SiteRoutes.HOME, label: 'Соусы' },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DROPDOWN_LINKS = [
  { href: SiteRoutes.HOME, label: 'Другие товары' },
  { href: SiteRoutes.HOME, label: 'Новинки' },
  { href: SiteRoutes.HOME, label: 'Завтрак' },
  { href: SiteRoutes.HOME, label: 'Хиты' },
  { href: SiteRoutes.HOME, label: 'На компанию' },
  { href: SiteRoutes.HOME, label: 'Любят дети' },
]

export function NavigationBar() {
  return (
    <nav className='flex gap-3 text-sm'>
      <ul className='flex items-center gap-6'>
        {NAV_LINKS.map(link => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <HoverCard openDelay={150} closeDelay={150}>
        <HoverCardTrigger asChild>
          <Button
            variant='secondary'
            size='sm'
            className='hover:text-primary hover:bg-foreground/5 flex items-center gap-1 font-sans leading-none'
          >
            <span className='align-middle'>Ещё</span>
            <ChevronDown className='relative top-[0.6px] size-4 align-middle' />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className='flex justify-between gap-4 bg-gray-100'>
            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>@nextjs</h4>
              <p className='text-sm'>
                The React Framework – created and maintained by @vercel.
              </p>
              <div className='text-muted-foreground text-xs'>Joined December 2021</div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </nav>
  )
}
