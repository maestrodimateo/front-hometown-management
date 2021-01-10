<template>
    <div role="card" class="text-white bg-blumine-900 h-96 flex flex-col justify-between shadow">
        <div class="h-3/6 relative" @mouseenter="toggle_hide('second')" @mouseleave="toggle_hide('second')">
            <div class="bg-gray-800 bg-opacity-75 absolute w-full h-full flex justify-center items-center" v-if="visible.second">
                <a download target="_blank" :href="member.photo" class="btn-dark inline-block">
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>                                
            </div>
            <img :src="member.photo" :alt="member.fullname" class="h-full w-full object-cover">
        </div>
        <div class="p-3">
            <h2 class="text-lg text-hakki-500">{{member.fullname}}</h2>
            <p>{{member.status}}</p>
        </div>
        <footer class="p-3">
            <button class=" btn-dark mr-3" title="Edit the member" @click="$emit('edit-member', member)">
                <svg class="w-7"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button class="btn-dark" @click="$emit('set-member', member)" title="delete the member">
                <svg class="w-7"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <button class="btn-dark ml-3" @click="toggle_hide('first')" title="Display the qr-code">
                <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            </button>
        </footer>
    </div>
    <Modal :title="'The Qr-code of ' + member.fullname" :visible="visible.first">
        <div class="bg-white p-3 mt-3">
            <div class="flex items-center justify-center p-3">
                <img :src="member.qrcode" :alt="member.fullname">
            </div>
            <div class="flex justify-center items-center">
                <a download :href="member.qrcode" target="_blank" class="btn-primary mr-3 text-black inline-block">
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
                <button class="btn-danger" @click="toggle_hide('first')" >
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from '../components/Modal';
import mixins from '../mixins';
export default {
    emits: ['set-member', 'edit-member'],
    mixins: [mixins],
    components: {Modal},
    props: ['member'],
}
</script>