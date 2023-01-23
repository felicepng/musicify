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
    } rounded-lg py-4 px-5 sm:py-6 sm:px-8 flex items-center justify-between gap-x-6 sm:gap-x-8`"
  >
    <div class="flex items-center gap-x-6 sm:gap-x-8">
      <a
        :href="album.url"
        target="_blank"
        class="
          relative
          flex
          justify-center
          items-center
          w-16
          h-16
          sm:w-24 sm:h-24
          shrink-0
          rounded-sm
        "
      >
        <img
          v-show="isActive"
          src="~/assets/music.gif"
          class="absolute w-2/3 h-1/2 z-10"
          alt="Music gif"
        />
        <div
          v-show="isActive"
          class="absolute bg-black opacity-50 w-full h-full"
        />
        <img :src="album.image" alt="Album image" class="w-full h-full" />
      </a>

      <div class="shrink">
        <a
          :href="url"
          target="_blank"
          class="flex-wrap text-base sm:text-lg font-medium hover:text-blue-200"
        >
          {{ name }}
        </a>
        <div
          class="
            flex flex-wrap
            text-sm
            sm:text-base
            items-center
            gap-x-2
            font-extralight
            truncate
          "
        >
          <a
            v-for="artist in artists"
            :key="artist.id"
            :href="artist.url"
            target="_blank"
            class="hover:text-blue-200"
          >
            {{ artist.name
            }}{{ artist.name !== artists[artists.length - 1].name ? ',' : '' }}
          </a>
        </div>
        <p
          class="
            flex-wrap
            mt-2
            text-xs
            sm:text-sm
            uppercase
            font-extralight
            opacity-70
          "
        >
          {{ album.name }}
        </p>
      </div>
    </div>

    <div v-if="!preview_url" class="tooltip" data-tip="no preview">
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
