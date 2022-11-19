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
  computed: {
    threads() { 
      return this.$store.state.threads 
    },
    posts() { 
      return this.$store.state.posts
    },
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

      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style>

</style>