'use client'

import Link from 'next/link'

import { CartSheet } from './cart-sheet'
import { LinksHoverCard } from './links-hover-card'
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

export function NavigationBar() {
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-3 text-sm'>
        <ul className='flex items-center gap-5'>
          {NAV_LINKS.map(link => (
            <li
              key={link.label}
              className='hover:text-primary transition-colors duration-300'
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <LinksHoverCard />
      </div>

      <CartSheet />
    </nav>
  )
}
