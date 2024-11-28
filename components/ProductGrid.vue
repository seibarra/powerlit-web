<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
        <v-card 
        v-for="product, index in products"
        :key="index"
        class="d-flex flex-column"
        link
        @click="navigateTo(`/productos/${product.id}`)"
        >
            <div class="aspect-square flex justify-center items-center">
                <NuxtImg :src="product.imagesURLs[0]" class="m-auto max-w-[100%] max-h-[100%]"></NuxtImg>
            </div>

            <v-card-title class="pb-0 text-wrap">
                {{ product.name }}
            </v-card-title>
            
            <v-card-subtitle v-if="product.shortDescription">
                {{ product.shortDescription }}
            </v-card-subtitle>
            
            <strong v-if="product.price" class="text-xl ml-5 pt-3">${{ product.price.toLocaleString('es-ES') }}</strong>

            <v-spacer/>

            <v-card-actions >
                <v-spacer/>
                <v-btn color="orange" variant="tonal">Ver más</v-btn>
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