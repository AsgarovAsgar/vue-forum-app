<template>
  <div v-if="asyncDataStatus_ready">
    <h1 class="text-3xl font-bold text-center m-4">Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    categories() { 
      return this.$store.state.categories.items
    }
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('forums', ['fetchForums'])
  },
  async created() {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map(category => category.forums).flat()
    await this.fetchForums({ ids: forumIds })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>

</style>