/**
 * @fileoverview EmailJS service for sending contact form emails
 * Domain service for email functionality
 */

import emailjs from '@emailjs/browser'
import type { ContactFormData, EmailJSConfig, EmailSubmissionResult } from '@/types'

// EmailJS configuration from environment variables
const EMAILJS_CONFIG: EmailJSConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
}

/**
 * Initialize EmailJS with public key
 */
export function initEmailJS(): void {
  emailjs.init(EMAILJS_CONFIG.publicKey)
}

/**
 * Send contact form email using EmailJS
 * @param formData - The form data to send
 * @returns Promise with submission result
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<EmailSubmissionResult> {
  try {
    // Validate configuration before sending
    if (!validateEmailJSConfig()) {
      return {
        success: false,
        message: 'Email service is not properly configured. Please contact the administrator.',
      }
    }

    // Transform form data to template params
    const templateParams = {
      subject: formData.title,
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Ernesto Ascencio', // Your name
      reply_to: formData.email,
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    return {
      success: true,
      message: 'Email sent successfully!',
      data: response,
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    
    let errorMessage = 'Failed to send email. Please try again.'
    
    // Handle specific EmailJS errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid') || error.message.includes('not found')) {
        errorMessage = 'Email service configuration error. Please contact support.'
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else if (error.message.includes('limit')) {
        errorMessage = 'Email service limit reached. Please try again later.'
      }
    }
    
    return {
      success: false,
      message: errorMessage,
      data: error,
    }
  }
}

/**
 * Validate EmailJS configuration
 * @returns boolean indicating if config is valid
 */
export function validateEmailJSConfig(): boolean {
  return (
    EMAILJS_CONFIG.serviceId !== 'your_service_id' &&
    EMAILJS_CONFIG.templateId !== 'your_template_id' &&
    EMAILJS_CONFIG.publicKey !== 'your_public_key' &&
    EMAILJS_CONFIG.serviceId.length > 0 &&
    EMAILJS_CONFIG.templateId.length > 0 &&
    EMAILJS_CONFIG.publicKey.length > 0
  )
}

/**
 * Get current EmailJS configuration (for debugging)
 */
export function getEmailJSConfig(): EmailJSConfig {
  return EMAILJS_CONFIG
}
