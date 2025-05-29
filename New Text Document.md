# 🌐 Vue Router 4 Setup Guide (Vue 3 + Vite)

## 🔧 1. Installation

Install Vue Router in your Vue 3 + Vite project:

```bash
npm install vue-router@4
```

---

## 📁 2. Recommended Project Structure

```
src/
├── views/
│   ├── HomeView.vue / AnyViews
│   ├── ProjectsView.vue / AnyViews
│   └── SingleProjectView.vue  / AnyViews
├── router/
│   └── index.ts
├── App.vue
└── main.ts
```

---

## 🛣️ 3. Router Configuration — `src/router/index.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue') // Lazy load
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue') // Lazy load
    },
    {
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/views/SingleProjectView.vue') // Lazy load
    }
  ],
})

export default router
```

> 💡 **Lazy loading** components using `() => import(...)` improves performance by only loading components when needed.

---

## ⚙️ 4. Inject the Router in `main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)   // Register the router
app.mount('#app') // Mount the app
```

---

## 🧩 5. Setup `<RouterView>` in `App.vue`

```vue
<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts"></script>
```

- `<RouterView />` is the placeholder where Vue injects the matched route component.

---

## 🏠 6. Home View — `HomeView.vue`

```vue
<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink to="/projects">Go to Project Page</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped></style>
```

---

## 📁 7. Projects View — `ProjectsView.vue`

```vue
<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to Homepage</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped></style>
```

---

# 📌 Vue Router 4 – Dynamic Route Setup

## 🧠 What Is a Dynamic Route?

A **dynamic route** captures part of the URL using a `:` prefix.

Example path:
```ts
'/projects/:id'
```

This allows URLs like:

- `/projects/1`
- `/projects/my-awesome-app`
- `/projects/vue-router-guide`

---

## 🛠️ 1. Define Dynamic Route

Already done in `router/index.ts`:

```ts
{
  path: '/projects/:id',
  name: 'single-project',
  component: () => import('@/views/SingleProjectView.vue')
}
```

---

## 📄 2. Create the Dynamic View — `SingleProjectView.vue`

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'

// Access the current route
const route = useRoute()
</script>

<template>
  <div>
    <h1>Project Dynamic Route: {{ route.params.id }}</h1>
  </div>
</template>

<style scoped></style>
```

### 🧠 Explanation:
- `useRoute()` provides the active route object.
- `route.params.id` gives you the dynamic value from the URL.

---

## 🔗 3. How to Navigate to Dynamic Routes

### ✅ Using `<RouterLink>`:

```vue
<RouterLink :to="`/projects/42`">View Project 42</RouterLink>
```

### ✅ Programmatically:

```ts
import { useRouter } from 'vue-router'
const router = useRouter()

router.push({ name: 'single-project', params: { id: 42 } })
```

---

## ✅ Final Result

When visiting:

```
/projects/42
```

The app displays:

```
Project Dynamic Route: 42
```

---

## 🎯 Pro Tips

- You can nest more dynamic segments:
  ```
  /projects/:category/:id
  ```
- Use `watchEffect` or `watch` to reactively fetch data based on the dynamic ID.
- Use route guards to validate `:id` before entering the route.

---

## 📘 Summary Table

| Feature                | Example                                      |
|------------------------|----------------------------------------------|
| Dynamic Route          | `/projects/:id`                              |
| Access Dynamic Param   | `useRoute().params.id`                       |
| Link to Route          | `<RouterLink :to="\`/projects/${id}\`" />`  |
| Programmatic Navigation| `router.push({ name: 'single-project', params: { id } })` |

---

## 📎 Save This Guide

You can save this markdown file as:

```
docs/vue-router-setup.md
```

Or download it from your codebase to refer anytime! 🧠💡

---
🎉 You're now fully equipped to handle routing and dynamic routes in Vue 3 using Vue Router 4!
