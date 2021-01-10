import axios from 'axios';
import { token } from '../config';
const prefix = 'staff/';

// create a staff member
export async function create_staff(data) {
    try {
        const response = await axios.post(prefix + "create" + token, data);
        return { success: true, content: response.data.message };
    } catch (error) {
        return { success: false, content: error.response.data };
    }

}

// update a staff member
export async function update_staff(data, id) {
    try {
        const response = await axios.post(prefix + `update/${id}` + token, data);
        return { success: true, content: response.data.message };
    } catch (error) {
        return { success: false, content: error.response.data };
    }
}

// get all the staff members
export async function get_staff(hometown_id) {
    const response = await axios.get(prefix + `${hometown_id}/all` + token);
    return response.data;
}

// delete a staff member
export async function delete_staff(id) {
    try {
        const response = await axios.delete(prefix + `delete/${id}` + token);
        return { success: true, content: response.data.message };
    } catch (error) {
        return { success: false, content: error.response.data };
    }
}

// Search a staff member in a hometown
export async function search(formdata) {
        const response = await axios.post(prefix + `search` + token, formdata);
        return response.data.staff
}