<template>
    <Heading @toggleHide="$router.push({name: 'createstaff', params: {id: $route.params.id}})" @search="search" title="staff"/>
    <div class="mt-5">
        <p class="text-white mb-5">{{count}} result(s)</p>
        <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
        <div class="grid lg:grid-cols-5 gap-4 mb-5">
            <Member v-for="member in members" :key="member.id" :member="member" @setMember="set_member"/>
        </div>
    </div>
    <!-- Modal for delete -->
    <Modal :title="'Do you really want to delete ' + member.fullname + ' ?'" :visible="visible.member_delete">
        <div class="my-3 flex justify-evenly">
            <button class="btn-dark flex justify-center" @click="delete_member">
				<svg class="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
            </button>
            <button class="btn-dark flex justify-center" @click="toggle_hide('member_delete')">
				<svg class="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
            </button>
        </div>
    </Modal>
</template>

<script>
import mixins from '../mixins';
import Heading from '../components/Heading';
import Modal from '../components/Modal';
import Member from '../components/Member';
import {get_staff, delete_staff} from '../Apis/staff-endpoints';

export default {
    mixins: [mixins],
    data() {
        return {
            members: [],
            member: {}
        }
    },
    components:{Heading, Member, Modal},
    
    methods: {
        async delete_member() {
            const response = await delete_staff(this.member.id);
            this.get_response(response, async () => {
                
                this.toggle_hide('member_delete');
                this.member = {};
                await this.get_staff();
            });
        },

        set_member(member) {
            this.member = member;
            this.toggle_hide('member_delete');
        },

        async get_staff() {
            this.members = await get_staff(this.$route.params.id);
        }
    },

    async mounted() {
        this.get_staff();
    },
    
    computed: {
        count(){
            return this.members.length;
        }
    }

}
</script>

<style>

</style>