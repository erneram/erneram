<script setup lang="ts">
/**
 * @component TheWelcome
 * Main welcome heading component with i18n support
 */

import { useLocale } from '@/composables'

const { t } = useLocale()
</script>

<template>
  <div class="text-center">
    <p class="font-bold text-5xl sm:text-8xl xl:text-9xl text-white font-Yeseva mb-6">
      ascencio.dev
    </p>
    <h1 class="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-semibold mb-4">
      {{ t('home.subtitle') }}
    </h1>
    <p class="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
      {{ t('home.description') }}
    </p>
  </div>
</template>
