export default {

    data() {
        return {
            visible: {
                hometown_new: false,
                password: false,
                hometown_delete: false,
                member_delete: false,
            },
            message: {
                success: false,
                content: ''
            },
        }
    },

    methods: {
        toggle_hide(element) {
            this.visible[element] = !this.visible[element];
        },

        is_success(success = true) {
            return this.message.success === success
        },

        get_response(response, updating = null) {
            
            this.message = response
            if (updating !== null) setTimeout(updating, 1000);
        }
    }
}