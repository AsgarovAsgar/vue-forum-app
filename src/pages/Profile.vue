<template>
  <div class="flex flex-col md:flex-row max-w-5xl m-4 mx-auto gap-4">
    <div class="flex flex-col gap-2 md:w-1/4">
      <UserProfileCard v-if="!edit" :user="user" />
      <UserProfileCardEditor v-else :user="user" />
    </div>
    <div class="md:w-3/4 space-y-2">
      <div class="pb-4 flex justify-between items-center border-b">
        <p class="text-xl">{{user.username}}'s recent activity</p>
        <!-- <p class="text-green-500">See only started threads?</p> -->
      </div>
      <PostList :posts="user.posts"/>
      <AppInfiniteScroll
        @load="fetchUserPosts"
        :done="user.posts.length === user.postsCount"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import AppInfiniteScroll from '@/components/AppInfiniteScroll.vue'

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor, AppInfiniteScroll },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters('auth', { user: 'authUser'}),
    lastPostFetched() {
      if (this.user.posts.length === 0) return null
      return this.user.posts[this.user.posts.length - 1]
    }
  },
  methods: {
    fetchUserPosts() {
      return this.$store.dispatch('auth/fetchAuthUsersPosts', { startAfter: this.lastPostFetched })
    }
  },
  async created() {
    await this.fetchUserPosts()

    // setTimeout(() => {
    //   this.$store.dispatch('auth/fetchAuthUsersPosts', { startAfter: this.lastPostFetched })
    // }, 2000)

    this.asyncDataStatus_fetched()
    // this.$emit('ready')
  }
}
</script>

<style>

</style>