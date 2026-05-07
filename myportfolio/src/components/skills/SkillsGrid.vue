<script setup lang="ts">
/**
 * @component SkillsGrid
 * Reusable grid component for displaying skills
 */

import type { Skill } from '@/types'

interface Props {
  title: string
  skills: readonly Skill[]
}

defineProps<Props>()
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="lowercase my-2 text-gray-400 text-4xl md:text-4xl xl:text-9xl font-semibold font-Lora">
      {{ title }}
    </h1>
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 justify-items-center">
      <a 
        v-for="skill in skills" 
        :key="skill.id" 
        class="group"
      >
        <img 
          :src="skill.imageSrc"
          :alt="skill.name"
          class="aspect-square w-64 h-64 overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3" 
        />
        <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3 class="text-xl text-white font-Lora">
            {{ skill.name }}
          </h3>
        </div>
      </a>
    </div>
  </div>
</template>
