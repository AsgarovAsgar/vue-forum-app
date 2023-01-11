<template>
  <div 
    v-click-outside="() => isMobileNavOpen = false"
    v-page-scroll="() => isMobileNavOpen = false"
    class="fixed w-full top-0"
  >
    <div class="flex justify-between bg-blue-800 px-4 py-3 items-center">
      <router-link :to="{name: 'Home'}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      </router-link>
      <div class="relative hidden md:flex gap-4 items-center">
        <button 
          v-if="authUser"
          @click="toggleDropdown"
          v-click-outside="() => isDropdownOpen = false"
          class="flex space-x-2 items-center text-white"
        >
          <img class="w-8 h-8 object-cover rounded-full" :src="authUser.avatar" :alt="authUser.name">
          <h2>{{ authUser.name }}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div v-if="isDropdownOpen && authUser" class="absolute top-12 right-0 flex flex-col overflow-hidden w-full shadow rounded bg-white">
          <button class="text-left p-1.5 px-3 hover:bg-gray-100 w-full" @click="signOut">Sign Out</button>
          <router-link :to="{ name: 'Profile' }" class="text-left  p-1.5 px-3 hover:bg-gray-100 w-full">Profile</router-link>
        </div>
        <!-- <button v-if="authUser" class="p-1 px-2 border rounded text-white" @click="signOut">Sign Out</button> -->
        <router-link v-if="!authUser" class="p-1 px-2 border rounded text-white" :to="{ name: 'SignIn' }">Log in</router-link>
        <router-link v-if="!authUser"  class="p-1 px-2 border rounded text-white" :to="{ name: 'Register' }">Register</router-link>
      </div>
      <div class="md:hidden" id="hamburger">
        <button @click="isMobileNavOpen = !isMobileNavOpen" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMobileNavOpen" class="bg-blue-800 flex flex-col p-4 gap-2 items-end text-white" id="mobile-nav">
      <router-link v-if="!authUser" class="p-1 px-2 border rounded" :to="{ name: 'SignIn' }">Log in</router-link>
      <router-link v-if="!authUser"  class="p-1 px-2 border rounded" :to="{ name: 'Register' }">Register</router-link>
      <router-link v-if="authUser" :to="{ name: 'Profile' }" class="p-1 px-2 border rounded">Profile</router-link>
      <button v-if="authUser" class="p-1 px-2 border rounded" @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isDropdownOpen: false,
      isMobileNavOpen: false
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  created () {
    this.$router.beforeEach((to, from) => {
      this.isMobileNavOpen = false
    })
  },
  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut')
      this.isMobileNavOpen = false
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  }
}
</script>

<style>

</style>