<script setup lang="ts">
import { Icon } from '@iconify/vue'
interface LinkProp {
  title: string
  to: string
  icon: string
}
defineProps<{
  links: LinkProp[]
}>()
</script>

<template>
  <RouterLink
    v-for="link in links"
    :key="link.title"
    :to="link.to"
    exactActiveClass="text-primary bg-muted"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <Icon :icon="link.icon"></Icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>

<style scoped></style>
