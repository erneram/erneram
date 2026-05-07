/**
 * @fileoverview Contact form composable using VeeValidate and EmailJS
 * Application layer - handles form validation and submission logic
 */

import { computed, type ComputedRef } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { sendContactEmail } from '@/services'
import { contactFormSchema } from '@/schemas'
import type { ContactFormData, FormValidationState, EmailSubmissionResult } from '@/types'

interface UseContactFormReturn {
  // Form fields
  title: ReturnType<typeof useField>
  firstName: ReturnType<typeof useField>
  lastName: ReturnType<typeof useField>
  email: ReturnType<typeof useField>
  message: ReturnType<typeof useField>
  
  // Form state
  validationState: ComputedRef<FormValidationState>
  
  // Form methods
  handleSubmit: ReturnType<typeof useForm>['handleSubmit']
  resetForm: () => void
  
  // Email submission
  submitForm: () => Promise<EmailSubmissionResult>
}

export function useContactForm(): UseContactFormReturn {
  const {
    handleSubmit: veeHandleSubmit,
    resetForm: veeResetForm,
    values,
    meta,
    isSubmitting,
  } = useForm<ContactFormData>({
    validationSchema: toTypedSchema(contactFormSchema),
    initialValues: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  })

  // Define individual fields with useField
  const title = useField<string>('title')
  const firstName = useField<string>('firstName')
  const lastName = useField<string>('lastName')
  const email = useField<string>('email')
  const message = useField<string>('message')

  // Computed validation state
  const validationState = computed<FormValidationState>(() => ({
    isValid: meta.value.valid,
    isSubmitting: isSubmitting.value,
    hasSubmitted: meta.value.touched,
  }))

  // Handle form submission with validation
  const handleSubmit = veeHandleSubmit

  // Reset form to initial state
  const resetForm = (): void => {
    veeResetForm()
  }

  // Submit form data via EmailJS
  const submitForm = async (): Promise<EmailSubmissionResult> => {
    // Validate form before submission
    const isValid = await new Promise<boolean>((resolve) => {
      veeHandleSubmit(
        () => resolve(true), // onValid
        () => resolve(false) // onInvalid
      )()
    })

    if (!isValid) {
      return {
        success: false,
        message: 'Please fix the form errors before submitting.',
      }
    }

    try {
      const result = await sendContactEmail(values as ContactFormData)
      
      if (result.success) {
        resetForm()
      }
      
      return result
    } catch (error) {
      console.error('Form submission error:', error)
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        data: error,
      }
    }
  }

  return {
    // Form fields
    title,
    firstName,
    lastName,
    email,
    message,
    
    // Form state
    validationState,
    
    // Form methods
    handleSubmit,
    resetForm,
    
    // Email submission
    submitForm,
  }
}
