import HomeView from '@/views/HomeView.vue'
// import ProjectsView from '@/views/ProjectsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      // component: HomeView
      // component: HomeView
      component: ()=>import('@/views/HomeView.vue') // This is best strategy. because by doing this it only load this page not the remaining or other pages. it saves memory and speed up.
    },
    {
      path: '/projects',
      name: 'projects',
      // component: ProjectsView
      component: () =>import('@/views/ProjectsView.vue')
    }

    /*
    Note: 
    For routing inside the routes array we have to pass one object for one routes. and each object will have 3 properties like 'path','name','component'.
    */
  ],
})

export default router
