import { createRouter, createWebHistory } from 'vue-router';
import all_routes from "./routes";

const routes = all_routes;

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})