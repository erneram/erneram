<script setup lang="ts">
/**
 * @component FormContactMe
 * Contact form component with VeeValidate and EmailJS integration
 */

import { ref, onMounted } from 'vue'
import { useContactForm, useLocale } from '@/composables'
import { initEmailJS, validateEmailJSConfig } from '@/services'

// Initialize i18n
const { t } = useLocale()

// Notification state
const notification = ref<{
  show: boolean
  message: string
  type: 'success' | 'error'
}>({
  show: false,
  message: '',
  type: 'success',
})

// Initialize contact form with validation
const {
  title,
  firstName,
  lastName,
  email,
  message,
  validationState,
  submitForm,
  handleSubmit,
} = useContactForm()

// Show notification helper
function showNotification(message: string, type: 'success' | 'error'): void {
  notification.value = { show: true, message, type }
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

// Handle form submission
const onSubmit = handleSubmit(async () => {
  const result = await submitForm()
  
  if (result.success) {
    showNotification(
      t('contact.form.success'),
      'success'
    )
  } else {
    showNotification(
      result.message || t('contact.form.error'),
      'error'
    )
  }
})

// Initialize EmailJS on component mount
onMounted(() => {
  initEmailJS()
  
  // Warn if EmailJS is not properly configured
  if (!validateEmailJSConfig()) {
    console.warn('EmailJS configuration is incomplete. Please update the service configuration.')
  }
})
</script>

<template>
  <div>
    <!-- Notification Toast -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-2"
    >
      <div
        v-if="notification.show"
        class="fixed top-4 right-4 z-50 max-w-sm p-4 rounded-md shadow-lg"
        :class="{
          'bg-green-600 text-white': notification.type === 'success',
          'bg-red-600 text-white': notification.type === 'error'
        }"
      >
        <div class="flex items-center justify-between">
          <p class="font-medium">{{ notification.message }}</p>
          <button 
            class="ml-4 text-white hover:text-gray-200"
            @click="notification.show = false"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>

    <!-- Contact Form -->
    <form 
      class="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
      @submit.prevent="onSubmit"
    >
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <!-- Title/Subject -->
          <div class="sm:col-span-2">
            <label 
              for="title" 
              class="block text-sm font-semibold text-white"
            >
              {{ t('contact.form.subject') }} *
            </label>
            <input 
              id="title"
              v-model="title.value.value"
              type="text" 
              name="title" 
              :placeholder="t('contact.form.subjectPlaceholder')"
              class="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              :class="{ 'outline-red-500 focus:outline-red-600': title.errorMessage.value }"
            />
            <p 
              v-if="title.errorMessage.value" 
              class="mt-1 text-sm text-red-400"
            >
              {{ title.errorMessage.value }}
            </p>
          </div>

          <!-- First Name -->
          <div>
            <label 
              for="first-name" 
              class="block text-sm font-semibold text-white"
            >
              {{ t('contact.form.firstName') }} *
            </label>
            <input 
              id="first-name"
              v-model="firstName.value.value"
              type="text" 
              name="firstName" 
              autocomplete="given-name"
              class="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              :class="{ 'outline-red-500 focus:outline-red-600': firstName.errorMessage.value }"
            />
            <p 
              v-if="firstName.errorMessage.value" 
              class="mt-1 text-sm text-red-400"
            >
              {{ firstName.errorMessage.value }}
            </p>
          </div>

          <!-- Last Name -->
          <div>
            <label 
              for="last-name" 
              class="block text-sm font-semibold text-white"
            >
              {{ t('contact.form.lastName') }} *
            </label>
            <input 
              id="last-name"
              v-model="lastName.value.value"
              type="text" 
              name="lastName" 
              autocomplete="family-name"
              class="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              :class="{ 'outline-red-500 focus:outline-red-600': lastName.errorMessage.value }"
            />
            <p 
              v-if="lastName.errorMessage.value" 
              class="mt-1 text-sm text-red-400"
            >
              {{ lastName.errorMessage.value }}
            </p>
          </div>

          <!-- Email -->
          <div class="sm:col-span-2">
            <label 
              for="email" 
              class="block text-sm font-semibold text-white"
            >
              {{ t('contact.form.email') }} *
            </label>
            <input 
              id="email"
              v-model="email.value.value"
              type="email" 
              name="email" 
              autocomplete="email"
              class="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              :class="{ 'outline-red-500 focus:outline-red-600': email.errorMessage.value }"
            />
            <p 
              v-if="email.errorMessage.value" 
              class="mt-1 text-sm text-red-400"
            >
              {{ email.errorMessage.value }}
            </p>
          </div>

          <!-- Message -->
          <div class="sm:col-span-2">
            <label 
              for="message" 
              class="block text-sm font-semibold text-white"
            >
              {{ t('contact.form.message') }} *
            </label>
            <textarea 
              id="message"
              v-model="message.value.value as string"
              name="message" 
              rows="4"
              :placeholder="t('contact.form.messagePlaceholder')"
              class="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              :class="{ 'outline-red-500 focus:outline-red-600': message.errorMessage.value }"
            />
            <p 
              v-if="message.errorMessage.value" 
              class="mt-1 text-sm text-red-400"
            >
              {{ message.errorMessage.value }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-8 flex justify-end">
          <button 
            type="submit"
            :disabled="validationState.isSubmitting || !validationState.isValid"
            class="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="[
              validationState.isSubmitting || !validationState.isValid
                ? 'bg-gray-600'
                : 'bg-orange-600 hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600'
            ]"
          >
            <span v-if="validationState.isSubmitting" class="flex items-center">
              <svg 
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  class="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  stroke-width="4"
                />
                <path 
                  class="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {{ t('contact.form.sending') }}
            </span>
            <span v-else>{{ t('contact.form.send') }}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
