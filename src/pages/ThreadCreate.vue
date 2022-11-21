<template>
  <div class="flex flex-col max-w-3xl m-4 mx-auto gap-4">
    <h1 class="text-3xl font-bold">Create new thread in <i>{{forum.name}}</i></h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  computed: {
    forum() {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    async save({title, text}) {
      const thread = await this.$store.dispatch('createThread', {
        forumId: this.forumId,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id }})
    },
    cancel() {
      this.$router.push({ name: 'Forum', params: {id: this.forum.id }})
    }
  }
}
</script>

<style>

</style>