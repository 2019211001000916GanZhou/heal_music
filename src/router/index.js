import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    children:[
      {
        path:'',
        redirect:'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/Home.vue'),
      },
      {
        path: 'find',
        name: 'find',
        component: () => import('../views/find/Find.vue')
      },
      {
        path: 'attention',
        name: 'attention',
        component: () => import('../views/attention/Attention.vue')
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('../views/personal/Personal.vue')
      }
    ]
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/home/Recommend.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/home/Ranking.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/home/Search.vue'),
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/find/Video.vue'),
    props:true
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/home/MusicPlay.vue'),
    props:true
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
