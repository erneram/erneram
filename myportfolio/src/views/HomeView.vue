<script setup lang="ts">
/**
 * @view HomeView
 * Landing page with welcome message and Bible verse
 */

import { TheWelcome, BibleVerseRandom } from '@/components/home'
</script>

<template>
  <div class="flex flex-col justify-center items-center align-center h-screen items-center">
    <div class="m-4">
      <TheWelcome />
    </div>
    <div class="mt-8">
      <BibleVerseRandom />
    </div>
  </div>
</template>
