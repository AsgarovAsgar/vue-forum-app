<template>
  <div class="bg-slate-100 h-full">
    <div class="p-4 max-w-4xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold">{{thread.title}}</h1>
      <PostList :posts="threadPosts"/>
      <PostEditor @save="addPost" />
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'

export default {
  name: 'ThreadShow',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList,
    PostEditor
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
    }
  },
  computed: {
    thread() {
      return this.threads.find(thread => thread.id === this.$route.params.id)
    },
    threadPosts() { 
      return this.posts.filter(post => post.threadId === this.id) 
    }
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      }

      this.posts.push(post)
      this.thread.posts.push(post.id)
    }
  }
}
</script>

<style>

</style>