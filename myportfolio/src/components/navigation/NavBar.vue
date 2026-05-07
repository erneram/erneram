<script setup lang="ts">
/**
 * @component NavBar
 * Main navigation component with mobile responsive menu and language switcher
 */

import { ref } from 'vue'
import { 
  Disclosure, 
  DisclosureButton, 
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { gsap } from 'gsap'
import { useLocale } from '@/composables'
import type { NavigationItem, SupportedLocale } from '@/types'

// Initialize i18n
const { currentLocale, availableLocales, switchLocale, t } = useLocale()

// Navigation items with translated labels
const navigation = ref<NavigationItem[]>([
  { name: t('nav.home'), href: '#home', current: false },
  { name: t('nav.about'), href: '#about', current: false },
  { name: t('nav.skills'), href: '#skills', current: false },
  { name: t('nav.projects'), href: '#projects', current: false },
  { name: t('nav.contact'), href: '#contact', current: false },
])

function scrollToSection(section: string): void {
  window.history.pushState({}, '', section)
  
  const element = document.getElementById(section.slice(1))
  
  if (!element) {
    console.warn(`[NavBar] Element not found for id: ${section}`)
    return
  }

  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: element,
      offsetY: 70,
    },
    ease: 'power2.inOut',
  })
}

function handleLanguageChange(locale: SupportedLocale): void {
  switchLocale(locale)
  
  // Update navigation items with new translations
  navigation.value = [
    { name: t('nav.home'), href: '#home', current: false },
    { name: t('nav.about'), href: '#about', current: false },
    { name: t('nav.skills'), href: '#skills', current: false },
    { name: t('nav.projects'), href: '#projects', current: false },
    { name: t('nav.contact'), href: '#contact', current: false },
  ]
}
</script>

<template>
  <Disclosure 
    v-slot="{ open }" 
    as="nav" 
    class="bg-gray-1100"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="absolute inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon 
              v-if="!open" 
              class="block size-6" 
              aria-hidden="true" 
            />
            <XMarkIcon 
              v-else 
              class="block size-6" 
              aria-hidden="true" 
            />
          </DisclosureButton>
        </div>
        
        <div class="fixed flex flex-1 items-center justify-end sm:items-stretch sm:justify-between">
          <div class="flex shrink-0 items-center">
            <img 
              class="h-8 w-auto" 
              src="/icon.png"
              alt="Your Company" 
            />
          </div>
          
          <div class="hidden sm:ml-6 sm:block sm:justify-end">
            <div class="flex items-center space-x-4">
              <!-- Navigation Links -->
              <div class="flex space-x-4">
                <a 
                  v-for="item in navigation" 
                  :key="item.name" 
                  :class="[
                    item.current 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white', 
                    'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  @click="scrollToSection(item.href)"
                >
                  {{ item.name }}
                </a>
              </div>
              
              <!-- Language Selector -->
              <Menu 
                as="div" 
                class="relative"
              >
                <div>
                  <MenuButton
                    class="flex items-center space-x-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="text-lg">
                      {{ availableLocales.find(l => l.code === currentLocale)?.flag }}
                    </span>
                    <span class="hidden lg:block">
                      {{ availableLocales.find(l => l.code === currentLocale)?.name }}
                    </span>
                    <ChevronDownIcon 
                      class="size-4" 
                      aria-hidden="true" 
                    />
                  </MenuButton>
                </div>
                
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
                  >
                    <MenuItem
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      v-slot="{ active }"
                    >
                      <button
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex w-full items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        ]"
                        @click="handleLanguageChange(locale.code as SupportedLocale)"
                      >
                        <span class="text-lg">{{ locale.flag }}</span>
                        <span>{{ locale.name }}</span>
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Mobile Navigation Links -->
        <DisclosureButton 
          v-for="item in navigation" 
          :key="item.name" 
          as="button" 
          :class="[
            item.current 
              ? 'bg-gray-900 text-white' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white', 
            'block w-full text-left rounded-md px-3 py-2 text-base font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
          @click="scrollToSection(item.href)"
        >
          {{ item.name }}
        </DisclosureButton>
        
        <!-- Mobile Language Selector -->
        <div class="pt-2 border-t border-gray-700">
          <div class="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Language / Idioma
          </div>
          <DisclosureButton 
            v-for="locale in availableLocales"
            :key="locale.code"
            as="button"
            :class="[
              currentLocale === locale.code
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'flex w-full items-center space-x-3 rounded-md px-3 py-2 text-base font-medium'
            ]"
            @click="handleLanguageChange(locale.code as SupportedLocale)"
          >
            <span class="text-lg">{{ locale.flag }}</span>
            <span>{{ locale.name }}</span>
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
