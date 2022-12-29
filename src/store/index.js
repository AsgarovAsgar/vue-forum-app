import { createStore } from 'vuex'
import "firebase/compat/firestore";

import getters from '@/store/getters'
import actions from "@/store/actions";
import mutations from "@/store/mutations";

export default createStore({
  state: {
    categories: [],
    forums: [],
    posts: [],
    threads: [],
    users: [],
    // ...SourceData,
    // authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
    authId: null,
    unsubscribes: [],
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null
  },
  getters,
  actions,
  mutations,
}); 