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
    <div class="flex justify-center mt-2 mb-8">
      <v-pagination
        v-model="page"
        :pages="totalPages"
        active-color="#57AD8D"
      />
    </div>
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
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1,
      perPage: 5
    }
  },
  computed: {
    forum() {
      return this.$store.state.forums.items.find(forum => forum.id === this.id)
    },
    threads() {
      if (!this.forum) return []
      return this.$store.state.threads.items
      .filter(thread => thread.forumId === this.forum.id)
      .map(thread => this.$store.getters['threads/thread'](thread.id))
      // return this.forum.threads.map(threadId => this.$store.getters['threads/thread'](threadId))
      // return this.$store.state.threads.filter(thread => thread.forumId === this.id)
    },
    threadCount() {
      return this.forum.threads.length
    },
    totalPages() {
      if (!this.threadCount) return 0
      return Math.ceil(this.threadCount / this.perPage)
    }
  },
  methods: {
    ...mapActions('forums', ['fetchForum']),
    ...mapActions('threads', ['fetchThreadsByPage']),
    ...mapActions('users', ['fetchUsers']),
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id })
    const threads = await this.fetchThreadsByPage({ids: forum.threads, page: this.page, perPage: this.perPage })
    await this.fetchUsers({ ids: threads.map(thread => thread.userId) })
    this.asyncDataStatus_fetched()
  },
  watch: {
    async page (page) {
      this.$router.push({ query: { page: this.page } })
    }
  }
}
</script> 

<style>

</style>