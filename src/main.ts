import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'ant-design-vue/dist/reset.css'

//부트스트랩
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; //뒤에 확장자 안붙으면 js라고 알고 있기

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

const app = createApp(App)

app.provide('axios', instance)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(vuetify) // 사용

app.use(Antd).mount('#app')
