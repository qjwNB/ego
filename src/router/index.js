import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout'),
    meta: { isLogin: true },
    redirect:'/goods',
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('../views/Goods')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params')
      },
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert')
      },
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '*',
    component: () => import('../views/Error/404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
