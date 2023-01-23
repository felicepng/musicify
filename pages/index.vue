<script setup lang="ts">
import { ref } from 'vue';

const query = ref<Record<string, string>>({});

const { data, pending } = await useFetch('/api/songRecs', {
  query,
  server: false,
});

const onSearch = async (obj: Record<string, string>) => {
  Object.keys(obj).forEach((key) => {
    !obj[key] && delete obj[key];
  });
  query.value = obj;
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
    <Form @search="onSearch" />

    <div v-if="Object.keys(query).length === 0" />
    <div v-else-if="pending">Loading...</div>
    <div v-else-if="data?.error">Error: {{ data.error.message }}</div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">No song recommendations found</div>
      <Result v-for="rec in data.recs" :key="rec.id" v-bind="rec" />
    </div>
    <div v-else>Error occurred retrieving song recommendations</div>
  </div>
</template>
