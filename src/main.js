import { createApp, provide, h } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
// import { DefaultApolloClient } from '@vue/apollo-composable'
// import * as apolloClient from './auth'
// import VeeValidate from './includes/validation'
import { createHead } from '@vueuse/head'
import authConfig from '../auth_config.json'
import { setupAuth } from './auth'

const app = createApp({
    setup() {
        provide()
    },

    render: () => h(App),
})
const head = createHead()
app.use(router)
app.use(store)
app.use(head)

function callbackRedirect(appState) {
    router.push(appState && appState.targetUrl ? appState.targetUrl : '/')
}

setupAuth(authConfig, callbackRedirect).then((auth) => {
    app.use(auth).mount('#app')
})

// app.use(VeeValidate)
// app.mount('#app')
