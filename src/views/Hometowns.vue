<template>
	<Heading @toggleHide="toggle_visible" @search="search" title="hometown"/>
	<!-- hometown listing -->
	<div class="mt-5">
		<p class="text-white mb-5">{{ count }} result(s)</p>
		<div role="alert" class="alert-success" v-if="is_success()" v-html="message.content"></div>
		<div class="grid lg:grid-cols-4 gap-4 mb-5">
			<Hometown v-for="hometown in hometowns" :key="hometown.id" 
			@update="setHometown($event)" @deleteHometown="set_hometown($event)" :hometown="hometown"/>
		</div>
	</div>
	
	<!-- modal for add and update-->
	<Modal title="Save a hometown" :visible="visible.first">
		<HometownForm @hide="toggle_hide('first')" @updateKey="get_hometowns" :hometown="hometown"/>
	</Modal>
	
	<!-- Modal for delete -->
	<Modal :title="'Do you really want to delete ' + hometown.label + ' ?'" :visible="visible.second">
		<div class="my-3 flex justify-between">
			<button class="btn-dark w-1/3" @click="delete_hometown">
				<svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
			</button>
			<button class="btn-dark w-1/3" @click="toggle_hide('second')">
				<svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
		</div>
	</Modal>
</template>
<script>
import {
  get_hometowns,
  delete_hometown,
  search_hometown,
} from "../Apis/hometowns-endpoints";
import Hometown from "../components/Hometown";
import HometownForm from "../components/HometownForm.vue";
import Modal from "../components/Modal";
import Heading from "../components/Heading";
import mixins from "../mixins";

export default {
	mixins: [mixins],
	components: { Hometown, Modal, HometownForm, Heading },
	data() {
		return {
			hometowns: [],
			hometown: "",
			label: "",
		};
	},
	async beforeMount() {
		await this.get_hometowns();
	},
	
	methods: {
		async get_hometowns() {
			this.hometowns = await get_hometowns();
		},
		
		setHometown(hometown) {
			this.toggle_hide("first");
			this.hometown = hometown;
		},
		
		toggle_visible() {
			
			this.hometown = "";
			this.toggle_hide("first");
		},
		
		set_hometown(hometown) {
			this.toggle_hide("second");
			this.hometown = hometown;
		},
		
		async delete_hometown() {
			const response = await delete_hometown(this.hometown.id);
			this.toggle_hide("second");
			this.get_response(response, async () => {
				this.hometown = "";
				await this.get_hometowns();
			});
		},
		
		async search(name) {

			this.label = name;
			if (this.label !== "") {
				return this.hometowns = await search_hometown(this.label);
			}
			return await this.get_hometowns();
		},
	},
	
	computed: {
		count() {
			return this.hometowns.length;
		},
	},
};
</script>