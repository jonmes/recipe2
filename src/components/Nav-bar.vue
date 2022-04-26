<template>
    <div class="bg-gradient-to-r from-green-200 via-yellow-100 to-green-100 sticky top-0 z-20">
        <nav
            class="flex max-w-screen-xl justify-between items-center py-4 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
        >
            <router-link
                :to="{ name: 'Home' }"
                class="text-3xl md:text-4xl font-bold tracking-wide slideUp"
            >
                <span
                    class="text-black before:block before:absolute before:-inset-1 hover:shadow-2xl hover:before:-skew-y-1 before:-skew-y-6 before:bg-green relative inline-block"
                >
                    <span class="relative">r</span>
                    <span class="relative text-green-200">E</span>
                    <span class="relative">cipe</span>
                </span>
            </router-link>
            <div
                class="inset-0 transition-all bg-white/70 backdrop-blur-xl z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 flex-col md:flex-row lg:space-x-14"
                :class="sidebarOpen ? 'fixed flex' : 'hidden'"
            >
                <ul
                    class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8"
                >
                    <li class="text-lg md:text-base lg:text-lg font-medium group">
                        <router-link :to="{ name: 'Home' }" @click="sidebarOpen = !sidebarOpen">Home</router-link>
                        <div
                            class="h-0.5 bg-green scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                    </li>
                    <li class="text-lg md:text-base lg:text-lg font-medium group">
                        <router-link
                            :to="{ name: 'Browse' }"
                            @click="sidebarOpen = !sidebarOpen"
                        >Browse</router-link>
                        <div
                            class="h-0.5 bg-green scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                    </li>
                    <li class="text-lg md:text-base lg:text-lg font-medium group">
                        <router-link :to="{ name: 'Cook' }" @click="sidebarOpen = !sidebarOpen">Cook</router-link>
                        <div
                            class="h-0.5 bg-green scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                    </li>
                    <li>
                        <div v-if="!$auth.loading.value">
                            <button
                                v-if="!$auth.isAuthenticated.value"
                                class="flex justify-center items-center sm:w-auto h-8 px-4 font-medium text-gray-900 border border-gray-900 rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
                                @click="login()"
                            >Log in</button>
                            <!-- <button v-if="$auth.isAuthenticated.value" @click="logout()">Log out</button> -->
                            <div v-if="$auth.isAuthenticated.value">
                                <Popper arrow class="inline-block">
                                    <div class="flex items-center justify-center">
                                        <div class="bg-red-400 w-12 h-12 rounded-full">
                                            <button class="bg-green-400 w-12 h-12 rounded-full">
                                                <img class="w-12 h-12 rounded-full" :src="avatar" />
                                            </button>
                                        </div>
                                    </div>
                                    <template #content="{}">
                                        <div class="menu">
                                            <h3
                                                class="w-full flex justify-center items-center text-black text-md py-4"
                                            >{{ name }}</h3>
                                            <ul class>
                                                <li
                                                    class="list-none py-1 flex justify-start hover:text-black"
                                                >
                                                    <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"
                                                        />
                                                    </svg>
                                                    <router-link :to="{ name: 'Profile' }">
                                                        <span
                                                            class="pl-2 transition-all duration-500"
                                                        >Profile</span>
                                                    </router-link>
                                                </li>
                                                <li
                                                    class="list-none py-1 border-t border-gray flex justify-start hover:text-black"
                                                >
                                                    <!-- <box-icon
                                                        name="heart"
                                                        animation="flashing-hover"
                                                    >
                                                        <i class="bx bx-heart"></i>
                                                    </box-icon>-->
                                                    <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M11.3783 5.88622C9.66902 4.10486 6.79049 4.0794 4.92308 5.90387C4.91717 5.90965 4.91116 5.91534 4.90506 5.92092C3.09331 7.58038 3.06654 10.3577 4.92308 12.1716L4.92796 12.1763L11.9374 19.1469L19.0769 12.1716C19.0828 12.1658 19.0888 12.1601 19.0949 12.1545C20.9067 10.495 20.9335 7.71772 19.0769 5.90387C17.2195 4.08919 14.3268 4.08919 12.4694 5.90387C12.3227 6.04722 12.125 6.12596 11.9202 6.12264C11.7154 6.11933 11.5204 6.03424 11.3783 5.88622ZM11.9465 4.31813C9.59468 2.40387 6.12292 2.58601 3.85838 4.79012C1.36802 7.08049 1.39686 10.8778 3.84702 13.2742C3.84785 13.275 3.84869 13.2759 3.84952 13.2767L11.391 20.7763C11.689 21.0727 12.1688 21.0748 12.4694 20.7811L20.1419 13.2851C22.6328 10.9939 22.603 7.19491 20.1505 4.79876C17.8724 2.57305 14.397 2.41284 11.9465 4.31813Z"
                                                            fill="#030D45"
                                                        />
                                                    </svg>

                                                    <router-link :to="{ name: 'Favorites' }">
                                                        <span
                                                            class="pl-2 transition-all duration-500"
                                                        >Favorites</span>
                                                    </router-link>
                                                </li>
                                                <li
                                                    class="list-none py-2 border-t border-gray flex justify-start hover:text-black"
                                                >
                                                    <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g>
                                                            <path fill="none" d="M0 0h24v24H0z" />
                                                            <path
                                                                d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
                                                            />
                                                        </g>
                                                    </svg>

                                                    <span
                                                        class="pl-2 cursor-pointer transition-all duration-500"
                                                        @click="logout()"
                                                    >Logout</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </template>
                                </Popper>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <button @click="sidebarOpen = !sidebarOpen" class="block md:hidden relative z-30">
                <HamburgerIcon class="w-8 h-8 fill-current text-gray-900" />
            </button>
        </nav>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect, onUpdated } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { get_user_data, get_all_recipe } from '../graphql/query'
import HamburgerIcon from '../assets/icons/hamburger.svg'
import Popper from 'vue3-popper'
import { authPlug } from '../auth/index.js'



const sidebarOpen = ref(false)
const userId = ref(localStorage.getItem('user'))
const name = ref('')
const avatar = ref('')
const enabled = ref(false)

const login = async () => {
    authPlug.loginWithRedirect();
}

const logout = () => {
    authPlug.logout({
        returnTo: window.location.origin
    });
}
// ===================== QUERY =================

if (authPlug.isAuthenticated.value) {
    enabled.value = true
}

const {
    result: userResult,
    loading: userLoading,
    error: userError,
    onResult
} = useQuery(get_user_data.query,
    () => ({ user_id: userId.value }),
    () => ({ enabled: enabled.value })
)

onResult(queryResult => {
    // console.log(queryResult.data, 'this is queyr result data')
    if (queryResult.data) {
        avatar.value = queryResult.data.user_by_pk.avatar
        name.value = queryResult.data.user_by_pk.name
    }
    console.log(queryResult.error, 'error here');
})

</script>

<style scoped>
:deep(.popper) {
    background: #ffffff;
    padding: 10px 20px;
    border-radius: 20px;
    box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
    color: rgb(153, 153, 153);
    font-weight: bold;
    transition: 0.5s;
    box-shadow: 2px 6px 20px rgba(0, 0, 0, 0.4);
}
:deep(.popper #arrow::before) {
    background: #ffffff;
}
:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
    background: #ffffff;
}
a.router-link-active {
    color: green;
}
</style>