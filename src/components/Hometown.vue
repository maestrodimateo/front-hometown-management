<template>
    <div role="card" class="bg-blumine-900 p-5">
        <router-link  class="text-hakki-500 block" :to="{name: 'staff', params: {id: hometown.id}}">{{ hometown.label }}</router-link>
        <a :href="hometown.base_url ?? '#'" target="_blank" 
        rel="noopener noreferrer" class="rounded bg-hakki-200 px-2 hover:bg-hakki-300 inline-block my-3">{{ hometown.base_url ?? 'No url'}}</a>
        <p class="text-white">{{ hometown.staff_count }} member(s)</p>
        <footer class="mt-5">
            <button class="btn-primary mr-3" @click="$emit('update', hometown)">edit</button>
            <button class="btn-danger" @click="$emit('delete-hometown', hometown)">delete</button>
        </footer>
    </div>
</template>

<script>
export default {
    props: ['hometown'],
    methods: {}
}
</script>

<style>

</style>