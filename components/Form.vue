<script setup lang='ts'>
import { SearchQuery } from "~~/consts/consts"

const genreRef = ref("")
const artistRef = ref("")

const genre = computed(() => genreRef.value)
const artist = computed(() => artistRef.value)

const emit = defineEmits({
  search: (query: SearchQuery) => {
    return query.genre || query.artist
  }
})
</script>

<template>
  <form @submit.prevent="emit('search', { genre, artist })">
    <input v-model="genreRef" placeholder="Genre..." class="text-black" />
    <input v-model="artistRef" placeholder="Artist..." class="text-black" />
    <button type="submit" class="bg-blue-700">Search</button>
  </form>
</template>