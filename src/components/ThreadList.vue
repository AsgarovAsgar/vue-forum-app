<template>
<div class="border max-w-6xl mx-auto">
  <h1 class="bg-indigo-700 text-white py-2 px-4 text-lg">Threads</h1>
  <div v-for="thread in threads" :key="thread.id" class=" py-2 px-4 w-full flex justify-between odd:bg-white even:bg-slate-100">
    <div class="w-3/4">
      <p class="text-green-500 text-lg">
        <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{thread.title}}</router-link>
      </p>
      <p class="text-sm">By {{ userById(thread.userId).name }}, {{thread.publishedAt}}</p>
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
        <p>{{thread.publishedAt}}</p>
      </div>
    </div> 
  </div>
</div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    threads: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  methods: {
    // threadId(thread) {
    //   return Object.entries(thread)[Object.entries(thread).length - 1][1]
    // },
    postById(postId) {
      // const _posts = Object.entries(this.posts)
      // for (let post of _posts) {
      //   if(post[0] !== postId) continue
      //   return post[1]
      //   // console.log(post);

      // }
      return this.posts.find(p => p.id === postId)
    },
    userById(userId) {
      // const _users = Object.entries(this.users)
      // for (let user of _users) {
      //   if(user[0] !== userId) continue
      //   return user[1]
      //   // console.log('User: ', user);
      // }
      return this.users.find(u=> u.id === userId)
    }
  }
}
</script>

<style>

</style>