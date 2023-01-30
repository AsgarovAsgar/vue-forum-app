<template>
   <div class="flex flex-col">
    <!-- upper part -->
    <form @submit.prevent="save" class="p-4 flex flex-col gap-3 bg-white shadow rounded">
      <label for="avatar" class="relative self-center">
        <AppAvatarImg class="w-36 h-36 rounded-full object-cover" :src="activeUser.avatar" :alt="`${activeUser.username}'s profile picture`" />
        <div class="w-12 h-12 opacity-70 icon text-white">
          <svg v-if="uploadingImage" aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <svg v-else class="w-12 h-12"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
            <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
        </div>
        <input v-show="false" type="file" id="avatar" @change="handleAvatarUpload">
      </label>
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
        <input v-model="activeUser.location" class="border rounded p-2 text-sm" list="locations" @mouseenter="loadLocationOptions">
      </div>
      <datalist id="locations">
        <option v-for="location in locationOptions" :key="location.name.common" :value="location.name.common" />
      </datalist>
      <div class="flex justify-between text-white">
        <button @click.prevent="cancel" class="px-4 py-2 bg-red-500 rounded text-sm hover:bg-red-700">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
    <UserProfileCardEditorReauthenticate
      v-model="needsReauth"
      @success="onReauthenticated"
      @fail="onReauthenticatedFailed"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserProfileCardEditorReauthenticate from './UserProfileCardEditorReauthenticate.vue'
import useNotifications from '@/composables/useNotifications'

export default {
  components: { UserProfileCardEditorReauthenticate },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      uploadingImage: false,
      activeUser: {...this.user},
      locationOptions: [],
      needsReauth: false
    }
  },
  setup() {
    const { addNotification } = useNotifications()
    return {addNotification}
  },
  methods: {
    ...mapActions('auth', ['uploadAvatar']),
    async loadLocationOptions() {
      if(this.locationOptions.length) return
      const res = await fetch('https://restcountries.com/v3/all')
      this.locationOptions = await res.json()
    },
    async handleAvatarUpload(e) {
      this.uploadingImage = true
      const file = e.target.files[0]
      const uploadedImage = await this.uploadAvatar({ file })
      this.activeUser.avatar = uploadedImage || this.activeUser.avatar
      this.uploadingImage = false
    },
    async onReauthenticated() {
      await this.$store.dispatch('auth/updateEmail', { email: this.activeUser.email })
      this.saveUserData()
    },
    async onReauthenticatedFailed() {
      this.addNotification({ message: 'Error updating user', type: 'error', timeout: 3000 })
      this.$router.push({ name: 'Profile' })
    },
    async saveUserData() {
      await this.$store.dispatch('users/updateUser', {...this.activeUser, threads: this.activeUser.threadIds})
      this.addNotification({ message: 'User successfully updated', timeout: 3000 })
      this.$router.push({name: 'Profile'})
    },
    async save() {
      // console.log('save');
      const emailChanged = this.activeUser.email !== this.user.email
      if(emailChanged) {
        this.needsReauth = true
      } else {
        this.saveUserData()
      }
    },
    cancel() {
      this.$router.push({name: 'Profile'})
    }
  }
}
</script>

<style scoped>
.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
</style>