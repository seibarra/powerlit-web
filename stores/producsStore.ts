import type { Product, ProductCategory } from '~/types/entities'

export const useProductsStore = defineStore('productsStore', () => {
    const products = ref<Product[]>([])
    const productCategories = ref<ProductCategory[]>([])

    onMounted(async () => {
        await getProductCategories()
        await getProducts()
    })

    async function getProductCategories() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.from('product_categories').select()
        if (error) {
            console.log('error:', error)
        } else {
            productCategories.value = data as ProductCategory[]
        }
    }

    async function getProducts() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.from('products').select()
        if (error) {
            console.log('error:', error)
        } else {
            products.value = data as Product[]
        }
    }

    async function updateProduct(product: Product) {
        const supabase = useSupabaseClient()
        const { error } = await supabase.from('products').update(product).eq('id', product.id)
    }

    return {
        products,
        productCategories,
        updateProduct
    }
})

