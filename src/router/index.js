import { createRouter, createWebHistory } from "vue-router"
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { authPlug } from '../auth/index.js'
// import routes from '~pages'

const routes = setupLayouts(generatedRoutes)

const root = { path: '/', redirect: '/home' }
routes.push(root)

console.log('routes: ', routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})


const login = async () => {
    authPlug.loginWithRedirect();
    console.log('login pressed', await authPlug.getTokenSilently())
}

router.beforeEach(async (to, from, next) => {
    if(!to.meta.requiresAuth){
        next()
    }else{
        login()
        console.log('authntication required but you can pass for now');
    }
})



export default router