<template>
    <div class="min-h-screen bg-gradient-to-br from-transparent to-green-100">
        <!-- header -->

        <!-- body -->
<p v-if="allError">Something went wrong...</p>
<template v-if="allLoading"> <div class="flex justify-center items-center w-full h-screen pb-96"><RotateSquare2/></div></template>
<template v-else>{{recipe[0].title}}</template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { get_all_recipe } from '../graphql/query'
import {RotateSquare2} from '@dgknca/vue-loading-spinner'

import { useHead } from '@vueuse/head'
useHead({
    title: 'Browse Recipe',
});


const {
    result: allRecipe,
    loading: allLoading,
    error: allError
} = useQuery(get_all_recipe.query)

const recipe = useResult(allRecipe, null, data => data.recipe)
console.log(recipe.value, 'hey this is search recipe')


</script>


<style scoped>

.spinner {
    background-color: transparent !important;
}
</style>