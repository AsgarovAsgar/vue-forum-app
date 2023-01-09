<template>
  <div v-if="asyncDataStatus_ready" class="flex flex-col max-w-3xl m-4 mx-auto gap-4">
    <h1 class="text-3xl font-bold">Editin <i>{{thread.title }}</i></h1>
    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'


export default {
  components: { ThreadEditor },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    thread() {
      return this.$store.state.threads.items.find(thread => thread.id === this.id)
    },
    text() {
      const post = this.$store.state.posts.items.find(post => post.id === this.thread.posts[0])
      return post ? post.text : ''
    }
  },
  methods: {
    ...mapActions('threads', ['updateThread', 'fetchThread']),
    ...mapActions('posts', ['fetchPost']),
    async save({title, text}) {
      const thread = await this.updateThread({
        id: this.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id }})
    },
    cancel() {
      this.$router.push({ name: 'ThreadShow', params: {id: this.id }})
    }
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id })
    await this.fetchPost({ id: thread.posts[0] })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>

</style>