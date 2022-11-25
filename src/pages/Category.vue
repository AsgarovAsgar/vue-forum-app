<template>
  <h1>{{ category.name }}</h1>
  <ForumList 
    :title="category.name"
    :forums="getForumForCategory(category)"
    :categoryId="id"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ForumList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category() {
      return this.$store.state.categories.find(category => category.id === this.id) || {}
    }
  },
  methods: {
    ...mapActions(['fetchCategory', 'fetchForums']),
    getForumForCategory(category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  },
  async created() {
    const category = await this.fetchCategory({ id: this.id })
    this.fetchForums({ ids: category.forums })
  }
}
</script>

<style>

</style>