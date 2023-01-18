import { findById, docToResource, makeAppendChildToParentMutation, makeFetchItemAction, makeFetchItemsAction } from "@/helpers";
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
    fetchForum: makeFetchItemAction({ resource: "forums", emoji: "📜" }),
    fetchForums: makeFetchItemsAction({ resource: "forums", emoji: "📜" }),
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({ parent: "forums", child: "threads" }),
  },
};
