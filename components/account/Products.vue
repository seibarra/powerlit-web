<template>
    <section class="max-w-[900px] min-w-full">
        <header class="flex gap-5 items-center pb-7">
            <div>
                <h2 class="text-2xl font-bold px-5">Productos</h2>
            </div>

            <v-btn color="green" text="Agregar producto" variant="tonal" @click="showAddProductDialog = true"
                class="text-none font-weight-regular m-3"></v-btn>
        </header>
        <div class="w-full">
            <div class="flex flex-wrap gap-5">
                <v-text-field
                    label="Buscar producto"
                    variant="outlined"
                    density="compact"
                    class="max-w-[210px]"
                    width="210"
                    clearable
                    @update:modelValue="searchProduct"
                ></v-text-field>
                <v-autocomplete @update:modelValue="handleCategoryUpdate" label="Categorías" variant="solo-filled" density="compact" v-model="selectedCategories" :items="categories" multiple chips width="210"  class="max-w-[210px]"></v-autocomplete>
                <v-autocomplete @update:modelValue="handleTagUpdate" label="Tags" variant="solo-filled" density="compact" v-model="selectedTags" :items="tags" multiple chips width="210"  class="max-w-[210px]"></v-autocomplete>
                <v-slider v-model="cardSize" min="125" max="400" label="Tamaño" variant="solo-filled" density="compact" width="210" class="max-w-[210px]"></v-slider>
            </div>
            <LocalProductList :products="productsFiltered" :cardSize="cardSize" @onDeleteProducts="deleteSelectedProducts" :loading="loadingProducts" />
        </div>
        <DialogAddProduct v-model="showAddProductDialog" @onAddProduct="pushProduct" />
    </section>
</template>

<script setup lang="ts">
import type { Product, ProductTag } from '~/types/entities'
const showAddProductDialog = ref(false)
const userStore = useUserStore()
const supabase = useSupabaseClient()
const products = ref<Product[]>([])
const tags = ref<string[]>([])
const productTags = ref<ProductTag[]>([])
const loadingProducts = ref(false)


const cardSize = ref(200)

// filters
const productsFiltered = ref<Product[]>([])
const currentOffset = ref(0)
const categories = ref<string[]>([])
const selectedCategories = ref<string[]>([])
const selectedTags = ref<string[]>([])
const showUserProducts = ref(true)

onMounted(async () => {
    currentOffset.value = 0
    products.value = await getAllProducts()
    productsFiltered.value = products.value
    await getProductTags()

    try {
        const { data, error } = await supabase.from('product_categories').select()
        if (!error) {
            categories.value = data.map((item) => item.name)
        } 
    } catch {
        console.log('Error al obtener categorías.')
    }
})

function searchProduct(value: string) {
    if (value != null && value.length > 0) {
        productsFiltered.value = products.value.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    } else {
        productsFiltered.value = products.value
    }
}

function pushProduct(product: Product) {
    products.value.push(product)
}

async function handleCategoryUpdate(value: string[]) {
    selectedCategories.value = value
    setProductsFiltered()
}

async function handleTagUpdate(value: string[]) {
    selectedTags.value = value
    setProductsFiltered()
}

function setProductsFiltered() {
    let productsAux = products.value

    if (selectedCategories.value.length > 0) {
        productsAux = products.value.filter((item) => selectedCategories.value.includes(item.category ?? ''))
    }

    if (selectedTags.value.length > 0) {
        const productsIds = productTags.value.map((item) => {if (selectedTags.value.includes(item.tag ?? '')) return item.productId})
        productsAux = productsAux.filter((item) => productsIds.includes(item.id))
    }

    productsFiltered.value = productsAux
}

async function getAllProducts() {
    loadingProducts.value = true
    const { data, error } = await supabase.from('products').select()
    .order('createdBy->>createdAt', { ascending: false })

    loadingProducts.value = false
    if (!error) return data
    return []
}

async function getProductTags() {
    const productsIds = products.value.map((item) => item.id)
    const { data, error } = await supabase.from('product_tags').select()
    .filter('productId', 'in', `(${productsIds.join(',')})`)

    if (!error) {
        productTags.value = data
        tags.value = [...new Set(data.map((item) => item.tag))]
    } else {
        console.log('Error al obtener tags', error)
    }
}

async function deleteSelectedProducts(selectedProducts: Product[]) {
    const {error} = await supabase.from('products').delete().in('id', selectedProducts.map((product) => product.id))
    
    if (!error) {
        let imagesPaths = []
        for (const product of selectedProducts) {
            imagesPaths.push(...product.imagesPaths)
        }

        const { error } = await supabase.storage.from('products').remove(imagesPaths.map((path) => `${path}`))
        if (!error) {
            console.log('Productos eliminados con éxito')
        } else {
            console.log('Error al eliminar productos', error.message)
        }
    } else {
        console.log('Error al eliminar productos', error.message)
    }


    products.value = await getAllProducts()


    clearFilters()
}

function clearFilters() {
    selectedCategories.value = []
    selectedTags.value = []
    productsFiltered.value = products.value
}
</script>