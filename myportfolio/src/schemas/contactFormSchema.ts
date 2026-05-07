/**
 * @fileoverview Contact form validation schemas using Yup
 * Centralized validation rules following Clean Architecture
 */

import * as yup from 'yup'
import { i18n } from '@/i18n'

const { t } = i18n.global

export const contactFormSchema = yup.object({
  title: yup
    .string()
    .required(t('validation.required', { field: t('contact.form.subject') }))
    .min(5, t('validation.minLength', { field: t('contact.form.subject'), min: 5 }))
    .max(100, t('validation.maxLength', { field: t('contact.form.subject'), max: 100 }))
    .trim(),

  firstName: yup
    .string()
    .required(t('validation.required', { field: t('contact.form.firstName') }))
    .min(2, t('validation.minLength', { field: t('contact.form.firstName'), min: 2 }))
    .max(50, t('validation.maxLength', { field: t('contact.form.firstName'), max: 50 }))
    .matches(/^[A-Za-z\s]+$/, t('validation.invalidCharacters', { field: t('contact.form.firstName') })),

  lastName: yup
    .string()
    .required(t('validation.required', { field: t('contact.form.lastName') }))
    .min(2, t('validation.minLength', { field: t('contact.form.lastName'), min: 2 }))
    .max(50, t('validation.maxLength', { field: t('contact.form.lastName'), max: 50 }))
    .matches(/^[A-Za-z\s]+$/, t('validation.invalidCharacters', { field: t('contact.form.lastName') })),

  email: yup
    .string()
    .required(t('validation.required', { field: t('contact.form.email') }))
    .email(t('validation.email'))
    .max(100, t('validation.maxLength', { field: t('contact.form.email'), max: 100 })),

  message: yup
    .string()
    .required(t('validation.required', { field: t('contact.form.message') }))
    .min(10, t('validation.minLength', { field: t('contact.form.message'), min: 10 }))
    .max(1000, t('validation.maxLength', { field: t('contact.form.message'), max: 1000 }))
    .trim(),
})
