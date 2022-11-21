<template>
  <form @submit.prevent="save" class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label for="title">Title:</label>
      <input v-model="form.title" id="title" type="text" class="rounded border w-full p-2">
    </div>
    <div class="flex flex-col gap-2">
      <label for="text">Content:</label>
      <textarea v-model="form.text" id="text" cols="30" rows="10" class="rounded border w-full p-2"></textarea>
    </div>
    <div class="flex space-x-2 justify-end text-white">
      <button @click="cancel" class="px-4 py-2 bg-red-500 rounded text-sm hover:bg-red-700">Cancel</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-700">
        {{threadExist ? 'Update' : 'Publish'}}
      </button>
    </div>
  </form>
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
      this.$emit('save', { ...this.form })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style>

</style>