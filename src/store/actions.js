import { findById } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default {
  async createPost({ commit, state }, post) {
    post.publishedAt = Math.floor(Date.now() / 1000);
    post.userId = state.authId;
    // firebase
    const newPost = await firebase.firestore.collection('posts').add(post)
    await firebase.firestore().collection('threads').doc(post.threadId).update({
      posts: firebase.firestore.FieldValue.arrayUnion(newPost.id),
      contributors: firebase.firestore.FieldValue.arrayUnion(state.authId)
    })

    commit("setItem", { resource: "posts", item: { ...post, id: newPost.id } });
    commit("appendPostToThread", { childId: newPost.id, parentId: post.threadId });
    commit("appendContributorsToThread", { childId: state.authId, parentId: post.threadId });
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
  fetchCategory: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "categories", emoji: "😻" }),
  fetchForum: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "forums", emoji: "📜" }),
  fetchThread: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "threads", emoji: "🧵" }),
  fetchPost: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "posts", emoji: "💌" }),
  fetchUser: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "users", emoji: "🙎‍♀️" }),
  fetchAuthUser: ({ dispatch, state }) => dispatch("fetchItem", { id: state.authId, resource: "users", emoji: "🙎‍♀️ auth" }),
  fetchAllCategories({ commit }) {
    console.log("🔥", "😻", "all");
    return new Promise((resolve) => {
      firebase
        .firestore()
        .collection("categories")
        .onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map((doc) => {
            const item = { id: doc.id, ...doc.data() };
            commit("setItem", { resource: "categories", item });
            return item;
          });
          resolve(categories);
        });
    });
  },
  ////
  // Fetch multiple resources
  ////
  fetchCategories: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "categories", emoji: "😻" }),
  fetchForums: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "forums", emoji: "📜" }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "threads", emoji: "🧵" }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "posts", emoji: "💌" }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "users", emoji: "🙎‍♀️" }),
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
};
