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
  <div class="z-10">
    <select
      v-model="input"
      class="select focus:outline-none bg-translucent"
      @change="searchEmit('search', input)"
    >
      <option v-for="opt in options" :key="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</template>
