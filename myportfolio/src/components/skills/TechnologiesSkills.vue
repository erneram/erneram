<script setup lang="ts">
/**
 * @component TechnologiesSkills
 * Displays technologies/frameworks skills
 */

import { technologies } from '@/data'
import SkillsGrid from './SkillsGrid.vue'
</script>

<template>
  <SkillsGrid 
    title="Technologies" 
    :skills="technologies" 
  />
</template>
