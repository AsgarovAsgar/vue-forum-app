<template>
  <div>Page Home</div>
  <div v-for="thread in threads" :key="thread.id">
    <h2>{{thread.title}}</h2>
    <div v-for="postId in thread.posts" :key="postId">
      <p>{{ postId }}</p>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  methods: {
    postById(postId) {
      console.log(postId);
      this.posts.find(p => this.test == p)
    }
  }
}
</script>

<style>

</style>