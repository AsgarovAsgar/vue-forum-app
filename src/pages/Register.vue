<template>
  <div class="flex justify-center p-4 bg-gray-50">
    <div class="bg-white shadow rounded p-8 max-w-xl w-full flex flex-col gap-4 items-center">
      <h1 class="text-3xl font-bold">Register</h1>
      <VeeForm class="flex flex-col w-full gap-4 font-medium" @submit="register">
        <AppFormField v-model="form.name" name="name" label="Name" rules="required" />
        <AppFormField v-model="form.username" name="username" label="Username" rules="required|unique:users,username" />
        <AppFormField v-model="form.email" name="email" label="Email" rules="required|email|unique:users,email" />
        <AppFormField v-model="form.password" name="password" label="Password" rules="required|min:8" />

        <div class="flex flex-col gap-1">
          <label for="avatar">
            Avatar
            <div v-if="avatarPreview">
              <img :src="avatarPreview" class="h-40 border" alt="">
            </div>
          </label>
          <VeeField 
            name="avatar" 
            v-show="!avatarPreview"
            id="avatar" 
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="rounded p-2 border"
          />
        </div>
        <button type="submit" class="p-3 text-xl text-center rounded text-white bg-blue-500">Register</button>
      </VeeForm>
      <button @click="registerWithGoogle" class="p-4 py-2 text-lg font-medium text-center rounded text-white bg-red-500">Sign up with Google</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarPreview: null,
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
      }
    }
  },
  methods: {
    async register() {
      // await this.$store.dispatch('createUser', this.form)
      await this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
      this.$router.push('/')
    },
    async registerWithGoogle() {
      await this.$store.dispatch('auth/signInWithGoogle')
      this.$router.push('/')
    },
    handleImageUpload(e) {
      this.form.avatar = e.target.files[0] //so file will be available for form submission
      // for showing the preview of the image:
      const reader = new FileReader()
      reader.onload = (event) => {
        this.avatarPreview = event.target.result
      }
      reader.readAsDataURL(this.form.avatar)
    }
  },
  created() {
    this.$emit('ready')
  }
}
</script>

<style>

</style>