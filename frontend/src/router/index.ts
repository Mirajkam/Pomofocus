import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/components/AppLogin.vue";
import Register from "@/components/AppRegister.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
