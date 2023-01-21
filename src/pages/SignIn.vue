<template>
  <div class="flex justify-center p-4 bg-gray-50">
    <div class="bg-white shadow rounded p-8 max-w-xl w-full flex flex-col gap-4 items-center">
      <h1 class="text-3xl font-bold">Sign in</h1>
      <VeeForm class="flex flex-col w-full gap-4 font-medium" @submit="signIn">
        <AppFormField v-model="form.email" name="email" type="email" label="Email" rules="required|email" />
        <AppFormField v-model="form.password" name="password" type="password" label="Password" rules="required" />
        <button type="submit" class="p-3 text-xl text-center rounded text-white bg-blue-500">Sign in</button>
      </VeeForm>
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