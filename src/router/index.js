import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Category from "@/pages/Category.vue";
import Forum from "@/pages/Forum.vue";
import ThreadShow from "@/pages/ThreadShow.vue";
import ThreadCreate from "@/pages/ThreadCreate.vue";
import ThreadEdit from "@/pages/ThreadEdit.vue";
import NotFound from "@/pages/NotFound.vue";
import Profile from "@/pages/Profile.vue";

import sourceData from '@/data.json'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      //check if thread exist
      // const thread = threadById(to.params.id);
      const thread = sourceData.threads.find(thread => thread.id === to.params.id);
      // if exists continue
      if (thread) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
});

export default router