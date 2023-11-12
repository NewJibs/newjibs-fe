import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// 공지사항
import NoticeListView from '@/views/NoticeView/NoticeListView.vue'
import NoticeDetailView from '@/views/NoticeView/NoticeDetailView.vue'
import NoticePostView from '@/views/NoticeView/NoticePostView.vue'
import NoticeModifyView from '@/views/NoticeView/NoticeModifyView.vue'

// 뉴스
import NewsListView from '@/views/NewsView/NewsListView.vue'
import NewsDetailView from '@/views/NewsView/NewsDetailView.vue'

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
      component: () => NoticeListView
    },
    {
      path: '/notices/post',
      name: 'notice-post',
      component: () => NoticePostView
    },
    {
      path: '/notices/:noticeId', //동적라우트
      name: 'notice', //라우트 이름
      component: () => NoticeDetailView
    },
    {
      path: '/notices/:noticeId/modify',
      name: 'notice-modify',
      component: () => NoticeModifyView
    },
    {
      path: '/news',
      name: 'news',
      component: () => NewsListView
    },
    {
      path: '/news/:articleId',
      name: 'news-detail',
      component: () => NewsDetailView
    }
    // {
    //   path: '*',
    //   name: 'error',
    //   component: ErrorViewVue
    // },
  ]
})

export default router
