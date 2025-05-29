<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div>
    <h1>Project Dynamic Route:{{route.params.id}}</h1>
  </div>
</template>

<style scoped>
</style>