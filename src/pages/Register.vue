<template>
  <div class="flex justify-center p-4 bg-gray-50">
    <div class="bg-white shadow rounded p-8 max-w-xl w-full flex flex-col gap-4 items-center">
      <h1 class="text-3xl font-bold">Register</h1>
      <form class="flex flex-col w-full gap-4 font-medium" @submit.prevent="register">
        <div class="flex flex-col gap-1">
          <label for="name" class="">Full Name</label>
          <input v-model="form.name" id="name" type="text" class="rounded p-2 border">
        </div>
        <div class="flex flex-col gap-1">
          <label for="username" class="">Username</label>
          <input v-model="form.username" id="username" type="text" class="rounded p-2 border">
        </div>
        <div class="flex flex-col gap-1">
          <label for="email" class="">Email</label>
          <input v-model="form.email" id="email" type="email" class="rounded p-2 border">
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="">Password</label>
          <input v-model="form.password" id="password" type="password" class="rounded p-2 border">
        </div>
        <div class="flex flex-col gap-1">
          <label for="avatar" class="">Avatar</label>
          <input v-model="form.avatar" id="avatar" type="text" class="rounded p-2 border">
        </div>
        <button type="submit" class="p-3 text-xl text-center rounded text-white bg-blue-500">Register</button>
      </form>
      <button class="p-4 py-2 text-lg font-medium text-center rounded text-white bg-red-500">Sign up with Google</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      await this.$store.dispatch('registerUserWithEmailAndPassword', this.form)
      this.$router.push('/')
    }
  },
  created() {
    this.$emit('ready')
  }
}
</script>

<style>

</style>