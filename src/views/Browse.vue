<template>
    <div class="min-h-screen bg-gradient-to-br from-transparent to-green-100">
        <div class="max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24">
            <div class="container mx-auto pt-12">
                <!-- title -->
                <div class="relative flex items-center font-bold">
                    <h2 class="text-2xl">Browse by Category</h2>
                    <router-link
                        :to="{ name: 'Browse' }"
                        class="ml-10 flex items-center text-gray-400"
                    >
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
                    </router-link>
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
                    <div
                        class="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2 mb-7"
                    >
                        <input
                            placeholder="Your favorite food"
                            class="w-full p-4 rounded-full shadow-inner shadow-green-200 focus:outline-none focus:border-green-300 focus:ring-green-300 focus:ring-1 mr-2"
                            type="text"
                            v-model="search"
                            @keypress.enter="setSearch()"
                        />
                        <button
                            type="button"
                            title="Start buying"
                            class="ml-auto py-1 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
                            @click="setSearch()"
                        >
                            <span class="hidden text-yellow-900 font-semibold md:block">Search</span>
                            <span class="inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="bi bi-search"
                                    fill="currentColor"
                                    height="20"
                                    width="20"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                    />
                                </svg>
                            </span>
                        </button>
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
                        ref="scrollComponent"
                    >
                        <div class="text-center col-span-3" v-if="searchRecipe.length == 0">
                            <h1 class="text-4xl mb-4">No Result Found</h1>
                            <h2 class="text-xl">Try different keywords or remove search filters</h2>
                        </div>
                        <div
                            class="max-w-xs mb-5 rounded-md overflow-hidden hover:scale-101 hover:shadow-2xl transition duration-100 cursor-pointer"
                            v-else
                            v-for="(rec, index) in searchRecipe"
                            :key="index"
                        >
                            <router-link
                                role="button"
                                :to="{
                                    name: 'Details',
                                    params: { id: rec.id },
                                    query: { name: rec.title, id: rec.id }
                                }"
                                class="font-semibold text-gray-800"
                            >
                                <div>
                                    <img
                                        class="w-80 h-80 bg-clip-content"
                                        :src="rec.images[0].url"
                                        alt="pic"
                                    />
                                </div>
                                <div class="py-4 px-4 bg-white h-full">
                                    <h3 class="text-2xl font-great font-black text-gray-600">
                                        {{ rec.title }}
                                        <br />
                                        by &quot; {{ rec.user.name }}
                                    </h3>
                                    <!-- <p class="mt-4 text-lg font-thin text-ellipsis  overflow-hidden"><span class="text-clip overflow-hidden" v-if="rec.description.length <= 30">{{rec.description}}</span> <span v-else class="text-clip overflow-hidden">{{ rec.description.substring(0, rec.description.indexOf(' ', 20)) }}<span v-if="rec.description.split(/\s+/).length > 3">...</span></span> </p> -->
                                    <p class="mt-4 text-lg font-thin text-ellipsis overflow-hidden">
                                        <span>
                                            {{ rec.description.trim().substring(0, 30) }}
                                            <span
                                                v-if="rec.description.length > 30"
                                            >...</span>
                                        </span>
                                    </p>

                                    <div class="flex items-center mt-2.5 mb-5">
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
                                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mr-12"
                                        >{{ rec.avg_rating }}</span>
                                        <button
                                            class="text-white bg-green hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >View</button>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </template>
            </div>
            <div>
                <button @click="previous()">previous</button>
                <button @click="next()">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUpdate } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { search_recipe, all_recipe } from '../graphql/query'
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import vue3starRatings from 'vue3-star-ratings'
import scrollMonitor from 'scrollmonitor';
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
const enableFilter = ref(false)
const offset = ref(0)
const scrollComponent = ref(null)
const limit = ref(3)
const page = ref(0)
const cursor = ref(0)
const sort = ref({ "id": "asc" })
// ========================== FUNCTIONS =============================


const setSearch = () => {
    searchVal.value = search.value.toString()
    time_lte.value = 100000
    time_gt.value = 0
    cursor.value = 0
}
const filterTime = (val) => {
    recipeRefetch()
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

// onMounted(() => {
//     window.addEventListener("scroll", handleScroll)
// })

// const handleScroll = (e) => {
//     let element = scrollComponent.value
//     if(element !== null){
//         if( element.getBoundingClientRect().bottom < window.innerHeight) {
//             next()
//         }
//     }
// }

// ================================= QUERY ========================================== 
const {
    result: searchResult,
    loading: searchLoading,
    error: searchError,
    refetch: recipeRefetch,
    fetchMore
} = useQuery(search_recipe.query,
    () => ({
        search: "%" + searchVal.value + "%",
        // sort: sortingArray.value[sorter.value],
        sort: { "id": "asc" },
        timeFilter: [{ "prep_time": { "_gt": time_gt.value } }, { "prep_time": { "_lte": time_lte.value } }],
        limit: limit.value,
        cursor: cursor.value
    }),
)

const searchRecipe = useResult(searchResult, null, data => data.recipe)
recipeRefetch()

const next = () => {
    console.log('value', searchRecipe.value.length);
    if (searchRecipe.value.length !== 0) {
        cursor.value = searchRecipe.value[2].id
        fetchMore({
            variables: {
                cursor: cursor.value
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                console.log('prev', previousResult)
                console.log('fetchmore', fetchMoreResult.recipe.length)
                if (!fetchMoreResult && fetchMoreResult.recipe.length === 0) return previousResult

                return {
                    ...previousResult,
                    recipe: [
                        ...previousResult.recipe,
                        ...fetchMoreResult.recipe
                    ]
                }
            }
        })
    }

    fetchMore({
        variables: {
            cursor: cursor.value
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
            console.log('passed out ', previousResult);
            return previousResult
        }
    })


}

const previous = () => {
        console.log('value', searchRecipe.value.length);
        sort.value = { "id": "desc" }
    if (searchRecipe.value.length !== 0) {
        cursor.value = searchRecipe.value[2].id
        fetchMore({
            variables: {
                cursor: cursor.value
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                console.log('prev', previousResult)
                console.log('fetchmore', fetchMoreResult.recipe.length)
                if (!fetchMoreResult && fetchMoreResult.recipe.length === 0) return previousResult

                return {
                    ...previousResult,
                    recipe: [
                        ...previousResult.recipe,
                        ...fetchMoreResult.recipe
                    ]
                }
            }
        })
    }
}


// ============================= WATCHEFFECT ================================

watchEffect(() => {

})


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