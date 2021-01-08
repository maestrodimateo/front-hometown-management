import axios from 'axios';
import { token } from '../config';

const prefix = 'hometown/';

// get all the hometowns
export async function get_hometowns() {
    const response = await axios.get(prefix + "all" + token);
    return response.data;
}

// Add a hometown
export async function add_hometown(label, base_url) {
    try {
        const response = await axios.post(prefix + "create" + token, { label, base_url });
        return { success: true, content: response.data.message };

    } catch (error) {
        return { success: false, error: error.response.data };
    }
}

// Update a hometown
export async function update_hometown(label, base_url, id) {
    try {
        const response = await axios.put(prefix + `update/${id}` + token, { label, base_url });
        return { success: true, content: response.data.message };

    } catch (error) {
        return { success: false, error: error.response.data };
    }
}

// Delete a hometown
export async function delete_hometown(id) {

    const response = await axios.delete(prefix + `delete/${id}` + token);
    return { success: true, content: response.data.message };
}

// Search a hometown
export async function search_hometown(label) {
 
    const response = await axios.post(prefix + "search" + token, { label });
    return response.data.users;
}