<template>
  <div class="space-y-4">
    <div v-for="post in posts" :key="post.id" class="p-4 rounded shadow flex gap-8 bg-white">
      <div v-if="userById(post.userId)" class="flex flex-col gap-4 w-24">
        <h2 class="text-green-500 text-sm">{{ userById(post.userId).name }}</h2>
        <img class="h-20 w-20 border rounded-full flex-shrink-0 object-cover" :src="userById(post.userId).avatar" alt="">
        <p class="text-xs">{{ userById(post.userId).postsCount }} posts</p>
        <p class="text-xs">{{ userById(post.userId).threadsCount }} threads</p>
      </div>
      <div class="flex flex-col justify-between w-full">
        <p>{{ post.text }}</p>
        <div class="text-xs text-gray-500 self-end">
          <AppDate :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    userById(userId) {
      return this.$store.getters.user(userId)
      // return this.users.find(user => user.id === userId)
    }
  }
}
</script>

<style>

</style>