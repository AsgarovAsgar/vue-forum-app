<template>
  <div>
    <div id="form">
      <form @submit.prevent="save" class="flex flex-col space-y-4">
        <!-- <textarea :value="newPostText" @input="newPostText = $event.target.value"></textarea> -->
        <textarea v-model="text" class="rounded border p-4" cols="30" rows="10"></textarea>
        <div class="flex justify-end">
          <button class="rounded px-6 py-3 bg-blue-700 text-white">Submit post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    save() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1'
      }
      
      this.$emit('save', { post })
      this.text = ''
    }
  }
}
</script>

<style>

</style>