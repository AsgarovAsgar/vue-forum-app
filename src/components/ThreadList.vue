<template>
<div class="border max-w-6xl mx-auto">
  <h1 class="bg-indigo-700 text-white py-2 px-4 text-lg">Threads</h1>
  <div v-for="thread in threads" :key="thread.id" class=" py-2 px-4 w-full flex justify-between odd:bg-white even:bg-slate-100">
    <div class="w-3/4">
      <p class="text-green-500 text-lg">
        <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{thread.title}}</router-link>
      </p>
      <p class="text-sm">By 
        <span>{{ userById(thread.userId).name }}</span>, 
        <AppDate :timestamp="thread.publishedAt" /></p>
    </div>
    <div class="text-lg w-1/4 flex items-center">
      <p>{{thread.posts.length}} replies</p>
    </div>
    <div class="flex gap-2 w-1/4">
      <img class="w-10 h-10 rounded-full object-cover" :src="userById(thread.userId).avatar" alt="">
      <div class="text-sm">
        <p class="text-green-500">
          <a href="#">{{ userById(thread.userId).name }}</a>
        </p>
        <p>
          <AppDate :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div> 
  </div>
</div>
</template>

<script>

export default {
  props: {
    threads: {
      type: Object,
      required: true
    }
  },
  computed: {
    users() { 
      return this.$store.state.users 
    },
    posts() { 
      return this.$store.state.posts
    },
  },
  methods: {
    postById(postId) {
      return this.posts.find(post => post.id === postId)
    },
    userById(userId) {
      return this.users.find(user => user.id === userId)
    }
  }
}
</script>

<style>

</style>