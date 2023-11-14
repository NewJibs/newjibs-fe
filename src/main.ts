import { createApp } from 'vue'

//pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//ant design
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

//vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//부트스트랩
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' //뒤에 확장자 안붙으면 js라고 알고 있기

//fontawesome - 여기 이상해
import { library } from '@fortawesome/fontawesome-svg-core'
import { faS } from '@fortawesome/free-solid-svg-icons'
import { faR } from '@fortawesome/free-solid-svg-icons'
// import { fontawesome } from '@fortawesome/vue-fontawesome'

// axios 객체 사용
import { instance } from './util/http-common'

import App from './App.vue'
import router from './router'
import TheLoading from './components/common/TheLoading.vue'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.provide('axios', instance)
//loading창 전역설정
// eslint-disable-next-line vue/multi-word-component-names
app.component('loading', TheLoading)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(vuetify) // 사용
app.mount('#app')
