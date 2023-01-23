<script setup lang='ts'>
const onSearch = async (query: Record<string, string>) => {
  const params = serialize(query, "=", "&")
  console.log(params)
  const res = await $fetch(`/api/queryTracks?${params}`)
  console.log(res)
}
</script>

<template>
  <div class="font-poppins flex flex-col">
    <NuxtLink to="/recents">&gt; to recents</NuxtLink>
    <Form @search="onSearch" />
  </div>
</template>
