import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Forum from "@/pages/Forum.vue";
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";

import sourceData from '@/data.json'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      //check if thread exist
      // const thread = threadById(to.params.id);
      const thread = sourceData.threads.find(thread => thread.id = to.params.id);
      // if exists continue
      if(thread) {
        return next()
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash
        });
      }
    }
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const threadById = function (id) {
  // const _threads = Object.entries(sourceData.threads);
  // for (let t of _threads) {
  //   if (t[0] !== id) continue;
  //   return t[1];
  //   // console.log('User: ', user);
  // }

};

export default router