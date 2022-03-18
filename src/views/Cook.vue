<template>
    <div class="brazil z-50">
        <h1>Brazil</h1>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
useHead({
  title: 'Recipe',
  style: [
    {
      children: `body {}`,
    },
  ],
});
</script>

<route>
{
  name: "Cook",
  meta: {
    requiresAuth: true
  },
}
</route>

<style  scoped>

</style>