<script setup lang="ts">
const input = ref<string>('acoustic');

const emit = defineEmits({
  search: (genre: string) => {
    return !!genre;
  },
});

defineExpose({
  input,
  emit,
});

defineProps({
  options: Array,
});
</script>

<template>
  <select
    v-model="input"
    class="select select-bordered w-full max-w-xs focus:outline-none"
    @change="emit('search', input)"
  >
    <option v-for="opt in options" :key="opt">{{ opt }}</option>
  </select>
</template>
