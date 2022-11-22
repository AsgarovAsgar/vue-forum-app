<template>
  <div class="bg-slate-100 h-full">
    <div class="p-4 max-w-4xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{thread.title}}</h1>
        <router-link :to="{name: 'ThreadEdit', params: {id: this.id}}" class="rounded bg-blue-500 px-4 py-2 text-white text-sm" >Edit</router-link>
      </div>
      <div class="flex items-center justify-between">
        <div>By {{ thread.author.name }}, <AppDate :timestamp="thread.publishedAt" /></div>
        <p>{{thread.repliesCount}} replies by {{thread.contributorsCount}} contributors</p>
      </div>
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
      return this.$store.getters.thread(this.id)
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