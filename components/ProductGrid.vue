<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <v-card 
        v-for="product, index in products"
        :key="index"
        class="d-flex flex-column"
        link
        @click="navigateTo(`/productos/${product.id}`)"
        >
            <v-spacer></v-spacer>

            <div class="w-full">
                <NuxtImg :src="product.imagesURLs[0]" class="m-auto h-[300px] w-[250px]"></NuxtImg>
            </div>

            <v-spacer></v-spacer>

            <v-card-title class="pb-0">
                {{ product.name }}
            </v-card-title>
            
            
            <v-card-subtitle v-if="product.shortDescription">
                {{ product.shortDescription }}
            </v-card-subtitle>
            
            <strong v-if="product.price" class="text-xl ml-5 pt-3">${{ product.price.toLocaleString('es-ES') }}</strong>

            <v-card-actions >
                <v-btn color="#ffebc9ee" text="Ver más"></v-btn>

                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { type Product } from '~/types/entities'
defineProps({
    products: {
        type: Array<Product>,
        required: true
    }
})
</script>