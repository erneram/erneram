<script setup lang="ts">
/**
 * @view ProjectsView
 * Projects carousel/slider view
 */

import { ref } from 'vue'
import { CardProject } from '@/components/projects'
import { useProjectSlider } from '@/composables'
import { projects } from '@/data'

const sliderContainer = ref<HTMLDivElement | null>(null)

const { currentIndex, slideNext, slidePrev } = useProjectSlider({
  container: sliderContainer,
  projects: [...projects],
})
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-black">
    <div 
      ref="sliderContainer" 
      class="relative w-full h-full"
    >
      <CardProject
        v-for="(project, index) in projects"
        :key="project.id"
        :data="project"
        class="box"
        :class="{ 'z-20': index === currentIndex }"
      />
    </div>

    <!-- Navigation Buttons -->
    <button 
      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl"
      aria-label="Previous project"
      @click="slidePrev"
    >
      ‹
    </button>
    <button 
      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl"
      aria-label="Next project"
      @click="slideNext"
    >
      ›
    </button>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
