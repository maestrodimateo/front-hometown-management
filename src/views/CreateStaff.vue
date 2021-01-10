<template>
    <Heading :visible = "false" title="staff"/>
    <div class="mt-5">
        <h1 to ="/hometowns" class=" text-center p-5 text-2xl bg-hakki-500 rounded text-blumine-600">
            CREATE A NEW STAFF MEMBER
        </h1>
        <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
            <form @submit.prevent="save" enctype="multipart/form-data" >
                <!-- email field -->
                <div class="flex flex-col my-5">
                    <label for="fullname" class="mb-3 text-white">Fullname</label>
                    <div class="relative">
                        <input type="text" v-model.lazy="fullname" required class="input-style" placeholder="Enter your fullname" id="fullname">
                        <svg class="input-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div role="alert" class="alert-danger" v-if="is_success(false)" v-html="message.content.fullname"></div>
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
                                        <input id="photo" type="file" @change="onUpload" required class="sr-only" accept="image/png, image/jpeg">
                                    </label>
                                    <p class="pl-1"></p>
                                </div>
                                <p class="text-xs text-gray-200">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div role="alert" class="alert-danger" v-if="is_success(false)" v-html="message.content.photo"></div>
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
                    <div role="alert" class="alert-danger" v-if="is_success(false)" v-html="message.content.status"></div>
                </div>
                <button type="submit" class="btn-primary">Add staff member</button>
            </form>
        </div>
</template>

<script>
import {create_staff} from '../Apis/staff-endpoints';
import mixins from '../mixins';
import Heading from '../components/Heading';
export default {

    data(){
        return {
            fullname: '',
            photo: null,
            status: ''
        }
    },
    mixins: [mixins],
    components:{Heading},
    methods: {
        onUpload(event) {
            this.photo = event.target.files[0];
        },
 
        async save() {
            const data = this.appendFormData({
                'photo': this.photo, 
                'fullname': this.fullname, 
                'status': this.status,
                'hometown_id': this.$route.params.id
            });

            const response = await create_staff(data);
            this.get_response(response);

            this.clearAttibutes();
        },

        clearAttibutes() {
            this.photo = null;
            this.fullname = "";
            this.status = "";
        }
    },
}
</script>

<style>

</style>