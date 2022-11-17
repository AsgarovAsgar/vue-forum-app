<template>
  <h1 class="text-3xl font-bold text-center m-4">Welcome to the Forum</h1>
  <ForumList :forums="forums" />
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import sourceData from '@/data.json'

export default {
  components: {
    ForumList
  },
  data() {
    return {
      forums: sourceData.forums
    }
  }
}
</script>

<style>

</style>