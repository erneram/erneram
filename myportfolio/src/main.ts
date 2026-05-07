/**
 * @fileoverview Application entry point
 * Initializes Vue app with router, i18n and plugins
 */

import './assets/main.css'

import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollToPlugin)

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
