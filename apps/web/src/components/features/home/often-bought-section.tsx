import { OftenBoughtCard } from './often-bought-card'

export function OftenBoughtSection() {
  return (
    <section>
      <h1 className='font-numeric mb-6 text-2xl font-bold'>Часто заказывают</h1>

      <div className='flex flex-row gap-4'>
        <OftenBoughtCard />
        <OftenBoughtCard />
        <OftenBoughtCard />
      </div>
    </section>
  )
}
