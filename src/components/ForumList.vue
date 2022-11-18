<template>
  <div class="m-4 border">
    <h2 class="w-full text-white text-2xl bg-blue-500 p-2">
      <router-link v-if="categoryId" :to="{name: 'Category', params: {id: categoryId}}">{{ title }}</router-link>
      <span v-else>{{ title }}</span>
    </h2>
    <div v-for="forum in forums" :key="forum.id" class="py-2 px-4 w-full grid grid-cols-2 odd:bg-white even:bg-slate-100">
      <div class="">
        <router-link :to="{name: 'Forum', params: {id: forum.id}}" class="text-xl text-green-500 font-medium">{{ forum.name }}</router-link>
        <p>{{ forum.description }}</p>
      </div>
      <div class="flex">
        <div class="flex flex-col justify-center">
          <p class="text-3xl text-center">{{ forum.threads?.length }}</p>
          <p>{{ forumThreadWord(forum) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      required: true,
      type: Array
    },
    title: {
      type: String,
      default: 'Forums'
    },
    categoryId: {
      required: false,
      type: String
    }
  },
  methods: {
    forumThreadWord(forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'threads' : 'thread'
      } else {
        return 'no threads'
      }
    }
  }
}
</script>

<style>

</style>