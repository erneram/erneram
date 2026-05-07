/**
 * @fileoverview Contact data
 * Social media and contact information
 */

import type { ContactInfo } from '@/types'

export const contacts: readonly ContactInfo[] = [
  {
    name: 'Ernesto Ascencio',
    img: '/linkedin.png',
    href: 'https://www.linkedin.com/in/ernesto-ascencio-476208314/'
  },
  {
    name: '@Ernesto Ascencio',
    img: '/behance.png',
    href: 'https://www.behance.net/ernestoascencio'
  },
  {
    name: '@erneram',
    img: '/github.png',
    href: 'https://github.com/erneram'
  },
] as const
