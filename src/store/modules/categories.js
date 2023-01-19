import { makeFetchItemAction, makeFetchItemsAction } from "@/helpers";
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
    fetchCategory: makeFetchItemAction({ resource: "categories", emoji: "😻" }),
    fetchCategories: makeFetchItemsAction({ resource: "categories", emoji: "😻" }),
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