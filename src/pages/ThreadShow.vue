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
import useNotifications from '@/composables/useNotifications'
import difference  from 'lodash/difference'


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
  setup () {
    const { addNotification } = useNotifications()
    // addNotification({ message: 'Dynamic notifixatopn' })
    return { addNotification }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    threads() { 
      return this.$store.state.threads.items
    },
    posts() { 
      return this.$store.state.posts.items
    },
    thread() {
      return this.$store.getters['threads/thread'](this.id)
    },
    threadPosts() { 
      return this.posts.filter(post => post.threadId === this.id) 
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'fetchPosts']),
    ...mapActions('threads', ['fetchThread']),
    ...mapActions('users', ['fetchUsers']),
    // ...mapActions('posts', ['createPost', 'fetchThread', 'fetchUsers', 'fetchPosts']),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      }
      this.createPost(post)
    },
    async fetchPostsWithUsers(ids) {
      // fetch the posts
      const posts = await this.fetchPosts({
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          if(this.asyncDataStatus_ready || isLocal || (previousItem?.edited  && !previousItem?.edited?.at)) return
          // if(!this.asyncDataStatus_ready || isLocal || (previousItem?.edited  && !previousItem?.edited?.at)) return
          this.addNotification({ message: 'Thread recently updated!!!', timeout: 5000 })
        }
      })    
      //fetch the users associated with the posts
      const users = posts.map(post => post.userId).concat(this.thread.userId)
      await this.fetchUsers({ ids: users })
    }
  },
  async created() {
    // console.log('threadShow created', this.id);
    // fetch the thread
    const thread = await this.fetchThread({
      id: this.id,
      onSnapshot: async ({ isLocal, item, previousItem }) => {
        if(!this.asyncDataStatus_ready || isLocal) return
        const newPosts = difference(item.posts, previousItem.posts)
        const hasNewPosts = newPosts.length > 0
        if(hasNewPosts) {
          await this.fetchPostsWithUsers(newPosts)
        } else {
          this.addNotification({ message: 'Thread recently updated', timeout: 5000 })
        }
      }
    })

    // fetch the user
    // this.fetchUser({id: thread.userId})
    this.fetchPostsWithUsers(thread.posts)
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>

</style>