<template>
    <section
        class="w-full absolute flex justify-center items-center bg-black bg-opacity-50"
        :class="{ hidden: updateCard }"
    >
        <vee-form
            class="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 rounded-md"
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
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bio">Bio</label>
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
    </section>
    <section>
        <div
            class="flex max-w-screen-xl h-auto justify-between items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24"
        >
            <p v-if="userError">Something went wrong ...</p>
            <template v-if="userLoading">
                <div class="flex justify-center items-center w-full h-screen pb-96">
                    <RotateSquare2 />
                </div>
            </template>
            <template v-else>
                <div class="w-full grid grid-cols-3 gap-10">
                    <div class="p-3 border-t-4 border-green-400 col-span-3 md:col-span-1 mt-10">
                        <div
                            class="image overflow-hidden bg-white shadow shadow-2xl rounded-b-lg p-5"
                        >
                            <img
                                class="h-auto w-full mx-auto"
                                :src="user.avatar"
                                alt="profilePicture"
                            />
                            <p class="flex justify-between items-center pt-5">
                                <span
                                    class="text-gray-600 inline-block font-bold text-2xl leading-6"
                                >{{ user.name }}</span>
                                &nbsp;
                                <button
                                    class="bg-green text-white text-xl px-4 py-1 rounded-md flex justify-between items-center shadow hover:shadow-xl"
                                    @click="showUpdate()"
                                >Edit Profile</button>
                            </p>
                            <h3 class="text-gray-600 font-bold text-2xl leading-6 pt-5">Bio</h3>

                            <p
                                class="text-sm text-gray-500 hover:text-gray-600 leading-6"
                            >{{ user.bio }}</p>
                        </div>
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                class="inline-block min-w-full shadow rounded-lg overflow-y-auto h-128"
                            >
                                <table class="min-w-full leading-normal">
                                    <thead class="sticky top-0">
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                                @click="filter = { 'title': 'asc' }"
                                            >Recipe</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                                @click="filter = { 'avg_rating': 'desc' }"
                                            >Rating</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                                @click="filter = { 'created_at': 'desc' }"
                                            >Created at</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                            >Edit</th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                            >Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody class="shadow shadow-2xl rounded">
                                        <p v-if="recipesError">Something went wrong...</p>
                                        <p v-if="recipesLoading">Loading...</p>
                                        <template
                                            v-else
                                            v-for="(post, index) in sortRecipe"
                                            :key="index"
                                        >
                                            <tr
                                                class="hover:bg-gray-300"
                                                :class="[index % 2 == 0 ? 'bg-white' : 'bg-gray-200']"
                                            >
                                                <td
                                                    class="px-5 py-5 border-b border-gray-200 text-lg"
                                                >
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
                                                <td
                                                    class="px-5 py-5 border-b border-gray-200 text-lg"
                                                >
                                                    <p
                                                        class="text-gray-900 whitespace-no-wrap"
                                                    >{{ post.avg_rating }}</p>
                                                </td>
                                                <td
                                                    class="px-5 py-5 border-b border-gray-200 text-lg"
                                                >
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {{
                                                            convertTime(
                                                                post.created_at
                                                            )
                                                        }}
                                                    </p>
                                                </td>
                                                <td
                                                    class="px-5 py-5 border-b border-gray-200 text-lg"
                                                >
                                                    <box-icon
                                                        name="pencil"
                                                        type="solid"
                                                        animation="fade-right-hover"
                                                        color="green"
                                                    ></box-icon>
                                                </td>
                                                <td
                                                    class="px-7 py-5 border-b border-gray-200 text-lg"
                                                >
                                                    <box-icon
                                                        class="cursor-pointer"
                                                        type="solid"
                                                        name="trash-alt"
                                                        animation="tada-hover"
                                                        color="green"
                                                        @click="deleteAndUpdateCache(post.id)"
                                                    ></box-icon>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
    <section class="max-w-screen-xl items-center py-6 px-6 mx-auto md:px-12 lg:px-16 xl:px-24">
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
            <div class="inline-block min-w-full shadow rounded-lg overflow-y-auto h-128">
                <table class="min-w-full leading-normal">
                    <thead class="sticky top-0">
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'title': 'asc' }"
                            >Recipe</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'avg_rating': 'desc' }"
                            >Rating</th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                @click="filter = { 'created_at': 'desc' }"
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
                        <p v-if="recipesError">Something went wrong...</p>
                        <p v-if="recipesLoading">Loading...</p>
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
                                    <box-icon
                                        name="pencil"
                                        type="solid"
                                        animation="fade-right-hover"
                                        color="green"
                                    ></box-icon>
                                </td>
                                <td class="px-7 py-5 border-b border-gray-200 text-xl">
                                    <box-icon
                                        class="cursor-pointer"
                                        type="solid"
                                        name="trash-alt"
                                        animation="tada-hover"
                                        color="green"
                                        @click="deleteAndUpdateCache(post.id)"
                                    ></box-icon>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { get_user_data, recipe_by_user, sort_user_recipe } from '../graphql/query'
