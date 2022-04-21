import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { defineStore } from 'pinia'

// export const useStore = defineStore('recipe', () =>  {
//     const recipeForm = ref({
//         title: 'asdfasdf',
//         category: '',
//         prep_time: 0,
//         calories: 0,
//         serving: 0,
//         description: '',
//         ingredients: [{name: "", amount: ""}],
//         steps: [{step: ""}],
//         images: [{url: ""}]
//     })

//     if(localStorage.getItem('recipeForm')){
//         userD.value = JSON.parse(localStorage.getItem('recipeForm'))
//     }

//     function registerRecipe() {
//         console.log('Submitting data from store: ', this.recipeForm);

//     }

//     watch(
//         recipeForm,
//         (recipeVal) => {
//           localStorage.setItem("users", JSON.stringify(recipeVal));

//           console.log('watch file', recipeVal);
//         },
//         { deep: true }
//       );

//     return {
//         recipeForm
//     }
// })

export const useStore = defineStore('recipe', {
    state: () => ({
        recipeForm: {
            title: '',
            category: '',
            calories: '',
            serving: '',
            prep_time: '',
            description: '',
            images: [],
            ingredients: [{ name: '', amount: '' }],
            steps: [{ step: '' }],
            user_id: null,
        },
        isDisable: false
    }),

    actions: {
        registerRecipe() {
            this.isDisable = true
            delete this.recipeForm.imageUpload

            console.log('Submitting data from store: ', this.recipeForm)

            const variables = this.recipeForm
            const url = 'http://localhost:8080/v1/graphql'
            const RECIPE_UPLOAD_MUTATION = `
                mutation($title: String!, $category: String!, $prep_time: Int!, $calories: Int!, $serving: Int!, $description: String!, $user_id: String!, $images: [InsertRecipeOneDerivedImagesInsertInput!]!, $steps: [InsertRecipeOneDerivedStepsInsertInput!]!, $ingredients:[InsertRecipeOneDerivedIngredientInsertInput!]!){
                InsertRecipeOneDerived(title:$title, 
                category: $category, 
                prep_time:$prep_time,
                calories:$calories,
                serving:$serving,
                description: $description,
                user_id:$user_id,
                images: $images,
                steps: $steps,
                ingredients: $ingredients
                ){
                title
                }
            }`

            const token = localStorage.getItem('token')
            const router = useRouter()

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + token,
                    'x-hasura-use-backend-only-permissions': 'true',
                },
                body: JSON.stringify({
                    query: RECIPE_UPLOAD_MUTATION,
                    variables: variables,
                }),
            }

            fetch(url, options)
                .then((res) => res.json())
                .then((res) => {
                    if (res.errors) {
                        console.log(
                            res.errors,
                            'something went wrong from front end'
                        )
                    } else {
                        alert('Recipe Uploaded Successfully!')
                        console.log('recipe uploaded successfully!')
                        this.router.push({ name: 'Browse' })
                    }
                })

            setTimeout(() => {
                this.recipeForm.title = ''
                this.recipeForm.category = ''
                this.recipeForm.calories = ''
                this.recipeForm.serving = ''
                this.recipeForm.prep_time = ''
                this.recipeForm.description = ''
                this.recipeForm.images = []
                this.recipeForm.ingredients = [{ name: '', amount: '' }]
                this.recipeForm.steps = [{ step: '' }]
                this.recipeForm.user_id = null
                this.isDisable = false
            }, 5000)


        },
    },
    persist: {
        enabled: true,
        strategies: [{ key: 'recipe', storage: localStorage }],
    },
})
