<template>
    <footer class="bg-green-100 text-center lg:text-left w-full">
        <div
            class="text-gray-700 text-center p-4"
            style="background-color: rgba(95, 255, 170, 0.2);"
        ><div class="hidden md:flex flex justify-center align-center space-x-1 font-bold inline">
                <span>Intern project for</span>
                <Minab class="w-8 h-8 text-green-900 fill-current" />
                <span>Minab</span>
            </div>
            © 2022 Copyright: &nbsp;
            <router-link :to="{ name: 'Home' }">r<span class="text-green">E</span>cipe</router-link>
            
            
        </div>
    </footer>
</template>

<script setup>
import Minab from '../assets/icons/minab.svg'

</script>

<style lang="scss" scoped>
</style>