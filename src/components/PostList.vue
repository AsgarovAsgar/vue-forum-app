<template>
  <div class="space-y-4">
    <div v-for="post in posts" :key="post.id" class="p-4 rounded shadow flex gap-8 bg-white">
      <div class="flex flex-col gap-4 w-24">
        <h2 class="text-green-500 text-sm">{{ userById(post.userId).name }}</h2>
        <img class="h-20 w-20 border rounded-full flex-shrink-0 object-cover" :src="userById(post.userId).avatar" alt="">
        <p class="text-xs">{{ userById(post.userId).postsCount }} posts</p>
      </div>
      <div class="flex flex-col justify-between w-full">
        <p>{{ post.text }}</p>
        <p class="text-xs text-gray-500 self-end">{{ post.publishedAt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      users: sourceData.users
    }
  },
  methods: {
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