import createAuth0Client from '@auth0/auth0-spa-js'
import { computed, reactive, watchEffect } from 'vue'



let client
const state = reactive({
    loading: true,
    isAuthenticated: false,
    user: {},
    popupOpen: false,
    error: null,
})


export const storeState = state

async function loginWithPopup() {
    state.popupOpen = true

    try {
        await client.loginWithPopup(0)
    } catch (e) {
        console.error(e)
    } finally {
        state.popupOpen = false
    }

    state.user = await client.getUser()
    state.isAuthenticated = true
}

async function handleRedirectCallback() {
    state.loading = true

    try {
        await client.handleRedirectCallback()
        state.user = await client.getUser()
        state.isAuthenticated = true
    } catch (e) {
        state.error = e
    } finally {
        state.loading = false
    }
}

function loginWithRedirect(o) {
    return client.loginWithRedirect(o)
}

function getIdTokenClaims(o) {
    return client.getIdTokenClaims(o)
}

function getTokenSilently(o) {
    return client.getTokenSilently(o)
}

function getTokenWithPopup(o) {
    return client.getTokenWithPopup(o)
}

function logout(o) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return client.logout(o)
}

const authPlugin = {
    isAuthenticated: computed(() => state.isAuthenticated),
    loading: computed(() => state.loading),
    user: computed(() => state.user),
    getIdTokenClaims,
    getTokenSilently,
    getTokenWithPopup,
    handleRedirectCallback,
    loginWithRedirect,
    loginWithPopup,
    logout,
}

export const authPlug = authPlugin

export const routeGuard = (to, from, next) => {
    const { isAuthenticated, loading, loginWithRedirect } = authPlugin

    const verify = async () => {
        // If the user is authenticated, continue with the route
        if (isAuthenticated.value) {
            return next()
        }

        // Otherwise, log in
        loginWithRedirect({ appState: { targetUrl: to.fullPath } })
    }

    // If loading has already finished, check our auth state using `fn()`
    if (!loading.value) {
        return verify()
    }

    // Watch for the loading property to change before we check isAuthenticated
    watchEffect(() => {
        if (loading.value === false) {
            return verify()
        }
    })
}

export const setupAuth = async (options, callbackRedirect) => {
    client = await createAuth0Client({
        ...options,
    })

    try {
        // If the user is returning to the app after authentication

        if (
            window.location.search.includes('code=') &&
            window.location.search.includes('state=')
        ) {
            // handle the redirect and retrieve tokens
            const { appState } = await client.handleRedirectCallback()

            // Notify subscribers that the redirect callback has happened, passing the appState
            // (useful for retrieving any pre-authentication state)
            callbackRedirect(appState)
        }
    } catch (e) {
        state.error = e
    } finally {
        // Initialize our internal authentication state
        state.isAuthenticated = await client.isAuthenticated()
        // console.log('is authenticated value', state.isAuthenticated);
        state.user = await client.getUser()
        if (state.isAuthenticated) {
            localStorage.setItem('user', state.user.sub)
            localStorage.setItem('token', await client.getTokenSilently())
        }
        state.loading = false
    }

    return {
        install: (app) => {
            app.config.globalProperties.$auth = authPlugin
        },
    }
}

// ======================   APOLLO  ===============================

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from '@apollo/client/core'

import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

let apolloClient

const getHeaders = async () => {
    const headers = {}
    // if (await state.isAuthenticated) {
    if (localStorage.token) {
        if (localStorage.token) {
            headers.Authorization = `Bearer ${localStorage.token}`
            console.log('header is setting ...');
        }
        return headers
    } else {
        return {}
    }
}

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/v1/graphql',
})

const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/v1/graphql`,
    options: {
        reconnect: true,
        // timeout: 30000,
        lazy: true,
        connectionParams: async () => {
            // if (await state.isAuthenticated) {
            if (localStorage.token) {
                return {
                    headers: await getHeaders(),
                }
            } else {
                return {}
            }
        },
    },
})

const authLink = setContext(async () => {
    // if (await state.isAuthenticated) {
    if (localStorage.token) {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        }
    } else {
        return {}
    }
})

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

const cache = new InMemoryCache()
apolloClient = new ApolloClient({
    cache,
    link,
})

// final curly brace

export const apolloclient = apolloClient

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})
