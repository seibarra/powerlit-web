<template>
    <section class="max-w-[900px] min-w-full">
        <header class="flex justify-between items-center">
            <h2 class="text-2xl font-bold px-5 pb-7">Productos</h2>
        </header>
        <div class="w-full">
            <v-btn color="green" text="Agregar producto" variant="tonal" @click="showAddProductDialog = true"
                class="text-none font-weight-regular m-3"></v-btn>
            <div class="flex gap-5">
                <v-autocomplete @update:modelValue="handleCategoryUpdate" label="Categorías" variant="solo-filled" density="compact" v-model="selectedCategories" :items="categories" multiple chips class="max-w-[210px]"></v-autocomplete>
                <v-autocomplete @update:modelValue="handleTagUpdate" label="Tags" variant="solo-filled" density="compact" v-model="selectedTags" :items="productTags.map((item) => item.tag)" multiple chips class="max-w-[210px]"></v-autocomplete>
            </div>

            <ProductGrid :products="products" />
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
const productsFiltered = ref<Product[]>([])
const stopLoading = ref(false)

// filters
const productListSize = ref(8)
const currentOffset = ref(0)
const categories = ref<string[]>([])
const selectedCategories = ref<string[]>([])
const selectedTags = ref<string[]>([])
const showUserProducts = ref(true)
const productTags = ref<ProductTag[]>([])

onMounted(async () => {
    currentOffset.value = 0
    products.value = await getProducts()
    await getProductTags()

    try {
        const { data, error } = await supabase.from('product_categories').select('*')
        if (!error) {
            categories.value = data.map((item) => item.name)
        } 
    } catch {
        console.log('Error al obtener categorías.')
    }

    window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function pushProduct(product: Product) {
    products.value.push(product)
}

async function handleCategoryUpdate(value: string[]) {
    selectedCategories.value = value
    currentOffset.value = 0
    products.value = await getProducts()
}

async function handleTagUpdate(value: string[]) {
    selectedTags.value = value
    currentOffset.value = 0
    products.value = await getProducts()
}

async function getProducts() {
    let query = supabase.from('products').select()

    if (selectedTags.value.length > 0) {
        const {data: tags, error: tagError} = await supabase.from('product_tags').select('*')
        .filter('tag', 'in', `(${selectedTags.value.join(',')})`)

        if (!tagError) {
            const productIds = tags.map((item) => item.productId)
            query = query.in('id', productIds)
        }
    }

    if (showUserProducts.value) {       
        query = query.eq('createdBy->>email', userStore.user?.email ?? '-')
    }

    if (selectedCategories.value.length > 0) {
        query = query.filter('category', 'in', `(${selectedCategories.value.join(',')})`)
    }

    query = query.order('createdBy->>createdAt', { ascending: false })
    .range(currentOffset.value, currentOffset.value + productListSize.value -1)

    currentOffset.value += productListSize.value

    const { data, error } = await query
    if (!error) {
        if (data.length > 0) {
            setTimeout(() => {
                stopLoading.value = false
            }, 1000)
        }
        return data
    }
    else {
        console.log('Error', error)
        return []
    }
}

async function getProductTags() {
    const productsIds = products.value.map((item) => item.id)
    const { data, error } = await supabase.from('product_tags').select('*')
    .filter('productId', 'in', `(${productsIds.join(',')})`)

    if (!error) {
        productTags.value = data
    } else {
        console.log('Error al obtener tags', error)
    }
}

const onScroll = async () => {  
  if (!stopLoading.value && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    stopLoading.value = true
    const newProducts = await getProducts()
    if (newProducts.length === 0) {
        stopLoading.value = true
    } else {
        products.value.push(...newProducts)
    }
  }
}
</script>