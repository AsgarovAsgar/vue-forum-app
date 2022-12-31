<template>
  <div v-if="asyncDataStatus_ready" class="bg-slate-100 h-full">
    <div class="p-4 max-w-4xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{thread.title}}</h1>
        <router-link 
          v-if="thread.userId === authUser?.id" 
          :to="{name: 'ThreadEdit', params: {id: this.id}}" 
          class="rounded bg-blue-500 px-4 py-2 text-white text-sm"
        >Edit
        </router-link>
      </div>
      <div class="flex items-center justify-between">
        <div>By {{ thread.author?.name }}, <AppDate :timestamp="thread.publishedAt" /></div>
        <p>{{thread.repliesCount}} replies by {{thread.contributorsCount}} contributors</p>
      </div>
      <PostList :posts="threadPosts"/>
      <PostEditor v-if="authUser" @save="addPost" />
      <div v-else class="text-center">
        <router-link class="text-green-500" :to="{ name: 'SignIn', query: { redirectTo: $route.path } }">Sign in</router-link> or <router-link class="text-green-500" :to="{ name: 'Register', query: { redirectTo: $route.path } }">Register</router-link> to reply
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'


// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

export default {
  name: 'ThreadShow',
  mixins: [asyncDataStatus],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList,
    PostEditor
  },
  computed: {
    ...mapGetters(['authUser']),
    threads() { 
      return this.$store.state.threads 
    },
    posts() { 
      return this.$store.state.posts
    },
    thread() {
      console.log('threadShow computed', this.id);
      return this.$store.getters.thread(this.id)
    },
    threadPosts() { 
      return this.posts.filter(post => post.threadId === this.id) 
    }
  },
  methods: {
    ...mapActions(['createPost', 'fetchThread', 'fetchUsers', 'fetchPosts']),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      }
      this.createPost(post)
    }
  },
  async created() {
    // console.log('threadShow created', this.id);
    // fetch the thread
    const thread = await this.fetchThread({id: this.id})

    // fetch the user
    // this.fetchUser({id: thread.userId})

    // fetch the posts
    const posts = await this.fetchPosts({ids: thread.posts})    
    //fetch the users associated with the posts
    const users = posts.map(post => post.userId).concat(thread.userId)
    await this.fetchUsers({ids: users})
    this.asyncDataStatus_fetched()

    // thread.posts.forEach(async (postId) => {
    //   const post = await this.$store.dispatch('fetchPost', { id: postId })
    //   // fetch the users
    //   this.$store.dispatch('fetchUser', {id: post.userId})    
    // })
  }
}
</script>

<style>

</style>