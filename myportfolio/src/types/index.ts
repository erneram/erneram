/**
 * @fileoverview Type definitions for the portfolio application
 * Following Clean Architecture principles - Domain types
 */

// ============================================================
// Bible Verses Types
// ============================================================

export interface BibleVerse {
  readonly ref: string
  readonly text: string
}

// ============================================================
// Navigation Types
// ============================================================

export interface NavigationItem {
  readonly name: string
  readonly href: string
  current: boolean
}

export type SectionId = '#home' | '#about' | '#skills' | '#projects' | '#contact'

// ============================================================
// I18n Types
// ============================================================

export interface LocaleOption {
  readonly code: string
  readonly name: string
  readonly flag: string
}

export type SupportedLocale = 'en' | 'es'

// ============================================================
// Project Types
// ============================================================

export interface Project {
  readonly id: number
  readonly name: string
  readonly href: string
  readonly img: string
}

// ============================================================
// Contact Types
// ============================================================

export interface ContactInfo {
  readonly name: string
  readonly img: string
  readonly href: string
}

export interface ContactFormData {
  title: string
  firstName: string
  lastName: string
  email: string
  message: string
}

export interface EmailJSConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

export interface EmailSubmissionResult {
  success: boolean
  message: string
  data?: unknown
}

// ============================================================
// Form Validation Types
// ============================================================

export interface FormErrors {
  [key: string]: string | undefined
}

export interface FormValidationState {
  isValid: boolean
  isSubmitting: boolean
  hasSubmitted: boolean
}

// ============================================================
// Skills Types
// ============================================================

export interface Skill {
  readonly id: number
  readonly name: string
  readonly imageSrc: string
}

export type SkillCategory = 'language' | 'technology'

// ============================================================
// Star Field Types (Three.js)
// ============================================================

export interface StarFieldConfig {
  readonly starCount: number
  readonly acceleration: number
  readonly speedMultiplier: number
}

export interface StarFieldState {
  isInitialized: boolean
  animationId: number | null
}
