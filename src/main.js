import { createApp, provide, h } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
// import * as apolloClient from './auth'
import VeeValidate from './includes/validation'
import { createHead } from '@vueuse/head'
import authConfig from '../auth_config.json'
import { setupAuth, apolloclient } from './auth'
import { createPinia } from 'pinia'


const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloclient)
    },

    render: () => h(App),
})
const head = createHead()
app.use(router)
app.use(store)
app.use(head)
app.use(VeeValidate)
app.use(createPinia())

async function callbackRedirect(appState) {
    console.log('window location', window.location.pathname, appState);
    console.log('from callback redirect', appState);
    router.push(appState &&  appState.targetUrl ?  appState.targetUrl : window.location.pathname)
}

setupAuth(authConfig, callbackRedirect).then((auth) => {
    app.use(auth).mount('#app')
})

// app.mount('#app')
