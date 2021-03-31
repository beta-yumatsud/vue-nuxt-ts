import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Search from '../components/BookSearch.vue'
import Form from '../components/BookForm.vue'
import Hello from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
  },
  {
    path: '/hello',
    name: 'hello',
    component: Hello,
    props: () => ({
      msg: 'Hello, Vue.js!!'
    })
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
