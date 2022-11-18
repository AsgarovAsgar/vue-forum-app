import { createApp } from 'vue'
import App from './App.vue'
import "./main.css";
import router from '@/router'
import store from "@/store";
import AppDate from '@/components/AppDate'

const forumApp = createApp(App)
forumApp.component('AppDate', AppDate)
forumApp.use(router);
forumApp.use(store);
forumApp.mount("#app");

