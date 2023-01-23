<script setup lang="ts">
const props = defineProps({
  id: String,
  name: String
})

defineExpose({
  id: props.id,
  name: props.name
})
</script>

<template>
  <div>{{ id }}: {{ name }}</div>
</template>