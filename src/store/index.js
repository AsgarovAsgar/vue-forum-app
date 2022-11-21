import { createStore } from 'vuex'
import SourceData from '@/data'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...SourceData,
    authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
  },
  getters: {
    authUser: (state) => {
      const user = findById(state.users, state.authId);
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
      };
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
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
  },
}); 

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    resource[child].push(childId);
  };
}