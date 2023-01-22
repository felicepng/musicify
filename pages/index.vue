<script setup>
const handleAuthorize = async () => {
  await $fetch('/api/spotify/authorize')
}
</script>

<template>
  <div class="font-poppins flex flex-col">
    <h1 class="text-3xl font-medium">Main</h1>
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <button class="bg-blue-700" @click="handleAuthorize()">
      Authorize User
    </button>
  </div>
</template>
