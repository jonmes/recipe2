<template>
    <div
        class="w-full h-full absolute flex justify-center items-center z-50"
        :class="{ hidden: updateCard }"
    >
        <vee-form
            class="w-96 bg-white shadow-2xl rounded px-8 pt-6 pb-8 rounded-md"
            :validation-schema="schema"
            @submit="updater"
        >
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <vee-field
                    v-model="newName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                />
                <ErrorMessage class="text-red-600 ml-5" name="name" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <vee-field
                    v-model="newEmail"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                />
                <ErrorMessage class="text-red-600 ml-5" name="email" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bio">About</label>
                <vee-field
                    v-model="newBio"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bio"
                    id="bio"
                    type="text"
                    placeholder="Bio..."
                />
                <ErrorMessage class="text-red-600 ml-5" name="bio" />
            </div>
            <div role="alert" v-if="showAlert">
                <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">Not supported file</div>
                <div
                    class="border border-t-0 border-red-400 rounded-b bg-red-100 px-2 py-3 text-red-700"
                >
                    <p>only supports image files.</p>
                </div>
            </div>
            <upload @alert="alert" />
            <div class="flex items-center justify-between">
                <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >Update</button>
                <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    @click="cancelUpdate()"
                >Cancel</button>
            </div>
        </vee-form>
    </div>

    <section
        class="flex max-w-screen-xl h-auto justify-between items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
        :class="{ blur: !updateCard }"
    >
        <p v-if="userError">Something went wrong ...</p>
        <template v-if="userLoading">
            <div class="flex justify-center items-center w-full h-screen pb-96">
                <RotateSquare2 />
            </div>
        </template>
        <template v-else>
            <!-- Profile Card -->

            <div
                class="w-screen flex flex-row flex-wrap p-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg"
            >
                <div class="mx-auto w-full">
                    <div class="rounded-lg w-full flex flex-row flex-wrap items-center">
                        <div class="md:w-1/3 w-full">
                            <img
                                class="rounded-lg blur-none"
                                style="filter: blur(0) !important;"
                                :src="user.avatar"
                            />
                        </div>
                        <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                            <div
                                class="w-full text-right text-green-200 font-semibold relative pt-3 md:pt-0"
                            >
                                <div
                                    class="text-6xl text-green-300 leading-loose flex justify-start ml-10 uppercase"
                                >{{ user.name }}</div>
                                <div class="text-normal">
                                    <span
                                        class="pb-1 text-2xl flex justify-start ml-10 text-green-400"
                                    >About</span>
                                    <p
                                        class="text-md text-left text-green-400 hover:text-green-200 leading-loose ml-10 mr-60 duration-500 transition"
                                    >{{ user.bio }}</p>
                                </div>
                                <div
                                    class="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0"
                                >
                                    <button
                                        class="bg-green text-white text-xl px-4 py-1 rounded-md flex justify-between items-center shadow hover:shadow-xl"
                                        @click="showUpdate()"
                                    >Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </section>
    <section
        class="max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
        :class="{ blur: !updateCard }"
    >
        <div class="flex justify-between font-bold items-center">
            <h2 class="text-2xl leading-tight inline-block">Posts</h2>
            <router-link
                class="flex items-center justify-center bg-green px-4 py-2 space-x-3 text-white text-xl rounded-lg lg:w-auto hover:shadow-xl focus:outline-none"
                :to="{ name: 'Cook' }"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgb(255, 255, 255)"
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                </svg>
                <span>Create Recipe</span>
            </router-link>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-y-auto">
                <table class="min-w-full leading-normal">
                    <thead class="sticky top-0">
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'title': 'asc' }; "
                            >Recipe</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'avg_rating': 'desc' }; sortRef()"
                            >Rating</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'created_at': 'desc' }; sortRef()"
                            >Created at</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider"
                            >Edit</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider"
                            >Delete</th>
                        </tr>
                    </thead>
                    <tbody class="shadow shadow-2xl rounded">
                        <p v-if="sortE">Something went wrong...</p>
                        <p v-if="sortL">Loading...</p>
                        <template v-else v-for="(post, index) in sortRecipe" :key="index">
                            <tr
                                class="text-md hover:bg-gray-300"
                                :class="[index % 2 == 0 ? 'bg-white' : 'bg-gray-200']"
                            >
                                <td class="px-5 py-5 border-b border-gray-200 text-xl">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 w-20 h-20">
                                            <img
                                                class="w-full h-full rounded-md"
                                                :src="post.images[0].url"
                                                alt="image"
                                            />
                                        </div>
                                        <div class="ml-3">
                                            <p
                                                class="text-gray-900 whitespace-no-wrap"
                                            >{{ post.title }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-xl">
                                    <p
                                        class="text-gray-900 whitespace-no-wrap"
                                    >{{ post.avg_rating }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-xl">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{
                                            convertTime(
                                                post.created_at
                                            )
                                        }}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-lg">
                                    <!-- <box-icon
                                        name="pencil"
                                        type="solid"
                                        animation="fade-right-hover"
                                        color="green"
                                    ></box-icon>-->
                                    <svg
                                        width="20px"
                                        height="20px"
                                        fill="green"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
                                        />
                                    </svg>
                                </td>
                                <td class="px-7 py-5 border-b border-gray-200 text-xl">
                                    <button @click="deleteAndUpdateCache(post.id)">
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path
                                                    fill="green"
                                                    d="M20 7v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7H2V5h20v2h-2zm-9 2v2h2V9h-2zm0 3v2h2v-2h-2zm0 3v2h2v-2h-2zM7 2h10v2H7V2z"
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                    <!-- <box-icon
                                        class="cursor-pointer"
                                        type="solid"
                                        name="trash-alt"
                                        animation="tada-hover"
                                        color="green"
                                        @click="deleteAndUpdateCache(post.id)"
                                    ></box-icon>-->
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="w-full flex justify-center">
                <button class="bg-green py-2 px-10" @click="loadMore()">Load More!</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onUpdated } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { get_user_data, recipe_by_user, sort_user_recipe } from '../graphql/query'
