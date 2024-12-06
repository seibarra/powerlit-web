<template>
    <section v-if="product" class="mx-auto my-10 sm:px-6 max-sm:px-4">
        <div class="flex max-md:flex-col gap-5 justify-center">
            <div class="max-h-[400px] md:border-r-4 md:border-slate-500">
                <NuxtImg :src="product.imagesURLs[selectedImage]" width="400" class="mx-auto"></NuxtImg>
            </div>

            <div class="max-w-[450px]">
                <textarea v-model="product.name" class="p-3 text-4xl w-full resize-none"></textarea>
                <textarea v-model="product.description" class="mt-4 p-2 w-full min-h-[200px] resize-none"></textarea>
                <div class="flex flex-col items-end mt-5 justify-end">
                        <div class="flex gap-1 items-center text-lg mb-3">
                            <span>$</span><input type="number" class="text-xl w-[100px]" v-model="product.price"></input>
                        </div>
                        <v-btn :loading="updatingProduct" variant="tonal" color="green" @click="handleUpdateProduct(product)">
                                Guardar cambios
                        </v-btn>
                </div>
            </div>
        </div>

        <div v-if="product.imagesURLs.length > 1" class="flex gap-5 w-full my-16">
            <div 
            v-for="(image, index) in product.imagesURLs" :key="index" 
            class="border-2 border-slate-500 rounded-lg p-5 max-w-[120px] cursor-pointer hover:bg-slate-100 relative"
            @click="selectedImage = index"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @dragend="onDragEnd"
            @mouseenter="deleteButtonIndex = index"
            @mouseleave="deleteButtonIndex = null"
            >
                <NuxtImg :src="image" width="270" class="mx-auto" />

                <div v-if="deleteButtonIndex === index" @click="handleDeleteImage(index)"
                class="absolute bottom-1 right-1 p-2 bg-red-500 text-white rounded-full">
                    <v-icon>mdi-close</v-icon>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { type Product } from '~/types/entities'
const supabase = useSupabaseClient()
const route = useRoute()
const product = ref<Product>()
const productId = ref(route.params.id)
const selectedImage = ref(0)
const productsStore = useProductsStore()
const updatingProduct = ref(false)
const deleteButtonIndex = ref<number | null>(null)

onMounted(async () => {
    const { data, error } = await supabase.from('products').select().eq('id', productId.value).single()
    if (error) {
        console.log('Error al obtener producto', error)
    } else {
        product.value = data
    }
})

async function handleUpdateProduct(product: Product) {
    updatingProduct.value = true
    await productsStore.updateProduct(product)
    updatingProduct.value = false
}

function handleDeleteImage(index: number) {
    product.value?.imagesURLs.splice(index, 1)
    product.value?.imagesPaths.splice(index, 1)
}

const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
    draggedIndex.value = index;
}

const onDragEnd = () => {
  draggedIndex.value = null; // Reset the dragged index when dragging ends
}

const onDragOver = (hoverIndex: number) => {
      if (draggedIndex.value !== hoverIndex && draggedIndex.value !== null) {
        const draggedImageURL = product.value?.imagesURLs[draggedIndex.value]
        const draggedImagePath = product.value?.imagesPaths[draggedIndex.value]
        if (draggedImageURL) {
            product.value?.imagesURLs.splice(draggedIndex.value, 1)
            product.value?.imagesURLs.splice(hoverIndex, 0, draggedImageURL)
        }
        if (draggedImagePath) {
            product.value?.imagesPaths.splice(draggedIndex.value, 1)
            product.value?.imagesPaths.splice(hoverIndex, 0, draggedImagePath)
        }
        draggedIndex.value = hoverIndex; // Update the dragged index
      }
}
</script>

<style>
textarea {
    field-sizing: content;
}
</style>