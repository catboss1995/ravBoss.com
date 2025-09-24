import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Portfolio from '../views/Portfolio.vue'
import Commission from '../views/Commission.vue'
import Announcements from '../views/Announcements.vue'
import Store from '../views/Store.vue'
import Links from '../views/Links.vue'
import WorkDetail from '../views/WorkDetail.vue'
import Terms from '../views/Terms.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/announcements',
      name: 'announcements',
      component: Announcements
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router