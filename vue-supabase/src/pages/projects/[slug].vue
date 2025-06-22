<script setup lang="ts">
import { useRoute } from 'vue-router'
const router = useRoute()
</script>

<template>
  <div>
    <h1>Projects-Slug: {{ router.params?.slug }}</h1>
  </div>
</template>

<style scoped></style>
