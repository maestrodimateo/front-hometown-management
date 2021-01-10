export default {

    data() {
        return {
            visible: {
                first: false,
                second: false
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

        appendFormData(attributes) {

            const formData = new FormData();

            for (const name in attributes) {
                formData.append(name, attributes[name]);
            }
            return formData;
        },

        get_response(response, updating = null) {
            
            this.message = response
            if (updating !== null) setTimeout(updating, 1000);
        },
    }
}