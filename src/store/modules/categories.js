import { findById, docToResource, makeAppendChildToParentMutation } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {},
  actions: {
    fetchCategory: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "categories", emoji: "😻" }, { root: true }),
    fetchCategories: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "categories", emoji: "😻" }, { root: true }),
    fetchAllCategories({ commit }) {
      console.log("🔥", "😻", "all");
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection("categories")
          .onSnapshot((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => {
              const item = { id: doc.id, ...doc.data() };
              commit("setItem", { resource: "categories", item }, { root: true });
              return item;
            });
            resolve(categories);
          });
      });
    },
  },
  mutations: {},
};