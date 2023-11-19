import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/notices',
      name: 'notices',
      component: () => import('@/views/NoticeListView.vue'),
      redirect: { name: 'notice-list' },
      children: [
        {
          path: '',
          name: 'notice-list',
          component: () => import('@/components/notice/NoticeList.vue')
        },
        {
          path: '/notices/post',
          name: 'notice-post',
          component: () => import('@/components/notice/NoticePost.vue')
        },
        {
          path: '/notices/:noticeId', //동적라우트
          name: 'notice', //라우트 이름
          component: () => import('@/components/notice/NoticeDetail.vue')
        },
        {
          path: '/notices/:noticeId/modify',
          name: 'notice-modify',
          component: () => import('@/components/notice/NoticeModify.vue')
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsView.vue'),
      redirect: { name: 'news-list' },
      children: [
        {
          path: '',
          name: 'news-list',
          component: () => import('@/components/news/NewsList.vue')
        },
        {
          path: ':articleId',
          name: 'news-detail',
          component: () => import('@/components/news/NewsDetail.vue')
        }
      ]
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('@/views/MapView.vue'),
      redirect: { name: 'house' },
      children: [
        {
          path: '',
          name: 'house',
          component: () => import('@/components/map/KakaoMap.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      children: [
        {
          path: 'login',
          name: 'user-login',
          component: () => import('@/components/user/SignIn.vue')
        }
      ]
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/views/RankingView.vue'),
      redirect: { name: 'ranking-list' },
      children: [
        {
          path: '',
          name: 'ranking-list',
          component: () => import('@/components/ranking/RankingList.vue')
        }
      ]
    }
    // {
    //   path: '*',
    //   name: 'error',
    //   component: ErrorViewVue
    // },
  ]
})

export default router
