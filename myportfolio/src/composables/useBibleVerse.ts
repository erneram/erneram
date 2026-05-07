/**
 * @fileoverview Composable for Bible verse functionality
 * Manages random verse selection with reactive state
 */

import { ref, onMounted, type Ref } from 'vue'
import type { BibleVerse } from '@/types'
import { bibleVerses } from '@/data/bibleVerses'

interface UseBibleVerseReturn {
  verse: Ref<BibleVerse | null>
  getRandomVerse: () => BibleVerse
  refreshVerse: () => void
}

export function useBibleVerse(): UseBibleVerseReturn {
  const verse = ref<BibleVerse | null>(null)

  function getRandomVerse(): BibleVerse {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length)
    const selectedVerse = bibleVerses[randomIndex]
    
    if (!selectedVerse) {
      return bibleVerses[0] ?? { ref: '', text: '' }
    }
    
    return selectedVerse
  }

  function refreshVerse(): void {
    verse.value = getRandomVerse()
  }

  onMounted(() => {
    refreshVerse()
  })

  return {
    verse,
    getRandomVerse,
    refreshVerse,
  }
}
