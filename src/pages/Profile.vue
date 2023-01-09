<template>
  <div class="flex flex-row max-w-5xl m-4 mx-auto gap-4">
    <div class="flex flex-col gap-2 w-1/4">
      <UserProfileCard v-if="!edit" :user="user" />
      <UserProfileCardEditor v-else :user="user" />
    </div>
    <div class="w-3/4 space-y-2">
      <div class="pb-4 flex justify-between items-center border-b">
        <p class="text-xl">{{user.username}}'s recent activity</p>
        <p class="text-green-500">See only started threads?</p>
      </div>
      <PostList :posts="user.posts"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters('auth', { user: 'authUser'})
  },
  async created() {
    await this.$store.dispatch('auth/fetchAuthUsersPosts')
    this.asyncDataStatus_fetched()
    // this.$emit('ready')
  }
}
</script>

<style>

</style>