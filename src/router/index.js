import { createRouter, createWebHistory } from "vue-router"
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { authPlug, storeState } from '../auth/index.js'
import store from '../store'


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
}

router.beforeEach(async (to, from, next) => {
    if(!to.meta.requiresAuth){
        next()
    }else{
        if(localStorage.getItem('user')){
            next()
        }else{
            // let log = new Promise((resolve, reject) => {
                authPlug.loginWithRedirect();
                if(localStorage.getItem('user')){
                    // resolve('logged in successfully!')
                    next('/cook')
                }else{
                    next('/')
                    // reject('Not logged in!')
                }
            // })

            // log.then((logging) => {console.log(logging);})
            // .catch((rej) => { console.log('error happended', rej);})
        }
    }
})



export default router