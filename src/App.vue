<template>
  <the-navbar></the-navbar>
  <div class="mt-20">
    <router-view v-show="showPage" @ready="onPageReady" :key="`${$route.path}${JSON.stringify($route.query)}`" />
    <AppSpinner v-show="!showPage" />
  </div>
  <AppNotifications />
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import AppSpinner from './components/AppSpinner.vue'
import {mapActions} from 'vuex'
import NProgress from 'nprogress'
import AppNotifications from './components/AppNotifications.vue'

export default {
  components: { TheNavbar, AppSpinner, AppNotifications },
  data() { 
    return {
      showPage: false
    }
  },
  name: 'App',
  methods: {
    ...mapActions('auth', ['fetchAuthUser']),
    onPageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  created() {
    this.fetchAuthUser()
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
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
@import "~nprogress/nprogress.css"
/* #nprogress .bar {
  background: 57AD8D !important
} */
</style>

