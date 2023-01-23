<script setup>
let audio;

const onPlay = (url) => {
  audio = document.querySelector(`[src="${url}"]`);
  audio.play();
};

const onPause = (url) => {
  audio = document.querySelector(`[src="${url}"]`);
  audio.pause();
};

const props = defineProps({
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
  <button @click="onPlay(preview_url)">PLAY</button>
  <button @click="onPause(preview_url)">PAUSE</button>
  <img :src="album.image" alt="Album image" />
</template>
