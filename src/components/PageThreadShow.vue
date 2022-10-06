<template>
  <div class="bg-slate-100 h-full">
    <div class="p-4 max-w-4xl mx-auto space-y-4">
      <h1 class="text-3xl font-bold">{{thread.title}}</h1>
      <div v-for="postId in thread.posts" :key="postId" class="p-4 rounded shadow flex gap-8  bg-white">
        <div class="flex flex-col gap-4 w-24">
          <h2 class="text-green-500 text-sm">{{ userById(postById(postId).userId).name }}</h2>
          <img class="h-20 w-20 border rounded-full flex-shrink-0 object-cover" :src="userById(postById(postId).userId).avatar" alt="">
          <p class="text-xs">{{ Object.keys(userById(postById(postId).userId).posts).length }} posts</p>
        </div>
        <div class="flex flex-col justify-between w-full">
          <p>{{ postById(postId).text }}</p>
          <p class="text-xs text-gray-500 self-end">{{postById(postId).publishedAt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  computed: {
    thread() {
      const _threads = Object.entries(this.threads)
      let output
      for (let thread of _threads) {
        if(thread[0] !== this.$route.params.id) continue //this.$route.params.id
        output = thread[1]

      }
      return output
    }
  },
   methods: {
    postById(postId) {
      const _posts = Object.entries(this.posts)
      for (let post of _posts) {
        if(post[0] !== postId) continue
        return post[1]
        // console.log(post);

      }
    },
    userById(userId) {
      const _users = Object.entries(this.users)
      for (let user of _users) {
        if(user[0] !== userId) continue
        return user[1]
        // console.log('User: ', user);
      }
    }
  }
}
</script>

<style>

</style>