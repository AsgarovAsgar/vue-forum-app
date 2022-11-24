import { createStore } from 'vuex'
// import SourceData from '@/data'
import { findById, upsert } from '@/helpers'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default createStore({
  state: {
    // categories: [],
    forums: [],
    posts: [],
    threads: [],
    users: [],
    // ...SourceData,
    authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: (state) => {
      return (id) => {
        const user = findById(state.users, id);
        if (!user) return null;
        return {
          ...user,
          // authUser.post
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          // authUser.postCount
          get postsCount() {
            return this.posts.length;
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
          get threadsCount() {
            return this.threads.length;
          },
        };
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors.length;
          },
        };
      };
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = "aaaa" + Math.random() * 5;
      post.publishedAt = Math.floor(Date.now() / 1000);
      post.userId = state.authId;
      commit("setItem", { resource: "posts", item: post });
      commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      commit("appendContributorsToThread", {
        childId: state.authId,
        parentId: post.threadId,
      });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "aaaa" + Math.random() * 5;
      const publishedAt = Math.floor(Date.now() / 1000);
      const userId = state.authId;
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id,
      };
      commit("setItem", { resource: "threads", item: thread });
      commit("appendThreadToUser", { parentId: userId, childId: id });
      commit("appendThreadToForum", { parentId: forumId, childId: id });
      dispatch("createPost", { text, threadId: id });
      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit("setItem", { resource: "threads", item: newThread });
      commit("setItem", { resource: "posts", item: newPost });
      return newThread;
    },
    updateUser({ commit }, user) {
      commit("setItem", { resource: "users", item: user });
    },
    fetchThread({ dispatch }, { id }) {
      return dispatch("fetchItem", { id, resource: "threads", emoji: "🧵" });
    },
    fetchUser({ dispatch }, { id }) {
      return dispatch("fetchItem", { id, resource: "users", emoji: "🙎‍♀️" });
    },
    fetchPost({ dispatch }, { id }) {
      return dispatch("fetchItem", { id, resource: "posts", emoji: "💌" });
    },
    fetchThreads({ dispatch }, { ids }) {
      dispatch("fetchItems", { ids, resource: "threads", emoji: "🧵" });
    },
    fetchUsers({ dispatch }, { ids }) {
      dispatch("fetchItems", { ids, resource: "users", emoji: "🙎‍♀️" });
    },
    fetchPosts({ dispatch }, { ids }) {
      dispatch("fetchItems", { ids, resource: "posts", emoji: "💌" });
    },
    fetchItem({ state, commit }, { id, emoji, resource }) {
      console.log("🔥", emoji, id);
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection(resource)
          .doc(id)
          .onSnapshot((doc) => {
            const item = { ...doc.data(), id: doc.id };
            commit("setItem", { resource, item });
            resolve(item);
          });
      });
    },
    fetchItems({ dispatch }, { ids, resource, emoji }) {
      return Promise.all(
        ids.map((id) => dispatch("fetchItem", { id, resource, emoji }))
      );
    },
  },
  mutations: {
    setItem(state, { resource, item }) {
      upsert(state[resource], item);
      // const userIndex = state.users.findIndex(user => user.id === userId)
      // state.users[userIndex] = user
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
    appendContributorsToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "contributors",
    }),
  },
}); 

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if(!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}