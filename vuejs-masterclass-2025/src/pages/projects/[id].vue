<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div>
    <h1>Projects:{{ route.params?.id }}</h1>
    <RouterLink to="/projects">Go to Projects</RouterLink>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>

<style scoped>
</style>
