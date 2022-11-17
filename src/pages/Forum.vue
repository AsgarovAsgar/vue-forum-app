<template>
  <div class="space-y-4 m-4">
    <h1 class="text-3xl font-bold">{{ forum.name }}</h1>
    <div class="flex justify-between">
      <h2 class="text-xl font-bold">{{ forum.description }}</h2>
      <button class="px-4 py-2 text-lg bg-green-500 text-white rounded">Start a thread</button>
    </div>
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'
import sourceData from '@/data.json'
export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum() {
      return sourceData.forums.find(forum => forum.id === this.id)
    },
    threads() {
      return sourceData.threads.filter(thread => thread.forumId === this.id)
    }
  }
}
</script>

<style>

</style>