import { createStore } from 'vuex'
import SourceData from '@/data'

export default createStore({
  state: SourceData,
  actions: {
    createPost(context, post) {
      post.id = "aaaa" + Math.random() * 5;
      context.commit("setPost", post);
      context.commit("appendPostToThread", { postId: post.id, threadId: post.threadId });
    }
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post)
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find(thread => thread.id === threadId)
      thread.posts.push(postId)
    }
  }
}) 