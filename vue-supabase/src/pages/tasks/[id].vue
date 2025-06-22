<script setup lang="ts">
import { useRoute } from 'vue-router'
const router = useRoute()
</script>

<template>
  <div>
    <h1>Tasks Page:</h1>
    {{ router.params?.id }}
  </div>
</template>

<style scoped></style>
