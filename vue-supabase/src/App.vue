<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
console.log(supabase)

</script>


<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