import { update_profile, delete_recipe } from "../graphql/mutation"
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import vue3starRatings from 'vue3-star-ratings'
import { userState } from '../auth/index'
import { useHead } from '@vueuse/head'
import { buildExecutionContext } from 'graphql/execution/execute'
useHead({
    title: 'Profile',
});

// ==================== Variables ==========================
const userId = ref(localStorage.getItem('user'))
const newName = ref('')
const showAlert = ref(false)
const newEmail = ref('')
const newBio = ref('')
const updateCard = ref(true)
const updateMutation = ref([])
const imageInput = ref(null)
const fileInputValue = ref()
const schema = {
    name: 'required|max:20',
    email: 'required',
    bio: 'max:200'
}
const filter = ref({ "title": "asc" })
const recipe_id = ref(0)
const sortRecipe = ref([])
const cursorVal = ref(0)
// ============ Functions ====================

const cancelUpdate = () => updateCard.value = true
const showUpdate = () => updateCard.value = false


const updater = (values) => {
    updatePro()
    refetchUser()
    updateCard.value = true
}

const alert = () => {
    showAlert.value = true
    setTimeout(() => { showAlert.value = false }, 5000);
}

const {
    result: userResult,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
    onResult
} = useQuery(get_user_data.query,
    () => ({ user_id: userId.value, }),
)
refetchUser()

const user = useResult(userResult, null, data => data.user_by_pk)



// ========================= USER RECIPE QUERY =========================================
const {
    result: sortR,
    loading: sortL,
    error: sortE,
    refetch: sortRef,
    onResult: sortOnResult,
    fetchMore
} = useQuery(sort_user_recipe.query,
    () => ({ user_id: userId.value, recipe_id: recipe_id.value, order: { "id": "asc"} }))

sortOnResult(({ data }) => {
    console.log('this is sort data', data);
    if (data) {
        sortRecipe.value = data.recipe
    }
})


function loadMore() {

    fetchMore({
        variables: {
            recipe_id : sortRecipe.value[sortRecipe.value.length - 1].id
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult
            console.log('previous cach', previousResult);
            console.log('more: ', fetchMoreResult);
            console.log('updated recipe id', sortRecipe.value);
            
            return {
                recipe: [
                    ...previousResult.recipe,
                    ...fetchMoreResult.recipe
                ]
            }
        }
    })
}


// 
watchEffect(() => {
    if (user.value) {
        newName.value = user.value.name
        newEmail.value = user.value.email
        newBio.value = user.value.bio
    }
})

const {
    mutate: updatePro,
    loading: loadingPro,
    error: errorPro,
    onDone: onDonePro,
} = useMutation(update_profile.mutations, () => ({
    variables: {
        user_id: userId.value,
        name: newName.value,
        email: newEmail.value,
        bio: newBio.value
    },
    update: async (cache, { data: { update_user_by_pk } }) => {
        let data = cache.readQuery({ query: get_user_data.query, variables: { user_id: userId.value } })
        data = { 'user_by_pk': { ...update_user_by_pk, 'id': data.user_by_pk.id } }
        cache.writeQuery({ query: get_user_data.query, variables: { user_id: userId.value }, data })
    },
}))


const {
    mutate: deletRes,
    loading: delLoading,
    error: delError,
} = useMutation(delete_recipe.mutations)


function deleteAndUpdateCache(id) {
    deletRes({ recipe_id: id }, {
        update: (cache, { }) => {
            const data = cache.readQuery({ query: sort_user_recipe.query, variables: { user_id: userId.value, order: filter.value } })
            const updateData = data.recipe.filter(rec => rec.id !== id)
            cache.writeQuery({ query: sort_user_recipe.query, variables: { user_id: userId.value, order: filter.value }, data: { recipe: updateData } })
        }
    })
}

const convertTime = (apiTime) => {
    const date = new Date(apiTime)
    return date.toDateString()
}

</script>


<route>
{
  name: "Profile",
  meta: {
    requiresAuth: true
  },
}
</route>

<style scoped>
.vue3-star-ratings__wrapper[data-v-76dea496] {
    display: block;
    margin: 2px auto;
    text-align: center;
    padding: 0px !important;
}
.spinner {
    background-color: transparent !important;
}

@property --rotate {
    syntax: "<angle>";
    initial-value: 132deg;
    inherits: false;
}
.card {
    padding: 3px;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    font-size: 1.5em;
    color: rgb(37, 37, 37);
    cursor: pointer;
    font-family: cursive;
}
@keyframes spin {
    0% {
        --rotate: 0deg;
    }
    100% {
        --rotate: 360deg;
    }
}

.card::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
        var(--rotate),
        #4dfa6a,
        #3c67e3 43%,
        #4e00c2
    );
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
}
.card::after {
    left: 0;
    right: 0;
    z-index: -1;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(
        var(--rotate),
        #5ddcff,
        #3c67e3 43%,
        #4e00c2
    );
    opacity: 1;
    transition: opacity 0.5s;
    animation: spin 2.5s linear infinite;
}
</style>