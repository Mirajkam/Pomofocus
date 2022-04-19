import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/components/AppLogin.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
