import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import People from '@/views/People.vue'
import Person from '@/views/Person.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/people',
    name: 'People',
    alias: '/',
    component: People,
    props: true,
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: Person,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
