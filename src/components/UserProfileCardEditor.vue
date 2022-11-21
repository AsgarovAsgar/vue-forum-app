<template>
   <div class="flex flex-col">
    <!-- upper part -->
    <form @submit.prevent="save" class="p-4 flex flex-col gap-3 bg-white shadow rounded">
      <img class="self-center w-36 h-36 rounded-full object-cover" :src="activeUser.avatar" :alt="`${activeUser.username}'s profile picture`">
      <input type="text" v-model="activeUser.username" class="border rounded p-2 text-sm" placeholder="Username">
      <input v-model="activeUser.name" class="border rounded p-2 text-sm" placeholder="Fullname">
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="bio">Bio</label>
        <textarea v-model="activeUser.bio" class="border rounded p-2 text-sm" placeholder="Write a few words about yourself" rows="5"></textarea>
      </div>
      <div class="flex justify-between p-2 border-b">
        <p class="text-xl font-semibold">{{ `${user.postsCount} posts` }}</p>
        <p class="text-xl font-semibold">{{ `${user.threadsCount} threads` }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="website">Website</label>
        <input v-model="activeUser.website" class="border rounded p-2 text-sm">
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="email">Email</label>
        <input v-model="activeUser.email" class="border rounded p-2 text-sm">
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="location">Location</label>
        <input v-model="activeUser.location" class="border rounded p-2 text-sm">
      </div>
      <div class="flex justify-between text-white">
        <button @click="cancel" class="px-4 py-2 bg-red-500 rounded text-sm hover:bg-red-700">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeUser: {...this.user}
    }
  },
  methods: {
    save() {
      console.log('save');
      this.$store.dispatch('updateUser', {...this.activeUser})
      this.$router.push({name: 'Profile'})
    },
    cancel() {
      this.$router.push({name: 'Profile'})
    }
  }
}
</script>

<style>

</style>