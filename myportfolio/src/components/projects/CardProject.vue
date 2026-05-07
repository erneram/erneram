<script setup lang="ts">
/**
 * @component CardProject
 * Individual project card for the carousel
 */

import type { Project } from '@/types'

interface Props {
  data: Project
}

defineProps<Props>()
</script>

<template>
  <div class="box absolute w-full h-full">
    <img
      :src="data.img"
      :alt="data.name"
      class="w-full h-full object-cover"
    />
    <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end text-white z-10">
      <h2 class="text-lg sm:text-2xl font-bold">
        {{ data.name }}
      </h2>
      <a 
        :href="data.href" 
        target="_blank" 
        rel="noopener noreferrer"
        class="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        Ver repositorio
      </a>
    </div>
  </div>
</template>
