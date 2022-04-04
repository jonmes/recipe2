<template>
    <div
        class="bg-gradient-to-br from-transparent to-green-100 max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
    >
        <section
            class="flex flex-wrap gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24"
        >
            <h1
                v-show="favorites.length > 0"
                class="w-full mt-10 font-great font-black text-4xl text-center"
            >Your Favorite Recipes</h1>
            <h1
                v-show="favorites.length < 1"
                class="w-full mt-10 font-great font-black text-4xl text-center"
            >You Have No Favorite Recipe Yet</h1>
        </section>
        <template v-if="favError">Something went wrong... {{ searchError }}</template>
        <template v-if="favLoading">
            <div class="w-full flex justify-center">
                <RotateSquare2 />
            </div>
        </template>
        <template v-else>
            <div
                class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-4"
            >
                <div
                    class="max-w-xs mb-5 rounded-md overflow-hidden hover:scale-101 hover:shadow-2xl transition duration-100 cursor-pointer"
                    v-for="(rec, index) in favorites"
                    :key="index"
                >
                    <router-link
                        role="button"
                        :to="{
                            name: 'Details',
                            params: { id: rec.recipe.id },
                            query: { name: rec.recipe.title, id: rec.recipe.id }
                        }"
                        class="font-semibold text-gray-800"
                    >
                        <div>
                            <img class="w-80 h-80" :src="rec.recipe.images[0].url" alt="pic" />
                        </div>
                        <div class="py-4 px-4 bg-white h-full">
                            <h3 class="text-2xl font-great font-black text-gray-600">
                                {{ rec.title }}
                                <br />
                                by &quot; {{ rec.recipe.user.name }}
                            </h3>
                            <p class="mt-4 text-lg h-20 font-thin">{{ rec.recipe.description }}</p>
                            <vue3starRatings
                                class="stars"
                                id="stars"
                                v-model="rec.recipe.avg_rating"
                                starSize="25"
                                starColor="#10B981"
                                inactiveColor="#e6ebdf"
                                controlBg="transparent"
                                :showControl="false"
                                :disableClick="true"
                                controlSize="0"
                            />

                            <span
                                class="flex items-center justify-center space-x-4 mt-4 w-full text-white bg-green hover:bg-green-500 py-1 rounded"
                            >
                                <svg
                                    width="20px"
                                    height="20px"
                                    fill="white"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z"
                                    />
                                </svg>
                                <span>View Recipe</span>
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { ref } from 'vue'
import { fav_query } from '../graphql/query'

const userId = ref(localStorage.getItem('user'))

const {
    result: favResult,
    loading: favLoading,
    error: favError,
    refetch: favRefetch
} = useQuery(fav_query.query,
    () => ({ user_id: userId.value }))

const favorites = useResult(favResult, null, data => data.favorite)
favRefetch()


</script>

<style scoped>
</style>