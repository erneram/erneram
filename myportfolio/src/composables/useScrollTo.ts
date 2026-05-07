/**
 * @fileoverview Composable for smooth scroll navigation using GSAP
 * Provides reusable scroll functionality across components
 */

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import type { SectionId } from '@/types'

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin)

interface ScrollToOptions {
  duration?: number
  offsetY?: number
  ease?: string
}

interface UseScrollToReturn {
  scrollToSection: (sectionId: SectionId | string, options?: ScrollToOptions) => void
  scrollToElement: (element: Element, options?: ScrollToOptions) => void
}

const DEFAULT_OPTIONS: Required<ScrollToOptions> = {
  duration: 1,
  offsetY: 70,
  ease: 'power2.inOut',
}

export function useScrollTo(): UseScrollToReturn {
  function scrollToSection(
    sectionId: SectionId | string,
    options: ScrollToOptions = {}
  ): void {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
    const element = document.querySelector(sectionId)

    if (!element) {
      console.warn(`[useScrollTo] Element not found for selector: ${sectionId}`)
      return
    }

    gsap.to(window, {
      duration: mergedOptions.duration,
      scrollTo: {
        y: element,
        offsetY: mergedOptions.offsetY,
      },
      ease: mergedOptions.ease,
    })
  }

  function scrollToElement(
    element: Element,
    options: ScrollToOptions = {}
  ): void {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

    gsap.to(window, {
      duration: mergedOptions.duration,
      scrollTo: {
        y: element,
        offsetY: mergedOptions.offsetY,
      },
      ease: mergedOptions.ease,
    })
  }

  return {
    scrollToSection,
    scrollToElement,
  }
}
