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
    fetchForum: ({ dispatch }, { id }) => dispatch("fetchItem", { id, resource: "forums", emoji: "📜" }, { root: true }),
    fetchForums: ({ dispatch }, { ids }) => dispatch("fetchItems", { ids, resource: "forums", emoji: "📜" }, { root: true }),
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({ parent: "forums", child: "threads" }),
  },
};
