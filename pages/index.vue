<script setup lang="ts">
import { ref } from 'vue';

const genre = ref<string>('acoustic');

const { data: genreData } = await useFetch('/api/genres');
const { data, pending } = await useFetch('/api/songs', {
  query: { genre },
  server: false,
});

const onSearch = (input: string) => {
  genre.value = input;
};

defineExpose({
  genreData,
  data,
  pending,
  onSearch,
});
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Search @search="onSearch" :options="genreData.genres" />

    <div v-if="pending">Loading...</div>
    <div v-else-if="data?.error_description">
      Error: {{ data.error_description }}
    </div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">No song recommendations found</div>
      <Song v-for="rec in data.recs" :key="rec.id" v-bind="rec" />
    </div>
    <div v-else>Error occurred retrieving song recommendations</div>
  </div>
</template>
