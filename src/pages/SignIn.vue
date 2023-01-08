<template>
  <div class="flex justify-center p-4 bg-gray-50">
    <div class="bg-white shadow rounded p-8 max-w-xl w-full flex flex-col gap-4 items-center">
      <h1 class="text-3xl font-bold">Sign in</h1>
      <form class="flex flex-col w-full gap-4 font-medium" @submit.prevent="signIn">
        <div class="flex flex-col gap-1">
          <label for="email" class="">Email</label>
          <input v-model="form.email" id="email" type="email" class="rounded p-2 border">
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="">Password</label>
          <input v-model="form.password" id="password" type="password" class="rounded p-2 border">
        </div>
        <button type="submit" class="p-3 text-xl text-center rounded text-white bg-blue-500">Sign in</button>
      </form>
      <button @click="signInWithGoogle" class="p-4 py-2 text-lg font-medium text-center rounded text-white bg-red-500">Sign in with Google</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('auth/signInWithEmailAndPassword', { ...this.form })
        this.successRedirect()
      } catch(error) {
        alert(error.message)
      }
    },
    async signInWithGoogle() {
      await this.$store.dispatch('auth/signInWithGoogle')
      this.successRedirect()
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' }
      this.$router.push(redirectTo)
    }
  },
  created() {
    this.$emit('ready')
  }
}
</script>

<style>

</style>