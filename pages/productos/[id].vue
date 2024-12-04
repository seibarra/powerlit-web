<template>
    <section v-if="product" class="mx-auto my-10 sm:px-6 max-sm:px-4">
        <div class="flex max-md:flex-col gap-5 justify-center">
            <div class="max-h-[400px] md:border-r-4 md:border-slate-500">
                <NuxtImg :src="product.imagesURLs[selectedImage]" width="400" class="mx-auto"></NuxtImg>
            </div>

            <div class="max-w-[450px]">
                <h1 class="text-4xl p-3">{{ product.name }}</h1>
                <div class="mt-4 p-2 whitespace-pre-line">
                    {{ product.description }}
                </div>
                <div class="flex flex-col items-end mt-5">
                    <div>
                        <div class="text-xl w-min mx-auto">${{ formatPrice(product.price ?? 0) }}</div>
                        <button 
                        @click="userStore.addToCart(product.id, 1)"
                        class="mt-4 text-xl text-center float-end text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto px-5 py-2.5">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="product.imagesURLs.length > 1" class="flex gap-5 w-full my-16">
            <div 
            v-for="(image, index) in product.imagesURLs" :key="index" 
            class="border-2 border-slate-500 rounded-lg p-5 max-w-[120px] cursor-pointer hover:bg-slate-100"
            @click="selectedImage = index"
            >
                <NuxtImg :src="image" width="270" class="mx-auto" />
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