<script setup lang="ts">
const input = ref<string>('acoustic');

const searchEmit = defineEmits({
  search: (genre: string) => {
    return !!genre;
  },
});

defineProps({
  options: Array,
});
</script>

<template>
  <select
    v-model="input"
    class="select select-bordered w-full max-w-xs focus:outline-none"
    @change="searchEmit('search', input)"
  >
    <option v-for="opt in options" :key="opt">{{ opt }}</option>
  </select>
</template>
