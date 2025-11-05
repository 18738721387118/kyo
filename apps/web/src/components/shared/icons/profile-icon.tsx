interface ProfileIconProps {
  size?: number
}

export function ProfileIcon({ size = 28 }: ProfileIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 32 32'
      width={size}
      height={size}
      className='transition-transform duration-300 ease-in-out group-hover:-translate-y-1'
    >
      <path
        className='fill-black transition-colors duration-200 group-hover:fill-orange-500'
        fillRule='evenodd'
        d='M16 30a14 14 0 1 0 0-28 14 14 0 0 0 0 28m0-3a11 11 0 0 0 10.98-11.62c-2 .15-4.42.1-6.79-.34-3.38-.62-6.93-2.07-8.86-5.06-2.14 1.62-4.24 3.3-6.29 5.04A11 11 0 0 0 16 27'
        clipRule='evenodd'
      />
      <path
        stroke='#000'
        strokeWidth='2'
        d='M11.7 19.7a1 1 0 1 1-1.4-1.4 1 1 0 0 1 1.4 1.4Zm11 0a1 1 0 1 1-1.4-1.4 1 1 0 0 1 1.4 1.4Z'
      />
    </svg>
  )
}
