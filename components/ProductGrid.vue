<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
        <v-card 
        v-for="product, index in products"
        :key="index"
        @click="handleClickCard(product)"
        >
        <div class="max-sm:flex">
            <div class="aspect-square flex justify-center items-center max-sm:max-w-[130px] ">
                <NuxtImg :src="product.imagesURLs[0]" class="m-auto max-w-[100%] max-h-[100%] w-full"></NuxtImg>
            </div>

            <div class="text-wrap w-full p-3">
                <h2 class="text-xl">
                    {{ product.name }}
                </h2>
                
                <small class="text-sm text-gray-400">
                    {{ product.shortDescription }}
                </small>
            </div>
        </div>
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