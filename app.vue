<template>
  <NuxtLayout name="navbar"></NuxtLayout>

  <main class="w-screen">
      <v-app class="flex flex-col max-w-[1920px] w-full items-center">
        <NuxtPage />
      </v-app>
  </main>

<NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>