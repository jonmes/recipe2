<template>
    <div class="bg-gradient-to-br from-transparent to-green-100">
        <!-- <h2>{{ recipe }}</h2>
        <h2>{{ id }}</h2>-->
        <template v-if="detailError">
            <p>Something Went Wrong</p>
        </template>
        <template v-if="detailLoading">
            <RotateSquare2 />
        </template>
        <template v-else>
            <div class="max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24">
                <div class="py-6 w-full">
                    <!-- Router Links -->
                    <div class="max-w-7xl mx-auto">
                        <div class="flex items-center space-x-2 text-gray-400 text-sm">
                            <router-link
                                :to="{ name: 'Home' }"
                                class="hover:underline hover:text-gray-600"
                            >Home</router-link>
                            <span>
                                <svg
                                    class="h-5 w-5 leading-none text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>
                            <router-link
                                :to="{
                                    name: 'Browse',
                                }"
                                class="hover:underline hover:text-gray-600"
                            >Category</router-link>
                            <span>
                                <svg
                                    class="h-5 w-5 leading-none text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>

                            <span class="hover:underline hover:text-gray-600">{{ recipe.category }}</span>
                            <!-- <span>{{ recipe[0].category }}</span> -->
                        </div>
                    </div>
                </div>
                <h1 class="w-full font-black font-great text-6xl mb-5">{{ recipe.title }}</h1>
                <div class="mb-10 grid grid-cols-6 items-center">
                    <!-- <StarRate
                        v-model="recipe.avg_rating"
                        :colours="{
                            activeColour: 'darkgreen',
                            inactiveColour: '#DCDCDC',
                        }"
                    />-->
                    <vue3starRatings
                        class="stars"
                        id="stars"
                        v-model="recipe.avg_rating"
                        starSize="25"
                        starColor="#10B981"
                        inactiveColor="#e6ebdf"
                        controlBg="transparent"
                        :showControl="false"
                        :disableClick="true"
                        controlSize="0"
                    />
                    <div class="mr-10 inline-block">{{ recipe.ratings.length }} Ratings</div>
                    <div class="inline-block col-span-4">
                        <Popper arrow>
                            <button
                                class="bg-green sm:w-auto h-8 px-8 font-large text-white rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
                            >Rate</button>
                            <template #content="{ close }">
                                <div class="flex justify-center w-full mb-7">
                                    <StarRate
                                        class="text-black"
                                        v-model="currentRating"
                                        :colours="{
                                            activeColour: 'darkgreen',
                                            hoverColour: '#32CD32',
                                            inactiveColour: '#EFF'
                                        }"
                                    />
                                </div>
                                <button
                                    class="bg-green mr-5 sm:w-auto h-8 px-10 font-large text-white rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
                                    @click="addrateRecipe(); close();"
                                >Rate</button>
                                <button
                                    class="bg-green sm:w-auto h-8 px-10 font-large text-white rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
                                    @click="close"
                                >Close</button>
                            </template>
                        </Popper>
                    </div>
                </div>
                <div
                    class="w-full sm:mb-32 lg:mb-10 xl:mb-0 grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-0"
                >
                    <div
                        class="relative col-span-4 sm:col-span-3 lg:col-span-2 xl:col-span-2 h-0 lg:pb-1/3 xl:pb-1/3 sm:pt-1/3 lg:pt-2/3"
                    >
                        <transition name="slide" mode="out-in">
                            <img
                                class="absolute inset-0 w-full h-128 object-cover shadow-lg rounded-lg"
                                :src="recipe.images[imgToShow].url"
                                alt="recipeImage"
                            />
                        </transition>

                        <!-- Image Selection -->

                        <div
                            class="w-full h-full mt-128 pt-2 sm:mt-80 md:mt-72 lg:mt-32 xl:mt-10 grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-x-1 gap-y-28 sm:gap-x-1 sm:gap-y-20 md:gap-x-1 md:gap-y-16 lg:gap-x-0 lg:gap-y-2 xl:gap-x-1 xl:gap-y-6"
                        >
                            <div
                                v-for="(imageP, index) in recipe.images"
                                :key="index"
                                tabindex="0"
                                class="relative h-0 pb-8 sm:pt-1/3 lg:pt-24"
                            >
                                <img
                                    class="absolute inset-0 w-32 h-32 object-cover shadow-lg rounded-lg"
                                    :src="imageP.url"
                                    alt="recipeImage"
                                    @click="showImage(index)"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        class="relative h-0 mt-96 pt-10 sm:pt-0 sm:mt-48 md:mt-128 lg:mt-0 xl:mt-0 pb-0 md:mb-72"
                    >
                        <div class="px-4">
                            <h2
                                class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl h-full"
                            >
                                <span>{{ recipe.description }}</span>
                            </h2>
                            <p class="text-gray-500 text-sm mt-5">
                                By
                                <a
                                    href="#"
                                    class="text-indigo-600 hover:underline"
                                >{{ recipe.user.name }}</a>
                            </p>
                            <h4 class="text-gray-500 mt-5">Category: {{ recipe.category }}</h4>
                            <h4 class="text-gray-500 mt-5">
                                Preparation Time:
                                {{ recipe.prep_time }} Min
                            </h4>
                            <h4 class="text-gray-500 mt-5">
                                Calories:
                                {{ recipe.calories }} KCal
                            </h4>
                            <h4 class="text-gray-500 mt-5">Servings: {{ recipe.serving }}</h4>
                            <h4 class="text-gray-500 mt-5">
                                Posted at:
                                {{
                                    convertTime(
                                        recipe.created_at
                                    )
                                }}
                            </h4>

                            <div class="xl:mt-20 lg:pt-10 space-x-4">
                                <button
                                    type="button"
                                    class="flex justify-center items-center w-full sm:w-auto h-13 px-8 font-medium text-gray-900 border border-gray-900 rounded-xl hover:shadow-xl transition-shadow duration-300 transition"
                                    :class="{ 'bg-green-300': liked }"
                                    @click="addFavorite(); refFavCheck(); refAgg()"
                                >
                                    <svg
                                        width="32px"
                                        height="32px"
                                        viewBox="0 0 32 32"
                                        enable-background="new 0 0 32 32"
                                        id="Stock_cut"
                                        version="1.1"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                    >
                                        <desc />
                                        <path
                                            d="M28.343,17.48L16,29  L3.657,17.48C1.962,15.898,1,13.684,1,11.365v0C1,6.745,4.745,3,9.365,3h0.17c2.219,0,4.346,0.881,5.915,2.45L16,6l0.55-0.55  C18.119,3.881,20.246,3,22.465,3h0.17C27.255,3,31,6.745,31,11.365v0C31,13.684,30.038,15.898,28.343,17.48z"
                                            fill="none"
                                            stroke="black"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                        />
                                    </svg>
                                    <span class="px-3">Favorite &nbsp;&nbsp;{{ favCount }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="relative col-span-2 h-0 pb-2/3 sm:pg-1/3 lg:pg-2/3">
                        <h1>Hello Guys</h1>
                    </div>-->
                </div>
                <div class="w-full mb-32 lg:mt-60 xl:mt-0">
                    <h2 class="w-full font-black font-great text-4xl mb-5">Ingredients</h2>
                    <ul
                        v-for="(ing, index) in recipe.ingredients"
                        :key="index"
                        class="text-2xl ml-10 pb-3"
                    >
                        <li>
                            <h1>{{ index + 1 }}. &nbsp;{{ ing.name }} &nbsp;&nbsp;&nbsp; {{ ing.amount }}</h1>
                        </li>
                    </ul>
                    <div class="mt-10">
                        <h2 class="w-full font-black font-great text-4xl mb-5">Steps</h2>
                        <ul
                            v-for="(step, index) in recipe.steps"
                            :key="index"
                            class="text-2xl ml-10 pb-3"
                        >
                            <li>
                                <span>
                                    <img
                                        src="https://img.icons8.com/ios-glyphs/30/000000/left-footprint--v2.png"
                                        class="inline-block"
                                    />
                                    Step {{ index + 1 }}
                                </span>

                                <br />

                                <span class="ml-10">{{ step.step }}</span>
                                <br />
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- ============== Comments ====================== -->
                <h2 class="w-full font-black font-great text-4xl mb-5">Comments</h2>

                <form @submit="addComment">
                    <div>
                        <Field
                            as="input"
                            type="text"
                            name="comment"
                            rules="required"
                            class="w-full shadow-inner shadow-green-200 p-4 mb-4 rounded-lg focus:outline-none focus:border-green focus:ring-green focus:ring-1 text-2xl"
                            placeholder="Comment..."
                        />
                        <ErrorMessage class="text-red ml-4" name="comment" />
                        <button
                            class="font-bold mb-10 py-2 px-4 w-full bg-green text-lg text-white shadow-md rounded-lg"
                            type="submit"
                        >Comment</button>
                    </div>
                    <!-- <h1>Errors: {{ errors }}, values: {{ values }}</h1> -->
                </form>

                <div
                    class="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4"
                    v-for="comment in comments"
                    :key="comment"
                >
                    <div class="flex flex-row justify-center mr-2">
                        <img
                            alt="avatar"
                            width="48"
                            height="48"
                            class="rounded-full w-10 h-10 mr-4 shadow-lg mb-4 border border-green-400"
                            :src="comment.user.avatar"
                        />
                        <h3
                            class="text-green-600 font-semibold text-lg text-center md:text-left"
                        >{{ comment.user.name }}</h3>
                    </div>

                    <p
                        style="width: 90%"
                        class="text-gray-600 text-lg text-center md:text-left"
                    >{{ comment.comment }}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { query_all, rating_query, comment_query, fav_check, fav_count } from '../graphql/query'
import { rating_mutation, comment_mutation, fav_mutation } from '../graphql/mutation'
import { configure, Form, Field, defineRule, ErrorMessage, useForm } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import vue3starRatings from 'vue3-star-ratings'
import StarRate from 'vue-star-rater';
import StarRating from 'vue-star-rating'
import Popper from 'vue3-popper'
import { authPlug } from '../auth/index.js'
import { useHead } from '@vueuse/head'
useHead({
    title: 'Detail',
});

//  ============================= VARIABLES =====================
const route = useRoute()
const router = useRouter()
const id = ref(route.query.id)
const showControl = ref(false)
const disableClick = ref(true)
const ratingVal = ref(0)
const step = ref(0.2)
const imgToShow = ref(0)
const currentRating = ref(4)
const userId = ref(localStorage.getItem('user'))
const comment = ref('')
const { handleSubmit } = useForm();
const liked = ref(false)
// const favCount = ref()
// ============================== FUNCTIONS ======================

onMounted(() => {
    configure({
        validateOnInput: true,
    })
    // rules
    defineRule("required", required);
})

const showImage = (index) => {
    imgToShow.value = index
}
const convertTime = (apiTime) => {
    const date = new Date(apiTime)
    return date.toDateString()
}

// ============================ QUERY =======================
const {
    result: detailResult,
    loading: detailLoading,
    error: detailError,
    refetch: detailRefetch
} = useQuery(query_all.query,
    () => ({ id: id.value }))

const recipe = useResult(detailResult, null, data => data.recipe_by_pk)
console.log('recipe result new', recipe);

const {
    result: ratingResult,
    loading: ratingLoading,
    error: ratingError,
    refetch: ratingRefetch
} = useQuery(rating_query.query,
    () => ({ user_id: userId.value, recipe_id: parseInt(id.value) }))

const ratings = useResult(ratingResult, null, data => data.rating)

const {
    result: commentResult,
    loading: commentLoading,
    error: commentError,
    refetch: commentRefetch
} = useQuery(comment_query.query,
    () => ({ recipe_id: parseInt(id.value) }))

const comments = useResult(commentResult, null, data => data.comment)


const {
    result: favCheck,
    loading: favCheckL,
    error: favCheckE,
    onResult: checkR,
    refetch: refFavCheck
} = useQuery(fav_check.query, () => ({
    user_id: userId.value,
    recipeId: id.value
}))

const checkLike = useResult(favCheck, null, data => data.favorite)
console.log('fav lengisiadjfjasifjsiofj', checkLike.value);

// checkR(({ data }) => {
//     if (userId.value) {
//         if (data.favorite.length > 0) {
//             liked.value = true
//         }
//     }
// })


const {
    result: favAgg,
    loading: aggL,
    error: aggE,
    refetch: refAgg,
    onResult: countOnRes
} = useQuery(fav_count.query, () => ({
    recipeId: id.value
}))

const favCount = useResult(favAgg, null, data => data.favorite_aggregate.aggregate.count)


// countOnRes(({ data }) => {
//     console.log('fav count data', data);
//     if (data.favorite_aggregate.aggregate.count > 0) {
//         console.log('favCount result', data.favorite_aggregate.aggregate.count)
//         favCount.value = data.favorite_aggregate.aggregate.count
//     }
// })

// ===================== REFETCHES ======================
detailRefetch()
ratingRefetch()
commentRefetch()
refFavCheck()
refAgg()

// ===================== MUTATIONS ===========================
const {
    mutate: rate,
    loading: rateLoading,
    error: rateError,
} = useMutation(rating_mutation.mutations,
    () => ({
        variables:
            { rating: currentRating.value, recipe_id: id.value, user_id: userId.value },
        update: async (cache, { data: { newData } }) => {
            ratingRefetch()
        }
    }))

const {
    mutate: comt,
    loading: comtLoading,
    error: comtError,
} = useMutation(comment_mutation.mutations,
    () => ({
        variables:
            { comment: comment.value, recipe_id: id.value, user_id: userId.value },
        update: async (cache, { data: { newData } }) => {
            commentRefetch()
        }
    }))

const {
    mutate: fav,
    loading: favLoading,
    error: favError
} = useMutation(fav_mutation.mutations,
    () => ({
        variables: { recipe_id: id.value, user_id: userId.value }
    }))



const addFavorite = () => {
    if (localStorage.getItem('user')) {
        console.log('favCheckerasdf', liked.value);
        if (!liked.value) {
            fav()
            alert('Recipe added to your favorite list!')
            liked.value = true
        } else {
            alert('Already Favorited!')
        }
    } else {
        authPlug.loginWithRedirect();
    }
}

watchEffect(() => {
    if (ratings.value) {
        if (ratings.value.length > 0) {
            currentRating.value = ratings.value[0].rating_val
        } else {
            currentRating.value = 0
        }
    }
    if(checkLike.value){
        if(checkLike.value.length > 0){
            liked.value = true
        }
    }

})
const addrateRecipe = () => {
    if (localStorage.getItem('user')) {
        rate()
        alert('Your rate is submitted successfully!')
    } else {
        authPlug.loginWithRedirect();
    }

}

const addComment = handleSubmit((values, { resetForm }) => {
    if (localStorage.getItem('user')) {
        comment.value = values.comment
        console.log(values)
        comt()
        resetForm();
    } else {
        authPlug.loginWithRedirect();
    }
})



</script>

<style scoped>
:deep(.popper) {
    /*background: #797979;*/
    background: rgba(199, 240, 196, 0.99);
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid rgb(47, 255, 20);
}
:deep(.popper #arrow::before) {
    background: rgba(199, 240, 196, 0.99);
}
:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
    background: rgba(199, 240, 196, 0.99);
}
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-10%);
}

.spinner {
    background-color: transparent !important;
}
</style>