<template>
  <NuxtLayout name="navbar"></NuxtLayout>

  <main class="w-screen h-full">
      <v-app>
        <div class="flex flex-col max-w-[1920px] w-full h-full items-center">

          <NuxtPage />
        </div>
      </v-app>
  </main>

<NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>