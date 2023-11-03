import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

//vuetify 기본 세팅
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

// axios 객체 사용
import { instance } from './api/axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('axios', instance)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(vuetify) // 사용

app.mount('#app')
