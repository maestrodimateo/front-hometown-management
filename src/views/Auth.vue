<template>
    <div class="bg-pattern h-screen flex justify-center items-center">
        <div class="p-5 bg-blumine-600 w-96">
            <h1 class="text-center bg-hakki-400 p-5 rounded">HOMETOWN MANAGEMENT</h1>
            <!-- error alert -->
            <div role="alert" class="alert-danger" v-if="is_success(false, 'error')" v-html="message.content.error"></div>
            <div role="alert" class="alert-danger" v-if="is_success()" v-html="message.content"></div>
            <form @submit.prevent="connect">
                <!-- email field -->
                <div class="flex flex-col my-5">
                    <label for="email" class="mb-3 text-white">Email</label>
                    <div class="relative">
                        <input type="email" v-model.lazy="email" required class="input-style" placeholder="Enter your email" id="email">
                        <svg class="input-svg"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <!-- password field -->
                <div class="flex flex-col my-5">
                    <label for="password" class="mb-3 text-white">Password</label>
                    <div class="relative">
                        <input :type="type" v-model.lazy="password" required class="input-style" placeholder="Enter your password" id="password">
                        <!-- eye can see icon -->
                        <svg v-if="visible.first" @click="toggle_hide('first')"  class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <!-- eye cannot see icon -->
                        <svg v-else @click="toggle_hide('first')" class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Log in</button>
            </form>
        </div>
    </div>
</template>

<script>
import mixins from '../mixins';
import {connect} from '../Apis/user-endpoints';

export default {
    mixins: [mixins],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        type() {
            return this.visible.first ? 'text': 'password';
        }
    },
    methods: {
        async connect() {
            const response = await connect(this.email, this.password);
            this.get_response(response);
            if (response.success === true) {
                this.$router.push('/hometowns')
            }
        }
    }
}
</script>

<style>

</style>