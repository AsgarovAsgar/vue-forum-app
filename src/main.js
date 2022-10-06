import { createApp } from 'vue'
import App from './App.vue'
import "./main.css";
import router from '@/router'

const forumApp = createApp(App)
forumApp.use(router);
forumApp.mount("#app");

