<script setup lang="ts">
const songEmit = defineEmits({
  play: (url: string) => {
    return !!url;
  },
  pause: (url: string) => {
    return !!url;
  },
});

defineProps({
  id: String,
  name: String,
  url: String,
  preview_url: String,
  album: Object,
  artists: Array,
});
</script>

<template>
  <div class="bg-translucent rounded-lg py-6 px-8 flex items-center gap-x-8">
    <a :href="album.url" target="_blank">
      <img :src="album.image" alt="Album image" class="w-24 h-24 rounded-sm" />
    </a>
    <div>
      <a
        :href="url"
        target="_blank"
        class="text-lg font-medium hover:text-blue-200"
      >
        {{ name }}
      </a>
      <div class="flex items-center gap-x-2 font-extralight truncate">
        <a
          v-for="artist in artists"
          :key="artist.name"
          :href="artist.url"
          target="_blank"
          class="hover:text-blue-200"
        >
          {{ artist.name
          }}{{ artist.name !== artists[artists.length - 1].name ? ',' : '' }}
        </a>
      </div>
      <p class="text-sm uppercase font-extralight truncate">
        {{ album.name }}
      </p>
    </div>

    <button @click="songEmit('play', preview_url)">PLAY</button>
    <!-- <button @click="songEmit('pause', preview_url)">PAUSE</button> -->
    <audio
      :src="preview_url"
      controls="controls"
      preload="auto"
      hidden="true"
    />
  </div>
</template>
