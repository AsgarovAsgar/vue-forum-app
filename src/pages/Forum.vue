<template>
  <div v-if="asyncDataStatus_ready" class="space-y-4 m-4">
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
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    ThreadList
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum() {
      return this.$store.state.forums.items.find(forum => forum.id === this.id)
    },
    threads() {
      if (!this.forum) return []
      return this.forum.threads.map(threadId => this.$store.getters['threads/thread'](threadId))
      // return this.$store.state.threads.filter(thread => thread.forumId === this.id)
    }
  },
  methods: {
    ...mapActions('forums', ['fetchForum']),
    ...mapActions('threads', ['fetchThreads']),
    ...mapActions('users', ['fetchUsers']),
  },
  async created() {
    // console.log('this.id', this.id);
    const forum = await this.fetchForum({ id: this.id })
    const threads = await this.fetchThreads({ids: forum.threads})
    await this.fetchUsers({ ids: threads.map(thread => thread.userId) })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>

</style>