<script setup lang="ts">
import { SearchQuery } from '~~/consts/consts';

const genre = ref<string>('');
const artist = ref<string>('');

const emit = defineEmits({
  search: (query: SearchQuery) => {
    return query.genre || query.artist;
  },
});

defineExpose({
  genre,
  artist,
  emit,
});
</script>

<template>
  <form @submit.prevent="emit('search', { genre, artist })">
    <input v-model="genre" placeholder="Genre..." class="text-black" />
    <input v-model="artist" placeholder="Artist..." class="text-black" />
    <button type="submit" class="bg-blue-700">Search</button>
  </form>
</template>
