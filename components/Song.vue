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
  isActive: Boolean,
});
</script>

<template>
  <div
    :class="`${
      isActive ? 'bg-translucentBlue' : 'bg-translucent'
    } rounded-lg py-6 px-8 flex items-center gap-x-8`"
  >
    <a
      :href="album.url"
      target="_blank"
      class="relative flex justify-center items-center"
    >
      <img
        v-show="isActive"
        src="~/assets/music.gif"
        class="absolute w-2/3 h-1/2 opacity-90"
        alt="Music gif"
      />
      <img :src="album.image" alt="Album image" class="w-24 h-24 rounded-sm" />
    </a>
    <div class="w-72">
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
      <p class="mt-2 text-sm uppercase font-extralight truncate">
        {{ album.name }}
      </p>
    </div>

    <div v-if="!preview_url" class="tooltip" data-tip="no preview available">
      <Icon
        name="material-symbols:play-arrow"
        class="w-7 h-7 md:w-8 md:h-8 opacity-20 cursor-not-allowed"
      />
    </div>
    <button v-else-if="!isActive" @click="songEmit('play', preview_url)">
      <Icon
        name="material-symbols:play-arrow"
        class="w-7 h-7 md:w-8 md:h-8 hover:text-blue-200"
      />
    </button>
    <button v-else @click="songEmit('pause', preview_url)">
      <Icon
        name="material-symbols:pause-outline"
        class="w-7 h-7 md:w-8 md:h-8 hover:text-blue-200"
      />
    </button>
    <audio
      :src="preview_url"
      controls="controls"
      preload="auto"
      hidden="true"
    />
  </div>
</template>
