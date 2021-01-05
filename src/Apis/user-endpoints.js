import axios from 'axios';

// connect the user
export async function connect(email, password) {

    const response = await axios.post('login', { email, password })

    if (response.data.token !== undefined) {

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('auth', JSON.stringify(response.data.auth));
        return true
    }
    
    return response.data.message;
}