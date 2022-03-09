<template>
<div class="w-full min-h-screen font-sans text-gray-900 bg-gradient-to-br from-transparent to-green-100">
          <div
      class="fixed px-3 py-2 text-sm font-bold text-white bg-gray-900 rounded bottom-4 left-4 z-50"
    >
      <span class="sm:hidden">DEFAULT</span>
      <span class="hidden sm:inline-block md:hidden">SM</span>
      <span class="hidden md:inline-block lg:hidden">MD</span>
      <span class="hidden lg:inline-block xl:hidden">LG</span>
      <span class="hidden xl:inline-block">XL</span>
    </div>
  <router-view>
  </router-view>
</div>

</template>

<script setup>
console.log('app is running')
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active{
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-10%);
}
</style>