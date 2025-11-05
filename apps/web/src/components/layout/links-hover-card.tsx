import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../shared/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../shared/hover-card'

import { SiteRoutes } from '@/constants/routes'

const HOVER_LINKS = [
  { href: SiteRoutes.HOME, label: 'Другие товары' },
  { href: SiteRoutes.HOME, label: 'Новинки' },
  { href: SiteRoutes.HOME, label: 'Завтрак' },
  { href: SiteRoutes.HOME, label: 'Хиты' },
  { href: SiteRoutes.HOME, label: 'На компанию' },
  { href: SiteRoutes.HOME, label: 'Любят дети' },
]

export function LinksHoverCard() {
  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Button
          variant='secondary'
          size='sm'
          className='hover:text-primary hover:bg-foreground/5 flex items-center gap-1 px-1 font-sans leading-none'
        >
          <span className='align-middle'>Ещё</span>
          <ChevronDown className='relative top-[0.6px] size-4 align-middle' />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align='start' className='w-auto py-2 pr-10 pl-3 shadow-sm'>
        <ul className='flex flex-col gap-2 text-sm'>
          {HOVER_LINKS.map(link => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  )
}
