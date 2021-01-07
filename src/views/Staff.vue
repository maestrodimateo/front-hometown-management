<template>
    <Heading @toggleHide="$router.push({name: 'createstaff', params: {id: $route.params.id}})" @search="search" title="staff"/>
    <div class="mt-5">
        <p class="text-white mb-5">{{count}} result(s)</p>
        <div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
        <div class="grid lg:grid-cols-5 gap-4">
            <Member v-for="member in members" :key="member.id" :member="member" @setMember="set_member"/>
        </div>
    </div>
    <!-- Modal for delete -->
    <Modal :title="'Do you really want to delete ' + member.fullname + ' ?'" :visible="visible.member_delete">
        <div class="my-3 flex justify-between">
            <button class="btn-danger w-1/3" @click="delete_member">Yes</button>
            <button class="btn-success w-1/3" @click="toggle_hide('member_delete')">No</button>
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
            this.members = await get_staff();
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