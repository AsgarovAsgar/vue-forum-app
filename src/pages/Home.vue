<template>
  <h1 class="text-3xl font-bold text-center m-4">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import sourceData from '@/data.json'

export default {
  components: {
    CategoryList
  },
  data() {
    return {
      
    }
  },
  computed: {
    categories() { 
      return this.$store.state.categories
    }
  }
}
</script>

<style>

</style>