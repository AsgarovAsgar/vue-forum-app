<template>
  <div>
    <ForumList
      v-for="category in categories"
      :key="category.id"
      :forums="getForumForCategory(category)" 
      :title="category.name"
      :categoryId="category.id"
    />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'

export default {
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  components: {
    ForumList
  },
  methods: {
    getForumForCategory(category) {
      return this.$store.state.forums.items.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>

<style>

</style>