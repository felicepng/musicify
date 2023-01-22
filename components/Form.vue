<script setup>
import { ref } from 'vue'

const genre = ref("")
const artist = ref("")

const onSearch = async () => {
  await $fetch(`/api/queryTracks?genre=${genre.value}${artist.value ? '&artist=' + artist.value : ''}`)
}

defineExpose({
  genre,
  artist,
  onSearch
})
</script>

<template>
  <form @submit.prevent="onSearch">
    <input v-model="genre" placeholder="Genre..." class="text-black" />
    <input v-model="artist" placeholder="Artist..." class="text-black" />
    <button type="submit" class="bg-blue-700">Search</button>
  </form>
</template>