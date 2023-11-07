import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NoticesView from '@/views/NoticesView.vue'
import NoticeView from '@/views/NoticeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/notices',
      name: 'notices',
      component: NoticesView
    },
    {
      path: '/notices/:noticeId', //동적라우트
      name: 'notice', //라우트 이름
      component: NoticeView
    }
  ]
})

export default router
