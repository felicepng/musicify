<script setup lang="ts">
import { ref } from 'vue';

const genre = ref<string>('acoustic');

const { data, pending } = await useFetch('/api/songs', {
  query: { genre },
  server: false,
});

const onSearch = async (gen: string) => {
  genre.value = gen;
};

defineExpose({
  data,
  pending,
  onSearch,
});
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Search @search="onSearch" />

    <div v-if="pending">Loading...</div>
    <div v-else-if="data?.error">Error: {{ data.error.message }}</div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">No song recommendations found</div>
      <Song v-for="rec in data.recs" :key="rec.id" v-bind="rec" />
    </div>
    <div v-else>Error occurred retrieving song recommendations</div>
  </div>
</template>
