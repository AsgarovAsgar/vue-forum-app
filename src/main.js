import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import PageHome from "./components/PageHome.vue";
import PageThreadShow from "./components/PageThreadShow.vue";

const routes = [
  { path: "/", component: PageHome },
  { path: "/thread/:id", component: PageThreadShow },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const forumApp = createApp(App)
forumApp.use(router);
forumApp.mount("#app");

