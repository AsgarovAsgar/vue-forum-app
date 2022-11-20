<template>
  <div class="flex flex-col max-w-3xl m-4 mx-auto gap-4">
    <h1 class="text-3xl font-bold">Create new thread in <i>{{forum.name}}</i></h1>
    <form @submit.prevent="save" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="title">Title:</label>
        <input v-model="title" id="title" type="text" class="rounded border w-full p-2">
      </div>
      <div class="flex flex-col gap-2">
        <label for="text">Content:</label>
        <textarea v-model="text" id="text" cols="30" rows="10" class="rounded border w-full p-2"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '',
      text: ''
    }
  },
  computed: {
    forum() {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    save() {
      console.log('saved');
    }
  }
}
</script>

<style>

</style>