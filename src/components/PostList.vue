<template>
  <div class="space-y-4">
    <div v-for="post in posts" :key="post.id" class="p-4 rounded shadow flex gap-8 bg-white">
      <div v-if="userById(post.userId)" class="flex flex-col gap-4 w-24">
        <h2 class="text-green-500 text-sm">{{ userById(post.userId).name }}</h2>
        <AppAvatarImg class="h-20 w-20 border rounded-full flex-shrink-0 object-cover" :src="userById(post.userId).avatar" />
        <p class="text-xs">{{ userById(post.userId).postsCount }} posts</p>
        <p class="text-xs">{{ userById(post.userId).threadsCount }} threads</p>
      </div>
      <div class="flex flex-col justify-between w-full gap-2">
        <div class="flex items-start justify-between gap-2">
          <div class="w-full">
            <PostEditor 
              v-if="editing === post.id"
              :post="post"
              @save="handleUpdate($event.post)"
            />
            <p v-else>{{ post.text }}</p>
          </div>
          <button
            v-if="post.userId === $store.state.auth.authId"
            @click="toggleEditMode(post.id)" 
            class="p-1.5 rounded bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </button>
        </div>
        <div class="text-xs text-gray-500 self-end">
          <div v-if="post.edited?.at" class="text-right">edited</div>
          <AppDate :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PostEditor from '@/components/PostEditor.vue'
import { mapActions } from 'vuex'

export default {
  components: { PostEditor },
  props: {
    posts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      editing: null
    }
  },
  computed: {
    users() {
      return this.$store.state.users.items
    }
  },
  methods: {
    ...mapActions('posts', ['updatePost']),
    userById(userId) {
      return this.$store.getters['users/user'](userId)
      // return this.users.find(user => user.id === userId)
    },
    toggleEditMode(id) {
      this.editing = id === this.editing ? null : id
    },
    handleUpdate(event) {
      this.updatePost(event)
      this.editing = null
    }
  }
}
</script>

<style>

</style>