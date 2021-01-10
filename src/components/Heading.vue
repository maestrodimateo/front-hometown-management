<template>
    <div class="bg-blumine-900 py-5 px-3 lg:flex justify-between items-center">
        <div>
            <router-link to ="/hometowns" class="inline-block mr-3 p-5 bg-hakki-500 rounded text-blumine-600">HOMETOWN MANAGEMENT</router-link>
            <button class="btn-primary my-3" @click="$emit('toggle-hide')" v-if="bar_visible" >New {{title}}</button>
        </div>
        <!-- reseach bar -->
        <div class="flex lg:w-2/6 justify-end">
            <div class="relative w-full" v-if="bar_visible">
                <input type="search" v-model="name" required class="input-style" :placeholder="'Research a ' + title" @input="$emit('search', name)">
                <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <button class="btn-dark ml-3" title="Logout" @click="disconnect">
                <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['toggle-hide', 'search'],
    props: ['title', 'visible'],
    data() {
        return { name: '', bar_visible: true}
    },
    methods: {

        disconnect() {
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            this.$router.push('/');
        }
    },
    created() {
        this.bar_visible = (this.visible) ?? true;
    }
}
</script>

<style>

</style>