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
    }),

    actions: {
        // resetForm() {
        //     setTimeout(() => {
        //         this.recipeForm.title = ''
        //         this.recipeForm.category = ''
        //         this.recipeForm.calories = ''
        //         this.recipeForm.serving = ''
        //         this.recipeForm.prep_time = ''
        //         this.recipeForm.description = ''
        //         this.recipeForm.images = []
        //         this.recipeForm.ingredients = [{ name: '', amount: '' }]
        //         this.recipeForm.steps = [{ step: '' }]
        //         this.recipeForm.user_id = null
        //     }, 5000)
        // }
    },
    persist: {
        enabled: true,
        strategies: [{ key: 'recipe', storage: localStorage }],
    },
})