import { update_profile, delete_recipe } from "../graphql/mutation"
import { RotateSquare2 } from '@dgknca/vue-loading-spinner'
import { useHead } from '@vueuse/head'
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

const {
    result: recipeRes,
    loading: loadingRes,
    error: resErro,
    refetch: resRefetch
} = useQuery(recipe_by_user.query,
    () => ({ user_id: userId.value }))

const recipe = useResult(recipeRes, null, data => data.recipe);

const {
    result: sortR,
    loading: sortL,
    error: sortE,
    refetch: sortRef
} = useQuery(sort_user_recipe.query,
    () => ({ user_id: userId.value, order: filter.value }))

const sortRecipe = useResult(sortR, null, data => data.recipe);
console.log('sorted vaulue', sortRecipe);

// console.log('recipe id', recipe.value);
// onResult(queryResult => {
//     console.log(queryResult.data, 'this is queyr result from profile page')
//     if (queryResult.data) {
//         oldAvatar.value = queryResult.data.user_by_pk.avatar
//         oldName.value = queryResult.data.user_by_pk.name
//         oldBio.value = queryResult.data.user_by_pk.bio
//         oldEmail.value = queryResult.data.user_by_pk.email

//         newName.value = oldName.value
//         newEmail.value = oldEmail.value
//         newBio.value = oldBio.value
//     }
// })


watchEffect(() => {
    if (user.value) {
        console.log('user is available now')
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
    update: async (cache, { data: { newData } }) => {
        refetchUser()
    },
}))


const {
    mutate: deletRes,
    loading: delLoading,
    error: delError,
} = useMutation(delete_recipe.mutations)


// function deleteAndUpdate(id){
//     deletRes({id},{
//         update: (cache: {}) => {
//             const data = cache.readQuery({query: recipe_by_user, variables: {user_id: userId.value}})
//             const updateData = data.recipe.filter(rec => rec.id !== id)
//             cache.writeQuery({query: recipe_by_user, variables: {user_id: userId.value}, data: {recipe: updateData }})
//         }
//     })
// }

// ================== RECIPE =====================



// const {
//     result: userRecipe,
//     loading: recipesLoading,
//     error: recipesError,
//     refetch: recipeFetch
// } = useQuery(get_user_recipe.query, { user_id: userData.value.sub })

// const recipe = useResult(userRecipe, null, data => data.recipes)
// recipeFetch()


// const {
//     mutate: deleteRecipe,
//     loading: deleteLoading,
//     error: deleteError,
// } = useMutation(delete_recipe.mutation)

function deleteAndUpdateCache(id) {
    deletRes({ recipe_id: id }, {
        update: (cache, { }) => {
            const data = cache.readQuery({ query: recipe_by_user.query, variables: { user_id: userId.value } })
            const updateData = data.recipe.filter(rec => rec.id !== id)
            cache.writeQuery({ query: recipe_by_user.query, variables: { user_id: userId.value }, data: { recipe: updateData } })
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
.spinner {
    background-color: transparent !important;
}
</style>