<template>
  <Heading @toggleHide="toggle_visible" @search="search" title="hometown" />
  <!-- hometown listing -->
  <div class="mt-5">
    <p class="text-white mb-5">{{ count }} result(s)</p>
    <div
      role="alert"
      class="alert-success"
      v-if="is_success()"
      v-html="message.content"
    ></div>
    <div class="grid lg:grid-cols-4 gap-4">
      <Hometown
        v-for="hometown in hometowns"
        :key="hometown.id"
        @update="setHometown($event)"
        @deleteHometown="set_hometown($event)"
        :hometown="hometown"
      />
    </div>
  </div>

  <!-- modal for add and update-->
  <Modal title="Save a hometown" :visible="visible.hometown_new">
    <HometownForm
      @hide="toggle_hide('hometown_new')"
      @updateKey="get_hometowns"
      :hometown="hometown"
    />
  </Modal>

  <!-- Modal for delete -->
  <Modal
    :title="'Do you really want to delete ' + hometown.label + ' ?'"
    :visible="visible.hometown_delete"
  >
    <div class="my-3 flex justify-between">
      <button class="btn-danger w-1/3" @click="delete_hometown">Yes</button>
      <button class="btn-success w-1/3" @click="toggle_hide('hometown_delete')">
        No
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
      this.toggle_hide("hometown_new");
      this.hometown = hometown;
    },
    toggle_visible() {
      this.hometown = "";
      this.toggle_hide("hometown_new");
    },
    set_hometown(hometown) {
      this.toggle_hide("hometown_delete");
      this.hometown = hometown;
    },
    async delete_hometown() {
      const response = await delete_hometown(this.hometown.id);
      this.toggle_hide("hometown_delete");
      this.get_response(response, async () => {
        this.hometown = "";
        await this.get_hometowns();
      });
    },
    async search() {
      if (this.label !== "") {
        this.hometowns = await search_hometown(this.label);
      } else {
        await this.get_hometowns();
      }
    },
  },

  computed: {
    count() {
      return this.hometowns.length;
    },
  },
};
</script>