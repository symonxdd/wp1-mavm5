import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/change',
    name: 'Change',
    // route level code-splitting
    // this generates a separate chunk (change.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "change" */ '../views/Change.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
