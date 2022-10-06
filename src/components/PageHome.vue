<template>
  <div>Page Home</div>
  <ThreadList :threads="threads" />
</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import sourceData from '@/data.json'

export default {
  components: {
    ThreadList
  },
  data() {
    return {
      threads: sourceData.threads
    }
  }
}
</script>

<style>

</style>