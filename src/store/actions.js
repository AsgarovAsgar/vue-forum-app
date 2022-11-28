import { findById } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "@/config/firebase";



export default {
  async createPost({ commit, state }, post) {
    post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
    post.userId = state.authId;
    // const newPost = await db.collection('posts').add(post)
    // await db.collection('threads').doc(post.threadId).update({
    //   posts: firebase.firestore.FieldValue.arrayUnion(newPost.id),
    //   contributors: firebase.firestore.FieldValue.arrayUnion(state.authId)
    // })
    
    // firebase
    const batch = firebase.firestore().batch()
    const postRef = firebase.firestore().collection("posts").doc()
    const threadRef = firebase.firestore().collection("threads").doc(post.threadId);
    const userRef = firebase.firestore().collection('users').doc(state.authId)
    batch.set(postRef, post)
    batch.update(threadRef, {
      posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
      contributors: firebase.firestore.FieldValue.arrayUnion(state.authId)
    });
    batch.update(userRef, {
      postsCount: firebase.firestore.FieldValue.increment(1)
    })
    await batch.commit()

    const newPost = await postRef.get()
    commit("setItem", { resource: "posts", item: { ...newPost.data(), id: newPost.id } });
    commit("appendPostToThread", { childId: newPost.id, parentId: post.threadId });
    commit("appendContributorsToThread", { childId: state.authId, parentId: post.threadId });
  },
  async createThread({ commit, state, dispatch }, { text, title, forumId }) {
    const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
    const userId = state.authId;

    // firebase
    const threadRef = firebase.firestore().collection('threads').doc()
    const thread = { forumId, title, publishedAt, userId, id: threadRef.id };
    const userRef = firebase.firestore().collection("users").doc(userId);
    const forumRef = firebase.firestore().collection("forums").doc(forumId);
    const batch = firebase.firestore().batch()
    batch.set(threadRef, thread)
    batch.update(userRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id)
    })
    batch.update(forumRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
    });
    await batch.commit()
    const newThread = await threadRef.get()

    commit("setItem", { resource: "threads", item: { ...newThread.data(), id: newThread.id } });
    commit("appendThreadToUser", { parentId: userId, childId: threadRef.id });
    commit("appendThreadToForum", { parentId: forumId, childId: threadRef.id });
    await dispatch("createPost", { text, threadId: threadRef.id });
    return findById(state.threads, threadRef.id);
  },
  async updateThread({ commit, state }, { title, text, id }) {
    const thread = findById(state.threads, id);
    const post = findById(state.posts, thread.posts[0]);
    const newThread = { ...thread, title };
    const newPost = { ...post, text };

    const threadRef = firebase.firestore().collection('threads').doc(id)
    const postRef = firebase.firestore().collection("posts").doc(post.id);
    const batch = firebase.firestore().batch()
    batch.update(threadRef, newThread)
    batch.update(postRef, newPost);

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
