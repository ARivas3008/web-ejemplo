/**
 * @summary Public build configuration. Set only a publishable Logo.dev token here.
 * @author Bernie Aarón Rivas Méndez
 */
/** Public build configuration. Set only a publishable Logo.dev token here. */
export const environment = {
  production: false,
  apiBase: 'http://localhost:3000',
  endpoints: {
    bookstores: '/bookstores',
    stocks: '/book-stocks',
  },
  external: {
    subjectsBase: 'https://openlibrary.org/subjects',
  },
  logoBase: 'https://img.logo.dev',
  logoDomain: 'barnesandnoble.com',
  logoToken: '',
  primeUiLicense: '',
  brand: 'Barnes & Noble',
  brandInitials: 'B&N',
  homeRoute: '/bookstores/overview',
  newRoute: '/inventory/receipts/new',
  sidebar: true,
  sidebarLanguage: false,
  primaryPalette: {
    '50': '{emerald.50}',
    '100': '{emerald.100}',
    '200': '{emerald.200}',
    '300': '{emerald.300}',
    '400': '{emerald.400}',
    '500': '{emerald.500}',
    '600': '{emerald.600}',
    '700': '{emerald.700}',
    '800': '{emerald.800}',
    '900': '{emerald.900}',
    '950': '{emerald.950}',
  },
} as const;
