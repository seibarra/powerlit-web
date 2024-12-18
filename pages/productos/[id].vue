<template>
    <section v-if="product" class="mx-auto my-10 sm:px-6 max-sm:px-4">
        <div class="flex max-md:flex-col gap-5 justify-center">
            <div class="h-full md:sticky md:top-0">
                <NuxtImg :src="product.imagesURLs[selectedImage]" width="400" class="max-h-[400px] mx-auto"></NuxtImg>

                <div v-if="product.imagesURLs.length > 1" class="flex gap-5 max-w-[400px] mt-5 flex-wrap justify-center">
                    <div 
                        v-for="(image, index) in product.imagesURLs" :key="index"
                        class="border-2 border-slate-500 rounded-lg p-2 max-w-[120px] max-md:max-w-[60px] cursor-pointer hover:bg-slate-100"
                        @click="selectedImage = index"
                    >
                        <NuxtImg :src="image" width="270" class="mx-auto object-cover" />
                    </div>
                </div>
            </div>

            <div class="max-w-[450px] md:border-l-4 md:border-slate-500 pl-5">
                <h1 class="text-4xl p-3">{{ product.name }}</h1>
                <div class="mt-4 p-2 whitespace-pre-line">
                    {{ product.description }}
                </div>
                <div class="flex justify-between items-center mt-5 max-sm:flex-col gap-3 max-sm:items-start">
                        <div class="text-3xl w-min">${{ formatPrice(product.price ?? 0) }}</div>
                        <button 
                        @click="userStore.addToCart(product.id, 1)"
                        class="mt-4 text-xl text-center float-end text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto px-5 py-2.5">
                            Agregar al carrito
                        </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { type Product } from '~/types/entities'
const supabase = useSupabaseClient()
const route = useRoute()
const userStore = useUserStore()
const product = ref<Product>()
const productId = ref(route.params.id)
const selectedImage = ref(0)

onMounted(async () => {
    const { data, error } = await supabase.from('products').select().eq('id', productId.value).single()
    if (error) {
        console.log('Error al obtener producto', error)
    } else {
        product.value = data
    }
})

function formatPrice(price: number) {
    return price.toLocaleString('es-ES')
}
</script>