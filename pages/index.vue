<script setup lang="ts">
import { Artist, SearchResult } from '~~/consts/consts';

const results = ref<SearchResult[]>([]);

const onSearch = async (query: Record<string, string>) => {
  const params = serialize(query, '=', '&');
  const res = await $fetch(`/api/queryTracks?${params}`);

  if (!res.recs?.length) {
    results.value = [];
    return;
  }

  const arr: SearchResult[] = res.recs.map(
    (rec: SpotifyApi.TrackObjectFull) => {
      const artists: Artist[] = rec.artists.map(
        (artist: SpotifyApi.ArtistObjectSimplified) => ({
          id: artist.id,
          name: artist.name,
          url: artist.external_urls.spotify,
        })
      );

      return {
        id: rec.id,
        name: rec.name,
        url: rec.external_urls.spotify,
        preview_url: rec.preview_url,
        album: {
          name: rec.album.name,
          url: rec.album.external_urls.spotify,
          image: rec.album.images[1].url,
        },
        artists,
      };
    }
  );

  results.value = arr;
  console.log(arr);
};

defineExpose({
  results,
  onSearch,
});
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Form @search="onSearch" />
    <Result v-for="result in results" :key="result.id" v-bind="result" />
  </div>
</template>
