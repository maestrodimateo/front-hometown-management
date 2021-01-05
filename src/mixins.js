export default {

    data() {
        return {
            visible: {
                hometown_new: false,
                password: false,
                hometown_delete: false
            },
            message: {
                success: true,
                content: ''
            },
        }
    },

    methods: {
        toggle_hide(element) {
            this.visible[element] = !this.visible[element];
        },

        is_success(success = true) {
            return this.message.success === success && this.message.content !== '';
        },

        get_response(response, updating) {
            if (response.status) {
                this.message.content = response.success;
                setTimeout(updating, 1000);
            } else {
                this.message = { success: false, content: response.error };
            }
        }
    }
}