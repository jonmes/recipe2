<template>
    <div class="min-h-screen bg-gradient-to-br from-transparent to-green-100">
        <div
            class="max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
        >
            <section class="container mx-auto pt-12">
                <!-- title -->
                <div class="relative flex items-center font-bold">
                    <h2 class="text-2xl">Browse by Category</h2>
                    <a href class="ml-10 flex items-center text-gray-400">
                        <span class="text-sm mr-4">All Categories</span>
                        <svg
                            class="svg-inline--fa fa-chevron-right fa-w-8 fa-9x"
                            width="15px"
                            height="15px"
                            viewBox="0 0 256 512"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="chevron-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                            />
                        </svg>
                    </a>
                </div>
                <!-- cards -->
                <section>
                    <div class="mt-10 mb-10 w-full">
                        <ul class="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                            <li
                                @click="srcCat('Fruits_and_Vegetables')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img
                                    class="max-h-20"
                                    src="https://i.ibb.co/Smq7sZK/2021-11-07-13h26-50.png"
                                    alt
                                />
                                <span class="font-semibold">Fruits & Vegetables</span>
                            </li>
                            <li
                                @click="srcCat('Breads_and_Sweets')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img
                                    class="max-h-20"
                                    src="https://i.ibb.co/PwYJkQs/2021-11-07-13h39-41.png"
                                    alt
                                />
                                <!-- <Bread class="w-20 h-20 text-green-900 fill-current" /> -->
                                <span class="font-semibold">Breads & Sweets</span>
                            </li>
                            <li
                                @click="srcCat('Seafoods')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img
                                    class="max-h-20"
                                    src="https://i.ibb.co/Hx3vbFx/2021-11-07-13h39-52.png"
                                    alt
                                />
                                <span class="font-semibold">Frozen Seafoods</span>
                            </li>

                            <li
                                @click="srcCat('Meats')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img
                                    class="max-h-20"
                                    src="https://i.ibb.co/4PCjhsS/2021-11-07-13h40-02.png"
                                    alt
                                />
                                <span class="font-semibold">Raw Meats</span>
                            </li>
                            <li
                                @click="srcCat('Soup')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img class="max-h-20" src="../assets/images/soup.png" alt />
                                <span class="font-semibold">Soup</span>
                            </li>
                            <li
                                @click="srcCat('Juice')"
                                class="m-3.5 h-52 w-full bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl"
                            >
                                <img class="max-h-20" src="../assets/images/juce.png" alt />
                                <span class="font-semibold">Juice & Cocktails</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="mb-10">
                    <div class="w-full mt-16 mb-5 my-2 flex sm:flex-row items-center flex-col">
                        <div class="w-full relative">
                            <span
                                class="h-full absolute inset-y-0 left-0 flex items-center -mt-5 sm:mt-0 pl-2"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    class="h-4 w-4 fill-current text-gray-500"
                                >
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                                    />
                                </svg>
                            </span>
                            <span class="w-full">
                                <input
                                    placeholder="Search by recipe name or by ingrediant"
                                    v-model="search"
                                    @keypress.enter="setSearch()"
                                    class="inline-block lg:w-9/12 xl:w-10/12 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                />
                                <button
                                    class="bg-green sm:w-auto ml-4 h-10 py-2 h-8 px-10 font-large text-white rounded-md whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
                                    @click="setSearch()"
                                >Search</button>
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-row sm:mb-0 mb-5">
                        <div class="relative">
                            <button
                                type="button"
                                @click="open = !open"
                                class="flex items-center text-gray-700 px-3 py-2 border font-medium rounded bg-green-100"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    preserveAspectRatio="xMidYMid meet"
                                    class="w-5 h-5 mr-1"
                                >
                                    <g class>
                                        <path d="M0 0h24v24H0z" fill="none" class />
                                        <path
                                            d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
                                            class
                                        />
                                    </g>
                                </svg>
                                FILTERS
                            </button>
                        </div>
                    </div>
                    <div v-if="open == true" class="grid grid-cols-3 mb-5 mt-5">
                        <div class="space-y-2">
                            <h1>Duration</h1>
                            <hr class="w-40 mb-4" />
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': time_lte == 15 }"
                                @click="filterTime(1); open = false"
                            >Under 15 minutes</button>
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': time_gt == 15 }"
                                @click="filterTime(2); open = false"
                            >15 - 30 minutes</button>
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': time_gt == 30 }"
                                @click="filterTime(3); open = false"
                            >Over 30 minutes</button>
                            <button
                                class="block hover:font-bold"
                                @click="time_gt = 0; time_lte = 10000; open = false"
                            >Cancel Filter</button>
                        </div>
                        <div class="space-y-2">
                            <h1>Sorty by</h1>
                            <hr class="w-40 mb-4" />
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': sorter == 2 }"
                                @click="sorter = 2; open = false"
                            >Rating</button>
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': sorter == 1 }"
                                @click="sorter = 1; open = false"
                            >Calories</button>
                            <button
                                class="block hover:font-bold"
                                :class="{ 'font-bold': sorter == 0 }"
                                @click="sorter = 0; open = false"
                            >Upload date</button>
                        </div>
                    </div>
                    <hr class="mt-5" />
                </section>

                <template v-if="searchError">Something went wrong... {{ searchError }}</template>
                <template v-if="searchLoading">
                    <div class="w-full flex justify-center">
                        <RotateSquare2 />
                    </div>
                </template>
                <template v-else>
                    <div
                        class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-4"
                    >
                        <div class="text-center col-span-3" v-if="recipe.length == 0">
                            <h1 class="text-4xl mb-4">No Result Found</h1>
                            <h2 class="text-xl">Try different keywords or remove search filters</h2>
                        </div>
                        <div
                            class="max-w-xs mb-5 rounded-md overflow-hidden hover:scale-101 hover:shadow-2xl transition duration-100 cursor-pointer"
                            v-else
                            v-for="(rec, index) in recipe"
                            :key="index"
                        >
                            <router-link
                                role="button"
                                :to="{
                                    name: 'Details',
                                    params: { id: rec.id },
                                    query: { name: rec.title, id: rec.id  }
                                }"
                                class="font-semibold text-gray-800"
                            >
                                <div>
                                    <img class="w-80 h-80" :src="rec.images[0].url" alt="pic" />
                                </div>
                                <div class="py-4 px-4 bg-white h-full">
                                    <h3 class="text-2xl font-great font-black text-gray-600">
                                        {{ rec.title }}
                                        <br />by &quot; {{rec.user.name}}
                                    </h3>
                                    <p class="mt-4 text-lg h-20 font-thin">{{ rec.description }}</p>
                                    <vue3starRatings
                                        class="stars"
                                        id="stars"
                                        v-model="rec.avg_rating"
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
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { search_recipe } from '../graphql/query'
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import vue3starRatings from 'vue3-star-ratings'
import { useHead } from '@vueuse/head'
useHead({
    title: 'Browse Recipe',
});
//  ======================== VARIABLES ===============================

