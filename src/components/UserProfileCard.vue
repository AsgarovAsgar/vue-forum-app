<template>
  <div class="flex flex-col gap-2">
    <div class="p-4 flex flex-col gap-2 bg-white shadow rounded">
      <!-- <img v-if="user.avatar" class="self-center w-36 h-36 rounded-full object-cover" :src="user.avatar" :alt="`${user.username}'s profile picture`"> -->
      <img class="self-center w-36 h-36 rounded-full object-cover" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0JTIwcHJpZmllbCUyMHBpY3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="">
      <h1 class="self-center text-2xl font-bold break-all">{{ user.username }}</h1>
      <h2 class="text-xl">{{ user.name }}</h2>
      <p class="text-sm">{{user.bio || 'No bio specified.'}}</p>
      <div>
        <p class="text-xs">{{ user.username }} is online</p>
      </div>
      <div class="flex justify-between p-2 border-b">
        <p class="text-xl font-semibold">{{ `${user.postsCount} posts` }}</p>
        <p class="text-xl font-semibold">{{ `${user.threadsCount} threads` }}</p>
      </div>
      <p v-if="user.website" class="self-center text-green-500">
        <a :href="user.website" target="_blank">{{user.website}}</a>
      </p>
    </div>
    <div class="space-y-4 flex flex-col items-center">
      <p class="text-xs border-b py-2">Member since 2003, last visited 35 ago</p>
      <router-link :to="{ name: 'ProfileEdit' }" class="px-4 py-2 w-min whitespace-nowrap rounded text-sm text-white bg-green-500">Edit Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>