<template>
  <div v-if="asyncDataStatus_ready" class="flex flex-col max-w-3xl m-4 mx-auto gap-4">
    <h1 class="text-3xl font-bold">Create new thread in <i>{{forum.name}}</i></h1>
    <ThreadEditor @save="save" @cancel="cancel" @dirty="formIsDirty = true" @clean="formIsDirty = false" />
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
    forumId: {
      type: String,
      required: true
    }
  },
  data() { 
    return {
      formIsDirty: false
    }
   },
  computed: {
    forum() {
      return this.$store.state.forums.items.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    ...mapActions('threads', ['createThread']),
    ...mapActions('forums', ['fetchForum']),
    async save({title, text}) {
      const thread = await this.createThread({
        forumId: this.forumId,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id }})
    },
    cancel() {
      this.$router.push({ name: 'Forum', params: {id: this.forum.id }})
    }
  },
  async created() {
    await this.fetchForum({ id: this.forumId })
    this.asyncDataStatus_fetched()
  },
  beforeRouteLeave() {
    if (this.formIsDirty) {
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost!')
      if(!confirmed) return false
    }
  }
}
</script>

<style>

</style>