const search = ref('')
const searchVal = ref('')
const open = ref(false)
const showControl = ref(false)
const disableClick = ref(true)
const sortingArray = ref([{ 'created_at': "desc" }, { 'calories': "desc" }, { 'avg_rating': "desc" }])
const sorter = ref(0)
const timeFilter = ref(80)
const time_lte = ref(100000)
const time_gt = ref(0)
// ========================== FUNCTIONS =============================

const setSearch = () => {
    searchVal.value = search.value.toString()
    console.log(typeof (searchVal.value), 'type of search val');
    time_lte.value = 100000
    time_gt.value = 0
}
const filterTime = (val) => {
    if (val === 1) {
        time_gt.value = 0
        time_lte.value = 15
    } else if (val === 2) {
        time_gt.value = 15
        time_lte.value = 30
    } else {
        time_gt.value = 30
        time_lte.value = 10000
    }
}
const {
    result: searchResult,
    loading: searchLoading,
    error: searchError,
    refetch: recipeRefetch
} = useQuery(search_recipe.query,
    () => ({
        search: "%" + searchVal.value + "%",
        sort: sortingArray.value[sorter.value],
        timeFilter: [{ "prep_time": { "_gt": time_gt.value } }, { "prep_time": { "_lte": time_lte.value } }],
        // pageLimit: 2,
        // offset: 2
    }),
)

const recipe = useResult(searchResult, null, data => data.recipe)
recipeRefetch()


watchEffect(() => {
    console.log(search.value.toString(), 'search value');
    console.log(recipe.value, 'hey this is search recipe')
})


</script>


<style scoped>
.spinner {
    background-color: transparent !important;
}
</style>