<template>
  <div class="space-y-4 m-4">
    <div v-if="forum" class="mx-auto max-w-6xl">
      <h1 class="text-3xl font-bold">{{ forum.name }}</h1>
      <div class="flex justify-between">
        <h2 class="text-xl font-bold">{{ forum.description }}</h2>
        <router-link :to="{name: 'ThreadCreate', params: {forumId: forum.id}}" class="px-4 py-2 text-lg bg-green-500 text-white rounded">Start a thread</router-link>
      </div>
    </div>
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'
import { mapActions } from 'vuex'
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
      return this.$store.state.forums.find(forum => forum.id === this.id)
    },
    threads() {
      if (!this.forum) return []
      return this.forum.threads.map(threadId => this.$store.getters.thread(threadId))
      // return this.$store.state.threads.filter(thread => thread.forumId === this.id)
    }
  },
  methods: {
    ...mapActions(['fetchForum', 'fetchThreads', 'fetchUsers']),
  },
  async created() {
    // console.log('this.id', this.id);
    const forum = await this.fetchForum({ id: this.id })
    const threads = await this.fetchThreads({ids: forum.threads})
    this.fetchUsers({ ids: threads.map(thread => thread.userId) })
  }
}
</script>

<style>

</style>