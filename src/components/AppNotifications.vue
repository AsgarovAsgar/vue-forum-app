<template>
  <div class="fixed bottom-8 right-0 flex flex-col gap-2">
    <div class="px-4 py-2 flex justify-between gap-8 border-blue-800 border-l-4 bg-white" v-for="notification in notifications" :key="notification.id">
      <p>{{ notification.message }}</p>
      <button @click="removeNotification(notification.id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import useNotifications from '@/composables/useNotifications'
export default {
  setup () {
    const { notifications, removeNotification } = useNotifications()
    return { notifications, removeNotification }
  }
}
</script>

<style>

</style>