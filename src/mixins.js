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

        is_success(success = true, field = undefined) {
            if (field === undefined) {

                return this.message.success === success
            }

            return this.message.success === success
            && Object.prototype.hasOwnProperty.call(this.message.content, field);
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