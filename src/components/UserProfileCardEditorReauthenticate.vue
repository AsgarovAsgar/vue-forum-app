<template>
  <VueFinalModal v-model="showModal" classes="flex flex-col justify-center items-center">
    <div class="p-6 w-full flex flex-col gap-4 border border-green-500 bg-white rounded-xl">
      <h2 class="font-bold text-xl">Login Again to Change Your Email</h2>
      <VeeForm @submit="reauthenticate" class="flex flex-col gap-4">
        <AppFormField name="reauth-email" label="Email" v-model="email" rules="email" />
        <AppFormField name="reauth-password" label="Password" v-model="password" type="password" />
        <button class="text-white px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-700">Login </button>
      </VeeForm>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
  components: { VueFinalModal },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    async reauthenticate() {
      try {
        await this.$store.dispatch('auth/reauthenticate', { email: this.email, password: this.password })
        this.$emit('success')
      } catch(error) {
        console.log(error)
        this.$emit('fail', error)
      }
    }
  }
}
</script>

<style>

</style>