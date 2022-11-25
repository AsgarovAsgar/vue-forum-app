<template>
  <h1 class="text-3xl font-bold text-center m-4">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories() { 
      return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  async created() {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.flatMap(category => category.forums)
    this.fetchForums({ ids: forumIds })
  }
}
</script>

<style>

</style>