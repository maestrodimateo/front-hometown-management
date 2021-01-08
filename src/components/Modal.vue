<template>
    <div v-if="visible" class=" fixed top-0 bottom-0 left-0 w-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div class="bg-blumine-700 rounded p-5 shadow h-auto md:w-3/12">
            <h1 class="text-center bg-hakki-400 p-5 rounded text-xl shadow text-blumine-700">{{ title }}</h1>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'visible'],

}
</script>

<style>

</style>