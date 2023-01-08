import { findById, docToResource, makeAppendChildToParentMutation } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {},
  actions: {
    async createPost({ commit, state, rootState }, post) {
      post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
      post.userId = rootState.auth.authId;
      // const newPost = await db.collection('posts').add(post)
      // await db.collection('threads').doc(post.threadId).update({
      //   posts: firebase.firestore.FieldValue.arrayUnion(newPost.id),
      //   contributors: firebase.firestore.FieldValue.arrayUnion(state.authId)
      // })
      
      // firebase
      const batch = firebase.firestore().batch()
      const postRef = firebase.firestore().collection("posts").doc()
      const threadRef = firebase.firestore().collection("threads").doc(post.threadId);
      const userRef = firebase.firestore().collection('users').doc(rootState.auth.authId)
      batch.set(postRef, post)
      batch.update(threadRef, {
        posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
        contributors: firebase.firestore.FieldValue.arrayUnion(rootState.auth.authId)
      });
      batch.update(userRef, {
        postsCount: firebase.firestore.FieldValue.increment(1)
      })
      await batch.commit()

      const newPost = await postRef.get()
      commit("setItem", { resource: "posts", item: { ...newPost.data(), id: newPost.id } }, { root: true });
      commit("threads/appendPostToThread", { childId: newPost.id, parentId: post.threadId }, { root: true });
      commit("threads/appendContributorsToThread", { childId: rootState.auth.authId, parentId: post.threadId }, { root: true });
    },
    async updatePost({ commit, state, rootState }, { text, id}) {
      const post = {
        text,
        edited: {
          at: firebase.firestore.FieldValue.serverTimestamp(),
          by: rootState.auth.authId,
          moderated: false
        },
      };
      const postRef = firebase.firestore().collection('posts').doc(id)
      await postRef.update(post)
      const updatedPost = postRef.get()
      commit('setItem', { resource: 'posts', item: updatedPost }, { root: true })
    },
    fetchPost: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "posts", emoji: "💌" }, { root: true }),
    fetchPosts: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "posts", emoji: "💌" }, { root: true }),
  },
  mutations: {},
};
