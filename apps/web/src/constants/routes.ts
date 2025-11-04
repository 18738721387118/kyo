export const SiteRoutes = {
  HOME: '/',
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const

export type SiteRoute = (typeof SiteRoutes)[keyof typeof SiteRoutes]

export const ApiRoutes = {
  PRODUCTS: '/products',
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
