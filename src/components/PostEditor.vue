<template>
  <div>
    <div id="form">
      <VeeForm @submit="save" :key="formKey" class="flex flex-col space-y-4">
        <!-- <textarea :value="newPostText" @input="newPostText = $event.target.value"></textarea> -->
        <!-- <textarea v-model="postCopy.text" class="rounded border p-4" cols="30" rows="10"></textarea> -->
        <AppFormField as="textarea" v-model="postCopy.text" name="text" label="" rules="required" rows="10" cols="30" />

        <div class="flex justify-end">
          <button class="rounded px-6 py-3 bg-blue-700 text-white">{{ post.id ? 'Edit' : 'Submit' }} post</button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null })
    }
  },
  data() {
    return {
      postCopy: { ...this.post },
      formKey: Math.random()
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
      this.formKey = Math.random()
    }
  }
}
</script>

<style>

</style>