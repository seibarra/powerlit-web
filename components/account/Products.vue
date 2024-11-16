<template>
    <section class="max-w-[900px] w-full">
        <header class="flex justify-between items-center">
            <h2 class="text-2xl font-bold px-5 pb-7">Productos</h2>
        </header>
        <div>
            <v-btn color="green" text="Agregar producto" variant="tonal" @click="showAddProductDialog = true"
                class="text-none font-weight-regular"></v-btn>
        </div>
        <DialogAddProduct v-model="showAddProductDialog" />
    </section>
</template>

<script setup lang="ts">
const showAddProductDialog = ref(false)	
</script>