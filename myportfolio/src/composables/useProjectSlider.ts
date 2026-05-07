/**
 * @fileoverview Composable for project slider with GSAP animations
 * Provides carousel/slider functionality for projects showcase
 */

import { ref, onMounted, nextTick, type Ref } from 'vue'
import { gsap } from 'gsap'
import type { Project } from '@/types'

interface UseProjectSliderOptions {
  container: Ref<HTMLDivElement | null>
  projects: Project[]
}

interface UseProjectSliderReturn {
  currentIndex: Ref<number>
  slideNext: () => void
  slidePrev: () => void
  goToSlide: (index: number) => void
}

export function useProjectSlider(
  options: UseProjectSliderOptions
): UseProjectSliderReturn {
  const { container, projects } = options
  const currentIndex = ref(0)
  let targets: NodeListOf<Element> | null = null

  async function initializeSlider(): Promise<void> {
    await nextTick()

    if (!container.value) return

    targets = container.value.querySelectorAll('.box')

    if (targets.length === 0) return

    const firstTarget = targets[0]
    if (!firstTarget) return

    gsap.set(targets, { xPercent: 100, zIndex: 0 })
    gsap.set(firstTarget, { xPercent: 0, zIndex: 1 })
  }

  function slideNext(): void {
    if (!targets || targets.length === 0) return

    const current = targets[currentIndex.value]
    const nextIndex = (currentIndex.value + 1) % projects.length
    const next = targets[nextIndex]

    if (!current || !next) return

    gsap.to(current, { duration: 1.2, xPercent: -100, zIndex: 0 })
    gsap.fromTo(next, { xPercent: 100, zIndex: 1 }, { duration: 1.2, xPercent: 0 })

    currentIndex.value = nextIndex
  }

  function slidePrev(): void {
    if (!targets || targets.length === 0) return

    const current = targets[currentIndex.value]
    const prevIndex = (currentIndex.value - 1 + projects.length) % projects.length
    const prev = targets[prevIndex]

    if (!current || !prev) return

    gsap.to(current, { duration: 1.2, xPercent: 100, zIndex: 0 })
    gsap.fromTo(prev, { xPercent: -100, zIndex: 1 }, { duration: 1.2, xPercent: 0 })

    currentIndex.value = prevIndex
  }

  function goToSlide(index: number): void {
    if (!targets || index < 0 || index >= projects.length) return

    const current = targets[currentIndex.value]
    const target = targets[index]

    if (!current || !target) return

    const direction = index > currentIndex.value ? 1 : -1

    gsap.to(current, { duration: 1.2, xPercent: -100 * direction, zIndex: 0 })
    gsap.fromTo(
      target,
      { xPercent: 100 * direction, zIndex: 1 },
      { duration: 1.2, xPercent: 0 }
    )

    currentIndex.value = index
  }

  onMounted(() => {
    initializeSlider()
  })

  return {
    currentIndex,
    slideNext,
    slidePrev,
    goToSlide,
  }
}
