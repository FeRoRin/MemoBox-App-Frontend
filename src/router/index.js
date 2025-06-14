import { createRouter, createWebHistory } from 'vue-router'
import MemoBoxHome from '../views/MemoBoxHome.vue'

const routes = [
  {
    path: '/',
    name: 'MemoBoxHome',
    component: MemoBoxHome
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
