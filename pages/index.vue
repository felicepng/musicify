<script setup lang="ts">
import { SearchResult } from '~~/consts/consts';

const results = ref<SearchResult[]>([]);

const onSearch = async (query: Record<string, string>) => {
  Object.keys(query).forEach((key) => {
    !query[key] && delete query[key];
  });

  const { data, pending } = await useAsyncData('songRecs', () =>
    $fetch('/api/songRecs', { query })
  );

  results.value = data.value?.recs || [];
};

defineExpose({
  results,
  onSearch,
});
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Form @search="onSearch" />
    <!-- <div v-if="loading" /> -->
    <Result v-for="result in results" :key="result.id" v-bind="result" />
  </div>
</template>
