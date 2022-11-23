import { createStore } from 'vuex'
// import SourceData from '@/data'
import { findById, upsert } from '@/helpers'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default createStore({
  state: {
    categories: [],
    forums: [],
    posts: [],
    threads: [],
    users: [],
    // ...SourceData,
    authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id)
        if (!user) return null
        return {
          ...user,
          // authUser.post
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          // authUser.postCount
          get postsCount() {
            return this.posts.length;
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
          get threadsCount() {
            return this.threads.length;
          },
        }
      }
    },
    thread: state => {
      return id => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
        }
      }
    }
  },
  actions: {
    createPost({commit, state}, post) {
      post.id = "aaaa" + Math.random() * 5;
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = state.authId
      commit("setPost", { post });
      commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      commit("appendContributorsToThread", {
        childId: state.authId,
        parentId: post.threadId,
      });
    },
    async createThread({commit, state, dispatch }, { text, title, forumId }) {
      const id = "aaaa" + Math.random() * 5;
      const publishedAt = Math.floor(Date.now() / 1000);
      const userId = state.authId;
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id
      }
      commit('setThread', { thread })
      commit("appendThreadToUser", { parentId: userId, childId: id });
      commit('appendThreadToForum', { parentId: forumId, childId: id });
      dispatch('createPost', { text, threadId: id })
      return findById(state.threads, id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setThread', {thread: newThread})
      commit("setPost", { post: newPost });
      return newThread
    },
    updateUser({commit}, user) {
      commit('setUser', { user, userId: user.id } )
    },
    fetchThread({state, commit}, {id}) {
      console.log('fireeee', id);
      return new Promise(resolve => {
        firebase.firestore().collection('threads').doc(id).onSnapshot(doc => {
          const thread = {...doc.data(), id: doc.id}
          commit('setThread', { thread })
          resolve(thread)
      })
      })
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    setUser(state, { user }) {
      upsert(state.users, user )
      // const userIndex = state.users.findIndex(user => user.id === userId)
      // state.users[userIndex] = user
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    appendContributorsToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
  },
}); 

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if(!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}