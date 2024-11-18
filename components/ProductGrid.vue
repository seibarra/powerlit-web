<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <v-card 
        v-for="product, index in products"
        :key="index"
        :class="index === 1 ? 'md:col-span-2 md:row-span-2 ambar' : 'md:col-span-1'"
        class="d-flex flex-column"
        link
        >
        <v-spacer></v-spacer>

        <div class="w-full">
            <NuxtImg :src="product.imagesURLs[0]" class="m-auto h-[300px] w-[250px]"></NuxtImg>
        </div>

        <v-spacer></v-spacer>

            <v-card-title>
                {{ product.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ product.description }}
            </v-card-subtitle>

            <v-card-actions >
                <v-btn color="orange" text="Ver más"></v-btn>

                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { type Product } from '~/types/entities'
const props = defineProps({
    products: {
        type: Array<Product>,
        required: true
    }
})
</script>