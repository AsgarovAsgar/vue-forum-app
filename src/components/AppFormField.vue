<template>
  <div class="flex flex-col gap-1">
    <label :for="name">{{ label }}</label>
    <VeeField
      :name="name"
      :label="label"
      :modelValue='modelValue'
      @input="$emit('modelUpdate', $event)"
      :id="name" 
      class="rounded p-2 border" 
      v-bind="$attrs"
    />
    <VeeErrorMessage :name="name" class="text-red-500" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
  }
}
</script>