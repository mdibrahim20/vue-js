<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type {Tables} from '../../../database/types'



const tasks = ref<Tables<'tasks'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('tasks').select('*')
  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  tasks.value = data
  console.log('Projects:', tasks)
})()
</script>


<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 shadow-sm rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left px-4 py-2 border-b">ID</th>
            <th class="text-left px-4 py-2 border-b">Name</th>
            <th class="text-left px-4 py-2 border-b">Status</th>
            <th class="text-left px-4 py-2 border-b">Description</th>
            <th class="text-left px-4 py-2 border-b">Due Date</th>
            <th class="text-left px-4 py-2 border-b">Collaborators</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">{{ task.id }}</td>
            <td class="px-4 py-2 border-b font-medium">{{ task.name }}</td>
            <td class="px-4 py-2 border-b capitalize">{{ task.status }}</td>
            <td class="px-4 py-2 border-b text-sm">{{ task.description }}</td>
            <td class="px-4 py-2 border-b">{{ task.due_date }}</td>
            <td class="px-4 py-2 border-b">
              <ul>
                <li v-for="user in task.collaborators" :key="user">{{ user }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped></style>
