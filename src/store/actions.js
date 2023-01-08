import { docToResource, findById } from "@/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "@/config/firebase";



export default {
  
  ////
  // Fetch multiple resources
  ////
  fetchItem({ state, commit }, { id, emoji, resource, handleUnsubscribe = null }) {
    console.log("🔥", emoji, id);
    return new Promise((resolve) => {
      const unsubscribe = firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
        // console.log('SNAPSHOT', id);
        // console.log('on snapshot', resource, doc.data())

        if(doc.exists) {
          const item = { ...doc.data(), id: doc.id };
          commit("setItem", { resource, item });
          resolve(item);
        } else {
          resolve(null)
        }
      });

      if (handleUnsubscribe) {
        handleUnsubscribe(unsubscribe);
      } else {
        commit("appendUnsubscribe", { unsubscribe });
      }
    });
  },
  fetchItems({ dispatch }, { ids, resource, emoji }) {
    return Promise.all(
      ids.map((id) => dispatch("fetchItem", { id, resource, emoji }))
    );
  },
  async unsubscribeAllSnapshots ({ state, commit }) {
    state.unsubscribes.forEach(unsubscribe => unsubscribe())
    commit('clearAllUnsubscribes');
  },
};
