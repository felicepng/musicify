<script setup lang="ts">
import { ref } from 'vue';

const genre = ref<string>('acoustic');
const activeUrl = ref<string>('');
let audio: HTMLVideoElement | null;

const { data: genreData } = await useFetch('/api/genres');
const { data, pending, refresh } = await useFetch('/api/songs', {
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
  refresh,
  onSearch,
  onPlay,
  onPause,
});
</script>

<template>
  <div
    class="
      font-poppins
      flex flex-col
      gap-y-7
      sm:gap-y-9
      pt-5
      pb-14
      sm:pt-8 sm:pb-20
      px-6
      lg:px-20
      items-center
    "
  >
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center gap-x-4 sm:gap-x-5">
        <Search @search="onSearch" :options="genreData.genres" />
        <div class="tooltip" data-tip="refresh">
          <Icon
            @click="refresh"
            name="ci:refresh-02"
            class="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-blue-200"
          />
        </div>
      </div>
      <NuxtLink to="/recents">recents &gt;</NuxtLink>
    </div>

    <img
      v-if="pending"
      src="~/assets/music.gif"
      class="mt-10 h-10 w-24"
      alt="Music gif"
    />
    <div v-else-if="data?.error_description">
      error: {{ data.error_description }}
    </div>
    <div v-else-if="data?.recs">
      <div v-if="data.recs.length === 0">no song recommendations found</div>
      <div v-else class="grid lg:grid-cols-2 gap-x-10 gap-y-7 sm:gap-y-9">
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
