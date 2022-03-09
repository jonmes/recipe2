<template>
    <div class="brazil z-50">
        <h1>Brazil</h1>
    </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { ref, computed } from 'vue'
useHead({
  title: 'Recipe',
  style: [
    {
      children: `body {}`,
    },
  ],
});
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<style  scoped>

</style>