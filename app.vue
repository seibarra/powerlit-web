<template>
  <NuxtLayout name="navbar"></NuxtLayout>

  <main class="w-full flex justify-center">
    <div class="flex flex-col max-w-[1920px] w-full">
      <v-app>
        <NuxtPage />
      </v-app>
    </div>
  </main>

<NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>