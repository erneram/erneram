<script setup lang="ts">
/**
 * @component App
 * Main application component with star field background
 */

import { ref } from 'vue'
import { useStarField, useScrollTo } from '@/composables'
import {
  NavigationView,
  HomeView,
  AboutView,
  SkillsView,
  ProjectsView,
  ContactMeView,
} from '@/views'
import type { SectionId } from '@/types'

const container = ref<HTMLDivElement | null>(null)

// Initialize star field background
useStarField({ container })

// Scroll functionality
const { scrollToSection } = useScrollTo()

function handleScrollTo(sectionId: SectionId): void {
  scrollToSection(sectionId)
}
</script>

<template>
  <!-- Canvas Background -->
  <div 
    ref="container" 
    class="fixed bg-[#020303] top-0 left-0 w-screen h-screen -z-10 overflow-hidden"
  />

  <!-- Content -->
  <header>
    <NavigationView @scroll-to="handleScrollTo" />
  </header>
  
  <main>
    <div class="scroll-smooth">
      <HomeView id="home" />
      <AboutView id="about" />
      <SkillsView id="skills" />
      <ProjectsView id="projects" />
      <ContactMeView id="contact" />
    </div>
  </main>
</template>

