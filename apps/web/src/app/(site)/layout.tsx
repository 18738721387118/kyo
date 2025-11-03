import { SiteHeader } from '@/components/layout/site-header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8'>
        <SiteHeader />
        {children}
      </div>
    </div>
  )
}
