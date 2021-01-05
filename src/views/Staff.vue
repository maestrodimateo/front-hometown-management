<template>
    <Heading @toggleHide="toggle_hide" @search="search" title="staff"/>
    <div class="mt-5">
        <p class="text-white mb-5">1 result(s)</p>
        <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
        <div class="grid grid-cols-5 gap-4">
            <div role="card" class="text-white bg-blumine-900">
                <img src="../assets/profile.jpg" alt="profile">
                <div class="p-3">
                    <h2>MEBALE Noël</h2>
                    <p>Agent municipal</p>
                </div>
                <footer class="p-3" >
                    <button class="btn-primary mr-3 text-black">edit</button>
                    <button class="btn-danger">delete</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '../mixins';
import Heading from '../components/Heading';

export default {
    mixins: [mixins],
    components:{Heading},
    methods: {
        search() {

        }
    }
}
</script>

<style>

</style>