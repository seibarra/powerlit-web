<!-- Bento grid de tanques de agua -->
<template>
    <section>
        <header>
            <v-card elevation="1">
                <v-tabs show-arrows v-model="selected" align-tabs="center" class="tabs">
                    <v-tab v-for="category, index in productCategories" :key="index" :text="category.name" size="medium"
                        class="text-none px-5">
                        <div>
                            <p class="my-5">{{ category.name }}</p>
                            <NuxtImg :src="placeholderImages[index]" class="m-auto h-20 object-cover" width="50" :alt="category.name" />
                        </div>
                    </v-tab>
                </v-tabs>
            </v-card>
        </header>
        <section 
            class="md:px-6 sm:px-2 w-screen"
            v-if="productCategories.length > 0"
         >
            <header class="mb-5 w-full border-b border-gray-500">
                <h1 class="text-4xl p-3">{{ productCategories[selected].name }}</h1>
            </header>
            
            <ProductGrid :products="productsByCategory" />
        </section>
    </section>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/producsStore'

const route = useRoute()
const { products, productCategories } = storeToRefs(useProductsStore())
const selected = ref(0)
const selectedChanged = ref(false)

const productsByCategory = computed(() => products.value.filter((product) => product.category === productCategories.value[selected.value].name))

function editParam(param: string) {
    history.pushState({}, '', '/c/' + param)
}

watch(selected, () => {
    if (productCategories.value.length > 0) {
        editParam(productCategories.value[selected.value].path)
        selectedChanged.value = true
    }
})

const placeholderImages = [
    '/images/productos_powerlit/tanques/1000/tanque_1000_beige.avif',
    '/images/productos_powerlit/biodigestores/biodigestor_autolimpiante_600.avif',
    '/images/productos_powerlit/camaras_septicas/camara_septica_550.avif'
]
</script>

<style scoped>
.tabs {
    height: 145px !important;
}

.ambar {
    background-color: rgb(255, 245, 230) !important;
}
</style>