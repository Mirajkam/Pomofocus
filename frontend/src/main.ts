import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Vue from "vue";
import store from "@/store/store";
import router from "@/router/router";

loadFonts();
createApp(App).use(router).use(vuetify).use(store).mount("#app");
