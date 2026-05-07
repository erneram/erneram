/**
 * @fileoverview Skills data
 * Programming languages and technologies
 */

import type { Skill } from '@/types'

export const languages: readonly Skill[] = [
  {
    id: 1,
    name: 'Javascript',
    imageSrc: '/js.png',
  },
  {
    id: 2,
    name: 'HTML',
    imageSrc: '/html.png',
  },
  {
    id: 3,
    name: 'CSS',
    imageSrc: '/css.png',
  },
  {
    id: 4,
    name: 'Java',
    imageSrc: '/java.png',
  },
  {
    id: 5,
    name: 'Python',
    imageSrc: '/python.png',
  },
  {
    id: 6,
    name: 'Kotlin',
    imageSrc: '/kotlin.png',
  },
] as const

export const technologies: readonly Skill[] = [
  {
    id: 1,
    name: 'Vue',
    imageSrc: '/vue.png',
  },
  {
    id: 2,
    name: 'React',
    imageSrc: '/React.png',
  },
  {
    id: 3,
    name: 'Android Studio',
    imageSrc: '/android-studio.png',
  },
] as const
