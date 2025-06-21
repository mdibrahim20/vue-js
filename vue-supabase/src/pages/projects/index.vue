<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type {Tables} from '../../../database/types'



const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  projects.value = data
  //  return data
  console.log('Projects:', projects)
  // You can now use `projects.value` in your template
})()
</script>


<template>
  <div>
    <h1>Projects</h1>
    <li v-for="project in projects" :key="project.id">
      {{ project.id }}
    </li>
  </div>
</template>

<style scoped></style>
