import { createRouter, createWebHistory } from "vue-router"
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
// import routes from '~pages'

const routes = setupLayouts(generatedRoutes)

const root = { path: '/', redirect: '/home' }
routes.push(root)

console.log('routes: ', routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})



export default router