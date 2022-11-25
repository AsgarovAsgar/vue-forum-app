<template>
  <the-navbar></the-navbar>
  <router-view></router-view>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import {mapActions} from 'vuex'

export default {
  components: { TheNavbar },
  name: 'App',
  methods: {
    ...mapActions(['fetchAuthUser'])
  },
  created() {
    this.fetchAuthUser()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

