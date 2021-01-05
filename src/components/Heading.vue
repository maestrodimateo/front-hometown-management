<template>
    <div class="bg-blumine-900 py-5 px-3 lg:flex justify-between items-center">
        <div>
            <router-link to ="/hometowns" class="inline-block mr-3 p-5 bg-hakki-500 rounded text-blumine-600">HOMETOWN MANAGEMENT</router-link>
            <button class="btn-primary my-3" @click="$emit('toggle-hide')" >New {{title}}</button>
        </div>
        <!-- reseach bar -->
        <div class="relative lg:w-2/6">
            <input type="search" v-model="name" required class="input-style" :placeholder="'Research a ' + title" @input="$emit('search')">
            <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['research_name', 'title'],
    data() {
        return { name: '' }
    },
    created() {
        this.name = this.research_name
    }
}
</script>

<style>

</style>