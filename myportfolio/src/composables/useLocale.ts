/**
 * @fileoverview Locale management composable
 * Application layer - handles language switching logic
 */

import { computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales, setLocale } from '@/i18n'
import type { LocaleOption, SupportedLocale } from '@/types'

interface UseLocaleReturn {
  currentLocale: ComputedRef<SupportedLocale>
  availableLocales: LocaleOption[]
  switchLocale: (locale: SupportedLocale) => void
  t: ReturnType<typeof useI18n>['t']
  rt: ReturnType<typeof useI18n>['rt']
}

export function useLocale(): UseLocaleReturn {
  const { locale, t, rt } = useI18n()

  const currentLocale = computed<SupportedLocale>(() => locale.value as SupportedLocale)

  const switchLocale = (newLocale: SupportedLocale): void => {
    if (newLocale !== currentLocale.value) {
      setLocale(newLocale)
    }
  }

  return {
    currentLocale,
    availableLocales,
    switchLocale,
    t,
    rt,
  }
}
