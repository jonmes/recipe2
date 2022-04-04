import { createRouter, createWebHistory } from "vue-router"
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { authPlug, storeState, routeGuard } from '../auth/index.js'
import store from '../store'


// import routes from '~pages'

const routes = setupLayouts(generatedRoutes)

const root = { path: '/', redirect: '/home' }
routes.push(root)


const PageNotFound = {path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=> import('../views/NotFound.vue')}
routes.push(PageNotFound)

console.log('routes: ', routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if(!to.meta.requiresAuth){
        next()
    }else{
        if(localStorage.getItem('user')){
            next()
        }else{
                authPlug.loginWithRedirect();
                if(localStorage.getItem('user')){

                    next('/cook')
                }else{
                    next('/')
                }
        }
    }
})



export default router