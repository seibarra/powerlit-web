<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
        <v-card 
        v-for="product, index in products"
        :key="index"
        class="d-flex flex-column"
        link
        @click="handleClickCard(product)"
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

            <v-spacer></v-spacer>
            
            <v-card-actions>
                <strong v-if="product.price" class="text-xl p-5">${{ product.price.toLocaleString('es-ES') }}</strong>
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

function handleClickCard(product: Product) {
    console.log('product', product)
    
    navigateTo(`/productos/${product.id}`)
}
</script>