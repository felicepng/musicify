<script setup lang="ts">
import { ref } from 'vue';

const genre = ref<string>('acoustic');
const activeUrl = ref<string>('');
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
  activeUrl.value = url;
  audio?.play();
  audio?.addEventListener('ended', () => onPause(url));
};

const onPause = (url: string) => {
  audio = document.querySelector(`[src="${url}"]`);
  activeUrl.value = '';
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

    <div v-if="pending">loading...</div>
    <div v-else-if="data?.error_description">
      error: {{ data.error_description }}
    </div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">no song recommendations found</div>
      <div v-else class="grid xl:grid-cols-2 gap-x-10 gap-y-9">
        <Song
          v-for="rec in data.recs"
          :key="rec.id"
          v-bind="rec"
          @play="onPlay"
          @pause="onPause"
          :isActive="activeUrl === rec.preview_url"
        />
      </div>
    </div>
    <div v-else>error occurred retrieving song recommendations</div>
  </div>
</template>
