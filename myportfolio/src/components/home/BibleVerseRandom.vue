<script setup lang="ts">
/**
 * @component BibleVerseRandom
 * Displays a random Bible verse from the collection
 */

import { useBibleVerse, useLocale } from '@/composables'

const { verse } = useBibleVerse()
const { t } = useLocale()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <h2 class="text-white text-xl sm:text-2xl xl:text-3xl font-Josefin mb-4">
      {{ t('home.bibleVerse.title') }}
    </h2>
    
    <div 
      v-if="verse" 
      class="text-center"
    >
      <h3 class="text-gray-300 sm:text-xl xl:text-2xl font-Josefin mb-2">
        {{ verse.ref }}
      </h3>
      <p class="text-white sm:text-lg xl:text-xl font-Yeseva tracking-wider italic">
        "{{ verse.text }}"
      </p>
    </div>
    
    <div 
      v-else 
      class="text-gray-400 text-center"
    >
      <p>{{ t('home.bibleVerse.loading') }}</p>
    </div>
  </div>
</template>
