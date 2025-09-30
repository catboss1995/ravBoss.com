import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Portfolio from '../views/Portfolio.vue'
import Commission from '../views/Commission.vue'
import Board from '../views/Board.vue'
import Store from '../views/Store.vue'
import Links from '../views/Links.vue'
import WorkDetail from '../views/WorkDetail.vue'
import Terms from '../views/Terms.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import News from '../views/News.vue'
import NotFound from '../views/NotFound.vue'

// 路由守衛函數
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/commission',
      name: 'commission',
      component: Commission
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    },
    {
      path: '/work/:id',
      name: 'work-detail',
      component: WorkDetail,
      props: true
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router