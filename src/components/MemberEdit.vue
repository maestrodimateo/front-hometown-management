<template>
    <form @submit.prevent="edit" enctype="multipart/form-data" >
        <!-- email field -->
        <div class="flex flex-col my-5">
            <label for="fullname" class="mb-3 text-white">Fullname</label>
            <div class="relative">
                <input type="text" v-model.lazy="fullname" required class="input-style" placeholder="Enter your fullname" id="fullname">
                <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <div role="alert" class="alert-danger" v-if="is_success(false, 'fullname')" v-html="message.content.fullname"></div>
        </div>
            <!-- picture upload -->
        <div class="flex flex-col my-5">
            <div>
                <label class="font-base text-white">Photo</label>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center text-white">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm">
                            <label for="photo" class="bg-hakki-400 hover:bg-hakki-500 p-2 relative cursor-pointer rounded-md font-medium text-blumine-600 hover:text-blumine-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload your picture or drag and drop</span>
                                <input id="photo" type="file" @change="onUpload" class="sr-only" accept="image/png, image/jpeg">
                            </label>
                            <p class="pl-1"></p>
                        </div>
                        <p class="text-xs text-gray-200">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>
            <div role="alert" class="alert-danger" v-if="is_success(false, 'photo')" v-html="message.content.photo"></div>
        </div>

        <div class="flex flex-col my-5">
            <label for="status" class="mb-3 text-white font-main">Choose your Status</label>
            <div class="relative">
                <select v-model.lazy="status" required class="input-style appearance-none" id="status">
                    <option value="Agent municipal">Agent municipal</option>
                    <option value="Maire">Maire</option>
                    <option value="Secretaire">Secretaire</option>
                </select>
                <svg class="fill-current input-svg bg-blumine-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg>
            </div>
            <div role="alert" class="alert-danger" v-if="is_success(false, 'status')" v-html="message.content.status"></div>
        </div>
        <button type="submit" class="btn-dark mr-3" title="Edit the member">
            <svg class="w-10"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        </button>
        <button type="button" class="btn-dark" @click="$emit('close')" title="close the modal">
            <svg class="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </form>
</template>

<script>
import mixins from '../mixins';
import {update_staff} from "../Apis/staff-endpoints";

export default {

    mixins: [mixins],
    emits: ['close', 'get-staff'],
    props: ['member'],
    data() {
        return { fullname: '', status: '', photo: null }
    },
    mounted() { 
        this.fullname = this.member.fullname;
        this.status = this.member.status;
    },
    methods: {
        async edit() {

            const data = this.appendFormData({
                'fullname': this.fullname,
                'status': this.status,
                '_method': 'put'
            });

            if(this.photo !== null) {
                data.append('photo', this.photo);
            }

            const response = await update_staff(data, this.member.id);
            this.get_response(response);
            this.$emit('close');
            this.$emit('get-staff');
        },
        onUpload(event) {
            this.photo = event.target.files[0];
        },
    }
}
</script>

<style>

</style>