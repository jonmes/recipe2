import { ref, watch } from 'vue'
import { defineStore } from 'pinia'



export const useStore = defineStore('recipe', () =>  {
    const recipeForm = ref({
        title: "",
        category: "",
        prep_time: 0,
        calories: 0,
        serving: 0,
        description: "",
        ingredients: [{name: "", amount: ""}],
        steps: [{step: ""}],
        images: [{url: ""}]
    })

    if(localStorage.getItem('recipeForm')){
        userD.value = JSON.parse(localStorage.getItem('recipeForm'))
    }

    watch(
        recipeForm,
        (recipeVal) => {
          localStorage.setItem("users", JSON.stringify(recipeVal));
    
          console.log('watch file', recipeVal);
        },
        { deep: true }
      );

    return {
        recipeForm
    }
})
