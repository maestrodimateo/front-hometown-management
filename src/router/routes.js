import Auth from '../views/Auth.vue';
import CreateStaff from '../views/CreateStaff.vue';
import Hometowns from '../views/Hometowns.vue';
import Staff from '../views/Staff.vue';
import Contained from '../layouts/Contained.vue';

const meta = { layout: Contained };

export default [
    { path: '/', component: Auth, name: 'auth' },
    { path: '/hometown/:id/create-staff', component: CreateStaff, name: 'createstaff', meta },
    { path: '/hometowns', component: Hometowns, name: 'hometowns', meta },
    { path: '/hometown/:id/staff', component: Staff, name: 'staff', meta },
];