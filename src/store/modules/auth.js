import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import useNotifications  from "@/composables/useNotifications";

export default {
  namespaced: true,
  state: {
    authId: null,
    // authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null,
  },
  getters: {
    authUser: (state, getters, rootState, rootGetters) => {
      return rootGetters['users/user'](state.authId);
    },
  },
  actions: {
    async updateEmail({ state }, { email }) {
      return firebase.auth().currentUser.updateEmail(email)
    },
    async reauthenticate({state}, { email, password }) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password)
      await firebase.auth().currentUser.reauthenticateWithCredential(credential)
    },
    initAuthentication ({ dispatch, commit, state }) {
      return new Promise((resolve) => {
        if (state.authObserverUnsubscribe) state.authObserverUnsubscribe
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          // console.log('user has changed');
          this.dispatch("auth/unsubscribeAuthUserSnapshot");
          if (user) {
            await this.dispatch("auth/fetchAuthUser");
            resolve(user)
          } else {
            resolve(null);
          }
        });
        commit('setAuthObserverUnsubscribe', unsubscribe)
      })
    },
    async registerUserWithEmailAndPassword({ dispatch }, { email, name, username, avatar = null, password }) {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
      avatar = await dispatch('uploadAvatar', { authId: result.user.uid, file: avatar })
      await dispatch('users/createUser', { id: result.user.uid, email, name, username, avatar }, { root: true })
    },
    async uploadAvatar({state}, { authId, file }) {
      if(!file) return null
      authId = authId || state.authId
      try {
        const storageBucket = firebase.storage().ref().child(`uploads/${authId}/images/${Date.now()}-${file.name}`)
        const snapshot = await storageBucket.put(file)
        const url = await snapshot.ref.getDownloadURL()
        return url
      } catch {
        // alert('Uploading image failed!')
        const { addNotification } = useNotifications()
        addNotification( {message: 'Uploading image failed!', type: 'error', timeout: 5000 })
      }
    },
    signInWithEmailAndPassword(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    async signInWithGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider
      const response = await firebase.auth().signInWithPopup(provider)
      const user = response.user
      const userRef = firebase.firestore().collection('users').doc(user.uid)
      const userDoc = await userRef.get()
      if (!userDoc.exists) {
        return dispatch('users/createUser', { id: user.uid, name: user.displayName, email: user.email, username: user.email, avatar: user.photoURL }, { root: true })
      }
    },
    async signOut({ commit }) {
      await firebase.auth().signOut()
      commit('setAuthId', null)
    }, 
    fetchAuthUser: async ({ dispatch, state, commit }) => {
      const userId = firebase.auth().currentUser?.uid
      // console.log("userId", userId);
      if(!userId) return
      await dispatch("fetchItem", 
      { id: userId, resource: "users", emoji: "🙎‍♀️ auth", handleUnsubscribe: (unsubscribe) => { commit('setAuthUserUnsubscribe', unsubscribe)} },
      { root: true }
      );
      commit('setAuthId', userId)
    },
    async fetchAuthUsersPosts ({ commit, state }, { startAfter }) {
      // limit(10)
      // startAfter(doc)
      // orderBy()
      let query = await firebase.firestore().collection('posts')
        .where('userId', '==', state.authId)
        .orderBy('publishedAt', 'desc')
        .limit(10)

      if (startAfter) {
        const doc = await firebase.firestore().collection('posts').doc(startAfter.id).get()
        query = query.startAfter(doc)
      }

      const posts = await query.get()

      posts.forEach(item => {
        commit('setItem', { resource: 'posts', item }, { root: true })
      })
    },
    async unsubscribeAuthUserSnapshot({ state, commit }) {
      if(state.authUserUnsubscribe) {
        state.authUserUnsubscribe();
        commit('setAuthUserUnsubscribe', null)
      }
    }
  },
  mutations: {
    setAuthId(state, id) {
      state.authId = id
    },
    setAuthUserUnsubscribe(state, unsubscribe) {
      state.authUserUnsubscribe = unsubscribe
    }, 
    setAuthObserverUnsubscribe(state, unsubscribe) {
      state.authObserverUnsubscribe = unsubscribe
    },
  },
};