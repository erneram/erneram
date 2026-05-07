<script setup lang="ts">
/**
 * @view ContactMeView
 * Contact section with social links and form
 */

import { FormContactMe } from '@/components/contact'
import { useLocale } from '@/composables'
import { contacts } from '@/data'

const { t } = useLocale()
</script>

<template>
  <div class="relative isolate">
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
      <!-- Contact Information Column -->
      <div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <div class="mb-8">
            <h2 class="font-Lora text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
              {{ t('contact.title') }}
            </h2>
            <p class="mt-6 text-lg/8 text-gray-300">
              {{ t('contact.description') }}
            </p>
          </div>
          
          <!-- Contact Links -->
          <dl class="mt-10 space-y-4 text-base/7 text-white">
            <div 
              v-for="contactItem in contacts" 
              :key="contactItem.href" 
              class="flex gap-x-4"
            >
              <dt class="flex-none">
                <img 
                  :src="contactItem.img" 
                  :alt="contactItem.name"
                  class="w-8 h-8"
                >
              </dt>
              <dd>
                <a 
                  class="hover:text-gray-900" 
                  :href="contactItem.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ contactItem.name }}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <FormContactMe />
    </div>
  </div>
</template>
