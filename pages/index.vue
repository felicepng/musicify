<script setup lang="ts">
import { ref } from 'vue';

const genre = ref<string>('acoustic');
let audio: HTMLVideoElement | null;

const { data: genreData } = await useFetch('/api/genres');
const { data, pending } = await useFetch('/api/songs', {
  query: { genre },
  server: false,
});

const onSearch = (input: string) => {
  genre.value = input;
};

const onPlay = (url: string) => {
  audio?.pause();
  audio = document.querySelector(`[src="${url}"]`);
  audio?.play();
};

const onPause = (url: string) => {
  audio = document.querySelector(`[src="${url}"]`);
  audio?.pause();
};

defineExpose({
  genreData,
  data,
  pending,
  onSearch,
  onPlay,
  onPause,
});
</script>

<template>
  <div class="font-poppins flex flex-col gap-y-9 pt-8 pb-20 px-10">
    <div class="flex justify-between items-cemter">
      <Search @search="onSearch" :options="genreData.genres" />
      <NuxtLink to="/recents">recents &gt;</NuxtLink>
    </div>

    <div v-if="pending">Loading...</div>
    <div v-else-if="data?.error_description">
      Error: {{ data.error_description }}
    </div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">No song recommendations found</div>
      <div v-else class="grid lg:grid-cols-2 gap-x-10 gap-y-9">
        <Song
          v-for="rec in data.recs"
          :key="rec.id"
          v-bind="rec"
          @play="onPlay"
          @pause="onPause"
        />
      </div>
    </div>
    <div v-else>Error occurred retrieving song recommendations</div>
  </div>
</template>
