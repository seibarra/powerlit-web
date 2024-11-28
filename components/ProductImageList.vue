<template>
    <div class="flex flex-wrap gap-2">
        <NuxtImg v-for="image, index in images" :key="index" :src="image" width="100" class="object-cover" />
    </div>
</template>

<script setup lang="ts">
const images = ref(getProductImagePaths().map((path) => `/images/productos_powerlit${path}`))
</script>