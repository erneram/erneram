<script setup lang="ts">
/**
 * @component LanguagesSkills
 * Displays programming languages skills
 */

import { languages } from '@/data'
import SkillsGrid from './SkillsGrid.vue'
</script>

<template>
  <SkillsGrid 
    title="Languages" 
    :skills="languages" 
  />
</template>
