/**
 * @fileoverview Vue I18n configuration
 * Internationalization setup with English and Spanish support
 */

import { createI18n } from 'vue-i18n'
import type { SupportedLocale } from '@/types'
import en from './locales/en.json'
import es from './locales/es.json'

// Get saved language from localStorage or default to English
const savedLocale = localStorage.getItem('portfolio-locale') || 'en'

export const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  legacy: false, // Use Composition API mode
  globalInjection: true,
  messages: {
    en,
    es,
  },
})

export const availableLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export function setLocale(locale: SupportedLocale): void {
  i18n.global.locale.value = locale
  localStorage.setItem('portfolio-locale', locale)
}
