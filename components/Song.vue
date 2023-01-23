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
  <audio :src="preview_url" controls="controls" preload="auto" hidden="true" />
  <button @click="songEmit('play', preview_url)">PLAY</button>
  <button @click="songEmit('pause', preview_url)">PAUSE</button>
  <img :src="album.image" alt="Album image" />
</template>
