<template>

    <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
    <form @submit.prevent="save">
        <!-- email field -->
        <div class="flex flex-col my-5">
            <label for="label" class="mb-3 text-white">label</label>
            <div class="relative">
                <input type="text" v-model.lazy="label" required class="input-style" placeholder="Enter the hometown's label" id="label">
                <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </div>
        </div>
        <!-- base url field -->
        <div class="flex flex-col my-5">
            <label for="base_url" class="mb-3 text-white">Base url</label>
            <div class="relative">
                <input type="url" v-model.lazy="base_url" class="input-style" placeholder="Enter the base url" id="base_url">
                <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <div role="alert" class="alert-danger" v-if="is_success(false)" v-html="message.content.base_url"></div>
            </div>
        </div>

        <button type="submit" class="btn-primary mr-3" v-if="hometown">Update</button>
        <button type="submit" class="btn-primary mr-3" v-else>Add</button>
        <button type="reset" class="btn-danger" @click="hide">Cancel</button>
    </form>
</template>

<script>
import {add_hometown, update_hometown} from '../Apis/hometowns-endpoints';
import mixins from '../mixins';

export default {
    emits: ['update-key', 'hide'],
    mixins: [mixins],
    props: ['hometown'],
    data() {
        return {
            label: '',
            base_url: '',
        }
    },

    mounted() {
            
        this.label = this.hometown.label;
        this.base_url = this.hometown.base_url;
    },

    methods: {
        hide() {
            this.reset();
            this.$emit('hide');
        },

        reset() {
            this.label = '';
            this.base_url = '';
        },
       async save() {

            if (!this.label == "") {
                const response = (this.hometown == '') ? await this.add() : await this.update();
                this.get_response(response, () => { this.hide(); this.$emit('update-key') });
            }
        },
        async add() {
            return await add_hometown(this.label, this.base_url);
        },
        async update() {
            return await update_hometown(this.label, this.base_url, this.hometown.id);
        }
    }
}
</script>

<style>

</style>