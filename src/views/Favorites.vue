<template>
    <div
        class="bg-gradient-to-br from-transparent to-green-100 max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
    >
        <template v-if="favError">Something went wrong... {{ searchError }}</template>
        <template v-if="favLoading">
            <div class="w-full flex justify-center">
                <RotateSquare2 />
            </div>
        </template>
        <template v-else>
            <section
                class="flex flex-wrap gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24"
            >
                <h1
                    v-show="favorites.length > 0"
                    class="w-full mt-10 font-great font-black text-4xl text-center"
                >
                    Your
                    Favorite Recipes
                </h1>
                <h1
                    v-show="favorites.length < 1"
                    class="w-full mt-10 font-great font-black text-4xl text-center"
                >
                    You
                    Have No Favorite Recipe Yet
                </h1>
            </section>
            <div
                class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-4"
            >
                <div
                    class="max-w-xs mb-5 rounded-md overflow-hidden hover:scale-101 hover:shadow-2xl transition duration-100 cursor-pointer"
                    v-for="(rec, index) in favorites"
                    :key="index"
                >
                    <div>
                        <img
                            class="w-80 h-80 bg-clip-content"
                            :src="rec.recipe.images[0].url"
                            alt="pic"
                        />
                    </div>
                    <div class="py-4 px-4 bg-white h-full">
                        <h3 class="text-2xl font-great font-black text-gray-600">
                            {{ rec.recipe.title }}
                            <br />
                            <!-- by &quot; {{ rec.recipe.user.name }} -->
                        </h3>
                        <!-- <p class="mt-4 text-lg font-thin text-ellipsis  overflow-hidden"><span class="text-clip overflow-hidden" v-if="rec.description.length <= 30">{{rec.description}}</span> <span v-else class="text-clip overflow-hidden">{{ rec.description.substring(0, rec.description.indexOf(' ', 20)) }}<span v-if="rec.description.split(/\s+/).length > 3">...</span></span> </p> -->
                        <p class="mt-4 text-lg font-thin text-ellipsis overflow-hidden">
                            <span>
                                {{ rec.recipe.description.trim().substring(0, 30) }}
                                <span
                                    v-if="rec.recipe.description.length > 30"
                                >...</span>
                            </span>
                        </p>

                        <div class="flex items-center mt-2.5 mb-5 justify-between">
                            <router-link
                                role="button"
                                :to="{
                                    name: 'Details',
                                    params: { id: rec.recipe.id },
                                    query: { name: rec.recipe.title, id: rec.recipe.id }
                                }"
                                class="text-white bg-green hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-between"
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-eye"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span class="pl-4">View</span>
                            </router-link>
                            <button
                                class="text-white bg-green hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-between"
                                @click="deleteFav_updateCache(rec.recipe.id)"
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Iconly/Curved/Delete">
                                        <g id="Delete">
                                            <path
                                                id="Stroke 1"
                                                d="M18.8892 9.5542C18.8892 17.5732 20.0435 21.198 12.2797 21.198C4.5149 21.198 5.693 17.5732 5.693 9.5542"
                                                stroke="white"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                id="Stroke 3"
                                                d="M20.3651 6.47985H4.2146"
                                                stroke="white"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                id="Stroke 5"
                                                d="M15.7148 6.47983C15.7148 6.47983 16.2434 2.71411 12.2891 2.71411C8.33578 2.71411 8.86435 6.47983 8.86435 6.47983"
                                                stroke="white"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <span class="pl-4">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import { fav_query } from '../graphql/query'
import { delete_fav } from '../graphql/mutation'
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import vue3starRatings from 'vue3-star-ratings'
const userId = ref(localStorage.getItem('user'))

const {
    result: favResult,
    loading: favLoading,
    error: favError,
    refetch: favRefetch
} = useQuery(fav_query.query,
    () => ({ user_id: userId.value }))

const favorites = useResult(favResult, null, data => data.favorite)


const removeFav = () => {
    console.log('remove from fav');
}

favRefetch()

const {
    mutate: deleteFav,
    loading: mutateLoading,
    error: mutateError,
    onload: mutateOnload
} = useMutation(delete_fav.mutations)


function deleteFav_updateCache(id){
    deleteFav({ favId: id}, {
        update: (cache, { }) => {
            const data = cache.readQuery({query: fav_query.query, variables: { user_id: userId.value}})
            console.log('fav data showing', data);
            console.log('id', id);
            const updatedData = data.favorite.filter(fav => fav.id !== id)
            console.log('updatedData', updatedData);
            cache.writeQuery({query: fav_query.query, variables: { user_id: userId.value}, data: { favorite: updatedData }})
        }
    })
}

</script>

<style scoped>
.spinner {
    background-color: transparent !important;
}
.vue3-star-ratings__wrapper[data-v-76dea496] {
    display: block;
    margin: 2px auto;
    text-align: center;
    padding: 0px !important;
}
</style>