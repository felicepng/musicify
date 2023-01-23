<script setup lang="ts">
import { ref } from 'vue';

const query = ref<Record<string, string>>({});
const url = computed(() => `/api/songRecs?${new URLSearchParams(query.value)}`);

const { data, pending, error } = await useFetch(url, { server: false });

const onSearch = async (obj: Record<string, string>) => {
  Object.keys(obj).forEach((key) => {
    !obj[key] && delete obj[key];
  });
  query.value = obj;
};

defineExpose({
  data,
  pending,
  error,
  onSearch,
});
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Form @search="onSearch" />
    {{ Object.keys(query).length > 0 && pending }}
    <div v-if="data?.recs?.length">
      <Result v-for="rec in data.recs" :key="rec.id" v-bind="rec" />
    </div>
  </div>
</template>
