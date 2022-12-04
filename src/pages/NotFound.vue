<template>
  <div>
    <h1>Page not found</h1>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('ready')
  }
}
</script>


<style>

</style>