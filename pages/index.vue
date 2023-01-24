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
  if (!audio) return;

  activeUrl.value = url;
  audio.play();
  audio.addEventListener('ended', () => onPause(url));
};

const onPause = (url: string) => {
  audio = document.querySelector(`[src="${url}"]`);
  if (!audio) return;

  activeUrl.value = '';
  audio.pause();
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
  <div class="w-full flex flex-col gap-y-5 sm:gap-y-9 pt-1 pb-14 sm:pt-5 sm:pb-16 px-6 xl:px-32 2xl:px-56 items-center">
    <div class="absolute bg-primary w-full h-full overflow-hidden">
      <div class="absolute w-[25rem] h-[25rem] bg-blue-400 rounded-full blur-3xl opacity-10 mt-24 -ml-10" />
      <div class="hidden md:block absolute w-[25rem] h-[25rem] bg-blue-400 rounded-full blur-3xl opacity-10 mt-80 ml-[70rem]" />
    </div>

    <div class="flex w-full">
      <div class="flex items-center gap-x-5">
        <Search @search="onSearch" :options="genreData.genres" />
        <div class="tooltip tooltip-bottom" data-tip="refresh">
          <Icon
            @click="refresh"
            name="ci:refresh-02"
            class="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-blue-200"
          />
        </div>
      </div>
    </div>

    <div v-if="pending" class="z-10 mt-20 flex flex-col items-center gap-y-4">
      <p class="text-sm sm:text-base">loading...</p>
      <img
        src="~/assets/music.gif"
        class="h-8 w-20 sm:h-10 sm:w-24"
        alt="Music Gif"
      />
    </div>
    <div v-else-if="data?.error_description">
      error: {{ data.error_description }}
    </div>
    <div v-else-if="data?.recs" class="w-full">
      <div v-if="data.recs.length === 0">no song recommendations found</div>
      <div v-else class="grid xl:grid-cols-2 gap-x-9 gap-y-4 sm:gap-y-7">
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
