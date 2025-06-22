<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
interface Project {
  id: string
  name?: string
  // Add any other fields your PocketBase "projects" collection has
}

const projects = ref<Project[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/projects')
    projects.value = response.data
    console.log('Projects:', projects.value)
  } catch (err) {
    console.error('Error fetching projects:', err)
  }
})
</script>

<template>
  <div>
    <h1>Projects</h1>
    {{ console.log(projects) }}
    <ul>
      <li v-for="project in projects" :key="project.id">{{ project.id }} - {{ project.name }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
