<template>
  <h1>{{ category.name }}</h1>
  <ForumList 
    :title="category.name"
    :forums="getForumForCategory(category)"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue'

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
      return this.$store.state.categories.find(category => category.id === this.id)
    }
  },
  methods: {
    getForumForCategory(category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>

<style>

</style>