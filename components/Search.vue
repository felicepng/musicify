<script setup lang="ts">
import { options } from '~~/consts/data';

const genre = ref<string>('acoustic');

const emit = defineEmits({
  search: (gen: string) => {
    return !!gen;
  },
});

defineExpose({
  options,
  genre,
  emit,
});
</script>

<template>
  <select
    v-model="genre"
    class="select select-bordered w-full max-w-xs focus:outline-none"
    @change="emit('search', genre)"
  >
    <option v-for="opt in options" :key="opt">{{ opt }}</option>
  </select>
</template>
