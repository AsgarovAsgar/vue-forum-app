<template>
  <VeeForm @submit="save" class="flex flex-col gap-4">
    <AppFormField v-model="form.title" name="title" type="text" label="Title" rules="required" />
    <AppFormField as="textarea" v-model="form.text" name="text" label="Content" rules="required" rows="10" cols="30" />
    <div class="flex space-x-2 justify-end text-white">
      <button @click="cancel" class="px-4 py-2 bg-red-500 rounded text-sm hover:bg-red-700">Cancel</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-700">
        {{threadExist ? 'Update' : 'Publish'}}
      </button>
    </div>
  </VeeForm>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  computed: {
    threadExist() {
      return !!this.title
    }
  },
  methods: {
    save() {
      this.$emit('clean')
      this.$emit('save', { ...this.form })
    },
    cancel() {
      this.$emit('cancel')
    }
  },
  watch: {
    form: {
      handler() {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit('dirty')
        } else { this.$emit('clean') }
      },
      deep: true
    }
  }
}
</script>

<style>

</style>