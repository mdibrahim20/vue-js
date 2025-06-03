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
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"), // Lazy load
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("@/views/ProjectsView.vue"), // Lazy load
    },
    {
      path: "/projects/:id",
      name: "single-project",
      component: () => import("@/views/SingleProjectView.vue"), // Lazy load
    },
  ],
});

export default router;
```

> 💡 **Lazy loading** components using `() => import(...)` improves performance by only loading components when needed.

---

## ⚙️ 4. Inject the Router in `main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router); // Register the router
app.mount("#app"); // Mount the app
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
"/projects/:id";
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
import { useRoute } from "vue-router";

// Access the current route
const route = useRoute();
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
import { useRouter } from "vue-router";
const router = useRouter();

router.push({ name: "single-project", params: { id: 42 } });
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

## 🚫 Handling 404 Not Found Routes in Vue Router 4

### 🧠 What is a 404 Route?

A **404 catch-all route** handles any unknown or invalid paths in your application. Without this, users visiting incorrect URLs would see a blank screen.

---

### 🛣️ 1. Add Catch-All Route in `router/index.ts`

```ts
import { h } from 'vue'

{
  path: '/:catchAll(.*)*',        // ✅ Match all invalid routes
  name: 'NotFound',
  component: {
    render: () =>
      h('p', { style: 'color:red; font-size: 20px;' }, '404 - Page Not Found')
  }
}
```

> 💡 You can also replace the inline component with a dedicated `NotFound.vue` page for better structure.

---

### 🧩 2. Optional — Create `NotFound.vue` Component

```vue
<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you’re looking for doesn’t exist.</p>
    <RouterLink to="/">Go back to Home</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  color: red;
}
</style>
```

Then update the router:

```ts
{
  path: '/:catchAll(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NotFound.vue')
}
```

---

### 🧪 3. Example Invalid URLs That Will Trigger 404

- `/invalid`
- `/foo/bar/baz`
- `/projects/does-not-exist`

All unmatched routes will display your custom 404 page.

---

### 📌 Summary

| Feature        | Example                                           |
| -------------- | ------------------------------------------------- |
| Catch-all Path | `/:catchAll(.*)*`                                 |
| Inline View    | `component: { render: () => h(...) }`             |
| Custom Page    | `component: () => import('@/views/NotFound.vue')` |

---

🎯 **Now your app is fully protected against broken URLs!**

## 📘 Summary Table

| Feature                 | Example                                                   |
| ----------------------- | --------------------------------------------------------- |
| Dynamic Route           | `/projects/:id`                                           |
| Access Dynamic Param    | `useRoute().params.id`                                    |
| Link to Route           | `<RouterLink :to="\`/projects/${id}\`" />`                |
| Programmatic Navigation | `router.push({ name: 'single-project', params: { id } })` |

---

## 📎 Save This Guide

You can save this markdown file as:

```
docs/vue-router-setup.md
```

Or download it from your codebase to refer anytime! 🧠💡

---

🎉 You're now fully equipped to handle routing and dynamic routes in Vue 3 using Vue Router 4!

########################### ANOTHE APPROACH NEW (NEXT.JS Structure) ##############################################
# ⚡ Auto Routing in Vue 3 with TypeScript using `unplugin-vue-router`

The `unplugin-vue-router` package automatically generates routes based on your file structure — no manual route definition needed. It's built by the creator of Vue Router!

---

## 🚀 1. Installation

Install the plugin:

```bash
npm install unplugin-vue-router
```

---

## ⚙️ 2. Configure in `vite.config.ts`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
  plugins: [
    vue(),
    VueRouter({
      dts: './typed-router.d.ts', // ✅ Generates route types for TypeScript
    }),
  ],
})
```

---

## 📁 3. Create Your Views in `src/pages`

The plugin scans this directory by default.

```
src/
├── pages/
│   ├── index.vue             → route: /
│   ├── about.vue             → route: /about
│   └── blog/
│       └── [id].vue          → route: /blog/:id
```

You can also rename `pages` using the `dirs` option in the plugin config.

---

## 🧠 4. Use the Auto-Generated Router

### 🔸 `src/router.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(),
})

export default router
```

> ⚠️ No need to manually define `routes: []`. It’s auto-generated!

---

## ✅ 5. Inject Router in `main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

---

## 🌐 6. Navigation Example in Components

```vue
<template>
  <RouterLink to="/about">Go to About Page</RouterLink>
</template>
```

Or programmatic navigation with full TypeScript support:

```ts
import { useRouter } from 'vue-router/auto'

const router = useRouter()
router.push('/about')
```

---

## 📘 7. Dynamic Routing Example

### 📁 File: `src/pages/blog/[id].vue`

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
const route = useRoute()
</script>

<template>
  <div>
    <h1>Blog Post ID: {{ route.params.id }}</h1>
  </div>
</template>
```

---

## 🧩 8. Bonus: Types for All Routes

- When you set `dts: './typed-router.d.ts'` in `vite.config.ts`, it generates types you can use for:
  - `useRoute()`
  - `useRouter()`
  - Named route navigation

You’ll get **auto-completion** and **type-checking** in your routes 🚀

---

## 📎 Summary — Vue Router Auto Routing with TypeScript

| Feature              | Code / Description                                                                                                                                                                                                 |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 📦 Install Plugin     | `npm install unplugin-vue-router`                                                                                                                                                                                  |
| ⚙️ Vite Plugin Setup  | In `vite.config.ts`:<br>`import VueRouter from 'unplugin-vue-router/vite'`<br>Then in `plugins` array: `VueRouter()`<br><br>Also create `env.d.ts` with:<br>`/// <reference types="unplugin-vue-router/client" />` |
| 📂 Pages Directory    | Create your views inside `src/pages/`<br>Example: `src/pages/about.vue` becomes `/about`                                                                                                                           |
| 🧠 Type-safe Routing  | Use composables with types:<br>`useRouter()` and `useRoute()` from `'vue-router/auto'`                                                                                                                             |
| 📁 Dynamic Routes     | Use bracket syntax:<br>`[param].vue` → `/param/:value`                                                                                                                                                             |
| 🧾 Type Declarations  | In `tsconfig.app.json`, include:<br>`"include": ["env.d.ts", "src/**/*", "src/**/*.vue", "typed-router.d.ts"]`<br>And inside `compilerOptions`:<br>`"moduleResolution": "Bundler"`                                |
| 🛣️ Router Setup       | In `router/index.ts`:<br>```ts<br>import { createRouter, createWebHistory } from 'vue-router';<br>import { routes } from 'vue-router/auto-routes';<br><br>const router = createRouter({<br>  history: createWebHistory(import.meta.env.BASE_URL),<br>  routes<br>});<br><br>export default router;<br>``` |

---

## 📁 Example Auto Routes from File Structure

| File Path                    | Route Path     |
|------------------------------|----------------|
| `pages/index.vue`            | `/`            |
| `pages/about.vue`            | `/about`       |
| `pages/blog/[id].vue`        | `/blog/:id`    |
| `pages/dashboard/index.vue`  | `/dashboard`   |

---

🎉 **Now your Vue app is supercharged with auto-generated, fully typed routes using file-based routing. Less boilerplate, faster dev!**
