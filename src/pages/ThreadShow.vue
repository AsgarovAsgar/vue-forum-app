<template>
  <div class="bg-slate-100 h-full">
    <div class="p-4 max-w-4xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold">{{thread.title}}</h1>
      <PostList :posts="threadPosts"/>
      <div id="form">
        <form @submit.prevent="addPost" class="flex flex-col space-y-4">
          <!-- <textarea :value="newPostText" @input="newPostText = $event.target.value"></textarea> -->
          <textarea v-model="newPostText" class="rounded border p-4" cols="30" rows="10"></textarea>
          <div class="flex justify-end">
           <button class="rounded px-6 py-3 bg-blue-700 text-white">Submit post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'

export default {
  name: 'ThreadShow',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: ''
    }
  },
  computed: {
    thread() { return this.threads.find(thread => thread.id === this.$route.params.id) },
    threadPosts() { return this.posts.filter(post => post.threadId === this.id) }
  },
  methods: {
    addPost() {
      const postId = 'aaaa' + Math.random() * 5
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1'
      }
      this.posts.push(post)
      this.thread.posts.push(postId)
      this.newPostText = ''
    }
  }
}
</script>

<style>

</style>