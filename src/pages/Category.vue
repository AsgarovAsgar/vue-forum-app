<template>
  <div v-if="asyncDataStatus_ready">
    <ForumList 
      :title="category.name"
      :forums="getForumForCategory(category)"
      :categoryId="id"
    />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'


export default {
  components: {
    ForumList
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category() {
      return this.$store.state.categories.items.find(category => category.id === this.id) || {}
    }
  },
  methods: {
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('forums', ['fetchForums']),
    getForumForCategory(category) {
      return this.$store.state.forums.items.filter(forum => forum.categoryId === category.id)
    }
  },
  async created() {
    const category = await this.fetchCategory({ id: this.id })
    await this.fetchForums({ ids: category.forums })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>

</style>