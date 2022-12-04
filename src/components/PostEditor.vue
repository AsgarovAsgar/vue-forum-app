<template>
  <div>
    <div id="form">
      <form @submit.prevent="save" class="flex flex-col space-y-4">
        <!-- <textarea :value="newPostText" @input="newPostText = $event.target.value"></textarea> -->
        <textarea v-model="postCopy.text" class="rounded border p-4" cols="30" rows="10"></textarea>
        <div class="flex justify-end">
          <button class="rounded px-6 py-3 bg-blue-700 text-white">{{ post.id ? 'Edit' : 'Submit' }} post</button>
        </div>
      </form>
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
      text: '',
      postCopy: { ...this.post }
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
    }
  }
}
</script>

<style>

</style>