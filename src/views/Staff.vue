<template>
    <Heading @toggleHide="$router.push({name: 'createstaff', params: {id: $route.params.id}})" @search="search" title="staff"/>
    <div class="mt-5">
        <p class="text-white mb-5">{{count}} result(s)</p>
        <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
        <div class="grid lg:grid-cols-5 gap-4 mb-5" v-if="count !== 0">
            <Member v-for="a_member in members" 
            :key="a_member.id"
            :member="a_member"
            @editMember="edit_member"
            @setMember="set_member"/>
        </div>
        <div class="mb-5" v-else>
            <h2 class="text-2xl text-white">No members found...</h2>
        </div>
    </div>
    <!-- Modal for delete -->
    <Modal :title="'Do you really want to delete ' + member.fullname ?? '' + ' ?'" :visible="visible.first">
        <div class="my-3 flex justify-evenly">
            <button class="btn-dark flex justify-center" @click="delete_member">
				<svg class="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
            </button>
            <button class="btn-dark flex justify-center" @click="toggle_hide('first')">
				<svg class="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
            </button>
        </div>
    </Modal>

    <Modal :title="'Edit the member ' + member.fullname" :visible="visible.second">
        <MemberEdit :member="member" @close="reset_member('second')" @getStaff="get_staff"/>
    </Modal>
</template>

<script>
import mixins from '../mixins';
import Heading from '../components/Heading';
import Modal from '../components/Modal';
import Member from '../components/Member';
import MemberEdit from '../components/MemberEdit';

import {get_staff, delete_staff, search} from '../Apis/staff-endpoints';

export default {
    mixins: [mixins],
    data() {
        return {
            members: [],
            member: {},
        }
    },
    components:{Heading, Member, Modal, MemberEdit},
    
    methods: {
        async delete_member() {
            const response = await delete_staff(this.member.id);
            this.get_response(response, async () => {
                this.reset_member()
                await this.get_staff();
            });
        },
        edit_member(member) {
            this.set_member(member, 'second');
        },

        reset_member(type = 'first') {
            this.toggle_hide(type);
            this.member = {};
        },

        set_member(member, type = 'first') {
            this.member = member;
            this.toggle_hide(type);
        },

        async get_staff() {
            this.members = await get_staff(this.$route.params.id);
        },

        async search(name) {

            if (name === '') {
                return this.get_staff();
            }

            const data = new FormData();
            data.append('fullname', name);
            data.append('hometown_id', this.$route.params.id);
            this.members = await search(data);
        },
    },

    async mounted() { this.get_staff(); },
    
    computed: {
        count() { return this.members.length; },
    }

}
</script>

<style>

</style>